import type { FC } from 'react';
import type { ToolbarItemRenderProps } from '../../../../core';
export interface RefreshBtnProps {
    onClick?: () => void;
}
export declare const RefreshBtn: FC<ToolbarItemRenderProps & RefreshBtnProps>;
