## 通用 JSON 数据管理工具（JSON/JSONL 可视化编辑器）

一个零构建、即开即用的 JSON/JSONL 管理与编辑工具。直接用浏览器打开 `jsonl_viewer.html`，即可完成导入、筛选、编辑、导出等全流程，无需后端与打包环境。

### 特性

- **即开即用**: 纯静态页面，双击文件即可使用
- **通用数据表**: 自定义列、排序、筛选、时间范围、全局搜索
- **两种编辑模式**: 行内双击编辑/整行表单编辑 + 原始 JSON 编辑
- **配置驱动**: 用配置动态定义列、筛选项、分页、样式等
- **高可用体验**: 分页大小切换有过渡，全局轻量加载指示
- **本地安全**: 所有数据处理在浏览器内完成

### 快速开始

1. 克隆/下载本仓库
2. 使用任意现代浏览器打开根目录下的 `jsonl_viewer.html`
3. 点击“导入 JSON”加载 `.json`、`.jsonl` 或 `.txt`
4. 使用顶部工具栏进行搜索、筛选、编辑与导出

### 主要能力

- **导入/导出**
  - 导入：`.json`（数组或对象）、`.jsonl`、`.txt`
  - 导出：按当前数据导出为 JSONL 文件
  - 配置导入/导出：将当前显示规则保存/加载为 `config.json`
  - 智能解析：自动识别 JSON 数组、对象或 JSONL 格式
- **查询与筛选**
  - 全局搜索：在所有字段进行模糊匹配
  - 列级筛选：文本/枚举/时间范围（可配置日期格式与是否含时间）
  - 多列组合筛选
  - 筛选重置：一键清空所有筛选条件
- **编辑**
  - 行内双击编辑（文本、数字、布尔、对象/数组 JSON、时间）
  - 弹窗表单编辑整行；原始 JSON 模式直接编辑该行对象
  - 删除行（带确认提示）
  - 智能类型转换：数字输入自动转换、JSON 对象自动解析
- **配置化**
  - 列定义、是否可编辑、是否可排序/可搜索
  - 列宽、单元格最大显示宽度与行数、Tooltip 最大高度
  - 操作列宽度、分页大小、行主键字段
  - 自定义枚举筛选项并自动渲染彩色标签
- **数据管理**
  - 清空数据（带确认提示）
  - 重置配置（保留数据或清空数据选项）
  - 全部重置（数据+配置+筛选条件）
- **用户体验**
  - 分页大小切换带过渡动画
  - 全局加载指示器
  - 设置面板实时预览
  - 未保存变更提醒
  - URL 自动识别为可点击链接

### 配置与字段说明（通用完整示例）

下面给出一个通用、与业务无关的完整配置示例，覆盖页面可用的所有配置项与列级别能力，并合并了 `fieldEnum`。注意：示例中字段名、枚举及日期格式均可替换。

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

在页面中使用“设置”抽屉可实时调整配置，未保存变更会提醒确认；也可将配置导出为 `config.json` 以便复用。

说明：

- **fieldEnum**: 声明“设置”抽屉中可编辑的配置项与编辑器类型。

  - **key**: 配置对象的键名（如 `columns`、`tags_filters`、`pageSize`）。
  - **value**: 设置面板显示的标签文案。
  - **type**: 编辑器类型与保存规则：`json`（多行 JSON，保存时会 JSON.parse 校验）、`number`（数字输入）、`string`（文本输入）。

- **columns**: 列配置数组，用于定义表头与数据映射。

  - **title**: 列标题文本。
  - **dataIndex**: 对应数据中的字段名。
  - **editable**: 是否可编辑（行内/表单编辑生效）。
  - **sortable**: 是否允许排序（对象会序列化后比较）。
  - **searchable**: 是否出现在“列级筛选”工具栏；若 `isDate=true` 会展示时间范围选择器。
  - **isDate**: 将该列视为日期/时间；编辑器为日期/时间选择器。
  - **dateFormat**: 日期格式（如 `YYYY-MM-DD`、`YYYY-MM-DD HH:mm:ss`）。
  - **width**: 列宽（可选）。未设置则受 `columnMinWidth` 影响。

- 动态枚举筛选：为任意列 `foo` 定义键名为 `foo_filters` 的数组，即可在渲染与筛选时生效，例如示例中的 `tags_filters`。

  - 每项 `{ text, value, tagType }`：显示文本、匹配值、颜色（AntD 预设色）。

- **pageSize**: 分页大小（可在页面切换）。
- **rowKey**: 行唯一键（字段名或 `default` 使用内部序号）。
- **columnMinWidth**: 列最小宽度。
- **cellMaxWidth**: 单元格最大展示宽度（像素）。
- **cellMaxLines**: 单元格最大显示行数。
- **opColumnWidth**: 操作列宽度（像素）。
- **tooltipMaxHeight**: Tooltip 最大高度（像素）。

编辑行为与类型支持：

- 文本/数字：输入框（数字尝试转换为 Number）。
- 布尔：下拉选择 `true/false`。
- 对象/数组：JSON 文本区（自动尝试解析）。
- 日期：日期/时间选择器，按 `dateFormat` 存储字符串。
- 原始 JSON 编辑：支持整行对象的 JSON 文本编辑。

高级用法提示：

- 为不同业务列添加各自的 `xxx_filters`，即可同时获得：
  - 工具栏下拉筛选；
  - 表格内将匹配值渲染为彩色标签；
  - 行内/表单编辑时自动切换为下拉选择。
- URL 自动识别为可点击链接（字符串内的 `http/https` 片段会被转为 `<a>`）。

### 使用小贴士

- **编辑操作**
  - 双击单元格进入行内编辑；再次双击当前行可快速保存
  - 时间列使用选择器；布尔值使用下拉；对象/数组自动切换 JSON 文本区
  - 右侧"操作"列可快速进入整行编辑或 JSON 原始编辑
- **筛选与搜索**
  - 全局搜索框支持回车搜索
  - 列级筛选支持文本、枚举、时间范围
  - 点击"重置"按钮清空所有筛选条件
- **数据管理**
  - 导入配置时如有数据会提示选择保留或清空
  - 重置配置时会根据是否有数据提供不同选项
  - 全部重置会清空数据、配置、搜索和筛选条件
- **界面交互**
  - URL 文本自动识别为可点击链接
  - 分页大小切换时显示加载动画
  - 设置面板支持实时预览和未保存提醒

### 技术栈

- React 18、Ant Design 5、Day.js（通过 CDN UMD 引入）
- 纯前端实现，无依赖安装、无打包流程

### 开发说明（可选）

本工具以单文件形式存在，逻辑位于 `jsonl_viewer.html` 内部的 `<script type="text/babel">`，便于独立分发与离线使用。

### 适用场景

- **数据清洗与标注**：批量处理 JSON/JSONL 日志文件，快速筛选和编辑数据
- **日志分析**：查看和分析结构化日志，支持时间范围筛选和状态标签
- **数据验证**：检查 JSON 数据完整性，批量修正格式错误
- **原型开发**：快速搭建数据管理界面，无需后端开发
- **离线数据处理**：本地处理敏感数据，无需上传到云端

### 路线图

- 多文件合并/分片导入
- 批量编辑与规则替换
- 自定义导出格式与字段映射
- 更灵活的列渲染扩展点
- 数据统计与图表展示
- 快捷键支持

### 许可协议

建议使用 MIT License。欢迎提交 Issue 与 PR。
