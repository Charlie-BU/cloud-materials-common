import type React from 'react';
import type { ToolbarConfig as ToolbarConfigCore } from '../../core';
import type { ToolbarItemComponentConfig } from './BuiltInComponent';
import type { AllowEmpty } from './common';
import type { TableModel } from './index';
type R = Record<string, any>;
export type ToolbarItemConfig<T extends R = any, GlobalScopeType extends R = any> = {
    name?: string;
    filterOnChange?: boolean;
    visible?: boolean;
} & ToolbarItemComponentConfig<T, GlobalScopeType>;
export type ToolbarItemGroup<T extends R = any, GlobalScopeType extends R = any> = AllowEmpty<ToolbarItemConfig<T, GlobalScopeType>>[];
export interface ToolbarRowConfig<T extends R = any, GlobalScopeType extends R = any> {
    left?: ToolbarItemGroup<T, GlobalScopeType>;
    right?: ToolbarItemGroup<T, GlobalScopeType>;
}
export interface ToolbarConfig<T extends R = any, GlobalScopeType extends R = any> extends ToolbarConfigCore<T, GlobalScopeType> {
    decorator?: React.FC<{
        table: TableModel<any>;
    }>;
    filterOnChange?: boolean;
    debounceDelay?: number;
    rows?: ToolbarRowConfig<T, GlobalScopeType>[];
    left?: ToolbarItemGroup<T, GlobalScopeType>;
    right?: ToolbarItemGroup<T, GlobalScopeType>;
    bottomLeft?: ToolbarItemGroup<T, GlobalScopeType>;
}
export interface ExportDataModalRef {
    openModal: () => void;
}
export {};
