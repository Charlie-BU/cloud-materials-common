"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CTable_1 = tslib_1.__importDefault(require("../CTable"));
var Operation_1 = tslib_1.__importDefault(require("./components/Operation"));
var utils_1 = require("./utils");
var hooks_1 = require("./hooks");
var CConfigProvider_1 = require("../CConfigProvider");
var Delete_1 = tslib_1.__importDefault(require("./components/Delete"));
var InnerCTableTransfer = (0, react_1.forwardRef)(function (props, ref) {
    var _a, _b, _c;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    var _d = (0, hooks_1.useCTransfer)(tslib_1.__assign({}, props)), sourceTable = _d.sourceTable, targetTable = _d.targetTable, onMove = _d.onMove;
    var _e = tslib_1.__read((0, utils_1.getPagination)(tslib_1.__assign({}, props)), 2), sourcePagination = _e[0], targetPagination = _e[1];
    var _f = (0, utils_1.mode)(tslib_1.__assign({}, props)), simple = _f.simple, table = _f.table, remote = _f.remote;
    var listStyle = props.listStyle, className = props.className;
    var baseClassNames = (_a = {},
        _a[cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["view"], ["view"])))] = true,
        _a[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["remote-hide"], ["remote-hide"])))] = remote,
        _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["table-mode"], ["table-mode"])))] = !!table,
        _a);
    var leftClassNames = (0, classnames_1.default)(tslib_1.__assign(tslib_1.__assign({}, baseClassNames), (_b = {}, _b[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["left-simple"], ["left-simple"])))] = simple, _b[cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["pagination-mode"], ["pagination-mode"])))] = !!sourcePagination, _b)));
    var rightClassNames = (0, classnames_1.default)(tslib_1.__assign(tslib_1.__assign({}, baseClassNames), (_c = {}, _c[cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["right-simple"], ["right-simple"])))] = simple, _c[cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["pagination-mode"], ["pagination-mode"])))] = !!targetPagination, _c[cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["right-pagination-mode"], ["right-pagination-mode"])))] = !!targetPagination, _c)));
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        sourceTable: sourceTable,
        targetTable: targetTable,
    }); });
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-cy": "c-m-table-transfer" },
        react_1.default.createElement("div", { className: leftClassNames, style: Array.isArray(listStyle) ? listStyle[0] : listStyle },
            react_1.default.createElement(CTable_1.default, { table: sourceTable })),
        react_1.default.createElement(Operation_1.default, { sourceTable: sourceTable, targetTable: targetTable, cTransferProps: props, onMove: onMove }),
        react_1.default.createElement("div", { className: rightClassNames, style: Array.isArray(listStyle) ? listStyle[1] : listStyle },
            react_1.default.createElement(CTable_1.default, { table: targetTable }))));
});
var CTableTransfer = Object.assign(InnerCTableTransfer, {
    Delete: Delete_1.default,
});
CTableTransfer.displayName = 'CTableTransfer';
exports.default = CTableTransfer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map