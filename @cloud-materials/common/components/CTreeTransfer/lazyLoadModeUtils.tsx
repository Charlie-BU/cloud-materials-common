import React from 'react';
import type { NodeProps } from '@arco-design/web-react/es/Tree/interface';
import type { FlattenTreeMap, TreeTransferDataType } from './interface';
import { cloneDeep, isEqual, set as lodashSet, remove as lodashRemove, last as lodashLast, isEmpty } from 'lodash-es';
import { DataCy, getNodeAllChild } from './utils';
import { Button } from '@arco-design/web-react';
import { IconDocLog, IconFileCloudStorage } from '@arco-design/iconbox-react-ve-o-design';

export const firstLevelLoadingKey = 'first-level';

const findItem = (data: TreeTransferDataType[], key: string | number) => {
  return data.find(item => item.key === key);
};

/**
 * 选中时设置 Item 状态
 */
const setItemStatus = (
  treeItems: TreeTransferDataType[],
  searchInfo: string,
  extraInfo: any,
): TreeTransferDataType[] => {
  return treeItems.map(item => {
    return {
      ...item,
      isCheckAll: true,
      searchInfo: searchInfo,
      extraInfo: extraInfo,
      children: setItemStatus(item.children || [], searchInfo, extraInfo),
    };
  });
};

// 将指定路径的 item children 设置为新的值
const setItemByPath = (
  pathParentKeys: (string | number)[],
  sourceData: TreeTransferDataType[],
  curItem: TreeTransferDataType,
): TreeTransferDataType => {
  if (pathParentKeys.length === 0) {
    return curItem;
  }
  const item = findItem(sourceData, pathParentKeys[0]);
  if (item) {
    const { children = [] } = item;
    return {
      ...item,
      children: [setItemByPath(pathParentKeys.slice(1), children, curItem)] || [],
      extraInfo: isEmpty(item.extraInfo) ? curItem.extraInfo : item.extraInfo,
      isCheckHalf: true,
      isCheckAll: false,
    };
  }
  return item || curItem;
};

// 在懒加载模式下 某个 item 是否已是 checkAll 状态，根据其 isCheckAll 参数与其添加时的 searchInfo 和 当前 extraInfo 对比来确定
// 可能在 A 搜索条件下其为全选，但没有搜索条件或改变条件后变为半选
const isItemCheckAll = (targetItem: TreeTransferDataType, curSearchInfo: string, curExtraInfo: any) => {
  return (
    targetItem.isCheckAll &&
    isEqual(targetItem.searchInfo || '', curSearchInfo || '') &&
    isEqual(targetItem.extraInfo, curExtraInfo)
  );
};

const setItemCheckStatus = ({
  addItem,
  sourceItem,
}: {
  addItem: TreeTransferDataType;
  sourceItem?: TreeTransferDataType;
}) => {
  if (!sourceItem) {
    return;
  }
  if (!addItem.children?.length || addItem.isCheckAll) {
    addItem.isCheckAll = true;
    return;
  }

  addItem.children.forEach(childItem => {
    const sourceChild = sourceItem.children?.find(e => e.key === childItem.key);
    if (sourceChild) {
      setItemCheckStatus({ addItem: childItem, sourceItem: sourceChild });
    }
  });
  const isAllChildCheckAll =
    !addItem.children?.find(item => !item.isCheckAll) &&
    addItem.children.length === sourceItem.children?.length &&
    !sourceItem.hasMore;
  addItem.isCheckAll = isAllChildCheckAll;
};

// 合并当前已选中树与本次新增/发生修改的树节点
const mergeAddItem = ({
  tempData,
  addItemObj,
  curSearchInfo,
  curExtraInfo,
  flattenSourceTreeMap,
}: {
  tempData: TreeTransferDataType[];
  addItemObj: TreeTransferDataType;
  curSearchInfo: string;
  curExtraInfo: any;
  flattenSourceTreeMap: FlattenTreeMap;
}) => {
  if (!addItemObj) {
    return;
  }

  const chosenItemInTargetIndex = tempData.findIndex(item => item.key === addItemObj.key);

  const chosenItemInTarget = chosenItemInTargetIndex > -1 ? tempData[chosenItemInTargetIndex] : undefined;

  // 如果本层无该节点，则直接将新增的节点放入
  if (!chosenItemInTarget) {
    const sourceItem = flattenSourceTreeMap.get(addItemObj.key);
    setItemCheckStatus({ addItem: addItemObj, sourceItem });
    tempData.push({
      ...addItemObj,
      extraInfo: curExtraInfo,
    });
    return;
  }
  const key = chosenItemInTarget.key;
  const sourceItem = flattenSourceTreeMap.get(key);
  // 若本次选中后该节点为全选状态，则将之前的选择内容覆盖
  if (
    !isItemCheckAll(chosenItemInTarget, curSearchInfo, curExtraInfo) &&
    isItemCheckAll(addItemObj, curSearchInfo, curExtraInfo)
  ) {
    lodashSet(tempData, chosenItemInTargetIndex, addItemObj);
    return;
  }
  // 继续 merge 其子节点
  (addItemObj.children || []).forEach(childItem => {
    mergeAddItem({
      tempData: chosenItemInTarget.children || [],
      addItemObj: childItem,
      curExtraInfo,
      curSearchInfo,
      flattenSourceTreeMap,
    });
  });

  if (!isEqual(chosenItemInTarget.searchInfo, curSearchInfo) || !isEqual(chosenItemInTarget.extraInfo, curExtraInfo)) {
    lodashSet(chosenItemInTarget, 'isCheckAll', false);
  }
  // 若不能继续加载更多，且子节点已全部选中，则设置其 isCheckAll 为 true
  if (sourceItem && !sourceItem.hasMore && sourceItem.children?.length === chosenItemInTarget.children?.length) {
    const isAllChildCheckAll = !chosenItemInTarget.children?.find(item => !item.isCheckAll);
    lodashSet(chosenItemInTarget, 'isCheckAll', isAllChildCheckAll);
  }
};

export const addItemInLazyLoad = ({
  addItem,
  targetTreeData,
  sourceTreeData,
  flattenSourceTreeMap,
  searchStr,
  extraInfo,
}: {
  addItem: NodeProps;
  targetTreeData: TreeTransferDataType[];
  sourceTreeData: TreeTransferDataType[];
  flattenSourceTreeMap: FlattenTreeMap;
  searchStr: string;
  extraInfo: any;
}) => {
  const { pathParentKeys = [], dataRef: itemData } = addItem;
  const tempData = cloneDeep(targetTreeData);
  const sourceItemData = flattenSourceTreeMap.get(itemData?.key || '');
  if (sourceItemData) {
    // 从 sourceData 中取到对应值，避免多加入后续渲染的 “加载数据” 节点
    const newData: TreeTransferDataType = {
      ...sourceItemData,
      isCheckAll: true,
    };
    const itemObj = setItemByPath(pathParentKeys, sourceTreeData, setItemStatus([newData], searchStr, extraInfo)?.[0]);
    mergeAddItem({
      tempData,
      addItemObj: itemObj,
      curSearchInfo: searchStr,
      curExtraInfo: extraInfo,
      flattenSourceTreeMap,
    });
  }
  return tempData;
};

export const getCheckStatusInLazyLoad = ({
  flattenSourceTreeMap,
  flattenTargetTreeMap,
  searchStr,
  extraInfo,
}: {
  flattenTargetTreeMap: FlattenTreeMap;
  flattenSourceTreeMap: FlattenTreeMap;
  searchStr: string;
  extraInfo: any;
}) => {
  let checkedKeys: string[] = [];
  const halfCheckedKeys: string[] = [];
  flattenTargetTreeMap.forEach(item => {
    const key = item.key;

    if (!checkedKeys.includes(key)) {
      const item = flattenTargetTreeMap.get(key);
      const sourceItem = flattenSourceTreeMap.get(key);
      if (item && sourceItem && isItemCheckAll(item, searchStr, extraInfo)) {
        checkedKeys.push(key);
        const childKeys = getNodeAllChild(sourceItem);
        checkedKeys = checkedKeys.concat(childKeys);
      } else {
        halfCheckedKeys.push(key);
      }
    }
  });

  return { checkedKeys, halfCheckedKeys };
};

const deleteItem = ({
  tempData,
  pathParentKeys,
  deleteItemData,
  deleteFormSource,
  flattenSourceTreeMap,
  searchStr,
  extraInfo,
}: {
  tempData: TreeTransferDataType[];
  pathParentKeys: string[];
  deleteItemData: TreeTransferDataType;
  deleteFormSource: boolean;
  flattenSourceTreeMap: FlattenTreeMap;
  searchStr: string;
  extraInfo: any;
}) => {
  if (!pathParentKeys.length) {
    lodashRemove(tempData, e => e.key === deleteItemData.key);
  }
  const item = findItem(tempData, pathParentKeys[0]);
  if (item) {
    // 当 item 为 checkAll 状态，且右侧无 children。 则说明右侧 item 未展开。将左侧展开后的 children 赋值给 targetItem
    if (item.isCheckAll && !item.children?.length) {
      const sourceItem = flattenSourceTreeMap.get(pathParentKeys[0]);
      item.children = setItemStatus(cloneDeep(sourceItem?.children) || [], searchStr, extraInfo);
    }
    deleteItem({
      tempData: item.children || [],
      pathParentKeys: pathParentKeys.slice(1),
      deleteItemData,
      deleteFormSource,
      flattenSourceTreeMap,
      searchStr,
      extraInfo,
    });
    if (isItemCheckAll(item, searchStr, extraInfo) && pathParentKeys.length === 1) {
      const sourceItem = flattenSourceTreeMap.get(lodashLast(pathParentKeys) || '');
      const sourceChildren = sourceItem?.children?.filter(item => item.key !== deleteItemData.key);
      const newChildren = deleteFormSource ? sourceChildren : item.children;
      lodashSet(item, 'children', setItemStatus(newChildren || [], searchStr, extraInfo));
    }
    if (!item.children?.length) {
      lodashRemove(tempData, e => e.key === item.key);
    }
    lodashSet(item, 'isCheckAll', false);
  }
};

export const removeItemInLazyLoad = ({
  removeItem,
  targetTreeData,
  removeFromSource,
  flattenSourceTreeMap,
  searchStr,
  extraInfo,
}: {
  removeItem: NodeProps;
  targetTreeData: TreeTransferDataType[];
  removeFromSource: boolean;
  flattenSourceTreeMap: FlattenTreeMap;
  searchStr: string;
  extraInfo: any;
}) => {
  const { pathParentKeys = [], dataRef: itemData } = removeItem;
  const tempData = cloneDeep(targetTreeData);

  if (itemData) {
    deleteItem({
      tempData,
      pathParentKeys,
      deleteItemData: itemData as TreeTransferDataType,
      deleteFormSource: removeFromSource,
      flattenSourceTreeMap,
      searchStr,
      extraInfo,
    });
  }
  return tempData;
};

/**
 * 全选时使用，将当前 source data 与 target data 融合
 * 只对比第一层数据，target data 中若存在且不是全选状态，则替换已选中项，若不存在则将 source data 中的数据放入
 */
export const addAllSourceInLazyLoad = ({
  sourceTreeData,
  targetTreeData,
  flattenTargetTreeMap,
  searchStr,
  extraInfo,
}: {
  sourceTreeData: TreeTransferDataType[];
  targetTreeData: TreeTransferDataType[];
  flattenTargetTreeMap: FlattenTreeMap;
  searchStr: string;
  extraInfo: any;
}) => {
  const newData = cloneDeep(targetTreeData);
  sourceTreeData?.forEach(nodeItem => {
    const { key } = nodeItem;
    const targetItem = flattenTargetTreeMap.get(key);
    const itemResult = setItemStatus([nodeItem], searchStr, extraInfo)[0];
    if (!targetItem) {
      newData.push(itemResult);
    } else {
      if (!isItemCheckAll(targetItem, searchStr, extraInfo)) {
        const targetItemIndex = newData.findIndex(item => item.key === key);
        lodashSet(newData, targetItemIndex, itemResult);
      }
    }
  });
  return newData;
};

/**
 * 反选全部，移除当前所有 source data
 * 只对比第一层数据
 */
export const removeAllSourceDataInLazyLoad = ({
  targetTreeData,
  sourceTreeData,
}: {
  targetTreeData: TreeTransferDataType[];
  sourceTreeData: TreeTransferDataType[];
}) => {
  return targetTreeData.filter(item => {
    return !sourceTreeData.find(e => e.key === item.key);
  });
};

export const genLoadMoreItem = (
  id: string,
  hasMore: boolean | 'error',
  cssPrefix: (name: TemplateStringsArray) => string,
) => {
  return {
    key: `load-${id}`,
    checkable: false,
    isLoadNode: true,
    icon: <span />,
    isLeaf: true,
    className: cssPrefix`load-more-button`,
    title:
      hasMore === 'error' ? (
        <span>
          <span style={{ color: '#737A87' }}>加载失败，</span>
          <span>点击重试</span>
        </span>
      ) : (
        '点击加载'
      ),
  };
};

export const setRenderData = (
  treeItems: TreeTransferDataType[],
  hasRenderMore: boolean,
  type = 'source',
  cssPrefix: (name: TemplateStringsArray) => string,
  isEmptyShowLoadMore: boolean,
): TreeTransferDataType[] => {
  return treeItems.map(item => {
    const { children = [], hasMore = true, isCheckAll } = item;
    const newChildren = setRenderData(children, hasRenderMore, type, cssPrefix, isEmptyShowLoadMore);
    if (hasRenderMore) {
      const loadNode: TreeTransferDataType = genLoadMoreItem(item.key, hasMore, cssPrefix);

      if (item.children && hasMore && (isCheckAll || type === 'source') && isEmptyShowLoadMore) {
        newChildren.push(loadNode);
      } else if (newChildren.length && hasMore && (isCheckAll || type === 'source')) {
        newChildren.push(loadNode);
      }
    }

    return {
      ...item,
      icon: item.icon || (item.isLeaf ? <IconDocLog /> : <IconFileCloudStorage />),
      children: newChildren.length > 0 ? newChildren : undefined,
      className: cssPrefix`tree-item`,
    };
  });
};

/**
 *   生成实际用来渲染树的数据，会根据是否有更多数据在最后加入一个 loadMore 节点
 */
export const genTreeRenderData = (
  treeItems: TreeTransferDataType[],
  hasRenderMore: boolean,
  type = 'source',
  firstLevelHasMore: boolean | 'error',
  cssPrefix: (name: TemplateStringsArray) => string,
  isEmptyShowLoadMore: boolean,
): TreeTransferDataType[] => {
  if (!treeItems) {
    return [];
  }
  const newTree = setRenderData(treeItems, hasRenderMore, type, cssPrefix, isEmptyShowLoadMore);

  if (firstLevelHasMore) {
    const firstLevelLoadButton = genLoadMoreItem(firstLevelLoadingKey, firstLevelHasMore, cssPrefix);
    newTree.push(firstLevelLoadButton);
  }
  return newTree;
};

export const renderLoadButton = (title: string | React.ReactNode, handleClick: () => void, isLoading?: boolean) => {
  return (
    <Button type="text" onClick={handleClick} loading={isLoading} data-cy={DataCy.loadMoreButton}>
      {isLoading ? '加载中' : title}
    </Button>
  );
};
