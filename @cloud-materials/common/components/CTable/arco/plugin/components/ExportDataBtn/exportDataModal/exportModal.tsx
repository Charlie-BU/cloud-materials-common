/* eslint-disable react-hooks/rules-of-hooks */
import { Popover, Radio } from '@arco-design/web-react';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import type { Table } from '../../../../../core';
import { formatCellData } from '../../../../../shared';
import type { ExportDataBtnProps } from '../index';
import { ExportDataRangeType } from '../index';
import { CheckBoxList } from './CheckBoxList';
import { exportDataToCSV } from './exportData';
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
import { useCConfigContext } from '../../../../../../CConfigProvider';
import CModal from '../../../../../../CModal/Base';
import type { CModalProps } from '../../../../../../CModal/interface';
import { usePrefix } from '../../../../../react';
import type { ExportDataModalRef } from '../../../../types/Toolbar';

const getAllColumns = (table: Table, options: ExportDataBtnProps) => {
  let tableColumns: { dataIndex: string; title: string; formatter?: (val: any) => string }[] = table.columns
    .filter(c => !c.hidden)
    .map(item => {
      const { dataIndex } = item.config;
      return {
        dataIndex,
        title: item.title,
        formatter:
          options.formatter?.[dataIndex] ||
          ((dataItem: any) =>
            formatCellData({
              cellData: dataItem?.[dataIndex],
              table,
              column: item,
              rowData: dataItem,
            })),
      };
    });
  const extraColumns = options.extraColumns || [];
  // 过滤 tableColumns 中与 extraColumns 中冲突的配置
  tableColumns = tableColumns.filter(
    item => extraColumns.findIndex(extraColumn => extraColumn.dataIndex === item.dataIndex) === -1,
  );
  const allColumns = [...tableColumns, ...extraColumns].filter(
    item => !options.ignoreDataIndex?.includes?.(item.dataIndex),
  );

  return allColumns;
};

export const ExportDataModal = React.forwardRef<
  ExportDataModalRef,
  {
    table: Table;
    options: Omit<ExportDataBtnProps, 'tooltip'>;
  }
>(({ table, options }, ref) => {
  const prefixCls = usePrefix('export-data');
  const allColumns = getAllColumns(table, options);
  const [showModal, setShowModal] = useState(false);
  const [checkedDataIndex, setCheckedDataIndex] = useState<string[]>(
    () => (options.defaultChecked === 'all' ? allColumns.map(item => item.dataIndex) : options.defaultChecked) || [],
  );
  // 用于标记，初始化时，如果值为空，不马上报错误信息，用户操作后才出
  const [hasOperated, setHasOperated] = useState<boolean>(false);
  const [exportRangeType, setExportRangeType] = useState<ExportDataRangeType>(ExportDataRangeType.all);

  const {
    showExportRangeKeys = [ExportDataRangeType.all, ExportDataRangeType.selectedRows, ExportDataRangeType.searchResult],
  } = options;

  const { locale } = useCConfigContext();

  const exportRangeNode = options.showExportRange && (
    <div className={`${prefixCls}-range-container`}>
      <div className={`${prefixCls}-section-title`}>
        <span>{locale.CTable.exportRange}</span>
      </div>
      <Radio.Group value={exportRangeType} onChange={val => setExportRangeType(val)}>
        {showExportRangeKeys.includes(ExportDataRangeType.all) && (
          <Radio value={ExportDataRangeType.all}>{locale.CTable.exportAllData}</Radio>
        )}
        {/* 配置了行选择时，才出现【导出选中数据】 */}
        {table.config.rowSelection && showExportRangeKeys.includes(ExportDataRangeType.selectedRows) && (
          <Popover disabled={table.selectedRowKeys.length !== 0} content={locale.CTable.noBatchCheck}>
            <Radio value={ExportDataRangeType.selectedRows} disabled={table.selectedRowKeys.length === 0}>
              {locale.CTable.exportSelectedData}
            </Radio>
          </Popover>
        )}
        {showExportRangeKeys.includes(ExportDataRangeType.searchResult) && (
          <Radio value={ExportDataRangeType.searchResult}>{locale.CTable.exportCurrentSearch}</Radio>
        )}
      </Radio.Group>
      <div>{options?.getExportRangeDesc?.({ curChosenType: exportRangeType, table })}</div>
    </div>
  );

  const checkDataIndexNode = (
    <div>
      <CheckBoxList
        value={checkedDataIndex}
        items={allColumns.map(item => ({
          title: item.title,
          key: item.dataIndex,
        }))}
        disabledKeys={options.disabledDataIndex}
        onChange={val => {
          setHasOperated(true);
          setCheckedDataIndex(val);
        }}
        prefixCls={prefixCls}
      />
      {hasOperated && checkedDataIndex.length === 0 && (
        <span className={`${prefixCls}-input-error`}>{locale.CTable.selectAtLeastOne}</span>
      )}
    </div>
  );

  const contentNode = options.renderContent?.({ exportRangeNode, checkDataIndexNode }) || (
    <>
      {exportRangeNode}
      {checkDataIndexNode}
    </>
  );

  const modalConfig: CModalProps = {
    visible: showModal,
    title: locale.CTable.exportData,
    style: {
      width: 520,
    },
    className: `${prefixCls}-modal`,
    onCancel() {
      setShowModal(false);
    },
    onOk: async () => {
      if (checkedDataIndex.length === 0) {
        setHasOperated(true);
        return;
      }
      // 没有配置 fetcher、ExportDataRangeType 为全部数据、当前搜索结果
      // 都是导出 table.initTotalData
      let data: Record<string, any>[] = table.initTotalData;
      if (exportRangeType === ExportDataRangeType.selectedRows) {
        data = table.selectedRowData;
      } else if (options.fetcher) {
        try {
          data = await options.fetcher({ table, checkedDataIndex, exportRangeType });
        } catch (error) {
          console.error('export data failed', error);
          return Promise.reject(error);
        }
      }
      let exportOptions = {
        fileName: options.filename || locale.CTable.exportedData,
        columns: allColumns.filter(item => checkedDataIndex.includes(item.dataIndex)),
        data,
      };
      exportOptions = options.formatConfigBeforeExport
        ? options.formatConfigBeforeExport(exportOptions)
        : exportOptions;
      if (options.downloadData) {
        options.downloadData(exportOptions);
      } else {
        exportDataToCSV(exportOptions);
      }
      setShowModal(false);
    },
    ...options.modalProps,
  };

  useEffect(() => {
    // 若重新打开弹窗后，目前选中的是导出选中行，但无选中行信息，此时导出选中行的按钮为禁用的，因此需要切换为没有禁用的全部导出选项
    if (showModal && table.selectedRowKeys.length === 0 && exportRangeType === ExportDataRangeType.selectedRows) {
      setExportRangeType(ExportDataRangeType.all);
    }
  }, [showModal]);

  useImperativeHandle(ref, () => ({
    openModal: () => setShowModal(true),
    toogleModal: (visible: boolean) => setShowModal(visible),
  }));
  return <CModal {...modalConfig}>{contentNode}</CModal>;
});
