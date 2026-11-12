# 鲁科 PDF 编辑器 2.1

基于 [PdfCraft](https://github.com/storytold/pdfcraft) 的中文、离线优先定制版，面向 Windows，并与鲁科 Look 的离线审读产物配合使用。

## 下载 2.1.0 公开预览版

**这是未签名预览版，不是稳定版。** 2.1.0 换掉了基座：2.0.x 一直停在官方 PdfCraft `v0.20.0` 的源码快照上，靠逐条有界补丁跟上游；本版把整棵产品树抬到 `v0.21.0`，上游 1,063 个提交里的修复与功能随基座一起进来。用户能感觉到的部分——打印在 GDI 打印机上的透明图层被扁平化、纸张列表出现打印机自带的尺寸；表单支持 `Will Save` / `Will Print` 动作与控件指针/焦点脚本，`calculateNow` 改为同步；涂黑修掉一批正确性问题（间接 `/Subtype` 标记、内联批注判定、Type3 字体先判定）；超过 8,000 万像素的单色图与掩膜按单色存储；批注锚定到高亮文本；文件 ▸ 打开可以选 Word / Excel / PowerPoint，本机装有 LibreOffice 时转成新 PDF。合并期还逮到并修好三个「编得过、行为不对」的问题，其中一个是中文批注被误报「在别的阅读器里会显示成问号」（字其实画对了，错的是判定）。产品显示版本随之从 2.0 变为 2.1，开始菜单与快捷方式名称变成「鲁科 PDF 编辑器 2.1」。保留中文、鲁科图标、独立安装身份与 2.0.3–2.0.9 的既有修复。**本轮未实测多用户卸载与缩略图生命周期**；Windows 可能显示未知发布者或信誉提示；不要关闭系统防护，无法确认来源时不要运行。请备份重要 PDF，先用副本试用。中文 OCR 精度不作保证。

- [2.1.0 版本说明与全部下载](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.1.0)
- [Windows x64 安装版 MSI](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.1.0/Luke-PDF-Editor-2.1.0-x64.msi)
- [Windows x64 免安装版 ZIP](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.1.0/Luke-PDF-Editor-2.1.0-portable-x64.zip)
- [源码快照与构建说明](SOURCE.md)
- [完整性校验文件](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.1.0/SHA256SUMS.txt)
- [保留的 2.0.9 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.9)
- [保留的 2.0.8 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.8)
- [保留的 2.0.7 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.7)
- [保留的 2.0.6 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.6)
- [保留的 2.0.4 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.4)
- [保留的 2.0.3 历史版本](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.3)

安装版需要管理员权限，可选择父目录，程序使用其下独立的 `Luke PDF Editor 2` 文件夹。再次打开同一 MSI 可修复或卸载，也可从 Windows 已安装应用及开始菜单卸载。免安装版应完整解压到可写目录后运行 `pdfcraft.exe`，不要只复制一个 EXE。两种方式均不强改默认 PDF 应用。

后续版本集中放在 Releases，无需逐人索取安装包。**已安装的 2.0.9：网络可达时，在软件中点“检查更新”可以看到 2.1.0 并点“下载”**。已安装的 2.0.7 或 2.0.8 也可以被发现，但那两版的检查更新仍是 5 秒总超时、不读系统代理，失败时请从本页手动下载。2.0.3/2.0.4 的旧检查更新界面无法自行发现新版，请从本页手动下载。2.1.0 显示已是最新；将来通过同一渠道发布的新预览版也可被发现。程序不会自动下载安装。

**手动更新步骤**：软件内“检查更新”→“下载”→选择 2.1.0 MSI（安装用户）或 ZIP（免安装用户）→核对 `SHA256SUMS.txt`→备份重要文档、保存并退出旧版→运行 MSI 按向导更新，或将 ZIP 完整解压至新文件夹运行。不要把免安装 ZIP 覆盖安装目录，不要同时运行两个版本。旧版免安装配置不要删除；升级前保留原包，安装失败时停止操作并保留系统日志。软件内下载按钮打开本仓库的对应版本页面，由用户选择下载和安装，不会静默执行安装器。即使检查更新失败，离线 PDF 功能不受影响。

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
