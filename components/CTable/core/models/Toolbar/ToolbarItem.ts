// /**
//  * 该文件暂时弃用，等面临实际场景，需要 toolbar item 的领域模型的时候，再考虑
//  */
// import { define, observable, action } from '@formily/reactive';
// import { ComponentConfig, ComponentProps, JSXComponent, ToolbarItemComponentConfig } from '../../types';
// import { setComputedComponent, formatComponentConfig, setComponentProps } from '../../shared';

// export interface ToolbarItemConfig {
//   name?: string;
//   component?: ToolbarItemComponentConfig;
//   componentProps?: ComponentProps;
//   decorator?: ComponentConfig;
//   decoratorProps?: ComponentProps;
// }

// export class ToolbarItem {
//   // name 主要用于查找 toolbar item
//   name?: string;
//   loading = false;
//   visible = true;
//   config: ToolbarItemConfig;

//   componentType?: JSXComponent;
//   componentProps?: ComponentProps;
//   decoratorType?: JSXComponent;
//   decoratorProps?: ComponentProps;

//   constructor(config: ToolbarItemConfig) {
//     this.config = config;
//     this.initDataFromConfig();
//     this.makeObservable();
//   }

//   get component() {
//     return [this.componentType, this.componentProps];
//   }
//   set component(value: ComponentConfig) {
//     setComputedComponent(this, 'component', value);
//   }
//   get decorator() {
//     return [this.decoratorType, this.decoratorProps];
//   }
//   set decorator(value: ComponentConfig) {
//     setComputedComponent(this, 'decorator', value);
//   }

//   private initDataFromConfig() {
//     const { config } = this;
//     this.name = config.name;
//     this.component = formatComponentConfig(config.component, config.componentProps);
//     this.decorator = formatComponentConfig(config.decorator, config.decoratorProps);
//   }

//   private makeObservable() {
//     const privateAction = {
//       setComponentConfig: action,
//     };

//     define(this, {
//       loading: observable,

//       componentType: observable,
//       componentProps: observable,
//       decoratorType: observable,
//       decoratorProps: observable,
//       component: observable.computed,
//       decorator: observable.computed,

//       setLoading: action,

//       ...privateAction,
//     });
//   }

//   setComponent(component: JSXComponent, props?: ComponentProps) {
//     this.component = component;
//     setComponentProps(this, 'component', props);
//   }
//   setComponentProps(props: ComponentProps) {
//     setComponentProps(this, 'component', props);
//   }
//   setDecorator(component: JSXComponent, props?: ComponentProps) {
//     this.decorator = component;
//     setComponentProps(this, 'decorator', props);
//   }
//   setDecoratorProps(props: ComponentProps) {
//     setComponentProps(this, 'decorator', props);
//   }

//   setLoading(loading: boolean) {
//     this.loading = loading;
//   }
// }
