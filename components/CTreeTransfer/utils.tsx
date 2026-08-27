import type { NodeInstance } from '@arco-design/web-react/es/Tree/interface';
import { LoadType, TransferCheckStrategy } from './interface';
import type {
  CTreeTransferHooksProps,
  CTreeTransferProps,
  FlattenTreeMap,
  LocalTreeTransferProps,
  RemoteExpandTreeProps,
  TreeTransferDataType,
} from './interface';
import { difference, isString } from 'lodash-es';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import type { ReactElement } from 'react';
import { DefaultEmptyContent } from './DefaultEmptyContent';
import React from 'react';

const cssPrefix = classNamePrefixFactory('tree-transfer');

export const getHookProps = (props: CTreeTransferProps): CTreeTransferHooksProps => {
  const baseHooksProps = {
    treeData: props.treeData,
    hasLoadMore: props.hasLoadMore || false,
    onSearch: props.onSearch,
    extraInfo: props.extraInfo,
    checkInfo: props.checkInfo,
    checkedStrategy: props.checkedStrategy,
    checkNodeRemove: props.checkNodeRemove,
    isAutoExpandTarget: props.isExpandTarget || false,
    enableRaceCondition: props.enableRaceCondition || false,
    isDisableItemNotCheckable: props.isDisableItemNotCheckable || false,
  };
  if (props.loadType === LoadType.remoteExpand) {
    const curProps = props as RemoteExpandTreeProps;
    return {
      ...baseHooksProps,
      onExpand: curProps.onExpand,
      loadType: curProps.loadType,
      onChange: curProps.onChange,
      value: curProps.targetTreeData,
    };
  }
  if (props.hasLoadMore) {
    return {
      ...baseHooksProps,
      onLoadMoreChange: props.onChange,
      onSourceLoadMore: props.onSourceLoadMore,
      onTargetLoadMore: props.onTargetLoadMore,
      loadMoreValue: props.targetTreeData,
      removeChildConfirmInfo: props.removeChildConfirmInfo,
    };
  }
  const curProps = props as LocalTreeTransferProps;
  return {
    ...baseHooksProps,
    onLocalChange: curProps.onChange,
    localValue: curProps.value,
  };
};

/**
 * 生成 target tree 渲染数据
 * 需遍历整个 source tree，在数据量大的情况下耗时可能较长，后续考虑优化方案
 */
export const genTargetTree = (options: { data: TreeTransferDataType[]; keys: string[] }) => {
  const { data, keys } = options;
  const tempKeys = [...keys];

  const traverse = (curKeys: string[], nodes: TreeTransferDataType[]): TreeTransferDataType[] => {
    const levelValues: TreeTransferDataType[] = [];
    nodes.forEach(item => {
      if (curKeys.includes(item.key)) {
        levelValues.push(item);
      } else {
        const children = traverse(curKeys, item.children || []);
        if (children.length > 0) {
          levelValues.push({
            ...item,
            children: children,
          });
        }
      }
    });
    return levelValues;
  };

  return traverse(tempKeys, data);
};

export const flattenTreeMap = (treeData: TreeTransferDataType[], map: FlattenTreeMap) => {
  treeData?.forEach(item => {
    // lodashSet(map, item.key, item);
    map.set(item.key, item);
    flattenTreeMap(item.children || [], map);
  });
};

export const getNodeAllChild = (node: TreeTransferDataType, isDisableItemNotCheckable = false) => {
  // let childIds = node.children?.map(item => item.key) || [];

  const nodeChildrenInfo = isDisableItemNotCheckable
    ? node.children?.filter(item => !item.disableCheckbox && !item.disabled)
    : node.children;

  let childIds = nodeChildrenInfo?.map(item => item.key) || [];

  node.children?.forEach(child => {
    childIds = childIds?.concat(getNodeAllChild(child, isDisableItemNotCheckable));
  });
  return childIds;
};

export const getAllChildKeys = (node: TreeTransferDataType, isDisableItemNotCheckable = false) => {
  let childIds: string[] = [];
  if (!node?.children?.length) {
    if ((!node.disableCheckbox && !node.disabled) || !isDisableItemNotCheckable) {
      childIds.push(node.key);
    }
  } else {
    node.children.forEach(item => {
      const itemChildIds = getAllChildKeys(item, isDisableItemNotCheckable);
      childIds = [...childIds, ...itemChildIds];
    });
  }
  return childIds;
};

export const getAllKeys = (
  tree: TreeTransferDataType[],
  checkedStrategy = TransferCheckStrategy.all,
  isDisableItemNotCheckable = false,
) => {
  switch (checkedStrategy) {
    case TransferCheckStrategy.child:
      return getAllChildKeys({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
    case TransferCheckStrategy.parent:
      return tree.map(item => item.key);
    default:
      return getNodeAllChild({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
  }
};

// 根据搜索条件过滤数据
export const searchTreeRenderData = (treeItems?: TreeTransferDataType[], searchInfo?: string) => {
  if (!searchInfo) {
    return treeItems || [];
  }
  const loop = (data: TreeTransferDataType[]) => {
    const result: TreeTransferDataType[] = [];
    data.forEach(item => {
      if (isString(item.title)) {
        if (item.title.indexOf(searchInfo) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);

          if (filterData.length) {
            result.push({ ...item, children: filterData });
          }
        }
      }
    });
    return result;
  };

  const searchData = loop(treeItems || []);
  return searchData;
};

export const getKeyPath = (treeNode: NodeInstance) => {
  return [...(treeNode.props.pathParentKeys || []), treeNode.key] as string[];
};

// 获取所有有子节点的节点 key
export const getAllNodeKeysWithChildren = (tree: TreeTransferDataType[]) => {
  let keys: string[] = [];
  const itemHasChildren = tree.filter(item => item.children?.length);

  // const keys = itemHasChildren.map(item => item.key);
  itemHasChildren.forEach(item => {
    keys.push(item.key);
    const childrenKeys = getAllNodeKeysWithChildren(item.children || []);
    keys = keys.concat(childrenKeys);
  });
  return keys;
};

export const getEmptyContentContent = (emptyContent: ReactElement | boolean) => {
  if (emptyContent === false) {
    return undefined;
  }
  if (emptyContent === true) {
    return <DefaultEmptyContent />;
  }
  return emptyContent;
};

// 获取所有无 child 节点的 key
export const getAllNoChildKeys = (flattenTreeMap: FlattenTreeMap) => {
  const arr = Array.from(flattenTreeMap);
  const keys = arr.filter(item => !item[1].children?.length).map(item => item[1].key);
  return keys;
};

export const getSourceEmptyChildKey = (nodeData: TreeTransferDataType, flattenTargetTree: FlattenTreeMap): string[] => {
  const curNodeKey = nodeData.key;
  let key: string[] = [];
  if (!nodeData?.children?.length && curNodeKey) {
    const checkedNode = flattenTargetTree.get(curNodeKey);
    if (checkedNode) {
      const childKeys = getNodeAllChild(checkedNode as TreeTransferDataType);
      key = [curNodeKey, ...childKeys];
    }
  } else if (nodeData?.children?.length) {
    nodeData.children?.forEach(child => {
      const childKeys = getSourceEmptyChildKey(child, flattenTargetTree);
      key = [...key, ...childKeys];
    });
  }
  return key;
};

export const isTwoNodeChildSame = (nodeData: TreeTransferDataType, targetNode: TreeTransferDataType) => {
  const nodeKeys = getAllChildKeys(nodeData);
  const targetKeys = getAllChildKeys(targetNode);
  return difference(nodeKeys, targetKeys).length === 0;
};

export const DataCy = {
  transfer: cssPrefix`transfer`,
  sourceTree: cssPrefix`sourceTree`,
  targetTree: cssPrefix`targetTree`,
  sourceHeader: cssPrefix`sourceHeader`,
  targetHeader: cssPrefix`targetHeader`,
  sourceSearch: cssPrefix`sourceSearch`,
  targetSearch: cssPrefix`targetSearch`,
  sourceCheckAll: cssPrefix`checkAll`,
  targetClear: cssPrefix`clear`,
  loadMoreButton: cssPrefix`loadMoreButton`,
};
