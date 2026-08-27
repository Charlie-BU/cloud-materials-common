# @cloud-materials/common

## 1.20.1

### 🐛 **Bug Fixes**

- **CFeeCalculator**: 计费器支持隐藏总价([56773265](https://code.byted.org/cloud-fe/cloud-materials/commit/56773265))
- common.CDetailPage 新增 renderActiveTabContent，更细粒度的控制 tab 内容展示([d80a2b00](https://code.byted.org/cloud-fe/cloud-materials/commit/d80a2b00))
- 修复 CInfoSection jsx 使用 colNumber 未生效问题([88af342e](https://code.byted.org/cloud-fe/cloud-materials/commit/88af342e))
- checkAllTitle 可导出 serachStr([6bd6cf93](https://code.byted.org/cloud-fe/cloud-materials/commit/6bd6cf93))
- `调整一些 en 文案`([25a5051e](https://code.byted.org/cloud-fe/cloud-materials/commit/25a5051e))

## 1.20.0

### 🐛 **Bug Fixes**

- CLoading.Spin、CLoading.Result、CLoadingV2 增加 children 属性适配 React18 类型定义([b18a8afe](https://code.byted.org/cloud-fe/cloud-materials/commit/b18a8afe))
- fix(common.CInfoSection): 修复 CInfoSection children 字段隐藏问题；移除迷惑的 useInfoSection；修复 calcSpan 导致的字段消失问题([3dfc5e25](https://code.byted.org/cloud-fe/cloud-materials/commit/3dfc5e25))
- 获取合法的 activeTabKey，初始化默认选中；DetailPage.init 前置到到 Detail.constructor 中;初始化默认选中可用的 key([09a45fbb](https://code.byted.org/cloud-fe/cloud-materials/commit/09a45fbb))

## 1.19.1

### 🐛 **Bug Fixes**

- 解决对 localtion.search 取值时，没有去除问号的问题，导致初始化时，无法固定到 URL 参数对应的 tab([93efc598](https://code.byted.org/cloud-fe/cloud-materials/commit/93efc598))
- `CTable` 修复 arcoColumnProps 回传 row 类型([29a143a2](https://code.byted.org/cloud-fe/cloud-materials/commit/29a143a2))
- 修改断点 1290->1280；修复 CInfoSection.List.listData.splitItemList 失效问题([60917994](https://code.byted.org/cloud-fe/cloud-materials/commit/60917994))

## 1.19.0

### 💎 **Features**

- [CDetailPage] 优化 loading 的展示位置，避免太靠页面顶部；支持刷新时，不卸载 tab 内部的组件([f45869d3](https://code.byted.org/cloud-fe/cloud-materials/commit/f45869d3))
- hooks: 新增 useBreakpoint；CInfoSection 支持自适应配置；自他自适应组件适配中([9d6c0eb1](https://code.byted.org/cloud-fe/cloud-materials/commit/9d6c0eb1))

### 🐛 **Bug Fixes**

- `验证 bp 主题包的版本大于等于 0.2.4`([626e291e](https://code.byted.org/cloud-fe/cloud-materials/commit/626e291e))
- **common.CForm**: cformasyncselect 增加导出类&清空时增加判断非空([666e0a16](https://code.byted.org/cloud-fe/cloud-materials/commit/666e0a16))
- **CTable**: 增加 onColumnVisibleChange 钩子([41554f14](https://code.byted.org/cloud-fe/cloud-materials/commit/41554f14))
- Section 新增 extra 属性,支持自定义 header 内右侧内容([215626e1](https://code.byted.org/cloud-fe/cloud-materials/commit/215626e1))
- **common.CForm**: fieldsReactive 依赖字段之间有相互依赖时，导致 fieldCallback 中 depValues 为旧数据([80252e0a](https://code.byted.org/cloud-fe/cloud-materials/commit/80252e0a))
- **CAgreement**: 支持透传 arcoPopoverProps 对协议描述信息的气泡框进行设置([1a6db0d2](https://code.byted.org/cloud-fe/cloud-materials/commit/1a6db0d2))
- **CConfigPreview**: 新增 beforeSubmit 属性：点击提交前的回调函数，返回 boolean，如果返回 false，会终止提交流程。该方法的触发时机：表单校验完成后，onSubmit 调用前。([142218fe](https://code.byted.org/cloud-fe/cloud-materials/commit/142218fe))
- `CTable` 修复 arcoColumnProps 类型未添加列类型的问题([a1a60668](https://code.byted.org/cloud-fe/cloud-materials/commit/a1a60668))
- fix(common.CDrawerSelect): 修复开启 showDefaultFooter 时,未点击确认就触发 onChange 的问题([8445378b](https://code.byted.org/cloud-fe/cloud-materials/commit/8445378b))
- @storage-fe/formily-arco 升级, 支持 ArrayTable 处理 ObjectField([f2bb786c](https://code.byted.org/cloud-fe/cloud-materials/commit/f2bb786c))

## 1.18.0

### 💎 **Features**

- 新增`CTour`组件,支持业务用于漫游式引导功能([7c7c9113](https://code.byted.org/cloud-fe/cloud-materials/commit/7c7c9113))
- 新增 CAsyncContent 用于处理 fetcher loading content error 场景([9e2dacec](https://code.byted.org/cloud-fe/cloud-materials/commit/9e2dacec))

### 🐛 **Bug Fixes**

- **common.CSearch**: 复合搜索支持配置不展示键盘操作提示([e7d730ad](https://code.byted.org/cloud-fe/cloud-materials/commit/e7d730ad))
- `common.CSearch`: css 变量使用修改为 less 变量([afaefb75](https://code.byted.org/cloud-fe/cloud-materials/commit/afaefb75))
- [CDetailPage] 解决 url 中有中文,切换 tab 时,中文被循环 encode 的问题;统一对 query 的操作为 qs 处理([cd9a84fe](https://code.byted.org/cloud-fe/cloud-materials/commit/cd9a84fe))
- CTable 解决左下角的的取消选择没有翻译的问题([6568808d](https://code.byted.org/cloud-fe/cloud-materials/commit/6568808d))
- `CSidebar` Feeback 在展开时不再展示 popover([03b75bc7](https://code.byted.org/cloud-fe/cloud-materials/commit/03b75bc7))
- `CTable` 修复 CTable.changeToolbarValues debounce 不生效的问题([212313a7](https://code.byted.org/cloud-fe/cloud-materials/commit/212313a7))
- CContentWrapper 增加 customTopContent 参数([cbaaa982](https://code.byted.org/cloud-fe/cloud-materials/commit/cbaaa982))
- `CDetailPage` 更新文档([f47769ab](https://code.byted.org/cloud-fe/cloud-materials/commit/f47769ab))
- `sidebar.Feedback` 修复 tooltip 可能被截断的问题([6b9f51b5](https://code.byted.org/cloud-fe/cloud-materials/commit/6b9f51b5))
- `CSidebar` 修复 Feeback tooltips 可能被遮挡的问题([65ff23dd](https://code.byted.org/cloud-fe/cloud-materials/commit/65ff23dd))

## 1.17.0

### 💎 **Features**

- CSidebar 支持内置反馈按钮，并且收起控制区域不在支持 hover 后展开收起的菜单([6ff8d6fa](https://code.byted.org/cloud-fe/cloud-materials/commit/6ff8d6fa))

### 🐛 **Bug Fixes**

- `CModal.confirm` 修复 hideCancel 不工作的问题([6065c5bb](https://code.byted.org/cloud-fe/cloud-materials/commit/6065c5bb))

## 1.16.1

### 🐛 **Bug Fixes**

- feat(CConditions): 条件切换支持唯一选项卡片展示([8c5c5848](https://code.byted.org/cloud-fe/cloud-materials/commit/8c5c5848))
- **CForm**: CFormAsyncSelect 在 CForm 中使用时，依赖更新，数据源是否立即刷新根据`autoLoad`属性决定([dcc54756](https://code.byted.org/cloud-fe/cloud-materials/commit/dcc54756))
- CDetailPage 支持刷新时,不清空 globalScope([a453cc88](https://code.byted.org/cloud-fe/cloud-materials/commit/a453cc88))
- fix(common.CTable): 解决 expand row 配置没有响应 GlobalScope 类型的问题([8c4bd6a3](https://code.byted.org/cloud-fe/cloud-materials/commit/8c4bd6a3))
- [CTable] 解决配置表格的 startPoolingAfterInitData 后，表格的轮训在表格卸载后可能不会停止的问题([b104e889](https://code.byted.org/cloud-fe/cloud-materials/commit/b104e889))
- `Cmodal.OpenForm` 修复可能出现的类型错误([e5fc004d](https://code.byted.org/cloud-fe/cloud-materials/commit/e5fc004d))

## 1.16.0

### 💎 **Features**

- - [CTable] 支持定义 GlobalScope 泛型([a1d82119](https://code.byted.org/cloud-fe/cloud-materials/commit/a1d82119))
  - [CDetailPage] 执行定义 GlobalScope 泛型
- `CLoadingV2` 修改 Result 组件 icon 包管理方式,大大缩小产物体积([3d4f17c1](https://code.byted.org/cloud-fe/cloud-materials/commit/3d4f17c1))

### 🐛 **Bug Fixes**

- **CForm**: 升级 `formily-arco`至`1.6.13`解决：ArrayItem SortHandle 支持自定义图标&ArrayTable 在隐藏列时更新渲染([4b295add](https://code.byted.org/cloud-fe/cloud-materials/commit/4b295add))
- `CDrawer` 优化 StepForm 的 step 宽度效果([1a6d05b2](https://code.byted.org/cloud-fe/cloud-materials/commit/1a6d05b2))
- **CFeeCalculator**: 1. 已省 X 元的语序问题根据所选语言修正 2.完善海外计费器的 DEMO([35080615](https://code.byted.org/cloud-fe/cloud-materials/commit/35080615))

## 1.15.2

### 🐛 **Bug Fixes**

- **CForm** visible 等响应式函数，在 cfield 卸载时取消响应([85bdde5f](https://code.byted.org/cloud-fe/cloud-materials/commit/85bdde5f))
- `CDrawer`优化 CDrawer.Detail Tabs paddingLeft 视觉效果([fa3e6d0e](https://code.byted.org/cloud-fe/cloud-materials/commit/fa3e6d0e))
- **CForm** 修复 CFormAsyncSelect 在 disabled 并传入禁用原因时，未省略时不展示 popover 的问题&非加载错误态时自定义 dropdownRender([80d61593](https://code.byted.org/cloud-fe/cloud-materials/commit/80d61593))
- **CForm** 修复 CFormAsyncSelectReactive 自定义 renderFormat、onSelect、onDeselect 参数类型问题&内置 renderFormat 支持 label(value)格式([429c570f](https://code.byted.org/cloud-fe/cloud-materials/commit/429c570f))
- **CSearch** 修复 CSearch 在 manual 传入对象且重复生成配置时，导致重渲染 & CCombineSearch 更新参数时排除空对象([52f9b66d](https://code.byted.org/cloud-fe/cloud-materials/commit/52f9b66d))

## 1.15.1

### 🐛 **Bug Fixes**

- **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 （不检查用户安装的兼容版本）([d236ed84](https://code.byted.org/cloud-fe/cloud-materials/commit/d236ed84))
- `CTable` 修复全局 enableRaceCondition 可能不生效的问题([90406865](https://code.byted.org/cloud-fe/cloud-materials/commit/90406865))
- **CConfigPreview**: 1. 支持透传 className 和 style；重新计算配置详情组件的 max-height 前重置 max-height，避免用户自定义的显隐逻辑无法触发高度的重新计算([78dbdfde](https://code.byted.org/cloud-fe/cloud-materials/commit/78dbdfde))
  **CFeeCalculator**: 1. 支持 visible 属性，控制组件显隐
- `CDetail` 修复因升级火山主题导致的 tab padding left 问题([8e0fb8c3](https://code.byted.org/cloud-fe/cloud-materials/commit/8e0fb8c3))
- **CForm** 修复 cformasyncselect 传入 label 为空字符串高度未撑开的问题&fetcher 抛出错误给 useInfiniteScroll 处理([21f98df8](https://code.byted.org/cloud-fe/cloud-materials/commit/21f98df8))
- **CForm** 修复 cformasyncselect 重置后 focus 时不请求的问题([9cef46d7](https://code.byted.org/cloud-fe/cloud-materials/commit/9cef46d7))
- `CSidebar` 修复控制台 react 警告([a0adc302](https://code.byted.org/cloud-fe/cloud-materials/commit/a0adc302))

## 1.15.0

### 💎 **Features**

- `CPopupEdit` 英语状态下按钮文案为 Save([5f830949](https://code.byted.org/cloud-fe/cloud-materials/commit/5f830949))
  `CPopupEdit`和`CNameInfo` 支持通过 CConfigProvider.cComponentConfig 全局配置属性

### 🐛 **Bug Fixes**

- **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 测试([3805d863](https://code.byted.org/cloud-fe/cloud-materials/commit/3805d863))
- **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败([4b02207e](https://code.byted.org/cloud-fe/cloud-materials/commit/4b02207e))
- **CSideBar**([56e28e33](https://code.byted.org/cloud-fe/cloud-materials/commit/56e28e33))
  - 优化初次加载后再展开菜单时造成的“闪动”问题
  - 优化 `currentPath` 的逻辑，初次加载时若包含 currentPath，可能忽略`defaultSelectedKeys` 和 `defaultOpenKeys`
- **CForm** CFormAsyncSelect 支持自定义处理 options&内置 option 的 getPopupContainer 使用组件配置&修复重复请求([4133104a](https://code.byted.org/cloud-fe/cloud-materials/commit/4133104a))
- **CForm** CFormAsyncSelect 修复 allowCreate 时 extra 数据未取到，挂载 field.dataSource 只挂载 list 数据([c4dd3781](https://code.byted.org/cloud-fe/cloud-materials/commit/c4dd3781))
- `CModal.Form` 改进 CModal.openForm 的 Promise 类型([664ad74d](https://code.byted.org/cloud-fe/cloud-materials/commit/664ad74d))
- 修改本地模式下 sourceTree 更新时 target 值随之更新的时机。 避免在自定义搜索时修改 sourceTree 导致 target 变化的问题([fd78ca69](https://code.byted.org/cloud-fe/cloud-materials/commit/fd78ca69))
- **CCascaderSearch** 受控时，修复传入 value 触发 onChange 的问题([983dc446](https://code.byted.org/cloud-fe/cloud-materials/commit/983dc446))
- `CModal.openForm`修复 jsx 形式使用时 onOk 返回值被限制的问题([8907279c](https://code.byted.org/cloud-fe/cloud-materials/commit/8907279c))
- `CModal.openForm` 类型优化,兼容 ts4.9([69d7ef3b](https://code.byted.org/cloud-fe/cloud-materials/commit/69d7ef3b))
- CDetailPage Refresh 文案修改为大写开头([1ba57fb4](https://code.byted.org/cloud-fe/cloud-materials/commit/1ba57fb4))
- CConditionsGroup 的 conditionRender 新增 groupIndex 参数([61a30562](https://code.byted.org/cloud-fe/cloud-materials/commit/61a30562))

## 1.14.0

### 💎 **Features**

- **CForm**: 内置 AsyncSelect，解决 value 和 dataSource 的受控，ifAutoLoadFirst 的错误覆盖问题，切换步骤 label 丢失，readPretty 展示([368e058b](https://code.byted.org/cloud-fe/cloud-materials/commit/368e058b))
- - 轮训时，在 fetcher 中加入 isPolling 标识([7c40a41e](https://code.byted.org/cloud-fe/cloud-materials/commit/7c40a41e))
  - 支持 startPoolingAfterInitData 控制是否在初始化请求后再开始轮训，避免初始化时同时触发两个请求
- [CBatchPasteInput] arcoTagProps 支持配置为函数; 支持 tagTips 参数([6b36f619](https://code.byted.org/cloud-fe/cloud-materials/commit/6b36f619))

### 🐛 **Bug Fixes**

- 更新依赖声明，使用 ^ 代替固定版本号([5be1788a](https://code.byted.org/cloud-fe/cloud-materials/commit/5be1788a))
- 内部移除并禁用从 arco/lib 导入, 防止引用到 cjs 模块造成产物增大([a13ce235](https://code.byted.org/cloud-fe/cloud-materials/commit/a13ce235))
- 导出功能优化，增加 showExportRangeKeys 与 exportRangeDesc 参数，控制导出时的范围选项([58bbd67e](https://code.byted.org/cloud-fe/cloud-materials/commit/58bbd67e))
- **CForm** heleper.effect featchData 和异步 validator 支持配置竞态处理([1feb5c77](https://code.byted.org/cloud-fe/cloud-materials/commit/1feb5c77))
- `CTable`替换通用 safeRace 方案([501ac904](https://code.byted.org/cloud-fe/cloud-materials/commit/501ac904))
- `CTable` 支持从 CConfigProvider 配置竞态开关([3e23f0e6](https://code.byted.org/cloud-fe/cloud-materials/commit/3e23f0e6))
- 增加自定义左侧全选 title 能力;对于 disable 的项在全选时不选中; 支持本地模式下 source 数据的异步加载([d875c2f0](https://code.byted.org/cloud-fe/cloud-materials/commit/d875c2f0))
- **CForm** 修复高阶组件 ReactiveWithForm 中标识重复导致未执行监听依赖函数的问题 & 类型修改([a4854053](https://code.byted.org/cloud-fe/cloud-materials/commit/a4854053))
- **CFeeCalculator**: 设置规范变更，黄色改为橙色([5e9db34e](https://code.byted.org/cloud-fe/cloud-materials/commit/5e9db34e))
  **CFeeType**: 设置规范变更，黄色改为橙色
  **CAgreement**: 修改前缀的颜色
- `CForm` 修复 array remove 按钮 disabled 属性不生效问题([da13cce3](https://code.byted.org/cloud-fe/cloud-materials/commit/da13cce3))
- CTabs：修复无左边底部 border 的 Bug([f7c42ebe](https://code.byted.org/cloud-fe/cloud-materials/commit/f7c42ebe))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.24
- @arco-design/theme-volcengine-ui-v3@0.1.4
- @arco-design/web-react@2.64.1
- @arco-design/iconbox-react-ve-o-design@1.1.27

## 1.13.3

### 🐛 **Bug Fixes**

- `CDetailPage` 支持通过 enableRaceCondition 配置 fetcher 处理竞态问题([a0e68b8a](https://code.byted.org/cloud-fe/cloud-materials/commit/a0e68b8a))
- **CSideBar** 修复 sidebar 标题部分情况下单词被切割的问题([8459dd12](https://code.byted.org/cloud-fe/cloud-materials/commit/8459dd12))

## 1.13.2

### 🐛 **Bug Fixes**

- **CForm**: 升级 formily-arco 到 1.6.11，修改 FormItem 的 tooltip，cursor 改为 pointer。([9855cd1e](https://code.byted.org/cloud-fe/cloud-materials/commit/9855cd1e))
- **CTable**: 加固自定义列中对 localStorage 的处理逻辑([0a18d261](https://code.byted.org/cloud-fe/cloud-materials/commit/0a18d261))
- **CFeeCalculator**: 修改费用详情的小问号图标的 cursor 为 pointer([4dc8b901](https://code.byted.org/cloud-fe/cloud-materials/commit/4dc8b901))
- `CSidebar` 新增 `collapsible` 属性,用于控制菜单不可被收起([d5f0b2fc](https://code.byted.org/cloud-fe/cloud-materials/commit/d5f0b2fc))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.21

## 1.13.1

### 🐛 **Bug Fixes**

- `CConfigProvider` 支持监听组件打印的日志([a6cbfec7](https://code.byted.org/cloud-fe/cloud-materials/commit/a6cbfec7))

## 1.13.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- **common.CSearch**: 支持传入手动搜索和重置按钮的属性，手动搜索时不防抖([8670d567](https://code.byted.org/cloud-fe/cloud-materials/commit/8670d567))
- **CTreeTransfer** 增加 AutoExpandTarget 参数，为 true 时选中节点后自动展开([b759dbe9](https://code.byted.org/cloud-fe/cloud-materials/commit/b759dbe9))
- **CTreeTransfer** targetTree 清空时，若为本地模式不去情况已选中项([5d50b6e9](https://code.byted.org/cloud-fe/cloud-materials/commit/5d50b6e9))
- **CFeeType** 修复 CFeeType 在倒计时为 1-2 天时间内，展示倒计时时间错误的问题([e730925f](https://code.byted.org/cloud-fe/cloud-materials/commit/e730925f))
- `CListEditor` 组件 修复组件外 form 重置时,组件内部状态不匹配问题([5b7b5f18](https://code.byted.org/cloud-fe/cloud-materials/commit/5b7b5f18))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.17
- @arco-design/theme-volcengine-ui-v3@0.1.3
- @arco-design/web-react@2.64.0

## 1.12.0

### 💎 **Features**

- 添加 CTextFormat 组件,用于满足计费场景下的折扣文案格式化([8bed41a9](https://code.byted.org/cloud-fe/cloud-materials/commit/8bed41a9))

### 🐛 **Bug Fixes**

- `common.CForm`: 升级 storage-formily，FormItem 的 label 由 Tooltip 改为 Popover([ded58852](https://code.byted.org/cloud-fe/cloud-materials/commit/ded58852))
- CConditions: 支持按钮文案自定义([e985871f](https://code.byted.org/cloud-fe/cloud-materials/commit/e985871f))
- `common.CSearch`: 复合搜索支持单独 select 选项配置搜索时 fuzzyConfig([bd2af90d](https://code.byted.org/cloud-fe/cloud-materials/commit/bd2af90d))
- **CSearch** 高级搜索支持配置折叠面板默认值([b0d30c7b](https://code.byted.org/cloud-fe/cloud-materials/commit/b0d30c7b))
- **CSearch** 复合搜索优化 inline 模式下 custom 配置，增加 onCancel 控制([8a048c98](https://code.byted.org/cloud-fe/cloud-materials/commit/8a048c98))
- **common.CSearch**: 修复复合搜索 list 重新生成导致输入临时值清空的问题([6bb73289](https://code.byted.org/cloud-fe/cloud-materials/commit/6bb73289))
- **CForm** 修复 Section 组件 title 不能传入除 string 以外类型的问题([59eb294f](https://code.byted.org/cloud-fe/cloud-materials/commit/59eb294f))
- CGuide 更新首次折叠闪烁问题([bc6d8fac](https://code.byted.org/cloud-fe/cloud-materials/commit/bc6d8fac))

## 1.11.0

### 💎 **Features**

- CEllipsis 新增 suffix 属性([7f09fb21](https://code.byted.org/cloud-fe/cloud-materials/commit/7f09fb21))

### 🐛 **Bug Fixes**

- **chore**: 升级 formily-arco 到 1.6.8，formily-arco 去除多余 moment 依赖包([8ce32259](https://code.byted.org/cloud-fe/cloud-materials/commit/8ce32259))
- `common.CSearch`: 复合搜索支持模糊搜索时 onSearch 事件，支持传入 popoverTriggerProps([b5dc7343](https://code.byted.org/cloud-fe/cloud-materials/commit/b5dc7343))
- **CModal.Form** helper subFieldValidChecker 支持配置是否校验([bfcf24e4](https://code.byted.org/cloud-fe/cloud-materials/commit/bfcf24e4))
- `CModal.Form`支持保留提交和验证能力的同时自定义 footer([4754f912](https://code.byted.org/cloud-fe/cloud-materials/commit/4754f912))
- 修复 sidebar 文档站卡死问题([a70fda5b](https://code.byted.org/cloud-fe/cloud-materials/commit/a70fda5b))
- `CSidebar` 优化渲染为 a 标签时的点击区域([d308001d](https://code.byted.org/cloud-fe/cloud-materials/commit/d308001d))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.13
- @arco-design/web-react@2.63.3

## 1.10.1

### 🐛 **Bug Fixes**

- 升级 arco-cli,提升文档同步成功率([cb7b32b8](https://code.byted.org/cloud-fe/cloud-materials/commit/cb7b32b8))
- CAddButton 替换 icon 为源力 icon([ad8c6096](https://code.byted.org/cloud-fe/cloud-materials/commit/ad8c6096))
- `CDropdown` 图标替换为源力图标([15f3fae0](https://code.byted.org/cloud-fe/cloud-materials/commit/15f3fae0))
- `CSideBar`兼容异步菜单场景([1840247e](https://code.byted.org/cloud-fe/cloud-materials/commit/1840247e))
- `common.CContentWrapper`: 调整 full-page 下内容的 top-padding 为 24px([e15af649](https://code.byted.org/cloud-fe/cloud-materials/commit/e15af649))
- `common.CForm`: 修复 checkbox 组件 props 传入 children 被删掉的问题([515c9ee9](https://code.byted.org/cloud-fe/cloud-materials/commit/515c9ee9))
- `common.CForm`: 修复使用 validatorReactive 有其他错误时导致页面滚动至其他错误字段的问题([d715229c](https://code.byted.org/cloud-fe/cloud-materials/commit/d715229c))
- `common.CSearch`: 复合搜索 validator 传参增加新旧值，分割搜索词过滤空字符串([b4493f6e](https://code.byted.org/cloud-fe/cloud-materials/commit/b4493f6e))
- 修复渐变 CTag 渐变色方向([3e54f33d](https://code.byted.org/cloud-fe/cloud-materials/commit/3e54f33d))
- 对齐部分组件 byteplus 英文文案的规范([7199ee83](https://code.byted.org/cloud-fe/cloud-materials/commit/7199ee83))
- `CModal` 修复 CModal.Table arcoTableProps 作为函数未生效的问题([cd4365e7](https://code.byted.org/cloud-fe/cloud-materials/commit/cd4365e7))

## 1.10.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- 添加环境变量用于跳过 formily 检查([1d931ac4](https://code.byted.org/cloud-fe/cloud-materials/commit/1d931ac4))
- **common.CForm**: cform 修复配置 required 时，fieldsReactive 导致隐藏字段触发校验([81c97790](https://code.byted.org/cloud-fe/cloud-materials/commit/81c97790))
- **CForm**: 规范 CForm 的全局 less 变量名,防止与业务冲突([741d7a55](https://code.byted.org/cloud-fe/cloud-materials/commit/741d7a55))
- `CSidebar` 改进宽度控制体验([6daa1fd0](https://code.byted.org/cloud-fe/cloud-materials/commit/6daa1fd0))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.9
- @arco-design/web-react@2.63.1

## 1.9.2

### 🐛 **Bug Fixes**

- feat(common.CBrandBanner): 修改 BrandBanner 的内容区对齐方式,并修改默认字号为 13px([cd627fbf](https://code.byted.org/cloud-fe/cloud-materials/commit/cd627fbf))
- `CAsyncSelect`: 修复 hover tag popover 为空的问题([39119586](https://code.byted.org/cloud-fe/cloud-materials/commit/39119586))
- **CForm**: 修复 validatorReactive 在字段隐藏后触发校验的问题([494380cd](https://code.byted.org/cloud-fe/cloud-materials/commit/494380cd))
- 规范部分组件的全局 less 变量名,防止与业务冲突([f75a8d9d](https://code.byted.org/cloud-fe/cloud-materials/commit/f75a8d9d))
- **CAgreement**: 协议组件 BP 翻译问题修改([4514a23b](https://code.byted.org/cloud-fe/cloud-materials/commit/4514a23b))
  **CConfigPreview**: 1. onSubmit 中添加数量和时长传参 2.提交按钮去除 htmlType=button 的属性
- **CAgreement**: 协议组件 prefix 属性修改为 ReactNode([91167684](https://code.byted.org/cloud-fe/cloud-materials/commit/91167684))

## 1.9.1

### 🐛 **Bug Fixes**

- `common.CForm`: 升级依赖@storage-fe/formily-arco 从 1.6.0 到 1.6.6([85707704](https://code.byted.org/cloud-fe/cloud-materials/commit/85707704))
- **CFeeType** 适配 bp 计费状态文案([ae4d78de](https://code.byted.org/cloud-fe/cloud-materials/commit/ae4d78de))
- `common.CSearch`: 修复复合搜索远程搜索后候选项未更新，新增复合搜索自定义筛选项使用 CAsyncSelect 和键盘事件 demo([625adf45](https://code.byted.org/cloud-fe/cloud-materials/commit/625adf45))
- **CConfigPreview**: 新增 InfoPreviewProps.layout 属性，支持修改描述列表的布局，适应 BP 的垂直布局([3468d768](https://code.byted.org/cloud-fe/cloud-materials/commit/3468d768))

## 1.9.0

### 💎 **Features**

- `common.CForm`: 将 font-size 和 font-weight 的固定值改为 css 变量([f8ef202e](https://code.byted.org/cloud-fe/cloud-materials/commit/f8ef202e))

### 🐛 **Bug Fixes**

- [CTable]列过滤、列搜索、下载确定文案适配英语([8479702d](https://code.byted.org/cloud-fe/cloud-materials/commit/8479702d))
- `common.CSearch`: 修复级联搜索传入 arcoSelectProps.onChange 不生效的问题([a58494e2](https://code.byted.org/cloud-fe/cloud-materials/commit/a58494e2))
- `common.CSearch`: 修复复合搜索搜分组项目 disabled 未生效的问题([1a8fecbf](https://code.byted.org/cloud-fe/cloud-materials/commit/1a8fecbf))
- `CTabs` 修复 arco 样式前缀 hardcoding 的问题([6d2687a7](https://code.byted.org/cloud-fe/cloud-materials/commit/6d2687a7))
- **CFeeCalculator**: 1. 折扣中展示单位([7995060e](https://code.byted.org/cloud-fe/cloud-materials/commit/7995060e))
  **CFeeCalculator**: 2. 新增 customRenderPriceNode 属性支持自定义整个价格节点

## 1.8.0

### 💎 **Features**

- `common.CContentWrapper`: 增加 layout 为 normal 时对 content 和 header 的 style 配置([1168e24e](https://code.byted.org/cloud-fe/cloud-materials/commit/1168e24e))
- [CTable] 支持配置声明 column.title 受控([ca279168](https://code.byted.org/cloud-fe/cloud-materials/commit/ca279168))
- [CTable] 支持配置 useMemoTableCell 优化 arco 的行选择动作会导致整个 table 渲染的问题([07890867](https://code.byted.org/cloud-fe/cloud-materials/commit/07890867))

### 🐛 **Bug Fixes**

- 升级 formily-arco，解决 ArrayTable 嵌套 ArrayItem 场景，当字段报错时异常翻页导致内容消失的问题([d0af144f](https://code.byted.org/cloud-fe/cloud-materials/commit/d0af144f))
- `CSearch.CCombinSearch`复合搜索：修复 pop 内容位置未固定，还原 tag 样式、options 分类样式、inline 模式高度、清除图标样式，支持 tab 键切换下一个 option，select 筛选项支持搜素事件，支持选项禁用，文档示例调整([04ea9c49](https://code.byted.org/cloud-fe/cloud-materials/commit/04ea9c49))
- [CTable] table 的列提示 icon 修改为问号([55be5714](https://code.byted.org/cloud-fe/cloud-materials/commit/55be5714))
- [CTable] 解决 hover 一整行时，popup edit icon 不显示的问题([0a698de9](https://code.byted.org/cloud-fe/cloud-materials/commit/0a698de9))
- `CConfigProvider`去除 cTheme 配置，增加`CConfigProvider.defineENCComponentConfig`用于返回 BytePlus 下的预设配置([a94547b1](https://code.byted.org/cloud-fe/cloud-materials/commit/a94547b1))
  `CFeeCalculator`增加 theme 配置用于配置不同语言下的主题样式
- **CModal** 优化滚动区域阴影效果([f8ade2c4](https://code.byted.org/cloud-fe/cloud-materials/commit/f8ade2c4))
- `CCollpase` 修复 Popover 模式下最后一个 Tag 样式([6c21e18e](https://code.byted.org/cloud-fe/cloud-materials/commit/6c21e18e))
- CDetail: 调整 tabs 的样式使 type=line 时边缘与内容区域对齐([c3c72dff](https://code.byted.org/cloud-fe/cloud-materials/commit/c3c72dff))
- **CFeeType** 修正按量计费和包年包月英文文案([46b7fa09](https://code.byted.org/cloud-fe/cloud-materials/commit/46b7fa09))
- **CFeeCalculator**: 1. 支持货币代码 2. 支持金额分隔符 3.支持从 CConfigProvider 配置公共属性 4. 支持海外版本的计费样式([08503505](https://code.byted.org/cloud-fe/cloud-materials/commit/08503505))
- **CFeeCalculator**: 海外计费器样式走差修改([b77fa142](https://code.byted.org/cloud-fe/cloud-materials/commit/b77fa142))
- **CFeeCalculator**: 海外计费器: 1.折扣部分不展示货币代码(USD)。 2.折扣形式修改为金额在前：如 \$30 saved 。3. 数量翻译修改。([2b06a102](https://code.byted.org/cloud-fe/cloud-materials/commit/2b06a102))
- `common.COperationMenu: 在英文模式下，text btn 的字号改为 14px`([677b57d5](https://code.byted.org/cloud-fe/cloud-materials/commit/677b57d5))
- `CListEditor`: addBtnSuffix 允许传入函数,覆盖更多场景([b39624ca](https://code.byted.org/cloud-fe/cloud-materials/commit/b39624ca))

## 1.7.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `common.CTableTransfer` 右侧数据操作列支持用户自定义([2822d1a1](https://code.byted.org/cloud-fe/cloud-materials/commit/2822d1a1))
- `common.CTabs` 增加了 CTabs 组件可以撑满父元素的功能([21527ab9](https://code.byted.org/cloud-fe/cloud-materials/commit/21527ab9))
- `common.CAsyncSelect` 适配 arco maxTagCount 类型([543d1bda](https://code.byted.org/cloud-fe/cloud-materials/commit/543d1bda))
- `CPopupEdit`修复 CPopupEdit 中的 TextArea 组件光标重置问题([e2cb4fbf](https://code.byted.org/cloud-fe/cloud-materials/commit/e2cb4fbf))
- CInfoSection：适配 bp 字号([0c4b8e84](https://code.byted.org/cloud-fe/cloud-materials/commit/0c4b8e84))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.1.2
- @arco-design/theme-volcengine-ui-v3@0.1.2
- @arco-design/web-react@2.62.0

## 1.6.0

### 💎 **Features**

- `common.CSearch`: 复合搜索: select 不默认 active 第一个选项, 支持配置分隔符并原始数据返回, 支持配置 enableEdit 是否可编辑, 调整搜索结果排序并且支持自定义搜索 filter 函数, 模糊搜索支持配置 defualtField 自动匹配, 各项内搜索支持分隔匹配和大小写配置, 内置 select 候选项 label 省略配置, 支持传入 popover 的样式。([dffcc17c](https://code.byted.org/cloud-fe/cloud-materials/commit/dffcc17c))

### 🐛 **Bug Fixes**

- `common.CAsyncSwitch` 补充 onSubmit 错误处理([28e90b0b](https://code.byted.org/cloud-fe/cloud-materials/commit/28e90b0b))
- `common.CSearch`: 级联搜索搜索组件改回宽度自动撑满（1.3.1-beta.0 改为非自动），复合搜索更换多选确认图标([7da32bf0](https://code.byted.org/cloud-fe/cloud-materials/commit/7da32bf0))
- `common.CSearch`: font-size 使用 css 变量；复合搜索仅搜索项为 inputTag 时限制高度，修复在 Safari 下 input 高度问题；新增文案的国际化；placeholder 的获取优先级调整；修复中文输入按下 Enter 误触发搜索的问题([b3bca637](https://code.byted.org/cloud-fe/cloud-materials/commit/b3bca637))
- **CTable**: 导出数据弹窗中，列名超长省略，hover 展示全名([6499b064](https://code.byted.org/cloud-fe/cloud-materials/commit/6499b064))
- 修改 TreeTransfer 展开节点设置逻辑([81aafac3](https://code.byted.org/cloud-fe/cloud-materials/commit/81aafac3))
- `COperationMenu: 修复在 safari 浏览器下外露disabled button popover 不会消失`([876e8bc4](https://code.byted.org/cloud-fe/cloud-materials/commit/876e8bc4))
- `CDetail`增加 arco-affix 属性透传能力,支持修改 header 附着的元素([b357ee7c](https://code.byted.org/cloud-fe/cloud-materials/commit/b357ee7c))

## 1.5.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CConditions: 修复展示态样式bug`([3f3dd182](https://code.byted.org/cloud-fe/cloud-materials/commit/3f3dd182))
- `common.CForm`: 修复 CConfigProvider.config 配置语言包在 CForm 中 Input 默认 placeholder 不生效的问题([8202987e](https://code.byted.org/cloud-fe/cloud-materials/commit/8202987e))
- `common.CForm`: 升级@storage-fe/formily-arco 到 1.5.1， InputNumber 兼容负数情况必填校验问题，修复设置 readOnly 不生效。([89522a5d](https://code.byted.org/cloud-fe/cloud-materials/commit/89522a5d))
- **CTable**: 行展开的 button 加上 type: 'button'属性，避免在 form 中点击后触发提交([95b61fe5](https://code.byted.org/cloud-fe/cloud-materials/commit/95b61fe5))
- **CTableEditor**: 补充部分英文文案([a466c29c](https://code.byted.org/cloud-fe/cloud-materials/commit/a466c29c))
- 文案国际化修改([d6ac58db](https://code.byted.org/cloud-fe/cloud-materials/commit/d6ac58db))
- `CForm` CArrayRemove 修复 disabled 不响应的问题([d4afdaa7](https://code.byted.org/cloud-fe/cloud-materials/commit/d4afdaa7))
- `CForm` 恢复 callback 类型([5cf96cf5](https://code.byted.org/cloud-fe/cloud-materials/commit/5cf96cf5))
- **CSearch** 内置 Input 组件的 Popover 增加最大高度限制([c7abfffb](https://code.byted.org/cloud-fe/cloud-materials/commit/c7abfffb))
- **CTableSelect** 修复 CTableSelect 传入的 selectable 不生效的问题([88d0aa6f](https://code.byted.org/cloud-fe/cloud-materials/commit/88d0aa6f))
- **CRadio**: 按钮外层 popover 定位偏移问题修复([bb45e203](https://code.byted.org/cloud-fe/cloud-materials/commit/bb45e203))
  **CCheckbox**: 按钮外层 popover 定位偏移问题修复

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.0.9
- @arco-design/web-react@2.61.1

## 1.4.0

### 💎 **Features**

- CInfoSection 支持 CConfigProvider 配置([85f82dc9](https://code.byted.org/cloud-fe/cloud-materials/commit/85f82dc9))

### 🐛 **Bug Fixes**

- **CFeeCalculator**: 修改具有描述信息的样式（margin-left）([6121e631](https://code.byted.org/cloud-fe/cloud-materials/commit/6121e631))
- `common.CSearch` 复合搜索支持键盘操作、搜索结果展示条数自定义、搜索默认筛选条件、搜索结果高亮、逗号分隔匹配等功能。([c6f94b4d](https://code.byted.org/cloud-fe/cloud-materials/commit/c6f94b4d))
- `common.CSearch`: 增加级联搜索受控和自动宽度示例；高级搜索支持 onCollapseVisibleChange，折叠部分显隐切换时回调([80dcdba2](https://code.byted.org/cloud-fe/cloud-materials/commit/80dcdba2))
- common.CSearch: 支持简单搜索、级联搜索、复合搜索的宽度自适应([e480c295](https://code.byted.org/cloud-fe/cloud-materials/commit/e480c295))
- `CPopoverVerify`、`CPopoverVerifyFormItem` 新增 `validateOnRulesChange`，在`rules`改变时主动触发校验。([a8b2967b](https://code.byted.org/cloud-fe/cloud-materials/commit/a8b2967b))
- `common.CSearch`: 修复简单搜索不支持自定义组件([e4ef0ab6](https://code.byted.org/cloud-fe/cloud-materials/commit/e4ef0ab6))
- common.CSearch: 复合搜索修复未配置 fuzzy 而配置了 defaultField 时，有 active 项时 defaultfield 不生效的问题；修复受控模式下传入 value 有 undefined 项时自动触发 onChange。([5bb468c2](https://code.byted.org/cloud-fe/cloud-materials/commit/5bb468c2))
- [CTable] 优化: 数据请求取消触发 error 时,table 的 loading 不消失也不进入 error 状态([6a9b9c4d](https://code.byted.org/cloud-fe/cloud-materials/commit/6a9b9c4d))
- CInfoSection: 过滤掉不支持的 children([b3765077](https://code.byted.org/cloud-fe/cloud-materials/commit/b3765077))
- `CModal.Form` 修复 footer field text-align 问题([4b0a8e3e](https://code.byted.org/cloud-fe/cloud-materials/commit/4b0a8e3e))
- `CNameinfo` 修复 name color 样式对传入 suffix 的影响([86e37513](https://code.byted.org/cloud-fe/cloud-materials/commit/86e37513))
- `CForm` 支持国际化配置([22489fd3](https://code.byted.org/cloud-fe/cloud-materials/commit/22489fd3))
- [CTable] 解决 selectable、expandable 在第一次渲染后再更新时，无法触发对应 ui 的更新的问题([75973985](https://code.byted.org/cloud-fe/cloud-materials/commit/75973985))
- `CStatus` 新增最大宽度 maxWidth API,默认值 160px (for 国际化)([5bd4ea48](https://code.byted.org/cloud-fe/cloud-materials/commit/5bd4ea48))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@1.0.6
- @arco-design/theme-volcengine-ui-v3@0.1.1
- @arco-design/web-react@2.60.3

## 1.3.0

### 💎 **Features**

- **CConfigProvider** 全局修改部分组件(Select Pagination Modal)的 icon 为源力 icon，生效规则为最近的 context 为 CConfigProvider，而不是 ConfigProvider。([9f02403e](https://code.byted.org/cloud-fe/cloud-materials/commit/9f02403e))
  - formily-arco 1.3.0 -> 1.4.0，升级 peer formily 依赖为>=2.3.1
  formily 2.2.19 -> 2.3.1 https://github.com/alibaba/formily/releases
  - "@formily/core": "2.3.1",
  - "@formily/grid": "2.3.1",
  - "@formily/react": "2.3.1",
  - "@formily/reactive": "2.3.1",
  - "@formily/shared": "2.3.1",
  - "@formily/validator": "2.3.1",
  - "@storage-fe/formily-arco": "1.3.0"

### 🐛 **Bug Fixes**

- `CForm` 1.ArrayRemove 按钮默认 hover 不变颜色 2. formstep 新增自动根据步骤来隐藏上一步/下一步/提交功能 3. 数组校验空数组错误([10af89ed](https://code.byted.org/cloud-fe/cloud-materials/commit/10af89ed))
- CTreeTransfer 增加 remoteExpand 模式([14e89f5d](https://code.byted.org/cloud-fe/cloud-materials/commit/14e89f5d))
- **CCollapse** 计算过程中设置高度为 0，避免闪烁过程([08b6039b](https://code.byted.org/cloud-fe/cloud-materials/commit/08b6039b))
- **CInfoSection** 修复详情页编辑内容时，输入框不可撑高，导致内容重叠([45322e6c](https://code.byted.org/cloud-fe/cloud-materials/commit/45322e6c))
- **CForm** 修复 AdditionButton 高度溢出时的样式问题([2c8626db](https://code.byted.org/cloud-fe/cloud-materials/commit/2c8626db))
- **CDrawer** 修复 onOk 返回 Promise 未自动 loading 的问题([2a1f59bb](https://code.byted.org/cloud-fe/cloud-materials/commit/2a1f59bb))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.60.0

## 1.2.1

### 🐛 **Bug Fixes**

- **CDrawerSelect** 支持配置 disabled 属性([02a5a7ec](https://code.byted.org/cloud-fe/cloud-materials/commit/02a5a7ec))
- **Drawer**修复关闭 drawer 后调用 update 会弹出的问题([64faa21e](https://code.byted.org/cloud-fe/cloud-materials/commit/64faa21e))
- CRadio: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。([81383772](https://code.byted.org/cloud-fe/cloud-materials/commit/81383772))
  CCheckbox: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。
- `common.COperationMenu: 修复点击 popconfirm 导致下拉菜单关闭`([0704be3c](https://code.byted.org/cloud-fe/cloud-materials/commit/0704be3c))
- CTable：修复使用 forwardRef 组件无法渲染问题，如 CAsyncSwitch([50eaf284](https://code.byted.org/cloud-fe/cloud-materials/commit/50eaf284))

## 1.2.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CForm` 修复 EffectError 类型报错定位问题([903b9567](https://code.byted.org/cloud-fe/cloud-materials/commit/903b9567))
- `common.CSearch`: 复合搜索支持`搜索条件`和`搜索触发器`同一行展示，并支持搜索条件子项点击行内修改([d6ed740a](https://code.byted.org/cloud-fe/cloud-materials/commit/d6ed740a))
- 修改加载更多按钮展示时机，当无子节点&hasMore 为 true 时展示加载按钮([eb482de0](https://code.byted.org/cloud-fe/cloud-materials/commit/eb482de0))
- **CForm**: 表单锚点在有 popover 弹出时，无法固定的问题([bd2feedc](https://code.byted.org/cloud-fe/cloud-materials/commit/bd2feedc))
- `common.CForm`: footer 内置 cancel 按钮传入自定义 onClick 时，原有二次确认不会执行([370c62e8](https://code.byted.org/cloud-fe/cloud-materials/commit/370c62e8))
- **CTable**: 修复 hover 到行上没有展示编辑和复制 icon 的问题([23bdc15d](https://code.byted.org/cloud-fe/cloud-materials/commit/23bdc15d))
- **CTable**: 修复开启行选择时，底部"已选中 x 条"和左右的间距问题([5556b000](https://code.byted.org/cloud-fe/cloud-materials/commit/5556b000))
- **CModal** 修复 hideCancel 不生效的问题([13ff06ee](https://code.byted.org/cloud-fe/cloud-materials/commit/13ff06ee))
- **CForm**: 异步下拉组件 CAsyncSelect 的 fetchData 和 fetchInitData 函数中透传 field 属性([94974aa8](https://code.byted.org/cloud-fe/cloud-materials/commit/94974aa8))
- **CRadio**: 支持悬浮展示 Popover([20c3dfd2](https://code.byted.org/cloud-fe/cloud-materials/commit/20c3dfd2))
  **CCheckbox**: 支持悬浮展示 Popover
- CTableTransfer：表格展示场景不需要有勾选高亮动画([51718ca4](https://code.byted.org/cloud-fe/cloud-materials/commit/51718ca4))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.59.1
- @arco-design/theme-volcengine-ui-v3@0.1.0
- @arco-design/iconbox-react-ve-o-design@1.0.5

## 1.1.0

### 💎 **Features**

- `CConfigProvider` 支持传入 storage 实例,响应 web storage key 前缀治理([664e8897](https://code.byted.org/cloud-fe/cloud-materials/commit/664e8897))
- CTable: 增加竞态问题解决方案，用户可按需开启([78318781](https://code.byted.org/cloud-fe/cloud-materials/commit/78318781))

### 🐛 **Bug Fixes**

- `common.CForm` ArrayTable 支持行缓存([1ab3930b](https://code.byted.org/cloud-fe/cloud-materials/commit/1ab3930b))
- **CSeach**: 复合搜索 extraLeft 和 extraRight 支持传入 COperationMenuProps 配置。 搜索项为 custom 时支持配置 Popover 的 style。([541a6dfd](https://code.byted.org/cloud-fe/cloud-materials/commit/541a6dfd))
- **CSeach**: 复合搜索 fuzzyConfig 支持同时写 filterUserInput 和其他配置，支持传入 trigger 更改触发方式([f7fe5aa3](https://code.byted.org/cloud-fe/cloud-materials/commit/f7fe5aa3))
- **CSeach**: 复合搜索修复已输入值非数组的情况下切换到标签组件下引起错误的问题，高级搜索修复内置组件配置 onChange 未生效的问题([f7fe5aa3](https://code.byted.org/cloud-fe/cloud-materials/commit/f7fe5aa3))
- **CForm** 内置组件 CTableSelect 和 PreSelectedTable 支持透传 disabled，禁用表格内操作([2e2c4ff8](https://code.byted.org/cloud-fe/cloud-materials/commit/2e2c4ff8))
- `CSideBar` 修复隐藏的菜单在收起后依然展示的问题([478b41f3](https://code.byted.org/cloud-fe/cloud-materials/commit/478b41f3))
- **CForm**: 🐛CForm 内置组件 CAsyncSelect 依赖收集随依赖改变次数叠加。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）([260c6ce6](https://code.byted.org/cloud-fe/cloud-materials/commit/260c6ce6))
  **CForm**: 🐛CForm 内置组件 CAsyncSelect，收集的引用类型无法触发更新。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）
- `common.CCodeBlock: 空态样式处理`([a2bb1589](https://code.byted.org/cloud-fe/cloud-materials/commit/a2bb1589))
- `CStatus 修复大尺寸下icon偏下 & 颜色属性传递到了span导致浏览器warning`([20a17f86](https://code.byted.org/cloud-fe/cloud-materials/commit/20a17f86))
- `CStatus`fix statusMap 传入 icon 没有生效([7f8dcb70](https://code.byted.org/cloud-fe/cloud-materials/commit/7f8dcb70))
- `CStatus`normal 状态下,应该去掉 padding,便于更多场景的对齐([98fb6ae3](https://code.byted.org/cloud-fe/cloud-materials/commit/98fb6ae3))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-ve-o-design@0.0.63
- @arco-design/theme-volcengine-ui-v3@0.1.0
- @arco-design/web-react@2.58.3
- @arco-design/web-react@2.59.0

## 1.0.1

### 🐛 **Bug Fixes**

- `CForm` 修复默认必填校验文案和自定义校验优先级问题([0d743bce](https://code.byted.org/cloud-fe/cloud-materials/commit/0d743bce))
- **CAsyncSelect**: noMore 的正确使用姿势注释、增加 isControlStateChange 参数处理某些需求下的受控处理([e51b3880](https://code.byted.org/cloud-fe/cloud-materials/commit/e51b3880))
- **CForm**: 动态字段装饰器 DynamicFieldDecorator 支持不清空所有子字段，keepFields 为 true 时，只卸载不在新子字段中的字段([6596c030](https://code.byted.org/cloud-fe/cloud-materials/commit/6596c030))
- `CSidebar` 支持 extraCtrl 用于配置底部控制器旁边的内容([90040cff](https://code.byted.org/cloud-fe/cloud-materials/commit/90040cff))
- `CSideBar` 支持通过 CConfigProvider 配置 props([ea11bddb](https://code.byted.org/cloud-fe/cloud-materials/commit/ea11bddb))
- **CAgreement**: 扩大 Checkbox 可点击范围([cf3ae1f5](https://code.byted.org/cloud-fe/cloud-materials/commit/cf3ae1f5))
- **CForm**: 处理异步下拉组件初始值，被依赖字段清空的问题([49e83a9e](https://code.byted.org/cloud-fe/cloud-materials/commit/49e83a9e))
- **CForm**: reactiveWithCForm 依赖收集问题，依赖收集值的赋值方式 BUG([2a669e9d](https://code.byted.org/cloud-fe/cloud-materials/commit/2a669e9d))
- **CBatchPasteInput**: 新增 onSplit 属性，发生切割时回调用该函数。当 粘贴 或 输入的字符中包含分割符 时，会触发 onSplit 事件。([998f0962](https://code.byted.org/cloud-fe/cloud-materials/commit/998f0962))

## 1.0.0

### ⚠️ **BREAKING CHANGES**

- CloudToB 云基础统一物料库 **v1** 正式版本发布！([f30ee00e](https://code.byted.org/cloud-fe/cloud-materials/commit/f30ee00e))
  - 已实现高质量通用业务组件 40+，覆盖创建、列表、详情等云基础三大典型页面
  - 提供了更适用于复杂表单、表格的组件方案，包括：`CForm`、`CTable`、`CTableEditor`等
  - 适配源力设计规范、火山 v3 主题
  - 配套提供可拓展的组件迁移工具

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CForm` 升级 formily-arco 修复 ArrayTable 错误定位问题([6c45e089](https://code.byted.org/cloud-fe/cloud-materials/commit/6c45e089))
- `CForm` validator 支持不调用 callback([63399296](https://code.byted.org/cloud-fe/cloud-materials/commit/63399296))
- CTable extraConfig 新增 formatSelectedCount 配置，支持自定义选中个数文本([a9eedd50](https://code.byted.org/cloud-fe/cloud-materials/commit/a9eedd50))
- TreeTransfer 增加选中策略参数，其值与 arco tree 一致([31b9e900](https://code.byted.org/cloud-fe/cloud-materials/commit/31b9e900))
- **CForm**: 支持 registerValidateMessageTemplateEngine 注册自定义校验模板([eaca4e24](https://code.byted.org/cloud-fe/cloud-materials/commit/eaca4e24))
- **CAsyncSwitch**: 增加\_\_BYTE_SWITCH 标识，与 arco switch 保持同样的对 disabled 的处理逻辑([832e2c59](https://code.byted.org/cloud-fe/cloud-materials/commit/832e2c59))
- **CTable**: 修复开启了 syncWithUrlQuery 后，过滤、排序没有更新 url query 中的 currentPage 的问题([7ef8a13c](https://code.byted.org/cloud-fe/cloud-materials/commit/7ef8a13c))
- **CAsyncSelect**: 在开启 labelInValue 特性时，传入 value 初始值组件报错([40de8d74](https://code.byted.org/cloud-fe/cloud-materials/commit/40de8d74))
- **CFeeCalculator**: 多个计费项渲染时缺少 unique key 配置；总价的字体样式加粗为 500([fa1cfc87](https://code.byted.org/cloud-fe/cloud-materials/commit/fa1cfc87))
- **CForm**: 优化默认装饰器，避免渲染空节点([14ca3412](https://code.byted.org/cloud-fe/cloud-materials/commit/14ca3412))
- 在 CDetailPage 使用 InfoSection 时支持动态配置 hidden、visible 属性([0db43ae2](https://code.byted.org/cloud-fe/cloud-materials/commit/0db43ae2))

### 📦 **Updated dependencies**

- @arco-design/theme-volcengine-ui-v3@0.0.35
- @arco-design/web-react@2.57.2

## 0.15.2

### 🐛 **Bug Fixes**

- 升级 arco-cli([2112e372](https://code.byted.org/cloud-fe/cloud-materials/commit/2112e372))
- `CForm` effects 数组支持([d4ac928d](https://code.byted.org/cloud-fe/cloud-materials/commit/d4ac928d))
- **CAsyncSelect**: 优化刷新按钮触发范围，优化 fetchInitDta 使用体验([897154a9](https://code.byted.org/cloud-fe/cloud-materials/commit/897154a9))
- **CAsyncSelect**: 优化 fetchInitDta 代码逻辑([fd19bd7f](https://code.byted.org/cloud-fe/cloud-materials/commit/fd19bd7f))
- **CSearch**: 复合搜索支持搜索参数展示行，「清空」按钮后自定义额外内容。([8d73f55e](https://code.byted.org/cloud-fe/cloud-materials/commit/8d73f55e))
- **CForm**: 动态字段装饰器 DynamicFieldDecorator 卸载动态字段下所有子字段，并使用 reactiveWithCForm 收集依赖([285f3f9f](https://code.byted.org/cloud-fe/cloud-materials/commit/285f3f9f))
- **CTable**: 解决 selectedRowData 类型变为 Proxy 的问题([ab5756a1](https://code.byted.org/cloud-fe/cloud-materials/commit/ab5756a1))
- **CForm**: 异步下拉组件 CAsyncSelect 使用 reactiveWithCForm 收集依赖([e6c1e01b](https://code.byted.org/cloud-fe/cloud-materials/commit/e6c1e01b))
- **CForm**: 新增 ReactiveHocParams 和 ReactiveHocProps 类型([3e62cd9b](https://code.byted.org/cloud-fe/cloud-materials/commit/3e62cd9b))
- **CFeeCalculator**: 计算中状态和总价显示状态切换时，计费项会上下跳动下，修改对齐问题([5f64ddca](https://code.byted.org/cloud-fe/cloud-materials/commit/5f64ddca))
- **CFeeCalculator**: PriceInfo 中新增 description 属性，用于展示额外的信息([37119c5b](https://code.byted.org/cloud-fe/cloud-materials/commit/37119c5b))
- **CRadio**: 修复 CRadio 在布局类型为 radio 时的样式([862c485e](https://code.byted.org/cloud-fe/cloud-materials/commit/862c485e))
- `CLog: 新增 CLog 组件`([04fc7e66](https://code.byted.org/cloud-fe/cloud-materials/commit/04fc7e66))
- `CListEditor`修复 brakechange popoverVerify 默认 true，popover 生效条件从 rule 修改为 popoverVerify([7a539462](https://code.byted.org/cloud-fe/cloud-materials/commit/7a539462))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.56.2
- @arco-design/iconbox-react-ve-o-design@0.0.59

## 0.15.1

### 🐛 **Bug Fixes**

- **CTable**: 解决 selectedRowData 类型变为 Proxy 的问题([743b34cf](https://code.byted.org/cloud-fe/cloud-materials/commit/743b34cf))

## 0.15.0

### 💎 **Features**

- `CConfigProvider`支持 cComponentsConfig 对部分云组件进行默认 props 配置([f91be8cc](https://code.byted.org/cloud-fe/cloud-materials/commit/f91be8cc))

### 🐛 **Bug Fixes**

- `CForm` 升级 storage-formily 支持 ArrayTable 报错定位 & 新增分页问题修复([e433d7d6](https://code.byted.org/cloud-fe/cloud-materials/commit/e433d7d6))
- `CForm` 修复 ArrayTable Colunm 显隐问题([decfde22](https://code.byted.org/cloud-fe/cloud-materials/commit/decfde22))
- **CAsyncSelect**: empty 状态也支持 dropdownRender。([07cbb804](https://code.byted.org/cloud-fe/cloud-materials/commit/07cbb804))
- `CFeeType`支持 customChargeLabel 配置自定义计费类型([bf802c09](https://code.byted.org/cloud-fe/cloud-materials/commit/bf802c09))
- **CCombineSearch**: 添加默认查询字段([9af1afa9](https://code.byted.org/cloud-fe/cloud-materials/commit/9af1afa9))
- **CCombineSearch**: 添加多 key 匹配([95812e21](https://code.byted.org/cloud-fe/cloud-materials/commit/95812e21))
  **CSearch**: 支持 AutoComplete
  **CSimpleSearch**: 支持 AutoComplete 及用户输入值格式化
- **CInlineEdit**: 支持 EditIcon 自定义 Tooltip([e5934be0](https://code.byted.org/cloud-fe/cloud-materials/commit/e5934be0))
- **CTable**: 修复表格刷新后，已选择的行的数据可能没有更新的问题([a4a1b6a9](https://code.byted.org/cloud-fe/cloud-materials/commit/a4a1b6a9))
- **CTable**: 修复自定义列弹窗模式下，通过领域模型 api 直接修改 column 的 visible 状态后，打开弹窗没有更新列勾选状态的问题([e80989e7](https://code.byted.org/cloud-fe/cloud-materials/commit/e80989e7))
- **CTableEditor**: 优化性能。并解决受控模式下，在 onFormValuesChange 中使用 setTimeout 可能会导致内部的 ObjectField 被删除的问题([c1e7b9f6](https://code.byted.org/cloud-fe/cloud-materials/commit/c1e7b9f6))
- 修复 tree transfer 搜索后选择问题:([e1f69574](https://code.byted.org/cloud-fe/cloud-materials/commit/e1f69574))
  - 全选状态设置不正确
  - 去掉全选状态时会导致其他节点的选中状态改变
- `CListEditor`新增规则 validator 传入组件内其他值&修改 API cPopoverVerifyProps -> popoverVerify 优化默认不使用弹出式校验.满足更多业务场景([a77b179e](https://code.byted.org/cloud-fe/cloud-materials/commit/a77b179e))
- `CListEditor`onEditingDisableVerify 新增透传属性至 Form.Item 和组件,满足级联控制场景,详见 editingDisabledVerify-demo5([7140cf1c](https://code.byted.org/cloud-fe/cloud-materials/commit/7140cf1c))
- **CModal** 修复 openXXX 通用设置未生效的问题([41f9365c](https://code.byted.org/cloud-fe/cloud-materials/commit/41f9365c))
- **CDetail** 调整 zindex 到火山规范内([7b5ebae1](https://code.byted.org/cloud-fe/cloud-materials/commit/7b5ebae1))
- **CAgreement**: link 设置为可选属性，允许用户不传入任何的协议([be5855ea](https://code.byted.org/cloud-fe/cloud-materials/commit/be5855ea))
- **CFeeCalculator**: 设置 InputNumber 的精度为 0，不允许用户输入小数。([72ae1188](https://code.byted.org/cloud-fe/cloud-materials/commit/72ae1188))
- **CAgreement**: 补充协议组件在 CForm 的 FormItem 装饰器下的使用场景([dec43e78](https://code.byted.org/cloud-fe/cloud-materials/commit/dec43e78))
- **CEllipsis**: 修复隐藏 Popover 由于 style 被覆盖未生效的问题([ab379c99](https://code.byted.org/cloud-fe/cloud-materials/commit/ab379c99))
- `CCodeBlock: 添加 loading 和 空态`([0e34e8db](https://code.byted.org/cloud-fe/cloud-materials/commit/0e34e8db))
- `COperationMenu: menuItem Popconfirm/Popover 作用范围调整`([3efb5a72](https://code.byted.org/cloud-fe/cloud-materials/commit/3efb5a72))
- `CForm` 修复 ArrayTable 新增分页问题 & 退出表单二次 check 新增自定义相等判断和排除字段([9342bea2](https://code.byted.org/cloud-fe/cloud-materials/commit/9342bea2))
- feat(common.CDetail): onBack 不必选([2d09c84a](https://code.byted.org/cloud-fe/cloud-materials/commit/2d09c84a))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.56.0
- @arco-design/theme-volcengine-ui-v3@0.0.34
- @arco-design/iconbox-react-ve-o-design@0.0.57

## 0.14.1

### 🐛 **Bug Fixes**

- **CDetail** 调整 zindex 到火山规范内([b2f1f14e](https://code.byted.org/cloud-fe/cloud-materials/commit/b2f1f14e))

## 0.14.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CDrawer.Detail` 修复 title 未对齐的问题([1c7ff888](https://code.byted.org/cloud-fe/cloud-materials/commit/1c7ff888))
- CTable: 批量导出表格内容的场景规范([39281135](https://code.byted.org/cloud-fe/cloud-materials/commit/39281135))
- CTable：支持 byteplus 环境下 table 字体大小为 14px([ce252222](https://code.byted.org/cloud-fe/cloud-materials/commit/ce252222))
- **CInfoSection**: noMargin 支持全局配置([0194baaa](https://code.byted.org/cloud-fe/cloud-materials/commit/0194baaa))
- **CTableEditor**: 修复本地模式下，搜索后导致改动丢失的问题([9ce8f2c5](https://code.byted.org/cloud-fe/cloud-materials/commit/9ce8f2c5))
- `CListEditor` 修复 onEditingDisableVerify 在 form 传初始值时不生效问题([5f56094a](https://code.byted.org/cloud-fe/cloud-materials/commit/5f56094a))
- `CNameInfo`支持只展示 name 或者 id([32f59f95](https://code.byted.org/cloud-fe/cloud-materials/commit/32f59f95))
- `CModal(CDrawer).Form`修复 footer 传入 undefined 时 onOk 回调参数错误的问题([846284ea](https://code.byted.org/cloud-fe/cloud-materials/commit/846284ea))
- `CSideBar` 修复在收起菜单后,鼠标移到 Popover 组件上闪烁的问题([e9b1be27](https://code.byted.org/cloud-fe/cloud-materials/commit/e9b1be27))
- **CSidebar** 与火山规范对齐, 调整其 z-index 为 900 - 1([f9e9ff5f](https://code.byted.org/cloud-fe/cloud-materials/commit/f9e9ff5f))
- **CFeeCalculator**: 新增 `enableCharge` 属性，支持关闭计费的能力。([d116e3bf](https://code.byted.org/cloud-fe/cloud-materials/commit/d116e3bf))
- **CConfigPreview**: 补充组件类型导出([839fe352](https://code.byted.org/cloud-fe/cloud-materials/commit/839fe352))
- **CEllipsis**: 适配 CNameInfo 部分场景 popover 无法显示的问题([6e326370](https://code.byted.org/cloud-fe/cloud-materials/commit/6e326370))
- **CEllipsis**: 去除 hover 展示 popupVisible 的内部逻辑([6f2f000e](https://code.byted.org/cloud-fe/cloud-materials/commit/6f2f000e))
- 1. CDetailPage 修复在设置默认 tabkey 值时未对 tab 的可见性做过滤问题([2f7070d1](https://code.byted.org/cloud-fe/cloud-materials/commit/2f7070d1))
  2. CDetailPage 修复第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面问题
- CTable： 新增 setTitle 函数([c31dd498](https://code.byted.org/cloud-fe/cloud-materials/commit/c31dd498))
- **CEllipsis**:修改文本溢出计算方式([7e9604a1](https://code.byted.org/cloud-fe/cloud-materials/commit/7e9604a1))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.55.0
- @arco-design/iconbox-react-ve-o-design@0.0.56
- @arco-design/web-react@2.55.1
- @arco-design/theme-volcengine-ui-v3@0.0.33

## 0.13.1

### 🐛 **Bug Fixes**

- `CAsyncSelect`解决接口返回无数据导致 allowCreate 失效的问题([1bc6498e](https://code.byted.org/cloud-fe/cloud-materials/commit/1bc6498e))
- `CSearch` 支持 useCustom 的用法([2c1b23a5](https://code.byted.org/cloud-fe/cloud-materials/commit/2c1b23a5))
- **CEllipsis**: 容器增加过长溢出，避免遮挡兄弟元素;兼容极端场景 Tooltip 消失的场景([6261408d](https://code.byted.org/cloud-fe/cloud-materials/commit/6261408d))
- `CListEditor`删除 item 时触发 onEditingDisableVerify([f798366e](https://code.byted.org/cloud-fe/cloud-materials/commit/f798366e))
- **CFeeCalculator**: 修复 在退费场景且用户未配置价格区块的 title 时，会导致组件崩溃 的 BUG([6037d854](https://code.byted.org/cloud-fe/cloud-materials/commit/6037d854))

### 📦 **Updated dependencies**

- @arco-design/theme-volcengine-ui-v3@0.0.32

## 0.13.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- CTable: 增加下载组件弹窗导出([51f80ec5](https://code.byted.org/cloud-fe/cloud-materials/commit/51f80ec5))
- `CModal.confirm`等 api 对齐源力设计([7d17d8e2](https://code.byted.org/cloud-fe/cloud-materials/commit/7d17d8e2))
- `CSideBar`适配替换源力 icon 的场景([f8b0dc10](https://code.byted.org/cloud-fe/cloud-materials/commit/f8b0dc10))
- CForm: 复当子元素宽度超出 flex 父元素，子元素超出部分显示问题([eb4191d0](https://code.byted.org/cloud-fe/cloud-materials/commit/eb4191d0))
- 修复 CTags 复制按钮([22870243](https://code.byted.org/cloud-fe/cloud-materials/commit/22870243))
- **CTable**: 修复 tableEditor 等变量传递给 div 等 html 元素，导致控制台报错的问题([c358038d](https://code.byted.org/cloud-fe/cloud-materials/commit/c358038d))
- **CTableEditor**: 修复受控模式下，表格筛选后进行编辑，清除筛选条件后，数据丢失的问题([a2df2958](https://code.byted.org/cloud-fe/cloud-materials/commit/a2df2958))
- **CTableEditor**: 支持在表格顶部新增行([637acb2f](https://code.byted.org/cloud-fe/cloud-materials/commit/637acb2f))
- `CListEditor`对于存在默认值且类型为 string 的可选 props 在判断时使用??,方便传入为空字符串时生效([c2a2e7a7](https://code.byted.org/cloud-fe/cloud-materials/commit/c2a2e7a7))
- **CFeeType**: 修复传入 statusChangeTime 为空，仍展示下一个状态提示的问题([943d86bf](https://code.byted.org/cloud-fe/cloud-materials/commit/943d86bf))
  **CFeeType**: 新增属性 isClosed、isReclaim 控制状态流转，组件内部不再自动流转计费状态
- `CSideBar` 修复标题颜色([4683db9d](https://code.byted.org/cloud-fe/cloud-materials/commit/4683db9d))
- **CBatchPasteInput**: 修复无意义的正则转义引用的 BUG([e6239eee](https://code.byted.org/cloud-fe/cloud-materials/commit/e6239eee))
- **CFeeCalculator**: 扩展 `title` 属性,支持传入 `null` 隐藏标题([825c4277](https://code.byted.org/cloud-fe/cloud-materials/commit/825c4277))
- **CFeeCalculator**: 原价存在 且 差价大于 0 时显示折扣价格,其余情况不展示折扣价格([666ed2fd](https://code.byted.org/cloud-fe/cloud-materials/commit/666ed2fd))
- **CFeeCalculator**: 新增`value`属性支持数量和时长的受控模式（修改 onChange 函数的入参为一个对象值，其中包括数量和时长）🐛 🐛 🐛 🐛([0e19474a](https://code.byted.org/cloud-fe/cloud-materials/commit/0e19474a))
- **CFeeCalculator**: 新增 `savedText` 属性,支持自定义"已省"文案([0888fc44](https://code.byted.org/cloud-fe/cloud-materials/commit/0888fc44))
- **CRadio**: 修复 CRadio 覆盖了 Arco Radio 样式的 BUG([732c2abe](https://code.byted.org/cloud-fe/cloud-materials/commit/732c2abe))
  **CCheckbox**: 修复 CCheckbox 覆盖了 Arco Checkbox 样式的 BUG
- CDetailPage 修复 arcoTabsProps 传参方式支持函数式传参([be8b7558](https://code.byted.org/cloud-fe/cloud-materials/commit/be8b7558))
- `COperationMenu: 支持自定义Dropdown Menu Button`([ca316362](https://code.byted.org/cloud-fe/cloud-materials/commit/ca316362))
- **CEllipsis**: 修复部分 Popover 未消失的场景([ddc35706](https://code.byted.org/cloud-fe/cloud-materials/commit/ddc35706))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.54.0
- @arco-design/web-react@2.54.1
- @arco-design/theme-volcengine-ui-v3@0.0.30

## 0.12.1

### 🐛 **Bug Fixes**

- `CForm` 暴露 FormStep 实例 & initConfig 支持默认展示步数([3e676546](https://code.byted.org/cloud-fe/cloud-materials/commit/3e676546))
- `CForm` 修复 FormItem label 宽度浮点数计算问题 & FormItem help 优先级问题([a050696c](https://code.byted.org/cloud-fe/cloud-materials/commit/a050696c))
- 升级 TTP 依赖([53a63bb4](https://code.byted.org/cloud-fe/cloud-materials/commit/53a63bb4))
- **CCombineSearch**: 支持参数 placeholder([1bed29bb](https://code.byted.org/cloud-fe/cloud-materials/commit/1bed29bb))
- **CTable**: 增加 formatter 导出([b4e530d4](https://code.byted.org/cloud-fe/cloud-materials/commit/b4e530d4))
- **CTableTransfer**: rowkey 支持函数形式([2e5e604d](https://code.byted.org/cloud-fe/cloud-materials/commit/2e5e604d))
- `CForm` defineField 函数返回类型自动收窄,并支持传入多个进行合并([c5fbb7c4](https://code.byted.org/cloud-fe/cloud-materials/commit/c5fbb7c4))
- **CLoading** cResultProps 属性的 title 支持配置 loadFailed 和 retry 文案([f9066973](https://code.byted.org/cloud-fe/cloud-materials/commit/f9066973))
- 修复父节点全选时的问题，需判断其子节点是否全部为全选状态([0dbe386a](https://code.byted.org/cloud-fe/cloud-materials/commit/0dbe386a))
- `CListEditor`支持内置组件([796fd91e](https://code.byted.org/cloud-fe/cloud-materials/commit/796fd91e))
- `CStatus`icon 布局样式 fix,修复块级场景下样式问题([6b39f8ec](https://code.byted.org/cloud-fe/cloud-materials/commit/6b39f8ec))
- 修复 sourcemap404 的问题([84db5f55](https://code.byted.org/cloud-fe/cloud-materials/commit/84db5f55))
- `CDrawer.open` 修复极端情况下退出 drawer 闪烁问题([2f15d8b8](https://code.byted.org/cloud-fe/cloud-materials/commit/2f15d8b8))
- **CFeeCalculator**: 支持展示价格区间,用于展示最小/最大配置的价格([8aff0f1a](https://code.byted.org/cloud-fe/cloud-materials/commit/8aff0f1a))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.53.2

## 0.12.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CForm`([17c9d1d3](https://code.byted.org/cloud-fe/cloud-materials/commit/17c9d1d3))
  1.fix ArrayTable 分页时新增分页器不跳转问题
  2. 优化 Array 重复校验性能
  3. 样式还原
- CStatistic: 间距调整([e01a2d61](https://code.byted.org/cloud-fe/cloud-materials/commit/e01a2d61))
- **CContentWrapper**: 新增自动撑满能力([5a3e0054](https://code.byted.org/cloud-fe/cloud-materials/commit/5a3e0054))
  **CContentWrapper**: 修复全局配置中 prefixCls 不生效的问题
- ** CTable: toolbar 增加取消选择按钮 **([541d4085](https://code.byted.org/cloud-fe/cloud-materials/commit/541d4085))
- `CTable` cell 和 row 的 data-cy 不应该加入 rowKey 信息([df869d69](https://code.byted.org/cloud-fe/cloud-materials/commit/df869d69))
- `CModal` 支持 CModal.FormStep([4ef3f67a](https://code.byted.org/cloud-fe/cloud-materials/commit/4ef3f67a))
- **CCodeBlock**: 修复空格等无法格式化的问题([8b537568](https://code.byted.org/cloud-fe/cloud-materials/commit/8b537568))
  **COperationMenu**: 配置弹出菜单自动跟随
- `CForm`: 修复内置组件 arcoTableProps 传入函数时，未把值 onChange 给 CForm 的问题([d3c9ee53](https://code.byted.org/cloud-fe/cloud-materials/commit/d3c9ee53))
  `CForm`: 不再支持 PreselectedTable 的 rowKeb 传入函数,原因: rowKey 传入函数时,value 不能通过 value[rowKey]判断是否选中改行
  `CAddButton`: 修复 CAddButton dashed 样式 disabled 时不触发 hover 的问题
- **CTable**: 表格 loading 样式调整：1. 尺寸改为 48px 2. 固定距离表格顶部 48px([ce449f65](https://code.byted.org/cloud-fe/cloud-materials/commit/ce449f65))
- **CTable**: 轮询功能修改：1. 上一次请求未完成时不会继续下一次轮询, 2. 表格组件卸载时停止轮询([47e13ee0](https://code.byted.org/cloud-fe/cloud-materials/commit/47e13ee0))
- **CTable**: 在 onTableUpdateDataEnd 的回调函数参数中增加 type，可用于判断触发数据更新的动作是什么，比如分页、过滤、排序等([7b6e466b](https://code.byted.org/cloud-fe/cloud-materials/commit/7b6e466b))
- **CTableEditor**: 受控模式下支持表格排序、过滤、分页([953df608](https://code.byted.org/cloud-fe/cloud-materials/commit/953df608))
- **CTableEditor**: 修复非受控模式下国际化不生效的问题([cf117faa](https://code.byted.org/cloud-fe/cloud-materials/commit/cf117faa))
- **CFeeCalculator**: PriceInfo 新增 cTableProps 属性,该属性支持 透传 计费详情中中的表格属性([b77f5298](https://code.byted.org/cloud-fe/cloud-materials/commit/b77f5298))
  **CFeeCalculator**: PriceInfo 增加泛型，约束 detailList 数据的类型
- **CFeeCalculator**: 1. 添加 `monetaryUnit` 属性,支持自定义货币符号 2. 修改折扣价格在下方的样式问题([b6a33cc2](https://code.byted.org/cloud-fe/cloud-materials/commit/b6a33cc2))
- **CForm**: Section 支持透传 style 属性([e1b56de4](https://code.byted.org/cloud-fe/cloud-materials/commit/e1b56de4))
  **CForm**: CForm 上一步/下一步 按钮 支持 Loading 状态
  **CForm**: 支持 透传 Arco Steps 的属性
- `CListEditor` 新增 API 用于透传 Input InputTag 属性&add 时填入默认值([1c40a699](https://code.byted.org/cloud-fe/cloud-materials/commit/1c40a699))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.53.1

## 0.11.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- `CForm` 支持 html form 标签([11270b4b](https://code.byted.org/cloud-fe/cloud-materials/commit/11270b4b))
- `CForm` 修复全屏状态丢失问题 & 国际化问题([138fa330](https://code.byted.org/cloud-fe/cloud-materials/commit/138fa330))
- `CForm` 主按钮默认文案改为确定([27063345](https://code.byted.org/cloud-fe/cloud-materials/commit/27063345))
- `CPopupEdit`: 字数超出限制,提示框透明化([7542ed71](https://code.byted.org/cloud-fe/cloud-materials/commit/7542ed71))
- CTableTransfer 新增 ref 获取 sourceTable 与 TargetTable([dd25f0c0](https://code.byted.org/cloud-fe/cloud-materials/commit/dd25f0c0))
- `CTabs`: 修复 leftBottomBorder 属性影响了里层的 Tabs 和 CTabs 样式([852148b1](https://code.byted.org/cloud-fe/cloud-materials/commit/852148b1))
- **CConfigPreview**: 新增 `CConfigPreview` 组件。用于承载创建页的配置预览、价格预览以及协议等信息。搭配 Arco Form 使用。([63615172](https://code.byted.org/cloud-fe/cloud-materials/commit/63615172))
- `CForm` 新增动态字段([57ada8e0](https://code.byted.org/cloud-fe/cloud-materials/commit/57ada8e0))
- 调整了一下 Demo，展示了也能设置不同组件类型的动态表单的特性([de291998](https://code.byted.org/cloud-fe/cloud-materials/commit/de291998))
- **CTable**: arcoColumnProps 支持配置为函数([5dc9600e](https://code.byted.org/cloud-fe/cloud-materials/commit/5dc9600e))
- **CTable**: 支持将表格状态同步到 url query 以及读取 url query 作为表格的初始状态([8afe3201](https://code.byted.org/cloud-fe/cloud-materials/commit/8afe3201))
- 支持从统一物料导入 iconBox 的 icon([a2371af4](https://code.byted.org/cloud-fe/cloud-materials/commit/a2371af4))
- `CDrawerSelect` 支持配置 受控/非受控 两种模式([009f5b4f](https://code.byted.org/cloud-fe/cloud-materials/commit/009f5b4f))
- CFormConfirm：确认页优先取用户配置 label([1c65604b](https://code.byted.org/cloud-fe/cloud-materials/commit/1c65604b))
- CTableTransfer：新增 searchIndex 搜索索引字段([bf98f969](https://code.byted.org/cloud-fe/cloud-materials/commit/bf98f969))
- 更新 `CTag` cEllipsisProps 及文档([b0d37859](https://code.byted.org/cloud-fe/cloud-materials/commit/b0d37859))
- 修复 CTransfer 在 mode 为 local+fetcher 情况下初始值为空情况([bef017ce](https://code.byted.org/cloud-fe/cloud-materials/commit/bef017ce))
- `CStatus`支持 waitColor API,支持 wait 状态的蓝色和灰色配色([48727cc6](https://code.byted.org/cloud-fe/cloud-materials/commit/48727cc6))
- **CTable**: 修复在没有传 rowKey 的情况下获取 selectedRowData 为空的问题([c4babe7b](https://code.byted.org/cloud-fe/cloud-materials/commit/c4babe7b))
- **CTable**: 修复轮询模式下 url query 没有同步到列过滤项的问题([4f46aa0f](https://code.byted.org/cloud-fe/cloud-materials/commit/4f46aa0f))
- **CTable**: 使用 time, utctime formatter 时，如果格式不合法则兜底渲染为 -([9b3eae79](https://code.byted.org/cloud-fe/cloud-materials/commit/9b3eae79))
- **CTable**: 修复 loadMoreContainerHeight 不生效的问题([dd9a796c](https://code.byted.org/cloud-fe/cloud-materials/commit/dd9a796c))
- `CInfoSection`: 调整 Section 样式和源力对齐([1f4c19f7](https://code.byted.org/cloud-fe/cloud-materials/commit/1f4c19f7))
- `CModal` 修复 contentTop 传入 null 时报错([e29729c9](https://code.byted.org/cloud-fe/cloud-materials/commit/e29729c9))
- **CForm\***: 内置 CAsyncSelect 修改: 如果未设置 autoLoad 为 true,依赖改变时不立即触发重新加载,等待组件 onFocus 事件 时触发重新加载([ee6048b0](https://code.byted.org/cloud-fe/cloud-materials/commit/ee6048b0))
- **CAsysnSelect**: 在 FormItem 中 icon 对齐样式 BUG([b47c457c](https://code.byted.org/cloud-fe/cloud-materials/commit/b47c457c))
- **CAysncSelect**: 样式修复：在带刷新按钮的场景,select 输入框选择内容过长时容器被撑大([cb061099](https://code.byted.org/cloud-fe/cloud-materials/commit/cb061099))
- `CAsyncSwitch` 非受控模式无法关闭问题修复 & 正确 demo 补充([70c2e258](https://code.byted.org/cloud-fe/cloud-materials/commit/70c2e258))
- `CCopy` 增加 showCopy 属性,可以用来配置 hover 时才显示 Icon([429fe0f5](https://code.byted.org/cloud-fe/cloud-materials/commit/429fe0f5))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.52.2
- @arco-design/theme-volcengine-ui-v3@0.0.29
- @arco-design/iconbox-react-ve-o-design@0.0.52

## 0.10.0

### 💎 **Features**

- **CTabs**: 新增 CTabs 组件([04857cdd](https://code.byted.org/cloud-fe/cloud-materials/commit/04857cdd))

### 🐛 **Bug Fixes**

- **CRadio**: 配置模式的单选组添加带索引的 data-cy([33b3d980](https://code.byted.org/cloud-fe/cloud-materials/commit/33b3d980))
  **CCheckbox**: 配置模式的多选组添加带索引的 data-cy
- CCollapse: 修改文档 Demo 展示([6c5ad194](https://code.byted.org/cloud-fe/cloud-materials/commit/6c5ad194))
- `CStatistic`: `CStatistic.List` 支持`list` 添加标题(`title`)([31e59a47](https://code.byted.org/cloud-fe/cloud-materials/commit/31e59a47))
- `CCombineSearch` input 类型增加 `mode=tag`，支持输入 tag 类型([5dea433f](https://code.byted.org/cloud-fe/cloud-materials/commit/5dea433f))
  `CCombineSearch` 支持在输入时点击字段名切换字段
  `CCombineSearch` 增加参数 `renderViewItem`，支持自定义搜索结果展示组件
  `CCombineSearch` 类型增加 `type=custom` ，支持自定义弹窗内容和输入时显示内容
- **CSearch**: 修复在 `CSearch` 中使用 `CCascaderSearch` 组件,重置时 `CCascaderSearch` 数据未重置的问题([6d1baa68](https://code.byted.org/cloud-fe/cloud-materials/commit/6d1baa68))
- `CAsyncSelect`: CAsyncSelect 优化 第一次 loading 状态不展示 Empty 内容([25cf5d15](https://code.byted.org/cloud-fe/cloud-materials/commit/25cf5d15))
- **CTable**: 内置轮询, 支持通过配置开启([2d18fcdc](https://code.byted.org/cloud-fe/cloud-materials/commit/2d18fcdc))
- **CTable**:解决 table 的领域模型 props 和内置组件 props 的 content 属性冲突的问题([fb7d1f68](https://code.byted.org/cloud-fe/cloud-materials/commit/fb7d1f68))
- `CPopupEdit`: 增加编辑图标可配置 Popover 提示场景([e06c22fa](https://code.byted.org/cloud-fe/cloud-materials/commit/e06c22fa))
- `CStatistic`: 当 value 值为 0 的时候也能展示([5b22110c](https://code.byted.org/cloud-fe/cloud-materials/commit/5b22110c))
- **CFeeCalculator**: 修改数值输入框中的默认最小值。从 0 修改为 1([0c28d459](https://code.byted.org/cloud-fe/cloud-materials/commit/0c28d459))
- `CInfoSection`: 识别 Number 类型的 children([5763f55d](https://code.byted.org/cloud-fe/cloud-materials/commit/5763f55d))
- `CNameInfo`nameRenderType 为 text 时设置颜色同 id([5b21583d](https://code.byted.org/cloud-fe/cloud-materials/commit/5b21583d))
- **CTable**: 自定义列：支持配置不展示自定义列 Icon 的右上角角标([7bd230b2](https://code.byted.org/cloud-fe/cloud-materials/commit/7bd230b2))
- **CTable**: 替换行展开的 icon 为源力主题的 icon([9e52a864](https://code.byted.org/cloud-fe/cloud-materials/commit/9e52a864))
- **CTable**: 自定义列：支持配置「不在自定义列配置中展示的列」([263614df](https://code.byted.org/cloud-fe/cloud-materials/commit/263614df))
- `CStatus`,`CNameInfo`组件修复 popover 包裹时无法显示弹出层问题([77eecfae](https://code.byted.org/cloud-fe/cloud-materials/commit/77eecfae))
- **CFeeCalculator**: 样式调整([72fea69f](https://code.byted.org/cloud-fe/cloud-materials/commit/72fea69f))
- **CRadio**: CRadio.Group 的 disabled 属性未透传到 Radio.Group 的 bug 修复([586db332](https://code.byted.org/cloud-fe/cloud-materials/commit/586db332))
  **CCheckbox**: CCheckbox.Group 的 disabled 属性未透传到 Checkbox.Group 的 bug 修复
- `CModal` 修复 CModal.Form contentTop sticky 不生效的问题([8e85be6f](https://code.byted.org/cloud-fe/cloud-materials/commit/8e85be6f))
- 升级@storage-fe/formily-arco，修复 arrayTable title 不兼容 reactNode([dc43385f](https://code.byted.org/cloud-fe/cloud-materials/commit/dc43385f))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.51.2
- @arco-design/iconbox-react-ve-o-design@0.0.49

## 0.9.0

### 💎 **Features**

- `CCard` 新增 CCard 组件(normal,compact,linkList)([f7dd26ae](https://code.byted.org/cloud-fe/cloud-materials/commit/f7dd26ae))

### 🐛 **Bug Fixes**

- `CForm`([d84dd82c](https://code.byted.org/cloud-fe/cloud-materials/commit/d84dd82c))
  1. 优化 demo
  2. FormItem 新增 hasInnerFormItem 属性处理嵌套样式穿透问题
  3. array 判重 helper bugfix
- `CForm` 取消二次 check 按钮位置调整([db5181f0](https://code.byted.org/cloud-fe/cloud-materials/commit/db5181f0))
- **CAgreement**: 协议组件支持非链接形式协议([2985ddb9](https://code.byted.org/cloud-fe/cloud-materials/commit/2985ddb9))
- **CAsyncSelect**: 新增 `showRefreshBtn` 属性展示刷新按钮([2a0a3a24](https://code.byted.org/cloud-fe/cloud-materials/commit/2a0a3a24))
- **CForm**: 装饰器隐藏横向滚动条([81addb47](https://code.byted.org/cloud-fe/cloud-materials/commit/81addb47))
  **CFeeCalculator**: 退费时，默认计费标题改为 预计退费；其余情况，默认计费标题为 配置费用。
  **CFeeCalculator**: 涉及退费场景时，展示免责声明文案。
- CForm 内置 CTableTransfer([fbf44447](https://code.byted.org/cloud-fe/cloud-materials/commit/fbf44447))
- CForm：arrayTable 支持表头展示必填\*([d398443f](https://code.byted.org/cloud-fe/cloud-materials/commit/d398443f))
- **CTable**: 规范更新：当 hover 到某一行时，会显示这一行所有编辑、复制操作的 icon，涉及 CNameInfo、CEllipsis、CPopupEdit 组件([12767046](https://code.byted.org/cloud-fe/cloud-materials/commit/12767046))
- **CTable**: 支持调用 table.refresh 时清空已选择的行([e73b8fc1](https://code.byted.org/cloud-fe/cloud-materials/commit/e73b8fc1))
- _CPopupEdit_: 修复问题:设置 showEdit={false} 时，点击编辑，然后按回车键提交之后，编辑按钮会一直显示([1783043f](https://code.byted.org/cloud-fe/cloud-materials/commit/1783043f))
- `CListEditor` 透传 rules 到 formItem([27b915cd](https://code.byted.org/cloud-fe/cloud-materials/commit/27b915cd))
- 修复 Cform 确认页默认展示分页([6065dced](https://code.byted.org/cloud-fe/cloud-materials/commit/6065dced))
- `CNameInfo`copy icon 高度样式&挤压时抖动问题([436a63d6](https://code.byted.org/cloud-fe/cloud-materials/commit/436a63d6))
- `CStatus`更新 Icon,升级源力 iconbox([7106bb5b](https://code.byted.org/cloud-fe/cloud-materials/commit/7106bb5b))
- **CTable**: 自定义列：更新配置了自定义列表字段后的 icon 展示([2ccd0b97](https://code.byted.org/cloud-fe/cloud-materials/commit/2ccd0b97))
- **CTable**: 分页器规范回滚：改为之前的当数据小于等于 10 条时隐藏分页器。同时增加 alwaysShowPagination 配置，配置后可以始终展示分页器([df2b4689](https://code.byted.org/cloud-fe/cloud-materials/commit/df2b4689))
- **CTable**: 修复滚动加载模式下容器丢失最大高度的问题([a22c1c4b](https://code.byted.org/cloud-fe/cloud-materials/commit/a22c1c4b))
- **CAsyncSelect**: 异步下拉组件默认宽度 bug 修复([1d6e532f](https://code.byted.org/cloud-fe/cloud-materials/commit/1d6e532f))
- **CFeeCalculator**: 修复计费组件展示分页问题([e82d8031](https://code.byted.org/cloud-fe/cloud-materials/commit/e82d8031))
  **CForm**: ArrayButton 支持透传 CAddButton 属性
- **CRadio**: 自定义形式的按钮层级包裹重复([f4dcb86e](https://code.byted.org/cloud-fe/cloud-materials/commit/f4dcb86e))
  **CCheckbox**: 自定义形式的按钮层级包裹重复
- 升级`b-validate`,默认校验文案设置为中文([1f572642](https://code.byted.org/cloud-fe/cloud-materials/commit/1f572642))
- `useValidate`根据 i18n 设置默认校验文案([5696591d](https://code.byted.org/cloud-fe/cloud-materials/commit/5696591d))
- `COpertaionMenu: 修复subOperation 有 visible的情况下数据不正确的问题`([83037be3](https://code.byted.org/cloud-fe/cloud-materials/commit/83037be3))
- `CCopy` icon 样式保持对齐([718c4db3](https://code.byted.org/cloud-fe/cloud-materials/commit/718c4db3))
- CTableTrasnfer：边框角 border 缺失([a3b00d19](https://code.byted.org/cloud-fe/cloud-materials/commit/a3b00d19))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.51.1
- @arco-design/theme-volcengine-ui-v3@0.0.28

## 0.8.0

### 💎 **Features**

- **CStatistic**: 新增数值展示组件([3a4136da](https://code.byted.org/cloud-fe/cloud-materials/commit/3a4136da))
- `CDrawerSelect` 新增组件([9008108d](https://code.byted.org/cloud-fe/cloud-materials/commit/9008108d))
  `CForm` 新增内置组件 `CDrawerSelect`
- 替换 Icon 库为源力 iconBox([4bf5e9cf](https://code.byted.org/cloud-fe/cloud-materials/commit/4bf5e9cf))

### 🐛 **Bug Fixes**

- `CForm` 新增数组值重复校验 helper([e0fe7244](https://code.byted.org/cloud-fe/cloud-materials/commit/e0fe7244))
- feat(common.CDetail): cDetailHeader 增加 cEllipsisProps 属性([82ffa68b](https://code.byted.org/cloud-fe/cloud-materials/commit/82ffa68b))
- CForm arrayItem 与 arrayTable 支持 shema([c5b3440d](https://code.byted.org/cloud-fe/cloud-materials/commit/c5b3440d))
- **CAsyncSelect**: 提供参数可以控制内部 Empty 组件([49250f96](https://code.byted.org/cloud-fe/cloud-materials/commit/49250f96))
- **CAsyncSelect**: 修复 CAsyncSelect 在不指定 optionMode 时，无法获取到指定的 option.extra 的问题([c8d3e2ff](https://code.byted.org/cloud-fe/cloud-materials/commit/c8d3e2ff))
- **CTable**: 支持配置自定义的无数据时候的展示内容([8d3ebd19](https://code.byted.org/cloud-fe/cloud-materials/commit/8d3ebd19))
- **CStatistic**: CConfigProvider 引入路径使用报错问题修复([dc6031d5](https://code.byted.org/cloud-fe/cloud-materials/commit/dc6031d5))
- **CStatistic**: 添加文档站公共样式([36554d46](https://code.byted.org/cloud-fe/cloud-materials/commit/36554d46))
- fix(common.CDetail): 修复 cDetail 组件 tab 吸顶功能([c1d9f389](https://code.byted.org/cloud-fe/cloud-materials/commit/c1d9f389))
- `CListEditor`组件,修复初始值 disableDelete,不设置 item 宽度,宽度自适应,overview 默认值修改 auto([8c8e8693](https://code.byted.org/cloud-fe/cloud-materials/commit/8c8e8693))
- CDetailPage 修复 customOperationMenu 类型问题([f53b8694](https://code.byted.org/cloud-fe/cloud-materials/commit/f53b8694))
- `CForm` helper 多字段变化响应支持防抖([aaf42f5d](https://code.byted.org/cloud-fe/cloud-materials/commit/aaf42f5d))
- `CStatus`固定行高,避免表格场景下继承 lint-height 对 icon 与 text 对齐效果的影响([de4ee619](https://code.byted.org/cloud-fe/cloud-materials/commit/de4ee619))
- **CTable**: 分页器规范更新，默认改为始终展示([3e128508](https://code.byted.org/cloud-fe/cloud-materials/commit/3e128508))
- **CTable**: 修改内部函数命名以解决 swc 转译错误的问题([fe8875cb](https://code.byted.org/cloud-fe/cloud-materials/commit/fe8875cb))
- 修复 `CTag` 颜色取值 & 删除 `CTags` 中 `cCollapseProps.showCount` 缺省值([93cb6bec](https://code.byted.org/cloud-fe/cloud-materials/commit/93cb6bec))
- **CRadio**: 自定义节点内容继承样式([6e2d01b6](https://code.byted.org/cloud-fe/cloud-materials/commit/6e2d01b6))
  **CCheckbox**: 自定义节点内容继承样式
- `CDrawerSelect` 修改类型引入方式报错的问题([1d20fd22](https://code.byted.org/cloud-fe/cloud-materials/commit/1d20fd22))
- `CForm` 内置组件 `CTableSelect`loading 态可由 field 控制([c8c3257d](https://code.byted.org/cloud-fe/cloud-materials/commit/c8c3257d))
- **CEllipsis**: 修复值为 0 时未正确显示的场景([44f304f8](https://code.byted.org/cloud-fe/cloud-materials/commit/44f304f8))
- `CConfigProvider` 修复 locale 未被继承的问题([1d35cc5e](https://code.byted.org/cloud-fe/cloud-materials/commit/1d35cc5e))
- `CModal.Form`修复 onOk 回调失败的问题([ae840a20](https://code.byted.org/cloud-fe/cloud-materials/commit/ae840a20))
- `CSidebar` 修复 popover 始终显示的问题([78bfb82e](https://code.byted.org/cloud-fe/cloud-materials/commit/78bfb82e))
- CCollpase: popover 模式限制最大展示数量([db32ce6d](https://code.byted.org/cloud-fe/cloud-materials/commit/db32ce6d))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.50.2
- @arco-design/theme-volcengine-ui-v3@0.0.27

## 0.7.1

### 🐛 **Bug Fixes**

- **CForm**: 默认装饰器支持自定义 getPopupContainer 属性([699640d4](https://code.byted.org/cloud-fe/cloud-materials/commit/699640d4))
  **CForm**: 内置 Agreement 组件样式引入
- `CForm` 修复 FormItem controlChildStyle 生效及增加 FormItem 打桩([600cb48e](https://code.byted.org/cloud-fe/cloud-materials/commit/600cb48e))
- `CForm` 支持返回和取消按钮二次确认([a2293a90](https://code.byted.org/cloud-fe/cloud-materials/commit/a2293a90))
- CCollapse: popover 模式限制最大展示数量([1f3ce2c4](https://code.byted.org/cloud-fe/cloud-materials/commit/1f3ce2c4))
- CForm：确认页 columnConfig 类型更正([5016ab36](https://code.byted.org/cloud-fe/cloud-materials/commit/5016ab36))
- `CAsyncSelect` 不在内部挂载节点([3d946e11](https://code.byted.org/cloud-fe/cloud-materials/commit/3d946e11))
- CAsyncSelect 新增功能：1. SelectOption 里面新增 disabledTooltipContent 支持展示禁用原因 2.多选情况下支持 hover maxTag 展示隐藏的全部信息并支持复制所有或者其中一条 3.支持默认的复制行为([a5c8d623](https://code.byted.org/cloud-fe/cloud-materials/commit/a5c8d623))
- fix(common.CDetail): CDetail 适配 cPrefixCls([f4acdd55](https://code.byted.org/cloud-fe/cloud-materials/commit/f4acdd55))
- `COperationMenu Popconfirm disabled 属性可自定义`([130a14cf](https://code.byted.org/cloud-fe/cloud-materials/commit/130a14cf))
- **CTable**: 修复开启行选择和固定列配置时拖拽表头样式错乱的问题([48479a3d](https://code.byted.org/cloud-fe/cloud-materials/commit/48479a3d))
- `CCopy`支持传入自定义复制触发节点([289044f7](https://code.byted.org/cloud-fe/cloud-materials/commit/289044f7))
  `@arco-design/theme-volcengine-ui-v3` 回退一个火山主题包版本，避免 button line-height 问题
- `CDrawer` mask false 场景下自动阻止 popover modal 等组件触发其关闭的逻辑([11b689bc](https://code.byted.org/cloud-fe/cloud-materials/commit/11b689bc))
- **CInlineEdit**: 修复使用 builtIn 时 rules 不生效的问题([3e7cc60e](https://code.byted.org/cloud-fe/cloud-materials/commit/3e7cc60e))
- CTableTransfer: 初始化完成不调用 onChange 函数([07cac60a](https://code.byted.org/cloud-fe/cloud-materials/commit/07cac60a))
- 修复 inline type 语法([4706b72f](https://code.byted.org/cloud-fe/cloud-materials/commit/4706b72f))
- CCollapse: popover 模式增加自定义操作([9652cc96](https://code.byted.org/cloud-fe/cloud-materials/commit/9652cc96))

### 📦 **Updated dependencies**

- @arco-design/theme-volcengine-ui-v3@0.0.26
- @arco-design/web-react@2.50.0

## 0.7.0

### 💎 **Features**


### 🐛 **Bug Fixes**

- **CForm**: FormItem 装饰器中内容超出宽度限制修复([cfd571bc](https://code.byted.org/cloud-fe/cloud-materials/commit/cfd571bc))
- **CAgreement**: 新增 `CAgreement` 组件([bb38d70b](https://code.byted.org/cloud-fe/cloud-materials/commit/bb38d70b))
- **CRadio**: 新增 `horizontalLayout`属性([5ea5ecc1](https://code.byted.org/cloud-fe/cloud-materials/commit/5ea5ecc1))
  **CCheckbox**: 新增 `horizontalLayout`属性
- `CForm` 优化 demo([ed8ab9b1](https://code.byted.org/cloud-fe/cloud-materials/commit/ed8ab9b1))
- CTableTransfer：onAdd 函数返回值增加 void 类型、onChange 函数增加 rawData 返回、选择触发上限支持 tootip 提示([67b67a3f](https://code.byted.org/cloud-fe/cloud-materials/commit/67b67a3f))
- `CForm` 内置增加 `PreSelectedTable`组件([8e5a6a1c](https://code.byted.org/cloud-fe/cloud-materials/commit/8e5a6a1c))
- `CAsyncSelect`: 超长 tooltip 挂载在父节点([0fdeb752](https://code.byted.org/cloud-fe/cloud-materials/commit/0fdeb752))
- `CAsyncSelect`: ifAutoLoadFirst 只生效一次、某些情况下清空 searchWord、showSearch 参数失效问题解决([e2363789](https://code.byted.org/cloud-fe/cloud-materials/commit/e2363789))
- **CTableEditor**: 提供`EditableCell`组件以实现单个单元格的编辑操作([7ea09fc1](https://code.byted.org/cloud-fe/cloud-materials/commit/7ea09fc1))
- **CInlineEdit**: `fieldType` 新增 `Select` 可选性,内置支持渲染 Select 组件([438292f4](https://code.byted.org/cloud-fe/cloud-materials/commit/438292f4))
- **CInlineEdit**: 接入 builtIn 支持内置 field 组件([24bd205a](https://code.byted.org/cloud-fe/cloud-materials/commit/24bd205a))
- **CEllipsis**: `popoverContent`支持通过函数根据当前文本是否溢出自定义显示 `Popover` 内容([a6ec7d66](https://code.byted.org/cloud-fe/cloud-materials/commit/a6ec7d66))
- fix(common.CDetail): 修复 CDetail tab 有根怪线的样式问题([c4022be5](https://code.byted.org/cloud-fe/cloud-materials/commit/c4022be5))
- `CInfoSection`: 适配组件自定义前缀([f14f0964](https://code.byted.org/cloud-fe/cloud-materials/commit/f14f0964))
- `COperationMenu: 修复 popover 和 popconfirm 同时存在时，popover 不展示的问题`([6001752a](https://code.byted.org/cloud-fe/cloud-materials/commit/6001752a))
- `COperationMenu 新增 arcoDropdownProps 属性`([6ac6762d](https://code.byted.org/cloud-fe/cloud-materials/commit/6ac6762d))
- **CTable**: 适配组件自定义前缀([84003257](https://code.byted.org/cloud-fe/cloud-materials/commit/84003257))
- **CTableEditor**: tableEditor 实例增加新增多行方法`addRows`和删除一行方法`deleteRow`([d9ab1fbf](https://code.byted.org/cloud-fe/cloud-materials/commit/d9ab1fbf))
- **CTableEditor**: 修复撤销上一步数据异常的问题([6231f307](https://code.byted.org/cloud-fe/cloud-materials/commit/6231f307))
- `CStatus: 修复枚举值注释错误`([de2fe3c5](https://code.byted.org/cloud-fe/cloud-materials/commit/de2fe3c5))
- `CStatus`组件`CNameInfo组件`组件`CListEditor`组件接入全局配置方案([bf8a18ee](https://code.byted.org/cloud-fe/cloud-materials/commit/bf8a18ee))
- `CStatus`组件,`CNameInfo`组件,`CListEditor`组件外层增加 data-cy([fa637ce2](https://code.byted.org/cloud-fe/cloud-materials/commit/fa637ce2))
- `CSidebar`支持 title dropdown menu([9dc0660b](https://code.byted.org/cloud-fe/cloud-materials/commit/9dc0660b))
- `CModal CDrawer`支持二次确认([f4b4e8f9](https://code.byted.org/cloud-fe/cloud-materials/commit/f4b4e8f9))
- **CDetail**: 新增 showBackIcon 属性([8870131a](https://code.byted.org/cloud-fe/cloud-materials/commit/8870131a))
  **CDetailPage**: 新增 showBackIcon 属性
- `CForm` 修复响应式属性 children 重复问题 & 优化 FormItem 文档([e4681e03](https://code.byted.org/cloud-fe/cloud-materials/commit/e4681e03))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.49.2

## 0.6.1

### 🐛 **Bug Fixes**

- **CCheckbox**: UI 走查([586f673f](https://code.byted.org/cloud-fe/cloud-materials/commit/586f673f))
  **CForm**: 内置 CRadio 适配 readPretty
- **CForm**: 设置默认装饰器弹出框挂载元素([0212a21a](https://code.byted.org/cloud-fe/cloud-materials/commit/0212a21a))
- **CForm**: 表单内置 `CAsyncSelect` 支持依赖 `form.data` 字段([b1ed0d4e](https://code.byted.org/cloud-fe/cloud-materials/commit/b1ed0d4e))
- **CForm**: FormItem 装饰器的 tooltip 提示支持透传 PopoverProps([31ff32c1](https://code.byted.org/cloud-fe/cloud-materials/commit/31ff32c1))
- `CForm` 方法增加 form([a8182cd6](https://code.byted.org/cloud-fe/cloud-materials/commit/a8182cd6))
- CInfoSection: 新增 noMargin 参数配置无边距模式([62ab4d5e](https://code.byted.org/cloud-fe/cloud-materials/commit/62ab4d5e))
- **CPopupEdit** : 自定义展示内容(`displayContent`)和自定义编辑图标(`displayEditIcon`)支持为空([fcec1c3a](https://code.byted.org/cloud-fe/cloud-materials/commit/fcec1c3a))
- **CPopupEdit**: 输入框按下回车键也可触发确定事件(onOk)([856079b1](https://code.byted.org/cloud-fe/cloud-materials/commit/856079b1))
- **CPopupEdit**: 确定事件(`onOk`)如果返回的是一个 reject Promise,则编辑弹窗保持显示(即不关闭)([cac86e33](https://code.byted.org/cloud-fe/cloud-materials/commit/cac86e33))
- **CTableEditor**: 增加一系列可以简化操作的 helper 帮助函数, 通过`CTableEditor.helper`访问([25739349](https://code.byted.org/cloud-fe/cloud-materials/commit/25739349))
- **CTableEditor**: 内部 form 实例调用`submit`或`validate`时会滚动到第一个报错的字段([6506989c](https://code.byted.org/cloud-fe/cloud-materials/commit/6506989c))
- **CForm**: 内置 `Agreement` 新增 `scene` 属性，标识普通场景和卡片场景的协议([a4c048f6](https://code.byted.org/cloud-fe/cloud-materials/commit/a4c048f6))
  **CForm**: 新增 `defaultDecoratorProps` 属性，可直接透传默认装饰器的属性
- **CFeeCalculator**: popover 展示条件判断有误([f3d513bf](https://code.byted.org/cloud-fe/cloud-materials/commit/f3d513bf))
- cForm Text 组件接收 value 值、修复初始化 loading 效果、增加 useCForm 导出([56e4b0f3](https://code.byted.org/cloud-fe/cloud-materials/commit/56e4b0f3))
- 去掉间距，与设计稿对齐，对外暴露 CTableProps 配置([84c4665d](https://code.byted.org/cloud-fe/cloud-materials/commit/84c4665d))
- 修复 CTag 自定义类名前缀([1e120b9c](https://code.byted.org/cloud-fe/cloud-materials/commit/1e120b9c))
- 修复 CTag 边框样式([5d4f5a99](https://code.byted.org/cloud-fe/cloud-materials/commit/5d4f5a99))
- `COperationMenu`新增 onClick 支持返回 Promise 实现 loading 效果([7c7c8a75](https://code.byted.org/cloud-fe/cloud-materials/commit/7c7c8a75))
- 升级 storage-formily([3753bd3b](https://code.byted.org/cloud-fe/cloud-materials/commit/3753bd3b))
- **CTable**: 对自定义列功能的改动: 1. 下拉菜单模式下「恢复默认」按钮吸底, 2. 支持配置自定义内容的 tooltip 或使用 column 配置中的 tooltip, 3. 用户自定义配置后按钮变为已选状态([5e23fe33](https://code.byted.org/cloud-fe/cloud-materials/commit/5e23fe33))
- **CTable**: 对 toolbar 的改动: 元素间距改为 12px([db669a83](https://code.byted.org/cloud-fe/cloud-materials/commit/db669a83))
- **CTable**: 内置组件 COperationMenu 样式修复([8c3bd2f8](https://code.byted.org/cloud-fe/cloud-materials/commit/8c3bd2f8))
- **CTable**: 修复自定义列按钮的 tooltip 不消失的问题([fb72166e](https://code.byted.org/cloud-fe/cloud-materials/commit/fb72166e))
- `CStatus`统一同一尺寸下 icon 大小,large: 16px, default: 14px([0bdc940a](https://code.byted.org/cloud-fe/cloud-materials/commit/0bdc940a))
- **CInlineEdit**: 修复点击操作按钮触发 onBlur 事件([633d57aa](https://code.byted.org/cloud-fe/cloud-materials/commit/633d57aa))
- **CInlineEdit**: 修复宽度溢出时 EditIcon 的布局([db12abc1](https://code.byted.org/cloud-fe/cloud-materials/commit/db12abc1))
- `CDrawer`StepForm 支持自定义 DecoratorProps([f7ce68aa](https://code.byted.org/cloud-fe/cloud-materials/commit/f7ce68aa))
- `CModal CDrawer`等顶部内容对齐 body 内容([c6319317](https://code.byted.org/cloud-fe/cloud-materials/commit/c6319317))
- `CModal`支持配置滚动条触发阈值([b79bb6e1](https://code.byted.org/cloud-fe/cloud-materials/commit/b79bb6e1))
- `CLoading` 修复 CLoading 在同时设置 loading 和 hasError 同时展示([c1466dcf](https://code.byted.org/cloud-fe/cloud-materials/commit/c1466dcf))

### 📦 **Updated dependencies**

- @arco-design/theme-volcengine-ui-v3@0.0.24
- @arco-design/theme-volcengine-ui-v3@0.0.23

## 0.6.0

### 💎 **Features**

- **CCheckbox**: 新增 CCheckbox 组件([b7958890](https://code.byted.org/cloud-fe/cloud-materials/commit/b7958890))
  **CRadio**: 支持自定义高度，新增卡片 Demo
  **CRadio**: 新增 `iconLayout` 属性，支持配置图标位置
- `CSideBar`支持 badge([6b1a8122](https://code.byted.org/cloud-fe/cloud-materials/commit/6b1a8122))
- **CInlineEdit**:新增异步校验能力([6613f5c2](https://code.byted.org/cloud-fe/cloud-materials/commit/6613f5c2))
- 主题包切换到火山引擎 3.0 规范 @arco-design/theme-volcengine-ui-v3([5c8564cd](https://code.byted.org/cloud-fe/cloud-materials/commit/5c8564cd))

### 🐛 **Bug Fixes**

- **CFeeCalculator**: 修复 0 元被展示为-的问题([44abeb9a](https://code.byted.org/cloud-fe/cloud-materials/commit/44abeb9a))
- `CForm` 优化 form 文档([cc64eba0](https://code.byted.org/cloud-fe/cloud-materials/commit/cc64eba0))
- `CForm` 修复 setState 刷新 CForm 内部组件问题 & ArrayItem 内置对齐问题([c4afeb62](https://code.byted.org/cloud-fe/cloud-materials/commit/c4afeb62))
- `CForm` 修复 CForm header 被 Table fixed 穿透问题([53a2f19f](https://code.byted.org/cloud-fe/cloud-materials/commit/53a2f19f))
- `CForm` 锚点优化支持配置展示级数([2ebaf484](https://code.byted.org/cloud-fe/cloud-materials/commit/2ebaf484))
- `CInfoSection`: 在按行排列时支持用 span 控制占位数([e4edc0da](https://code.byted.org/cloud-fe/cloud-materials/commit/e4edc0da))
- `CAsyncSelect`: extra 处理优化([f5976037](https://code.byted.org/cloud-fe/cloud-materials/commit/f5976037))
- **CTable**: 自定义列功能升级，支持下拉菜单&弹窗两种模式，并支持前端保存([458c772b](https://code.byted.org/cloud-fe/cloud-materials/commit/458c772b))
- **CTable**: 解决内置筛选项 searchInput 阴影样式的问题([e025527e](https://code.byted.org/cloud-fe/cloud-materials/commit/e025527e))
- **CTableEditor**: 解决 tableConfig 中的 extraConfig 不生效的问题([8b29bcd7](https://code.byted.org/cloud-fe/cloud-materials/commit/8b29bcd7))
- **CTableEditor**: 解决非受控模式下 tableConfig 中传 data 导致报错的问题([41dafbb6](https://code.byted.org/cloud-fe/cloud-materials/commit/41dafbb6))
- **CTableEditor**: 在 CTableEditor 组件静态属性上挂载 defineColumn 和 defineColumns 工具函数([c032c6c3](https://code.byted.org/cloud-fe/cloud-materials/commit/c032c6c3))
- `CFeeCalculator`: 计费组件支持未传总价时显示-([fead0c1b](https://code.byted.org/cloud-fe/cloud-materials/commit/fead0c1b))
- fix CTableTransfer docs([d0625583](https://code.byted.org/cloud-fe/cloud-materials/commit/d0625583))
- CDetail 样式修复([5271879a](https://code.byted.org/cloud-fe/cloud-materials/commit/5271879a))
- CDetail: 标题 status 样式修复([ac96f907](https://code.byted.org/cloud-fe/cloud-materials/commit/ac96f907))
- 修复确认页 dataSource 取值容错([c3b13c68](https://code.byted.org/cloud-fe/cloud-materials/commit/c3b13c68))
- **CTable**: 修复 arcoTableProps 中包含 pagination 并当数据为空时报错的问题([29c4654e](https://code.byted.org/cloud-fe/cloud-materials/commit/29c4654e))
- **CTable**: 在组件静态属性上挂载 defineToolbar([9482089f](https://code.byted.org/cloud-fe/cloud-materials/commit/9482089f))
- `CForm` 内置组件 `CTableSelect` 单选时组件值由数组修改为字符串([c188c6be](https://code.byted.org/cloud-fe/cloud-materials/commit/c188c6be))
- **CInfoSection**: CInfoSectionData 支持传入 className([0ea66d7c](https://code.byted.org/cloud-fe/cloud-materials/commit/0ea66d7c))
- 修复循环依赖报错([85a1baef](https://code.byted.org/cloud-fe/cloud-materials/commit/85a1baef))
- `CModal`添加 formRef 用于获取 form 的 Ref([1e5d45dd](https://code.byted.org/cloud-fe/cloud-materials/commit/1e5d45dd))
- **CCheckbox**: 文档站样式问题([3515e9fd](https://code.byted.org/cloud-fe/cloud-materials/commit/3515e9fd))
- **CInlineEdit**: 修复点击取消时,未重置异步校验状态的场景([f45d5e62](https://code.byted.org/cloud-fe/cloud-materials/commit/f45d5e62))
- **CInlineEdit**: 修复 disabled 下的 UI 表现行为([8737ba30](https://code.byted.org/cloud-fe/cloud-materials/commit/8737ba30))
- `CModal` 对齐源力的 closeIcon([8de89ee4](https://code.byted.org/cloud-fe/cloud-materials/commit/8de89ee4))
- 为了指定组件样式顺序,暂时先切回手动生成 dist/index.less([76b2801d](https://code.byted.org/cloud-fe/cloud-materials/commit/76b2801d))
- 修改 less 产物为自动扫描生成([06c836f0](https://code.byted.org/cloud-fe/cloud-materials/commit/06c836f0))
- `CFrom` helper 回调 fetchData 运行抛错增加 log 并且取消后续字段回调执行([e38d5cb9](https://code.byted.org/cloud-fe/cloud-materials/commit/e38d5cb9))
- `CSidebar`提升层级到 1000([e32558b0](https://code.byted.org/cloud-fe/cloud-materials/commit/e32558b0))
- `CModal`修复 confirm cancelButtonProps 属性不生效的问题([94dcbe11](https://code.byted.org/cloud-fe/cloud-materials/commit/94dcbe11))
- 修复 Drawer 无法预览的问题([aa50bd25](https://code.byted.org/cloud-fe/cloud-materials/commit/aa50bd25))
- **CForm**: 文档站 CForm 中的内置组件 CRadio 和 CCheckbox 样式未引入([32648ea6](https://code.byted.org/cloud-fe/cloud-materials/commit/32648ea6))

### 📦 **Updated dependencies**

- @arco-design/web-react@2.48.1

## 0.5.0

### 💎 **Features**

- `CForm` 1. 支持锚点 2. 导出 form 实例支持([7d5385ce](https://code.byted.org/cloud-fe/cloud-materials/commit/7d5385ce))
- 1. `CTag` 组件 `type` 属性新增 `text-dot`([c5cbf78b](https://code.byted.org/cloud-fe/cloud-materials/commit/c5cbf78b))
  2. 优化 `CTag` 组件前缀标签 `closable`、`checkable` 功能

### 🐛 **Bug Fixes**

- `CForm` 内置组件 `Agreement` 组件支持传入多个协议([c12036d6](https://code.byted.org/cloud-fe/cloud-materials/commit/c12036d6))
- `CForm` 导出 formily arco 和 interface([c8459a87](https://code.byted.org/cloud-fe/cloud-materials/commit/c8459a87))
- `CForm` 去除输入组件固定宽度([1fac4e3b](https://code.byted.org/cloud-fe/cloud-materials/commit/1fac4e3b))
- `CForm` 装饰器重新布局([303787ca](https://code.byted.org/cloud-fe/cloud-materials/commit/303787ca))
- 1. `CInfoSection` 组件支持在外层传递 hidden/visible 属性([7b635910](https://code.byted.org/cloud-fe/cloud-materials/commit/7b635910))
  2. `CInfoSection` 组件修复识别 0 问题
- **CEllipsis**:新增 `defaultText` 属性，渲染为空时展示的默认文案([e834cdb9](https://code.byted.org/cloud-fe/cloud-materials/commit/e834cdb9))
- `CForm` 支持导出 `Section` 组件([c3b39bb9](https://code.byted.org/cloud-fe/cloud-materials/commit/c3b39bb9))
- `CForm` helper fieldCallback 工具函数 checker 参数增强,selectFirst 默认 checker 逻辑优化([23921937](https://code.byted.org/cloud-fe/cloud-materials/commit/23921937))
- **CTable**: 表格内字号改为 12px([d80c3ba5](https://code.byted.org/cloud-fe/cloud-materials/commit/d80c3ba5))
- **CTable**: 修复 loadMore 模式下刷新表格触发多次滚动加载的问题([056d3d24](https://code.byted.org/cloud-fe/cloud-materials/commit/056d3d24))
- **CTable**: 在组件静态属性上挂载 helper 提供帮助函数;增加两个处理 query 的帮助函数([b0ea1616](https://code.byted.org/cloud-fe/cloud-materials/commit/b0ea1616))
- **CTable**: 修复 searchInput 内置筛选激活时滚动到页面顶部的问题([462a91e6](https://code.byted.org/cloud-fe/cloud-materials/commit/462a91e6))
- **CTable**: 分页器改为默认向上弹出以解决在 Tabs 组件中使用被截断的问题([c29d71ae](https://code.byted.org/cloud-fe/cloud-materials/commit/c29d71ae))
- **CTableEditor**: 解决业务仓库中使用 CTableEditor 缺少样式的问题([d45de974](https://code.byted.org/cloud-fe/cloud-materials/commit/d45de974))
- `CForm` 内置取消按钮([f7d39371](https://code.byted.org/cloud-fe/cloud-materials/commit/f7d39371))
  `CForm` 修复 `footer` 区域和内容区域分开滚动的问题，修复容器宽度小于 1260px 无法完全显示的问题
  `CFeeCalculator` 计费组件支持退费
  `CFeeCalculator` 新增 `PriceInfo.discountPrecision` 控制折扣和价格的精度
  `CFeeCalculator` 新增 `PriceInfo.detailTitle` 和 `PriceInfo.detailDesc` API
  `CFeeCalculator` 新增 `PriceInfo.popoverProps` API
- 添加 CTag 依赖组件样式([79ad4715](https://code.byted.org/cloud-fe/cloud-materials/commit/79ad4715))
- `CAsyncSelect`: 修复 renderFormat 的 options 为 null 导致内容不渲染的问题([527192cb](https://code.byted.org/cloud-fe/cloud-materials/commit/527192cb))
- **CTable**: 修复没有配置 filter 的列也会出现在 fetcher 的 filerValues 中的问题([57088433](https://code.byted.org/cloud-fe/cloud-materials/commit/57088433))
- 修复 transfer 右侧数据筛选之后回调传递的 key 集合为空([763ad199](https://code.byted.org/cloud-fe/cloud-materials/commit/763ad199))
- `CNameInfo`新增属性 nameRenderType,用于配置 name 的渲染方式,默认为 link;原 disableLink 属性调整回透传 Link 组件的 disabled 属性;新增属性 isIconHoverSqueezeWidth,用于调整 icon 在不显示时是否占位问题,默认为 false,不显示时任然占位,不会在 hover 时挤压已显示内容.([07f31674](https://code.byted.org/cloud-fe/cloud-materials/commit/07f31674))
  `CStatus`icon 修改 iconbox 版本升级;新增 size 属性,默认值为 default,status 高 20px,字体 12px,支持 large,高 24px,字体 13px
- `CFeeCalculator` 组件新增 `deps` 属性([7d4c5508](https://code.byted.org/cloud-fe/cloud-materials/commit/7d4c5508))
  `CFeeCalculator` 修复 `loading` 无法受控
  `CFeeCalculator` 新增 `PriceInfo.showPopover` 属性
- `CModal` 修复从 arco 拷贝的 confirm info 等函数不受**CConfigProvider.config**影响的问题([23f17573](https://code.byted.org/cloud-fe/cloud-materials/commit/23f17573))
- `CSideBar` 修复 sub menu 子菜单未选中时颜色不对的问题([3bed9658](https://code.byted.org/cloud-fe/cloud-materials/commit/3bed9658))
- `CModal`修复文档 demo 滚动条失效([80ce1368](https://code.byted.org/cloud-fe/cloud-materials/commit/80ce1368))
  - @arco-design/iconbox-react-cloud@^0.0.38

### 📦 **Updated dependencies**

- @arco-design/theme-ve-o-design@1.0.10
- @arco-design/web-react@2.48.0

## 0.4.0

### 💎 **Features**

- **CTableEditor**: 新增可编辑表格组件-CTableEditor([a89a328e](https://code.byted.org/cloud-fe/cloud-materials/commit/a89a328e))

### 🐛 **Bug Fixes**

- `CForm` 修复 ArrayItems UI & 刷新问题([2ff559aa](https://code.byted.org/cloud-fe/cloud-materials/commit/2ff559aa))
- 详情页支持在 Header 中展示基本信息([62e09f3b](https://code.byted.org/cloud-fe/cloud-materials/commit/62e09f3b))
- **CTableEditor**: `editConfig`支持配置为函数([fa965b0b](https://code.byted.org/cloud-fe/cloud-materials/commit/fa965b0b))
- **CTableEditor**: 提升受控模式下的性能([5fd7d9af](https://code.byted.org/cloud-fe/cloud-materials/commit/5fd7d9af))
- **CTable**: toolbar 的 component 和 componentProps 配置为函数时在参数中加入 tableEditor 实例([cc5310af](https://code.byted.org/cloud-fe/cloud-materials/commit/cc5310af))
- `CNameInfo`组件 1.支持 id 可编辑,当前为上下两盒都可复制&编辑; 2.添加 iconHoverDisplay 属性,用于 copy&editicon 非 hover 现实场景。 3.调整 disableLink 属性，Link 组件透传 disabled -> name 是否为 Link 组件渲染。原功能通过 arcoLinkProps.disabled 透传([bc5ef34c](https://code.byted.org/cloud-fe/cloud-materials/commit/bc5ef34c))
- `CForm` 内置计费组件的计算结果挂在到 field.data 上([3a90f5f2](https://code.byted.org/cloud-fe/cloud-materials/commit/3a90f5f2))
- `CForm` 内置计费组件的时长和数量挂载到`field.value`上([d4a938cc](https://code.byted.org/cloud-fe/cloud-materials/commit/d4a938cc))
- `CForm` 表单默认装饰器 1.header 支持函数配置 2.footer 样式修复([758e3b7b](https://code.byted.org/cloud-fe/cloud-materials/commit/758e3b7b))
- 修复 Tab 详情页带字段信息展示 demo([1bba524f](https://code.byted.org/cloud-fe/cloud-materials/commit/1bba524f))
- 修复 `CCascaderSearch` 在切换字段时会自动跳转到第一条数据的问题([057829ee](https://code.byted.org/cloud-fe/cloud-materials/commit/057829ee))
- 文档删除对 IconVpc IconAcl 的引用([a097f0c3](https://code.byted.org/cloud-fe/cloud-materials/commit/a097f0c3))
- **CTable**: 增加 `defineConfig`, `defineColumn`, `defineColumns` 并挂载到组件静态属性([895bed60](https://code.byted.org/cloud-fe/cloud-materials/commit/895bed60))
- **CTable**: 删除无用的 `getComponent`([1c733ed8](https://code.byted.org/cloud-fe/cloud-materials/commit/1c733ed8))
- `CNameInfo`组件 id 复制错误修复([82c04ab3](https://code.byted.org/cloud-fe/cloud-materials/commit/82c04ab3))
- `CStatus`设计稿修正 icon&text 垂直居中([03b3c3b2](https://code.byted.org/cloud-fe/cloud-materials/commit/03b3c3b2))
- `CModalTable`去掉默认 800 的宽度,按需自定义宽度([11dd0382](https://code.byted.org/cloud-fe/cloud-materials/commit/11dd0382))
- `CModal` 修复 onOk 错误泄露到控制台的问题([bf4cf93d](https://code.byted.org/cloud-fe/cloud-materials/commit/bf4cf93d))
- `CModal` 修复 ModalForm 确认按钮过大的问题([9939efab](https://code.byted.org/cloud-fe/cloud-materials/commit/9939efab))
- `CSideBar` openKeys selectedKeys 支持受控的([86ece257](https://code.byted.org/cloud-fe/cloud-materials/commit/86ece257))
- `CInfoSection`修复 CInlineEdit 内置组件在严格模式下 onSubmit 的参数类型问题([96b09e57](https://code.byted.org/cloud-fe/cloud-materials/commit/96b09e57))
- 修复使用 webpack4 无法正确构建的问题([b2f3f279](https://code.byted.org/cloud-fe/cloud-materials/commit/b2f3f279))
- `COperationMenu fix 在有 popover 的情况下，className 会被附加在 popover 的dom 上`([4ec46f0f](https://code.byted.org/cloud-fe/cloud-materials/commit/4ec46f0f))
- `COperationMenu 修复 Popconfirm okButtonProps 未生效`([53ee984a](https://code.byted.org/cloud-fe/cloud-materials/commit/53ee984a))
- `CForm` 内置异步下拉组件支持在依赖项改变时仅重新获取数据源,不重置 value([ef406a2c](https://code.byted.org/cloud-fe/cloud-materials/commit/ef406a2c))

### 📦 **Updated dependencies**

- @arco-design/iconbox-react-cloud@0.0.37
- @arco-design/theme-ve-o-design@1.0.9
- @arco-design/web-react@2.47.1

## 0.3.0

### 💎 **Features**

- `CAsyncSelect` 新增 `reload` 属性([74d65234](https://code.byted.org/cloud-fe/cloud-materials/commit/74d65234))
  `CForm` 新增 `CAsyncSelect` 内置组件
- `CForm` form-item 使用 storage-formily 中的组件([8665a618](https://code.byted.org/cloud-fe/cloud-materials/commit/8665a618))
- `CForm` 支持外部传入 form & 修复若干问题([3bf092e9](https://code.byted.org/cloud-fe/cloud-materials/commit/3bf092e9))
- 修复`cAsyncSelect`组件多选模式下`ifAutoLoadFirst`参数失效的问题([d4eb5b7b](https://code.byted.org/cloud-fe/cloud-materials/commit/d4eb5b7b))
- `cAsyncSelect` 组件增加 `initOptions` 参数、reload 依赖修改、demo 优化([83173208](https://code.byted.org/cloud-fe/cloud-materials/commit/83173208))
- **CAsyncSelect**: 支持 `ref` ，对外暴露 `reset` 方法([a6f778da](https://code.byted.org/cloud-fe/cloud-materials/commit/a6f778da))
  **CAsyncSelect**: 修复 重新加载时、多选模式下 未清除历史搜索内容，导致重新加载时自动选中第一项出现 bug
  **CAsyncSelect**: 修复 `value`和`dataSource`受控的 bug
  **CAsyncSelect**: 修复 fetchData 中固定 pageSize 为 10 的 bug
  **CAsyncSelect**: 修复 搜索模式下，限定仅手动修改搜索值时触发重新加载

### 🐛 **Bug Fixes**

- 修改 CForm 内置异步下拉框组件导出的类型([8f407ff1](https://code.byted.org/cloud-fe/cloud-materials/commit/8f407ff1))
- `CForm` 默认装饰器样式支持全页面布局([520e2f0e](https://code.byted.org/cloud-fe/cloud-materials/commit/520e2f0e))
- CBatchPasteInput:替换 flex 布局样式中的 start 为 flex-start([8a553768](https://code.byted.org/cloud-fe/cloud-materials/commit/8a553768))
- `CForm` form-item controlPopover([eb698374](https://code.byted.org/cloud-fe/cloud-materials/commit/eb698374))
- `CForm` 新增步骤改变前和改变后回调([bc92a3ed](https://code.byted.org/cloud-fe/cloud-materials/commit/bc92a3ed))
- `CForm` 支持注册默认装饰器([5ea84991](https://code.byted.org/cloud-fe/cloud-materials/commit/5ea84991))
- `CForm` 修复 doc 报错([aa8a400d](https://code.byted.org/cloud-fe/cloud-materials/commit/aa8a400d))
- `CForm` 更新依赖([1042ffd7](https://code.byted.org/cloud-fe/cloud-materials/commit/1042ffd7))
- `CForm` 样式修复 + ArrayTable 支持响应式([2e89e6b4](https://code.byted.org/cloud-fe/cloud-materials/commit/2e89e6b4))
- `CForm` 修复 datepicker & rangepicker 默认值([d1a8e309](https://code.byted.org/cloud-fe/cloud-materials/commit/d1a8e309))
- `CForm` 修复 ArrayItems 联动问题([7d3f60c8](https://code.byted.org/cloud-fe/cloud-materials/commit/7d3f60c8))
- `CCascaderSearch 过滤传入的无效参数`([a263b19b](https://code.byted.org/cloud-fe/cloud-materials/commit/a263b19b))
- `CForm` 新增 `Password`([e286127c](https://code.byted.org/cloud-fe/cloud-materials/commit/e286127c))
- **CTable**: 修复轮询模式下操作表头筛选项时异常的问题([7954ba99](https://code.byted.org/cloud-fe/cloud-materials/commit/7954ba99))
- `table` 支持 onToolbarValueChange 事件([d68e1913](https://code.byted.org/cloud-fe/cloud-materials/commit/d68e1913))
- **CTable**: 自适应宽度计算修改为基于 13px 的字体大小([063fab00](https://code.byted.org/cloud-fe/cloud-materials/commit/063fab00))
- **CTable** 解决下载弹窗下载成功后，不会自动关闭的问题([2232df25](https://code.byted.org/cloud-fe/cloud-materials/commit/2232df25))
- [CTable] 解决 hidden 的列在计算 scrollX 和下载数据时，没有被过滤的问题([782b6cfe](https://code.byted.org/cloud-fe/cloud-materials/commit/782b6cfe))
- **CTableTransfer**: 默认隐藏 Table 边框([5caa4e1f](https://code.byted.org/cloud-fe/cloud-materials/commit/5caa4e1f))
- **CEllipsis**修改 font-size 值,继承父级元素([b5e8c404](https://code.byted.org/cloud-fe/cloud-materials/commit/b5e8c404))
- form demo & style([2faa5333](https://code.byted.org/cloud-fe/cloud-materials/commit/2faa5333))
- `CForm` 样式产物文件修复([99e58525](https://code.byted.org/cloud-fe/cloud-materials/commit/99e58525))
- `CForm` 类型增强, 修复默认 checker 逻辑([2f67276c](https://code.byted.org/cloud-fe/cloud-materials/commit/2f67276c))
- `CAsyncSelect` 修复设置`maxTagCount`后的样式问题([0dda88f3](https://code.byted.org/cloud-fe/cloud-materials/commit/0dda88f3))
- `form`修改 style 文件引入路径([c628d270](https://code.byted.org/cloud-fe/cloud-materials/commit/c628d270))
- `CTable` toolbar 中 CSearch 的内置组件 CCascaderSearch 的数据结构变为 { [fieldName]: value }([899be7fa](https://code.byted.org/cloud-fe/cloud-materials/commit/899be7fa))
- **CTable**: 自定义列文案变更为"自定义列表字段"([73f8ed6b](https://code.byted.org/cloud-fe/cloud-materials/commit/73f8ed6b))
- `CForm` 修复内置组件 CTableSelect 设置 dataSource 失效问题([83124dad](https://code.byted.org/cloud-fe/cloud-materials/commit/83124dad))
  `CFeeType` 修复组件 display 为 error 时，不传入 nextStatusName 不展示计费状态问题
- `CNameInfo` 修复遗漏透传属性([f92e327a](https://code.byted.org/cloud-fe/cloud-materials/commit/f92e327a))
- `CNameInfo` suffix 和 copy icon 放入`CEllipsis` suffix 计入总宽度计算([8e40d147](https://code.byted.org/cloud-fe/cloud-materials/commit/8e40d147))
- `CForm`支持配置默认装饰器的 `header` 区和 `top` 区的吸顶模式;修复滚动条位置问题 `bug`([f4955dc0](https://code.byted.org/cloud-fe/cloud-materials/commit/f4955dc0))
- `CForm` footer 支持自适应高度,header 支持定制样式([a96ce5e6](https://code.byted.org/cloud-fe/cloud-materials/commit/a96ce5e6))
- 升级 arco-cli 适配 DetailPage 的 api 文档([916947ce](https://code.byted.org/cloud-fe/cloud-materials/commit/916947ce))
- `CConfigProvider`自动透传上个 context([b02fe6c5](https://code.byted.org/cloud-fe/cloud-materials/commit/b02fe6c5))
- `CContentWrapper`调整全屏模式下的滚动条位置([c213e981](https://code.byted.org/cloud-fe/cloud-materials/commit/c213e981))
- 添加 CForm 静态属性组件 Field,用于和 CForm 内置组件类型保持一致([f5bfc0e0](https://code.byted.org/cloud-fe/cloud-materials/commit/f5bfc0e0))
- CModal 和 CDrawer 添加 useMaskableOnOkGuard 用于 onOk 控制([1443f9c9](https://code.byted.org/cloud-fe/cloud-materials/commit/1443f9c9))
- `CSideBar`添加文字溢出 popover([38c2a764](https://code.byted.org/cloud-fe/cloud-materials/commit/38c2a764))
- `CSideBar`修复传入 mode 时自动计算覆盖传入值的问题([d46aa317](https://code.byted.org/cloud-fe/cloud-materials/commit/d46aa317))
- - `CSidebar` 补充 `defaultOpenSubMenu` 属性([55845ba9](https://code.byted.org/cloud-fe/cloud-materials/commit/55845ba9))
  - `CSidebar` 补充 `outerMarkIcon` 属性用于隐藏或自定义配置 `isOuter` 为 true 时的后缀 icon
- `ModalForm`将 maskableClose 默认值指定为 false([b57c2ba7](https://code.byted.org/cloud-fe/cloud-materials/commit/b57c2ba7))
  `CConfigProvider`修复默认 local 被 arco local 覆盖的问题
- `CContentWrapper`修复最小宽度为 1200+60px padding([2dca45fa](https://code.byted.org/cloud-fe/cloud-materials/commit/2dca45fa))
- `CDrawer`修复 mask: false 时的意外情况([046446a9](https://code.byted.org/cloud-fe/cloud-materials/commit/046446a9))
- `CForm` 解决因为使用 typeof function 语法导致的兼容性问题([7e1cf51c](https://code.byted.org/cloud-fe/cloud-materials/commit/7e1cf51c))
- `CSidebar` 修复 style.width 配置后不生效的问题([0b29b52a](https://code.byted.org/cloud-fe/cloud-materials/commit/0b29b52a))
- `CSideBar`修复对 group 类型的菜单收起后未收集 icon 的问题([3ab69346](https://code.byted.org/cloud-fe/cloud-materials/commit/3ab69346))
- `CSideBar`根据第一层菜单自动计算 mode([67573e1e](https://code.byted.org/cloud-fe/cloud-materials/commit/67573e1e))
- `CSidebar`修复无法匹配动态路由的问题([ea01d519](https://code.byted.org/cloud-fe/cloud-materials/commit/ea01d519))
- `CSidebar` logo 垂直对齐问题修复([b40b1680](https://code.byted.org/cloud-fe/cloud-materials/commit/b40b1680))
  `CSidebar` less 的 tint 函数的兼容性问题
- `CForm` helper 类型改进([0f77a212](https://code.byted.org/cloud-fe/cloud-materials/commit/0f77a212))
- `CForm` 修复 helpertips 多个时展示错误([cf223634](https://code.byted.org/cloud-fe/cloud-materials/commit/cf223634))
- 迁移到 arco-cli2.0([62207cc2](https://code.byted.org/cloud-fe/cloud-materials/commit/62207cc2))
- `CForm` 添加默认类型提供外部使用([e9ae767a](https://code.byted.org/cloud-fe/cloud-materials/commit/e9ae767a))
- CModal CDrawer 的 open 系列函数支持自动推导 form table 的泛型([b63f4be3](https://code.byted.org/cloud-fe/cloud-materials/commit/b63f4be3))
- `ContentWrapper` 支持传入 prefixCls 用于兼容渐进式迁移([712312fc](https://code.byted.org/cloud-fe/cloud-materials/commit/712312fc))
- `common.CForm` 内置`ConfigPreview`组件`formatter`函数允许返回空,返回空时不显示当前项([9994eab8](https://code.byted.org/cloud-fe/cloud-materials/commit/9994eab8))
- 修复文档站的样式问题([e623b478](https://code.byted.org/cloud-fe/cloud-materials/commit/e623b478))
- `CModal`修复 select 等组件弹出后被遮住的问题([eddf61c8](https://code.byted.org/cloud-fe/cloud-materials/commit/eddf61c8))
- `CStatus`文档占注释与导出修正:StatusProps->CStatusProps([df4bb106](https://code.byted.org/cloud-fe/cloud-materials/commit/df4bb106))
- `CStatus`和`CListEditor`组件,修复颜色变量使用 base-gray-xxx([91e99076](https://code.byted.org/cloud-fe/cloud-materials/commit/91e99076))

## 0.2.0

### 💎 **Features**

- `CAsyncSelect` 解决多选双行情况样式问题和多选单行样式优化([452ed77](https://code.byted.org/cloud-fe/cloud-materials/commit/452ed77))
- sidebar 支持 renderMenuItem 对 menuItem 进行包裹([93e55e2](https://code.byted.org/cloud-fe/cloud-materials/commit/93e55e2))

### 🐛 **Bug Fixes**

- `CSearch` 在 mount 时不执行回调([8a23caf](https://code.byted.org/cloud-fe/cloud-materials/commit/8a23caf))
- 云基础统一物料库 MVP Beta 版本发布([dc94795](https://code.byted.org/cloud-fe/cloud-materials/commit/dc94795))
- 修复 `CInlineEdit` hover 时的 icon 样式([377cab5](https://code.byted.org/cloud-fe/cloud-materials/commit/377cab5))
- `CTable` 默认添加 border 对齐源力主题([31c6273](https://code.byted.org/cloud-fe/cloud-materials/commit/31c6273))
- 优化 DrawerForm 和 ModalForm 的 header 展示([df8d43d](https://code.byted.org/cloud-fe/cloud-materials/commit/df8d43d))
- CModal 和 CDrawer 通过 api 打开时也能替换 clsPrefix([8955f50](https://code.byted.org/cloud-fe/cloud-materials/commit/8955f50))
- 修复 CModal 样式未生效的问题([a3d68ad](https://code.byted.org/cloud-fe/cloud-materials/commit/a3d68ad))
- `CSidebar` 修复 sidebar matchPath 时 exact 没有默认值的问题([7ac4284](https://code.byted.org/cloud-fe/cloud-materials/commit/7ac4284))
- `CContentWrapper` 增加 layout 字段以明确布局([5b6f021](https://code.byted.org/cloud-fe/cloud-materials/commit/5b6f021))
- CContentWrapper 添加自定义 render body 部分的能力([2b988f2](https://code.byted.org/cloud-fe/cloud-materials/commit/2b988f2))
