import React from 'react';
import type { ToolbarItemGroup as ToolbarItemGroupConfig } from '../../types';
export declare const ToolbarItemGroup: React.FC<{
    toolbarItems: ToolbarItemGroupConfig<any>;
    onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
}>;
