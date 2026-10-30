import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RELEASES_URL = 'https://github.com/CommonerOfWestWall/luke-pdfcraft/releases';
const REPO = 'https://github.com/CommonerOfWestWall/luke-pdfcraft';
const MAX_RELEASE_BYTES = 256 * 1024;
const MAX_INDEX_BYTES = 64 * 1024;
const MAX_MSI_BYTES = 512 * 1024 * 1024;
const MESSAGE = '未签名公开预览版，仅供手动下载和安装；不会自动下载或安装。';

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const exactKeys = (value, keys) => isObject(value) && Object.keys(value).sort().join('\0') === [...keys].sort().join('\0');
const fail = message => { throw new Error(message); };

function versionParts(tag) {
  const match = typeof tag === 'string' && /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(tag);
  if (!match) fail('tag must be canonical vMAJOR.MINOR.PATCH');
  const parts = match.slice(1).map(Number);
  if (parts[0] > 255 || parts[1] > 255 || parts[2] > 65535) fail('version component is out of range');
  return parts;
}

function compareVersions(a, b) {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) if (left[i] !== right[i]) return left[i] > right[i] ? 1 : -1;
  return 0;
}

function validateMetadata(metadata) {
  if (!exactKeys(metadata, ['version', 'tag', 'release_url', 'assets']) ||
      typeof metadata.version !== 'string' || typeof metadata.tag !== 'string' ||
      typeof metadata.release_url !== 'string' || !Array.isArray(metadata.assets) || metadata.assets.length !== 1) {
    fail('latest metadata has an invalid shape');
  }
  const parts = versionParts(metadata.tag);
  if (metadata.version !== parts.join('.') || metadata.release_url !== `${REPO}/releases/tag/${metadata.tag}`) fail('latest metadata does not match the canonical release');
  const asset = metadata.assets[0];
  if (!exactKeys(asset, ['name', 'size', 'sha256', 'url']) || typeof asset.name !== 'string' ||
      asset.name !== `Luke-PDF-Editor-${metadata.version}-x64.msi` ||
      !Number.isSafeInteger(asset.size) || asset.size < 1 || asset.size > MAX_MSI_BYTES ||
      typeof asset.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(asset.sha256) ||
      asset.url !== `${REPO}/releases/download/${metadata.tag}/${asset.name}`) fail('latest MSI metadata is invalid');
  return metadata;
}

function validateCurrent(current) {
  if (!exactKeys(current, ['schema', 'product', 'name', 'platform', 'channel', 'latest', 'releases_url', 'status', 'message']) ||
      current.schema !== 1 || current.product !== 'luke-pdf-editor' || current.name !== '鲁科 PDF 编辑器' ||
      current.platform !== 'windows-x86_64' || current.channel !== 'stable' || current.releases_url !== RELEASES_URL ||
      typeof current.status !== 'string' || typeof current.message !== 'string') fail('current channel envelope is invalid');
  if (current.latest !== null) validateMetadata(current.latest);
  return current;
}

export function buildPreviewIndex(release, current) {
  if (!isObject(release) || release.draft !== false || release.prerelease !== true ||
      release.html_url !== `${REPO}/releases/tag/${release.tag_name}`) fail('release must be a public prerelease from the exact repository');
  const parts = versionParts(release.tag_name);
  const version = parts.join('.');
  if (!Array.isArray(release.assets)) fail('release assets must be an array');
  const matching = release.assets.filter(asset => asset && asset.name === `Luke-PDF-Editor-${version}-x64.msi`);
  if (matching.length !== 1) fail('release must contain exactly one target MSI');
  const asset = matching[0];
  if (asset.state !== 'uploaded' || !Number.isSafeInteger(asset.size) || asset.size < 1 || asset.size > MAX_MSI_BYTES ||
      typeof asset.digest !== 'string' || !/^sha256:[0-9a-f]{64}$/.test(asset.digest) ||
      asset.browser_download_url !== `${REPO}/releases/download/${release.tag_name}/${asset.name}`) fail('target MSI integrity metadata is invalid');
  const latest = { version, tag: release.tag_name, release_url: release.html_url,
    assets: [{ name: asset.name, size: asset.size, sha256: asset.digest.slice('sha256:'.length), url: asset.browser_download_url }] };
  if (current !== undefined) {
    validateCurrent(current);
    if (current.latest) {
      const ordering = compareVersions(version, current.latest.version);
      if (ordering < 0) fail('release would downgrade the channel');
      if (ordering === 0 && !sameJson(latest, current.latest)) fail('same version has substituted metadata');
    }
  }
  return { schema: 1, product: 'luke-pdf-editor', name: '鲁科 PDF 编辑器', platform: 'windows-x86_64', channel: 'stable', latest,
    releases_url: RELEASES_URL, status: 'public_preview', message: MESSAGE };
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (isObject(value)) return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  return value;
}

function sameJson(left, right) { return JSON.stringify(stable(left)) === JSON.stringify(stable(right)); }
function readJson(file, maxBytes) {
  const stat = fs.statSync(file);
  if (stat.size > maxBytes) fail(`${file} exceeds size limit`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function cli(argv) {
  let releaseFile; let mode; let indexFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../updates/windows-x86_64.json');
  const seen = new Set();
  for (let i = 0; i < argv.length; i += 1) {
    if (seen.has(argv[i])) fail(`duplicate argument: ${argv[i]}`);
    seen.add(argv[i]);
    if (argv[i] === '--release-json') { releaseFile = argv[++i]; if (!releaseFile || releaseFile.startsWith('--')) fail('missing release JSON path'); }
    else if (argv[i] === '--check' || argv[i] === '--write') { if (mode) fail('choose exactly one of --check and --write'); mode = argv[i].slice(2); }
    else if (argv[i] === '--index') { const value = argv[++i]; if (!value || value.startsWith('--')) fail('missing index path'); indexFile = path.resolve(value); }
    else fail(`unknown argument: ${argv[i]}`);
  }
  if (!releaseFile || !mode) fail('usage: --release-json FILE (--check|--write) [--index FILE]');
  const release = readJson(path.resolve(releaseFile), MAX_RELEASE_BYTES);
  const current = readJson(indexFile, MAX_INDEX_BYTES);
  const generated = buildPreviewIndex(release, current);
  if (mode === 'check') {
    if (!sameJson(generated, current)) fail('index differs from generated preview feed');
    return;
  }
  const temp = `${indexFile}.tmp-${process.pid}`;
  fs.writeFileSync(temp, `${JSON.stringify(generated, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
  try {
    fs.renameSync(temp, indexFile);
  } finally { if (fs.existsSync(temp)) fs.rmSync(temp); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  try { cli(process.argv.slice(2)); } catch (error) { console.error(`update-preview-index: ${error.message}`); process.exitCode = 1; }
}
