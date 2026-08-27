"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCTransfer = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var CTable_1 = require("../../CTable");
var sourceTableConfig_1 = tslib_1.__importDefault(require("../utils/sourceTableConfig"));
var targetTableConfig_1 = tslib_1.__importDefault(require("../utils/targetTableConfig"));
var interface_1 = require("../interface");
var utils_1 = require("../utils");
var lodash_es_1 = require("lodash-es");
var constant_1 = require("../constant");
var CConfigProvider_1 = require("../../CConfigProvider");
var useCTransfer = function (props) {
    // const cachedRemoteSelectRowData = useRef<CTableTransferItem[]>([]);
    var cachedSourceInitData = (0, react_1.useRef)([]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var _a = props.onChange, onChange = _a === void 0 ? function () { } : _a, selectedMax = props.selectedMax, onDataSource = props.onDataSource;
    var genKeyAttr = (0, utils_1.genTransferRowKey)(tslib_1.__assign({}, props));
    var _b = (0, utils_1.mode)(tslib_1.__assign({}, props)), remote = _b.remote, retain = _b.retain, simple = _b.simple;
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
        var sort = cachedSourceInitData.current.filter(function (item) { return data.find(function (ele) { return ele[constant_1.ROW_KEY] === item[constant_1.ROW_KEY]; }); });
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
                var dataSource = (0, lodash_es_1.unionBy)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((sourceTable.globalScope[constant_1.CACHE_REMOTE_DATA] || [])), false), tslib_1.__read(sourceTotalData), false), constant_1.ROW_KEY);
                var remoteSelectRowData = dataSource.filter(function (item) { return sourceSelectedKeys.includes(item[constant_1.ROW_KEY]); });
                targetTable.setData({
                    totalData: remoteSelectRowData,
                });
                // 翻页导致左侧数据清空，没法在右侧展示已选择，需要缓存一下
                sourceTable.setGlobalScope((_a = {},
                    _a[constant_1.CACHE_REMOTE_DATA] = tslib_1.__spreadArray([], tslib_1.__read(remoteSelectRowData), false),
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
            var sourceTableData = sourceTotalData.filter(function (item) { return !sourceSelectedKeys.includes(item[constant_1.ROW_KEY]); });
            var totalData = sortData(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(targetTotalData), false), tslib_1.__read(sourceSelectedRowData), false));
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
        onChange(updateRightTotalData.map(function (item) { return item[constant_1.ROW_KEY]; }), updateRightTotalData.map(function (item) { return (tslib_1.__assign({}, (0, lodash_es_1.omit)(item, constant_1.ROW_KEY))); }));
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
        var data = targetTotalData.filter(function (item) { return !targetSelectedKeys.includes(item[constant_1.ROW_KEY]); });
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
                    _a[constant_1.CACHE_REMOTE_DATA] = tslib_1.__spreadArray([], tslib_1.__read(data), false),
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
                    _b[constant_1.CACHE_REMOTE_DATA] = [],
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
                    totalData: sortData(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(sourceTotalData), false), tslib_1.__read(rightSelectedRowData), false)),
                });
            }
            else {
                // 全部删除
                targetTable.setData({
                    totalData: [],
                });
                sourceTable.setData({
                    totalData: sortData(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(sourceTotalData), false), tslib_1.__read(targetTotalData), false)),
                });
            }
        }
        var updateRightTotalData = genKeyAttr(targetTable.initTotalData) || [];
        onChange(updateRightTotalData.map(function (item) { return item[constant_1.ROW_KEY]; }), updateRightTotalData.map(function (item) { return (tslib_1.__assign({}, (0, lodash_es_1.omit)(item, constant_1.ROW_KEY))); }));
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
        if (source === interface_1.CTransferDirection.Source) {
            triggerCallback();
        }
        else if (source === interface_1.CTransferDirection.Target) {
            targetTableChange();
        }
    };
    var sourceConfig = (0, sourceTableConfig_1.default)({
        cTransferProps: tslib_1.__assign({}, props),
        onSourceTableSelectRow: onSourceTableSelectRow,
        sourceTableChange: sourceTableChange,
        cachedSourceInitData: cachedSourceInitData,
        matchSelectedMax: matchSelectedMax,
        locale: locale,
    });
    var targetConfig = (0, targetTableConfig_1.default)({
        cTransferProps: tslib_1.__assign({}, props),
        onTargetTableSelectRow: onTargetTableSelectRow,
        onClear: targetTableChange,
        locale: locale,
    });
    var sourceTable = (0, CTable_1.useCreateTable)(sourceConfig);
    var targetTable = (0, CTable_1.useCreateTable)(targetConfig);
    return {
        sourceTable: sourceTable,
        targetTable: targetTable,
        onMove: onMove,
    };
};
exports.useCTransfer = useCTransfer;
//# sourceMappingURL=index.js.map