import type { IFormLayoutProps } from '@storage-fe/formily-arco/es/FormLayout';
import type { DefaultBuiltInComponentMapType } from './interface';
import type { DefineComponentPropsMapType } from '../_factory/builtInComponent';
export declare const ReloadPrefixKey = "_c_reload_with_";
export declare const SubFieldValidKey = "__SubFieldValid";
/**
 * 表单级联数据存储于 GlobalScope 中的 Key
 */
export declare const FormFieldCascadeConfigKey = "__FormFieldCascadeConfigKey";
export declare const CFormPrefixName = "___c-m-cform___";
export declare const DefaultLayout: IFormLayoutProps;
export declare const DefaultBuiltInComponentMap: DefaultBuiltInComponentMapType;
export declare const CFormDefaultDecoratorProps: DefineComponentPropsMapType<DefaultBuiltInComponentMapType>;
export declare const CFormDefaultComponentProps: DefineComponentPropsMapType<DefaultBuiltInComponentMapType>;
