# @cloud-materials/common

## 1.20.1

### Patch Changes

- 56773265: **CFeeCalculator**: 计费器支持隐藏总价
- d80a2b00: common.CDetailPage 新增 renderActiveTabContent，更细粒度的控制 tab 内容展示
- 88af342e: 修复 CInfoSection jsx 使用 colNumber 未生效问题
- 6bd6cf93: checkAllTitle 可导出 serachStr
- 25a5051e: `调整一些 en 文案`

## 1.20.1-beta.4

### Patch Changes

- 25a5051e: `调整一些 en 文案`

## 1.20.1-beta.3

### Patch Changes

- 6bd6cf93: checkAllTitle 可导出 serachStr

## 1.20.1-beta.2

### Patch Changes

- 88af342e: 修复 CInfoSection jsx 使用 colNumber 未生效问题

## 1.20.1-beta.1

### Patch Changes

- d80a2b00: common.CDetailPage 新增 renderActiveTabContent，更细粒度的控制 tab 内容展示

## 1.20.1-beta.0

### Patch Changes

- 56773265: **CFeeCalculator**: 计费器支持隐藏总价

## 1.20.0

### Patch Changes

- b18a8afe: CLoading.Spin、CLoading.Result、CLoadingV2 增加 children 属性适配 React18 类型定义
- 3dfc5e25: fix(common.CInfoSection): 修复 CInfoSection children 字段隐藏问题；移除迷惑的 useInfoSection；修复 calcSpan 导致的字段消失问题
- 09a45fbb: 获取合法的 activeTabKey，初始化默认选中；DetailPage.init 前置到到 Detail.constructor 中;初始化默认选中可用的 key

## 1.20.0-beta.3

### Patch Changes

- b18a8afe: CLoading.Spin、CLoading.Result、CLoadingV2 增加 children 属性适配 React18 类型定义

## 1.20.0-beta.2

### Patch Changes

- 3dfc5e25: fix(common.CInfoSection): 修复 CInfoSection children 字段隐藏问题；移除迷惑的 useInfoSection；修复 calcSpan 导致的字段消失问题
- 09a45fbb: 获取合法的 activeTabKey，初始化默认选中；DetailPage.init 前置到到 Detail.constructor 中;初始化默认选中可用的 key

## 1.20.0-beta.1

### Minor Changes

- 44ae76e2: `common.CSearch`: 复合搜索支持搜索项可隐藏，搜索内容不展示 label 以及不可修改

## 1.19.2-beta.0

### Patch Changes

- 582e8538: CLoading CCopy 补全 children 定义以兼容 react 18

## 1.19.1

### Patch Changes

- 93efc598: 解决对 localtion.search 取值时，没有去除问号的问题，导致初始化时，无法固定到 URL 参数对应的 tab
- 29a143a2: `CTable` 修复 arcoColumnProps 回传 row 类型
- 60917994: 修改断点 1290->1280；修复 CInfoSection.List.listData.splitItemList 失效问题

## 1.19.1-beta.2

### Patch Changes

- 60917994: 修改断点 1290->1280；修复 CInfoSection.List.listData.splitItemList 失效问题

## 1.19.1-beta.1

### Patch Changes

- 29a143a2: `CTable` 修复 arcoColumnProps 回传 row 类型

## 1.19.1-beta.0

### Patch Changes

- 93efc598: 解决对 localtion.search 取值时，没有去除问号的问题，导致初始化时，无法固定到 URL 参数对应的 tab

## 1.19.0

### Minor Changes

- f45869d3: [CDetailPage] 优化 loading 的展示位置，避免太靠页面顶部；支持刷新时，不卸载 tab 内部的组件
- 9d6c0eb1: hooks: 新增 useBreakpoint；CInfoSection 支持自适应配置；自他自适应组件适配中

### Patch Changes

- 626e291e: `验证 bp 主题包的版本大于等于 0.2.4`
- 666e0a16: **common.CForm**: cformasyncselect 增加导出类&清空时增加判断非空
- 41554f14: **CTable**: 增加 onColumnVisibleChange 钩子
- 215626e1: Section 新增 extra 属性,支持自定义 header 内右侧内容
- 80252e0a: **common.CForm**: fieldsReactive 依赖字段之间有相互依赖时，导致 fieldCallback 中 depValues 为旧数据
- 1a6db0d2: **CAgreement**: 支持透传 arcoPopoverProps 对协议描述信息的气泡框进行设置
- 142218fe: **CConfigPreview**: 新增 beforeSubmit 属性：点击提交前的回调函数，返回 boolean，如果返回 false，会终止提交流程。该方法的触发时机：表单校验完成后，onSubmit 调用前。
- a1a60668: `CTable` 修复 arcoColumnProps 类型未添加列类型的问题
- 8445378b: fix(common.CDrawerSelect): 修复开启 showDefaultFooter 时,未点击确认就触发 onChange 的问题
- f2bb786c: @storage-fe/formily-arco 升级, 支持 ArrayTable 处理 ObjectField

## 1.19.0-beta.8

### Patch Changes

- a1a60668: `CTable` 修复 arcoColumnProps 类型未添加列类型的问题

## 1.19.0-beta.7

### Patch Changes

- 215626e1: Section 新增 extra 属性,支持自定义 header 内右侧内容

## 1.19.0-beta.6

### Patch Changes

- 626e291e: `验证 bp 主题包的版本大于等于 0.2.4`

## 1.19.0-beta.5

### Minor Changes

- 9d6c0eb1: hooks: 新增 useBreakpoint；CInfoSection 支持自适应配置；自他自适应组件适配中

## 1.19.0-beta.4

### Patch Changes

- 41554f14: **CTable**: 增加 onColumnVisibleChange 钩子

## 1.19.0-beta.3

### Minor Changes

- f45869d3: [CDetailPage] 优化 loading 的展示位置，避免太靠页面顶部；支持刷新时，不卸载 tab 内部的组件

## 1.18.1-beta.2

### Patch Changes

- 666e0a16: **common.CForm**: cformasyncselect 增加导出类&清空时增加判断非空
- 142218fe: **CConfigPreview**: 新增 beforeSubmit 属性：点击提交前的回调函数，返回 boolean，如果返回 false，会终止提交流程。该方法的触发时机：表单校验完成后，onSubmit 调用前。

## 1.18.1-beta.1

### Patch Changes

- 80252e0a: **common.CForm**: fieldsReactive 依赖字段之间有相互依赖时，导致 fieldCallback 中 depValues 为旧数据

## 1.18.1-beta.0

### Patch Changes

- 1a6db0d2: **CAgreement**: 支持透传 arcoPopoverProps 对协议描述信息的气泡框进行设置
- 8445378b: fix(common.CDrawerSelect): 修复开启 showDefaultFooter 时,未点击确认就触发 onChange 的问题
- f2bb786c: @storage-fe/formily-arco 升级, 支持 ArrayTable 处理 ObjectField

## 1.18.0

### Minor Changes

- 7c7c9113: 新增`CTour`组件,支持业务用于漫游式引导功能
- 9e2dacec: 新增 CAsyncContent 用于处理 fetcher loading content error 场景

### Patch Changes

- e7d730ad: **common.CSearch**: 复合搜索支持配置不展示键盘操作提示
- afaefb75: `common.CSearch`: css 变量使用修改为 less 变量
- cd9a84fe: [CDetailPage] 解决 url 中有中文,切换 tab 时,中文被循环 encode 的问题;统一对 query 的操作为 qs 处理
- 6568808d: CTable 解决左下角的的取消选择没有翻译的问题
- 03b75bc7: `CSidebar` Feeback 在展开时不再展示 popover
- 212313a7: `CTable` 修复 CTable.changeToolbarValues debounce 不生效的问题
- cbaaa982: CContentWrapper 增加 customTopContent 参数
- f47769ab: `CDetailPage` 更新文档
- 6b9f51b5: `sidebar.Feedback` 修复 tooltip 可能被截断的问题
- 65ff23dd: `CSidebar` 修复 Feeback tooltips 可能被遮挡的问题

## 1.18.0-beta.6

### Patch Changes

- 6568808d: CTable 解决左下角的的取消选择没有翻译的问题

## 1.18.0-beta.5

### Patch Changes

- cd9a84fe: [CDetailPage] 解决 url 中有中文,切换 tab 时,中文被循环 encode 的问题;统一对 query 的操作为 qs 处理

## 1.18.0-beta.4

### Minor Changes

- 9e2dacec: 新增 CAsyncContent 用于处理 fetcher loading content error 场景

### Patch Changes

- 212313a7: `CTable` 修复 CTable.changeToolbarValues debounce 不生效的问题
- 65ff23dd: `CSidebar` 修复 Feeback tooltips 可能被遮挡的问题

## 1.18.0-beta.3

### Patch Changes

- cbaaa982: CContentWrapper 增加 customTopContent 参数
- 6b9f51b5: `sidebar.Feedback` 修复 tooltip 可能被截断的问题

## 1.18.0-beta.2

### Patch Changes

- 03b75bc7: `CSidebar` Feeback 在展开时不再展示 popover
- f47769ab: `CDetailPage` 更新文档

## 1.18.0-beta.1

### Minor Changes

- 7c7c9113: 新增`CTour`组件,支持业务用于漫游式引导功能

## 1.17.1-beta.0

### Patch Changes

- afaefb75: `common.CSearch`: css 变量使用修改为 less 变量

## 1.17.0

### Minor Changes

- 6ff8d6fa: CSidebar 支持内置反馈按钮，并且收起控制区域不在支持 hover 后展开收起的菜单

### Patch Changes

- 6065c5bb: `CModal.confirm` 修复 hideCancel 不工作的问题

## 1.17.0-beta.1

### Patch Changes

- 6065c5bb: `CModal.confirm` 修复 hideCancel 不工作的问题

## 1.17.0-beta.0

### Minor Changes

- 6ff8d6fa: CSidebar 支持内置反馈按钮，并且收起控制区域不在支持 hover 后展开收起的菜单

## 1.16.1

### Patch Changes

- 8c5c5848: feat(CConditions): 条件切换支持唯一选项卡片展示
- dcc54756: **CForm**: CFormAsyncSelect 在 CForm 中使用时，依赖更新，数据源是否立即刷新根据`autoLoad`属性决定
- a453cc88: CDetailPage 支持刷新时,不清空 globalScope
- 8c4bd6a3: fix(common.CTable): 解决 expand row 配置没有响应 GlobalScope 类型的问题
- b104e889: [CTable] 解决配置表格的 startPoolingAfterInitData 后，表格的轮训在表格卸载后可能不会停止的问题
- e5fc004d: `Cmodal.OpenForm` 修复可能出现的类型错误

## 1.16.1-beta.4

### Patch Changes

- b104e889: [CTable] 解决配置表格的 startPoolingAfterInitData 后，表格的轮训在表格卸载后可能不会停止的问题

## 1.16.1-beta.3

### Patch Changes

- a453cc88: CDetailPage 支持刷新时,不清空 globalScope
- 8c4bd6a3: fix(common.CTable): 解决 expand row 配置没有响应 GlobalScope 类型的问题

## 1.16.1-beta.2

### Patch Changes

- dcc54756: **CForm**: CFormAsyncSelect 在 CForm 中使用时，依赖更新，数据源是否立即刷新根据`autoLoad`属性决定

## 1.16.1-beta.1

### Patch Changes

- e5fc004d: `Cmodal.OpenForm` 修复可能出现的类型错误

## 1.16.1-beta.0

### Patch Changes

- 8c5c5848: feat(CConditions): 条件切换支持唯一选项卡片展示

## 1.16.0

### Minor Changes

- a1d82119: - [CTable] 支持定义 GlobalScope 泛型
  - [CDetailPage] 执行定义 GlobalScope 泛型
- 3d4f17c1: `CLoadingV2` 修改 Result 组件 icon 包管理方式,大大缩小产物体积

### Patch Changes

- 4b295add: **CForm**: 升级 `formily-arco`至`1.6.13`解决：ArrayItem SortHandle 支持自定义图标&ArrayTable 在隐藏列时更新渲染
- 1a6d05b2: `CDrawer` 优化 StepForm 的 step 宽度效果
- 35080615: **CFeeCalculator**: 1. 已省 X 元的语序问题根据所选语言修正 2.完善海外计费器的 DEMO

## 1.16.0-beta.3

### Minor Changes

- 3d4f17c1: `CLoadingV2` 修改 Result 组件 icon 包管理方式,大大缩小产物体积

## 1.16.0-beta.2

### Patch Changes

- 4b295add: **CForm**: 升级 `formily-arco`至`1.6.13`解决：ArrayItem SortHandle 支持自定义图标&ArrayTable 在隐藏列时更新渲染

## 1.16.0-beta.1

### Minor Changes

- a1d82119: - [CTable] 支持定义 GlobalScope 泛型
  - [CDetailPage] 执行定义 GlobalScope 泛型

## 1.15.3-beta.0

### Patch Changes

- 1a6d05b2: `CDrawer` 优化 StepForm 的 step 宽度效果
- 35080615: **CFeeCalculator**: 1. 已省 X 元的语序问题根据所选语言修正 2.完善海外计费器的 DEMO

## 1.15.2

### Patch Changes

- 85bdde5f: **CForm** visible 等响应式函数，在 cfield 卸载时取消响应
- fa3e6d0e: `CDrawer`优化 CDrawer.Detail Tabs paddingLeft 视觉效果
- 80d61593: **CForm** 修复 CFormAsyncSelect 在 disabled 并传入禁用原因时，未省略时不展示 popover 的问题&非加载错误态时自定义 dropdownRender
- 429c570f: **CForm** 修复 CFormAsyncSelectReactive 自定义 renderFormat、onSelect、onDeselect 参数类型问题&内置 renderFormat 支持 label(value)格式
- 52f9b66d: **CSearch** 修复 CSearch 在 manual 传入对象且重复生成配置时，导致重渲染 & CCombineSearch 更新参数时排除空对象

## 1.15.2-beta.3

### Patch Changes

- 85bdde5f: **CForm** visible 等响应式函数，在 cfield 卸载时取消响应
- 429c570f: **CForm** 修复 CFormAsyncSelectReactive 自定义 renderFormat、onSelect、onDeselect 参数类型问题&内置 renderFormat 支持 label(value)格式

## 1.15.2-beta.2

### Patch Changes

- 80d61593: **CForm** 修复 CFormAsyncSelect 在 disabled 并传入禁用原因时，未省略时不展示 popover 的问题&非加载错误态时自定义 dropdownRender

## 1.15.2-beta.1

### Patch Changes

- fa3e6d0e: `CDrawer`优化 CDrawer.Detail Tabs paddingLeft 视觉效果

## 1.15.2-beta.0

### Patch Changes

- 52f9b66d: **CSearch** 修复 CSearch 在 manual 传入对象且重复生成配置时，导致重渲染 & CCombineSearch 更新参数时排除空对象

## 1.15.1

### Patch Changes

- d236ed84: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 （不检查用户安装的兼容版本）
- 90406865: `CTable` 修复全局 enableRaceCondition 可能不生效的问题
- 78dbdfde: **CConfigPreview**: 1. 支持透传 className 和 style；重新计算配置详情组件的 max-height 前重置 max-height，避免用户自定义的显隐逻辑无法触发高度的重新计算
  **CFeeCalculator**: 1. 支持 visible 属性，控制组件显隐
- 8e0fb8c3: `CDetail` 修复因升级火山主题导致的 tab padding left 问题
- 21f98df8: **CForm** 修复 cformasyncselect 传入 label 为空字符串高度未撑开的问题&fetcher 抛出错误给 useInfiniteScroll 处理
- 9cef46d7: **CForm** 修复 cformasyncselect 重置后 focus 时不请求的问题
- a0adc302: `CSidebar` 修复控制台 react 警告

## 1.15.1-beta.5

### Patch Changes

- 9cef46d7: **CForm** 修复 cformasyncselect 重置后 focus 时不请求的问题

## 1.15.1-beta.4

### Patch Changes

- 8e0fb8c3: `CDetail` 修复因升级火山主题导致的 tab padding left 问题
- 21f98df8: **CForm** 修复 cformasyncselect 传入 label 为空字符串高度未撑开的问题&fetcher 抛出错误给 useInfiniteScroll 处理

## 1.15.1-beta.3

### Patch Changes

- 78dbdfde: **CConfigPreview**: 1. 支持透传 className 和 style；重新计算配置详情组件的 max-height 前重置 max-height，避免用户自定义的显隐逻辑无法触发高度的重新计算
  **CFeeCalculator**: 1. 支持 visible 属性，控制组件显隐

## 1.15.1-beta.2

### Patch Changes

- a0adc302: `CSidebar` 修复控制台 react 警告

## 1.15.1-beta.1

### Patch Changes

- 90406865: `CTable` 修复全局 enableRaceCondition 可能不生效的问题

## 1.15.1-beta.0

### Patch Changes

- d236ed84: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 （不检查用户安装的兼容版本）

## 1.15.0

### Minor Changes

- 5f830949: `CPopupEdit` 英语状态下按钮文案为 Save
  `CPopupEdit`和`CNameInfo` 支持通过 CConfigProvider.cComponentConfig 全局配置属性

### Patch Changes

- 3805d863: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 测试
- 4b02207e: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败
- 56e28e33: **CSideBar**
  - 优化初次加载后再展开菜单时造成的“闪动”问题
  - 优化 `currentPath` 的逻辑，初次加载时若包含 currentPath，可能忽略`defaultSelectedKeys` 和 `defaultOpenKeys`
- 4133104a: **CForm** CFormAsyncSelect 支持自定义处理 options&内置 option 的 getPopupContainer 使用组件配置&修复重复请求
- c4dd3781: **CForm** CFormAsyncSelect 修复 allowCreate 时 extra 数据未取到，挂载 field.dataSource 只挂载 list 数据
- 664ad74d: `CModal.Form` 改进 CModal.openForm 的 Promise 类型
- fd78ca69: 修改本地模式下 sourceTree 更新时 target 值随之更新的时机。 避免在自定义搜索时修改 sourceTree 导致 target 变化的问题
- 983dc446: **CCascaderSearch** 受控时，修复传入 value 触发 onChange 的问题
- 8907279c: `CModal.openForm`修复 jsx 形式使用时 onOk 返回值被限制的问题
- 69d7ef3b: `CModal.openForm` 类型优化,兼容 ts4.9
- 1ba57fb4: CDetailPage Refresh 文案修改为大写开头
- 61a30562: CConditionsGroup 的 conditionRender 新增 groupIndex 参数

## 1.15.0-beta.6

### Patch Changes

- 4b02207e: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败
- 61a30562: CConditionsGroup 的 conditionRender 新增 groupIndex 参数

## 1.15.0-beta.5

### Minor Changes

- 5f830949: `CPopupEdit` 英语状态下按钮文案为 Save
  `CPopupEdit`和`CNameInfo` 支持通过 CConfigProvider.cComponentConfig 全局配置属性

### Patch Changes

- 3805d863: **-**: 提醒用户升级 byteplus 的主题包，否则在 byteplus 下可能编译失败 测试

## 1.14.1-beta.4

### Patch Changes

- 983dc446: **CCascaderSearch** 受控时，修复传入 value 触发 onChange 的问题

## 1.14.1-beta.3

### Patch Changes

- c4dd3781: **CForm** CFormAsyncSelect 修复 allowCreate 时 extra 数据未取到，挂载 field.dataSource 只挂载 list 数据
- 69d7ef3b: `CModal.openForm` 类型优化,兼容 ts4.9

## 1.14.1-beta.2

### Patch Changes

- fd78ca69: 修改本地模式下 sourceTree 更新时 target 值随之更新的时机。 避免在自定义搜索时修改 sourceTree 导致 target 变化的问题
- 8907279c: `CModal.openForm`修复 jsx 形式使用时 onOk 返回值被限制的问题

## 1.14.1-beta.1

### Patch Changes

- 56e28e33: **CSideBar**
  - 优化初次加载后再展开菜单时造成的“闪动”问题
  - 优化 `currentPath` 的逻辑，初次加载时若包含 currentPath，可能忽略`defaultSelectedKeys` 和 `defaultOpenKeys`
- 664ad74d: `CModal.Form` 改进 CModal.openForm 的 Promise 类型
- 1ba57fb4: CDetailPage Refresh 文案修改为大写开头

## 1.14.1-beta.0

### Patch Changes

- 4133104a: **CForm** CFormAsyncSelect 支持自定义处理 options&内置 option 的 getPopupContainer 使用组件配置&修复重复请求

## 1.14.0

### Minor Changes

- 368e058b: **CForm**: 内置 AsyncSelect，解决 value 和 dataSource 的受控，ifAutoLoadFirst 的错误覆盖问题，切换步骤 label 丢失，readPretty 展示
- 7c40a41e: - 轮训时，在 fetcher 中加入 isPolling 标识
  - 支持 startPoolingAfterInitData 控制是否在初始化请求后再开始轮训，避免初始化时同时触发两个请求
- 6b36f619: [CBatchPasteInput] arcoTagProps 支持配置为函数; 支持 tagTips 参数

### Patch Changes

- 5be1788a: 更新依赖声明，使用 ^ 代替固定版本号
- a13ce235: 内部移除并禁用从 arco/lib 导入, 防止引用到 cjs 模块造成产物增大
- 58bbd67e: 导出功能优化，增加 showExportRangeKeys 与 exportRangeDesc 参数，控制导出时的范围选项
- 1feb5c77: **CForm** heleper.effect featchData 和异步 validator 支持配置竞态处理
- 501ac904: `CTable`替换通用 safeRace 方案
- 3e23f0e6: `CTable` 支持从 CConfigProvider 配置竞态开关
- d875c2f0: 增加自定义左侧全选 title 能力;对于 disable 的项在全选时不选中; 支持本地模式下 source 数据的异步加载
- a4854053: **CForm** 修复高阶组件 ReactiveWithForm 中标识重复导致未执行监听依赖函数的问题 & 类型修改
- 5e9db34e: **CFeeCalculator**: 设置规范变更，黄色改为橙色
  **CFeeType**: 设置规范变更，黄色改为橙色
  **CAgreement**: 修改前缀的颜色
- da13cce3: `CForm` 修复 array remove 按钮 disabled 属性不生效问题
- f7c42ebe: CTabs：修复无左边底部 border 的 Bug
- 9e054a83: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.24
  - @arco-design/theme-volcengine-ui-v3@0.1.4
  - @arco-design/web-react@2.64.1
- 312b6ebe: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.27

## 1.14.0-beta.6

### Minor Changes

- 7c40a41e: - 轮训时，在 fetcher 中加入 isPolling 标识
  - 支持 startPoolingAfterInitData 控制是否在初始化请求后再开始轮训，避免初始化时同时触发两个请求
- 6b36f619: [CBatchPasteInput] arcoTagProps 支持配置为函数; 支持 tagTips 参数

### Patch Changes

- 5be1788a: 更新依赖声明，使用 ^ 代替固定版本号
- da13cce3: `CForm` 修复 array remove 按钮 disabled 属性不生效问题
- f7c42ebe: CTabs：修复无左边底部 border 的 Bug

## 1.14.0-beta.5

### Minor Changes

- 368e058b: **CForm**: 内置 AsyncSelect，解决 value 和 dataSource 的受控，ifAutoLoadFirst 的错误覆盖问题，切换步骤 label 丢失，readPretty 展示

### Patch Changes

- 501ac904: `CTable`替换通用 safeRace 方案
- d875c2f0: 增加自定义左侧全选 title 能力;对于 disable 的项在全选时不选中; 支持本地模式下 source 数据的异步加载
- a4854053: **CForm** 修复高阶组件 ReactiveWithForm 中标识重复导致未执行监听依赖函数的问题 & 类型修改
- 312b6ebe: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.27

## 1.13.4-beta.4

### Patch Changes

- 58bbd67e: 导出功能优化，增加 showExportRangeKeys 与 exportRangeDesc 参数，控制导出时的范围选项

## 1.13.4-beta.3

### Patch Changes

- a13ce235: 内部移除并禁用从 arco/lib 导入, 防止引用到 cjs 模块造成产物增大
- 3e23f0e6: `CTable` 支持从 CConfigProvider 配置竞态开关

## 1.13.4-beta.2

### Patch Changes

- 1feb5c77: **CForm** heleper.effect featchData 和异步 validator 支持配置竞态处理

## 1.13.4-beta.1

### Patch Changes

- 9e054a83: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.24
  - @arco-design/theme-volcengine-ui-v3@0.1.4
  - @arco-design/web-react@2.64.1

## 1.13.4-beta.0

### Patch Changes

- 5e9db34e: **CFeeCalculator**: 设置规范变更，黄色改为橙色
  **CFeeType**: 设置规范变更，黄色改为橙色
  **CAgreement**: 修改前缀的颜色

## 1.13.3

### Patch Changes

- a0e68b8a: `CDetailPage` 支持通过 enableRaceCondition 配置 fetcher 处理竞态问题
- 8459dd12: **CSideBar** 修复 sidebar 标题部分情况下单词被切割的问题

## 1.13.3-beta.0

### Patch Changes

- a0e68b8a: `CDetailPage` 支持通过 enableRaceCondition 配置 fetcher 处理竞态问题
- 8459dd12: **CSideBar** 修复 sidebar 标题部分情况下单词被切割的问题

## 1.13.2

### Patch Changes

- 9855cd1e: **CForm**: 升级 formily-arco 到 1.6.11，修改 FormItem 的 tooltip，cursor 改为 pointer。
- 0a18d261: **CTable**: 加固自定义列中对 localStorage 的处理逻辑
- 4dc8b901: **CFeeCalculator**: 修改费用详情的小问号图标的 cursor 为 pointer
- d5f0b2fc: `CSidebar` 新增 `collapsible` 属性,用于控制菜单不可被收起
- b03064db: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.21

## 1.13.2-beta.3

### Patch Changes

- 0a18d261: **CTable**: 加固自定义列中对 localStorage 的处理逻辑

## 1.13.2-beta.2

### Patch Changes

- 9855cd1e: **CForm**: 升级 formily-arco 到 1.6.11，修改 FormItem 的 tooltip，cursor 改为 pointer。
- d5f0b2fc: `CSidebar` 新增 `collapsible` 属性,用于控制菜单不可被收起

## 1.13.2-beta.1

### Patch Changes

- 4dc8b901: **CFeeCalculator**: 修改费用详情的小问号图标的 cursor 为 pointer

## 1.13.2-beta.0

### Patch Changes

- b03064db: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.21

## 1.13.1

### Patch Changes

- a6cbfec7: `CConfigProvider` 支持监听组件打印的日志

## 1.13.1-beta.0

### Patch Changes

- a6cbfec7: `CConfigProvider` 支持监听组件打印的日志

## 1.13.0

### Minor Changes

- 7b9b2e8f: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.17
  - @arco-design/theme-volcengine-ui-v3@0.1.3
  - @arco-design/web-react@2.64.0

### Patch Changes

- 8670d567: **common.CSearch**: 支持传入手动搜索和重置按钮的属性，手动搜索时不防抖
- b759dbe9: **CTreeTransfer** 增加 AutoExpandTarget 参数，为 true 时选中节点后自动展开
- 5d50b6e9: **CTreeTransfer** targetTree 清空时，若为本地模式不去情况已选中项
- e730925f: **CFeeType** 修复 CFeeType 在倒计时为 1-2 天时间内，展示倒计时时间错误的问题
- 5b7b5f18: `CListEditor` 组件 修复组件外 form 重置时,组件内部状态不匹配问题

## 1.13.0-beta.2

### Minor Changes

- 7b9b2e8f: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.17
  - @arco-design/theme-volcengine-ui-v3@0.1.3
  - @arco-design/web-react@2.64.0

## 1.12.1-beta.1

### Patch Changes

- 8670d567: **common.CSearch**: 支持传入手动搜索和重置按钮的属性，手动搜索时不防抖
- b759dbe9: **CTreeTransfer** 增加 AutoExpandTarget 参数，为 true 时选中节点后自动展开
- 5d50b6e9: **CTreeTransfer** targetTree 清空时，若为本地模式不去情况已选中项

## 1.12.1-beta.0

### Patch Changes

- e730925f: **CFeeType** 修复 CFeeType 在倒计时为 1-2 天时间内，展示倒计时时间错误的问题
- 5b7b5f18: `CListEditor` 组件 修复组件外 form 重置时,组件内部状态不匹配问题

## 1.12.0

### Minor Changes

- 8bed41a9: 添加 CTextFormat 组件,用于满足计费场景下的折扣文案格式化

### Patch Changes

- ded58852: `common.CForm`: 升级 storage-formily，FormItem 的 label 由 Tooltip 改为 Popover
- e985871f: CConditions: 支持按钮文案自定义
- bd2af90d: `common.CSearch`: 复合搜索支持单独 select 选项配置搜索时 fuzzyConfig
- b0d30c7b: **CSearch** 高级搜索支持配置折叠面板默认值
- 8a048c98: **CSearch** 复合搜索优化 inline 模式下 custom 配置，增加 onCancel 控制
- 6bb73289: **common.CSearch**: 修复复合搜索 list 重新生成导致输入临时值清空的问题
- 59eb294f: **CForm** 修复 Section 组件 title 不能传入除 string 以外类型的问题
- bc6d8fac: CGuide 更新首次折叠闪烁问题

## 1.12.0-beta.5

### Minor Changes

- 8bed41a9: 添加 CTextFormat 组件,用于满足计费场景下的折扣文案格式化

### Patch Changes

- 59eb294f: **CForm** 修复 Section 组件 title 不能传入除 string 以外类型的问题

## 1.11.1-beta.4

### Patch Changes

- 8a048c98: **CSearch** 复合搜索优化 inline 模式下 custom 配置，增加 onCancel 控制

## 1.11.1-beta.3

### Patch Changes

- bc6d8fac: CGuide 更新首次折叠闪烁问题

## 1.11.1-beta.2

### Patch Changes

- ded58852: `common.CForm`: 升级 storage-formily，FormItem 的 label 由 Tooltip 改为 Popover
- 6bb73289: **common.CSearch**: 修复复合搜索 list 重新生成导致输入临时值清空的问题

## 1.11.1-beta.1

### Patch Changes

- e985871f: CConditions: 支持按钮文案自定义
- bd2af90d: `common.CSearch`: 复合搜索支持单独 select 选项配置搜索时 fuzzyConfig

## 1.11.1-beta.0

### Patch Changes

- b0d30c7b: **CSearch** 高级搜索支持配置折叠面板默认值

## 1.11.0

### Minor Changes

- 7f09fb21: CEllipsis 新增 suffix 属性

### Patch Changes

- 8ce32259: **chore**: 升级 formily-arco 到 1.6.8，formily-arco 去除多余 moment 依赖包
- b5dc7343: `common.CSearch`: 复合搜索支持模糊搜索时 onSearch 事件，支持传入 popoverTriggerProps
- bfcf24e4: **CModal.Form** helper subFieldValidChecker 支持配置是否校验
- 4754f912: `CModal.Form`支持保留提交和验证能力的同时自定义 footer
- a70fda5b: 修复 sidebar 文档站卡死问题
- d308001d: `CSidebar` 优化渲染为 a 标签时的点击区域
- 6ef83ac1: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.13
  - @arco-design/web-react@2.63.3

## 1.11.0-beta.4

### Minor Changes

- 7f09fb21: CEllipsis 新增 suffix 属性

### Patch Changes

- bfcf24e4: **CModal.Form** helper subFieldValidChecker 支持配置是否校验
- d308001d: `CSidebar` 优化渲染为 a 标签时的点击区域

## 1.10.2-beta.3

### Patch Changes

- b5dc7343: `common.CSearch`: 复合搜索支持模糊搜索时 onSearch 事件，支持传入 popoverTriggerProps
- a70fda5b: 修复 sidebar 文档站卡死问题

## 1.10.2-beta.2

### Patch Changes

- 6ef83ac1: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.13
  - @arco-design/web-react@2.63.3

## 1.10.2-beta.1

### Patch Changes

- 8ce32259: **chore**: 升级 formily-arco 到 1.6.8，formily-arco 去除多余 moment 依赖包

## 1.10.2-beta.0

### Patch Changes

- 4754f912: `CModal.Form`支持保留提交和验证能力的同时自定义 footer

## 1.10.1

### Patch Changes

- cb7b32b8: 升级 arco-cli,提升文档同步成功率
- ad8c6096: CAddButton 替换 icon 为源力 icon
- 15f3fae0: `CDropdown` 图标替换为源力图标
- 1840247e: `CSideBar`兼容异步菜单场景
- e15af649: `common.CContentWrapper`: 调整 full-page 下内容的 top-padding 为 24px
- 515c9ee9: `common.CForm`: 修复 checkbox 组件 props 传入 children 被删掉的问题
- d715229c: `common.CForm`: 修复使用 validatorReactive 有其他错误时导致页面滚动至其他错误字段的问题
- b4493f6e: `common.CSearch`: 复合搜索 validator 传参增加新旧值，分割搜索词过滤空字符串
- 3e54f33d: 修复渐变 CTag 渐变色方向
- 7199ee83: 对齐部分组件 byteplus 英文文案的规范
- cd4365e7: `CModal` 修复 CModal.Table arcoTableProps 作为函数未生效的问题

## 1.10.1-beta.4

### Patch Changes

- e15af649: `common.CContentWrapper`: 调整 full-page 下内容的 top-padding 为 24px
- b4493f6e: `common.CSearch`: 复合搜索 validator 传参增加新旧值，分割搜索词过滤空字符串

## 1.10.1-beta.3

### Patch Changes

- cb7b32b8: 升级 arco-cli,提升文档同步成功率
- ad8c6096: CAddButton 替换 icon 为源力 icon
- 15f3fae0: `CDropdown` 图标替换为源力图标

## 1.10.1-beta.2

### Patch Changes

- 1840247e: `CSideBar`兼容异步菜单场景
- 3e54f33d: 修复渐变 CTag 渐变色方向
- 7199ee83: 对齐部分组件 byteplus 英文文案的规范
- cd4365e7: `CModal` 修复 CModal.Table arcoTableProps 作为函数未生效的问题

## 1.10.1-beta.1

### Patch Changes

- d715229c: `common.CForm`: 修复使用 validatorReactive 有其他错误时导致页面滚动至其他错误字段的问题

## 1.10.1-beta.0

### Patch Changes

- 515c9ee9: `common.CForm`: 修复 checkbox 组件 props 传入 children 被删掉的问题

## 1.10.0

### Minor Changes

- 5893974e: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.9
  - @arco-design/web-react@2.63.1

### Patch Changes

- 1d931ac4: 添加环境变量用于跳过 formily 检查
- 81c97790: **common.CForm**: cform 修复配置 required 时，fieldsReactive 导致隐藏字段触发校验
- 741d7a55: **CForm**: 规范 CForm 的全局 less 变量名,防止与业务冲突
- 6daa1fd0: `CSidebar` 改进宽度控制体验

## 1.10.0-beta.3

### Patch Changes

- 1d931ac4: 添加环境变量用于跳过 formily 检查

## 1.10.0-beta.2

### Patch Changes

- 741d7a55: **CForm**: 规范 CForm 的全局 less 变量名,防止与业务冲突

## 1.10.0-beta.1

### Patch Changes

- 6daa1fd0: `CSidebar` 改进宽度控制体验

## 1.10.0-beta.0

### Minor Changes

- 5893974e: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.9
  - @arco-design/web-react@2.63.1

### Patch Changes

- 81c97790: **common.CForm**: cform 修复配置 required 时，fieldsReactive 导致隐藏字段触发校验

## 1.9.2

### Patch Changes

- cd627fbf: feat(common.CBrandBanner): 修改 BrandBanner 的内容区对齐方式,并修改默认字号为 13px
- 39119586: `CAsyncSelect`: 修复 hover tag popover 为空的问题
- 494380cd: **CForm**: 修复 validatorReactive 在字段隐藏后触发校验的问题
- f75a8d9d: 规范部分组件的全局 less 变量名,防止与业务冲突
- 4514a23b: **CAgreement**: 协议组件 BP 翻译问题修改
  **CConfigPreview**: 1. onSubmit 中添加数量和时长传参 2.提交按钮去除 htmlType=button 的属性
- 91167684: **CAgreement**: 协议组件 prefix 属性修改为 ReactNode

## 1.9.2-beta.5

### Patch Changes

- f75a8d9d: 规范部分组件的全局 less 变量名,防止与业务冲突

## 1.9.2-beta.4

### Patch Changes

- 494380cd: **CForm**: 修复 validatorReactive 在字段隐藏后触发校验的问题

## 1.9.2-beta.3

### Patch Changes

- 91167684: **CAgreement**: 协议组件 prefix 属性修改为 ReactNode

## 1.9.2-beta.2

### Patch Changes

- cd627fbf: feat(common.CBrandBanner): 修改 BrandBanner 的内容区对齐方式,并修改默认字号为 13px

## 1.9.2-beta.1

### Patch Changes

- 4514a23b: **CAgreement**: 协议组件 BP 翻译问题修改
  **CConfigPreview**: 1. onSubmit 中添加数量和时长传参 2.提交按钮去除 htmlType=button 的属性

## 1.9.2-beta.0

### Patch Changes

- 39119586: `CAsyncSelect`: 修复 hover tag popover 为空的问题

## 1.9.1

### Patch Changes

- 85707704: `common.CForm`: 升级依赖@storage-fe/formily-arco 从 1.6.0 到 1.6.6
- ae4d78de: **CFeeType** 适配 bp 计费状态文案
- 625adf45: `common.CSearch`: 修复复合搜索远程搜索后候选项未更新，新增复合搜索自定义筛选项使用 CAsyncSelect 和键盘事件 demo
- 3468d768: **CConfigPreview**: 新增 InfoPreviewProps.layout 属性，支持修改描述列表的布局，适应 BP 的垂直布局

## 1.9.1-beta.2

### Patch Changes

- 85707704: `common.CForm`: 升级依赖@storage-fe/formily-arco 从 1.6.0 到 1.6.6

## 1.9.1-beta.1

### Patch Changes

- 625adf45: `common.CSearch`: 修复复合搜索远程搜索后候选项未更新，新增复合搜索自定义筛选项使用 CAsyncSelect 和键盘事件 demo

## 1.9.1-beta.0

### Patch Changes

- 3468d768: **CConfigPreview**: 新增 InfoPreviewProps.layout 属性，支持修改描述列表的布局，适应 BP 的垂直布局

## 1.9.0

### Minor Changes

- f8ef202e: `common.CForm`: 将 font-size 和 font-weight 的固定值改为 css 变量

### Patch Changes

- 8479702d: [CTable]列过滤、列搜索、下载确定文案适配英语
- a58494e2: `common.CSearch`: 修复级联搜索传入 arcoSelectProps.onChange 不生效的问题
- 1a8fecbf: `common.CSearch`: 修复复合搜索搜分组项目 disabled 未生效的问题
- 6d2687a7: `CTabs` 修复 arco 样式前缀 hardcoding 的问题
- 7995060e: **CFeeCalculator**: 1. 折扣中展示单位
  **CFeeCalculator**: 2. 新增 customRenderPriceNode 属性支持自定义整个价格节点

## 1.9.0-beta.4

### Patch Changes

- 1a8fecbf: `common.CSearch`: 修复复合搜索搜分组项目 disabled 未生效的问题

## 1.9.0-beta.3

### Patch Changes

- a58494e2: `common.CSearch`: 修复级联搜索传入 arcoSelectProps.onChange 不生效的问题

## 1.9.0-beta.2

### Patch Changes

- 8479702d: [CTable]列过滤、列搜索、下载确定文案适配英语

## 1.9.0-beta.1

### Minor Changes

- f8ef202e: `common.CForm`: 将 font-size 和 font-weight 的固定值改为 css 变量

### Patch Changes

- 6d2687a7: `CTabs` 修复 arco 样式前缀 hardcoding 的问题

## 1.8.1-beta.0

### Patch Changes

- 7995060e: **CFeeCalculator**: 1. 折扣中展示单位
  **CFeeCalculator**: 2. 新增 customRenderPriceNode 属性支持自定义整个价格节点

## 1.8.0

### Minor Changes

- 1168e24e: `common.CContentWrapper`: 增加 layout 为 normal 时对 content 和 header 的 style 配置
- ca279168: [CTable] 支持配置声明 column.title 受控
- 07890867: [CTable] 支持配置 useMemoTableCell 优化 arco 的行选择动作会导致整个 table 渲染的问题

### Patch Changes

- d0af144f: 升级 formily-arco，解决 ArrayTable 嵌套 ArrayItem 场景，当字段报错时异常翻页导致内容消失的问题
- 04ea9c49: `CSearch.CCombinSearch`复合搜索：修复 pop 内容位置未固定，还原 tag 样式、options 分类样式、inline 模式高度、清除图标样式，支持 tab 键切换下一个 option，select 筛选项支持搜素事件，支持选项禁用，文档示例调整
- 55be5714: [CTable] table 的列提示 icon 修改为问号
- 0a698de9: [CTable] 解决 hover 一整行时，popup edit icon 不显示的问题
- a94547b1: `CConfigProvider`去除 cTheme 配置，增加`CConfigProvider.defineENCComponentConfig`用于返回 BytePlus 下的预设配置
  `CFeeCalculator`增加 theme 配置用于配置不同语言下的主题样式
- f8ade2c4: **CModal** 优化滚动区域阴影效果
- 6c21e18e: `CCollpase` 修复 Popover 模式下最后一个 Tag 样式
- c3c72dff: CDetail: 调整 tabs 的样式使 type=line 时边缘与内容区域对齐
- 46b7fa09: **CFeeType** 修正按量计费和包年包月英文文案
- 08503505: **CFeeCalculator**: 1. 支持货币代码 2. 支持金额分隔符 3.支持从 CConfigProvider 配置公共属性 4. 支持海外版本的计费样式
- b77fa142: **CFeeCalculator**: 海外计费器样式走差修改
- 2b06a102: **CFeeCalculator**: 海外计费器: 1.折扣部分不展示货币代码(USD)。 2.折扣形式修改为金额在前：如 \$30 saved 。3. 数量翻译修改。
- 677b57d5: `common.COperationMenu: 在英文模式下，text btn 的字号改为 14px`
- b39624ca: `CListEditor`: addBtnSuffix 允许传入函数,覆盖更多场景

## 1.8.0-beta.7

### Patch Changes

- a94547b1: `CConfigProvider`去除 cTheme 配置，增加`CConfigProvider.defineENCComponentConfig`用于返回 BytePlus 下的预设配置
  `CFeeCalculator`增加 theme 配置用于配置不同语言下的主题样式
- 46b7fa09: **CFeeType** 修正按量计费和包年包月英文文案

## 1.8.0-beta.6

### Patch Changes

- f8ade2c4: **CModal** 优化滚动区域阴影效果

## 1.8.0-beta.5

### Minor Changes

- 07890867: [CTable] 支持配置 useMemoTableCell 优化 arco 的行选择动作会导致整个 table 渲染的问题

### Patch Changes

- 04ea9c49: `CSearch.CCombinSearch`复合搜索：修复 pop 内容位置未固定，还原 tag 样式、options 分类样式、inline 模式高度、清除图标样式，支持 tab 键切换下一个 option，select 筛选项支持搜素事件，支持选项禁用，文档示例调整
- 677b57d5: `common.COperationMenu: 在英文模式下，text btn 的字号改为 14px`
- b39624ca: `CListEditor`: addBtnSuffix 允许传入函数,覆盖更多场景

## 1.8.0-beta.4

### Patch Changes

- 2b06a102: **CFeeCalculator**: 海外计费器: 1.折扣部分不展示货币代码(USD)。 2.折扣形式修改为金额在前：如 \$30 saved 。3. 数量翻译修改。

## 1.8.0-beta.3

### Patch Changes

- b77fa142: **CFeeCalculator**: 海外计费器样式走差修改

## 1.8.0-beta.2

### Minor Changes

- 1168e24e: `common.CContentWrapper`: 增加 layout 为 normal 时对 content 和 header 的 style 配置
- ca279168: [CTable] 支持配置声明 column.title 受控

### Patch Changes

- 55be5714: [CTable] table 的列提示 icon 修改为问号
- 0a698de9: [CTable] 解决 hover 一整行时，popup edit icon 不显示的问题

## 1.7.1-beta.1

### Patch Changes

- d0af144f: 升级 formily-arco
- 08503505: **CFeeCalculator**: 1. 支持货币代码 2. 支持金额分隔符 3.支持从 CConfigProvider 配置公共属性 4. 支持海外版本的计费样式

## 1.7.1-beta.0

### Patch Changes

- 6c21e18e: `CCollpase` 修复 Popover 模式下最后一个 Tag 样式
- c3c72dff: CDetail: 调整 tabs 的样式使 type=line 时边缘与内容区域对齐

## 1.7.0

### Minor Changes

- 88dc8c34: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.2
  - @arco-design/theme-volcengine-ui-v3@0.1.2
  - @arco-design/web-react@2.62.0

### Patch Changes

- 2822d1a1: `common.CTableTransfer` 右侧数据操作列支持用户自定义
- 21527ab9: `common.CTabs` 增加了 CTabs 组件可以撑满父元素的功能
- 543d1bda: `common.CAsyncSelect` 适配 arco maxTagCount 类型
- e2cb4fbf: `CPopupEdit`修复 CPopupEdit 中的 TextArea 组件光标重置问题
- 0c4b8e84: CInfoSection：适配 bp 字号

## 1.7.0-beta.2

### Patch Changes

- 2822d1a1: `common.CTableTransfer` 右侧数据操作列支持用户自定义

## 1.7.0-beta.1

### Minor Changes

- 88dc8c34: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.1.2
  - @arco-design/theme-volcengine-ui-v3@0.1.2
  - @arco-design/web-react@2.62.0

### Patch Changes

- 543d1bda: `common.CAsyncSelect` 适配 arco maxTagCount 类型

## 1.6.1-beta.0

### Patch Changes

- 21527ab9: `common.CTabs` 增加了 CTabs 组件可以撑满父元素的功能
- e2cb4fbf: `CPopupEdit`修复 CPopupEdit 中的 TextArea 组件光标重置问题

## 1.6.0

### Minor Changes

- dffcc17c: `common.CSearch`: 复合搜索: select 不默认 active 第一个选项, 支持配置分隔符并原始数据返回, 支持配置 enableEdit 是否可编辑, 调整搜索结果排序并且支持自定义搜索 filter 函数, 模糊搜索支持配置 defualtField 自动匹配, 各项内搜索支持分隔匹配和大小写配置, 内置 select 候选项 label 省略配置, 支持传入 popover 的样式。

### Patch Changes

- 28e90b0b: `common.CAsyncSwitch` 补充 onSubmit 错误处理
- 7da32bf0: `common.CSearch`: 级联搜索搜索组件改回宽度自动撑满（1.3.1-beta.0 改为非自动），复合搜索更换多选确认图标
- b3bca637: `common.CSearch`: font-size 使用 css 变量；复合搜索仅搜索项为 inputTag 时限制高度，修复在 Safari 下 input 高度问题；新增文案的国际化；placeholder 的获取优先级调整；修复中文输入按下 Enter 误触发搜索的问题
- 6499b064: **CTable**: 导出数据弹窗中，列名超长省略，hover 展示全名
- 81aafac3: 修改 TreeTransfer 展开节点设置逻辑
- 876e8bc4: `COperationMenu: 修复在 safari 浏览器下外露disabled button popover 不会消失`
- b357ee7c: `CDetail`增加 arco-affix 属性透传能力,支持修改 header 附着的元素

## 1.6.0-beta.6

### Patch Changes

- b3bca637: `common.CSearch`: font-size 使用 css 变量；复合搜索仅搜索项为 inputTag 时限制高度，修复在 Safari 下 input 高度问题；新增文案的国际化；placeholder 的获取优先级调整；修复中文输入按下 Enter 误触发搜索的问题

## 1.6.0-beta.5

### Patch Changes

- 876e8bc4: `COperationMenu: 修复在 safari 浏览器下外露disabled button popover 不会消失`

## 1.6.0-beta.4

### Patch Changes

- 6499b064: **CTable**: 导出数据弹窗中，列名超长省略，hover 展示全名

## 1.6.0-beta.3

### Patch Changes

- 7da32bf0: `common.CSearch`: 级联搜索搜索组件改回宽度自动撑满（1.3.1-beta.0 改为非自动），复合搜索更换多选确认图标
- b357ee7c: `CDetail`增加 arco-affix 属性透传能力,支持修改 header 附着的元素

## 1.6.0-beta.2

### Patch Changes

- 28e90b0b: `common.CAsyncSwitch` 补充 onSubmit 错误处理

## 1.6.0-beta.1

### Minor Changes

- dffcc17c: `common.CSearch`: 复合搜索: select 不默认 active 第一个选项, 支持配置分隔符并原始数据返回, 支持配置 enableEdit 是否可编辑, 调整搜索结果排序并且支持自定义搜索 filter 函数, 模糊搜索支持配置 defualtField 自动匹配, 各项内搜索支持分隔匹配和大小写配置, 内置 select 候选项 label 省略配置, 支持传入 popover 的样式。

## 1.5.1-beta.0

### Patch Changes

- 81aafac3: 修改 TreeTransfer 展开节点设置逻辑

## 1.5.0

### Minor Changes

- e1ee9c04: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.9
  - @arco-design/web-react@2.61.1

### Patch Changes

- 3f3dd182: `CConditions: 修复展示态样式bug`
- 8202987e: `common.CForm`: 修复 CConfigProvider.config 配置语言包在 CForm 中 Input 默认 placeholder 不生效的问题
- 89522a5d: `common.CForm`: 升级@storage-fe/formily-arco 到 1.5.1， InputNumber 兼容负数情况必填校验问题，修复设置 readOnly 不生效。
- 95b61fe5: **CTable**: 行展开的 button 加上 type: 'button'属性，避免在 form 中点击后触发提交
- a466c29c: **CTableEditor**: 补充部分英文文案
- d6ac58db: 文案国际化修改
- d4afdaa7: `CForm` CArrayRemove 修复 disabled 不响应的问题
- 5cf96cf5: `CForm` 恢复 callback 类型
- c7abfffb: **CSearch** 内置 Input 组件的 Popover 增加最大高度限制
- 88d0aa6f: **CTableSelect** 修复 CTableSelect 传入的 selectable 不生效的问题
- bb45e203: **CRadio**: 按钮外层 popover 定位偏移问题修复
  **CCheckbox**: 按钮外层 popover 定位偏移问题修复

## 1.5.0-beta.5

### Patch Changes

- 8202987e: `common.CForm`: 修复 CConfigProvider.config 配置语言包在 CForm 中 Input 默认 placeholder 不生效的问题
- d4afdaa7: `CForm` CArrayRemove 修复 disabled 不响应的问题

## 1.5.0-beta.4

### Patch Changes

- bb45e203: **CRadio**: 按钮外层 popover 定位偏移问题修复
  **CCheckbox**: 按钮外层 popover 定位偏移问题修复

## 1.5.0-beta.3

### Patch Changes

- a466c29c: **CTableEditor**: 补充部分英文文案
- d6ac58db: 文案国际化修改
- 5cf96cf5: `CForm` 恢复 callback 类型
- c7abfffb: **CSearch** 内置 Input 组件的 Popover 增加最大高度限制

## 1.5.0-beta.2

### Patch Changes

- 3f3dd182: `CConditions: 修复展示态样式bug`

## 1.5.0-beta.1

### Minor Changes

- e1ee9c04: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.9
  - @arco-design/web-react@2.61.1

### Patch Changes

- 95b61fe5: **CTable**: 行展开的 button 加上 type: 'button'属性，避免在 form 中点击后触发提交
- 88d0aa6f: **CTableSelect** 修复 CTableSelect 传入的 selectable 不生效的问题

## 1.4.1-beta.0

### Patch Changes

- 89522a5d: `common.CForm`: 升级@storage-fe/formily-arco 到 1.5.1， InputNumber 兼容负数情况必填校验问题，修复设置 readOnly 不生效。

## 1.4.0

### Minor Changes

- 85f82dc9: CInfoSection 支持 CConfigProvider 配置

### Patch Changes

- 6121e631: **CFeeCalculator**: 修改具有描述信息的样式（margin-left）
- c6f94b4d: `common.CSearch` 复合搜索支持键盘操作、搜索结果展示条数自定义、搜索默认筛选条件、搜索结果高亮、逗号分隔匹配等功能。
- 80dcdba2: `common.CSearch`: 增加级联搜索受控和自动宽度示例；高级搜索支持 onCollapseVisibleChange，折叠部分显隐切换时回调
- e480c295: common.CSearch: 支持简单搜索、级联搜索、复合搜索的宽度自适应
- a8b2967b: `CPopoverVerify`、`CPopoverVerifyFormItem` 新增 `validateOnRulesChange`，在`rules`改变时主动触发校验。
- e4ef0ab6: `common.CSearch`: 修复简单搜索不支持自定义组件
- 5bb468c2: common.CSearch: 复合搜索修复未配置 fuzzy 而配置了 defaultField 时，有 active 项时 defaultfield 不生效的问题；修复受控模式下传入 value 有 undefined 项时自动触发 onChange。
- 6a9b9c4d: [CTable] 优化: 数据请求取消触发 error 时,table 的 loading 不消失也不进入 error 状态
- b3765077: CInfoSection: 过滤掉不支持的 children
- 4b0a8e3e: `CModal.Form` 修复 footer field text-align 问题
- 86e37513: `CNameinfo` 修复 name color 样式对传入 suffix 的影响
- 22489fd3: `CForm` 支持国际化配置
- 75973985: [CTable] 解决 selectable、expandable 在第一次渲染后再更新时，无法触发对应 ui 的更新的问题
- 5bd4ea48: `CStatus` 新增最大宽度 maxWidth API,默认值 160px (for 国际化)
- cbb43f12: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.6
  - @arco-design/theme-volcengine-ui-v3@0.1.1
  - @arco-design/web-react@2.60.3

## 1.4.0-beta.7

### Patch Changes

- e480c295: common.CSearch: 支持简单搜索、级联搜索、复合搜索的宽度自适应

## 1.4.0-beta.6

### Patch Changes

- 6121e631: **CFeeCalculator**: 修改具有描述信息的样式（margin-left）

## 1.4.0-beta.5

### Patch Changes

- c6f94b4d: `common.CSearch` 复合搜索支持键盘操作、搜索结果展示条数自定义、搜索默认筛选条件、搜索结果高亮、逗号分隔匹配等功能。

## 1.4.0-beta.4

### Patch Changes

- 4b0a8e3e: `CModal.Form` 修复 footer field text-align 问题
- 5bd4ea48: `CStatus` 新增最大宽度 maxWidth API,默认值 160px (for 国际化)

## 1.4.0-beta.3

### Patch Changes

- a8b2967b: `CPopoverVerify`、`CPopoverVerifyFormItem` 新增 `validateOnRulesChange`，在`rules`改变时主动触发校验。

## 1.4.0-beta.2

### Patch Changes

- e4ef0ab6: `common.CSearch`: 修复简单搜索不支持自定义组件
- b3765077: CInfoSection: 过滤掉不支持的 children
- 22489fd3: `CForm` 支持国际化配置

## 1.4.0-beta.1

### Minor Changes

- 85f82dc9: CInfoSection 支持 CConfigProvider 配置

### Patch Changes

- 86e37513: `CNameinfo` 修复 name color 样式对传入 suffix 的影响
- cbb43f12: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.6
  - @arco-design/theme-volcengine-ui-v3@0.1.1
  - @arco-design/web-react@2.60.3

## 1.3.1-beta.0

### Patch Changes

- 80dcdba2: `common.CSearch`: 增加级联搜索受控和自动宽度示例；高级搜索支持 onCollapseVisibleChange，折叠部分显隐切换时回调

## 1.3.0

### Minor Changes

- 9f02403e: **CConfigProvider** 全局修改部分组件(Select Pagination Modal)的 icon 为源力 icon，生效规则为最近的 context 为 CConfigProvider，而不是 ConfigProvider。
- a5f5cded: Updated dependencies
  - @arco-design/web-react@2.60.0
- 652a383a: Updated dependencies

  - formily-arco 1.3.0 -> 1.4.0，升级 peer formily 依赖为>=2.3.1

- e377608d: Updated dependencies
  formily 2.2.19 -> 2.3.1 https://github.com/alibaba/formily/releases

  - "@formily/core": "2.3.1",
  - "@formily/grid": "2.3.1",
  - "@formily/react": "2.3.1",
  - "@formily/reactive": "2.3.1",
  - "@formily/shared": "2.3.1",
  - "@formily/validator": "2.3.1",
  - "@storage-fe/formily-arco": "1.3.0"

### Patch Changes

- 10af89ed: `CForm` 1.ArrayRemove 按钮默认 hover 不变颜色 2. formstep 新增自动根据步骤来隐藏上一步/下一步/提交功能 3. 数组校验空数组错误
- 14e89f5d: CTreeTransfer 增加 remoteExpand 模式
- 08b6039b: **CCollapse** 计算过程中设置高度为 0，避免闪烁过程
- 45322e6c: **CInfoSection** 修复详情页编辑内容时，输入框不可撑高，导致内容重叠
- 2c8626db: **CForm** 修复 AdditionButton 高度溢出时的样式问题
- 2a1f59bb: **CDrawer** 修复 onOk 返回 Promise 未自动 loading 的问题

## 1.3.0-beta.6

### Patch Changes

- 08b6039b: **CCollapse** 计算过程中设置高度为 0，避免闪烁过程

## 1.3.0-beta.5

### Patch Changes

- 14e89f5d: CTreeTransfer 增加 remoteExpand 模式

## 1.3.0-beta.4

### Patch Changes

- 45322e6c: **CInfoSection** 修复详情页编辑内容时，输入框不可撑高，导致内容重叠
- 2a1f59bb: **CDrawer** 修复 onOk 返回 Promise 未自动 loading 的问题

## 1.3.0-beta.3

### Patch Changes

- 10af89ed: `CForm` 1.ArrayRemove 按钮默认 hover 不变颜色 2. formstep 新增自动根据步骤来隐藏上一步/下一步/提交功能 3. 数组校验空数组错误

## 1.3.0-beta.2

### Minor Changes

- 9f02403e: **CConfigProvider** 全局修改部分组件(Select Pagination Modal)的 icon 为源力 icon，生效规则为最近的 context 为 CConfigProvider，而不是 ConfigProvider。
- 652a383a: Updated dependencies

  - formily-arco 1.3.0 -> 1.4.0，升级 peer formily 依赖为>=2.3.1

### Patch Changes

- 2c8626db: **CForm** 修复 AdditionButton 高度溢出时的样式问题

## 1.3.0-beta.1

### Minor Changes

- a5f5cded: Updated dependencies
  - @arco-design/web-react@2.60.0

## 1.3.0-beta.0

### Minor Changes

- e377608d: Updated dependencies
  formily 2.2.19 -> 2.3.1 https://github.com/alibaba/formily/releases

  - "@formily/core": "2.3.1",
  - "@formily/grid": "2.3.1",
  - "@formily/react": "2.3.1",
  - "@formily/reactive": "2.3.1",
  - "@formily/shared": "2.3.1",
  - "@formily/validator": "2.3.1",
  - "@storage-fe/formily-arco": "1.3.0"

## 1.2.1

### Patch Changes

- 02a5a7ec: **CDrawerSelect** 支持配置 disabled 属性
- 64faa21e: **Drawer**修复关闭 drawer 后调用 update 会弹出的问题
- 81383772: CRadio: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。
  CCheckbox: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。
- 0704be3c: `common.COperationMenu: 修复点击 popconfirm 导致下拉菜单关闭`
- 50eaf284: CTable：修复使用 forwardRef 组件无法渲染问题，如 CAsyncSwitch

## 1.2.1-beta.3

### Patch Changes

- 64faa21e: **Drawer**修复关闭 drawer 后调用 update 会弹出的问题

## 1.2.1-beta.2

### Patch Changes

- 02a5a7ec: **CDrawerSelect** 支持配置 disabled 属性
- 0704be3c: `common.COperationMenu: 修复点击 popconfirm 导致下拉菜单关闭`

## 1.2.1-beta.1

### Patch Changes

- 81383772: CRadio: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。
  CCheckbox: 1. 支持传入函数式 children。2. 兼容处理 arco 在 2.59.0 版本中关于 Popover 的新特性：组件内容为空时不显示弹出框。

## 1.2.1-beta.0

### Patch Changes

- 50eaf284: CTable：修复使用 forwardRef 组件无法渲染问题，如 CAsyncSwitch

## 1.2.0

### Minor Changes

- 4584e9a6: Updated dependencies
  - @arco-design/web-react@2.59.1
  - @arco-design/theme-volcengine-ui-v3@0.1.0
- 951868d9: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.5

### Patch Changes

- 903b9567: `CForm` 修复 EffectError 类型报错定位问题
- d6ed740a: `common.CSearch`: 复合搜索支持`搜索条件`和`搜索触发器`同一行展示，并支持搜索条件子项点击行内修改
- eb482de0: 修改加载更多按钮展示时机，当无子节点&hasMore 为 true 时展示加载按钮
- bd2feedc: **CForm**: 表单锚点在有 popover 弹出时，无法固定的问题
- 370c62e8: `common.CForm`: footer 内置 cancel 按钮传入自定义 onClick 时，原有二次确认不会执行
- 23bdc15d: **CTable**: 修复 hover 到行上没有展示编辑和复制 icon 的问题
- 5556b000: **CTable**: 修复开启行选择时，底部"已选中 x 条"和左右的间距问题
- 13ff06ee: **CModal** 修复 hideCancel 不生效的问题
- 94974aa8: **CForm**: 异步下拉组件 CAsyncSelect 的 fetchData 和 fetchInitData 函数中透传 field 属性
- 20c3dfd2: **CRadio**: 支持悬浮展示 Popover
  **CCheckbox**: 支持悬浮展示 Popover
- 51718ca4: CTableTransfer：表格展示场景不需要有勾选高亮动画

## 1.2.0-beta.7

### Patch Changes

- 20c3dfd2: **CRadio**: 支持悬浮展示 Popover
  **CCheckbox**: 支持悬浮展示 Popover

## 1.2.0-beta.6

### Patch Changes

- d6ed740a: `common.CSearch`: 复合搜索支持`搜索条件`和`搜索触发器`同一行展示，并支持搜索条件子项点击行内修改
- eb482de0: 修改加载更多按钮展示时机，当无子节点&hasMore 为 true 时展示加载按钮

## 1.2.0-beta.5

### Patch Changes

- bd2feedc: **CForm**: 表单锚点在有 popover 弹出时，无法固定的问题

## 1.2.0-beta.4

### Patch Changes

- 903b9567: `CForm` 修复 EffectError 类型报错定位问题
- 13ff06ee: **CModal** 修复 hideCancel 不生效的问题

## 1.2.0-beta.3

### Patch Changes

- 51718ca4: CTableTransfer：表格展示场景不需要有勾选高亮动画

## 1.2.0-beta.2

### Minor Changes

- 4584e9a6: Updated dependencies
  - @arco-design/web-react@2.59.1
  - @arco-design/theme-volcengine-ui-v3@0.1.0
- 951868d9: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.5

## 2.0.0-beta.1

### Major Changes

- 951868d9: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@1.0.5

### Minor Changes

- 4584e9a6: Updated dependencies
  - @arco-design/web-react@2.59.1
  - @arco-design/theme-volcengine-ui-v3@0.1.0

## 1.1.1-beta.0

### Patch Changes

- 370c62e8: `common.CForm`: footer 内置 cancel 按钮传入自定义 onClick 时，原有二次确认不会执行
- 23bdc15d: **CTable**: 修复 hover 到行上没有展示编辑和复制 icon 的问题
- 5556b000: **CTable**: 修复开启行选择时，底部"已选中 x 条"和左右的间距问题

## 1.1.0

### Minor Changes

- 664e8897: `CConfigProvider` 支持传入 storage 实例,响应 web storage key 前缀治理
- 78318781: CTable: 增加竞态问题解决方案，用户可按需开启
- c73c070d: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.63
  - @arco-design/theme-volcengine-ui-v3@0.1.0
  - @arco-design/web-react@2.58.3
- 73d7121d: Updated dependencies
  - @arco-design/web-react@2.59.0

### Patch Changes

- 1ab3930b: `common.CForm` ArrayTable 支持行缓存
- 541a6dfd: **CSeach**: 复合搜索 extraLeft 和 extraRight 支持传入 COperationMenuProps 配置。 搜索项为 custom 时支持配置 Popover 的 style。
- f7fe5aa3: **CSeach**: 复合搜索 fuzzyConfig 支持同时写 filterUserInput 和其他配置，支持传入 trigger 更改触发方式
- f7fe5aa3: **CSeach**: 复合搜索修复已输入值非数组的情况下切换到标签组件下引起错误的问题，高级搜索修复内置组件配置 onChange 未生效的问题
- 2e2c4ff8: **CForm** 内置组件 CTableSelect 和 PreSelectedTable 支持透传 disabled，禁用表格内操作
- 478b41f3: `CSideBar` 修复隐藏的菜单在收起后依然展示的问题
- 260c6ce6: **CForm**: 🐛CForm 内置组件 CAsyncSelect 依赖收集随依赖改变次数叠加。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）
  **CForm**: 🐛CForm 内置组件 CAsyncSelect，收集的引用类型无法触发更新。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）
- a2bb1589: `common.CCodeBlock: 空态样式处理`
- 20a17f86: `CStatus 修复大尺寸下icon偏下 & 颜色属性传递到了span导致浏览器warning`
- 7f8dcb70: `CStatus`fix statusMap 传入 icon 没有生效
- 98fb6ae3: `CStatus`normal 状态下,应该去掉 padding,便于更多场景的对齐

## 1.1.0-beta.6

### Patch Changes

- 7f8dcb70: `CStatus`fix statusMap 传入 icon 没有生效
- 98fb6ae3: `CStatus`normal 状态下,应该去掉 padding,便于更多场景的对齐

## 1.1.0-beta.5

### Patch Changes

- 260c6ce6: **CForm**: 🐛CForm 内置组件 CAsyncSelect 依赖收集随依赖改变次数叠加。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）
  **CForm**: 🐛CForm 内置组件 CAsyncSelect，收集的引用类型无法触发更新。（修复依赖收集组件 ReactiveWithCForm 依赖收集组件）

## 1.1.0-beta.4

### Minor Changes

- 78318781: CTable: 增加竞态问题解决方案，用户可按需开启

## 1.1.0-beta.3

### Minor Changes

- 664e8897: `CConfigProvider` 支持传入 storage 实例,响应 web storage key 前缀治理

### Patch Changes

- 541a6dfd: **CSeach**: 复合搜索 extraLeft 和 extraRight 支持传入 COperationMenuProps 配置。 搜索项为 custom 时支持配置 Popover 的 style。
- 478b41f3: `CSideBar` 修复隐藏的菜单在收起后依然展示的问题
- a2bb1589: `common.CCodeBlock: 空态样式处理`
- 20a17f86: `CStatus 修复大尺寸下icon偏下 & 颜色属性传递到了span导致浏览器warning`

## 1.1.0-beta.2

### Minor Changes

- 73d7121d: Updated dependencies
  - @arco-design/web-react@2.59.0

## 1.1.0-beta.1

### Patch Changes

- 1ab3930b: `common.CForm` ArrayTable 支持行缓存
- 2e2c4ff8: **CForm** 内置组件 CTableSelect 和 PreSelectedTable 支持透传 disabled，禁用表格内操作

## 1.1.0-beta.0

### Minor Changes

- c73c070d: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.63
  - @arco-design/theme-volcengine-ui-v3@0.1.0
  - @arco-design/web-react@2.58.3

### Patch Changes

- f7fe5aa3: **CSeach**: 复合搜索 fuzzyConfig 支持同时写 filterUserInput 和其他配置，支持传入 trigger 更改触发方式
- f7fe5aa3: **CSeach**: 复合搜索修复已输入值非数组的情况下切换到标签组件下引起错误的问题，高级搜索修复内置组件配置 onChange 未生效的问题

## 1.0.1

### Patch Changes

- 0d743bce: `CForm` 修复默认必填校验文案和自定义校验优先级问题
- e51b3880: **CAsyncSelect**: noMore 的正确使用姿势注释、增加 isControlStateChange 参数处理某些需求下的受控处理
- 6596c030: **CForm**: 动态字段装饰器 DynamicFieldDecorator 支持不清空所有子字段，keepFields 为 true 时，只卸载不在新子字段中的字段
- 90040cff: `CSidebar` 支持 extraCtrl 用于配置底部控制器旁边的内容
- ea11bddb: `CSideBar` 支持通过 CConfigProvider 配置 props
- cf3ae1f5: **CAgreement**: 扩大 Checkbox 可点击范围
- 49e83a9e: **CForm**: 处理异步下拉组件初始值，被依赖字段清空的问题
- 2a669e9d: **CForm**: reactiveWithCForm 依赖收集问题，依赖收集值的赋值方式 BUG
- 998f0962: **CBatchPasteInput**: 新增 onSplit 属性，发生切割时回调用该函数。当 粘贴 或 输入的字符中包含分割符 时，会触发 onSplit 事件。

## 1.0.1-beta.6

### Patch Changes

- 2a669e9d: **CForm**: reactiveWithCForm 依赖收集问题，依赖收集值的赋值方式 BUG

## 1.0.1-beta.5

### Patch Changes

- 0d743bce: `CForm` 修复默认必填校验文案和自定义校验优先级问题

## 1.0.1-beta.4

### Patch Changes

- 49e83a9e: **CForm**: 处理异步下拉组件初始值，被依赖字段清空的问题

## 1.0.1-beta.3

### Patch Changes

- 90040cff: `CSidebar` 支持 extraCtrl 用于配置底部控制器旁边的内容
- ea11bddb: `CSideBar` 支持通过 CConfigProvider 配置 props

## 1.0.1-beta.2

### Patch Changes

- 998f0962: **CBatchPasteInput**: 新增 onSplit 属性，发生切割时回调用该函数。当 粘贴 或 输入的字符中包含分割符 时，会触发 onSplit 事件。

## 1.0.1-beta.1

### Patch Changes

- e51b3880: **CAsyncSelect**: noMore 的正确使用姿势注释、增加 isControlStateChange 参数处理某些需求下的受控处理
- 6596c030: **CForm**: 动态字段装饰器 DynamicFieldDecorator 支持不清空所有子字段，keepFields 为 true 时，只卸载不在新子字段中的字段

## 1.0.1-beta.0

### Patch Changes

- cf3ae1f5: **CAgreement**: 扩大 Checkbox 可点击范围

## 1.0.0

### Major Changes

- f30ee00e: CloudToB 云基础统一物料库 **v1** 正式版本发布！
  - 已实现高质量通用业务组件 40+，覆盖创建、列表、详情等云基础三大典型页面
  - 提供了更适用于复杂表单、表格的组件方案，包括：`CForm`、`CTable`、`CTableEditor`等
  - 适配源力设计规范、火山 v3 主题
  - 配套提供可拓展的组件迁移工具

### Minor Changes

- c8f83502: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.35
  - @arco-design/web-react@2.57.2

### Patch Changes

- 6c45e089: `CForm` 升级 formily-arco 修复 ArrayTable 错误定位问题
- 63399296: `CForm` validator 支持不调用 callback
- a9eedd50: CTable extraConfig 新增 formatSelectedCount 配置，支持自定义选中个数文本
- 31b9e900: TreeTransfer 增加选中策略参数，其值与 arco tree 一致
- eaca4e24: **CForm**: 支持 registerValidateMessageTemplateEngine 注册自定义校验模板
- 832e2c59: **CAsyncSwitch**: 增加\_\_BYTE_SWITCH 标识，与 arco switch 保持同样的对 disabled 的处理逻辑
- 7ef8a13c: **CTable**: 修复开启了 syncWithUrlQuery 后，过滤、排序没有更新 url query 中的 currentPage 的问题
- 40de8d74: **CAsyncSelect**: 在开启 labelInValue 特性时，传入 value 初始值组件报错
- fa1cfc87: **CFeeCalculator**: 多个计费项渲染时缺少 unique key 配置；总价的字体样式加粗为 500
- 14ca3412: **CForm**: 优化默认装饰器，避免渲染空节点
- 0db43ae2: 在 CDetailPage 使用 InfoSection 时支持动态配置 hidden、visible 属性

## 0.16.0-beta.5

### Patch Changes

- 63399296: `CForm` validator 支持不调用 callback
- 832e2c59: **CAsyncSwitch**: 增加\_\_BYTE_SWITCH 标识，与 arco switch 保持同样的对 disabled 的处理逻辑
- 7ef8a13c: **CTable**: 修复开启了 syncWithUrlQuery 后，过滤、排序没有更新 url query 中的 currentPage 的问题
- efdc935d: Updated dependencies
  - @arco-design/web-react@2.57.2

## 0.16.0-beta.4

### Patch Changes

- 14ca3412: **CForm**: 优化默认装饰器，避免渲染空节点

## 0.16.0-beta.3

### Patch Changes

- a9eedd50: CTable extraConfig 新增 formatSelectedCount 配置，支持自定义选中个数文本
- 40de8d74: **CAsyncSelect**: 在开启 labelInValue 特性时，传入 value 初始值组件报错

## 0.16.0-beta.2

### Patch Changes

- 6c45e089: `CForm` 升级 formily-arco 修复 ArrayTable 错误定位问题

## 0.16.0-beta.1

### Patch Changes

- 31b9e900: TreeTransfer 增加选中策略参数，其值与 arco tree 一致
- fa1cfc87: **CFeeCalculator**: 多个计费项渲染时缺少 unique key 配置；总价的字体样式加粗为 500

## 0.16.0-beta.0

### Minor Changes

- c8f83502: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.35
  - @arco-design/web-react@2.57.1

### Patch Changes

- eaca4e24: **CForm**: 支持 registerValidateMessageTemplateEngine 注册自定义校验模板
- 0db43ae2: 在 CDetailPage 使用 InfoSection 时支持动态配置 hidden、visible 属性

## 0.15.2

### Patch Changes

- 2112e372: 升级 arco-cli
- d4ac928d: `CForm` effects 数组支持
- 897154a9: **CAsyncSelect**: 优化刷新按钮触发范围，优化 fetchInitDta 使用体验
- fd19bd7f: **CAsyncSelect**: 优化 fetchInitDta 代码逻辑
- 8d73f55e: **CSearch**: 复合搜索支持搜索参数展示行，「清空」按钮后自定义额外内容。
- 285f3f9f: **CForm**: 动态字段装饰器 DynamicFieldDecorator 卸载动态字段下所有子字段，并使用 reactiveWithCForm 收集依赖
- ab5756a1: **CTable**: 解决 selectedRowData 类型变为 Proxy 的问题
- e6c1e01b: **CForm**: 异步下拉组件 CAsyncSelect 使用 reactiveWithCForm 收集依赖
- 3e62cd9b: **CForm**: 新增 ReactiveHocParams 和 ReactiveHocProps 类型
- 5f64ddca: **CFeeCalculator**: 计算中状态和总价显示状态切换时，计费项会上下跳动下，修改对齐问题
- 37119c5b: **CFeeCalculator**: PriceInfo 中新增 description 属性，用于展示额外的信息
- 862c485e: **CRadio**: 修复 CRadio 在布局类型为 radio 时的样式
- 04fc7e66: `CLog: 新增 CLog 组件`
- 7a539462: `CListEditor`修复 brakechange popoverVerify 默认 true，popover 生效条件从 rule 修改为 popoverVerify
- 4306579a: Updated dependencies
  - @arco-design/web-react@2.56.2
- b36d1cd0: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.59

## 0.15.2-beta.7

### Patch Changes

- 285f3f9f: **CForm**: 动态字段装饰器 DynamicFieldDecorator 卸载动态字段下所有子字段，并使用 reactiveWithCForm 收集依赖
- 04fc7e66: `CLog: 新增 CLog 组件`
- 7a539462: `CListEditor`修复 brakechange popoverVerify 默认 true，popover 生效条件从 rule 修改为 popoverVerify

## 0.15.2-beta.6

### Patch Changes

- 862c485e: **CRadio**: 修复 CRadio 在布局类型为 radio 时的样式

## 0.15.2-beta.5

### Patch Changes

- 8d73f55e: **CSearch**: 复合搜索支持搜索参数展示行，「清空」按钮后自定义额外内容。

## 0.15.2-beta.4

### Patch Changes

- 3e62cd9b: **CForm**: 新增 ReactiveHocParams 和 ReactiveHocProps 类型
- 37119c5b: **CFeeCalculator**: PriceInfo 中新增 description 属性，用于展示额外的信息

## 0.15.2-beta.3

### Patch Changes

- d4ac928d: `CForm` effects 数组支持
- e6c1e01b: **CForm**: 异步下拉组件 CAsyncSelect 使用 reactiveWithCForm 收集依赖
- 4306579a: Updated dependencies
  - @arco-design/web-react@2.56.2
- b36d1cd0: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.59

## 0.15.2-beta.2

### Patch Changes

- 2112e372: 升级 arco-cli

## 0.15.2-beta.1

### Patch Changes

- fd19bd7f: **CAsyncSelect**: 优化 fetchInitDta 代码逻辑

## 0.15.2-beta.0

### Patch Changes

- 897154a9: **CAsyncSelect**: 优化刷新按钮触发范围，优化 fetchInitDta 使用体验

## 0.15.1

### Patch Changes

- 743b34cf: **CTable**: 解决 selectedRowData 类型变为 Proxy 的问题

## 0.15.1-beta.0

### Patch Changes

- ab5756a1: **CTable**: 解决 selectedRowData 类型变为 Proxy 的问题
- 5f64ddca: **CFeeCalculator**: 计算中状态和总价显示状态切换时，计费项会上下跳动下，修改对齐问题

## 0.15.0

### Minor Changes

- f91be8cc: `CConfigProvider`支持 cComponentsConfig 对部分云组件进行默认 props 配置
- c155f05c: Updated dependencies
  - @arco-design/web-react@2.56.0

### Patch Changes

- e433d7d6: `CForm` 升级 storage-formily 支持 ArrayTable 报错定位 & 新增分页问题修复
- decfde22: `CForm` 修复 ArrayTable Colunm 显隐问题
- 07cbb804: **CAsyncSelect**: empty 状态也支持 dropdownRender。
- bf802c09: `CFeeType`支持 customChargeLabel 配置自定义计费类型
- 9af1afa9: **CCombineSearch**: 添加默认查询字段
- 95812e21: **CCombineSearch**: 添加多 key 匹配
  **CSearch**: 支持 AutoComplete
  **CSimpleSearch**: 支持 AutoComplete 及用户输入值格式化
- e5934be0: **CInlineEdit**: 支持 EditIcon 自定义 Tooltip
- a4a1b6a9: **CTable**: 修复表格刷新后，已选择的行的数据可能没有更新的问题
- e80989e7: **CTable**: 修复自定义列弹窗模式下，通过领域模型 api 直接修改 column 的 visible 状态后，打开弹窗没有更新列勾选状态的问题
- c1e7b9f6: **CTableEditor**: 优化性能。并解决受控模式下，在 onFormValuesChange 中使用 setTimeout 可能会导致内部的 ObjectField 被删除的问题
- e1f69574: 修复 tree transfer 搜索后选择问题:
  - 全选状态设置不正确
  - 去掉全选状态时会导致其他节点的选中状态改变
- a77b179e: `CListEditor`新增规则 validator 传入组件内其他值&修改 API cPopoverVerifyProps -> popoverVerify 优化默认不使用弹出式校验.满足更多业务场景
- 7140cf1c: `CListEditor`onEditingDisableVerify 新增透传属性至 Form.Item 和组件,满足级联控制场景,详见 editingDisabledVerify-demo5
- 41f9365c: **CModal** 修复 openXXX 通用设置未生效的问题
- 7b5ebae1: **CDetail** 调整 zindex 到火山规范内
- be5855ea: **CAgreement**: link 设置为可选属性，允许用户不传入任何的协议
- 72ae1188: **CFeeCalculator**: 设置 InputNumber 的精度为 0，不允许用户输入小数。
- dec43e78: **CAgreement**: 补充协议组件在 CForm 的 FormItem 装饰器下的使用场景
- ab379c99: **CEllipsis**: 修复隐藏 Popover 由于 style 被覆盖未生效的问题
- 0e34e8db: `CCodeBlock: 添加 loading 和 空态`
- 3efb5a72: `COperationMenu: menuItem Popconfirm/Popover 作用范围调整`
- 9342bea2: `CForm` 修复 ArrayTable 新增分页问题 & 退出表单二次 check 新增自定义相等判断和排除字段
- 2d09c84a: feat(common.CDetail): onBack 不必选
- bf49280c: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.34
- b2eef6df: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.57

## 0.15.0-beta.8

### Patch Changes

- 95812e21: **CCombineSearch**: 添加多 key 匹配
  **CSearch**: 支持 AutoComplete

## 0.15.0-beta.7

### Patch Changes

- 9342bea2: `CForm` 修复 ArrayTable 新增分页问题 & 退出表单二次 check 新增自定义相等判断和排除字段

## 0.15.0-beta.6

### Patch Changes

- be5855ea: **CAgreement**: link 设置为可选属性，允许用户不传入任何的协议

## 0.15.0-beta.5

### Patch Changes

- dec43e78: **CAgreement**: 补充协议组件在 CForm 的 FormItem 装饰器下的使用场景
- 0e34e8db: `CCodeBlock: 添加 loading 和 空态`

## 0.15.0-beta.4

### Patch Changes

- decfde22: `CForm` 修复 ArrayTable Colunm 显隐问题

## 0.15.0-beta.3

### Minor Changes

- c155f05c: Updated dependencies
  - @arco-design/web-react@2.56.0

### Patch Changes

- 07cbb804: **CAsyncSelect**: empty 状态也支持 dropdownRender。
- e80989e7: **CTable**: 修复自定义列弹窗模式下，通过领域模型 api 直接修改 column 的 visible 状态后，打开弹窗没有更新列勾选状态的问题
- a77b179e: `CListEditor`新增规则 validator 传入组件内其他值&修改 API cPopoverVerifyProps -> popoverVerify 优化默认不使用弹出式校验.满足更多业务场景
- 7140cf1c: `CListEditor`onEditingDisableVerify 新增透传属性至 Form.Item 和组件,满足级联控制场景,详见 editingDisabledVerify-demo5
- 3efb5a72: `COperationMenu: menuItem Popconfirm/Popover 作用范围调整`
- bf49280c: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.34
- b2eef6df: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.57

## 0.15.0-beta.2

### Patch Changes

- bf802c09: `CFeeType`支持 customChargeLabel 配置自定义计费类型
- 9af1afa9: **CCombineSearch**: 添加默认查询字段
- 41f9365c: **CModal** 修复 openXXX 通用设置未生效的问题

## 0.15.0-beta.1

### Patch Changes

- e433d7d6: `CForm` 升级 storage-formily 支持 ArrayTable 报错定位 & 新增分页问题修复
- a4a1b6a9: **CTable**: 修复表格刷新后，已选择的行的数据可能没有更新的问题
- c1e7b9f6: **CTableEditor**: 优化性能。并解决受控模式下，在 onFormValuesChange 中使用 setTimeout 可能会导致内部的 ObjectField 被删除的问题
- e1f69574: 修复 tree transfer 搜索后选择问题:
  - 全选状态设置不正确
  - 去掉全选状态时会导致其他节点的选中状态改变
- 7b5ebae1: **CDetail** 调整 zindex 到火山规范内
- 72ae1188: **CFeeCalculator**: 设置 InputNumber 的精度为 0，不允许用户输入小数。

## 0.15.0-beta.0

### Minor Changes

- f91be8cc: `CConfigProvider`支持 cComponentsConfig 对部分云组件进行默认 props 配置

### Patch Changes

- e5934be0: **CInlineEdit**: 支持 EditIcon 自定义 Tooltip
- ab379c99: **CEllipsis**: 修复隐藏 Popover 由于 style 被覆盖未生效的问题
- 2d09c84a: feat(common.CDetail): onBack 不必选

## 0.14.1

### Patch Changes

- b2f1f14e: **CDetail** 调整 zindex 到火山规范内

## 0.14.0

### Minor Changes

- 2338c125: Updated dependencies
  - @arco-design/web-react@2.55.0

### Patch Changes

- 1c7ff888: `CDrawer.Detail` 修复 title 未对齐的问题
- 39281135: CTable: 批量导出表格内容的场景规范
- ce252222: CTable：支持 byteplus 环境下 table 字体大小为 14px
- 0194baaa: **CInfoSection**: noMargin 支持全局配置
- 9ce8f2c5: **CTableEditor**: 修复本地模式下，搜索后导致改动丢失的问题
- 5f56094a: `CListEditor` 修复 onEditingDisableVerify 在 form 传初始值时不生效问题
- 32f59f95: `CNameInfo`支持只展示 name 或者 id
- 846284ea: `CModal(CDrawer).Form`修复 footer 传入 undefined 时 onOk 回调参数错误的问题
- e9b1be27: `CSideBar` 修复在收起菜单后,鼠标移到 Popover 组件上闪烁的问题
- f9e9ff5f: **CSidebar** 与火山规范对齐, 调整其 z-index 为 900 - 1
- d116e3bf: **CFeeCalculator**: 新增 `enableCharge` 属性，支持关闭计费的能力。
- 839fe352: **CConfigPreview**: 补充组件类型导出
- 6e326370: **CEllipsis**: 适配 CNameInfo 部分场景 popover 无法显示的问题
- 6f2f000e: **CEllipsis**: 去除 hover 展示 popupVisible 的内部逻辑
- 2f7070d1: 1. CDetailPage 修复在设置默认 tabkey 值时未对 tab 的可见性做过滤问题
  2. CDetailPage 修复第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面问题
- c31dd498: CTable： 新增 setTitle 函数
- 7e9604a1: **CEllipsis**:修改文本溢出计算方式
- fef4f8a1: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.56
- 454b27c0: Updated dependencies
  - @arco-design/web-react@2.55.1
- b674da45: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.33

## 0.14.0-beta.11

### Patch Changes

- f9e9ff5f: **CSidebar** 与火山规范对齐, 调整其 z-index 为 900 - 1

## 0.14.0-beta.10

### Patch Changes

- 846284ea: `CModal(CDrawer).Form`修复 footer 传入 undefined 时 onOk 回调参数错误的问题
- d116e3bf: **CFeeCalculator**: 新增 `enableCharge` 属性，支持关闭计费的能力。
- 2f7070d1: 1. CDetailPage 修复在设置默认 tabkey 值时未对 tab 的可见性做过滤问题
  2. CDetailPage 修复第一次进入页面后再点击浏览器回退按钮，需要点击两次才可回退到之前的页面问题

## 0.14.0-beta.9

### Patch Changes

- e9b1be27: `CSideBar` 修复在收起菜单后,鼠标移到 Popover 组件上闪烁的问题
- 6f2f000e: **CEllipsis**: 去除 hover 展示 popupVisible 的内部逻辑

## 0.14.0-beta.8

### Patch Changes

- 1c7ff888: `CDrawer.Detail` 修复 title 未对齐的问题

## 0.14.0-beta.7

### Patch Changes

- c31dd498: CTable： 新增 setTitle 函数

## 0.14.0-beta.6

### Patch Changes

- 6e326370: **CEllipsis**: 适配 CNameInfo 部分场景 popover 无法显示的问题
- 454b27c0: Updated dependencies
  - @arco-design/web-react@2.55.1
- b674da45: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.33

## 0.14.0-beta.5

### Patch Changes

- 0194baaa: **CInfoSection**: noMargin 支持全局配置
- fef4f8a1: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.56

## 0.14.0-beta.4

### Patch Changes

- 9ce8f2c5: **CTableEditor**: 修复本地模式下，搜索后导致改动丢失的问题

## 0.14.0-beta.3

### Patch Changes

- ce252222: CTable：支持 byteplus 环境下 table 字体大小为 14px
- 839fe352: **CConfigPreview**: 补充组件类型导出

## 0.14.0-beta.2

### Patch Changes

- 5f56094a: `CListEditor` 修复 onEditingDisableVerify 在 form 传初始值时不生效问题
- 32f59f95: `CNameInfo`支持只展示 name 或者 id

## 0.14.0-beta.1

### Patch Changes

- 7e9604a1: **CEllipsis**:修改文本溢出计算方式

## 0.14.0-beta.0

### Minor Changes

- 2338c125: Updated dependencies
  - @arco-design/web-react@2.55.0

## 0.13.1

### Patch Changes

- 1bc6498e: `CAsyncSelect`解决接口返回无数据导致 allowCreate 失效的问题
- 2c1b23a5: `CSearch` 支持 useCustom 的用法
- 6261408d: **CEllipsis**: 容器增加过长溢出，避免遮挡兄弟元素;兼容极端场景 Tooltip 消失的场景
- f798366e: `CListEditor`删除 item 时触发 onEditingDisableVerify
- 6037d854: **CFeeCalculator**: 修复 在退费场景且用户未配置价格区块的 title 时，会导致组件崩溃 的 BUG
- 62f425f9: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.32

## 0.13.1-beta.3

### Patch Changes

- 6037d854: **CFeeCalculator**: 修复 在退费场景且用户未配置价格区块的 title 时，会导致组件崩溃 的 BUG

## 0.13.1-beta.2

### Patch Changes

- 1bc6498e: `CAsyncSelect`解决接口返回无数据导致 allowCreate 失效的问题

## 0.13.1-beta.1

### Patch Changes

- 2c1b23a5: `CSearch` 支持 useCustom 的用法
- 62f425f9: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.32

## 0.13.1-beta.0

### Patch Changes

- 6261408d: **CEllipsis**: 容器增加过长溢出，避免遮挡兄弟元素;兼容极端场景 Tooltip 消失的场景
- f798366e: `CListEditor`删除 item 时触发 onEditingDisableVerify

## 0.13.0

### Minor Changes

- c0be201b: Updated dependencies
  - @arco-design/web-react@2.54.0

### Patch Changes

- 51f80ec5: CTable: 增加下载组件弹窗导出
- 7d17d8e2: `CModal.confirm`等 api 对齐源力设计
- f8b0dc10: `CSideBar`适配替换源力 icon 的场景
- eb4191d0: CForm: 复当子元素宽度超出 flex 父元素，子元素超出部分显示问题
- 22870243: 修复 CTags 复制按钮
- c358038d: **CTable**: 修复 tableEditor 等变量传递给 div 等 html 元素，导致控制台报错的问题
- a2df2958: **CTableEditor**: 修复受控模式下，表格筛选后进行编辑，清除筛选条件后，数据丢失的问题
- 637acb2f: **CTableEditor**: 支持在表格顶部新增行
- c2a2e7a7: `CListEditor`对于存在默认值且类型为 string 的可选 props 在判断时使用??,方便传入为空字符串时生效
- 943d86bf: **CFeeType**: 修复传入 statusChangeTime 为空，仍展示下一个状态提示的问题
  **CFeeType**: 新增属性 isClosed、isReclaim 控制状态流转，组件内部不再自动流转计费状态
- 4683db9d: `CSideBar` 修复标题颜色
- e6239eee: **CBatchPasteInput**: 修复无意义的正则转义引用的 BUG
- 825c4277: **CFeeCalculator**: 扩展 `title` 属性,支持传入 `null` 隐藏标题
- 666ed2fd: **CFeeCalculator**: 原价存在 且 差价大于 0 时显示折扣价格,其余情况不展示折扣价格
- 0e19474a: **CFeeCalculator**: 新增`value`属性支持数量和时长的受控模式（修改 onChange 函数的入参为一个对象值，其中包括数量和时长）🐛 🐛 🐛 🐛
- 0888fc44: **CFeeCalculator**: 新增 `savedText` 属性,支持自定义"已省"文案
- 732c2abe: **CRadio**: 修复 CRadio 覆盖了 Arco Radio 样式的 BUG
  **CCheckbox**: 修复 CCheckbox 覆盖了 Arco Checkbox 样式的 BUG
- be8b7558: CDetailPage 修复 arcoTabsProps 传参方式支持函数式传参
- ca316362: `COperationMenu: 支持自定义Dropdown Menu Button`
- ddc35706: **CEllipsis**: 修复部分 Popover 未消失的场景
- 737779f7: Updated dependencies
  - @arco-design/web-react@2.54.1
- 5c0b8afe: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.30

## 0.13.0-beta.8

### Patch Changes

- 22870243: 修复 CTags 复制按钮
- 943d86bf: **CFeeType**: 修复传入 statusChangeTime 为空，仍展示下一个状态提示的问题
  **CFeeType**: 新增属性 isClosed、isReclaim 控制状态流转，组件内部不再自动流转计费状态
- 825c4277: **CFeeCalculator**: 扩展 `title` 属性,支持传入 `null` 隐藏标题
- 5c0b8afe: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.30

## 0.13.0-beta.7

### Patch Changes

- c358038d: **CTable**: 修复 tableEditor 等变量传递给 div 等 html 元素，导致控制台报错的问题
- 637acb2f: **CTableEditor**: 支持在表格顶部新增行
- be8b7558: CDetailPage 修复 arcoTabsProps 传参方式支持函数式传参

## 0.13.0-beta.6

### Patch Changes

- 7d17d8e2: `CModal.confirm`等 api 对齐源力设计
- e6239eee: **CBatchPasteInput**: 修复无意义的正则转义引用的 BUG
- 737779f7: Updated dependencies
  - @arco-design/web-react@2.54.1

## 0.13.0-beta.5

### Minor Changes

- c0be201b: Updated dependencies
  - @arco-design/web-react@2.54.0

### Patch Changes

- eb4191d0: CForm: 复当子元素宽度超出 flex 父元素，子元素超出部分显示问题
- c2a2e7a7: `CListEditor`对于存在默认值且类型为 string 的可选 props 在判断时使用??,方便传入为空字符串时生效
- 0888fc44: **CFeeCalculator**: 新增 `savedText` 属性,支持自定义"已省"文案

## 0.12.2-beta.4

### Patch Changes

- ca316362: `COperationMenu: 支持自定义Dropdown Menu Button`

## 0.12.2-beta.3

### Patch Changes

- 4683db9d: `CSideBar` 修复标题颜色
- 666ed2fd: **CFeeCalculator**: 原价存在 且 差价大于 0 时显示折扣价格,其余情况不展示折扣价格

## 0.12.2-beta.2

### Patch Changes

- ddc35706: **CEllipsis**: 修复部分 Popover 未消失的场景

## 0.12.2-beta.1

### Patch Changes

- f8b0dc10: `CSideBar`适配替换源力 icon 的场景
- 0e19474a: **CFeeCalculator**: 新增`value`属性支持数量和时长的受控模式（修改 onChange 函数的入参为一个对象值，其中包括数量和时长）🐛 🐛 🐛 🐛
- 732c2abe: **CRadio**: 修复 CRadio 覆盖了 Arco Radio 样式的 BUG
  **CCheckbox**: 修复 CCheckbox 覆盖了 Arco Checkbox 样式的 BUG

## 0.12.2-beta.0

### Patch Changes

- a2df2958: **CTableEditor**: 修复受控模式下，表格筛选后进行编辑，清除筛选条件后，数据丢失的问题

## 0.12.1

### Patch Changes

- 3e676546: `CForm` 暴露 FormStep 实例 & initConfig 支持默认展示步数
- a050696c: `CForm` 修复 FormItem label 宽度浮点数计算问题 & FormItem help 优先级问题
- 53a63bb4: 升级 TTP 依赖
- 1bed29bb: **CCombineSearch**: 支持参数 placeholder
- b4e530d4: **CTable**: 增加 formatter 导出
- 2e5e604d: **CTableTransfer**: rowkey 支持函数形式
- c5fbb7c4: `CForm` defineField 函数返回类型自动收窄,并支持传入多个进行合并
- f9066973: **CLoading** cResultProps 属性的 title 支持配置 loadFailed 和 retry 文案
- 0dbe386a: 修复父节点全选时的问题，需判断其子节点是否全部为全选状态
- 796fd91e: `CListEditor`支持内置组件
- 6b39f8ec: `CStatus`icon 布局样式 fix,修复块级场景下样式问题
- 84db5f55: 修复 sourcemap404 的问题
- 2f15d8b8: `CDrawer.open` 修复极端情况下退出 drawer 闪烁问题
- 8aff0f1a: **CFeeCalculator**: 支持展示价格区间,用于展示最小/最大配置的价格
- f2356a83: Updated dependencies
  - @arco-design/web-react@2.53.2

## 0.12.1-beta.3

### Patch Changes

- 53a63bb4: 升级 TTP 依赖
- 8aff0f1a: **CFeeCalculator**: 支持展示价格区间,用于展示最小/最大配置的价格

## 0.12.1-beta.2

### Patch Changes

- a050696c: `CForm` 修复 FormItem label 宽度浮点数计算问题 & FormItem help 优先级问题
- c5fbb7c4: `CForm` defineField 函数返回类型自动收窄,并支持传入多个进行合并
- f9066973: **CLoading** cResultProps 属性的 title 支持配置 loadFailed 和 retry 文案
- 0dbe386a: 修复父节点全选时的问题，需判断其子节点是否全部为全选状态
- f2356a83: Updated dependencies
  - @arco-design/web-react@2.53.2

## 0.12.1-beta.1

### Patch Changes

- 3e676546: `CForm` 暴露 FormStep 实例 & initConfig 支持默认展示步数
- 1bed29bb: **CCombineSearch**: 支持参数 placeholder
- 796fd91e: `CListEditor`支持内置组件
- 84db5f55: 修复 sourcemap404 的问题
- 2f15d8b8: `CDrawer.open` 修复极端情况下退出 drawer 闪烁问题

## 0.12.1-beta.0

### Patch Changes

- b4e530d4: **CTable**: 增加 formatter 导出
- 2e5e604d: **CTableTransfer**: rowkey 支持函数形式

## 0.12.0

### Minor Changes

- f74c9671: Updated dependencies
  - @arco-design/web-react@2.53.1

### Patch Changes

- 17c9d1d3: `CForm`
  1.fix ArrayTable 分页时新增分页器不跳转问题
  2. 优化 Array 重复校验性能
  3. 样式还原
- e01a2d61: CStatistic: 间距调整
- 5a3e0054: **CContentWrapper**: 新增自动撑满能力
  **CContentWrapper**: 修复全局配置中 prefixCls 不生效的问题
- 541d4085: ** CTable: toolbar 增加取消选择按钮 **
- df869d69: `CTable` cell 和 row 的 data-cy 不应该加入 rowKey 信息
- 4ef3f67a: `CModal` 支持 CModal.FormStep
- 8b537568: **CCodeBlock**: 修复空格等无法格式化的问题
  **COperationMenu**: 配置弹出菜单自动跟随
- d3c9ee53: `CForm`: 修复内置组件 arcoTableProps 传入函数时，未把值 onChange 给 CForm 的问题
  `CForm`: 不再支持 PreselectedTable 的 rowKeb 传入函数,原因: rowKey 传入函数时,value 不能通过 value[rowKey]判断是否选中改行

  `CAddButton`: 修复 CAddButton dashed 样式 disabled 时不触发 hover 的问题

- ce449f65: **CTable**: 表格 loading 样式调整：1. 尺寸改为 48px 2. 固定距离表格顶部 48px
- 47e13ee0: **CTable**: 轮询功能修改：1. 上一次请求未完成时不会继续下一次轮询, 2. 表格组件卸载时停止轮询
- 7b6e466b: **CTable**: 在 onTableUpdateDataEnd 的回调函数参数中增加 type，可用于判断触发数据更新的动作是什么，比如分页、过滤、排序等
- 953df608: **CTableEditor**: 受控模式下支持表格排序、过滤、分页
- cf117faa: **CTableEditor**: 修复非受控模式下国际化不生效的问题
- b77f5298: **CFeeCalculator**: PriceInfo 新增 cTableProps 属性,该属性支持 透传 计费详情中中的表格属性
  **CFeeCalculator**: PriceInfo 增加泛型，约束 detailList 数据的类型
- b6a33cc2: **CFeeCalculator**: 1. 添加 `monetaryUnit` 属性,支持自定义货币符号 2. 修改折扣价格在下方的样式问题
- e1b56de4: **CForm**: Section 支持透传 style 属性
  **CForm**: CForm 上一步/下一步 按钮 支持 Loading 状态
  **CForm**: 支持 透传 Arco Steps 的属性
- 1c40a699: `CListEditor` 新增 API 用于透传 Input InputTag 属性&add 时填入默认值

## 0.12.0-beta.8

### Patch Changes

- 541d4085: ** CTable: toolbar 增加取消选择按钮 **
- 47e13ee0: **CTable**: 轮询功能修改：1. 上一次请求未完成时不会继续下一次轮询, 2. 表格组件卸载时停止轮询

## 0.12.0-beta.7

### Patch Changes

- 17c9d1d3: `CForm`
  1.fix ArrayTable 分页时新增分页器不跳转问题
  2. 优化 Array 重复校验性能
  3. 样式还原
- e01a2d61: CStatistic: 间距调整
- 8b537568: **CCodeBlock**: 修复空格等无法格式化的问题
  **COperationMenu**: 配置弹出菜单自动跟随
- ce449f65: **CTable**: 表格 loading 样式调整：1. 尺寸改为 48px 2. 固定距离表格顶部 48px

## 0.12.0-beta.6

### Minor Changes

- f74c9671: Updated dependencies
  - @arco-design/web-react@2.53.1

### Patch Changes

- cf117faa: **CTableEditor**: 修复非受控模式下国际化不生效的问题
- b6a33cc2: **CFeeCalculator**: 1. 添加 `monetaryUnit` 属性,支持自定义货币符号 2. 修改折扣价格在下方的样式问题

## 0.11.1-beta.5

### Patch Changes

- b77f5298: **CFeeCalculator**: PriceInfo 新增 cTableProps 属性,该属性支持 透传 计费详情中中的表格属性
  **CFeeCalculator**: PriceInfo 增加泛型，约束 detailList 数据的类型
- 1c40a699: `CListEditor` 新增 API 用于透传 Input InputTag 属性&add 时填入默认值

## 0.11.1-beta.4

### Patch Changes

- 5a3e0054: **CContentWrapper**: 新增自动撑满能力
  **CContentWrapper**: 修复全局配置中 prefixCls 不生效的问题
- d3c9ee53: `CForm`: 修复内置组件 arcoTableProps 传入函数时，未把值 onChange 给 CForm 的问题
  `CForm`: 不再支持 PreselectedTable 的 rowKeb 传入函数,原因: rowKey 传入函数时,value 不能通过 value[rowKey]判断是否选中改行

  `CAddButton`: 修复 CAddButton dashed 样式 disabled 时不触发 hover 的问题

## 0.11.1-beta.3

### Patch Changes

- 4ef3f67a: `CModal` 支持 CModal.FormStep

## 0.11.1-beta.2

### Patch Changes

- 7b6e466b: **CTable**: 在 onTableUpdateDataEnd 的回调函数参数中增加 type，可用于判断触发数据更新的动作是什么，比如分页、过滤、排序等
- 953df608: **CTableEditor**: 受控模式下支持表格排序、过滤、分页

## 0.11.1-beta.1

### Patch Changes

- e1b56de4: **CForm**: Section 支持透传 style 属性
  **CForm**: CForm 上一步/下一步 按钮 支持 Loading 状态
  **CForm**: 支持 透传 Arco Steps 的属性

## 0.11.1-beta.0

### Patch Changes

- df869d69: `CTable` cell 和 row 的 data-cy 不应该加入 rowKey 信息

## 0.11.0

### Minor Changes

- 4e09e55e: Updated dependencies
  - @arco-design/web-react@2.52.2

### Patch Changes

- 11270b4b: `CForm` 支持 html form 标签
- 138fa330: `CForm` 修复全屏状态丢失问题 & 国际化问题
- 27063345: `CForm` 主按钮默认文案改为确定
- 7542ed71: `CPopupEdit`: 字数超出限制,提示框透明化
- dd25f0c0: CTableTransfer 新增 ref 获取 sourceTable 与 TargetTable
- 852148b1: `CTabs`: 修复 leftBottomBorder 属性影响了里层的 Tabs 和 CTabs 样式
- 63615172: **CConfigPreview**: 新增 `CConfigPreview` 组件。用于承载创建页的配置预览、价格预览以及协议等信息。搭配 Arco Form 使用。
- 57ada8e0: `CForm` 新增动态字段
- de291998: 调整了一下 Demo，展示了也能设置不同组件类型的动态表单的特性
- 5dc9600e: **CTable**: arcoColumnProps 支持配置为函数
- 8afe3201: **CTable**: 支持将表格状态同步到 url query 以及读取 url query 作为表格的初始状态
- a2371af4: 支持从统一物料导入 iconBox 的 icon
- 009f5b4f: `CDrawerSelect` 支持配置 受控/非受控 两种模式
- 1c65604b: CFormConfirm：确认页优先取用户配置 label
- bf98f969: CTableTransfer：新增 searchIndex 搜索索引字段
- b0d37859: 更新 `CTag` cEllipsisProps 及文档
- bef017ce: 修复 CTransfer 在 mode 为 local+fetcher 情况下初始值为空情况
- 48727cc6: `CStatus`支持 waitColor API,支持 wait 状态的蓝色和灰色配色
- c4babe7b: **CTable**: 修复在没有传 rowKey 的情况下获取 selectedRowData 为空的问题
- 4f46aa0f: **CTable**: 修复轮询模式下 url query 没有同步到列过滤项的问题
- 9b3eae79: **CTable**: 使用 time, utctime formatter 时，如果格式不合法则兜底渲染为 -
- dd9a796c: **CTable**: 修复 loadMoreContainerHeight 不生效的问题
- 1f4c19f7: `CInfoSection`: 调整 Section 样式和源力对齐
- e29729c9: `CModal` 修复 contentTop 传入 null 时报错
- ee6048b0: **CForm\***: 内置 CAsyncSelect 修改: 如果未设置 autoLoad 为 true,依赖改变时不立即触发重新加载,等待组件 onFocus 事件 时触发重新加载
- b47c457c: **CAsysnSelect**: 在 FormItem 中 icon 对齐样式 BUG
- cb061099: **CAysncSelect**: 样式修复：在带刷新按钮的场景,select 输入框选择内容过长时容器被撑大
- 70c2e258: `CAsyncSwitch` 非受控模式无法关闭问题修复 & 正确 demo 补充
- 429fe0f5: `CCopy` 增加 showCopy 属性,可以用来配置 hover 时才显示 Icon
- 6fee401d: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.29
- 0548dae5: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.52

## 0.11.0-beta.13

### Patch Changes

- dd9a796c: **CTable**: 修复 loadMoreContainerHeight 不生效的问题
- 0548dae5: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.52

## 0.11.0-beta.12

### Patch Changes

- 009f5b4f: `CDrawerSelect` 支持配置 受控/非受控 两种模式

## 0.11.0-beta.11

### Patch Changes

- 27063345: `CForm` 主按钮默认文案改为确定
- 7542ed71: `CPopupEdit`: 字数超出限制,提示框透明化
- dd25f0c0: CTableTransfer 新增 ref 获取 sourceTable 与 TargetTable
- de291998: 调整了一下 Demo，展示了也能设置不同组件类型的动态表单的特性
- bef017ce: 修复 CTransfer 在 mode 为 local+fetcher 情况下初始值为空情况

## 0.11.0-beta.10

### Patch Changes

- cb061099: **CAysncSelect**: 样式修复：在带刷新按钮的场景,select 输入框选择内容过长时容器被撑大

## 0.11.0-beta.9

### Patch Changes

- 4e09e55e: Updated dependencies
  - @arco-design/web-react@2.52.2

## 0.11.0-beta.8

### Patch Changes

- 138fa330: `CForm` 修复全屏状态丢失问题 & 国际化问题

## 0.11.0-beta.7

### Patch Changes

- 852148b1: `CTabs`: 修复 leftBottomBorder 属性影响了里层的 Tabs 和 CTabs 样式
- 4f46aa0f: **CTable**: 修复轮询模式下 url query 没有同步到列过滤项的问题
- 9b3eae79: **CTable**: 使用 time, utctime formatter 时，如果格式不合法则兜底渲染为 -

## 0.11.0-beta.6

### Patch Changes

- 48727cc6: `CStatus`支持 waitColor API,支持 wait 状态的蓝色和灰色配色
- ee6048b0: **CForm\***: 内置 CAsyncSelect 修改: 如果未设置 autoLoad 为 true,依赖改变时不立即触发重新加载,等待组件 onFocus 事件 时触发重新加载

## 0.11.0-beta.5

### Patch Changes

- 11270b4b: `CForm` 支持 html form 标签
- 63615172: **CConfigPreview**: 新增 `CConfigPreview` 组件。用于承载创建页的配置预览、价格预览以及协议等信息。搭配 Arco Form 使用。
- 57ada8e0: `CForm` 新增动态字段
- b0d37859: 更新 `CTag` cEllipsisProps 及文档
- 1f4c19f7: `CInfoSection`: 调整 Section 样式和源力对齐
- 6fee401d: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.29
- 24036898: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.51

## 0.11.0-beta.4

### Patch Changes

- bf98f969: CTableTransfer：新增 searchIndex 搜索索引字段

## 0.11.0-beta.3

### Minor Changes

- b43c7bcf: Updated dependencies
  - @arco-design/web-react@2.52.1

### Patch Changes

- 8afe3201: **CTable**: 支持将表格状态同步到 url query 以及读取 url query 作为表格的初始状态
- 1c65604b: CFormConfirm：确认页优先取用户配置 label
- 429fe0f5: `CCopy` 增加 showCopy 属性,可以用来配置 hover 时才显示 Icon

## 0.10.1-beta.2

### Patch Changes

- 5dc9600e: **CTable**: arcoColumnProps 支持配置为函数

## 0.10.1-beta.1

### Patch Changes

- c4babe7b: **CTable**: 修复在没有传 rowKey 的情况下获取 selectedRowData 为空的问题
- e29729c9: `CModal` 修复 contentTop 传入 null 时报错
- b47c457c: **CAsysnSelect**: 在 FormItem 中 icon 对齐样式 BUG

## 0.10.1-beta.0

### Patch Changes

- a2371af4: 支持从统一物料导入 iconBox 的 icon
- 70c2e258: `CAsyncSwitch` 非受控模式无法关闭问题修复 & 正确 demo 补充

## 0.10.0

### Minor Changes

- 04857cdd: **CTabs**: 新增 CTabs 组件

### Patch Changes

- 33b3d980: **CRadio**: 配置模式的单选组添加带索引的 data-cy
  **CCheckbox**: 配置模式的多选组添加带索引的 data-cy
- 6c5ad194: CCollapse: 修改文档 Demo 展示
- 31e59a47: `CStatistic`: `CStatistic.List` 支持`list` 添加标题(`title`)
- 5dea433f: `CCombineSearch` input 类型增加 `mode=tag`，支持输入 tag 类型
  `CCombineSearch` 支持在输入时点击字段名切换字段
  `CCombineSearch` 增加参数 `renderViewItem`，支持自定义搜索结果展示组件
  `CCombineSearch` 类型增加 `type=custom` ，支持自定义弹窗内容和输入时显示内容
- 6d1baa68: **CSearch**: 修复在 `CSearch` 中使用 `CCascaderSearch` 组件,重置时 `CCascaderSearch` 数据未重置的问题
- 25cf5d15: `CAsyncSelect`: CAsyncSelect 优化 第一次 loading 状态不展示 Empty 内容
- 2d18fcdc: **CTable**: 内置轮询, 支持通过配置开启
- fb7d1f68: **CTable**:解决 table 的领域模型 props 和内置组件 props 的 content 属性冲突的问题
- e06c22fa: `CPopupEdit`: 增加编辑图标可配置 Popover 提示场景
- 5b22110c: `CStatistic`: 当 value 值为 0 的时候也能展示
- 0c28d459: **CFeeCalculator**: 修改数值输入框中的默认最小值。从 0 修改为 1
- 5763f55d: `CInfoSection`: 识别 Number 类型的 children
- 5b21583d: `CNameInfo`nameRenderType 为 text 时设置颜色同 id
- 7bd230b2: **CTable**: 自定义列：支持配置不展示自定义列 Icon 的右上角角标
- 9e52a864: **CTable**: 替换行展开的 icon 为源力主题的 icon
- 263614df: **CTable**: 自定义列：支持配置「不在自定义列配置中展示的列」
- 77eecfae: `CStatus`,`CNameInfo`组件修复 popover 包裹时无法显示弹出层问题
- 72fea69f: **CFeeCalculator**: 样式调整
- 586db332: **CRadio**: CRadio.Group 的 disabled 属性未透传到 Radio.Group 的 bug 修复
  **CCheckbox**: CCheckbox.Group 的 disabled 属性未透传到 Checkbox.Group 的 bug 修复
- 8e85be6f: `CModal` 修复 CModal.Form contentTop sticky 不生效的问题
- dc43385f: 升级@storage-fe/formily-arco，修复 arrayTable title 不兼容 reactNode
- 05994859: Updated dependencies
  - @arco-design/web-react@2.51.2
- 060b1004: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.49

## 0.10.0-beta.10

### Patch Changes

- 6d1baa68: **CSearch**: 修复在 `CSearch` 中使用 `CCascaderSearch` 组件,重置时 `CCascaderSearch` 数据未重置的问题
- 2d18fcdc: **CTable**: 内置轮询, 支持通过配置开启
- fb7d1f68: **CTable**:解决 table 的领域模型 props 和内置组件 props 的 content 属性冲突的问题
- 263614df: **CTable**: 自定义列：支持配置「不在自定义列配置中展示的列」

## 0.10.0-beta.9

### Patch Changes

- 5763f55d: `CInfoSection`: 识别 Number 类型的 children

## 0.10.0-beta.8

### Patch Changes

- 7bd230b2: **CTable**: 自定义列：支持配置不展示自定义列 Icon 的右上角角标

## 0.10.0-beta.7

### Patch Changes

- 25cf5d15: `CAsyncSelect`: CAsyncSelect 优化 第一次 loading 状态不展示 Empty 内容
- e06c22fa: `CPopupEdit`: 增加编辑图标可配置 Popover 提示场景
- 5b22110c: `CStatistic`: 当 value 值为 0 的时候也能展示
- 9e52a864: **CTable**: 替换行展开的 icon 为源力主题的 icon
- 77eecfae: `CStatus`,`CNameInfo`组件修复 popover 包裹时无法显示弹出层问题
- 8e85be6f: `CModal` 修复 CModal.Form contentTop sticky 不生效的问题

## 0.10.0-beta.6

### Patch Changes

- 5dea433f: `CCombineSearch` input 类型增加 `mode=tag`，支持输入 tag 类型
  `CCombineSearch` 支持在输入时点击字段名切换字段
  `CCombineSearch` 增加参数 `renderViewItem`，支持自定义搜索结果展示组件
  `CCombineSearch` 类型增加 `type=custom` ，支持自定义弹窗内容和输入时显示内容
- 586db332: **CRadio**: CRadio.Group 的 disabled 属性未透传到 Radio.Group 的 bug 修复
  **CCheckbox**: CCheckbox.Group 的 disabled 属性未透传到 Checkbox.Group 的 bug 修复
- 060b1004: Updated dependencies
  - @arco-design/iconbox-react-ve-o-design@0.0.49

## 0.10.0-beta.5

### Patch Changes

- dc43385f: 升级@storage-fe/formily-arco，修复 arrayTable title 不兼容 reactNode

## 0.10.0-beta.4

### Patch Changes

- 6c5ad194: CCollapse: 修改文档 Demo 展示

## 0.10.0-beta.3

### Patch Changes

- 5b21583d: `CNameInfo`nameRenderType 为 text 时设置颜色同 id

## 0.10.0-beta.2

### Patch Changes

- 72fea69f: **CFeeCalculator**: 样式调整
- 05994859: Updated dependencies
  - @arco-design/web-react@2.51.2

## 0.10.0-beta.1

### Patch Changes

- 31e59a47: `CStatistic`: `CStatistic.List` 支持`list` 添加标题(`title`)

## 0.10.0-beta.0

### Minor Changes

- 04857cdd: **CTabs**: 新增 CTabs 组件

### Patch Changes

- 33b3d980: **CRadio**: 配置模式的单选组添加带索引的 data-cy
  **CCheckbox**: 配置模式的多选组添加带索引的 data-cy

## 0.9.0

### Minor Changes

- f7dd26ae: `CCard` 新增 CCard 组件(normal,compact,linkList)
- 0d577871: Updated dependencies
  - @arco-design/web-react@2.51.1

### Patch Changes

- d84dd82c: `CForm`
  1. 优化 demo
  2. FormItem 新增 hasInnerFormItem 属性处理嵌套样式穿透问题
  3. array 判重 helper bugfix
- db5181f0: `CForm` 取消二次 check 按钮位置调整
- 2985ddb9: **CAgreement**: 协议组件支持非链接形式协议
- 2a0a3a24: **CAsyncSelect**: 新增 `showRefreshBtn` 属性展示刷新按钮
- 81addb47: **CForm**: 装饰器隐藏横向滚动条
  **CFeeCalculator**: 退费时，默认计费标题改为 预计退费；其余情况，默认计费标题为 配置费用。
  **CFeeCalculator**: 涉及退费场景时，展示免责声明文案。
- fbf44447: CForm 内置 CTableTransfer
- d398443f: CForm：arrayTable 支持表头展示必填\*
- 12767046: **CTable**: 规范更新：当 hover 到某一行时，会显示这一行所有编辑、复制操作的 icon，涉及 CNameInfo、CEllipsis、CPopupEdit 组件
- e73b8fc1: **CTable**: 支持调用 table.refresh 时清空已选择的行
- 1783043f: _CPopupEdit_: 修复问题:设置 showEdit={false} 时，点击编辑，然后按回车键提交之后，编辑按钮会一直显示
- 27b915cd: `CListEditor` 透传 rules 到 formItem
- 6065dced: 修复 Cform 确认页默认展示分页
- 436a63d6: `CNameInfo`copy icon 高度样式&挤压时抖动问题
- 7106bb5b: `CStatus`更新 Icon,升级源力 iconbox
- 2ccd0b97: **CTable**: 自定义列：更新配置了自定义列表字段后的 icon 展示
- df2b4689: **CTable**: 分页器规范回滚：改为之前的当数据小于等于 10 条时隐藏分页器。同时增加 alwaysShowPagination 配置，配置后可以始终展示分页器
- a22c1c4b: **CTable**: 修复滚动加载模式下容器丢失最大高度的问题
- 1d6e532f: **CAsyncSelect**: 异步下拉组件默认宽度 bug 修复
- e82d8031: **CFeeCalculator**: 修复计费组件展示分页问题
  **CForm**: ArrayButton 支持透传 CAddButton 属性
- f4dcb86e: **CRadio**: 自定义形式的按钮层级包裹重复
  **CCheckbox**: 自定义形式的按钮层级包裹重复
- 1f572642: 升级`b-validate`,默认校验文案设置为中文
- 5696591d: `useValidate`根据 i18n 设置默认校验文案
- 83037be3: `COpertaionMenu: 修复subOperation 有 visible的情况下数据不正确的问题`
- 718c4db3: `CCopy` icon 样式保持对齐
- a3b00d19: CTableTrasnfer：边框角 border 缺失
- b62a84bd: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.28

## 0.9.0-beta.11

### Patch Changes

- db5181f0: `CForm` 取消二次 check 按钮位置调整

## 0.9.0-beta.10

### Patch Changes

- e73b8fc1: **CTable**: 支持调用 table.refresh 时清空已选择的行

## 0.9.0-beta.9

### Patch Changes

- d84dd82c: `CForm`
  1. 优化 demo
  2. FormItem 新增 hasInnerFormItem 属性处理嵌套样式穿透问题
  3. array 判重 helper bugfix

## 0.9.0-beta.8

### Minor Changes

- f7dd26ae: `CCard` 新增 CCard 组件(normal,compact,linkList)

### Patch Changes

- fbf44447: CForm 内置 CTableTransfer

## 0.9.0-beta.7

### Minor Changes

- 0d577871: Updated dependencies
  - @arco-design/web-react@2.51.1

### Patch Changes

- 1783043f: _CPopupEdit_: 修复问题:设置 showEdit={false} 时，点击编辑，然后按回车键提交之后，编辑按钮会一直显示
- 27b915cd: `CListEditor` 透传 rules 到 formItem
- b62a84bd: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.28

## 0.9.0-beta.6

### Patch Changes

- a22c1c4b: **CTable**: 修复滚动加载模式下容器丢失最大高度的问题
- 1d6e532f: **CAsyncSelect**: 异步下拉组件默认宽度 bug 修复
- f4dcb86e: **CRadio**: 自定义形式的按钮层级包裹重复
  **CCheckbox**: 自定义形式的按钮层级包裹重复

## 0.9.0-beta.5

### Patch Changes

- d398443f: CForm：arrayTable 支持表头展示必填\*
- 7106bb5b: `CStatus`更新 Icon,升级源力 iconbox
- 5696591d: `useValidate`根据 i18n 设置默认校验文案

## 0.9.0-beta.4

### Patch Changes

- 1f572642: 升级`b-validate`,默认校验文案设置为中文

## 0.9.0-beta.3

### Patch Changes

- df2b4689: **CTable**: 分页器规范回滚：改为之前的当数据小于等于 10 条时隐藏分页器。同时增加 alwaysShowPagination 配置，配置后可以始终展示分页器

## 0.9.0-beta.2

### Minor Changes

- e5371b50: Updated dependencies
  - @arco-design/web-react@2.51.0

### Patch Changes

- 436a63d6: `CNameInfo`copy icon 高度样式&挤压时抖动问题
- 2ccd0b97: **CTable**: 自定义列：更新配置了自定义列表字段后的 icon 展示

## 0.8.1-beta.1

### Patch Changes

- 12767046: **CTable**: 规范更新：当 hover 到某一行时，会显示这一行所有编辑、复制操作的 icon，涉及 CNameInfo、CEllipsis、CPopupEdit 组件
- 6065dced: 修复 Cform 确认页默认展示分页
- e82d8031: **CFeeCalculator**: 修复计费组件展示分页问题
  **CForm**: ArrayButton 支持透传 CAddButton 属性
- 83037be3: `COpertaionMenu: 修复subOperation 有 visible的情况下数据不正确的问题`

## 0.8.1-beta.0

### Patch Changes

- 2985ddb9: **CAgreement**: 协议组件支持非链接形式协议
- 2a0a3a24: **CAsyncSelect**: 新增 `showRefreshBtn` 属性展示刷新按钮
- 81addb47: **CForm**: 装饰器隐藏横向滚动条
  **CFeeCalculator**: 退费时，默认计费标题改为 预计退费；其余情况，默认计费标题为 配置费用。
  **CFeeCalculator**: 涉及退费场景时，展示免责声明文案。

## 0.8.0

### Minor Changes

- 3a4136da: **CStatistic**: 新增数值展示组件
- 9008108d: `CDrawerSelect` 新增组件
  `CForm` 新增内置组件 `CDrawerSelect`
- 4bf5e9cf: 替换 Icon 库为源力 iconBox

### Patch Changes

- e0fe7244: `CForm` 新增数组值重复校验 helper
- 82ffa68b: feat(common.CDetail): cDetailHeader 增加 cEllipsisProps 属性
- c5b3440d: CForm arrayItem 与 arrayTable 支持 shema
- 49250f96: **CAsyncSelect**: 提供参数可以控制内部 Empty 组件
- c8d3e2ff: **CAsyncSelect**: 修复 CAsyncSelect 在不指定 optionMode 时，无法获取到指定的 option.extra 的问题
- 8d3ebd19: **CTable**: 支持配置自定义的无数据时候的展示内容
- dc6031d5: **CStatistic**: CConfigProvider 引入路径使用报错问题修复
- 36554d46: **CStatistic**: 添加文档站公共样式
- c1d9f389: fix(common.CDetail): 修复 cDetail 组件 tab 吸顶功能
- 8c8e8693: `CListEditor`组件,修复初始值 disableDelete,不设置 item 宽度,宽度自适应,overview 默认值修改 auto
- f53b8694: CDetailPage 修复 customOperationMenu 类型问题
- aaf42f5d: `CForm` helper 多字段变化响应支持防抖
- de4ee619: `CStatus`固定行高,避免表格场景下继承 lint-height 对 icon 与 text 对齐效果的影响
- 3e128508: **CTable**: 分页器规范更新，默认改为始终展示
- fe8875cb: **CTable**: 修改内部函数命名以解决 swc 转译错误的问题
- 93cb6bec: 修复 `CTag` 颜色取值 & 删除 `CTags` 中 `cCollapseProps.showCount` 缺省值
- 6e2d01b6: **CRadio**: 自定义节点内容继承样式
  **CCheckbox**: 自定义节点内容继承样式
- 1d20fd22: `CDrawerSelect` 修改类型引入方式报错的问题
- c8c3257d: `CForm` 内置组件 `CTableSelect`loading 态可由 field 控制
- 44f304f8: **CEllipsis**: 修复值为 0 时未正确显示的场景
- 1d35cc5e: `CConfigProvider` 修复 locale 未被继承的问题
- ae840a20: `CModal.Form`修复 onOk 回调失败的问题
- 78bfb82e: `CSidebar` 修复 popover 始终显示的问题
- db32ce6d: CCollpase: popover 模式限制最大展示数量
- e1dccb40: Updated dependencies
  - @arco-design/web-react@2.50.2
- 28764eff: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.27

## 0.8.0-beta.11

### Minor Changes

- 4bf5e9cf: 替换 Icon 库为源力 iconBox

### Patch Changes

- c1d9f389: fix(common.CDetail): 修复 cDetail 组件 tab 吸顶功能
- fe8875cb: **CTable**: 修改内部函数命名以解决 swc 转译错误的问题
- c8c3257d: `CForm` 内置组件 `CTableSelect`loading 态可由 field 控制
- 44f304f8: **CEllipsis**: 修复值为 0 时未正确显示的场景

## 0.8.0-beta.10

### Patch Changes

- ae840a20: `CModal.Form`修复 onOk 回调失败的问题

## 0.8.0-beta.9

### Patch Changes

- de4ee619: `CStatus`固定行高,避免表格场景下继承 lint-height 对 icon 与 text 对齐效果的影响

## 0.8.0-beta.8

### Patch Changes

- 8c8e8693: `CListEditor`组件,修复初始值 disableDelete,不设置 item 宽度,宽度自适应,overview 默认值修改 auto
- 6e2d01b6: **CRadio**: 自定义节点内容继承样式
  **CCheckbox**: 自定义节点内容继承样式
- 1d20fd22: `CDrawerSelect` 修改类型引入方式报错的问题
- e1dccb40: Updated dependencies
  - @arco-design/web-react@2.50.2
- 28764eff: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.27

## 0.8.0-beta.7

### Minor Changes

- 9008108d: `CDrawerSelect` 新增组件
  `CForm` 新增内置组件 `CDrawerSelect`

### Patch Changes

- 8d3ebd19: **CTable**: 支持配置自定义的无数据时候的展示内容
- aaf42f5d: `CForm` helper 多字段变化响应支持防抖

## 0.8.0-beta.6

### Patch Changes

- 82ffa68b: feat(common.CDetail): cDetailHeader 增加 cEllipsisProps 属性

## 0.8.0-beta.5

### Patch Changes

- e0fe7244: `CForm` 新增数组值重复校验 helper
- c5b3440d: CForm arrayItem 与 arrayTable 支持 shema

## 0.8.0-beta.4

### Patch Changes

- dc6031d5: **CStatistic**: CConfigProvider 引入路径使用报错问题修复
- 1d35cc5e: `CConfigProvider` 修复 locale 未被继承的问题

## 0.8.0-beta.3

### Patch Changes

- 49250f96: **CAsyncSelect**: 提供参数可以控制内部 Empty 组件
- c8d3e2ff: **CAsyncSelect**: 修复 CAsyncSelect 在不指定 optionMode 时，无法获取到指定的 option.extra 的问题
- 36554d46: **CStatistic**: 添加文档站公共样式
- 78bfb82e: `CSidebar` 修复 popover 始终显示的问题

## 0.8.0-beta.2

### Patch Changes

- 31e0fabc: Updated dependencies
  - @arco-design/web-react@2.50.1

## 0.8.0-beta.1

### Minor Changes

- 3a4136da: **CStatistic**: 新增数值展示组件

### Patch Changes

- f53b8694: CDetailPage 修复 customOperationMenu 类型问题
- 93cb6bec: 修复 `CTag` 颜色取值 & 删除 `CTags` 中 `cCollapseProps.showCount` 缺省值
- db32ce6d: CCollpase: popover 模式限制最大展示数量

## 0.7.2-beta.0

### Patch Changes

- 3e128508: **CTable**: 分页器规范更新，默认改为始终展示

## 0.7.1

### Patch Changes

- 699640d4: **CForm**: 默认装饰器支持自定义 getPopupContainer 属性
  **CForm**: 内置 Agreement 组件样式引入
- 600cb48e: `CForm` 修复 FormItem controlChildStyle 生效及增加 FormItem 打桩
- a2293a90: `CForm` 支持返回和取消按钮二次确认
- 1f3ce2c4: CCollapse: popover 模式限制最大展示数量
- 5016ab36: CForm：确认页 columnConfig 类型更正
- 3d946e11: `CAsyncSelect` 不在内部挂载节点
- a5c8d623: CAsyncSelect 新增功能：1. SelectOption 里面新增 disabledTooltipContent 支持展示禁用原因 2.多选情况下支持 hover maxTag 展示隐藏的全部信息并支持复制所有或者其中一条 3.支持默认的复制行为
- f4acdd55: fix(common.CDetail): CDetail 适配 cPrefixCls
- 130a14cf: `COperationMenu Popconfirm disabled 属性可自定义`
- 48479a3d: **CTable**: 修复开启行选择和固定列配置时拖拽表头样式错乱的问题
- 289044f7: `CCopy`支持传入自定义复制触发节点
  `@arco-design/theme-volcengine-ui-v3` 回退一个火山主题包版本，避免 button line-height 问题
- 11b689bc: `CDrawer` mask false 场景下自动阻止 popover modal 等组件触发其关闭的逻辑
- 3e7cc60e: **CInlineEdit**: 修复使用 builtIn 时 rules 不生效的问题
- 07cac60a: CTableTransfer: 初始化完成不调用 onChange 函数
- 4706b72f: 修复 inline type 语法
- 9652cc96: CCollapse: popover 模式增加自定义操作
- 30372ec7: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.26
- d4f6093c: Updated dependencies
  - @arco-design/web-react@2.50.0

## 0.7.1-beta.11

### Patch Changes

- 5016ab36: CForm：确认页 columnConfig 类型更正

## 0.7.1-beta.10

### Patch Changes

- 1f3ce2c4: CCollapse: popover 模式限制最大展示数量
- 4706b72f: 修复 inline type 语法

## 0.7.1-beta.9

### Patch Changes

- a2293a90: `CForm` 支持返回和取消按钮二次确认
- 48479a3d: **CTable**: 修复开启行选择和固定列配置时拖拽表头样式错乱的问题

## 0.7.1-beta.8

### Patch Changes

- 11b689bc: `CDrawer` mask false 场景下自动阻止 popover modal 等组件触发其关闭的逻辑
- d4f6093c: Updated dependencies
  - @arco-design/web-react@2.50.0

## 0.7.1-beta.7

### Patch Changes

- a5c8d623: CAsyncSelect 新增功能：1. SelectOption 里面新增 disabledTooltipContent 支持展示禁用原因 2.多选情况下支持 hover maxTag 展示隐藏的全部信息并支持复制所有或者其中一条 3.支持默认的复制行为
- 30372ec7: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.26

## 0.7.1-beta.6

### Patch Changes

- 699640d4: **CForm**: 默认装饰器支持自定义 getPopupContainer 属性
  **CForm**: 内置 Agreement 组件样式引入

## 0.7.1-beta.5

### Patch Changes

- 3e7cc60e: **CInlineEdit**: 修复使用 builtIn 时 rules 不生效的问题

## 0.7.1-beta.4

### Patch Changes

- f4acdd55: fix(common.CDetail): CDetail 适配 cPrefixCls
- 130a14cf: `COperationMenu Popconfirm disabled 属性可自定义`

## 0.7.1-beta.3

### Patch Changes

- 9652cc96: CCollapse: popover 模式增加自定义操作

## 0.7.1-beta.2

### Patch Changes

- 3d946e11: `CAsyncSelect` 不在内部挂载节点

## 0.7.1-beta.1

### Patch Changes

- 07cac60a: CTableTransfer: 初始化完成不调用 onChange 函数

## 0.7.1-beta.0

### Patch Changes

- 600cb48e: `CForm` 修复 FormItem controlChildStyle 生效及增加 FormItem 打桩

## 0.7.0

### Minor Changes

- 56fb07c4: Updated dependencies
  - @arco-design/web-react@2.49.2

### Patch Changes

- cfd571bc: **CForm**: FormItem 装饰器中内容超出宽度限制修复
- bb38d70b: **CAgreement**: 新增 `CAgreement` 组件
- 5ea5ecc1: **CRadio**: 新增 `horizontalLayout`属性
  **CCheckbox**: 新增 `horizontalLayout`属性
- ed8ab9b1: `CForm` 优化 demo
- 67b67a3f: CTableTransfer：onAdd 函数返回值增加 void 类型、onChange 函数增加 rawData 返回、选择触发上限支持 tootip 提示
- 8e5a6a1c: `CForm` 内置增加 `PreSelectedTable`组件
- 0fdeb752: `CAsyncSelect`: 超长 tooltip 挂载在父节点
- e2363789: `CAsyncSelect`: ifAutoLoadFirst 只生效一次、某些情况下清空 searchWord、showSearch 参数失效问题解决
- 7ea09fc1: **CTableEditor**: 提供`EditableCell`组件以实现单个单元格的编辑操作
- 438292f4: **CInlineEdit**: `fieldType` 新增 `Select` 可选性,内置支持渲染 Select 组件
- 24bd205a: **CInlineEdit**: 接入 builtIn 支持内置 field 组件
- a6ec7d66: **CEllipsis**: `popoverContent`支持通过函数根据当前文本是否溢出自定义显示 `Popover` 内容
- c4022be5: fix(common.CDetail): 修复 CDetail tab 有根怪线的样式问题
- f14f0964: `CInfoSection`: 适配组件自定义前缀
- 6001752a: `COperationMenu: 修复 popover 和 popconfirm 同时存在时，popover 不展示的问题`
- 6ac6762d: `COperationMenu 新增 arcoDropdownProps 属性`
- 84003257: **CTable**: 适配组件自定义前缀
- d9ab1fbf: **CTableEditor**: tableEditor 实例增加新增多行方法`addRows`和删除一行方法`deleteRow`
- 6231f307: **CTableEditor**: 修复撤销上一步数据异常的问题
- de2fe3c5: `CStatus: 修复枚举值注释错误`
- bf8a18ee: `CStatus`组件`CNameInfo组件`组件`CListEditor`组件接入全局配置方案
- fa637ce2: `CStatus`组件,`CNameInfo`组件,`CListEditor`组件外层增加 data-cy
- 9dc0660b: `CSidebar`支持 title dropdown menu
- f4b4e8f9: `CModal CDrawer`支持二次确认
- 8870131a: **CDetail**: 新增 showBackIcon 属性
  **CDetailPage**: 新增 showBackIcon 属性
- e4681e03: `CForm` 修复响应式属性 children 重复问题 & 优化 FormItem 文档

## 0.7.0-beta.9

### Patch Changes

- 8e5a6a1c: `CForm` 内置增加 `PreSelectedTable`组件

## 0.7.0-beta.8

### Patch Changes

- 6ac6762d: `COperationMenu 新增 arcoDropdownProps 属性`
- fa637ce2: `CStatus`组件,`CNameInfo`组件,`CListEditor`组件外层增加 data-cy

## 0.7.0-beta.7

### Patch Changes

- 8870131a: **CDetail**: 新增 showBackIcon 属性
  **CDetailPage**: 新增 showBackIcon 属性
- e4681e03: `CForm` 修复响应式属性 children 重复问题 & 优化 FormItem 文档

## 0.7.0-beta.6

### Patch Changes

- cfd571bc: **CForm**: FormItem 装饰器中内容超出宽度限制修复
- 7ea09fc1: **CTableEditor**: 提供`EditableCell`组件以实现单个单元格的编辑操作

## 0.7.0-beta.5

### Patch Changes

- e2363789: `CAsyncSelect`: ifAutoLoadFirst 只生效一次、某些情况下清空 searchWord、showSearch 参数失效问题解决
- 24bd205a: **CInlineEdit**: 接入 builtIn 支持内置 field 组件
- f14f0964: `CInfoSection`: 适配组件自定义前缀
- 6001752a: `COperationMenu: 修复 popover 和 popconfirm 同时存在时，popover 不展示的问题`
- bf8a18ee: `CStatus`组件`CNameInfo组件`组件`CListEditor`组件接入全局配置方案
- f4b4e8f9: `CModal CDrawer`支持二次确认

## 0.7.0-beta.4

### Patch Changes

- 5ea5ecc1: **CRadio**: 新增 `horizontalLayout`属性
  **CCheckbox**: 新增 `horizontalLayout`属性
- 438292f4: **CInlineEdit**: `fieldType` 新增 `Select` 可选性,内置支持渲染 Select 组件
- 84003257: **CTable**: 适配组件自定义前缀

## 0.7.0-beta.3

### Patch Changes

- a6ec7d66: **CEllipsis**: `popoverContent`支持通过函数根据当前文本是否溢出自定义显示 `Popover` 内容

## 0.7.0-beta.2

### Minor Changes

- 56fb07c4: Updated dependencies
  - @arco-design/web-react@2.49.2

### Patch Changes

- de2fe3c5: `CStatus: 修复枚举值注释错误`
- 9dc0660b: `CSidebar`支持 title dropdown menu

## 0.6.2-beta.1

### Patch Changes

- 67b67a3f: CTableTransfer：onAdd 函数返回值增加 void 类型、onChange 函数增加 rawData 返回、选择触发上限支持 tootip 提示
- d9ab1fbf: **CTableEditor**: tableEditor 实例增加新增多行方法`addRows`和删除一行方法`deleteRow`
- 6231f307: **CTableEditor**: 修复撤销上一步数据异常的问题

## 0.6.2-beta.0

### Patch Changes

- ed8ab9b1: `CForm` 优化 demo
- 0fdeb752: `CAsyncSelect`: 超长 tooltip 挂载在父节点

## 0.6.1

### Patch Changes

- 586f673f: **CCheckbox**: UI 走查
  **CForm**: 内置 CRadio 适配 readPretty
- 0212a21a: **CForm**: 设置默认装饰器弹出框挂载元素
- b1ed0d4e: **CForm**: 表单内置 `CAsyncSelect` 支持依赖 `form.data` 字段
- 31ff32c1: **CForm**: FormItem 装饰器的 tooltip 提示支持透传 PopoverProps
- a8182cd6: `CForm` 方法增加 form
- 62ab4d5e: CInfoSection: 新增 noMargin 参数配置无边距模式
- fcec1c3a: **CPopupEdit** : 自定义展示内容(`displayContent`)和自定义编辑图标(`displayEditIcon`)支持为空
- 856079b1: **CPopupEdit**: 输入框按下回车键也可触发确定事件(onOk)
- cac86e33: **CPopupEdit**: 确定事件(`onOk`)如果返回的是一个 reject Promise,则编辑弹窗保持显示(即不关闭)
- 25739349: **CTableEditor**: 增加一系列可以简化操作的 helper 帮助函数, 通过`CTableEditor.helper`访问
- 6506989c: **CTableEditor**: 内部 form 实例调用`submit`或`validate`时会滚动到第一个报错的字段
- a4c048f6: **CForm**: 内置 `Agreement` 新增 `scene` 属性，标识普通场景和卡片场景的协议
  **CForm**: 新增 `defaultDecoratorProps` 属性，可直接透传默认装饰器的属性
- f3d513bf: **CFeeCalculator**: popover 展示条件判断有误
- 56e4b0f3: cForm Text 组件接收 value 值、修复初始化 loading 效果、增加 useCForm 导出
- 84c4665d: 去掉间距，与设计稿对齐，对外暴露 CTableProps 配置
- 1e120b9c: 修复 CTag 自定义类名前缀
- 5d4f5a99: 修复 CTag 边框样式
- 7c7c8a75: `COperationMenu`新增 onClick 支持返回 Promise 实现 loading 效果
- 3753bd3b: 升级 storage-formily
- 5e23fe33: **CTable**: 对自定义列功能的改动: 1. 下拉菜单模式下「恢复默认」按钮吸底, 2. 支持配置自定义内容的 tooltip 或使用 column 配置中的 tooltip, 3. 用户自定义配置后按钮变为已选状态
- db669a83: **CTable**: 对 toolbar 的改动: 元素间距改为 12px
- 8c3bd2f8: **CTable**: 内置组件 COperationMenu 样式修复
- fb72166e: **CTable**: 修复自定义列按钮的 tooltip 不消失的问题
- 0bdc940a: `CStatus`统一同一尺寸下 icon 大小,large: 16px, default: 14px
- 633d57aa: **CInlineEdit**: 修复点击操作按钮触发 onBlur 事件
- db12abc1: **CInlineEdit**: 修复宽度溢出时 EditIcon 的布局
- f7ce68aa: `CDrawer`StepForm 支持自定义 DecoratorProps
- c6319317: `CModal CDrawer`等顶部内容对齐 body 内容
- b79bb6e1: `CModal`支持配置滚动条触发阈值
- c1466dcf: `CLoading` 修复 CLoading 在同时设置 loading 和 hasError 同时展示
- 12bc9cd3: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.24
- e0c068da: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.23

## 0.6.1-beta.9

### Patch Changes

- 6506989c: **CTableEditor**: 内部 form 实例调用`submit`或`validate`时会滚动到第一个报错的字段
- 1e120b9c: 修复 CTag 自定义类名前缀
- b79bb6e1: `CModal`支持配置滚动条触发阈值
- 12bc9cd3: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.24

## 0.6.1-beta.8

### Patch Changes

- 31ff32c1: **CForm**: FormItem 装饰器的 tooltip 提示支持透传 PopoverProps

## 0.6.1-beta.7

### Patch Changes

- b1ed0d4e: **CForm**: 表单内置 `CAsyncSelect` 支持依赖 `form.data` 字段

## 0.6.1-beta.6

### Patch Changes

- 0212a21a: **CForm**: 设置默认装饰器弹出框挂载元素
- fb72166e: **CTable**: 修复自定义列按钮的 tooltip 不消失的问题

## 0.6.1-beta.5

### Patch Changes

- 856079b1: **CPopupEdit**: 输入框按下回车键也可触发确定事件(onOk)
- cac86e33: **CPopupEdit**: 确定事件(`onOk`)如果返回的是一个 reject Promise,则编辑弹窗保持显示(即不关闭)
- db12abc1: **CInlineEdit**: 修复宽度溢出时 EditIcon 的布局

## 0.6.1-beta.4

### Patch Changes

- fcec1c3a: **CPopupEdit** : 自定义展示内容(`displayContent`)和自定义编辑图标(`displayEditIcon`)支持为空
- 25739349: **CTableEditor**: 增加一系列可以简化操作的 helper 帮助函数, 通过`CTableEditor.helper`访问
- 5d4f5a99: 修复 CTag 边框样式
- 8c3bd2f8: **CTable**: 内置组件 COperationMenu 样式修复
- 0bdc940a: `CStatus`统一同一尺寸下 icon 大小,large: 16px, default: 14px
- c1466dcf: `CLoading` 修复 CLoading 在同时设置 loading 和 hasError 同时展示
- e0c068da: Updated dependencies
  - @arco-design/theme-volcengine-ui-v3@0.0.23

## 0.6.1-beta.3

### Patch Changes

- a4c048f6: **CForm**: 内置 `Agreement` 新增 `scene` 属性，标识普通场景和卡片场景的协议
  **CForm**: 新增 `defaultDecoratorProps` 属性，可直接透传默认装饰器的属性
- f3d513bf: **CFeeCalculator**: popover 展示条件判断有误
- 56e4b0f3: cForm Text 组件接收 value 值、修复初始化 loading 效果、增加 useCForm 导出
- 3753bd3b: 升级 storage-formily
- 633d57aa: **CInlineEdit**: 修复点击操作按钮触发 onBlur 事件
- f7ce68aa: `CDrawer`StepForm 支持自定义 DecoratorProps

## 0.6.1-beta.2

### Patch Changes

- a8182cd6: `CForm` 方法增加 form

## 0.6.1-beta.1

### Patch Changes

- 62ab4d5e: CInfoSection: 新增 noMargin 参数配置无边距模式
- 84c4665d: 去掉间距，与设计稿对齐，对外暴露 CTableProps 配置
- 5e23fe33: **CTable**: 对自定义列功能的改动: 1. 下拉菜单模式下「恢复默认」按钮吸底, 2. 支持配置自定义内容的 tooltip 或使用 column 配置中的 tooltip, 3. 用户自定义配置后按钮变为已选状态
- db669a83: **CTable**: 对 toolbar 的改动: 元素间距改为 12px

## 0.6.1-beta.0

### Patch Changes

- 586f673f: **CCheckbox**: UI 走查
  **CForm**: 内置 CRadio 适配 readPretty
- 7c7c8a75: `COperationMenu`新增 onClick 支持返回 Promise 实现 loading 效果
- c6319317: `CModal CDrawer`等顶部内容对齐 body 内容

## 0.6.0

### Minor Changes

- b7958890: **CCheckbox**: 新增 CCheckbox 组件
  **CRadio**: 支持自定义高度，新增卡片 Demo
  **CRadio**: 新增 `iconLayout` 属性，支持配置图标位置
- 6b1a8122: `CSideBar`支持 badge
- 6613f5c2: **CInlineEdit**:新增异步校验能力
- 5c8564cd: 主题包切换到火山引擎 3.0 规范 @arco-design/theme-volcengine-ui-v3

### Patch Changes

- 44abeb9a: **CFeeCalculator**: 修复 0 元被展示为-的问题
- cc64eba0: `CForm` 优化 form 文档
- c4afeb62: `CForm` 修复 setState 刷新 CForm 内部组件问题 & ArrayItem 内置对齐问题
- 53a2f19f: `CForm` 修复 CForm header 被 Table fixed 穿透问题
- 2ebaf484: `CForm` 锚点优化支持配置展示级数
- e4edc0da: `CInfoSection`: 在按行排列时支持用 span 控制占位数
- f5976037: `CAsyncSelect`: extra 处理优化
- 458c772b: **CTable**: 自定义列功能升级，支持下拉菜单&弹窗两种模式，并支持前端保存
- e025527e: **CTable**: 解决内置筛选项 searchInput 阴影样式的问题
- 8b29bcd7: **CTableEditor**: 解决 tableConfig 中的 extraConfig 不生效的问题
- 41dafbb6: **CTableEditor**: 解决非受控模式下 tableConfig 中传 data 导致报错的问题
- c032c6c3: **CTableEditor**: 在 CTableEditor 组件静态属性上挂载 defineColumn 和 defineColumns 工具函数
- fead0c1b: `CFeeCalculator`: 计费组件支持未传总价时显示-
- d0625583: fix CTableTransfer docs
- 5271879a: CDetail 样式修复
- ac96f907: CDetail: 标题 status 样式修复
- c3b13c68: 修复确认页 dataSource 取值容错
- 29c4654e: **CTable**: 修复 arcoTableProps 中包含 pagination 并当数据为空时报错的问题
- 9482089f: **CTable**: 在组件静态属性上挂载 defineToolbar
- c188c6be: `CForm` 内置组件 `CTableSelect` 单选时组件值由数组修改为字符串
- 0ea66d7c: **CInfoSection**: CInfoSectionData 支持传入 className
- 85a1baef: 修复循环依赖报错
- 1e5d45dd: `CModal`添加 formRef 用于获取 form 的 Ref
- 3515e9fd: **CCheckbox**: 文档站样式问题
- f45d5e62: **CInlineEdit**: 修复点击取消时,未重置异步校验状态的场景
- 8737ba30: **CInlineEdit**: 修复 disabled 下的 UI 表现行为
- 8de89ee4: `CModal` 对齐源力的 closeIcon
- 76b2801d: 为了指定组件样式顺序,暂时先切回手动生成 dist/index.less
- 06c836f0: 修改 less 产物为自动扫描生成
- e38d5cb9: `CFrom` helper 回调 fetchData 运行抛错增加 log 并且取消后续字段回调执行
- e32558b0: `CSidebar`提升层级到 1000
- 94dcbe11: `CModal`修复 confirm cancelButtonProps 属性不生效的问题
- aa50bd25: 修复 Drawer 无法预览的问题
- c2bfa875: Updated dependencies
  - @arco-design/web-react@2.48.1
- 32648ea6: **CForm**: 文档站 CForm 中的内置组件 CRadio 和 CCheckbox 样式未引入

## 0.6.0-beta.11

### Minor Changes

- 6b1a8122: `CSideBar`支持 badge

### Patch Changes

- e4edc0da: `CInfoSection`: 在按行排列时支持用 span 控制占位数
- f45d5e62: **CInlineEdit**: 修复点击取消时,未重置异步校验状态的场景
- 8de89ee4: `CModal` 对齐源力的 closeIcon
- e38d5cb9: `CFrom` helper 回调 fetchData 运行抛错增加 log 并且取消后续字段回调执行

## 0.6.0-beta.10

### Patch Changes

- 44abeb9a: **CFeeCalculator**: 修复 0 元被展示为-的问题
- 53a2f19f: `CForm` 修复 CForm header 被 Table fixed 穿透问题

## 0.6.0-beta.9

### Minor Changes

- 6613f5c2: **CInlineEdit**:新增异步校验能力

### Patch Changes

- c4afeb62: `CForm` 修复 setState 刷新 CForm 内部组件问题 & ArrayItem 内置对齐问题
- c3b13c68: 修复确认页 dataSource 取值容错
- 8737ba30: **CInlineEdit**: 修复 disabled 下的 UI 表现行为
- 76b2801d: 为了指定组件样式顺序,暂时先切回手动生成 dist/index.less

## 0.6.0-beta.8

### Patch Changes

- ac96f907: CDetail: 标题 status 样式修复

## 0.6.0-beta.7

### Minor Changes

- 5c8564cd: 主题包切换到火山引擎 3.0 规范 @arco-design/theme-volcengine-ui-v3

### Patch Changes

- d0625583: fix CTableTransfer docs
- 0ea66d7c: **CInfoSection**: CInfoSectionData 支持传入 className

## 0.6.0-beta.6

### Patch Changes

- 1e5d45dd: `CModal`添加 formRef 用于获取 form 的 Ref
- 32648ea6: **CForm**: 文档站 CForm 中的内置组件 CRadio 和 CCheckbox 样式未引入

## 0.6.0-beta.5

### Patch Changes

- aa50bd25: 修复 Drawer 无法预览的问题

## 0.6.0-beta.4

### Patch Changes

- e025527e: **CTable**: 解决内置筛选项 searchInput 阴影样式的问题
- 5271879a: CDetail 样式修复
- 29c4654e: **CTable**: 修复 arcoTableProps 中包含 pagination 并当数据为空时报错的问题
- 9482089f: **CTable**: 在组件静态属性上挂载 defineToolbar
- 85a1baef: 修复循环依赖报错
- c2bfa875: Updated dependencies
  - @arco-design/web-react@2.48.1

## 0.6.0-beta.3

### Patch Changes

- 41dafbb6: **CTableEditor**: 解决非受控模式下 tableConfig 中传 data 导致报错的问题
- c032c6c3: **CTableEditor**: 在 CTableEditor 组件静态属性上挂载 defineColumn 和 defineColumns 工具函数
- 3515e9fd: **CCheckbox**: 文档站样式问题

## 0.6.0-beta.2

### Minor Changes

- b7958890: **CCheckbox**: 新增 CCheckbox 组件
  **CRadio**: 支持自定义高度，新增卡片 Demo
  **CRadio**: 新增 `iconLayout` 属性，支持配置图标位置

### Patch Changes

- cc64eba0: `CForm` 优化 form 文档
- f5976037: `CAsyncSelect`: extra 处理优化
- 458c772b: **CTable**: 自定义列功能升级，支持下拉菜单&弹窗两种模式，并支持前端保存
- 8b29bcd7: **CTableEditor**: 解决 tableConfig 中的 extraConfig 不生效的问题
- 06c836f0: 修改 less 产物为自动扫描生成
- 94dcbe11: `CModal`修复 confirm cancelButtonProps 属性不生效的问题

## 0.5.1-beta.1

### Patch Changes

- e32558b0: `CSidebar`提升层级到 1000

## 0.5.1-beta.0

### Patch Changes

- fead0c1b: `CFeeCalculator`: 计费组件支持未传总价时显示-

## 0.5.0

### Minor Changes

- 7d5385ce: `CForm` 1. 支持锚点 2. 导出 form 实例支持
- c5cbf78b: 1. `CTag` 组件 `type` 属性新增 `text-dot`
  2. 优化 `CTag` 组件前缀标签 `closable`、`checkable` 功能

### Patch Changes

- c12036d6: `CForm` 内置组件 `Agreement` 组件支持传入多个协议
- c8459a87: `CForm` 导出 formily arco 和 interface
- 1fac4e3b: `CForm` 去除输入组件固定宽度
- 303787ca: `CForm` 装饰器重新布局
- 7b635910: 1. `CInfoSection` 组件支持在外层传递 hidden/visible 属性
  2. `CInfoSection` 组件修复识别 0 问题
- e834cdb9: **CEllipsis**:新增 `defaultText` 属性，渲染为空时展示的默认文案
- c3b39bb9: `CForm` 支持导出 `Section` 组件
- 23921937: `CForm` helper fieldCallback 工具函数 checker 参数增强,selectFirst 默认 checker 逻辑优化
- d80c3ba5: **CTable**: 表格内字号改为 12px
- 056d3d24: **CTable**: 修复 loadMore 模式下刷新表格触发多次滚动加载的问题
- b0ea1616: **CTable**: 在组件静态属性上挂载 helper 提供帮助函数;增加两个处理 query 的帮助函数
- 462a91e6: **CTable**: 修复 searchInput 内置筛选激活时滚动到页面顶部的问题
- c29d71ae: **CTable**: 分页器改为默认向上弹出以解决在 Tabs 组件中使用被截断的问题
- d45de974: **CTableEditor**: 解决业务仓库中使用 CTableEditor 缺少样式的问题
- f7d39371: `CForm` 内置取消按钮
  `CForm` 修复 `footer` 区域和内容区域分开滚动的问题，修复容器宽度小于 1260px 无法完全显示的问题
  `CFeeCalculator` 计费组件支持退费
  `CFeeCalculator` 新增 `PriceInfo.discountPrecision` 控制折扣和价格的精度
  `CFeeCalculator` 新增 `PriceInfo.detailTitle` 和 `PriceInfo.detailDesc` API
  `CFeeCalculator` 新增 `PriceInfo.popoverProps` API
- 79ad4715: 添加 CTag 依赖组件样式
- 527192cb: `CAsyncSelect`: 修复 renderFormat 的 options 为 null 导致内容不渲染的问题
- 57088433: **CTable**: 修复没有配置 filter 的列也会出现在 fetcher 的 filerValues 中的问题
- 763ad199: 修复 transfer 右侧数据筛选之后回调传递的 key 集合为空
- 07f31674: `CNameInfo`新增属性 nameRenderType,用于配置 name 的渲染方式,默认为 link;原 disableLink 属性调整回透传 Link 组件的 disabled 属性;新增属性 isIconHoverSqueezeWidth,用于调整 icon 在不显示时是否占位问题,默认为 false,不显示时任然占位,不会在 hover 时挤压已显示内容.

  `CStatus`icon 修改 iconbox 版本升级;新增 size 属性,默认值为 default,status 高 20px,字体 12px,支持 large,高 24px,字体 13px

- 7d4c5508: `CFeeCalculator` 组件新增 `deps` 属性
  `CFeeCalculator` 修复 `loading` 无法受控
  `CFeeCalculator` 新增 `PriceInfo.showPopover` 属性
- 23f17573: `CModal` 修复从 arco 拷贝的 confirm info 等函数不受**CConfigProvider.config**影响的问题
- 3bed9658: `CSideBar` 修复 sub menu 子菜单未选中时颜色不对的问题
- 80ce1368: `CModal`修复文档 demo 滚动条失效
- 1b0f54c6: Updated dependencies
  - @arco-design/iconbox-react-cloud@^0.0.38
  - @arco-design/theme-ve-o-design@1.0.10
  - @arco-design/web-react@2.48.0

## 0.5.0-beta.10

### Patch Changes

- 1fac4e3b: `CForm` 去除输入组件固定宽度
- 79ad4715: 添加 CTag 依赖组件样式
- 07f31674: `CNameInfo`新增属性 nameRenderType,用于配置 name 的渲染方式,默认为 link;原 disableLink 属性调整回透传 Link 组件的 disabled 属性;新增属性 isIconHoverSqueezeWidth,用于调整 icon 在不显示时是否占位问题,默认为 false,不显示时任然占位,不会在 hover 时挤压已显示内容.

  `CStatus`icon 修改 iconbox 版本升级;新增 size 属性,默认值为 default,status 高 20px,字体 12px,支持 large,高 24px,字体 13px

- 23f17573: `CModal` 修复从 arco 拷贝的 confirm info 等函数不受**CConfigProvider.config**影响的问题

## 0.5.0-beta.9

### Minor Changes

- 7d5385ce: `CForm` 1. 支持锚点 2. 导出 form 实例支持

### Patch Changes

- d45de974: **CTableEditor**: 解决业务仓库中使用 CTableEditor 缺少样式的问题
- 1b0f54c6: Updated dependencies
  - @arco-design/iconbox-react-cloud@^0.0.38
  - @arco-design/theme-ve-o-design@1.0.10
  - @arco-design/web-react@2.48.0

## 0.5.0-beta.8

### Patch Changes

- 7b635910: 1. `CInfoSection` 组件支持在外层传递 hidden/visible 属性
  2. `CInfoSection` 组件修复识别 0 问题

## 0.5.0-beta.7

### Patch Changes

- c29d71ae: **CTable**: 分页器改为默认向上弹出以解决在 Tabs 组件中使用被截断的问题

## 0.5.0-beta.6

### Minor Changes

- c5cbf78b: 1. `CTag` 组件 `type` 属性新增 `text-dot`
  2. 优化 `CTag` 组件前缀标签 `closable`、`checkable` 功能

### Patch Changes

- e834cdb9: **CEllipsis**:新增 `defaultText` 属性，渲染为空时展示的默认文案
- 57088433: **CTable**: 修复没有配置 filter 的列也会出现在 fetcher 的 filerValues 中的问题

## 0.4.1-beta.5

### Patch Changes

- c3b39bb9: `CForm` 支持导出 `Section` 组件

## 0.4.1-beta.4

### Patch Changes

- 3bed9658: `CSideBar` 修复 sub menu 子菜单未选中时颜色不对的问题

## 0.4.1-beta.3

### Patch Changes

- 462a91e6: **CTable**: 修复 searchInput 内置筛选激活时滚动到页面顶部的问题
- 763ad199: 修复 transfer 右侧数据筛选之后回调传递的 key 集合为空

## 0.4.1-beta.2

### Patch Changes

- c12036d6: `CForm` 内置组件 `Agreement` 组件支持传入多个协议
- 303787ca: `CForm` 装饰器重新布局
- b0ea1616: **CTable**: 在组件静态属性上挂载 helper 提供帮助函数;增加两个处理 query 的帮助函数
- 7d4c5508: `CFeeCalculator` 组件新增 `deps` 属性
  `CFeeCalculator` 修复 `loading` 无法受控
  `CFeeCalculator` 新增 `PriceInfo.showPopover` 属性

## 0.4.1-beta.1

### Patch Changes

- c8459a87: `CForm` 导出 formily arco 和 interface
- 056d3d24: **CTable**: 修复 loadMore 模式下刷新表格触发多次滚动加载的问题
- d3623e16: Updated dependencies
  - @arco-design/web-react@2.47.2

## 0.4.1-beta.0

### Patch Changes

- 23921937: `CForm` helper fieldCallback 工具函数 checker 参数增强,selectFirst 默认 checker 逻辑优化
- d80c3ba5: **CTable**: 表格内字号改为 12px
- f7d39371: `CForm` 内置取消按钮
  `CForm` 修复 `footer` 区域和内容区域分开滚动的问题，修复容器宽度小于 1260px 无法完全显示的问题
  `CFeeCalculator` 计费组件支持退费
  `CFeeCalculator` 新增 `PriceInfo.discountPrecision` 控制折扣和价格的精度
  `CFeeCalculator` 新增 `PriceInfo.detailTitle` 和 `PriceInfo.detailDesc` API
  `CFeeCalculator` 新增 `PriceInfo.popoverProps` API
- 527192cb: `CAsyncSelect`: 修复 renderFormat 的 options 为 null 导致内容不渲染的问题
- 80ce1368: `CModal`修复文档 demo 滚动条失效

## 0.4.0

### Minor Changes

- a89a328e: **CTableEditor**: 新增可编辑表格组件-CTableEditor

### Patch Changes

- 2ff559aa: `CForm` 修复 ArrayItems UI & 刷新问题
- 62e09f3b: 详情页支持在 Header 中展示基本信息
- fa965b0b: **CTableEditor**: `editConfig`支持配置为函数
- 5fd7d9af: **CTableEditor**: 提升受控模式下的性能
- cc5310af: **CTable**: toolbar 的 component 和 componentProps 配置为函数时在参数中加入 tableEditor 实例
- bc5ef34c: `CNameInfo`组件 1.支持 id 可编辑,当前为上下两盒都可复制&编辑; 2.添加 iconHoverDisplay 属性,用于 copy&editicon 非 hover 现实场景。 3.调整 disableLink 属性，Link 组件透传 disabled -> name 是否为 Link 组件渲染。原功能通过 arcoLinkProps.disabled 透传
- 3a90f5f2: `CForm` 内置计费组件的计算结果挂在到 field.data 上
- d4a938cc: `CForm` 内置计费组件的时长和数量挂载到`field.value`上
- 758e3b7b: `CForm` 表单默认装饰器 1.header 支持函数配置 2.footer 样式修复
- 1bba524f: 修复 Tab 详情页带字段信息展示 demo
- 057829ee: 修复 `CCascaderSearch` 在切换字段时会自动跳转到第一条数据的问题
- a097f0c3: 文档删除对 IconVpc IconAcl 的引用
- 895bed60: **CTable**: 增加 `defineConfig`, `defineColumn`, `defineColumns` 并挂载到组件静态属性
- 1c733ed8: **CTable**: 删除无用的 `getComponent`
- 82c04ab3: `CNameInfo`组件 id 复制错误修复
- 03b3c3b2: `CStatus`设计稿修正 icon&text 垂直居中
- 11dd0382: `CModalTable`去掉默认 800 的宽度,按需自定义宽度
- bf4cf93d: `CModal` 修复 onOk 错误泄露到控制台的问题
- 9939efab: `CModal` 修复 ModalForm 确认按钮过大的问题
- 86ece257: `CSideBar` openKeys selectedKeys 支持受控的
- 96b09e57: `CInfoSection`修复 CInlineEdit 内置组件在严格模式下 onSubmit 的参数类型问题
- b2f3f279: 修复使用 webpack4 无法正确构建的问题
- 4ec46f0f: `COperationMenu fix 在有 popover 的情况下，className 会被附加在 popover 的dom 上`
- 53ee984a: `COperationMenu 修复 Popconfirm okButtonProps 未生效`
- f32de1a7: Updated dependencies
  - @arco-design/iconbox-react-cloud@0.0.37
  - @arco-design/theme-ve-o-design@1.0.9
  - @arco-design/web-react@2.47.1
- ef406a2c: `CForm` 内置异步下拉组件支持在依赖项改变时仅重新获取数据源,不重置 value

## 0.4.0-beta.10

### Patch Changes

- cc5310af: **CTable**: toolbar 的 component 和 componentProps 配置为函数时在参数中加入 tableEditor 实例
- 82c04ab3: `CNameInfo`组件 id 复制错误修复
- b2f3f279: 修复使用 webpack4 无法正确构建的问题
- 53ee984a: `COperationMenu 修复 Popconfirm okButtonProps 未生效`

## 0.4.0-beta.9

### Patch Changes

- bf4cf93d: `CModal` 修复 onOk 错误泄露到控制台的问题

## 0.4.0-beta.8

### Patch Changes

- 2ff559aa: `CForm` 修复 ArrayItems UI & 刷新问题
- 62e09f3b: 详情页支持在 Header 中展示基本信息

## 0.4.0-beta.7

### Patch Changes

- fa965b0b: **CTableEditor**: `editConfig`支持配置为函数
- 5fd7d9af: **CTableEditor**: 提升受控模式下的性能
- 11dd0382: `CModalTable`去掉默认 800 的宽度,按需自定义宽度

## 0.4.0-beta.6

### Patch Changes

- 758e3b7b: `CForm` 表单默认装饰器 1.header 支持函数配置 2.footer 样式修复
- a097f0c3: 文档删除对 IconVpc IconAcl 的引用
- f32de1a7: Updated dependencies
  - @arco-design/iconbox-react-cloud@^0.0.37
  - @arco-design/theme-ve-o-design@1.0.8
  - @arco-design/web-react@2.47.1

## 0.4.0-beta.5

### Patch Changes

- 895bed60: **CTable**: 增加 `defineConfig`, `defineColumn`, `defineColumns` 并挂载到组件静态属性
- 1c733ed8: **CTable**: 删除无用的 `getComponent`

## 0.4.0-beta.4

### Minor Changes

- a89a328e: **CTableEditor**: 新增可编辑表格组件-CTableEditor

### Patch Changes

- bc5ef34c: `CNameInfo`组件 1.支持 id 可编辑,当前为上下两盒都可复制&编辑; 2.添加 iconHoverDisplay 属性,用于 copy&editicon 非 hover 现实场景。 3.调整 disableLink 属性，Link 组件透传 disabled -> name 是否为 Link 组件渲染。原功能通过 arcoLinkProps.disabled 透传
- 4ec46f0f: `COperationMenu fix 在有 popover 的情况下，className 会被附加在 popover 的dom 上`

## 0.3.1-beta.3

### Patch Changes

- d4a938cc: `CForm` 内置计费组件的时长和数量挂载到`field.value`上
- 057829ee: 修复 `CCascaderSearch` 在切换字段时会自动跳转到第一条数据的问题
- 86ece257: `CSideBar` openKeys selectedKeys 支持受控的

## 0.3.1-beta.2

### Patch Changes

- 96b09e57: `CInfoSection`修复 CInlineEdit 内置组件在严格模式下 onSubmit 的参数类型问题

## 0.3.1-beta.1

### Patch Changes

- 3a90f5f2: `CForm` 内置计费组件的计算结果挂在到 field.data 上

## 0.3.1-beta.0

### Patch Changes

- 9939efab: `CModal` 修复 ModalForm 确认按钮过大的问题
- ef406a2c: `CForm` 内置异步下拉组件支持在依赖项改变时仅重新获取数据源,不重置 value

## 0.3.0

### Minor Changes

- 74d65234: `CAsyncSelect` 新增 `reload` 属性
  `CForm` 新增 `CAsyncSelect` 内置组件
- 8665a618: `CForm` form-item 使用 storage-formily 中的组件
- 3bf092e9: `CForm` 支持外部传入 form & 修复若干问题
- d4eb5b7b: 修复`cAsyncSelect`组件多选模式下`ifAutoLoadFirst`参数失效的问题
- 83173208: `cAsyncSelect` 组件增加 `initOptions` 参数、reload 依赖修改、demo 优化
- a6f778da: **CAsyncSelect**: 支持 `ref` ，对外暴露 `reset` 方法
  **CAsyncSelect**: 修复 重新加载时、多选模式下 未清除历史搜索内容，导致重新加载时自动选中第一项出现 bug
  **CAsyncSelect**: 修复 `value`和`dataSource`受控的 bug
  **CAsyncSelect**: 修复 fetchData 中固定 pageSize 为 10 的 bug
  **CAsyncSelect**: 修复 搜索模式下，限定仅手动修改搜索值时触发重新加载

### Patch Changes

- 8f407ff1: 修改 CForm 内置异步下拉框组件导出的类型
- 520e2f0e: `CForm` 默认装饰器样式支持全页面布局
- 8a553768: CBatchPasteInput:替换 flex 布局样式中的 start 为 flex-start
- eb698374: `CForm` form-item controlPopover
- bc92a3ed: `CForm` 新增步骤改变前和改变后回调
- 5ea84991: `CForm` 支持注册默认装饰器
- aa8a400d: `CForm` 修复 doc 报错
- 1042ffd7: `CForm` 更新依赖
- 2e89e6b4: `CForm` 样式修复 + ArrayTable 支持响应式
- d1a8e309: `CForm` 修复 datepicker & rangepicker 默认值
- 7d3f60c8: `CForm` 修复 ArrayItems 联动问题
- a263b19b: `CCascaderSearch 过滤传入的无效参数`
- e286127c: `CForm` 新增 `Password`
- 7954ba99: **CTable**: 修复轮询模式下操作表头筛选项时异常的问题
- d68e1913: `table` 支持 onToolbarValueChange 事件
- 063fab00: **CTable**: 自适应宽度计算修改为基于 13px 的字体大小
- 2232df25: **CTable** 解决下载弹窗下载成功后，不会自动关闭的问题
- 782b6cfe: [CTable] 解决 hidden 的列在计算 scrollX 和下载数据时，没有被过滤的问题
- 5caa4e1f: **CTableTransfer**: 默认隐藏 Table 边框
- b5e8c404: **CEllipsis**修改 font-size 值,继承父级元素
- 2faa5333: form demo & style
- 99e58525: `CForm` 样式产物文件修复
- 2f67276c: `CForm` 类型增强, 修复默认 checker 逻辑
- 0dda88f3: `CAsyncSelect` 修复设置`maxTagCount`后的样式问题
- c628d270: `form`修改 style 文件引入路径
- 899be7fa: `CTable` toolbar 中 CSearch 的内置组件 CCascaderSearch 的数据结构变为 { [fieldName]: value }
- 73f8ed6b: **CTable**: 自定义列文案变更为"自定义列表字段"
- 83124dad: `CForm` 修复内置组件 CTableSelect 设置 dataSource 失效问题
  `CFeeType` 修复组件 display 为 error 时，不传入 nextStatusName 不展示计费状态问题
- f92e327a: `CNameInfo` 修复遗漏透传属性
- 8e40d147: `CNameInfo` suffix 和 copy icon 放入`CEllipsis` suffix 计入总宽度计算
- f4955dc0: `CForm`支持配置默认装饰器的 `header` 区和 `top` 区的吸顶模式;修复滚动条位置问题 `bug`
- a96ce5e6: `CForm` footer 支持自适应高度,header 支持定制样式
- 916947ce: 升级 arco-cli 适配 DetailPage 的 api 文档
- b02fe6c5: `CConfigProvider`自动透传上个 context
- c213e981: `CContentWrapper`调整全屏模式下的滚动条位置
- f5bfc0e0: 添加 CForm 静态属性组件 Field,用于和 CForm 内置组件类型保持一致
- 1443f9c9: CModal 和 CDrawer 添加 useMaskableOnOkGuard 用于 onOk 控制
- 38c2a764: `CSideBar`添加文字溢出 popover
- d46aa317: `CSideBar`修复传入 mode 时自动计算覆盖传入值的问题
- 55845ba9: - `CSidebar` 补充 `defaultOpenSubMenu` 属性
  - `CSidebar` 补充 `outerMarkIcon` 属性用于隐藏或自定义配置 `isOuter` 为 true 时的后缀 icon
- b57c2ba7: `ModalForm`将 maskableClose 默认值指定为 false
  `CConfigProvider`修复默认 local 被 arco local 覆盖的问题
- 2dca45fa: `CContentWrapper`修复最小宽度为 1200+60px padding
- 046446a9: `CDrawer`修复 mask: false 时的意外情况
- 7e1cf51c: `CForm` 解决因为使用 typeof function 语法导致的兼容性问题
- 0b29b52a: `CSidebar` 修复 style.width 配置后不生效的问题
- 3ab69346: `CSideBar`修复对 group 类型的菜单收起后未收集 icon 的问题
- 67573e1e: `CSideBar`根据第一层菜单自动计算 mode
- ea01d519: `CSidebar`修复无法匹配动态路由的问题
- b40b1680: `CSidebar` logo 垂直对齐问题修复
  `CSidebar` less 的 tint 函数的兼容性问题
- 0f77a212: `CForm` helper 类型改进
- cf223634: `CForm` 修复 helpertips 多个时展示错误
- 62207cc2: 迁移到 arco-cli2.0
- e9ae767a: `CForm` 添加默认类型提供外部使用
- b63f4be3: CModal CDrawer 的 open 系列函数支持自动推导 form table 的泛型
- 712312fc: `ContentWrapper` 支持传入 prefixCls 用于兼容渐进式迁移
- 9994eab8: `common.CForm` 内置`ConfigPreview`组件`formatter`函数允许返回空,返回空时不显示当前项
- e623b478: 修复文档站的样式问题
- eddf61c8: `CModal`修复 select 等组件弹出后被遮住的问题
- df4bb106: `CStatus`文档占注释与导出修正:StatusProps->CStatusProps
- 91e99076: `CStatus`和`CListEditor`组件,修复颜色变量使用 base-gray-xxx

## 0.3.0-beta.42

### Patch Changes

- 7d3f60c8: `CForm` 修复 ArrayItems 联动问题
- a263b19b: `CCascaderSearch 过滤传入的无效参数`
- d46aa317: `CSideBar`修复传入 mode 时自动计算覆盖传入值的问题
- 046446a9: `CDrawer`修复 mask: false 时的意外情况

## 0.3.0-beta.41

### Patch Changes

- 0dda88f3: `CAsyncSelect` 修复设置`maxTagCount`后的样式问题
- b57c2ba7: `ModalForm`将 maskableClose 默认值指定为 false
  `CConfigProvider`修复默认 local 被 arco local 覆盖的问题

## 0.3.0-beta.40

### Patch Changes

- b02fe6c5: `CConfigProvider`自动透传上个 context
- c213e981: `CContentWrapper`调整全屏模式下的滚动条位置
- 38c2a764: `CSideBar`添加文字溢出 popover
- 91e99076: `CStatus`和`CListEditor`组件,修复颜色变量使用 base-gray-xxx

## 0.3.0-beta.39

### Patch Changes

- 83124dad: `CForm` 修复内置组件 CTableSelect 设置 dataSource 失效问题
  `CFeeType` 修复组件 display 为 error 时，不传入 nextStatusName 不展示计费状态问题
- eddf61c8: `CModal`修复 select 等组件弹出后被遮住的问题

## 0.3.0-beta.38

### Patch Changes

- 7954ba99: **CTable**: 修复轮询模式下操作表头筛选项时异常的问题
- 782b6cfe: [CTable] 解决 hidden 的列在计算 scrollX 和下载数据时，没有被过滤的问题
- b5e8c404: **CEllipsis**修改 font-size 值,继承父级元素
- 9994eab8: `common.CForm` 内置`ConfigPreview`组件`formatter`函数允许返回空,返回空时不显示当前项

## 0.3.0-beta.37

### Patch Changes

- d1a8e309: `CForm` 修复 datepicker & rangepicker 默认值

## 0.3.0-beta.36

### Minor Changes

- 3bf092e9: `CForm` 支持外部传入 form & 修复若干问题

## 0.3.0-beta.35

### Patch Changes

- 8a553768: CBatchPasteInput:替换 flex 布局样式中的 start 为 flex-start
- 3ab69346: `CSideBar`修复对 group 类型的菜单收起后未收集 icon 的问题
- 67573e1e: `CSideBar`根据第一层菜单自动计算 mode

## 0.3.0-beta.34

### Patch Changes

- 2e89e6b4: `CForm` 样式修复 + ArrayTable 支持响应式
- 8e40d147: `CNameInfo` suffix 和 copy icon 放入`CEllipsis` suffix 计入总宽度计算
- 2dca45fa: `CContentWrapper`修复最小宽度为 1200+60px padding
- ea01d519: `CSidebar`修复无法匹配动态路由的问题
- b63f4be3: CModal CDrawer 的 open 系列函数支持自动推导 form table 的泛型

## 0.3.0-beta.33

### Patch Changes

- e623b478: 修复文档站的样式问题

## 0.3.0-beta.32

### Patch Changes

- 73f8ed6b: **CTable**: 自定义列文案变更为"自定义列表字段"

## 0.3.0-beta.31

### Patch Changes

- 1042ffd7: `CForm` 更新依赖

## 0.3.0-beta.30

### Patch Changes

- aa8a400: `CForm` 修复 doc 报错

## 0.3.0-beta.29

### Patch Changes

- b40b168: `CSidebar` logo 垂直对齐问题修复
  `CSidebar` less 的 tint 函数的兼容性问题

## 0.3.0-beta.28

### Patch Changes

- 0b29b52: `CSidebar` 修复 style.width 配置后不生效的问题
- df4bb10: `CStatus`文档占注释与导出修正:StatusProps->CStatusProps

## 0.3.0-beta.27

### Patch Changes

- f4955dc: `CForm`支持配置默认装饰器的 `header` 区和 `top` 区的吸顶模式;修复滚动条位置问题 `bug`
- 0f77a21: `CForm` helper 类型改进

## 0.3.0-beta.26

### Patch Changes

- 1443f9c: CModal 和 CDrawer 添加 useMaskableOnOkGuard 用于 onOk 控制

## 0.3.0-beta.25

### Patch Changes

- cf22363: `CForm` 修复 helpertips 多个时展示错误

## 0.3.0-beta.24

### Patch Changes

- 2232df2: **CTable** 解决下载弹窗下载成功后，不会自动关闭的问题

## 0.3.0-beta.23

### Minor Changes

- 8665a61: `CForm` form-item 使用 storage-formily 中的组件

### Patch Changes

- 2232df2: **CTable** 解决下载弹窗下载成功后，不会自动关闭的问题

## 0.3.0-beta.22

### Patch Changes

- 7e1cf51: `CForm` 解决因为使用 typeof function 语法导致的兼容性问题

## 0.3.0-beta.21

### Patch Changes

- 063fab0: **CTable**: 自适应宽度计算修改为基于 13px 的字体大小

## 0.3.0-beta.20

### Minor Changes

- a6f778d: **CAsyncSelect**: 支持 `ref` ，对外暴露 `reset` 方法
  **CAsyncSelect**: 修复 重新加载时、多选模式下 未清除历史搜索内容，导致重新加载时自动选中第一项出现 bug
  **CAsyncSelect**: 修复 `value`和`dataSource`受控的 bug
  **CAsyncSelect**: 修复 fetchData 中固定 pageSize 为 10 的 bug
  **CAsyncSelect**: 修复 搜索模式下，限定仅手动修改搜索值时触发重新加载

## 0.3.0-beta.19

### Patch Changes

- 99e5852: `CForm` 样式产物文件修复

## 0.3.0-beta.18

### Patch Changes

- 5ea8499: `CForm` 支持注册默认装饰器

## 0.3.0-beta.17

### Patch Changes

- bc92a3e: `CForm` 新增步骤改变前和改变后回调
- 2f67276: `CForm` 类型增强, 修复默认 checker 逻辑

## 0.3.0-beta.16

### Patch Changes

- f5bfc0e: 添加 CForm 静态属性组件 Field,用于和 CForm 内置组件类型保持一致

## 0.3.0-beta.15

### Patch Changes

- eb69837: `CForm` form-item controlPopover

## 0.3.0-beta.14

### Patch Changes

- c628d27: `form`修改 style 文件引入路径

## 0.3.0-beta.13

### Patch Changes

- 2faa533: form demo & style

## 0.3.0-beta.12

### Patch Changes

- 712312f: `ContentWrapper` 支持传入 prefixCls 用于兼容渐进式迁移

## 0.3.0-beta.11

### Patch Changes

- 899be7f: `CTable` toolbar 中 CSearch 的内置组件 CCascaderSearch 的数据结构变为 { [fieldName]: value }

## 0.3.0-beta.10

### Patch Changes

- 520e2f0: `CForm` 默认装饰器样式支持全页面布局

## 0.3.0-beta.9

### Patch Changes

- d68e191: `table` 支持 onToolbarValueChange 事件

## 0.3.0-beta.8

### Patch Changes

- f92e327: `CNameInfo` 修复遗漏透传属性
- 62207cc: 迁移到 arco-cli2.0

## 0.3.0-beta.7

### Patch Changes

- e9ae767: `CForm` 添加默认类型提供外部使用

## 0.3.0-beta.6

### Minor Changes

- d4eb5b7: 修复`cAsyncSelect`组件多选模式下`ifAutoLoadFirst`参数失效的问题

## 0.3.0-beta.5

### Patch Changes

- e286127: `CForm` 新增 `Password`

## 0.3.0-beta.4

### Patch Changes

- 8f407ff: 修改 CForm 内置异步下拉框组件导出的类型

## 0.3.0-beta.3

### Minor Changes

- 74d6523: `CAsyncSelect` 新增 `reload` 属性
  `CForm` 新增 `CAsyncSelect` 内置组件

## 0.3.0-beta.2

### Patch Changes

- 55845ba: - `CSidebar` 补充 `defaultOpenSubMenu` 属性
  - `CSidebar` 补充 `outerMarkIcon` 属性用于隐藏或自定义配置 `isOuter` 为 true 时的后缀 icon

## 0.3.0-beta.1

### Minor Changes

- 8317320: `cAsyncSelect` 组件增加 `initOptions` 参数、reload 依赖修改、demo 优化

## 0.2.1-beta.0

### Patch Changes

- 5caa4e1: **CTableTransfer**: 默认隐藏 Table 边框

## 0.2.0

### Minor Changes

- 452ed77: `CAsyncSelect` 解决多选双行情况样式问题和多选单行样式优化
- 93e55e2: sidebar 支持 renderMenuItem 对 menuItem 进行包裹

### Patch Changes

- 8a23caf: `CSearch` 在 mount 时不执行回调
- dc94795: 云基础统一物料库 MVP Beta 版本发布
- 377cab5: 修复 `CInlineEdit` hover 时的 icon 样式
- 31c6273: `CTable` 默认添加 border 对齐源力主题
- df8d43d: 优化 DrawerForm 和 ModalForm 的 header 展示
- 8955f50: CModal 和 CDrawer 通过 api 打开时也能替换 clsPrefix
- a3d68ad: 修复 CModal 样式未生效的问题
- 7ac4284: `CSidebar` 修复 sidebar matchPath 时 exact 没有默认值的问题
- 5b6f021: `CContentWrapper` 增加 layout 字段以明确布局
- 2b988f2: CContentWrapper 添加自定义 render body 部分的能力

## 0.2.0-beta.11

### Patch Changes

- 8955f50: CModal 和 CDrawer 通过 api 打开时也能替换 clsPrefix

## 0.2.0-beta.10

### Patch Changes

- 31c6273: `CTable` 默认添加 border 对齐源力主题

## 0.2.0-beta.9

### Patch Changes

- 2b988f2: CContentWrapper 添加自定义 render body 部分的能力

## 0.2.0-beta.8

### Patch Changes

- 5b6f021: `CContentWrapper` 增加 layout 字段以明确布局

## 0.2.0-beta.7

### Patch Changes

- 7ac4284: `CSidebar` 修复 sidebar matchPath 时 exact 没有默认值的问题

## 0.2.0-beta.6

### Patch Changes

- 8a23caf: `CSearch` 在 mount 时不执行回调

## 0.2.0-beta.5

### Patch Changes

- a3d68ad: 修复 CModal 样式未生效的问题

## 0.2.0-beta.4

### Minor Changes

- 93e55e2: sidebar 支持 renderMenuItem 对 menuItem 进行包裹

## 0.2.0-beta.3

### Minor Changes

- 452ed77: `CAsyncSelect` 解决多选双行情况样式问题和多选单行样式优化

## 0.1.1-beta.2

### Patch Changes

- df8d43d: 优化 DrawerForm 和 ModalForm 的 header 展示

## 0.1.1-beta.1

### Patch Changes

- 377cab5: 修复 `CInlineEdit` hover 时的 icon 样式

## 0.1.1-beta.0

### Patch Changes

- dc94795: 云基础统一物料库 MVP Beta 版本发布
