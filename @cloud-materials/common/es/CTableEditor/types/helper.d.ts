import type { ObjectType, CVoidFieldProps, CFieldProps, PureComponentsMap, DefaultBuiltInComponentMapType } from '../../CForm/interface';
import type { ROW_KEY } from '../constants';
export type R = Record<string, any>;
export type WithRowKey = {
    [ROW_KEY]: string;
};
export type ValueWithRowKey = R & WithRowKey;
export type CFieldConfigOmitName<T extends ObjectType = any, D extends ObjectType = any, ComponentsMap extends PureComponentsMap = any> = Omit<{
    type: 'VoidField';
} & CVoidFieldProps<T, D, ComponentsMap>, 'name'> | Omit<{
    type?: 'Field' | 'ArrayField' | 'ObjectField';
} & CFieldProps<T, D, ComponentsMap>, 'name'>;
/** TableEditor 中使用的 CFieldConfig  */
export type CFieldConfig<ValueType extends ObjectType = any, DataType extends ObjectType = any, ComponentsMap extends PureComponentsMap = DefaultBuiltInComponentMapType> = CFieldConfigOmitName<ValueType, DataType, ComponentsMap>;
