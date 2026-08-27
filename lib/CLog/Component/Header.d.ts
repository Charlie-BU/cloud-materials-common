import React from 'react';
import type { CStatusProps } from '../../CStatus';
import type { COperationMenuProps } from '../../COperationMenu/interface';
import type { OperationItem, LogDataItem } from '../interface';
interface HeaderProps {
    cStatusProps?: CStatusProps;
    title?: React.ReactNode;
    showSearch?: boolean;
    keyWord?: string;
    theme: 'white' | 'black';
    isFullScreen: boolean;
    feedbackType?: 'error' | 'success';
    renderOperation?: (val?: COperationMenuProps) => React.ReactNode;
    controls: any;
    logData?: LogDataItem[];
    operationConfig?: {
        displayNum?: number;
        operations?: OperationItem[];
    };
    extraHeaderContent?: React.ReactNode;
}
export declare const Header: ({ cStatusProps, title, showSearch, keyWord, renderOperation, theme, isFullScreen, controls, logData, operationConfig, extraHeaderContent, }: HeaderProps) => JSX.Element;
export default Header;
