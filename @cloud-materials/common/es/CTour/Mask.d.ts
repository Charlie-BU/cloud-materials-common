import { Portal } from '@arco-design/web-react';
import React from 'react';
import type { PosInfo } from './useTarget';
export interface MaskProps {
    pos?: PosInfo;
    showMask?: boolean;
    style?: React.CSSProperties;
    fill?: string;
    open?: boolean;
    animated?: boolean;
    zIndex?: number;
    disabledInteraction?: boolean;
    getContainer?: React.ComponentProps<typeof Portal>['getContainer'];
}
export declare const Mask: ({ pos, showMask, style, fill, open, animated, zIndex, disabledInteraction, getContainer, }: MaskProps) => JSX.Element;
