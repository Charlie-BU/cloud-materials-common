import React from 'react';
import type { AnchorProps } from '@arco-design/web-react';
import type { FormPathPattern } from '@formily/core';
export interface CFormAnchorProps extends AnchorProps {
    anchorInfo: {
        isOn: boolean;
        exclude?: FormPathPattern[];
        /**
         * 生成的锚点层级深度
         * @default 1
         */
        level?: number;
    };
    anrchorScollOffset?: number;
    /**
     * 当前为第几步
     */
    current: number;
}
export declare const CFormAnchor: React.MemoExoticComponent<import("@formily/react").ReactFC<CFormAnchorProps>>;
