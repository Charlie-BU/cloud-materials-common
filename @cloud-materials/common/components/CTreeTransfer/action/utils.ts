import { cloneDeep, uniqBy } from 'lodash-es';
import type { FlattenTreeMap, TreeTransferDataType } from '../interface';
import { isTwoNodeChildSame } from '../utils';

export const findItem = (data: TreeTransferDataType[], key: string | number) => {
  return data.find(item => item.key === key);
};
export const findItemByPath = (
  pathParentKeys: (string | number)[],
  transferTree: TreeTransferDataType[],
): TreeTransferDataType | undefined => {
  const item = findItem(transferTree, pathParentKeys[0]);
  if (pathParentKeys.length === 1 || !item) {
    return item;
  }
  return findItemByPath(pathParentKeys.slice(1), item.children || []);
};

// 格式化新增的 item。 若本次添加为全选该节点，则将其移到右侧时设置其为叶子节点，不支持展开
export const formatAddItem = (item: TreeTransferDataType): TreeTransferDataType => {
  const childrenData = item.children?.map(formatAddItem);
  const isItemCheckAll = item.isClickCheckAll || !item.children?.length;
  return {
    ...item,
    isLeaf: isItemCheckAll,
    children: isItemCheckAll ? [] : childrenData,
    // 选中时的实际子数据。当全选节点在显示上其为叶子节点，但外层可能有使用此时子数据的需求，因此另外维护该数据
    childrenData: childrenData,
  };
};

// 生成与已选中列表 merge 的数据。其需要有完整的层级结构
export const generateMergeItem = (
  data: TreeTransferDataType[],
  pathParentKeys: string[],
  addItem: TreeTransferDataType,
): TreeTransferDataType => {
  if (!pathParentKeys.length) {
    return formatAddItem(addItem);
  }
  const mergeItem = data.find(item => item.key === pathParentKeys[0]);
  if (mergeItem) {
    return {
      ...mergeItem,
      children: [generateMergeItem(mergeItem.children || [], pathParentKeys.slice(1), addItem)],
    };
  }
  return addItem;
};

export const mergeAddItem = (newItem: TreeTransferDataType, targetData: TreeTransferDataType[]) => {
  // const cloneTargetData = cloneDeep(targetData);
  // 不再每次 clone，耗时较长。在进入时将 clone 后的值传入
  const cloneTargetData = targetData;
  // 找到已选列表中对应节点
  const targetNodeIndex = cloneTargetData.findIndex(item => item.key === newItem.key);
  const targetNode = cloneTargetData[targetNodeIndex];

  // 若无对应节点，则直接将新增节点放入
  if (!targetNode) {
    cloneTargetData.push(newItem);
    return cloneTargetData;
  }
  // 如果本次新选中节点为全选，且已选中节点不为全选（一定，否则不会走到添加逻辑），将当前选中节点中的该节点数据替换为新的添加数据
  if (newItem.isLeaf && !targetNode.isLeaf) {
    cloneTargetData[targetNodeIndex] = newItem;
    return cloneTargetData;
  }

  if (isTwoNodeChildSame(newItem, targetNode)) {
    return cloneTargetData;
  }
  const newChildren: TreeTransferDataType[] = targetNode.children || [];
  newItem.children?.forEach(child => {
    // 如果 targetNode 中已存在子节点与新的节点为叶子结点或子孙节点完全相同，则不进行递归添加
    const targetChildNode = targetNode.children?.find(item => item.key === child.key);
    if (targetChildNode && (targetChildNode.isLeaf || isTwoNodeChildSame(child, targetChildNode))) {
      newChildren.push(targetChildNode);
      return;
    }
    if (!targetChildNode) {
      newChildren.push(child);
      return;
    }
    const data = mergeAddItem(child, targetNode.children || []);
    const newItem = data.find(item => item.key === child.key);
    if (newItem) {
      const childIndex = newChildren.findIndex(item => item.key === newItem.key);
      if (childIndex > -1) {
        newChildren[childIndex] = newItem;
        return;
      }
      newChildren.push(newItem);
    }
  });
  targetNode.children = uniqBy(newChildren, 'key');
  return cloneTargetData;
};

export const getNodeAllChild = (node: TreeTransferDataType) => {
  let childIds = node.children?.map(item => item.key) || [];

  node.children?.forEach(child => {
    childIds = childIds?.concat(getNodeAllChild(child));
  });
  return childIds;
};

export const getSourceCheckedKeys = (sourceData: TreeTransferDataType[], targetFlattenMap: FlattenTreeMap) => {
  let checkedKeys: string[] = [];
  const halfCheckedKeys: string[] = [];
  sourceData.forEach(item => {
    const targetItem = targetFlattenMap.get(item.key);
    if (!targetItem) {
      return;
    }
    if (targetItem?.isLeaf) {
      // 选中节点 isLeaf 为 true,说明其不能展开，状态为全选
      checkedKeys.push(item.key);
      const childIds = getNodeAllChild(item);
      checkedKeys.push(...childIds);
    } else {
      // 可展开时，说明选中了该节点的子节点，该节点为半选状态
      halfCheckedKeys.push(item.key);
      const { checkedKeys: childCheckedKeys, halfCheckedKeys: childHalfCheckedKeys } = getSourceCheckedKeys(
        item.children || [],
        targetFlattenMap,
      );
      checkedKeys = [...checkedKeys, ...childCheckedKeys];
      halfCheckedKeys.push(...childHalfCheckedKeys);
    }
  });
  return { checkedKeys, halfCheckedKeys };
};

export const deleteRemoveItem = ({
  removeItem,
  sourceTree = [],
  targetTree = [],
  pathParent,
}: {
  removeItem: TreeTransferDataType;
  sourceTree?: TreeTransferDataType[];
  targetTree?: TreeTransferDataType[];
  pathParent: string[];
}) => {
  // 一级一级寻找节点，直到找到本次移除节点的层级。
  if (!pathParent.length) {
    // 若当前层级的无以选中节点，则说明其父节点为全选状态，此时应将其设置为 sourceTree - 本次移除节点
    if (!targetTree.length) {
      const newChosenTree = sourceTree.filter(item => item.key !== removeItem.key);
      return newChosenTree;
    }
    // 若当前层级有该节点，则将其移除即可
    return targetTree.filter(item => item.key !== removeItem.key);
  }

  let cloneTargetTree = cloneDeep(targetTree);
  const sourceItem = sourceTree.find(item => item.key === pathParent[0]);
  const targetItem = cloneTargetTree.find(item => item.key === pathParent[0]);

  if (!targetItem) {
    return targetTree;
  }
  // 当前层级选中节点已无子节点，即之前为全选状态。则需要为其 children 赋值为 Source 的下级节点继续进行后续递归操作
  if (targetItem?.isLeaf && sourceItem && !sourceItem?.isLeaf) {
    targetItem.isLeaf = false;
    targetItem.children = sourceItem.children?.map(formatAddItem);
  }

  targetItem.children = deleteRemoveItem({
    removeItem,
    sourceTree: sourceItem?.children,
    targetTree: targetItem?.children,
    pathParent: pathParent.slice(1),
  });

  // 若移除子节点后其子节点列表为空，则将该节点也移除
  if (!targetItem?.children?.length) {
    cloneTargetTree = cloneTargetTree.filter(item => item.key !== targetItem?.key);
  } else {
    // 若移除子节点后其子节点列表不为空，则将该节点 isLeaf 设置为false
    targetItem.isLeaf = false;
  }

  return cloneTargetTree;
};
