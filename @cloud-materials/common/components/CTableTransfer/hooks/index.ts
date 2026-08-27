import { useRef } from 'react';
import { useCreateTable } from '../../CTable';
import SourceTable from '../utils/sourceTableConfig';
import TargetTable from '../utils/targetTableConfig';
import type { CTableTransferItem, CTableTransferProps } from '../interface';
import { CTransferDirection } from '../interface';
import { mode, genTransferRowKey } from '../utils';
import { omit, unionBy } from 'lodash-es';
import type { Table } from '../../CTable/core';
import { ROW_KEY, CACHE_REMOTE_DATA } from '../constant';
import { useCConfigContext } from '../../CConfigProvider';

export const useCTransfer = (props: CTableTransferProps) => {
  // const cachedRemoteSelectRowData = useRef<CTableTransferItem[]>([]);
  const cachedSourceInitData = useRef<CTableTransferItem[]>([]);
  const { locale } = useCConfigContext();
  const { onChange = () => {}, selectedMax, onDataSource } = props;
  const genKeyAttr = genTransferRowKey({ ...props });
  const { remote, retain, simple } = mode({ ...props });
  /**
   * 判断用户选择上限
   */
  const matchSelectedMax = (table: Table<any>) => {
    if (!selectedMax) {
      return {
        matched: false,
      };
    }
    const selectAllKeys = table.selectedRowKeys || [];
    // 穿梭情况，计算用户已选择的梳理
    const selectedNum = cachedSourceInitData.current.length - table.initTotalData.length;
    const matched = selectAllKeys.length >= selectedMax || selectAllKeys.length + selectedNum >= selectedMax;
    return {
      matched,
      selectedNum,
    };
  };

  /**
   * 上限情况：全选需要裁剪
   */
  const disableRow = (table: Table<any>) => {
    if (!selectedMax) {
      return;
    }
    const { matched, selectedNum = 0 } = matchSelectedMax(table);
    if (matched) {
      const selectAllKeys = table.selectedRowKeys || [];
      const sliceKeys = selectAllKeys.slice(0, retain ? selectedMax : selectedMax - selectedNum);
      table.selectRow(sliceKeys);
    }
  };

  const sortData = (data: CTableTransferItem[]) => {
    const sort = cachedSourceInitData.current.filter(item => data.find(ele => ele[ROW_KEY] === item[ROW_KEY]));
    return sort;
  };
  /**
   * 左侧数据选择
   *    1. 数据留存模式
   *    2. 非数据留存模式
   */
  const sourceTableChange = () => {
    const targetTotalData = targetTable.initTotalData || [];
    const sourceTotalData = sourceTable.initTotalData || [];
    const sourceSelectedKeys = sourceTable.selectedRowKeys || [];
    const sourceSelectedRowData = sourceTable.selectedRowData || [];

    if (retain) {
      // 数据留存模式
      if (remote) {
        // 远程模式
        // remote模式下onTableUpdateDataEnd钩子触发，leftSelectedRowData为空，这里需要去重，cache中和leftData中用重复的值
        const dataSource = unionBy(
          [...(sourceTable.globalScope[CACHE_REMOTE_DATA] || []), ...sourceTotalData],
          ROW_KEY,
        );
        const remoteSelectRowData = dataSource.filter(item => sourceSelectedKeys.includes(item[ROW_KEY]));
        targetTable.setData({
          totalData: remoteSelectRowData,
        });
        // 翻页导致左侧数据清空，没法在右侧展示已选择，需要缓存一下
        sourceTable.setGlobalScope({
          [CACHE_REMOTE_DATA]: [...remoteSelectRowData],
        });
        // cachedRemoteSelectRowData.current = [...remoteSelectRowData];
        // 向外传递数据源
        onDataSource?.(dataSource);
      } else {
        targetTable.setData({
          totalData: sortData(sourceSelectedRowData),
        });
        // 向外传递数据源
        onDataSource?.(sourceTotalData);
      }
    } else if (!retain) {
      const sourceTableData = sourceTotalData.filter(item => !sourceSelectedKeys.includes(item[ROW_KEY]));
      const totalData = sortData([...targetTotalData, ...sourceSelectedRowData]);
      sourceTable.clearSelectedRow();
      // 左侧筛选掉已选择数据
      sourceTable.setData({
        totalData: sourceTableData,
      });
      // 右侧新旧数据需要拼接
      targetTable.setData({
        totalData,
      });
      // 向外传递数据源
      onDataSource?.(sourceTotalData);
    }
  };

  /**
   * 触发onChange回调
   */
  const triggerCallback = () => {
    sourceTableChange();
    const updateRightTotalData = targetTable.initTotalData || [];
    onChange(
      updateRightTotalData.map(item => item[ROW_KEY]),
      updateRightTotalData.map(item => ({
        ...omit(item, ROW_KEY),
      })),
    );
  };

  /**
   * 右侧数据清除：
   *   1 全部删除
   *   2 选择性删除
   *
   */
  const targetTableChange = () => {
    const targetTotalData = targetTable.initTotalData || [];
    const targetSelectedKeys = targetTable.selectedRowKeys || [];
    const sourceTotalData = sourceTable.initTotalData || [];
    const rightSelectedRowData = targetTable.selectedRowData || [];
    // 过滤掉右侧已选择的数据
    const data = targetTotalData.filter(item => !targetSelectedKeys.includes(item[ROW_KEY]));
    if (retain) {
      const sourceSelectedKeys = sourceTable.selectedRowKeys || [];
      // 数据留存模式
      if (targetSelectedKeys.length) {
        //   选择性删除
        const sourceSelectKeys = sourceSelectedKeys.filter(item => !targetSelectedKeys.includes(item));
        // 选择性清除
        targetTable.setData({
          totalData: data,
        });
        sourceTable.selectRow(sourceSelectKeys);
        sourceTable.setGlobalScope({
          [CACHE_REMOTE_DATA]: [...data],
        });
        // cachedRemoteSelectRowData.current = [...data];
      } else {
        // 全部删除
        targetTable.setData({
          totalData: [],
        });
        sourceTable.clearSelectedRow();
        sourceTable.setGlobalScope({
          [CACHE_REMOTE_DATA]: [],
        });
        // cachedRemoteSelectRowData.current = [];
      }
    } else if (!retain) {
      // 非数据留存
      if (targetSelectedKeys.length) {
        // 选择性删除
        targetTable.setData({
          totalData: data,
        });
        sourceTable.setData({
          totalData: sortData([...sourceTotalData, ...rightSelectedRowData]),
        });
      } else {
        // 全部删除
        targetTable.setData({
          totalData: [],
        });
        sourceTable.setData({
          totalData: sortData([...sourceTotalData, ...targetTotalData]),
        });
      }
    }
    const updateRightTotalData = genKeyAttr(targetTable.initTotalData) || [];
    onChange(
      updateRightTotalData.map(item => item[ROW_KEY]),
      updateRightTotalData.map(item => ({
        ...omit(item, ROW_KEY),
      })),
    );
  };

  /**
   * 右侧数行选择据清除
   */
  const onTargetTableSelectRow = () => {
    if (!simple) {
      // table 中的行被选择或者取消选择
      // 非简单模式下需手动点击穿梭按钮
      return;
    }
    targetTableChange();
  };

  const onSourceTableSelectRow = () => {
    // 行选择的时候判断是否禁用
    disableRow(sourceTable);
    if (!simple) {
      // table 中的行被选择或者取消选择
      // 非简单模式下需手动点击穿梭按钮
      return;
    }

    // 只有在选择的时候才进行回调，fix在回调里面setState导致table loading，翻页时也触发回调
    triggerCallback();
  };

  // const cachedRemoteData = (data: CTableTransferItem[]) => {
  //   cachedRemoteSelectRowData.current = genKeyAttr(data);
  // };

  /**
   * 穿梭按钮
   */
  const onMove = (source: CTransferDirection) => {
    if (source === CTransferDirection.Source) {
      triggerCallback();
    } else if (source === CTransferDirection.Target) {
      targetTableChange();
    }
  };
  const sourceConfig = SourceTable({
    cTransferProps: { ...props },
    onSourceTableSelectRow,
    sourceTableChange,
    cachedSourceInitData,
    matchSelectedMax,
    locale,
  });
  const targetConfig = TargetTable({
    cTransferProps: { ...props },
    onTargetTableSelectRow,
    onClear: targetTableChange,
    locale,
  });
  const sourceTable = useCreateTable(sourceConfig);
  const targetTable = useCreateTable(targetConfig);

  return {
    sourceTable,
    targetTable,
    onMove,
  };
};
