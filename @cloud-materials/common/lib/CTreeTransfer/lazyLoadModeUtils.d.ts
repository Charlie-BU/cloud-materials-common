import React from 'react';
import type { NodeProps } from '@arco-design/web-react/es/Tree/interface';
import type { FlattenTreeMap, TreeTransferDataType } from './interface';
export declare const firstLevelLoadingKey = "first-level";
export declare const addItemInLazyLoad: ({ addItem, targetTreeData, sourceTreeData, flattenSourceTreeMap, searchStr, extraInfo, }: {
    addItem: NodeProps;
    targetTreeData: TreeTransferDataType[];
    sourceTreeData: TreeTransferDataType[];
    flattenSourceTreeMap: FlattenTreeMap;
    searchStr: string;
    extraInfo: any;
}) => TreeTransferDataType[];
export declare const getCheckStatusInLazyLoad: ({ flattenSourceTreeMap, flattenTargetTreeMap, searchStr, extraInfo, }: {
    flattenTargetTreeMap: FlattenTreeMap;
    flattenSourceTreeMap: FlattenTreeMap;
    searchStr: string;
    extraInfo: any;
}) => {
    checkedKeys: string[];
    halfCheckedKeys: string[];
};
export declare const removeItemInLazyLoad: ({ removeItem, targetTreeData, removeFromSource, flattenSourceTreeMap, searchStr, extraInfo, }: {
    removeItem: NodeProps;
    targetTreeData: TreeTransferDataType[];
    removeFromSource: boolean;
    flattenSourceTreeMap: FlattenTreeMap;
    searchStr: string;
    extraInfo: any;
}) => TreeTransferDataType[];
/**
 * 全选时使用，将当前 source data 与 target data 融合
 * 只对比第一层数据，target data 中若存在且不是全选状态，则替换已选中项，若不存在则将 source data 中的数据放入
 */
export declare const addAllSourceInLazyLoad: ({ sourceTreeData, targetTreeData, flattenTargetTreeMap, searchStr, extraInfo, }: {
    sourceTreeData: TreeTransferDataType[];
    targetTreeData: TreeTransferDataType[];
    flattenTargetTreeMap: FlattenTreeMap;
    searchStr: string;
    extraInfo: any;
}) => TreeTransferDataType[];
/**
 * 反选全部，移除当前所有 source data
 * 只对比第一层数据
 */
export declare const removeAllSourceDataInLazyLoad: ({ targetTreeData, sourceTreeData, }: {
    targetTreeData: TreeTransferDataType[];
    sourceTreeData: TreeTransferDataType[];
}) => TreeTransferDataType[];
export declare const genLoadMoreItem: (id: string, hasMore: boolean | 'error', cssPrefix: (name: TemplateStringsArray) => string) => {
    key: string;
    checkable: boolean;
    isLoadNode: boolean;
    icon: JSX.Element;
    isLeaf: boolean;
    className: string;
    title: string | JSX.Element;
};
export declare const setRenderData: (treeItems: TreeTransferDataType[], hasRenderMore: boolean, type: string | undefined, cssPrefix: (name: TemplateStringsArray) => string, isEmptyShowLoadMore: boolean) => TreeTransferDataType[];
/**
 *   生成实际用来渲染树的数据，会根据是否有更多数据在最后加入一个 loadMore 节点
 */
export declare const genTreeRenderData: (treeItems: TreeTransferDataType[], hasRenderMore: boolean, type: string | undefined, firstLevelHasMore: boolean | 'error', cssPrefix: (name: TemplateStringsArray) => string, isEmptyShowLoadMore: boolean) => TreeTransferDataType[];
export declare const renderLoadButton: (title: string | React.ReactNode, handleClick: () => void, isLoading?: boolean) => JSX.Element;
