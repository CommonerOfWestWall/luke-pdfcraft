# 鲁科 PDF 编辑器 2.0

基于 [PdfCraft](https://github.com/storytold/pdfcraft) 的中文、离线优先定制版，面向 Windows，并与鲁科 Look 的离线审读产物配合使用。

## 下载 2.0.8 公开预览版

**这是未签名预览版，不是稳定版。** 2.0.8 从上游 2026-11-09 新合并的修复中挑选了两项能逐字对应、不牵动框架的小修复：Acrobat 写出的 `/V 4` RC4 40/48-bit 短密钥文件，此前直接按短密钥推导对象密钥，读出的字符串/流是乱码且保存后读不回来，现在只对 `/V 4` + RC4 + 短于 16 字节的密钥补零到 16 字节再计算；很多结构树标题共用一个很大的 `/ActualText`/`/Alt`/`/T` 字符串时，此前每个标题各自完整解码一遍，现在整份文档共享一份解码预算，普通短标题不受影响。保留 2.0.7 的三项补丁（负数 trailer `/Size`、小比例 `Matrix::invert`、签名 OID 规范点分十进制）。鲁科仍是 v0.8 基础加有界补丁，**不是完整 v0.19**——上游的渲染、优化器、JBIG2、UI 框架与自动更新器均未迁入。**本轮未实测宿主升级**；多用户卸载、缩略图集成等仍有未关闭项目，不承诺所有机器兼容。Windows 可能显示未知发布者或信誉提示；不要关闭系统防护，无法确认来源时不要运行。请备份重要 PDF，先用副本试用。中文 OCR 精度不作保证。

- [2.0.8 版本说明与全部下载](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.8)
- [Windows x64 安装版 MSI](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.8/Luke-PDF-Editor-2.0.8-x64.msi)
- [Windows x64 免安装版 ZIP](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.8/Luke-PDF-Editor-2.0.8-portable-x64.zip)
- [源码快照与构建说明](SOURCE.md)
- [完整性校验文件](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.8/SHA256SUMS.txt)
- [保留的 2.0.7 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.7)
- [保留的 2.0.6 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.6)
- [保留的 2.0.4 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.4)
- [保留的 2.0.3 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.3)

安装版需要管理员权限，可选择父目录，程序使用其下独立的 `Luke PDF Editor 2` 文件夹。再次打开同一 MSI 可修复或卸载，也可从 Windows 已安装应用及开始菜单卸载。免安装版应完整解压到可写目录后运行 `pdfcraft.exe`，不要只复制一个 EXE。两种方式均不强改默认 PDF 应用。

后续版本集中放在 Releases，无需逐人索取安装包。**已安装的 2.0.7：在软件中点“检查更新”→看到 2.0.8→点“下载”，即可进入本版下载页面。** 2.0.3/2.0.4 的旧检查更新界面无法自行发现新版，请从本页手动下载。2.0.8 会显示已是最新；将来通过同一渠道发布的新预览版也可被发现。程序不会自动下载安装。

**手动更新步骤**：软件内“检查更新”→“下载”→选择 2.0.8 MSI（安装用户）或 ZIP（免安装用户）→核对 `SHA256SUMS.txt`→备份重要文档、保存并退出旧版→运行 MSI 按向导更新，或将 ZIP 完整解压至新文件夹运行。不要把免安装 ZIP 覆盖安装目录，不要同时运行两个版本。旧版免安装配置不要删除；升级前保留原包，安装失败时停止操作并保留系统日志。软件内下载按钮打开本仓库的对应版本页面，由用户选择下载和安装，不会静默执行安装器。即使检查更新失败，离线 PDF 功能不受影响。

- [鲁科版本下载页](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases)
- [Windows x64 公开预览更新索引](https://raw.githubusercontent.com/CommonerOfWestWall/luke-pdfcraft/main/updates/windows-x86_64.json)
- [索引与后续更新规则](UPDATES.md)

更新索引现包含已验收的公开预览版。为兼容已安装客户端，JSON 中 `channel: stable` 仅保留为旧协议字段，**不代表稳定版认证**；版本仍明确标为未签名公开预览。GitHub `/releases/latest` 可能返回 404，软件不依赖该稳定版接口。不要下载 PdfCraft 上游包替代鲁科，也不要把旧版鲁科 0.x 包当成 2.0。GitHub 在大陆的可达性取决于用户网络。

## 项目边界

- 这里是鲁科定制版，不是 PdfCraft 官方发行渠道；不使用上游安装/升级标识冒充官方。
- 旧版 [luke-pdf-editor](https://github.com/CommonerOfWestWall/luke-pdf-editor) 及其 AGPL 历史独立保留；旧版代码不移入本项目。
- 基础代码沿用 PdfCraft 的 MIT OR Apache-2.0 授权，并保留上游版权与归因。图标、字体、模型和依赖另按各自许可分发。源码快照保留归因与许可文件。本仓库的 Git 历史是发行渠道文档；产品源码以单独冻结快照交付，不将渠道提交冒充二进制构建提交。
- 不默认开启遥测、云上传或自动安装；将来有可用更新时应由用户确认下载/安装。离线 PDF 功能不因联网检查失败而失效。
- 未关闭全部发布条件前不承诺生产可用；预览版验收不等于全部安装、升级、卸载与资源管理器集成验收完成。
