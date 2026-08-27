import type { FC } from 'react';
import type { ToolbarItemRenderProps } from '../../../../core';
import type { ColConfigBtnProps } from '../ColConfigBtn';
import type { ExportDataBtnProps } from '../ExportDataBtn';
import type { RefreshBtnProps } from '../RefreshBtn';
type ToConfigUnionType<T extends Record<string, any>, K extends keyof T = keyof T> = K extends keyof T ? {
    component: K | FC<ToolbarItemRenderProps>;
    componentProps?: T[K];
} : never;
type ComponentPropMap = {
    ColConfigBtn: ColConfigBtnProps;
    ExportDataBtn: ExportDataBtnProps;
    RefreshBtn: RefreshBtnProps;
};
export type FunctionBtnConfigItem = ToConfigUnionType<ComponentPropMap> & {
    visible?: boolean | ((options: ToolbarItemRenderProps) => boolean);
};
export interface FunctionBtnListProps {
    btnList: FunctionBtnConfigItem[];
}
export declare const FunctionBtnList: FC<ToolbarItemRenderProps & FunctionBtnListProps>;
export {};
