import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import React from 'react';
import { onTableSelectRow, onTableInit, onTableUpdateDataEnd } from '../../CTable';
import { LeftHeader } from '../components/Header';
import { isPlainObject } from 'lodash-es';
import { Popover } from '@arco-design/web-react';
import { DEFAULT_KEY, ROW_KEY, CACHE_REMOTE_DATA } from '../constant';
import { mode, genTransferRowKey } from './tools';
import { getColumns } from './getColumns';
import { getTableBaseConfig } from './getTableBaseConfig';
import { getPagination } from './getPagination';
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
    var remote = mode(__assign({}, cTransferProps)).remote;
    // 获取table配置
    var sourceColumns = getColumns(cTransferProps).sourceColumns;
    var baseConfig = getTableBaseConfig(__assign({}, cTransferProps), locale);
    var sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
    var _d = __read(getPagination(__assign({}, cTransferProps)), 1), pagination = _d[0];
    var rowSelection = sourceCTableProps.rowSelection;
    var genRowKey = genTransferRowKey(__assign({}, cTransferProps));
    if (sourceCTableProps.data) {
        // 为本地数据数据生成rowKey
        sourceCTableProps.data = genRowKey(sourceCTableProps.data);
    }
    if (sourceCTableProps.fetcher) {
        var fetcher_1 = sourceCTableProps.fetcher;
        // 为远程数据数据生成rowKey
        sourceCTableProps.fetcher = function (option) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetcher_1(option)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, __assign(__assign({}, res), { data: genRowKey(__spreadArray([], __read(((_a = res === null || res === void 0 ? void 0 : res.data) !== null && _a !== void 0 ? _a : [])), false)) })];
                }
            });
        }); };
    }
    var config = __assign(__assign({ rowKey: DEFAULT_KEY }, sourceCTableProps), { columns: sourceColumns, pagination: pagination, toolbar: __assign(__assign(__assign({}, baseConfig.toolbar), sourceCTableProps.toolbar), { left: [
                {
                    component: function () { return React.createElement(LeftHeader, { cTransferProps: cTransferProps }); },
                },
            ] }), rowSelection: {
            type: 'checkbox',
            preserveCrossPageKeys: true,
            selectable: function (option) {
                // 用户传入需要禁用的项，选择达到上限需要禁用项
                var table = option.table;
                var selectAllKeys = table.selectedRowKeys || [];
                var matched = matchSelectedMax(table).matched;
                var bool = !!selectAllKeys.find(function (item) { return option.rowData[ROW_KEY] === item; });
                if (isPlainObject(rowSelection)) {
                    var selectable = rowSelection.selectable;
                    // row可选： 选择过的key、用户设置且未达到上限
                    return bool || (!!(selectable === null || selectable === void 0 ? void 0 : selectable(option)) && !matched);
                }
                // row可选： 选择过的key、未达到上限
                return bool || !matched;
            },
        }, effects: function (option) {
            onTableSelectRow(function () {
                onSourceTableSelectRow();
            });
            onTableInit(function (_a) {
                var table = _a.table;
                // 默认值
                table.selectRow(defaultSelectedValues);
            });
            if (remote) {
                // mode为fetcher
                onTableUpdateDataEnd(function (_a) {
                    var table = _a.table;
                    cachedSourceInitData.current = table.initTotalData || [];
                    sourceTableChange();
                });
            }
            else if (sourceCTableProps.fetcher) {
                // mode为local+fetcher
                onTableUpdateDataEnd(function (_a) {
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
        }, extraConfig: __assign(__assign(__assign({}, baseConfig.extraConfig), sourceCTableProps.extraConfig), { bottomLeftCheckAllCrossPage: true }), arcoTableProps: function (table) {
            var _a;
            return (__assign(__assign({ showHeader: ((_a = sourceCTableProps.columns) === null || _a === void 0 ? void 0 : _a.length) ? true : false, rowSelection: {
                    // 渲染tooltip
                    renderCell: function (originNode, checked) {
                        var matched = matchSelectedMax(table).matched;
                        // 触发上限，disable的item给提示
                        if (matched && !checked) {
                            return React.createElement(Popover, { content: maxTooltip }, originNode);
                        }
                        return originNode;
                    },
                } }, baseConfig.arcoTableProps), sourceCTableProps.arcoTableProps));
        }, beforeInit: function (option) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, data;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!fetchInitData) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetchInitData(defaultSelectedValues)];
                        case 1:
                            _a = (_c.sent()).data, data = _a === void 0 ? [] : _a;
                            option.table.setGlobalScope((_b = {},
                                _b[CACHE_REMOTE_DATA] = genRowKey(data),
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
export default SourceTable;
//# sourceMappingURL=sourceTableConfig.js.map