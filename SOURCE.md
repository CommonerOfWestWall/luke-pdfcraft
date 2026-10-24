# 2.0.4 源码交付

[下载冻结的产品源码 ZIP](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/download/v2.0.4/Luke-PDF-Editor-2.0.4-source.zip)，并用同一 Release 的 `SHA256SUMS.txt` 校验。逐文件清单另见 `source-manifest.json`，详细导出范围见压缩包内 `SOURCE-SNAPSHOT.md`。[旧 2.0.3 快照](https://github.com/CommonerOfWestWall/luke-pdfcraft/releases/tag/v2.0.3)独立保留，不覆盖。

## 它对应什么

- 上游：[storytold/pdfcraft](https://github.com/storytold/pdfcraft)，基线 `ac89a113915ea890999cf1a141cdfcda1ad06d98`。
- 产品：鲁科 PDF 编辑器 2.0，构建/安装版本 2.0.4；上游 v0.8 基础加已选安全补丁，不是完整 v0.13。新增 #3946 编码输入保护与 #3948 取整像素预算保护。
- 二进制来自含未提交改动的工作树，验收后原字节保留；源码 ZIP 是交付时冻结的产品工作树，不是本渠道仓库某次提交的构建产物。
- 未声称字节级可复现构建。渠道 `v2.0.4` 标签只固定发行说明与索引，不是产品源码提交。GitHub 自动生成的 “Source code” 仅含渠道文件；**编译请取上述显式 source.zip 资产**。

## 包含与排除

保留产品代码、测试、Cargo 清单/锁文件、打包脚本和所需许可/资产。排除 Git 元数据、本机配置、运行日志、私有验收材料、用户文件及构建产物；不包含旧版 AGPL 实现。上游 CI 不会因本渠道发布而自动运行。

构建遵循源码中的 Cargo 工具链及打包说明。完整发行还依赖固定版本的开放字体输入和本机 Windows/WiX 构建环境；不会把系统字体复制进源码包。离线 OCR 模型的获取/许可见打包文档和归因表。源码归档不等于完整依赖离线镜像。

## 校验的边界

SHA-256 用于确认下载完整性，不能替代代码签名，也不能防御发布账号被攻破。产品尚未签名，预览状态和未关闭验收项在 Release 中明确保留。
