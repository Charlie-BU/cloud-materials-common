import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
/* eslint-disable react-hooks/rules-of-hooks */
import { Popover, Radio } from '@arco-design/web-react';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { formatCellData } from '../../../../../shared';
import { ExportDataRangeType } from '../index';
import { CheckBoxList } from './CheckBoxList';
import { exportDataToCSV } from './exportData';
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
import { useCConfigContext } from '../../../../../../CConfigProvider';
import CModal from '../../../../../../CModal/Base';
import { usePrefix } from '../../../../../react';
var getAllColumns = function (table, options) {
    var tableColumns = table.columns
        .filter(function (c) { return !c.hidden; })
        .map(function (item) {
        var _a;
        var dataIndex = item.config.dataIndex;
        return {
            dataIndex: dataIndex,
            title: item.title,
            formatter: ((_a = options.formatter) === null || _a === void 0 ? void 0 : _a[dataIndex]) ||
                (function (dataItem) {
                    return formatCellData({
                        cellData: dataItem === null || dataItem === void 0 ? void 0 : dataItem[dataIndex],
                        table: table,
                        column: item,
                        rowData: dataItem,
                    });
                }),
        };
    });
    var extraColumns = options.extraColumns || [];
    // 过滤 tableColumns 中与 extraColumns 中冲突的配置
    tableColumns = tableColumns.filter(function (item) { return extraColumns.findIndex(function (extraColumn) { return extraColumn.dataIndex === item.dataIndex; }) === -1; });
    var allColumns = __spreadArray(__spreadArray([], __read(tableColumns), false), __read(extraColumns), false).filter(function (item) { var _a, _b; return !((_b = (_a = options.ignoreDataIndex) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, item.dataIndex)); });
    return allColumns;
};
export var ExportDataModal = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var table = _a.table, options = _a.options;
    var prefixCls = usePrefix('export-data');
    var allColumns = getAllColumns(table, options);
    var _d = __read(useState(false), 2), showModal = _d[0], setShowModal = _d[1];
    var _e = __read(useState(function () { return (options.defaultChecked === 'all' ? allColumns.map(function (item) { return item.dataIndex; }) : options.defaultChecked) || []; }), 2), checkedDataIndex = _e[0], setCheckedDataIndex = _e[1];
    // 用于标记，初始化时，如果值为空，不马上报错误信息，用户操作后才出
    var _f = __read(useState(false), 2), hasOperated = _f[0], setHasOperated = _f[1];
    var _g = __read(useState(ExportDataRangeType.all), 2), exportRangeType = _g[0], setExportRangeType = _g[1];
    var _h = options.showExportRangeKeys, showExportRangeKeys = _h === void 0 ? [ExportDataRangeType.all, ExportDataRangeType.selectedRows, ExportDataRangeType.searchResult] : _h;
    var locale = useCConfigContext().locale;
    var exportRangeNode = options.showExportRange && (React.createElement("div", { className: "".concat(prefixCls, "-range-container") },
        React.createElement("div", { className: "".concat(prefixCls, "-section-title") },
            React.createElement("span", null, locale.CTable.exportRange)),
        React.createElement(Radio.Group, { value: exportRangeType, onChange: function (val) { return setExportRangeType(val); } },
            showExportRangeKeys.includes(ExportDataRangeType.all) && (React.createElement(Radio, { value: ExportDataRangeType.all }, locale.CTable.exportAllData)),
            table.config.rowSelection && showExportRangeKeys.includes(ExportDataRangeType.selectedRows) && (React.createElement(Popover, { disabled: table.selectedRowKeys.length !== 0, content: locale.CTable.noBatchCheck },
                React.createElement(Radio, { value: ExportDataRangeType.selectedRows, disabled: table.selectedRowKeys.length === 0 }, locale.CTable.exportSelectedData))),
            showExportRangeKeys.includes(ExportDataRangeType.searchResult) && (React.createElement(Radio, { value: ExportDataRangeType.searchResult }, locale.CTable.exportCurrentSearch))),
        React.createElement("div", null, (_b = options === null || options === void 0 ? void 0 : options.getExportRangeDesc) === null || _b === void 0 ? void 0 : _b.call(options, { curChosenType: exportRangeType, table: table }))));
    var checkDataIndexNode = (React.createElement("div", null,
        React.createElement(CheckBoxList, { value: checkedDataIndex, items: allColumns.map(function (item) { return ({
                title: item.title,
                key: item.dataIndex,
            }); }), disabledKeys: options.disabledDataIndex, onChange: function (val) {
                setHasOperated(true);
                setCheckedDataIndex(val);
            }, prefixCls: prefixCls }),
        hasOperated && checkedDataIndex.length === 0 && (React.createElement("span", { className: "".concat(prefixCls, "-input-error") }, locale.CTable.selectAtLeastOne))));
    var contentNode = ((_c = options.renderContent) === null || _c === void 0 ? void 0 : _c.call(options, { exportRangeNode: exportRangeNode, checkDataIndexNode: checkDataIndexNode })) || (React.createElement(React.Fragment, null,
        exportRangeNode,
        checkDataIndexNode));
    var modalConfig = __assign({ visible: showModal, title: locale.CTable.exportData, style: {
            width: 520,
        }, className: "".concat(prefixCls, "-modal"), onCancel: function () {
            setShowModal(false);
        }, onOk: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1, exportOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (checkedDataIndex.length === 0) {
                            setHasOperated(true);
                            return [2 /*return*/];
                        }
                        data = table.initTotalData;
                        if (!(exportRangeType === ExportDataRangeType.selectedRows)) return [3 /*break*/, 1];
                        data = table.selectedRowData;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!options.fetcher) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, options.fetcher({ table: table, checkedDataIndex: checkedDataIndex, exportRangeType: exportRangeType })];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('export data failed', error_1);
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5:
                        exportOptions = {
                            fileName: options.filename || locale.CTable.exportedData,
                            columns: allColumns.filter(function (item) { return checkedDataIndex.includes(item.dataIndex); }),
                            data: data,
                        };
                        exportOptions = options.formatConfigBeforeExport
                            ? options.formatConfigBeforeExport(exportOptions)
                            : exportOptions;
                        if (options.downloadData) {
                            options.downloadData(exportOptions);
                        }
                        else {
                            exportDataToCSV(exportOptions);
                        }
                        setShowModal(false);
                        return [2 /*return*/];
                }
            });
        }); } }, options.modalProps);
    useEffect(function () {
        // 若重新打开弹窗后，目前选中的是导出选中行，但无选中行信息，此时导出选中行的按钮为禁用的，因此需要切换为没有禁用的全部导出选项
        if (showModal && table.selectedRowKeys.length === 0 && exportRangeType === ExportDataRangeType.selectedRows) {
            setExportRangeType(ExportDataRangeType.all);
        }
    }, [showModal]);
    useImperativeHandle(ref, function () { return ({
        openModal: function () { return setShowModal(true); },
        toogleModal: function (visible) { return setShowModal(visible); },
    }); });
    return React.createElement(CModal, __assign({}, modalConfig), contentNode);
});
//# sourceMappingURL=exportModal.js.map