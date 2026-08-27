import type { CTreeTransferHooksProps, TreeTransferDataType } from './interface';
import type { NodeProps } from '@arco-design/web-react/es/Tree/interface';
import type { TreeTransferAction } from './action/interface';
export declare const useCTreeTransfer: (props: CTreeTransferHooksProps) => {
    data: {
        sourceTree: TreeTransferDataType[];
        targetTree: TreeTransferDataType[];
        checkedKeys: string[];
        halfCheckedKeys: string[];
        totalChosenCount: number;
        checkAllStatus: {
            checked: boolean;
            indeterminate: boolean;
        };
        treeTransferHelper: TreeTransferAction;
        targetExpandKeys: string[];
    };
    action: {
        handleChange: (targetNode: NodeProps, isChecked: boolean, curChecked: string[], isFromSource?: boolean) => Promise<void>;
        handleRemoveInTarget: (removeNode: NodeProps) => void;
        handleCheckAll: (isChecked: boolean) => void;
        handleClear: () => void;
        handleSearch: (searchStr: string, type: 'source' | 'target') => void;
        handleLoadSource: (keyPath: string[]) => Promise<void>;
        handleLoadTarget: (keyPath: string[]) => Promise<void>;
        handleTargetExpandChange: (keys: string[]) => void;
    };
};
