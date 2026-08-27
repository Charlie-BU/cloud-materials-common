/// <reference types="react" />
export declare const CFormDefaultComponentProps: import("../_factory/builtInComponent").DefineComponentPropsMapType<import("./interface").DefaultBuiltInComponentMapType>;
export declare const CFormDefaultDecoratorProps: import("../_factory/builtInComponent").DefineComponentPropsMapType<import("./interface").DefaultBuiltInComponentMapType>;
export declare const CFormDefaultBuiltInComponentMap: import("./interface").DefaultBuiltInComponentMapType;
export { default as DefaultCFormDecorator } from './react/Components/Decorators/DefaultCFormDecorator';
export declare const CConfigForm: import("./interface").FormType<Omit<{}, never>, import("react").JSXElementConstructor<import("./interface").DefaultCFormDecoratorProps>>;
declare const CForm: import("./interface").FormType<Omit<Omit<{}, never>, keyof import("./interface").DefaultBuiltInComponentMapType> & import("./interface").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("./interface").DefaultCFormDecoratorProps>>;
export * from './helper';
export * from './react/CConfirm';
export default CForm;
export * from './interface';
export * from '@storage-fe/formily-arco';
export { onCFormDataChange } from './react/hooks/effects';
export { default as CField } from './react/CField/CField';
export { default as CFormSchema } from './schemaField';
