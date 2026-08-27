import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import classNames from 'classnames';
import type { TableModel } from '../CTable';
import Table from '../CTable';
import Operation from './components/Operation';
import { getPagination, mode } from './utils';
import { useCTransfer } from './hooks';
import type { CTableTransferProps } from './interface';
import { CConfigContext } from '../CConfigProvider';
import Delete from './components/Delete';

const InnerCTableTransfer = forwardRef<
  {
    sourceTable: TableModel<any>;
    targetTable: TableModel<any>;
  },
  CTableTransferProps
>((props, ref) => {
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('transfer');
  const { sourceTable, targetTable, onMove } = useCTransfer({ ...props });
  const [sourcePagination, targetPagination] = getPagination({ ...props });
  const { simple, table, remote } = mode({ ...props });
  const { listStyle, className } = props;

  const baseClassNames = {
    [cssPrefix`view`]: true,
    [cssPrefix`remote-hide`]: remote,
    [cssPrefix`table-mode`]: !!table,
  };

  const leftClassNames = classNames({
    ...baseClassNames,
    [cssPrefix`left-simple`]: simple,
    [cssPrefix`pagination-mode`]: !!sourcePagination,
  });
  const rightClassNames = classNames({
    ...baseClassNames,
    [cssPrefix`right-simple`]: simple,
    [cssPrefix`pagination-mode`]: !!targetPagination,
    [cssPrefix`right-pagination-mode`]: !!targetPagination,
  });
  useImperativeHandle(ref, () => ({
    sourceTable: sourceTable,
    targetTable: targetTable,
  }));

  return (
    <div className={classNames(cssPrefix``, className)} data-cy="c-m-table-transfer">
      <div className={leftClassNames} style={Array.isArray(listStyle) ? listStyle[0] : listStyle}>
        <Table table={sourceTable} />
      </div>
      <Operation sourceTable={sourceTable} targetTable={targetTable} cTransferProps={props} onMove={onMove} />
      <div className={rightClassNames} style={Array.isArray(listStyle) ? listStyle[1] : listStyle}>
        <Table table={targetTable} />
      </div>
    </div>
  );
});

const CTableTransfer = Object.assign(InnerCTableTransfer, {
  Delete,
});
CTableTransfer.displayName = 'CTableTransfer';

export default CTableTransfer;
