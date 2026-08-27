import React from 'react';
import type { CellComponentRenderProps } from '../../../../core';
export interface TagProps {
    /** tag列表 */
    tags?: string[] | React.ReactNode[];
    /** 指定超过某个数量收起tag，默认为3 */
    maxTagNum?: number;
    /** tag列表容器样式，一般不需要自定义 */
    tagsContainerStyle?: React.CSSProperties;
    /** tag样式，一般不需要自定义 */
    tagStyle?: React.CSSProperties;
}
export declare const Tag: React.FC<CellComponentRenderProps & TagProps>;
