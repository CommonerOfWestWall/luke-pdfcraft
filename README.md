# 鲁科 PDF 编辑器 2.0

基于 [PdfCraft](https://github.com/storytold/pdfcraft) 的中文、离线优先定制版，面向 Windows，并与鲁科 Look 的离线审读产物配合使用。

## 下载 2.0.6 公开预览版

**这是未签名预览版，不是稳定版。** 2.0.6 包含更新检查提示纠偏、新文本框保存保护、XFDF 非有限坐标保护，以及来自上游 v0.15 的三项适配修复：空表单字段导入、FDF 批注弹窗引用、大数格式化。鲁科仍是 v0.8 基础加有界补丁，**不是完整 v0.15**。2.0.3 的安装向导曾人工验收通过，但**本次未重新实测宿主升级**；多用户卸载、缩略图集成等仍有未关闭项目，不承诺所有机器兼容。Windows 可能显示未知发布者或信誉提示；不要关闭系统防护，无法确认来源时不要运行。请备份重要 PDF，先用副本试用。中文 OCR 精度不作保证。

- [2.0.6 版本说明与全部下载](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.6)
- [Windows x64 安装版 MSI](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.6/Luke-PDF-Editor-2.0.6-x64.msi)
- [Windows x64 免安装版 ZIP](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.6/Luke-PDF-Editor-2.0.6-portable-x64.zip)
- [源码快照与构建说明](SOURCE.md)
- [完整性校验文件](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.6/SHA256SUMS.txt)
- [保留的 2.0.4 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.4)
- [保留的 2.0.3 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.3)

安装版需要管理员权限，可选择父目录，程序使用其下独立的 `Luke PDF Editor 2` 文件夹。再次打开同一 MSI 可修复或卸载，也可从 Windows 已安装应用及开始菜单卸载。免安装版应完整解压到可写目录后运行 `pdfcraft.exe`，不要只复制一个 EXE。两种方式均不强改默认 PDF 应用。

后续版本集中放在 Releases，无需逐人索取安装包。当前预览版请手动下载；程序不会自动下载安装。

**手动更新步骤**：备份重要文档 → 保存并退出旧版 → 下载本页的 2.0.6 MSI（安装用户）或 ZIP（免安装用户）→ 核对 `SHA256SUMS.txt` → 运行 MSI 按向导更新，或将 ZIP 完整解压至新文件夹运行。不要把免安装 ZIP 覆盖安装目录，不要同时运行两个版本。旧版免安装配置不要删除；升级前保留原包，安装失败时停止操作并保留系统日志。2.0.3/2.0.4 客户端遇空稳定索引会误报“无法检查更新”，需要先手动安装本版。2.0.6 会如实显示“渠道连接成功、暂无稳定版”，可点击“查看预览版下载”进入鲁科 Releases；**不检测最新预览版本号，也不自动下载安装**。

- [鲁科版本下载页](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases)
- [Windows x64 稳定版索引](https://raw.githubusercontent.com/CommonerOfWestWall/luke-pdfcraft/main/updates/windows-x86_64.json)
- [索引与后续更新规则](UPDATES.md)

`latest: null` 表示没有可安装的稳定版本，不表示网络错误；没有正式 Release 时，GitHub 的 `/releases/latest` 接口可能返回 404。预览版不会进入稳定索引。不要据此下载 PdfCraft 上游包，也不要把旧版鲁科 0.x 包当成 2.0。GitHub 在大陆的可达性取决于用户网络。

## 项目边界

- 这里是鲁科定制版，不是 PdfCraft 官方发行渠道；不使用上游安装/升级标识冒充官方。
- 旧版 [luke-pdf-editor](https://github.com/CommonerOfWestWall/luke-pdf-editor) 及其 AGPL 历史独立保留；旧版代码不移入本项目。
- 基础代码沿用 PdfCraft 的 MIT OR Apache-2.0 授权，并保留上游版权与归因。图标、字体、模型和依赖另按各自许可分发。源码快照保留归因与许可文件。本仓库的 Git 历史是发行渠道文档；产品源码以单独冻结快照交付，不将渠道提交冒充二进制构建提交。
- 不默认开启遥测、云上传或自动安装；将来有可用更新时应由用户确认下载/安装。离线 PDF 功能不因联网检查失败而失效。
- 未关闭全部发布条件前不承诺生产可用；预览版验收不等于全部安装、升级、卸载与资源管理器集成验收完成。
