import React from 'react';
import type { TableModel } from '../../types';
export declare const LoadMoreCompHeight = 44;
export declare const LoadMore: React.FC<{
    table: TableModel<any>;
}>;
export declare const _LoadMoreTableBodyWrapper: React.ForwardRefRenderFunction<HTMLDivElement, {
    className: string;
    style?: React.StyleHTMLAttributes<HTMLDivElement>;
}>;
export declare const LoadMoreTableBodyWrapper: React.ForwardRefExoticComponent<{
    className: string;
    style?: React.StyleHTMLAttributes<HTMLDivElement> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
