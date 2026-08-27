import type { FlattenTreeMap, TreeTransferDataType } from '../interface';
export declare const findItem: (data: TreeTransferDataType[], key: string | number) => TreeTransferDataType | undefined;
export declare const findItemByPath: (pathParentKeys: (string | number)[], transferTree: TreeTransferDataType[]) => TreeTransferDataType | undefined;
export declare const formatAddItem: (item: TreeTransferDataType) => TreeTransferDataType;
export declare const generateMergeItem: (data: TreeTransferDataType[], pathParentKeys: string[], addItem: TreeTransferDataType) => TreeTransferDataType;
export declare const mergeAddItem: (newItem: TreeTransferDataType, targetData: TreeTransferDataType[]) => TreeTransferDataType[];
export declare const getNodeAllChild: (node: TreeTransferDataType) => string[];
export declare const getSourceCheckedKeys: (sourceData: TreeTransferDataType[], targetFlattenMap: FlattenTreeMap) => {
    checkedKeys: string[];
    halfCheckedKeys: string[];
};
export declare const deleteRemoveItem: ({ removeItem, sourceTree, targetTree, pathParent, }: {
    removeItem: TreeTransferDataType;
    sourceTree?: TreeTransferDataType[] | undefined;
    targetTree?: TreeTransferDataType[] | undefined;
    pathParent: string[];
}) => TreeTransferDataType[];
