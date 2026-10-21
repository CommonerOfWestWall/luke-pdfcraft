# 鲁科 PDF 编辑器 2.0

基于 [PdfCraft](https://github.com/storytold/pdfcraft) 的中文、离线优先定制版，面向 Windows，并与鲁科 Look 的离线审读产物配合使用。

## 下载状态

**目前没有公开的稳定版安装包。** 这里承载下载渠道和机器可读的更新索引；本地未签名候选包不冒充正式版。源码定制尚在本地审核中，当前渠道引导文件不代表完整源码已经同步。

- [鲁科版本下载页](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases)
- [Windows x64 稳定版索引](https://raw.githubusercontent.com/CommonerOfWestWall/luke-pdfcraft/main/updates/windows-x86_64.json)
- [索引与后续更新规则](UPDATES.md)

`latest: null` 表示没有可安装的稳定版本，不表示网络错误；没有正式 Release 时，GitHub 的 `/releases/latest` 接口可能返回 404。不要据此下载 PdfCraft 上游包，也不要把旧版鲁科 0.x 包当成 2.0。

## 项目边界

- 这里是鲁科定制版，不是 PdfCraft 官方发行渠道；不使用上游安装/升级标识冒充官方。
- 旧版 [luke-pdf-editor](https://github.com/CommonerOfWestWall/luke-pdf-editor) 及其 AGPL 历史独立保留；旧版代码不移入本项目。
- 基础代码沿用 PdfCraft 的 MIT OR Apache-2.0 授权，并保留上游版权与归因。图标、字体、模型和依赖另按各自许可分发。当前仓库内两份许可证保留上游原文，不代表已完成全部发布资产审计。
- 不默认开启遥测、云上传或自动安装；将来有可用更新时应由用户确认下载/安装。离线 PDF 功能不因联网检查失败而失效。
- 未发布前不承诺生产可用；安装、升级、卸载、数据保护和资源管理器集成验收仍需完成。
