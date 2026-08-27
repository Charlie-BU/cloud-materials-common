import type { TreeTransferDataType } from '../interface';
import type { TreeTransferHelper } from '../class';
import type { TreeNodeProps } from '@arco-design/web-react';

export interface TreeTransferAction extends TreeTransferHelper {
  init: (props?: any) => void;
  getData: (path: string[]) => Promise<TreeTransferDataType[]>;
  handleAddItem: (addItem: TreeNodeProps) => TreeTransferDataType[];
  handleRemoveItem: (removeItem: TreeNodeProps, isFromTarget?: boolean) => TreeTransferDataType[];
  handleSelectAll: (flag: boolean) => TreeTransferDataType[];
  getCheckedKeys: () => { checkedKeys: string[]; halfCheckedKeys: string[] };
  getNewExpandKeys: (item: TreeNodeProps, isChecked: boolean) => string[];
}

export interface RemoteExpandProps {
  onExpand: (expandNode: TreeTransferDataType) => Promise<TreeTransferDataType>;
}
