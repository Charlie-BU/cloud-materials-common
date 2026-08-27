import { __assign, __read, __spreadArray } from "tslib";
import { useRef } from 'react';
import { useCreateTable } from '../../CTable';
import SourceTable from '../utils/sourceTableConfig';
import TargetTable from '../utils/targetTableConfig';
import { CTransferDirection } from '../interface';
import { mode, genTransferRowKey } from '../utils';
import { omit, unionBy } from 'lodash-es';
import { ROW_KEY, CACHE_REMOTE_DATA } from '../constant';
import { useCConfigContext } from '../../CConfigProvider';
export var useCTransfer = function (props) {
    // const cachedRemoteSelectRowData = useRef<CTableTransferItem[]>([]);
    var cachedSourceInitData = useRef([]);
    var locale = useCConfigContext().locale;
    var _a = props.onChange, onChange = _a === void 0 ? function () { } : _a, selectedMax = props.selectedMax, onDataSource = props.onDataSource;
    var genKeyAttr = genTransferRowKey(__assign({}, props));
    var _b = mode(__assign({}, props)), remote = _b.remote, retain = _b.retain, simple = _b.simple;
    /**
     * 判断用户选择上限
     */
    var matchSelectedMax = function (table) {
        if (!selectedMax) {
            return {
                matched: false,
            };
        }
        var selectAllKeys = table.selectedRowKeys || [];
        // 穿梭情况，计算用户已选择的梳理
        var selectedNum = cachedSourceInitData.current.length - table.initTotalData.length;
        var matched = selectAllKeys.length >= selectedMax || selectAllKeys.length + selectedNum >= selectedMax;
        return {
            matched: matched,
            selectedNum: selectedNum,
        };
    };
    /**
     * 上限情况：全选需要裁剪
     */
    var disableRow = function (table) {
        if (!selectedMax) {
            return;
        }
        var _a = matchSelectedMax(table), matched = _a.matched, _b = _a.selectedNum, selectedNum = _b === void 0 ? 0 : _b;
        if (matched) {
            var selectAllKeys = table.selectedRowKeys || [];
            var sliceKeys = selectAllKeys.slice(0, retain ? selectedMax : selectedMax - selectedNum);
            table.selectRow(sliceKeys);
        }
    };
    var sortData = function (data) {
        var sort = cachedSourceInitData.current.filter(function (item) { return data.find(function (ele) { return ele[ROW_KEY] === item[ROW_KEY]; }); });
        return sort;
    };
    /**
     * 左侧数据选择
     *    1. 数据留存模式
     *    2. 非数据留存模式
     */
    var sourceTableChange = function () {
        var _a;
        var targetTotalData = targetTable.initTotalData || [];
        var sourceTotalData = sourceTable.initTotalData || [];
        var sourceSelectedKeys = sourceTable.selectedRowKeys || [];
        var sourceSelectedRowData = sourceTable.selectedRowData || [];
        if (retain) {
            // 数据留存模式
            if (remote) {
                // 远程模式
                // remote模式下onTableUpdateDataEnd钩子触发，leftSelectedRowData为空，这里需要去重，cache中和leftData中用重复的值
                var dataSource = unionBy(__spreadArray(__spreadArray([], __read((sourceTable.globalScope[CACHE_REMOTE_DATA] || [])), false), __read(sourceTotalData), false), ROW_KEY);
                var remoteSelectRowData = dataSource.filter(function (item) { return sourceSelectedKeys.includes(item[ROW_KEY]); });
                targetTable.setData({
                    totalData: remoteSelectRowData,
                });
                // 翻页导致左侧数据清空，没法在右侧展示已选择，需要缓存一下
                sourceTable.setGlobalScope((_a = {},
                    _a[CACHE_REMOTE_DATA] = __spreadArray([], __read(remoteSelectRowData), false),
                    _a));
                // cachedRemoteSelectRowData.current = [...remoteSelectRowData];
                // 向外传递数据源
                onDataSource === null || onDataSource === void 0 ? void 0 : onDataSource(dataSource);
            }
            else {
                targetTable.setData({
                    totalData: sortData(sourceSelectedRowData),
                });
                // 向外传递数据源
                onDataSource === null || onDataSource === void 0 ? void 0 : onDataSource(sourceTotalData);
            }
        }
        else if (!retain) {
            var sourceTableData = sourceTotalData.filter(function (item) { return !sourceSelectedKeys.includes(item[ROW_KEY]); });
            var totalData = sortData(__spreadArray(__spreadArray([], __read(targetTotalData), false), __read(sourceSelectedRowData), false));
            sourceTable.clearSelectedRow();
            // 左侧筛选掉已选择数据
            sourceTable.setData({
                totalData: sourceTableData,
            });
            // 右侧新旧数据需要拼接
            targetTable.setData({
                totalData: totalData,
            });
            // 向外传递数据源
            onDataSource === null || onDataSource === void 0 ? void 0 : onDataSource(sourceTotalData);
        }
    };
    /**
     * 触发onChange回调
     */
    var triggerCallback = function () {
        sourceTableChange();
        var updateRightTotalData = targetTable.initTotalData || [];
        onChange(updateRightTotalData.map(function (item) { return item[ROW_KEY]; }), updateRightTotalData.map(function (item) { return (__assign({}, omit(item, ROW_KEY))); }));
    };
    /**
     * 右侧数据清除：
     *   1 全部删除
     *   2 选择性删除
     *
     */
    var targetTableChange = function () {
        var _a, _b;
        var targetTotalData = targetTable.initTotalData || [];
        var targetSelectedKeys = targetTable.selectedRowKeys || [];
        var sourceTotalData = sourceTable.initTotalData || [];
        var rightSelectedRowData = targetTable.selectedRowData || [];
        // 过滤掉右侧已选择的数据
        var data = targetTotalData.filter(function (item) { return !targetSelectedKeys.includes(item[ROW_KEY]); });
        if (retain) {
            var sourceSelectedKeys = sourceTable.selectedRowKeys || [];
            // 数据留存模式
            if (targetSelectedKeys.length) {
                //   选择性删除
                var sourceSelectKeys = sourceSelectedKeys.filter(function (item) { return !targetSelectedKeys.includes(item); });
                // 选择性清除
                targetTable.setData({
                    totalData: data,
                });
                sourceTable.selectRow(sourceSelectKeys);
                sourceTable.setGlobalScope((_a = {},
                    _a[CACHE_REMOTE_DATA] = __spreadArray([], __read(data), false),
                    _a));
                // cachedRemoteSelectRowData.current = [...data];
            }
            else {
                // 全部删除
                targetTable.setData({
                    totalData: [],
                });
                sourceTable.clearSelectedRow();
                sourceTable.setGlobalScope((_b = {},
                    _b[CACHE_REMOTE_DATA] = [],
                    _b));
                // cachedRemoteSelectRowData.current = [];
            }
        }
        else if (!retain) {
            // 非数据留存
            if (targetSelectedKeys.length) {
                // 选择性删除
                targetTable.setData({
                    totalData: data,
                });
                sourceTable.setData({
                    totalData: sortData(__spreadArray(__spreadArray([], __read(sourceTotalData), false), __read(rightSelectedRowData), false)),
                });
            }
            else {
                // 全部删除
                targetTable.setData({
                    totalData: [],
                });
                sourceTable.setData({
                    totalData: sortData(__spreadArray(__spreadArray([], __read(sourceTotalData), false), __read(targetTotalData), false)),
                });
            }
        }
        var updateRightTotalData = genKeyAttr(targetTable.initTotalData) || [];
        onChange(updateRightTotalData.map(function (item) { return item[ROW_KEY]; }), updateRightTotalData.map(function (item) { return (__assign({}, omit(item, ROW_KEY))); }));
    };
    /**
     * 右侧数行选择据清除
     */
    var onTargetTableSelectRow = function () {
        if (!simple) {
            // table 中的行被选择或者取消选择
            // 非简单模式下需手动点击穿梭按钮
            return;
        }
        targetTableChange();
    };
    var onSourceTableSelectRow = function () {
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
    var onMove = function (source) {
        if (source === CTransferDirection.Source) {
            triggerCallback();
        }
        else if (source === CTransferDirection.Target) {
            targetTableChange();
        }
    };
    var sourceConfig = SourceTable({
        cTransferProps: __assign({}, props),
        onSourceTableSelectRow: onSourceTableSelectRow,
        sourceTableChange: sourceTableChange,
        cachedSourceInitData: cachedSourceInitData,
        matchSelectedMax: matchSelectedMax,
        locale: locale,
    });
    var targetConfig = TargetTable({
        cTransferProps: __assign({}, props),
        onTargetTableSelectRow: onTargetTableSelectRow,
        onClear: targetTableChange,
        locale: locale,
    });
    var sourceTable = useCreateTable(sourceConfig);
    var targetTable = useCreateTable(targetConfig);
    return {
        sourceTable: sourceTable,
        targetTable: targetTable,
        onMove: onMove,
    };
};
//# sourceMappingURL=index.js.map