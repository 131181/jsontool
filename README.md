# JSON 数据管理工具

一个零构建、即开即用的 JSON/JSONL 管理与编辑工具。直接用浏览器打开 `jsonl_viewer.html`，即可完成导入、筛选、编辑、导出、统计分析等全流程，无需后端与打包环境。

## ✨ 核心特性

- **🚀 即开即用**: 纯静态页面，双击文件即可使用
- **📊 通用数据表**: 自定义列、排序、筛选、时间范围、全局搜索
- **✏️ 多种编辑模式**: 行内双击编辑/整行表单编辑 + 原始 JSON 编辑
- **⚙️ 配置驱动**: 用配置动态定义列、筛选项、分页、样式等
- **📈 数据统计**: 时间趋势、枚举分布、数值统计与数据质量评估
- **🔒 本地安全**: 所有数据处理在浏览器内完成
- **🎨 高可用体验**: 分页切换过渡动画、全局加载指示器

## 🚀 快速开始

1. **下载工具**: 克隆/下载本仓库
2. **打开工具**: 使用任意现代浏览器打开根目录下的 `jsonl_viewer.html`
3. **导入配置**: 点击"导入配置"加载 `.json` 配置文件（可选）
4. **导入数据**: 点击"导入 JSON"加载 `.json`、`.jsonl` 或 `.txt` 文件
5. **开始使用**: 使用顶部工具栏进行搜索、筛选、编辑与导出

> 💡 **提示**: 首次使用建议先导入配置文件了解功能，再导入数据进行操作

    提供test_config.json配置文件以及test_data.jsonl数据文件供参考，可直接导入查看效果

## 📋 功能概览

### 📥 数据导入导出

- **支持格式**: `.json`（数组或对象）、`.jsonl`、`.txt`
- **智能解析**: 自动识别 JSON 数组、对象或 JSONL 格式
- **配置管理**: 将当前显示规则保存/加载为 `config.json`
- **数据导出**: 按当前筛选结果导出为 JSONL 文件

### 🔍 查询与筛选

- **全局搜索**: 在所有字段进行模糊匹配
- **列级筛选**: 文本/枚举/时间范围筛选
- **多列组合**: 支持多列同时筛选
- **一键重置**: 快速清空所有筛选条件

### ✏️ 数据编辑

- **行内编辑**: 双击单元格直接编辑
- **表单编辑**: 弹窗模式编辑整行数据
- **JSON 编辑**: 原始 JSON 模式编辑
- **智能转换**: 自动类型转换和 JSON 解析
- **安全删除**: 带确认提示的删除操作

### ⚙️ 配置管理

- **列定义**: 自定义列标题、宽度、行为
- **权限控制**: 设置是否可编辑、排序、搜索
- **枚举筛选**: 自定义筛选项并渲染彩色标签
- **数据验证**: 支持正则、范围、唯一性等规则
- **界面设置**: 分页大小、提示框高度等

### 📊 数据统计

- **时间趋势**: 按日/周/月分桶的折线图
- **枚举分布**: 环形图展示枚举值分布
- **数值统计**: 均值、中位数、标准差等
- **质量评估**: 完整性、一致性、规则合规率

## ⚙️ 配置说明

### 📝 配置结构

配置文件采用 JSON 格式，包含以下主要部分：

- **fieldEnum**: 定义设置面板中可编辑的配置项
- **columns**: 表格列定义和规则
- **xxx_filters**: 枚举筛选配置
- **界面设置**: 分页、宽度、高度等参数

### 🔧 完整配置示例

以下是一个完整的配置示例，展示了所有可用的配置项：

```json
{
  "fieldEnum": [
    { "key": "columns", "value": "表格列配置", "type": "json" },
    { "key": "tags_filters", "value": "标签筛选配置", "type": "json" },
    { "key": "pageSize", "value": "每页显示条数配置", "type": "number" },
    {
      "key": "rowKey",
      "value": "表格行 key（default 或字段名）",
      "type": "string"
    },
    { "key": "columnMinWidth", "value": "列最小宽度（px）", "type": "number" },
    {
      "key": "cellMaxWidth",
      "value": "单元格最大展示宽度（px，超出省略）",
      "type": "number"
    },
    {
      "key": "cellMaxLines",
      "value": "单元格最多显示行数（多行省略）",
      "type": "number"
    },
    { "key": "opColumnWidth", "value": "操作列宽度（px）", "type": "number" },
    {
      "key": "tooltipMaxHeight",
      "value": "悬浮提示框最大高度（px）",
      "type": "number"
    }
  ],
  "columns": [
    {
      "title": "ID",
      "dataIndex": "id",
      "editable": false,
      "sortable": true,
      "searchable": true,
      "width": 120
    },
    {
      "title": "名称",
      "dataIndex": "name",
      "editable": true,
      "sortable": true,
      "searchable": true
    },
    {
      "title": "标签",
      "dataIndex": "tags",
      "editable": true,
      "searchable": true
    },
    {
      "title": "创建时间",
      "dataIndex": "created_at",
      "editable": true,
      "sortable": true,
      "searchable": true,
      "isDate": true,
      "dateFormat": "YYYY-MM-DD HH:mm:ss"
    },
    {
      "title": "更新时间",
      "dataIndex": "updated_at",
      "editable": true,
      "sortable": true,
      "searchable": true,
      "isDate": true,
      "dateFormat": "YYYY-MM-DD HH:mm:ss"
    },
    {
      "title": "扩展信息",
      "dataIndex": "meta",
      "editable": true,
      "searchable": true
    }
  ],
  "tags_filters": [
    { "text": "重要", "value": "important", "tagType": "magenta" },
    { "text": "普通", "value": "normal", "tagType": "blue" },
    { "text": "归档", "value": "archived", "tagType": "gold" }
  ],
  "pageSize": 20,
  "rowKey": "default",
  "columnMinWidth": 150,
  "cellMaxWidth": 280,
  "cellMaxLines": 1,
  "opColumnWidth": 120,
  "tooltipMaxHeight": 300
}
```

### 📋 配置项详解

#### fieldEnum（设置面板配置）

定义"设置"抽屉中可编辑的配置项：

- **key**: 配置对象的键名（如 `columns`、`tags_filters`、`pageSize`）
- **value**: 设置面板显示的标签文案
- **type**: 编辑器类型
  - `json`: 多行 JSON 编辑器，保存时进行 JSON.parse 校验
  - `number`: 数字输入框
  - `string`: 文本输入框

#### columns（列配置）

定义表格列的行为和属性：

| 属性         | 类型    | 说明                                           |
| ------------ | ------- | ---------------------------------------------- |
| `title`      | string  | 列标题文本                                     |
| `dataIndex`  | string  | 对应数据中的字段名                             |
| `editable`   | boolean | 是否可编辑（行内/表单编辑生效）                |
| `sortable`   | boolean | 是否允许排序                                   |
| `searchable` | boolean | 是否出现在列级筛选工具栏                       |
| `isDate`     | boolean | 是否为日期/时间字段                            |
| `dateFormat` | string  | 日期格式（如 `YYYY-MM-DD HH:mm:ss`）           |
| `width`      | number  | 列宽（可选，未设置则受 `columnMinWidth` 影响） |

#### 数据验证规则

为列添加数据验证规则：

| 规则               | 类型    | 说明                       |
| ------------------ | ------- | -------------------------- |
| `rulePattern`      | string  | 正则表达式验证规则         |
| `ruleEnum`         | array   | 枚举值数组，限制字段值范围 |
| `ruleUnique`       | boolean | 是否要求唯一性             |
| `ruleMin`          | number  | 最小值限制                 |
| `ruleMax`          | number  | 最大值限制                 |
| `ruleDateParsable` | boolean | 是否验证日期可解析         |

> ⚠️ 注意：未启用的规则请不要写入 `null`，而应当“省略该键”。（该问题将在后续版本修复）
>
> - 实现中判断是否启用规则采用 `!== undefined`，若写入 `null` 将被视为“已配置”，从而参与比较。
> - 当 `ruleMax: null` 时，会按数值上限参与校验，导致与 `null` 比较（等价于与 0 比较），几乎所有正数都会“不通过”。
>
> 正确示例（未启用最大值规则）：
>
> ```json
> {
>   "ruleMin": 1,
>   "ruleUnique": true
> }
> ```
>
> 错误示例（不要这样写）：
>
> ```json
> {
>   "ruleMin": 1,
>   "ruleMax": null,
>   "ruleUnique": true
> }
> ```

#### 枚举筛选配置

为任意列 `foo` 定义键名为 `foo_filters` 的数组：

```json
"status_filters": [
  { "text": "激活", "value": "active", "tagType": "success" },
  { "text": "停用", "value": "inactive", "tagType": "default" }
]
```

- **text**: 显示文本
- **value**: 匹配值
- **tagType**: 标签颜色（支持 Ant Design 预设色和十六进制颜色）

#### 界面设置参数

| 参数               | 类型   | 说明                           |
| ------------------ | ------ | ------------------------------ |
| `pageSize`         | number | 分页大小                       |
| `rowKey`           | string | 行唯一键（字段名或 `default`） |
| `columnMinWidth`   | number | 列最小宽度（像素）             |
| `cellMaxWidth`     | number | 单元格最大展示宽度（像素）     |
| `cellMaxLines`     | number | 单元格最大显示行数             |
| `opColumnWidth`    | number | 操作列宽度（像素）             |
| `tooltipMaxHeight` | number | Tooltip 最大高度（像素）       |

> 💡 **提示**: 在页面中使用"设置"抽屉可实时调整配置，未保存变更会提醒确认；也可将配置导出为 `config.json` 以便复用。

## 📊 数据统计功能

### 📈 统计图表

- **时间范围**: 显示数据的时间范围
- **时间趋势**: 选择任意 `isDate` 列，按日/周/月分桶绘制折线图
- **枚举分布**: 选择存在 `xxx_filters` 的枚举字段绘制环形图
- **字段统计**: 展示字段非空记录数/总记录数、唯一值数量、数据类型、空值数量（已优化批量计算和类型缓存）
- **数值统计**: 对数值列输出均值、中位数、标准差、最值、范围、分位数
- **质量评估**: 输出字段完整性、一致性、规则合规率等指标

### ⚡ 性能优化

- **批量计算**: 字段统计采用批量计算，减少重复遍历数据
- **类型缓存**: 缓存字段类型推断结果，避免重复计算
- **Web Worker**: 大数据集（>5000 条）自动使用 Web Worker 进行后台计算
- **增量更新**: 支持增量计算，仅更新变更的字段统计
- **内存优化**: 使用 Map 和 Set 等高效数据结构，减少内存占用

### 🔧 技术实现

- **图表引擎**: 使用 ECharts（CDN UMD）
- **数据处理**: 统一时间解析器，支持多种日期格式
- **渲染优化**: 防抖渲染、结果缓存、智能更新

## 💡 使用技巧

### ✏️ 编辑操作

- **双击编辑**: 双击单元格进入行内编辑，再次双击可快速保存
- **类型支持**:
  - 文本/数字：输入框（数字自动转换）
  - 布尔值：下拉选择 `true/false`
  - 对象/数组：JSON 文本区（自动解析）
  - 日期：日期/时间选择器
- **操作列**: 右侧操作列可快速进入整行编辑或 JSON 原始编辑

### 🔍 筛选与搜索

- **全局搜索**: 支持回车搜索，在所有字段进行模糊匹配
- **列级筛选**: 支持文本、枚举、时间范围筛选
- **组合筛选**: 支持多列同时筛选
- **快速重置**: 点击"重置"按钮清空所有筛选条件

### ⚙️ 配置管理

- **实时预览**: 设置面板支持实时预览和未保存提醒
- **配置复用**: 可将配置导出为 `config.json` 以便复用
- **智能提示**: 导入配置时如有数据会提示选择保留或清空

### 🎨 界面交互

- **URL 识别**: 文本中的 `http/https` 自动识别为可点击链接
- **加载动画**: 分页大小切换时显示加载动画
- **响应式**: 支持不同屏幕尺寸的自适应显示

## 🛠️ 技术实现

### 📦 技术栈

- **前端框架**: React 18 + Ant Design 5
- **日期处理**: Day.js（支持多语言和自定义格式）
- **图表库**: ECharts 5（CDN UMD）
- **构建方式**: 纯前端实现，无依赖安装、无打包流程

### ⚡ 性能优化

- **统计缓存**: 按数据签名缓存统计结果，避免重复计算
- **Web Worker**: 大数据量时（>5000 条）启用后台计算
- **渲染防抖**: 图表渲染 120ms 防抖，避免频繁更新
- **内存管理**: 组件卸载时自动释放图表实例

### 🔧 开发说明

- **单文件架构**: 所有逻辑位于 `jsonl_viewer.html` 内部
- **离线使用**: 支持完全离线运行，无需网络连接
- **独立分发**: 便于独立分发和部署

## 🎯 适用场景

### 📊 数据分析

- **日志分析**: 查看和分析结构化日志，支持时间范围筛选
- **数据清洗**: 批量处理 JSON/JSONL 文件，快速筛选和编辑
- **数据验证**: 检查数据完整性，批量修正格式错误

### 🚀 快速开发

- **原型开发**: 快速搭建数据管理界面，无需后端开发
- **离线处理**: 本地处理敏感数据，无需上传到云端
- **配置管理**: 通过配置文件快速适配不同业务场景

### 🔒 安全场景

- **敏感数据**: 本地处理，数据不离开用户环境
- **合规要求**: 满足数据不出境等合规要求
- **内网环境**: 支持完全离线使用

## 🗺️ 发展路线

### 📋 计划功能

- [ ] 多文件合并/分片导入
- [ ] 批量编辑与规则替换
- [ ] 自定义导出格式与字段映射
- [ ] 更灵活的列渲染扩展点
- [ ] 快捷键支持
- [ ] 数据对比功能
- [ ] 导入历史记录

### 🎉 已完成

- [x] 基础数据管理功能
- [x] 配置驱动界面
- [x] 数据统计与图表展示
- [x] 性能优化与缓存
- [x] Web Worker 支持

## 📄 许可证

本项目采用 MIT License。欢迎提交 Issue 与 PR 贡献代码。

---

> 💡 **提示**: 更多配置示例和高级用法请参考 `config_examples.json` 文件
