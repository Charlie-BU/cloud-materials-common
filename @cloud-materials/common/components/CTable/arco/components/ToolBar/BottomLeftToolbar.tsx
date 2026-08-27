import React from 'react';
import { Checkbox, Button } from '@arco-design/web-react';
import type { ToolbarConfig } from '../../types';
import { ToolbarItemGroup } from './ToolbarItemGroup';
import { useTable, usePrefix } from '../../../react';
import { useCConfigContext } from '../../../../CConfigProvider';
import { isFn } from '../../../shared';

// 展示左下角的选中行信息
const SelectedInfo: React.FC<{ prefixCls: string }> = ({ prefixCls }) => {
  const { locale, formatLocale } = useCConfigContext();
  const table = useTable();
  const crossPage = Boolean(table.config.extraConfig?.bottomLeftCheckAllCrossPage);
  const showClearSelect = Boolean(table.config.extraConfig?.bottomLeftShowClearSelect);
  const formatSelectedCount = table.config.extraConfig?.formatSelectedCount;
  const { allSelected, partialSelected, canControlRowKeys } = table.getSelectedStatusInfo({ crossPage });
  const count = table.selectedRowKeys.length;
  const onClearSelect = () => {
    // 取消全选
    table.selectRowAll(false, {
      triggerSelectRowEvent: true,
      crossPage,
    });
  };

  const countText = isFn(formatSelectedCount)
    ? formatSelectedCount({ count, table })
    : formatLocale(count <= 1 ? locale.CTable.selectedCount : locale.CTable.selectedCounts, { count });

  return (
    <div className={`${prefixCls}-bottom-toolbar-selected-info`}>
      <Checkbox
        // 无可操作的行时，应该禁用 checkbox
        disabled={canControlRowKeys.length === 0}
        checked={allSelected}
        indeterminate={partialSelected}
        onChange={val => {
          table.selectRowAll(val, {
            triggerSelectRowEvent: true,
            crossPage,
          });
        }}
      />
      <span>{countText}</span>
      {showClearSelect && (
        <Button type="text" onClick={onClearSelect} disabled={!table.selectedRowKeys.length}>
          {locale.CTable.cancelSelect}
        </Button>
      )}
    </div>
  );
};

/**
 * table 底部的 toolbar 实现写得比较死，只支持左下角的操作按钮，并且不支持输入性组件，等有诉求的时候再考虑
 * */
export const BottomLeftToolbar: React.FC<{ config: ToolbarConfig }> = ({ config }) => {
  const table = useTable();
  const prefixCls = usePrefix('toolbar');

  if (!config?.bottomLeft) {
    return null;
  }
  return (
    <div className={`${prefixCls}-bottom-toolbar-left`}>
      {/* 开启行选择的时候，展示左下角的选中信息 */}
      {table.config.rowSelection && <SelectedInfo prefixCls={prefixCls} />}
      <ToolbarItemGroup toolbarItems={config.bottomLeft} onChange={() => {}} />
    </div>
  );
};
