import type React from 'react';
export declare enum STATUS {
    INIT = 0,
    START = 1,
    MEASURING = 2,
    END = 3
}
interface CollapseProps {
    /**
     * @zh 包裹列表的父元素
     */
    ref: React.MutableRefObject<any>;
    /**
     * @zh 默认展示行数
     */
    showRows: number;
    /**
     * 数据长度
     */
    length: number;
    /**
     * 默认展示数量
     */
    showCount?: number;
    /**
     * 外层容器宽度
     */
    containerWidth?: number;
    /**
     * 是否默认展开
     */
    defaultExpanded?: boolean;
    /**
     * 受控模式控制
     */
    expanded?: boolean;
}
export declare function useCollapse(props: CollapseProps): readonly [{
    showOpt: boolean;
    expand: boolean;
    sliceIndex: number;
    status: STATUS;
}, {
    handleCollapse: () => void;
    handleExpand: () => void;
}];
export {};
