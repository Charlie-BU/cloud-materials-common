import React, { useContext } from 'react';
import type { CTreeTransferProps } from './interface';
import classNames from 'classnames';
import { useCTreeTransfer } from './hooks';
import { DataCy, getEmptyContentContent, getHookProps } from './utils';
import { Transfer } from '@arco-design/web-react';

import { RenderTree } from './RenderTree';
import { SourceHeader } from './Headers/SourceHeader';
import { TargetHeader } from './Headers/TargetHeader';
import CLoadingV2 from '../CLoadingV2';
import { CConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

const CTreeTransfer: React.FC<CTreeTransferProps> = props => {
  const { useCssPrefix, cComponentConfig } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('tree-transfer');

  const mergedProps = useMergeProps<CTreeTransferProps>(
    props,
    {} as CTreeTransferProps,
    cComponentConfig?.CTreeTransfer ?? {},
  );

  const {
    hasLoadMore = false,
    loading,
    arcoTransferProps,
    arcoSourceTreeProps,
    arcoTargetTreeProps,
    extraTargetAction,
    extraSourceAction,
    checkInfo,
    sourceSearchPlaceholder,
    targetSearchPlaceholder,
    sourceEmptyContent = true,
    targetEmptyContent = false,
    checkedStrategy,
    loadType,
    isEmptyShowLoadMore = false,
    loadingTitle = '',
    targetHeader,
    targetItemRender,
    sourceHeader,
    sourceItemRender,
    targetTitle,
    isAutoExpandSource,
  } = mergedProps;

  const hooksProps = getHookProps(mergedProps);
  const { data, action } = useCTreeTransfer(hooksProps);
  return (
    <Transfer
      {...arcoTransferProps}
      data-cy={DataCy.transfer}
      className={classNames(cssPrefix``, arcoTransferProps?.className)}
      listStyle={arcoTransferProps?.listStyle || [{ height: '480px' }, { height: '480px' }]}
      simple={true}
      titleTexts={[
        sourceHeader
          ? () => sourceHeader(action.handleCheckAll, data.checkAllStatus)
          : () => (
              <SourceHeader
                extraAction={extraSourceAction}
                onCheckAll={action.handleCheckAll}
                checkAllStatus={data.checkAllStatus}
                onSearchChange={action.handleSearch}
                placeholder={sourceSearchPlaceholder}
                sourceHeaderCustomText={props.sourceHeaderCustomText}
              />
            ),
        targetHeader
          ? () => targetHeader()
          : () => (
              <TargetHeader
                extraAction={extraTargetAction}
                totalChosenCount={data.totalChosenCount}
                placeholder={targetSearchPlaceholder}
                onClear={action.handleClear}
                onSearchChange={action.handleSearch}
                title={targetTitle}
              />
            ),
      ]}
    >
      {(renderProps: { listType: string }) => {
        const { listType } = renderProps;
        if (listType === 'source') {
          return loading ? (
            <CLoadingV2
              type="block"
              loading={true}
              className={cssPrefix`loading`}
              cSpinProps={{
                arcoSpinProps: {
                  tip: loadingTitle,
                },
              }}
            />
          ) : (
            <RenderTree
              treeData={data.sourceTree}
              hasLoadMore={hasLoadMore}
              treeProps={arcoSourceTreeProps}
              checkedKeys={checkInfo?.checkedKeys || data.checkedKeys}
              halfCheckedKeys={checkInfo?.halfCheckedKeys || data.halfCheckedKeys}
              helper={data.treeTransferHelper}
              firstLevelHasMore={props.hasLoadMore ? props.firstLevelHasMore : false}
              dataCy={DataCy.sourceTree}
              itemRender={sourceItemRender}
              onCheck={action.handleChange}
              onLoadMore={action.handleLoadSource}
              type="source"
              emptyContent={getEmptyContentContent(sourceEmptyContent)}
              checkedStrategy={checkedStrategy}
              loadType={loadType}
              isEmptyShowLoadMore={isEmptyShowLoadMore}
              isAutoExpandSource={isAutoExpandSource || false}
            />
          );
        }
        return (
          <RenderTree
            treeData={data.targetTree}
            hasLoadMore={hasLoadMore}
            treeProps={arcoTargetTreeProps}
            dataCy={DataCy.targetTree}
            type="target"
            firstLevelHasMore={props.hasLoadMore ? props.targetFirstLevelHasMore : false}
            helper={data.treeTransferHelper}
            onRemove={action.handleRemoveInTarget}
            itemRender={targetItemRender}
            onLoadMore={action.handleLoadTarget}
            emptyContent={getEmptyContentContent(targetEmptyContent)}
            targetExpandKeys={data.targetExpandKeys}
            onTargetExpandChange={action.handleTargetExpandChange}
            isEmptyShowLoadMore={isEmptyShowLoadMore}
            isAutoExpandTarget={props.isExpandTarget || false}
          />
        );
      }}
    </Transfer>
  );
};

CTreeTransfer.displayName = 'CTreeTransfer';

export default CTreeTransfer;
