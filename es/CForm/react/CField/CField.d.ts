/// <reference types="react" />
import type { CFieldConfig, ObjectType } from '../../interface';
declare const CField: {
    <T extends ObjectType = any, D extends ObjectType = any>(props: CFieldConfig<T, D, import("../../interface").DefaultBuiltInComponentMapType> & {
        component?: any[] | undefined;
        children?: any;
    }): JSX.Element;
    displayName: string;
};
export default CField;
