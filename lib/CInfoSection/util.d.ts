import type { ReactNode } from 'react';
import type { CInfoSectionProps, ItemProps, CInfoSectionData, CInfoSectionListProps } from './interface';
export declare const conversion: (baseArray: unknown, col: number, direction: CInfoSectionProps['direction']) => any[][];
export declare const calcSpan: (props: {
    arr: (ReactNode | ItemProps)[];
    key: number;
    infoItem: ReactNode | ItemProps;
    colNumber: number;
}) => number;
/**
 * 格式化数据
 * @param props
 * @returns
 */
export declare const formatListData: (props: {
    listData?: CInfoSectionListProps['listData'];
    colNumber?: number | undefined;
    direction?: CInfoSectionProps['direction'];
}) => CInfoSectionData[];
export declare const filterChildrenType: (children: any) => boolean;
/**
 * 格式化 CInfoSection 的 children
 */
export declare const formatSectionChildren: (opts: {
    children: Array<ReactNode> | ReactNode;
    colNumber?: number | undefined;
    direction?: CInfoSectionProps['direction'];
}) => any[][];
