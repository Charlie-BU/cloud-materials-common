import type { DrawerProps } from '@arco-design/web-react';
import type { DefaultBuiltInComponentMapType } from '../CForm/interface';
import type { COperationMenuProps } from '../COperationMenu/interface';
import type {
  BaseHooksProps,
  BaseProps,
  BuiltInFormProps,
  StaticMethodsExtraProps,
} from '../_factory/maskableComponent';

/**
 * @title CDrawerProps
 */
export interface CDrawerProps extends BaseProps<Omit<DrawerProps, 'visible'>> {
  /**
   * @zh 标题后面的内容
   */
  titleAfter?: React.ReactNode | COperationMenuProps;
  /**
   * @zh 标题下面的内容
   */
  extraHeader?: React.ReactNode;
  /**
   * @zh 标题下的描述
   */
  headerDescription?: React.ReactNode;
}

/**
 * @title CDrawerHooksProps
 */
export interface CDrawerHooksProps extends CDrawerProps, BaseHooksProps {}

/**
 * @title 默认的 DrawerForm props 类型
 */
export type DefaultCDrawerFormProps = BuiltInFormProps<CDrawerProps, 'config', DefaultBuiltInComponentMapType>;

/**
 * @title 默认的 DrawerFormStep props 类型
 */
export type DefaultCDrawerFormStepProps = BuiltInFormProps<CDrawerProps, 'stepConfig', DefaultBuiltInComponentMapType>;

/**
 * @title 默认的 CDrawer.openForm 参数类型
 */
export type DefaultCDrawerFormOpenArgumentType = StaticMethodsExtraProps<DefaultCDrawerFormProps>;

/**
 * @title 默认的 CDrawer.openFormStep 参数类型
 */
export type DefaultCDrawerFormStepOpenArgumentType = StaticMethodsExtraProps<DefaultCDrawerFormStepProps>;
