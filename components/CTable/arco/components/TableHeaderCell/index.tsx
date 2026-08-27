import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';
import type { ResizableProps } from 'react-resizable';
import { Resizable } from 'react-resizable';
import cls from 'classnames';
import type { ColumnModel } from '../../types';
import { isNum } from '../../../shared';
import { usePrefix } from '../../../react';

// 鼠标移动上去，用于拖拽的元素
const ResizeHandle = forwardRef<HTMLSpanElement, { handleAxis: string }>((props, ref) => {
  // handleAxis 代表的是拖拽的方向，我们的场景，固定为 'se'
  const { handleAxis, ...restProps } = props;
  const prefixCls = usePrefix();
  return (
    <span
      ref={ref}
      className={cls(`${prefixCls}-react-resizable-handle`, `${prefixCls}-react-resizable-handle-${handleAxis}`)}
      {...restProps}
      onClick={e => {
        e.stopPropagation();
      }}
    />
  );
});

export const TableHeaderCell: React.FC<{
  className: string;
  style: CSSProperties;
  // columnModel 是 mapModelToArco.tsx 中的 onHeaderCell 传入的
  columnModel: ColumnModel<any>;
}> = ({ columnModel: column, ...restProps }) => {
  const prefixCls = usePrefix();
  const table = column.table;
  const width = column.width || table.columnsAutoWidth?.[column.config.dataIndex];
  /**
   * 如果没有配置 resize，直接渲染 th
   * 由于 react-resizable 必须有初始的宽度
   * 因此支持拖拽宽度的列，要么配置 width，要么配置 autoWidth，并且不能设置为百分比宽度
   */
  if (!column.config.resize || !isNum(width)) {
    return <th {...restProps} />;
  }

  const resizeConf = table.plugin.getResize(column.config.resize);

  // 这里不能 debounce，debounce 后 width 不能实时变化，Resizable 拖不动
  const onResize: ResizableProps['onResize'] = (_event, { size }) => {
    let width = size.width;
    // 如果超过了最大最小宽度，直接覆写 width 为极限值
    // 超过极限值后，不直接 return，是怕用户从 100 拖拽到 500，
    // 如果极限值为 400，这个时候其实应该设置为 400，所以不能直接 return
    if (resizeConf.minWidth && size.width <= resizeConf.minWidth) {
      width = resizeConf.minWidth;
    }
    if (resizeConf.maxWidth && size.width >= resizeConf.maxWidth) {
      width = resizeConf.maxWidth;
    }
    column.setWidth(width);
  };

  return (
    <Resizable
      width={width}
      height={0}
      className={cls(
        `${prefixCls}-resizable-column-title`,
        // 如果设置了固定列，则需要保留 position: sticky 配置
        {
          [`${prefixCls}-resizable-column-title-fixed`]: column.config.fixed,
        },
      )}
      // @ts-ignore
      // Resizable 内部是调用的 React.cloneElement 来给 ResizeHandle 设置的 props
      handle={<ResizeHandle />}
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
