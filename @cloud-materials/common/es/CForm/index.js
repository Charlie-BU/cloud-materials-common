import { CFormDefaultComponentProps as FormDefaultComponentProps, CFormDefaultDecoratorProps as FormDefaultDecoratorProps, DefaultBuiltInComponentMap, } from './const';
import ConfigForm from './react/CConfigForm';
export var CFormDefaultComponentProps = FormDefaultComponentProps;
export var CFormDefaultDecoratorProps = FormDefaultDecoratorProps;
export var CFormDefaultBuiltInComponentMap = DefaultBuiltInComponentMap;
export { default as DefaultCFormDecorator } from './react/Components/Decorators/DefaultCFormDecorator';
export var CConfigForm = ConfigForm;
var CForm = CConfigForm.registerConfig(CFormDefaultBuiltInComponentMap, {
    defaultDecoratorProps: CFormDefaultDecoratorProps,
    defaultComponentProps: CFormDefaultComponentProps,
});
export * from './helper';
export * from './react/CConfirm';
export default CForm;
export * from './interface';
export * from '@storage-fe/formily-arco';
export { onCFormDataChange } from './react/hooks/effects';
export { default as CField } from './react/CField/CField';
export { default as CFormSchema } from './schemaField';
//# sourceMappingURL=index.js.map