# 鲁科版本下载与更新接口

## 渠道地址（以实际仓库与索引回读为准）

仓库：`CommonerOfWestWall/luke-pdfcraft`。这是鲁科渠道，不是 `storytold/pdfcraft`。

| 用途 | 地址 |
| --- | --- |
| 人工下载页 | https://github.com/CommonerOfWestWall/luke-pdfcraft/releases |
| 全部公开 Release | https://api.github.com/repos/CommonerOfWestWall/luke-pdfcraft/releases |
| 最新正式 Release | https://api.github.com/repos/CommonerOfWestWall/luke-pdfcraft/releases/latest |
| Windows x64 稳定版索引 | https://raw.githubusercontent.com/CommonerOfWestWall/luke-pdfcraft/main/updates/windows-x86_64.json |

2.0.3 已作为[未签名公开预览版](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.3)提供手动下载，不放入稳定索引。索引 `latest=null`、`releases/latest` 返回 404 是**尚未发布稳定版**的预期状态；公开 Release 列表可以包含预览版。2.0.3 的“帮助 → 检查更新”仅在点击时读取本索引；启动不联网，也不下载或运行安装程序。

## 索引约定

- `schema=1`，`product=luke-pdf-editor`，`platform=windows-x86_64`，`channel=stable` 固定标识本产品渠道。
- `latest=null`：没有获准的稳定版；客户端不提示可下载、不回退到上游或旧版渠道。
- 非空 `latest` 只能在发布门禁通过后写入，须包含实际 `version`、`tag`、`release_url` 及 `assets`（每项实际 `name/url/sha256/size`）。不得填虚构 URL、占位哈希或开发包。
- 下载来源限制为本仓库的 GitHub Releases；仅接受 HTTPS，不允许远端元数据指定任意主机、执行命令或修改安装目录。
- 拒绝错误产品/平台/渠道/schema、未知结构字段、超过 64 KiB 的响应、非三段稳定版本、错误 tag、错误仓库或资源地址。仅接受一份版本名一致的 x64 MSI 元数据，大小不超过 512 MiB，SHA-256 必须是 64 位十六进制；旧版本不提示升级。
- 只接受固定 HTTPS 索引，5 秒总请求超时、不跟随重定向、不跳过系统证书验证。点击下载只打开本仓库对应 Release 页面，用户自行决定是否下载与安装；**不是静默/自动升级，也不是签名认证更新器**。同源 SHA-256 只用于完整性核对，不能抵抗发布账号被攻破；正式发布签名尚未完成，不将未签名候选标稳定。
- 网络不可达时显示错误并保留当前版本，不关闭离线功能。GitHub 在大陆的可达性取决于用户网络，本项目不承诺始终可达，不使用来历不明的代理或镜像。

## 首次发布前必须完成

1. 固定源代码提交和依赖/资产清单；保留完整许可证、字体/图标/模型归因，禁止上传个人路径、用户文件、令牌或未净化日志。
2. 关闭公开记录的保存/撤销保护缺陷；完成本版回归与数据保全验收。真实 Look 生产者兼容缺口不可用合成样本冒充。
3. 设计鲁科独立安装/升级/卸载身份，不复用上游 UpgradeCode；隔离验证升级、文件关联、缩略图注册和卸载恢复。当前上游 `packaging/` 不可直接用于鲁科发布。
4. 生成并验证安装包与 SHA-256。先建 draft/预发行供验证，不把它标成稳定版；人工签核后发布正式 Release，最后才原子更新稳定索引。
5. 验证用户从下载页获取、安装、升级与卸载的完整路径，客户端仅提示鲁科版本，不自动替换成 PdfCraft。

## 跟进上游不是自动替换产品

可自动检查 PdfCraft 新 tag/提交并形成候选同步分支。依赖、许可、资产与定制冲突审核后，跑关键回归再合入；不自动合并、不自动发布，不因上游更新而直接安装其二进制。当前未开启任何定时工作流或付费服务。

给上游贡献只选通用缺陷修复，基于当前上游 main 单独拆分、先红后绿并独立审核；不提交鲁科品牌、Look 集成、旧 AGPL 实现、私有文件或本机配置。提交前查重，避免重复 PR。
