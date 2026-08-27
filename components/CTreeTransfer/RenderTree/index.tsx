import type { ReactElement } from 'react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import type { TransferCheckStrategy, TreeTransferDataType } from '../interface';
import { LoadType } from '../interface';
import type { NodeInstance, NodeProps, TreeProps } from '@arco-design/web-react/es/Tree/interface';
import { Tree as ArcoTree } from '@arco-design/web-react';
import classNames from 'classnames';
import CEllipsis from '../../CEllipsis';
import { firstLevelLoadingKey, genTreeRenderData, renderLoadButton } from '../lazyLoadModeUtils';
import { getAllNodeKeysWithChildren, getKeyPath } from '../utils';
import { useMount } from 'ahooks';
import type { TreeTransferHelper } from '../class';
import { CConfigContext } from '../../CConfigProvider';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { uniq } from 'lodash-es';

interface RenderTreeProps {
  treeData: TreeTransferDataType[];
  hasLoadMore: boolean;
  checkedKeys?: string[];
  halfCheckedKeys?: string[];
  treeProps?: TreeProps;
  type: 'source' | 'target';
  firstLevelHasMore?: boolean | 'error';
  helper: TreeTransferHelper;
  targetExpandKeys?: string[];
  emptyContent?: ReactElement;
  checkedStrategy?: TransferCheckStrategy;
  itemRender?: (item: NodeProps, treeData?: TreeTransferDataType[]) => React.ReactNode;
  onLoadMore?: (keyPath: string[]) => void;
  onRemove?: (item: NodeProps) => void;
  onCheck?: (node: NodeProps, checked: boolean, checkedKeys: string[]) => void;
  onTargetExpandChange?: (keys: string[]) => void;
  dataCy: string;
  loadType?: LoadType;
  isEmptyShowLoadMore: boolean;
  isAutoExpandSource?: boolean;
  isAutoExpandTarget?: boolean;
}

export const RenderTree: React.FC<RenderTreeProps> = ({
  treeData,
  hasLoadMore,
  treeProps,
  checkedKeys,
  halfCheckedKeys,
  type,
  firstLevelHasMore = false,
  helper,
  dataCy,
  emptyContent,
  targetExpandKeys,
  checkedStrategy,
  loadType,
  isEmptyShowLoadMore,
  isAutoExpandSource,
  isAutoExpandTarget,
  itemRender,
  onCheck,
  onLoadMore,
  onRemove,
  onTargetExpandChange,
}) => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('tree-transfer');
  const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({});
  const [expandedKeys, setExpandedKeys] = useState<string[]>([...(treeProps?.defaultExpandedKeys || [])]);

  const autoExpandParent = treeProps?.autoExpandParent;
  const handleOpen = async (treeNode: NodeInstance) => {
    const keyPath = getKeyPath(treeNode);
    await onLoadMore?.(keyPath);
  };

  const handleLoadMore = async (treeNode: NodeProps) => {
    const parentKey = treeNode.parentKey || '';

    setLoadingMap({
      ...loadingMap,
      [parentKey]: true,
    });
    const keyPath = treeNode.pathParentKeys || [];
    await onLoadMore?.(keyPath);
    setLoadingMap({
      ...loadingMap,
      [parentKey]: false,
    });
  };

  const handleFirstLevelLoad = async () => {
    helper.setOldSourceFlattenMap(helper.sourceFlattenMap);
    setLoadingMap({
      ...loadingMap,
      [firstLevelLoadingKey]: true,
    });
    await onLoadMore?.([]);
    // const newData =
    setLoadingMap({
      ...loadingMap,
      [firstLevelLoadingKey]: false,
    });
  };

  const handleCheck = (
    checkedKeys: string[],
    extra: {
      node: NodeInstance;
      checked: boolean;
    },
  ) => {
    const { node, checked } = extra;
    onCheck?.(node.props, checked, checkedKeys);
    // 自动展开选中的非叶子节点
    if (extra.checked && isAutoExpandSource && !node.props.isLeaf) {
      setExpandedKeys(uniq([...expandedKeys, String(node.key)]));
    }
  };

  const handleExpandKeys = (keys: string[]) => {
    if (type === 'source') {
      setExpandedKeys(keys);
    } else {
      onTargetExpandChange?.(keys);
    }
  };

  useMount(() => {
    if (autoExpandParent) {
      const keys = getAllNodeKeysWithChildren(treeData);
      setExpandedKeys(keys);
    }
  });

  useEffect(() => {
    // 处理首层加载更多后需默认打开的情况
    if (type === 'source' && autoExpandParent) {
      const newData = treeData.filter(item => !helper.oldSourceFlattenMap.get(item.key));
      const newExpandedKeys = getAllNodeKeysWithChildren(newData);
      setExpandedKeys([...expandedKeys, ...newExpandedKeys]);
    }
  }, [treeData]);

  useEffect(() => {
    // 在设置了自动展开右侧选中项的情况下，需要重新 setState，否则无法触发更新
    if (targetExpandKeys && isAutoExpandTarget) {
      setExpandedKeys(targetExpandKeys);
    }
  }, [targetExpandKeys]);

  const renderData = useMemo(
    () => genTreeRenderData(treeData, hasLoadMore, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore),
    [treeData, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore],
  );

  const arcoTreeProps =
    type === 'source'
      ? {
          checkedStrategy: checkedStrategy || ArcoTree.SHOW_ALL,
          checkStrictly: hasLoadMore || loadType === LoadType.remoteExpand,
          checkable: true,
          checkedKeys,
          halfCheckedKeys,
          onCheck: handleCheck,
        }
      : {};
  if (!renderData?.length && emptyContent) {
    return emptyContent;
  }
  return (
    <>
      <ArcoTree
        {...arcoTreeProps}
        {...treeProps}
        data-cy={dataCy}
        data-testid={dataCy}
        treeData={renderData}
        expandedKeys={type === 'source' || isAutoExpandTarget ? expandedKeys : targetExpandKeys}
        className={classNames(cssPrefix`tree`, treeProps?.className)}
        // 避免显示 selected 样式
        selectedKeys={[]}
        onExpand={handleExpandKeys}
        virtualListProps={
          treeProps?.virtualListProps || {
            height: 394,
          }
        }
        loadMore={handleOpen}
        renderExtra={(node: NodeProps) => {
          const nodeData = node.dataRef as TreeTransferDataType;
          if (!node?.childrenData?.length && node?.expanded) {
            return <div className={cssPrefix`load-empty`}>{locale.CTreeTransfer.noExpandData}</div>;
          }
          if (type === 'source' && node?.expanded && node.checked && nodeData.nodeCheckAllExtra) {
            return <div className={cssPrefix`load-custom-info`}>{nodeData.nodeCheckAllExtra}</div>;
          }
        }}
        renderTitle={(node: NodeProps) => {
          const nodeData = node.dataRef;
          if (nodeData?.isLoadNode) {
            return nodeData.key === `load-${firstLevelLoadingKey}`
              ? renderLoadButton(node.title, () => handleFirstLevelLoad(), loadingMap[firstLevelLoadingKey])
              : renderLoadButton(node.title, () => handleLoadMore(node), loadingMap[node.parentKey || '']);
          }
          if (type === 'source') {
            if (itemRender && nodeData) {
              return itemRender(node);
            }
            return <CEllipsis>{nodeData?.title || ''}</CEllipsis>;
          }

          return (
            <div className={cssPrefix`target-tree-title`}>
              {itemRender && nodeData ? (
                itemRender(node, treeData)
              ) : (
                <CEllipsis className={cssPrefix`target-tree-title-content`}>{nodeData?.title || ''}</CEllipsis>
              )}
              <IconClose
                className={cssPrefix`target-tree-remove`}
                onClick={() => {
                  onRemove?.(node);
                }}
              />
            </div>
          );
        }}
      />
    </>
  );
};
