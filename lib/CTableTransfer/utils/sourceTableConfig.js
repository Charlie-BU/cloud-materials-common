"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CTable_1 = require("../../CTable");
var Header_1 = require("../components/Header");
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var constant_1 = require("../constant");
var tools_1 = require("./tools");
var getColumns_1 = require("./getColumns");
var getTableBaseConfig_1 = require("./getTableBaseConfig");
var getPagination_1 = require("./getPagination");
/**
 * @description 左侧Table配置
 *
 * @param {{
 *   cTransferProps: CTableTransferProps<any>;
 *   onSourceTableSelectRow: () => void;
 * }} {
 *   cTransferProps,
 *   onSourceTableSelectRow,
 * }
 * @return {*}
 */
var SourceTable = function (_a) {
    var cTransferProps = _a.cTransferProps, onSourceTableSelectRow = _a.onSourceTableSelectRow, sourceTableChange = _a.sourceTableChange, cachedSourceInitData = _a.cachedSourceInitData, matchSelectedMax = _a.matchSelectedMax, locale = _a.locale;
    var _b = cTransferProps.defaultSelectedValues, defaultSelectedValues = _b === void 0 ? [] : _b, CTableProps = cTransferProps.CTableProps, fetchInitData = cTransferProps.fetchInitData, _c = cTransferProps.maxTooltip, maxTooltip = _c === void 0 ? locale.CTableTransfer.limit : _c;
    var remote = (0, tools_1.mode)(tslib_1.__assign({}, cTransferProps)).remote;
    // 获取table配置
    var sourceColumns = (0, getColumns_1.getColumns)(cTransferProps).sourceColumns;
    var baseConfig = (0, getTableBaseConfig_1.getTableBaseConfig)(tslib_1.__assign({}, cTransferProps), locale);
    var sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
    var _d = tslib_1.__read((0, getPagination_1.getPagination)(tslib_1.__assign({}, cTransferProps)), 1), pagination = _d[0];
    var rowSelection = sourceCTableProps.rowSelection;
    var genRowKey = (0, tools_1.genTransferRowKey)(tslib_1.__assign({}, cTransferProps));
    if (sourceCTableProps.data) {
        // 为本地数据数据生成rowKey
        sourceCTableProps.data = genRowKey(sourceCTableProps.data);
    }
    if (sourceCTableProps.fetcher) {
        var fetcher_1 = sourceCTableProps.fetcher;
        // 为远程数据数据生成rowKey
        sourceCTableProps.fetcher = function (option) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetcher_1(option)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, res), { data: genRowKey(tslib_1.__spreadArray([], tslib_1.__read(((_a = res === null || res === void 0 ? void 0 : res.data) !== null && _a !== void 0 ? _a : [])), false)) })];
                }
            });
        }); };
    }
    var config = tslib_1.__assign(tslib_1.__assign({ rowKey: constant_1.DEFAULT_KEY }, sourceCTableProps), { columns: sourceColumns, pagination: pagination, toolbar: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, baseConfig.toolbar), sourceCTableProps.toolbar), { left: [
                {
                    component: function () { return react_1.default.createElement(Header_1.LeftHeader, { cTransferProps: cTransferProps }); },
                },
            ] }), rowSelection: {
            type: 'checkbox',
            preserveCrossPageKeys: true,
            selectable: function (option) {
                // 用户传入需要禁用的项，选择达到上限需要禁用项
                var table = option.table;
                var selectAllKeys = table.selectedRowKeys || [];
                var matched = matchSelectedMax(table).matched;
                var bool = !!selectAllKeys.find(function (item) { return option.rowData[constant_1.ROW_KEY] === item; });
                if ((0, lodash_es_1.isPlainObject)(rowSelection)) {
                    var selectable = rowSelection.selectable;
                    // row可选： 选择过的key、用户设置且未达到上限
                    return bool || (!!(selectable === null || selectable === void 0 ? void 0 : selectable(option)) && !matched);
                }
                // row可选： 选择过的key、未达到上限
                return bool || !matched;
            },
        }, effects: function (option) {
            (0, CTable_1.onTableSelectRow)(function () {
                onSourceTableSelectRow();
            });
            (0, CTable_1.onTableInit)(function (_a) {
                var table = _a.table;
                // 默认值
                table.selectRow(defaultSelectedValues);
            });
            if (remote) {
                // mode为fetcher
                (0, CTable_1.onTableUpdateDataEnd)(function (_a) {
                    var table = _a.table;
                    cachedSourceInitData.current = table.initTotalData || [];
                    sourceTableChange();
                });
            }
            else if (sourceCTableProps.fetcher) {
                // mode为local+fetcher
                (0, CTable_1.onTableUpdateDataEnd)(function (_a) {
                    var table = _a.table;
                    cachedSourceInitData.current = table.initTotalData || [];
                    sourceTableChange();
                });
            }
            else {
                // mode为local
                setTimeout(function () {
                    // 异步的原因：table实例拿不到
                    cachedSourceInitData.current = option.table.initTotalData || [];
                    sourceTableChange();
                }, 0);
            }
            if (baseConfig.effects) {
                baseConfig.effects(option);
            }
            if (sourceCTableProps.effects) {
                sourceCTableProps.effects(option);
            }
        }, extraConfig: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, baseConfig.extraConfig), sourceCTableProps.extraConfig), { bottomLeftCheckAllCrossPage: true }), arcoTableProps: function (table) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({ showHeader: ((_a = sourceCTableProps.columns) === null || _a === void 0 ? void 0 : _a.length) ? true : false, rowSelection: {
                    // 渲染tooltip
                    renderCell: function (originNode, checked) {
                        var matched = matchSelectedMax(table).matched;
                        // 触发上限，disable的item给提示
                        if (matched && !checked) {
                            return react_1.default.createElement(web_react_1.Popover, { content: maxTooltip }, originNode);
                        }
                        return originNode;
                    },
                } }, baseConfig.arcoTableProps), sourceCTableProps.arcoTableProps));
        }, beforeInit: function (option) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, data;
                var _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!fetchInitData) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetchInitData(defaultSelectedValues)];
                        case 1:
                            _a = (_c.sent()).data, data = _a === void 0 ? [] : _a;
                            option.table.setGlobalScope((_b = {},
                                _b[constant_1.CACHE_REMOTE_DATA] = genRowKey(data),
                                _b));
                            _c.label = 2;
                        case 2:
                            if (sourceCTableProps.beforeInit) {
                                return [2 /*return*/, sourceCTableProps.beforeInit(option)];
                            }
                            return [2 /*return*/, {}];
                    }
                });
            });
        } });
    //分页
    if (pagination) {
        config.toolbar.bottomLeft = [
            {
                component: function () { return null; },
            },
        ];
    }
    return config;
};
exports.default = SourceTable;
//# sourceMappingURL=sourceTableConfig.js.map