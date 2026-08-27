import React from 'react';
import type { ToolbarItemConfig } from '../../types';
export declare const ToolbarItem: React.FC<{
    config: ToolbarItemConfig;
    onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
}>;
