---
file: index,interface
---

## 通用内置组件
通用内置组件是一套内置组件的开发和使用的解决方案。当你的组件有内置另外一个组件的需求，并为它提供一系列的默认值时，这将是一个减少工作量的好方案。

## 使用
目前 **CSearch、CInfoSection** 等都接入了通用内置组件方案。

### 常规使用
以 CInfoSection.Item 组件的props为例，它的 `content` 属性是经过特殊声明的，你可以通过如下方式来声明content的内容

```tsx
<CInfoSection.Item
  content={{
    component: 'CCopy',
    componentProps: {
      text: '一段可以被copy的文字',
    },
  }}
/>
```

### 注入更多内置组件
当组件本身提供的内置组件无法满足需求时，可以通过组件上的`register`函数来注入更多的内置组件以提高生产效率

```tsx
const NewInfoSectionItem = CInfoSection.Item.register(
  { myComponent: MyComponent },
  {
    myComponent: {
      yourProps: 'default Props',
    },
  },
);

<NewInfoSectionItem
  content={NewInfoSectionItem.defineComponentOptions('myComponent', {
    yourProps: 'override default value'
  })}
/>
```
`register`传入的内容是增量覆盖的，你也可以继续调用 `NewInfoSectionItem.register()`，这在组件的二次开发中极为有用。

目前暂时无法自动将原先的字段替换为带有新内置组件的类型，可以使用组件上的`defineComponentOptions`方法进行类型声明，也具有类型验证的效果。


## 开发（for 物料开发者）
要使你的组件支持该种方案非常简单。
```tsx
import { DefineBuiltInHybridListType, DefineBuiltInHybridType, DefineBuiltInBasicType, useBuiltIn, createBuiltInComponent, DefineComponentPropsMapType } from '../_factory/builtInComponent';

// 1. 声明你的初始内置组件 map
const builtInMap = { BuiltIn, BuiltIn2, BuiltI3 };
// 2. 将支持内置组件的属性的类型声明为以下类型
interface MyComponentProps {
  /**
   * - DefineBuiltInHybridListType 允许 { component: '', componentProps: {} } 及其数组，以及 reactElement boolean string null 等类型传入
   * - DefineBuiltInHybridType 仅允许 { component: '', componentProps: {} } 和 reactElement boolean string null 等类型传入
   * - DefineBuiltInBasicType 仅允许 { component: '', componentProps: {} } 这样的类型传入
   */
  content?: DefineBuiltInHybridListType<typeof builtInMap>
}
// 3. 通过提供的renderBuiltIn方法渲染字段拿到结果
const MyComponent: React.FC<MyComponentProps> = ({ content }) => {
  const { renderBuiltIn } = useBuiltIn();

  return <>{renderBuiltIn(content, {
    // 其他配置（若有）
    commonProps
  })}</>
}
// 4. 创建组件并导出

/* 在渲染时会注入到每个组件的props（若有） */
const commonProps = {
  className: 'my-class',
}

/* 每个组件的默认值（若有） */
const defaultProps: DefineComponentPropsMapType<typeof builtInMap> = {
  BuiltIn: {
    style: {
      color: 'red',
    }
  },
  BuiltIn2: {
    // ...
  }
}

const My = createBuiltInComponent(MyComponent, builtInMap, {
  commonProps,
  defaultProps,
})

export default My;
```
## 属性/Props

%%Props%%
