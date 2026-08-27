/// <reference types="react" />
import type { RulesProps } from '@arco-design/web-react/es/Form/interface';
export declare const ICONS: {
    init: JSX.Element;
    success: JSX.Element;
    error: JSX.Element;
};
export declare const formatRules: <T extends RulesProps<any> & {
    key?: string | number | undefined;
}>(rules: T[]) => (T & {
    key: string | number;
})[];
