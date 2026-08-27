import type { NodeInstance } from '@arco-design/web-react/es/Tree/interface';
import { TransferCheckStrategy } from './interface';
import type { CTreeTransferHooksProps, CTreeTransferProps, FlattenTreeMap, TreeTransferDataType } from './interface';
import type { ReactElement } from 'react';
export declare const getHookProps: (props: CTreeTransferProps) => CTreeTransferHooksProps;
/**
 * 生成 target tree 渲染数据
 * 需遍历整个 source tree，在数据量大的情况下耗时可能较长，后续考虑优化方案
 */
export declare const genTargetTree: (options: {
    data: TreeTransferDataType[];
    keys: string[];
}) => TreeTransferDataType[];
export declare const flattenTreeMap: (treeData: TreeTransferDataType[], map: FlattenTreeMap) => void;
export declare const getNodeAllChild: (node: TreeTransferDataType, isDisableItemNotCheckable?: boolean) => string[];
export declare const getAllChildKeys: (node: TreeTransferDataType, isDisableItemNotCheckable?: boolean) => string[];
export declare const getAllKeys: (tree: TreeTransferDataType[], checkedStrategy?: TransferCheckStrategy, isDisableItemNotCheckable?: boolean) => string[];
export declare const searchTreeRenderData: (treeItems?: TreeTransferDataType[], searchInfo?: string) => TreeTransferDataType[];
export declare const getKeyPath: (treeNode: NodeInstance) => string[];
export declare const getAllNodeKeysWithChildren: (tree: TreeTransferDataType[]) => string[];
export declare const getEmptyContentContent: (emptyContent: ReactElement | boolean) => JSX.Element | undefined;
export declare const getAllNoChildKeys: (flattenTreeMap: FlattenTreeMap) => string[];
export declare const getSourceEmptyChildKey: (nodeData: TreeTransferDataType, flattenTargetTree: FlattenTreeMap) => string[];
export declare const isTwoNodeChildSame: (nodeData: TreeTransferDataType, targetNode: TreeTransferDataType) => boolean;
export declare const DataCy: {
    transfer: string;
    sourceTree: string;
    targetTree: string;
    sourceHeader: string;
    targetHeader: string;
    sourceSearch: string;
    targetSearch: string;
    sourceCheckAll: string;
    targetClear: string;
    loadMoreButton: string;
};
