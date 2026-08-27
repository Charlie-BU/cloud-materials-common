import React, { useContext } from 'react';
import { Space } from '@arco-design/web-react';
import { IconPlus, IconRefresh, IconDelete } from '@arco-design/web-react/icon';
import type { CTableTransferProps } from '../interface';
import { getPagination, mode, DataCy } from '../utils';
import SelectAllBox from './SelectAllBox';
import { useTable } from '../../CTable';
import classNames from 'classnames';
import { CConfigContext } from '../../CConfigProvider';

interface HeaderProps {
  cTransferProps: CTableTransferProps & { onRefresh?: () => void };
  onClear?: () => void;
}

export const LeftHeader: React.FC<HeaderProps> = ({ cTransferProps }) => {
  const table = useTable();
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('transfer');
  const {
    onRefresh: onRefreshCallback = () => {},
    onAdd: onAddCallback = () => {},
    add = <IconPlus />,
    refresh = <IconRefresh />,
    titleTexts = [],
    disabled = false,
  } = cTransferProps;
  const total = table.total;
  const selectedKeys = table.selectedRowKeys;
  const sourceTitle = titleTexts[0];
  const { simple } = mode({ ...cTransferProps });
  const [pagination] = getPagination({ ...cTransferProps });

  // 刷新回调
  const onRefresh = async () => {
    await onRefreshCallback();
    table.refresh();
  };
  // 添加回调
  const onAdd = async () => {
    await onAddCallback();
    table.refresh();
  };
  const AddIcon = () => (
    <span className={cssPrefix`icon`} onClick={onAdd} data-cy={DataCy.add}>
      {add === false ? null : add}
    </span>
  );
  const RefreshIcon = () => (
    <span className={cssPrefix`icon`} onClick={onRefresh} data-cy={DataCy.refresh}>
      {refresh === false ? null : refresh}
    </span>
  );

  if (typeof sourceTitle === 'function') {
    return sourceTitle({
      checkbox: <SelectAllBox disabled={disabled} />,
      countTotal: total,
      add: <AddIcon />,
      refresh: <RefreshIcon />,
      countSelected: selectedKeys.length,
    });
  }

  return (
    <div className={cssPrefix`header`}>
      <Space size="medium">
        {!pagination && <SelectAllBox disabled={disabled} />}
        <span className={cssPrefix`header-title`}>
          {sourceTitle || `${locale.CTableTransfer.all}：`}
          {!simple && <>{selectedKeys.length}/</>}
          {total}
          {locale.CTableTransfer.items}
        </span>
      </Space>
      <Space>
        <AddIcon />
        <RefreshIcon />
      </Space>
    </div>
  );
};

export const RightHeader: React.FC<HeaderProps> = ({ cTransferProps, onClear }) => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('transfer');
  const { titleTexts = [], clear = true, disabled = false } = cTransferProps;
  const table = useTable();
  const total = table.total;
  const selectedKeys = table.selectedRowKeys;
  const targetTitle = titleTexts[1];
  const DeleteIcon = () => (
    <div className={classNames(cssPrefix`icon`, cssPrefix`delete-all`)} onClick={onClear} data-cy={DataCy.deleteAll}>
      <IconDelete />
    </div>
  );
  const { simple } = mode({ ...cTransferProps });
  const [_, pagination] = getPagination({ ...cTransferProps });

  if (typeof targetTitle === 'function') {
    return targetTitle({
      checkbox: <SelectAllBox disabled={disabled} />,
      countTotal: total,
      countSelected: selectedKeys.length,
      delete: <DeleteIcon />,
    });
  }

  return (
    <div className={cssPrefix`header`}>
      <Space size="medium">
        {!pagination && !simple && <SelectAllBox disabled={disabled} />}
        <span className={cssPrefix`header-title`}>
          {targetTitle || `${locale.CTableTransfer.selected}：`}
          {!simple && <>{selectedKeys.length}/</>}
          {total} {locale.CTableTransfer.items}
        </span>
      </Space>
      <Space>{clear && <DeleteIcon />}</Space>
    </div>
  );
};
