/* eslint-disable @typescript-eslint/ban-types */
export type PickReactComponentProps<T extends React.JSXElementConstructor<any>> = T extends React.JSXElementConstructor<
  infer P
>
  ? P
  : never;

export type ComponentMapToUnionType<
  T extends Record<string, React.JSXElementConstructor<any>>,
  Params extends any[] = [],
  PropName extends string = 'componentProps',
  K extends keyof T = keyof T,
> = K extends keyof T
  ? {
      component: K;
    } & {
      [key in PropName]?: T[K] extends React.ComponentType<infer P> ? P | ((...params: Params) => P) : never;
    }
  : never;

interface BuiltInExtraProps {
  ref?: React.RefObject<unknown>;
}

export type ToConfigUnionType<T extends ComponentsMap> = ComponentMapToUnionType<T> & BuiltInExtraProps;

type HybridReactChild<T> =
  | T
  | ((React.ReactChild | boolean) & {
      component?: '_';
    }); /* 不用React.ReactNode 是因为里面有个 {} 类型，会导致过于宽泛类型验证残缺 */

type HybridReactNodeArrayAble<T extends any> = HybridReactChild<T> | HybridReactChild<T>[];

/**
 *
 * 声明一个内置组件的默认值map
 */
export type EnhanceComponentProps<
  P extends {},
  M extends Record<string, React.ComponentType<any>>,
  E extends string = 'builtInConfig',
  R extends boolean = false,
> = Omit<P, E> &
  (R extends true
    ? { [key in E]: HybridReactNodeArrayAble<ToConfigUnionType<M>> }
    : { [key in E]?: HybridReactNodeArrayAble<ToConfigUnionType<M>> });

export type DefineComponentPropsMapType<T extends ComponentsMap> = {
  [K in keyof T]?: Partial<PickReactComponentProps<T[K]>>;
};

/**
 *
 * 仅对象形式的联合类型，不能传入其他类型
 */
export type DefineBuiltInBasicType<T extends ComponentsMap> = ToConfigUnionType<T>;

/**
 *
 * 可传入其他类型的混合类型如 boolean ReactChild 等
 */
export type DefineBuiltInHybridType<T extends ComponentsMap> = HybridReactChild<DefineBuiltInBasicType<T>>;

/**
 *
 * 可传入其他类型的混合类型的列表
 */
export type DefineBuiltInHybridListType<T extends ComponentsMap> = HybridReactNodeArrayAble<DefineBuiltInBasicType<T>>;

/**
 * 取component map的联合类型
 */
export type ComponentPropsUnion<
  T extends Record<string, React.ComponentType<any>>,
  K extends keyof T = keyof T,
> = PickReactComponentProps<T[K]>;

export type SpecialProps = Pick<React.HTMLAttributes<HTMLElement>, 'style' | 'className'>;

export type ComponentsMap = Record<string, React.JSXElementConstructor<any>>;

export type BuiltInType<C extends React.JSXElementConstructor<any>, CM extends ComponentsMap> = C & {
  register: <R extends ComponentsMap>(
    componentsMap: R,
    defaultProps?: DefineComponentPropsMapType<Omit<CM, keyof R> & R>,
  ) => BuiltInType<C, Omit<CM, keyof R> & R>;

  defineComponentOptions: <K extends keyof CM>(
    component: K,
    props?: PickReactComponentProps<CM[K]>,
    ref?: React.RefObject<unknown>,
  ) => any; // FIXME 返回了不兼容的类型，只能通过any hack一下，不影响运行

  useBuiltIn: () => BuiltInContextType<CM>;
};

export type BuiltInCreator = <C extends React.JSXElementConstructor<any>, CM extends ComponentsMap>(
  Component: C,
  componentsMap: CM,
  options?: {
    commonProps?: Record<string, any>;
    defaultProps?: DefineComponentPropsMapType<CM>;
  },
) => BuiltInType<C, CM>;

export interface BuiltInContextType<T extends ComponentsMap = ComponentsMap> {
  componentsMap: T;
  renderBuiltIn: (
    builtInContent?: any,
    options?: {
      commonProps?: Record<string, any>;
      defaultPropsMap?: DefineComponentPropsMapType<T>;
    },
  ) => React.ReactNode;
}

type PickComponentMap<T> = T extends DefineBuiltInBasicType<infer P>
  ? P
  : T extends DefineBuiltInHybridType<infer P>
  ? P
  : T extends DefineBuiltInHybridListType<infer P>
  ? P
  : never;

/** 递归将对象类型中的DefineBuiltInHybridType等类型替换为传入的M生成的新类型 */
export type ReplaceType<T, M extends ComponentsMap> = T extends object
  ? {
      [K in keyof T]: string extends keyof PickComponentMap<T[K]>
        ? T[K] extends any[]
          ? Array<ReplaceType<T[K] extends (infer P)[] ? P : never, M>>
          : T[K] extends Function
          ? T[K]
          : ReplaceType<T[K], M>
        : DefineBuiltInHybridListType<PickComponentMap<T[K]>> extends T[K] // 提取ComponentsMap后生成的类型能够再次被extends则说明是匹配到的类型
        ? DefineBuiltInHybridListType<M>
        : DefineBuiltInHybridType<PickComponentMap<T[K]>> extends T[K]
        ? DefineBuiltInHybridType<M>
        : DefineBuiltInBasicType<M>;
    }
  : T;
