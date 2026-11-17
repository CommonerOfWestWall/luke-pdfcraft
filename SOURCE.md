# 2.1.1 源码交付

[下载冻结的产品源码 ZIP](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.1.1/Luke-PDF-Editor-2.1.1-source.zip)，并用同一 Release 的 `SHA256SUMS.txt` 校验。逐文件清单另见 `source-manifest.json`（覆盖归档内除自身以外的每个条目），导出范围见压缩包内 `SOURCE-SNAPSHOT.md`。[上一版 2.1.0 快照](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.1.0)、2.0.9 及更早的独立保留，不覆盖。

## 它对应什么

- 上游：[storytold/pdfcraft](https://github.com/storytold/pdfcraft)，基线标签 `v0.21.1`（`b503b2e6`，「Merge tested main for v0.21.1」）。
- 产品：鲁科 PDF 编辑器 2.1，构建/安装版本 2.1.1。本版把整棵产品树从上游 `v0.21.0` 抬到 `v0.21.1`（23 个提交、60 文件、+2191 −304），并把简体中文界面补齐（`crates/ui-egui/src/i18n/luke.tsv` 追加 850 条，`luke-override.tsv` 更正 34 条）。
- 二进制来自含未提交改动的工作树，验收后原字节保留；源码 ZIP 是交付时冻结的产品工作树，与构建输入同源，但不是本渠道仓库某次提交的构建产物。
- 未声称字节级可复现构建。渠道 `v2.1.1` 标签只固定发行说明与索引，不是产品源码提交。GitHub 自动生成的 “Source code” 仅含渠道文件；**编译请取上述显式 source.zip 资产**。

## 包含与排除

保留产品代码、测试、Cargo 清单/锁文件、打包脚本和所需许可/资产。排除 Git 元数据、本机配置、运行日志、私有验收材料、用户文件及构建产物；不包含旧版 AGPL 实现。上游 CI 不会因本渠道发布而自动运行。归档共 2,260 条目（含 `source-manifest.json` 自身），逐文件 SHA-256 见 `source-manifest.json`。导出扫描的结构检查全为 0：缺引用的 include/path/workspace 0 处、缺归因的 `ATTRIBUTION` 路径 0 处、重解析点 0 处、未知凭据/私钥 0 处。上游测试与 vendor 示例中的 `/Users/…` 之类路径是占位字符串，不是用户数据。

## 依赖变化

上游 `v0.21.1` 带入了 `craft-update` 与其依赖的更新（`craft-libs` 指到 `6e03f65`），锁文件随之重解析：部分包的 `windows-sys` 上移到 0.61.2，`winreg` 出现 0.55 与 0.56 两个版本（检查更新读系统代理仍用 0.56）。只有 Windows 目标受影响，锁文件随源码包一并交付。

另需说明：抬版时本轮曾整份取用上游的 `Cargo.lock`，丢掉了两个本仓专有包（`luke-thumbnail-provider`、`pdfcraft-luke-review`）。二者都是 workspace 成员，锁文件缺它们时 `cargo build --locked` 会失败；补齐后的锁文件已随本版提交，`--locked` 全量门禁通过。

构建遵循源码中的 Cargo 工具链及打包说明。完整发行还依赖固定版本的开放字体输入、craft-i18n 语料目录（`CRAFT_I18N_DIR`，缺失会直接构建失败而不是打出纯英文界面）和本机 Windows/WiX 构建环境；不会把系统字体复制进源码包。离线 OCR 模型的获取/许可见打包文档和归因表。源码归档不等于完整依赖离线镜像。

## 校验的边界

SHA-256 用于确认下载完整性，不能替代代码签名，也不能防御发布账号被攻破。产品尚未签名，预览状态和未关闭验收项在 Release 中明确保留。
