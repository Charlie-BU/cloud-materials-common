import type { TreeNodeProps } from '@arco-design/web-react';
import { TreeTransferHelper } from '../class';
import type { TreeTransferDataType } from '../interface';
import type { RemoteExpandProps, TreeTransferAction } from './interface';
import { cloneDeep } from 'lodash-es';
import {
  deleteRemoveItem,
  findItemByPath,
  formatAddItem,
  generateMergeItem,
  getSourceCheckedKeys,
  mergeAddItem,
} from './utils';

export class RemoteExpandHelpers extends TreeTransferHelper implements TreeTransferAction {
  props: RemoteExpandProps;

  init = (data: RemoteExpandProps) => {
    this.props = data;
  };

  getNodeDataFromSource = (item: TreeNodeProps) => {
    const { dataRef, pathParentKeys = [] } = item;
    const nodeData = this.sourceFlattenMap.get(dataRef?.key || '');
    return { nodeData, pathParentKeys };
  };

  getNodeDataFromTarget = (item: TreeNodeProps) => {
    const { dataRef, pathParentKeys = [] } = item;
    const nodeData = this.targetFlattenMap.get(dataRef?.key || '');
    return { nodeData, pathParentKeys };
  };
  getExpandData = async (nodeArr: TreeTransferDataType[], key: string) => {
    const nodeItemIndex = nodeArr.findIndex(item => item.key === key);
    const nodeItem = nodeArr[nodeItemIndex];
    if (nodeItem) {
      const newData = await this.props.onExpand(nodeItem);
      return { newData, nodeItemIndex };
    }
    return { newData: nodeItem, nodeItemIndex };
  };

  // 展开时加载子节点
  getData = async (path: string[]) => {
    const cloneSourceTree = cloneDeep(this.sourceData);
    if (path.length > 1) {
      const nodeParent = findItemByPath(path.slice(0, path.length - 1), cloneSourceTree);
      if (nodeParent?.children) {
        const { newData, nodeItemIndex } = await this.getExpandData(nodeParent.children, path[path.length - 1]);
        nodeParent['children'][nodeItemIndex] = newData;
        return cloneSourceTree;
      }
      return this.sourceData;
    }
    const { newData, nodeItemIndex } = await this.getExpandData(cloneSourceTree, path[0]);
    cloneSourceTree[nodeItemIndex] = newData;
    return cloneSourceTree;
  };

  handleAddItem = (addItem: TreeNodeProps) => {
    const { nodeData, pathParentKeys } = this.getNodeDataFromSource(addItem);
    if (!nodeData) {
      return this.targetData;
    }
    const mergeItem = generateMergeItem(this.sourceData, pathParentKeys, nodeData);
    const cloneTargetTree = cloneDeep(this.targetData);
    const newData = mergeAddItem(mergeItem, cloneTargetTree);
    return newData;
  };

  handleRemoveItem = (removeItem: TreeNodeProps, isFromSource = true) => {
    const { nodeData, pathParentKeys } = isFromSource
      ? this.getNodeDataFromSource(removeItem)
      : this.getNodeDataFromTarget(removeItem);
    if (!nodeData) {
      return this.targetData;
    }
    const newData = deleteRemoveItem({
      removeItem: nodeData,
      sourceTree: this.sourceData,
      targetTree: this.targetData,
      pathParent: pathParentKeys,
    });
    return newData;
  };

  getCheckedKeys = () => {
    return getSourceCheckedKeys(this.sourceData, this.targetFlattenMap);
  };

  handleSelectAll = (flag: boolean) => {
    if (!flag) {
      return [];
    }
    return this.sourceData.map(item => {
      return formatAddItem(item);
    });
  };
  // 获取进行选中/移除操作时新增的展开节点
  getNewExpandKeys = (item: TreeNodeProps, isChecked: boolean) => {
    const { parentKey = '', pathParentKeys = [] } = item;
    if (isChecked) {
      const parentItem = this.targetFlattenMap.get(parentKey);
      // 选中节点时，判断其父节点当前是否已选中，若未选中则将其父节点展开
      if (!parentItem) {
        return pathParentKeys;
      }
      return [];
    }
    // 移除节点时，若本次移除节点在已选列表中不存在，则说明父节点当前为全选，移除后需要将其父节点展开
    const itemKey = item.dataRef?.key || '';
    const curTargetItem = this.targetFlattenMap.get(itemKey);
    if (!curTargetItem) {
      return pathParentKeys;
    }
    return [];
  };
}
