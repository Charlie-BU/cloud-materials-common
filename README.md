# 云物料库

> 离线消费说明：此仓库已附带 `@cloud-materials/common@1.20.1` 的运行时依赖树，供外网 Vite 项目直接消费；无需、也不要在本仓库执行 `pnpm install`，否则会尝试解析原始依赖中的字节内部包。

## 外网项目使用

```bash
git clone git@github.com:Charlie-BU/cloud-materials-common.git ../../cloud-materials-common
```

在消费项目的 Vite 配置中，将 `@cloud-materials/common` alias 到：

```text
../../cloud-materials-common/@cloud-materials/common
```

仓库根目录 `node_modules/.pnpm` 和其中的符号链接是离线运行时依赖，必须一并保留。它们使 Vite 可以按标准 Node 解析规则找到组件库依赖，因此不会访问字节内网 registry。

[物料平台文档中心](https://arco.bytedance.net/material/group/?groupId=85&tab=group_material&module=%40cloud-materials%2Fcommon%2FQuickStart)

## 快速开始

**在 `npm run dev` 前，请运行 `npm run add:component -- ComponentName` 创建第一个组件，否则 dev 将会因缺少 Story 入口而报错。**

```
# 添加组件
npm run add:component -- YourComponentName

# 开发模式
npm run dev

# 构建
npm run build
```

## 样式

在 `components/style` 下，你可以编写全局样式。

`components/*/style/index.tsx` 用于组件样式的按需加载，你需要在此文件中声明该组件依赖的其他组件样式。 例如：组件 A 内使用到了组件 B，则按需加载 A 的样式时同样需要加载 B 的样式，故需要在 `components/A/style/index.tsx` 中声明 `import '../../B/style'`。


## 提供 Demo

Demo 目录位于 `components/*/demo`。在 `demo/index.js` 中，通过 JSDoc 的语法提供物料及各个 Demo 的相关信息。

```javascript
// src/demo/index.js

/**
 * @file
 * @title 名称
 * @memberOf 数据录入
 * @description 一段对于物料的描述。
 * @author 物料作者
 */

/**
 * @title 基础用法
 * @description 一个物料最基本的使用方式。
 */
export { default as Basic } from './basic';
```

## API 文档

**为了帮助他人更好地使用你的组件，请提供详细的 API 文档。**

### 书写注释

我们提供了自动化的文档生成工具，它从 TS 接口定义中提取注释自动生成属性文档。按照以下指引使用，为接口书写 tsDoc 类型的注释：

```typescript
/**
 * @title Button (必填，带有 `title` 描述的接口或者类型才会被收集)
 */
interface ButtonProps {
  /**
   * @zh 按钮尺寸 (属性的中文描述)
   * @en Size of Button (属性的英文描述)
   * @version 1.2.0 (可选，新增的属性在哪个版本开始支持)
   * @defaultValue 'default' (可选，属性的默认值)
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 按钮状态
   * @en Status of Button
   */
  status?: 'danger' | 'error' | 'success';
}
```

### 扩展 TEMPLATE.md

`TEMPLATE.md` 是用于自动文档生成的模板，你可以修改此文件添加更多组件的使用帮助信息，但请不要删除其原有的内容，否则可能导致内容替换失败。

```markdown
// TEMPLATE.md
---
file: index,interface (可以指定多个文档提取的入口文件，使用逗号隔开)
---

# TooltipButton

## 属性/Props

%%Props%%

### OtherProps

在这里你可以书写更多组件帮助文档。

## Demos

%%Demos%%
```

## 测试

测试目录位于 `components/*/__test__`。你可以在 `index.test.tsx` 中编写你的测试用例，在 `demo.test.tsx` 中可以进行基于 Demo 的快照测试。

`npm run test` 命令允许你传入任何 `jest` 的命令行参数，例如 `npm run test -- --u` `npm run test -- --no-cache`。
