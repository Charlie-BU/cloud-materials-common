import type { FC } from 'react';
import React from 'react';
import { observer } from '@formily/react';
import { Button, Popover } from '@arco-design/web-react';
import { IconRefresh } from '@arco-design/web-react/icon';
import type { ToolbarItemRenderProps } from '../../../../core';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { usePrefix } from '../../../../react';

export interface RefreshBtnProps {
  onClick?: () => void;
}

export const RefreshBtn: FC<ToolbarItemRenderProps & RefreshBtnProps> = observer(({ table, onClick }) => {
  const { locale } = useCConfigContext();
  const prefixCls = usePrefix('comp-refresh-btn');

  const click = () => {
    onClick ? onClick() : table.refresh();
  };

  return (
    <Popover content={locale.CTable.Refresh}>
      <Button className={prefixCls} loading={table.loading} icon={<IconRefresh />} onClick={click} />
    </Popover>
  );
});
