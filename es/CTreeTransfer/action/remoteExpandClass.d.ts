import type { TreeNodeProps } from '@arco-design/web-react';
import { TreeTransferHelper } from '../class';
import type { TreeTransferDataType } from '../interface';
import type { RemoteExpandProps, TreeTransferAction } from './interface';
export declare class RemoteExpandHelpers extends TreeTransferHelper implements TreeTransferAction {
    props: RemoteExpandProps;
    init: (data: RemoteExpandProps) => void;
    getNodeDataFromSource: (item: TreeNodeProps) => {
        nodeData: TreeTransferDataType | undefined;
        pathParentKeys: string[];
    };
    getNodeDataFromTarget: (item: TreeNodeProps) => {
        nodeData: TreeTransferDataType | undefined;
        pathParentKeys: string[];
    };
    getExpandData: (nodeArr: TreeTransferDataType[], key: string) => Promise<{
        newData: TreeTransferDataType;
        nodeItemIndex: number;
    }>;
    getData: (path: string[]) => Promise<TreeTransferDataType[]>;
    handleAddItem: (addItem: TreeNodeProps) => TreeTransferDataType[];
    handleRemoveItem: (removeItem: TreeNodeProps, isFromSource?: boolean) => TreeTransferDataType[];
    getCheckedKeys: () => {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
    handleSelectAll: (flag: boolean) => TreeTransferDataType[];
    getNewExpandKeys: (item: TreeNodeProps, isChecked: boolean) => string[];
}
