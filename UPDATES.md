# 鲁科版本下载与更新接口

## 渠道地址（以实际仓库与索引回读为准）

仓库：`CommonerOfWestWall/luke-pdfcraft`。这是鲁科渠道，不是 `storytold/pdfcraft`。

| 用途 | 地址 |
| --- | --- |
| 人工下载页 | https://github.com/CommonerOfWestWall/luke-pdfcraft/releases |
| 全部公开 Release | https://api.github.com/repos/CommonerOfWestWall/luke-pdfcraft/releases |
| 最新正式 Release | https://api.github.com/repos/CommonerOfWestWall/luke-pdfcraft/releases/latest |
| Windows x64 统一公开预览更新索引 | https://raw.githubusercontent.com/CommonerOfWestWall/luke-pdfcraft/main/updates/windows-x86_64.json |

2026-10-30 起按用户决定统一预览渠道。[2.0.6](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.6) 仍为未签名公开预览，但进入现有客户端的更新索引。2.0.3–2.0.5 可通过“检查更新”发现它并点击“下载”；2.0.6 显示已是最新。旧 2.0.3/2.0.4 原包保留，本次不重打安装包、不新增版本号。JSON 的 `channel=stable` 仅为已部署客户端的兼容字段，不构成稳定认证；GitHub Release 保持 prerelease，未改成正式版或 latest。

群发给用户可直接写：**打开鲁科 PDF 编辑器 → 检查更新 → 下载；保存并退出旧版后运行新版安装包。免安装用户完整解压 ZIP 到新文件夹。** 不启动联网、不自动下载或执行安装器，不回退上游。网络检查失败时可从固定 Releases 页自行下载，不能保证大陆所有网络可达。

## 索引约定

- `schema=1`，`product=luke-pdf-editor`，`platform=windows-x86_64` 固定标识本产品；`channel=stable` 是旧解析器强制要求的兼容标识，不能改成 preview 导致旧版拒绝。`status=public_preview` 和 message 如实说明预览属性。
- `latest=null` 仅表示暂未投放任何版本（旧客户端可能误报，不作为正常发布状态）；目前投放真实公开预览版 2.0.6。
- 非空 `latest` 只能在发布门禁通过后写入，须包含实际 `version`、`tag`、`release_url` 及 `assets`（每项实际 `name/url/sha256/size`）。不得填虚构 URL、占位哈希或开发包。
- 下载来源限制为本仓库的 GitHub Releases；仅接受 HTTPS，不允许远端元数据指定任意主机、执行命令或修改安装目录。
- 拒绝错误产品/平台/兼容渠道/schema、未知结构字段、超过 64 KiB 的响应、非三段数字版本、错误 tag、错误仓库或资源地址。仅接受一份版本名一致的 x64 MSI 元数据，大小不超过 512 MiB，SHA-256 必须是 64 位十六进制（索引中不带 sha256: 前缀）；同版或旧版不提示升级。
- 只接受固定 HTTPS 索引，5 秒总请求超时、不跟随重定向、不跳过系统证书验证。点击下载只打开本仓库对应 Release 页面，用户自行决定是否下载与安装；**不是静默/自动升级，也不是签名认证更新器**。同源 SHA-256 只用于完整性核对，不能抵抗发布账号被攻破；正式发布签名尚未完成，不将未签名候选标稳定。
- 网络不可达时显示错误并保留当前版本，不关闭离线功能。GitHub 在大陆的可达性取决于用户网络，本项目不承诺始终可达，不使用来历不明的代理或镜像。

## 首次发布前必须完成

1. 固定源代码提交和依赖/资产清单；保留完整许可证、字体/图标/模型归因，禁止上传个人路径、用户文件、令牌或未净化日志。
2. 关闭公开记录的保存/撤销保护缺陷；完成本版回归与数据保全验收。真实 Look 生产者兼容缺口不可用合成样本冒充。
3. 设计鲁科独立安装/升级/卸载身份，不复用上游 UpgradeCode；隔离验证升级、文件关联、缩略图注册和卸载恢复。当前上游 `packaging/` 不可直接用于鲁科发布。
4. 生成并验证安装包与 SHA-256。先建 draft 预发行、完整下载回验七附件，独立签核后公开 prerelease，最后通过特性分支 PR 更新兼容预览索引；不标成稳定版。
5. 验证用户从下载页获取、安装、升级与卸载的完整路径，客户端仅提示鲁科版本，不自动替换成 PdfCraft。

## 后续每个预览版的索引投放（必须做）

在本渠道仓库执行，Node 内置模块，无需 npm 安装：

```powershell
# 将 v2.0.6 换为刚完成发布和附件回验的新 tag；不要引用草稿。
gh api repos/CommonerOfWestWall/luke-pdfcraft/releases/tags/v2.0.6 > release-receipt.json
node --test scripts/update-preview-index.test.mjs
node scripts/update-preview-index.mjs --release-json release-receipt.json --write
node scripts/update-preview-index.mjs --release-json release-receipt.json --check
```

临时 release-receipt.json 不提交；脚本仅生成 updates/windows-x86_64.json，不联网或执行程序。它拒绝草稿、非预发行、其他仓库、缺失/错误 MSI 长度或服务器 digest、降级及同版换包。随后检查 diff、特性分支 PR、独立审核和 CI；合入后匿名回读索引并做旧版“检查更新”实测。发布检查失败不得把未校验文件写进索引，也不要手工编造 SHA。同源 SHA 不是发布者签名。

仓库 CI 在 PR 和 main 更新时自动重跑这些反例测试，并通过只读 GitHub API 对比索引引用的真实公开 Release。它不生成安装包、不发布版本、不写索引，也不会把发布权限交给工作流；新版本仍须按上述步骤主动投放索引。

## 跟进上游不是自动替换产品

可自动检查 PdfCraft 新 tag/提交并形成候选同步分支。依赖、许可、资产与定制冲突审核后，跑关键回归再合入；不自动合并、不自动发布，不因上游更新而直接安装其二进制。当前未开启任何定时工作流或付费服务。

给上游贡献只选通用缺陷修复，基于当前上游 main 单独拆分、先红后绿并独立审核；不提交鲁科品牌、Look 集成、旧 AGPL 实现、私有文件或本机配置。提交前查重，避免重复 PR。
