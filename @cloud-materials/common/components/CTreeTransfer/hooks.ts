import { useEffect, useState, useMemo } from 'react';
import { LoadType, TransferCheckStrategy } from './interface';
import type { CTreeTransferHooksProps, FlattenTreeMap, TreeTransferDataType } from './interface';
import type { NodeProps } from '@arco-design/web-react/es/Tree/interface';
import {
  flattenTreeMap,
  genTargetTree,
  getAllKeys,
  getAllNoChildKeys,
  getNodeAllChild,
  searchTreeRenderData,
} from './utils';
import { difference, uniq } from 'lodash-es';
import {
  addAllSourceInLazyLoad,
  addItemInLazyLoad,
  getCheckStatusInLazyLoad,
  removeAllSourceDataInLazyLoad,
  removeItemInLazyLoad,
} from './lazyLoadModeUtils';
import { TreeTransferHelper } from './class';
import CModal from '../CModal';
import { RemoteExpandHelpers } from './action/remoteExpandClass';
import type { TreeTransferAction } from './action/interface';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';

export const useCTreeTransfer = (props: CTreeTransferHooksProps) => {
  const {
    treeData,
    hasLoadMore,
    localValue,
    extraInfo,
    loadMoreValue,
    removeChildConfirmInfo,
    checkInfo: defaultCheckInfo,
    checkedStrategy = TransferCheckStrategy.all,
    loadType,
    isAutoExpandTarget = false,
    onSearch,
    onLoadMoreChange,
    onLocalChange,
    onSourceLoadMore,
    onTargetLoadMore,
    onExpand,
    onChange,
    checkNodeRemove,
    value,
    enableRaceCondition,
    isDisableItemNotCheckable,
  } = props;

  const treeTransferHelper = useMemo(() => {
    // 创建 treeTransferHelper 实例
    return (
      loadType === LoadType.remoteExpand ? new RemoteExpandHelpers() : new TreeTransferHelper()
    ) as TreeTransferAction;
  }, [loadType]);

  const safeOnSourceLoadMore = useSafeRace(onSourceLoadMore, { enabled: enableRaceCondition });
  const safeOnTargetLoadMore = useSafeRace(onTargetLoadMore, { enabled: enableRaceCondition });
  const safeOnExpand = useSafeRace(onExpand, { enabled: enableRaceCondition });

  const [sourceTree, setSourceTree] = useState<TreeTransferDataType[]>(treeData);
  const [targetTree, setTargetTree] = useState<TreeTransferDataType[]>([]);

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]);
  const [totalChosenCount, setTotalChosenCount] = useState(0);
  const [checkAllStatus, setCheckAllStatus] = useState({ checked: false, indeterminate: false });
  // target tree 展开节点 keys，其需要在节点被移除时移除对应 key
  const [targetExpandKeys, setTargetExpandKeys] = useState<string[]>([]);

  const handleRemoveTargetExpandKey = (removeKeyArr: string[]) => {
    setTargetExpandKeys(prev => {
      return prev.filter(key => !removeKeyArr.includes(key));
    });
  };

  const handleRemoveExpandInTargetChange = () => {
    const removeKeys = getAllNoChildKeys(treeTransferHelper.targetFlattenMap);
    handleRemoveTargetExpandKey(removeKeys);
  };

  const handleChange = async (targetNode: NodeProps, isChecked: boolean, curChecked: string[], isFromSource = true) => {
    if (loadType === LoadType.remoteExpand) {
      let newData: TreeTransferDataType[] = [];
      const { parentKey = '' } = targetNode;
      if (isChecked) {
        newData = treeTransferHelper.handleAddItem(targetNode);
      } else {
        const isParentCheck = checkedKeys.includes(parentKey);
        let isRemove = true;
        if (checkNodeRemove) {
          isRemove = await checkNodeRemove(isParentCheck, targetNode);
        }
        if (isRemove) {
          newData = treeTransferHelper.handleRemoveItem(targetNode, isFromSource);
        }
      }
      onChange?.(newData);
      const newExpandKeys = treeTransferHelper.getNewExpandKeys(targetNode, isChecked);
      setTargetExpandKeys(uniq([...targetExpandKeys, ...newExpandKeys]));
      return;
    }

    if (!hasLoadMore) {
      onLocalChange?.(curChecked);
    } else {
      const { parentKey = '' } = targetNode;
      if (isChecked) {
        const newData = addItemInLazyLoad({
          addItem: targetNode,
          targetTreeData: treeTransferHelper.targetData,
          sourceTreeData: sourceTree,
          flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
          extraInfo: extraInfo,
          searchStr: treeTransferHelper.sourceSearchStr,
        });
        onLoadMoreChange?.(newData || []);
      } else {
        let confirmStatus = true;
        if (
          (defaultCheckInfo?.checkedKeys || checkedKeys).includes(parentKey) &&
          removeChildConfirmInfo?.isShowConfirm
        ) {
          confirmStatus = await CModal.confirm({
            title: removeChildConfirmInfo?.title,
            content: removeChildConfirmInfo?.content,
          });
        }
        if (confirmStatus) {
          const newData = removeItemInLazyLoad({
            removeItem: targetNode,
            targetTreeData: treeTransferHelper.targetData,
            flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
            removeFromSource: isFromSource,
            extraInfo: extraInfo,
            searchStr: treeTransferHelper.sourceSearchStr,
          });
          onLoadMoreChange?.(newData || []);
        }
      }
    }
  };

  const handleRemoveInTarget = (removeNode: NodeProps) => {
    if (loadType === LoadType.remoteExpand) {
      handleChange(removeNode, false, [], false);
    }
    const { pathParentKeys = [], dataRef } = removeNode;
    if (dataRef) {
      if (!hasLoadMore && localValue) {
        const parentKeys = pathParentKeys;
        const childKeys = getNodeAllChild(dataRef as TreeTransferDataType);
        const keyArr = [...parentKeys, ...childKeys, dataRef.key];
        onLocalChange?.(
          localValue.filter(item => {
            return !keyArr.includes(item);
          }),
        );
      } else if (hasLoadMore) {
        handleChange(removeNode, false, [], false);
      }
    }
  };

  const handleCheckAll = (isChecked: boolean) => {
    if (loadType === LoadType.remoteExpand) {
      const newData = treeTransferHelper.handleSelectAll(isChecked);
      onChange?.(newData);
      setCheckAllStatus({ checked: isChecked, indeterminate: false });
    }

    if (!hasLoadMore) {
      const curKeys = getAllKeys(sourceTree, checkedStrategy, isDisableItemNotCheckable);
      if (isChecked) {
        onLocalChange?.(uniq([...checkedKeys, ...curKeys]));
      } else {
        const newValues = checkedKeys.filter(key => !curKeys.includes(key));
        onLocalChange?.(newValues);
      }
      return;
    }

    if (isChecked) {
      const newData = addAllSourceInLazyLoad({
        sourceTreeData: sourceTree,
        targetTreeData: treeTransferHelper.targetData,
        flattenTargetTreeMap: treeTransferHelper.targetFlattenMap,
        searchStr: treeTransferHelper.sourceSearchStr,
        extraInfo,
      });
      onLoadMoreChange?.(newData);
    } else {
      const newData = removeAllSourceDataInLazyLoad({
        sourceTreeData: sourceTree,
        targetTreeData: treeTransferHelper.targetData,
      });
      onLoadMoreChange?.(newData);
    }
  };

  const handleClear = () => {
    if (!hasLoadMore) {
      onLocalChange?.([]);
      return;
    }
    setTargetExpandKeys([]);
    onLoadMoreChange?.([]);
  };

  const handleSetCheckAllStatus = (sourceKeys: string[], checkedKeys: string[]) => {
    const differenceArr = difference(sourceKeys, checkedKeys);
    const isCheckAll = differenceArr.length === 0;
    const isIndeterminate = isCheckAll ? false : differenceArr.length < sourceKeys.length;
    setCheckAllStatus({ checked: isCheckAll, indeterminate: isIndeterminate });
  };

  const handleCheckStatusChange = () => {
    const sourceKeys = getAllKeys(sourceTree, checkedStrategy, isDisableItemNotCheckable);
    if (!hasLoadMore) {
      handleSetCheckAllStatus(sourceKeys, checkedKeys);
    } else {
      const checkedInfo = getCheckStatusInLazyLoad({
        flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
        flattenTargetTreeMap: treeTransferHelper.targetFlattenMap,
        searchStr: treeTransferHelper.sourceSearchStr,
        extraInfo: extraInfo,
      });
      setCheckedKeys(checkedInfo.checkedKeys);
      setHalfCheckedKeys(checkedInfo.halfCheckedKeys);
      handleSetCheckAllStatus(sourceKeys, checkedInfo.checkedKeys);
    }
  };

  // 当需要自动展开时，设置新的展开项。获取到本次新增的且不为叶子节点的项展开
  const handleExpandAfterValueChange = (flattenTargetMap: FlattenTreeMap) => {
    if (!isAutoExpandTarget) {
      return;
    }
    const targetTreeKeys = Array.from(flattenTargetMap.keys());
    const newKeys = difference(targetTreeKeys, [...checkedKeys, ...halfCheckedKeys]);
    const newExpandKeys = newKeys.filter(item => {
      return !flattenTargetMap.get(item)?.isLeaf;
    });
    if (!newExpandKeys?.length) {
      return;
    }
    setTargetExpandKeys(uniq([...targetExpandKeys, ...newExpandKeys]));
  };

  const handleSearch = (searchStr: string, type: 'source' | 'target') => {
    if (onSearch) {
      onSearch(searchStr, type);
      return;
    }
    if (type === 'source') {
      const searchData = searchTreeRenderData(treeData, searchStr);
      setSourceTree(searchData);
      treeTransferHelper.setSourceSearchStr(searchStr);
    } else {
      const searchData = searchTreeRenderData(treeTransferHelper.targetData, searchStr);
      setTargetTree(searchData);
      treeTransferHelper.setTargetSearchStr(searchStr);
    }
  };

  const handleLoadSource = async (keyPath: string[]) => {
    if (loadType === LoadType.remoteExpand) {
      const data = await treeTransferHelper.getData(keyPath || []);
      setSourceTree(data);
      return;
    }

    if (safeOnSourceLoadMore) {
      await safeOnSourceLoadMore(keyPath || []);
    }
  };

  const handleLoadTarget = async (keyPath: string[]) => {
    if (safeOnTargetLoadMore) {
      await safeOnTargetLoadMore(keyPath || []);
    }
  };

  const setTargetInfo = (treeData: TreeTransferDataType[]) => {
    treeTransferHelper.setTargetData(treeData);
    if (treeTransferHelper.targetSearchStr) {
      const searchData = searchTreeRenderData(treeData, treeTransferHelper.targetSearchStr);
      setTargetTree(searchData);
    } else {
      setTargetTree(treeData);
    }
  };

  const handleTargetExpandChange = (keys: string[]) => {
    setTargetExpandKeys(keys);
  };

  const handleCheckedKeys = () => {
    const { checkedKeys, halfCheckedKeys } = treeTransferHelper.getCheckedKeys();
    setCheckedKeys(checkedKeys);
    setHalfCheckedKeys(halfCheckedKeys);
  };

  const handleSetLocalModeTree = () => {
    if (localValue) {
      const curTargetTree = genTargetTree({ data: [...treeData], keys: localValue });
      setTargetInfo(curTargetTree);
      setCheckedKeys(localValue);
      setTotalChosenCount(localValue.length);
      const targetFlattenMap: FlattenTreeMap = new Map();
      flattenTreeMap(curTargetTree, targetFlattenMap);
      // 当需要自动展开时，设置新的展开项。获取到本次新增的且不为叶子节点的项展开
      handleExpandAfterValueChange(targetFlattenMap);
    }
  };

  useEffect(() => {
    setSourceTree(treeData);
    if (!targetTree?.length) {
      handleSetLocalModeTree();
    }
  }, [treeData]);

  useEffect(() => {
    handleSetLocalModeTree();
  }, [localValue]);

  useEffect(() => {
    if (loadType === LoadType.remoteExpand) {
      if (!targetTree.length) {
        setCheckAllStatus({ checked: false, indeterminate: false });
      }
      return;
    }
    if (!targetTree.length) {
      if (!hasLoadMore) {
        setCheckAllStatus({ checked: false, indeterminate: false });
        return;
      }
      setCheckAllStatus({ checked: false, indeterminate: false });
      setCheckedKeys([]);
      setHalfCheckedKeys([]);
    } else {
      handleExpandAfterValueChange(treeTransferHelper.targetFlattenMap);
      handleCheckStatusChange();
    }
  }, [sourceTree, targetTree]);

  // 懒加载模式的值变化
  useEffect(() => {
    if (loadMoreValue && hasLoadMore) {
      setTargetInfo(loadMoreValue);
      const targetFlattenMap = new Map();
      flattenTreeMap(loadMoreValue, targetFlattenMap);
      treeTransferHelper.setTargetFlattenMap(targetFlattenMap);
      // 每次 target 值发生变化时，遍历 targetFlattenMap，将已展开但无 children 项的展开状态收起
      // 在懒加载模式下才会执行
      handleRemoveExpandInTargetChange();
    }
  }, [loadMoreValue]);

  useEffect(() => {
    if (loadType === LoadType.remoteExpand) {
      treeTransferHelper?.init({
        onExpand: safeOnExpand,
      });
    }
  }, [treeTransferHelper]);

  useEffect(() => {
    const sourceFlattenMap = new Map();
    flattenTreeMap(sourceTree, sourceFlattenMap);
    treeTransferHelper.setSourceFlattenMap(sourceFlattenMap);
    treeTransferHelper.setSourceData(sourceTree);
    if (loadType === LoadType.remoteExpand) {
      handleCheckedKeys();
    }
  }, [sourceTree]);

  useEffect(() => {
    if (!(loadType === LoadType.remoteExpand)) {
      return;
    }
    setTargetTree(value || []);
    const targetFlattenMap = new Map();
    flattenTreeMap(value || [], targetFlattenMap);
    treeTransferHelper.setTargetFlattenMap(targetFlattenMap);
    treeTransferHelper.setTargetData(value || []);

    handleCheckedKeys();
    handleRemoveExpandInTargetChange();
  }, [value]);

  return {
    data: {
      sourceTree,
      targetTree,
      checkedKeys,
      halfCheckedKeys,
      totalChosenCount,
      checkAllStatus,
      treeTransferHelper,
      targetExpandKeys,
    },
    action: {
      handleChange,
      handleRemoveInTarget,
      handleCheckAll,
      handleClear,
      handleSearch,
      handleLoadSource,
      handleLoadTarget,
      handleTargetExpandChange,
    },
  };
};
