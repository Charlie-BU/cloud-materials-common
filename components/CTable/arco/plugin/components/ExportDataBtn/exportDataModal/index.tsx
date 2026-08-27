import React, { useRef } from 'react';
import { Popover, Button } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import type { Table } from '../../../../../core';
import type { ExportDataBtnProps } from '../index';
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
import { useCConfigContext } from '../../../../../../CConfigProvider';
import { usePrefix } from '../../../../../react';
import { ExportDataModal } from './exportModal';
import type { ExportDataModalRef } from '../../../../types/Toolbar';

export const ExportData: React.FC<{ table: Table; options: ExportDataBtnProps }> = ({ table, options }) => {
  const prefixCls = usePrefix('export-data');
  const { locale } = useCConfigContext();
  const exportModalRef = useRef<ExportDataModalRef>(null);

  return (
    <Popover content={options.tooltip || locale.CTable.exportData}>
      <Button
        className={`${prefixCls}-btn`}
        icon={<IconDownload />}
        onClick={() => {
          exportModalRef.current?.openModal();
        }}
      />
      <ExportDataModal ref={exportModalRef} table={table} options={options} />
    </Popover>
  );
};
