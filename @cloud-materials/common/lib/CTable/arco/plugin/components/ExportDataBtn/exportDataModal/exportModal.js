"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDataModal = void 0;
var tslib_1 = require("tslib");
/* eslint-disable react-hooks/rules-of-hooks */
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importStar(require("react"));
var shared_1 = require("../../../../../shared");
var index_1 = require("../index");
var CheckBoxList_1 = require("./CheckBoxList");
var exportData_1 = require("./exportData");
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
var CConfigProvider_1 = require("../../../../../../CConfigProvider");
var Base_1 = tslib_1.__importDefault(require("../../../../../../CModal/Base"));
var react_2 = require("../../../../../react");
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
                    return (0, shared_1.formatCellData)({
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
    var allColumns = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(tableColumns), false), tslib_1.__read(extraColumns), false).filter(function (item) { var _a, _b; return !((_b = (_a = options.ignoreDataIndex) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, item.dataIndex)); });
    return allColumns;
};
exports.ExportDataModal = react_1.default.forwardRef(function (_a, ref) {
    var _b, _c;
    var table = _a.table, options = _a.options;
    var prefixCls = (0, react_2.usePrefix)('export-data');
    var allColumns = getAllColumns(table, options);
    var _d = tslib_1.__read((0, react_1.useState)(false), 2), showModal = _d[0], setShowModal = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(function () { return (options.defaultChecked === 'all' ? allColumns.map(function (item) { return item.dataIndex; }) : options.defaultChecked) || []; }), 2), checkedDataIndex = _e[0], setCheckedDataIndex = _e[1];
    // 用于标记，初始化时，如果值为空，不马上报错误信息，用户操作后才出
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), hasOperated = _f[0], setHasOperated = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(index_1.ExportDataRangeType.all), 2), exportRangeType = _g[0], setExportRangeType = _g[1];
    var _h = options.showExportRangeKeys, showExportRangeKeys = _h === void 0 ? [index_1.ExportDataRangeType.all, index_1.ExportDataRangeType.selectedRows, index_1.ExportDataRangeType.searchResult] : _h;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var exportRangeNode = options.showExportRange && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-range-container") },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-section-title") },
            react_1.default.createElement("span", null, locale.CTable.exportRange)),
        react_1.default.createElement(web_react_1.Radio.Group, { value: exportRangeType, onChange: function (val) { return setExportRangeType(val); } },
            showExportRangeKeys.includes(index_1.ExportDataRangeType.all) && (react_1.default.createElement(web_react_1.Radio, { value: index_1.ExportDataRangeType.all }, locale.CTable.exportAllData)),
            table.config.rowSelection && showExportRangeKeys.includes(index_1.ExportDataRangeType.selectedRows) && (react_1.default.createElement(web_react_1.Popover, { disabled: table.selectedRowKeys.length !== 0, content: locale.CTable.noBatchCheck },
                react_1.default.createElement(web_react_1.Radio, { value: index_1.ExportDataRangeType.selectedRows, disabled: table.selectedRowKeys.length === 0 }, locale.CTable.exportSelectedData))),
            showExportRangeKeys.includes(index_1.ExportDataRangeType.searchResult) && (react_1.default.createElement(web_react_1.Radio, { value: index_1.ExportDataRangeType.searchResult }, locale.CTable.exportCurrentSearch))),
        react_1.default.createElement("div", null, (_b = options === null || options === void 0 ? void 0 : options.getExportRangeDesc) === null || _b === void 0 ? void 0 : _b.call(options, { curChosenType: exportRangeType, table: table }))));
    var checkDataIndexNode = (react_1.default.createElement("div", null,
        react_1.default.createElement(CheckBoxList_1.CheckBoxList, { value: checkedDataIndex, items: allColumns.map(function (item) { return ({
                title: item.title,
                key: item.dataIndex,
            }); }), disabledKeys: options.disabledDataIndex, onChange: function (val) {
                setHasOperated(true);
                setCheckedDataIndex(val);
            }, prefixCls: prefixCls }),
        hasOperated && checkedDataIndex.length === 0 && (react_1.default.createElement("span", { className: "".concat(prefixCls, "-input-error") }, locale.CTable.selectAtLeastOne))));
    var contentNode = ((_c = options.renderContent) === null || _c === void 0 ? void 0 : _c.call(options, { exportRangeNode: exportRangeNode, checkDataIndexNode: checkDataIndexNode })) || (react_1.default.createElement(react_1.default.Fragment, null,
        exportRangeNode,
        checkDataIndexNode));
    var modalConfig = tslib_1.__assign({ visible: showModal, title: locale.CTable.exportData, style: {
            width: 520,
        }, className: "".concat(prefixCls, "-modal"), onCancel: function () {
            setShowModal(false);
        }, onOk: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var data, error_1, exportOptions;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (checkedDataIndex.length === 0) {
                            setHasOperated(true);
                            return [2 /*return*/];
                        }
                        data = table.initTotalData;
                        if (!(exportRangeType === index_1.ExportDataRangeType.selectedRows)) return [3 /*break*/, 1];
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
                            (0, exportData_1.exportDataToCSV)(exportOptions);
                        }
                        setShowModal(false);
                        return [2 /*return*/];
                }
            });
        }); } }, options.modalProps);
    (0, react_1.useEffect)(function () {
        // 若重新打开弹窗后，目前选中的是导出选中行，但无选中行信息，此时导出选中行的按钮为禁用的，因此需要切换为没有禁用的全部导出选项
        if (showModal && table.selectedRowKeys.length === 0 && exportRangeType === index_1.ExportDataRangeType.selectedRows) {
            setExportRangeType(index_1.ExportDataRangeType.all);
        }
    }, [showModal]);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        openModal: function () { return setShowModal(true); },
        toogleModal: function (visible) { return setShowModal(visible); },
    }); });
    return react_1.default.createElement(Base_1.default, tslib_1.__assign({}, modalConfig), contentNode);
});
//# sourceMappingURL=exportModal.js.map