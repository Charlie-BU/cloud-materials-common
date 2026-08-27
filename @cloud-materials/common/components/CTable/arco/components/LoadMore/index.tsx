/*
 * @Author: youjingyu
 * @Date: 2021-12-04 11:26:31
 * @LastEditTime: 2021-12-13 14:27:21
 * @LastEditors: youjingyu
 * @Description:
 */
import type { RefObject } from 'react';
import React, { forwardRef, useEffect } from 'react';
import { observer } from '@formily/react';
import cls from 'classnames';
import type { TableModel } from '../../types';
import { LoadMoreType } from '../../types';
import { StatusChangeReason } from '../../../core/types';
import CLoadingV2 from '../../../../CLoadingV2';
import { useLoadMore } from '../../hooks';
import { useTable, usePrefix } from '../../../react';
import { useCConfigContext } from '../../../../CConfigProvider';

const Loading: React.FC = () => {
  return <CLoadingV2 loading type="inline" />;
};

export const LoadMoreCompHeight = 44;

export const LoadMore: React.FC<{
  table: TableModel<any>;
}> = observer(({ table }) => {
  const { locale } = useCConfigContext();
  const prefixCls = usePrefix('load-more');
  // 没有数据时，不显示 LoadMore 组件
  if (table.rows.length === 0) {
    return null;
  }
  const loadMoreType = table.config.extraConfig?.loadMoreType;
  let content =
    loadMoreType === LoadMoreType.clickLoadMore ? (
      <span
        className="click-load-more"
        onClick={() => {
          table.loadMoreData();
        }}
      >
        {locale.CTable.clickToLoadMore}
      </span>
    ) : (
      <Loading />
    );
  if (table.status.noMore) {
    content = <span className="no-more-data">{locale.CTable.noMoreData}</span>;
  } else if (table.status.error) {
    content = (
      <span className="load-more-error">
        <span>{locale.CTable.loadFail}</span>
        <span onClick={() => table.status.error && table.loadMoreData()}>{locale.CTable.clickToRetry}</span>
      </span>
    );
  } else if (table.status.loadMoreLoading === true) {
    content = <Loading />;
  }
  return (
    <div className={prefixCls} style={{ height: LoadMoreCompHeight }}>
      {content}
    </div>
  );
});

export const _LoadMoreTableBodyWrapper: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { className: string; style?: React.StyleHTMLAttributes<HTMLDivElement> }
> = (props, _ref) => {
  const ref = _ref as RefObject<HTMLDivElement>;
  const table = useTable() as TableModel<any>;
  const prefixCls = usePrefix('load-more');
  useLoadMore(table, ref);

  /**
   * 2023-05-08 新增
   * load more 模式下 refresh 时需要先滚回顶部，防止多次触发滚动加载
   */
  useEffect(() => {
    if (table.status.statusChangeReason === StatusChangeReason.REFRESH) {
      if (ref.current) {
        ref.current.scrollTop = 0;
      }
    }
  }, [table.status.statusChangeReason]);

  const loadMoreContainerHeight = table.config.loadMoreContainerHeight;
  // 容器不设置 height，只设置 max-height。数据较少时高度自适应，数据多了限死 max-height
  const style = loadMoreContainerHeight ? { ...props.style, maxHeight: loadMoreContainerHeight } : props.style;

  return (
    // arco 会为 body 的 wrapper 传入 className、style，这里需要承接
    <div className={cls(props.className, `${prefixCls}-container`)} style={style} ref={ref}>
      {props.children}
      <LoadMore table={table} />
    </div>
  );
};

export const LoadMoreTableBodyWrapper = forwardRef(_LoadMoreTableBodyWrapper);
