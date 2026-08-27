import React from 'react';
import type { ToolbarRowConfig } from '../../types';
export declare const ToolbarRow: React.FC<{
    config: ToolbarRowConfig<any>;
    onChange: (toolbarItemName: string, value: any, shouldSearch: boolean) => void;
}>;
