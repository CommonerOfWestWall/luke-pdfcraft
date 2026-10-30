import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildPreviewIndex, RELEASES_URL } from './update-preview-index.mjs';

const repo = 'https://github.com/CommonerOfWestWall/luke-pdfcraft';
const digest = 'sha256:' + 'a'.repeat(64);
function release(version = '2.0.6') {
  const tag = `v${version}`;
  const name = `Luke-PDF-Editor-${version}-x64.msi`;
  return { html_url: `${repo}/releases/tag/${tag}`, tag_name: tag, draft: false, prerelease: true,
    assets: [{ name: 'other.zip', state: 'uploaded', size: 10 }, { name, state: 'uploaded', size: 1024, digest,
      browser_download_url: `${repo}/releases/download/${tag}/${name}` }] };
}
const empty = { schema: 1, product: 'luke-pdf-editor', name: '鲁科 PDF 编辑器', platform: 'windows-x86_64', channel: 'stable', latest: null, releases_url: RELEASES_URL, status: 'not_released', message: 'old' };

test('builds a preview index from a public prerelease and accepts null feed', () => {
  const result = buildPreviewIndex(release(), empty);
  assert.equal(result.latest.version, '2.0.6');
  assert.equal(result.status, 'public_preview');
  assert.equal(result.latest.assets[0].sha256, 'a'.repeat(64));
  assert.match(result.latest.assets[0].sha256, /^[0-9a-f]{64}$/);
});
test('compares numeric versions', () => assert.equal(buildPreviewIndex(release('2.0.10'), buildPreviewIndex(release('2.0.9'), empty)).latest.version, '2.0.10'));
test('same exact version is idempotent', () => {
  const one = buildPreviewIndex(release(), empty);
  assert.deepEqual(buildPreviewIndex(release(), one), one);
});

for (const [label, mutate] of [
  ['draft', r => { r.draft = true; }], ['not prerelease', r => { r.prerelease = false; }], ['foreign URL', r => { r.html_url = 'https://github.com/other/repo/releases/tag/v2.0.6'; }],
  ['foreign asset URL', r => { r.assets[1].browser_download_url = 'https://example.test/file.msi'; }],
  ['wrong tag', r => { r.html_url = `${repo}/releases/tag/v2.0.6`; r.tag_name = 'release-2.0.6'; }],
  ['non-uploaded', r => { r.assets[1].state = 'new'; }], ['missing digest', r => { delete r.assets[1].digest; }],
  ['zero size', r => { r.assets[1].size = 0; }], ['large size', r => { r.assets[1].size = 512 * 1024 * 1024 + 1; }],
  ['duplicate target', r => { r.assets.push({ ...r.assets[1] }); }], ['malformed version', r => { r.tag_name = 'v2.0'; r.html_url = `${repo}/releases/tag/v2.0`; }],
]) test(`rejects ${label}`, () => { const candidate = release(); mutate(candidate); assert.throws(() => buildPreviewIndex(candidate, empty)); });

test('rejects downgrade and same-version substitution', () => {
  const newer = buildPreviewIndex(release('2.0.10'), empty);
  assert.throws(() => buildPreviewIndex(release('2.0.9'), newer));
  const changed = release(); changed.assets[1].digest = 'sha256:' + 'b'.repeat(64);
  assert.throws(() => buildPreviewIndex(changed, buildPreviewIndex(release(), empty)));
});

test('same-version equality ignores object key order', () => {
  const one = buildPreviewIndex(release(), empty);
  const reordered = { ...one, latest: { ...one.latest, assets: [{ ...one.latest.assets[0] }] } };
  reordered.latest.assets[0] = { url: reordered.latest.assets[0].url, sha256: reordered.latest.assets[0].sha256, size: 1024, name: reordered.latest.assets[0].name };
  assert.deepEqual(buildPreviewIndex(release(), reordered), one);
});

test('CLI check fails before write, then write and check pass', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-index-'));
  const releaseFile = path.join(dir, 'release.json'); const indexFile = path.join(dir, 'index.json');
  fs.writeFileSync(releaseFile, JSON.stringify(release())); fs.writeFileSync(indexFile, JSON.stringify(empty));
  const script = path.join(path.dirname(fileURLToPath(import.meta.url)), 'update-preview-index.mjs');
  assert.throws(() => execFileSync(process.execPath, [script, '--release-json', releaseFile, '--check', '--index', indexFile]));
  execFileSync(process.execPath, [script, '--release-json', releaseFile, '--write', '--index', indexFile]);
  execFileSync(process.execPath, [script, '--release-json', releaseFile, '--check', '--index', indexFile]);
});

test('CLI rejects duplicate arguments and oversized release JSON', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-index-bounds-'));
  const releaseFile = path.join(dir, 'release.json'); const indexFile = path.join(dir, 'index.json');
  fs.writeFileSync(indexFile, JSON.stringify(empty)); fs.writeFileSync(releaseFile, JSON.stringify(release()));
  const script = path.join(path.dirname(fileURLToPath(import.meta.url)), 'update-preview-index.mjs');
  assert.throws(() => execFileSync(process.execPath, [script, '--release-json', releaseFile, '--check', '--check', '--index', indexFile]));
  assert.throws(() => execFileSync(process.execPath, [script, '--release-json', releaseFile, '--check', '--write', '--index', indexFile]));
  assert.equal(JSON.parse(fs.readFileSync(indexFile, 'utf8')).latest, null, 'invalid CLI modes must not change the index');
  fs.writeFileSync(releaseFile, ' '.repeat(256 * 1024 + 1));
  assert.throws(() => execFileSync(process.execPath, [script, '--release-json', releaseFile, '--check', '--index', indexFile]));
});
