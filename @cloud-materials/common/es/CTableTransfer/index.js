import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import classNames from 'classnames';
import Table from '../CTable';
import Operation from './components/Operation';
import { getPagination, mode } from './utils';
import { useCTransfer } from './hooks';
import { CConfigContext } from '../CConfigProvider';
import Delete from './components/Delete';
var InnerCTableTransfer = forwardRef(function (props, ref) {
    var _a, _b, _c;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    var _d = useCTransfer(__assign({}, props)), sourceTable = _d.sourceTable, targetTable = _d.targetTable, onMove = _d.onMove;
    var _e = __read(getPagination(__assign({}, props)), 2), sourcePagination = _e[0], targetPagination = _e[1];
    var _f = mode(__assign({}, props)), simple = _f.simple, table = _f.table, remote = _f.remote;
    var listStyle = props.listStyle, className = props.className;
    var baseClassNames = (_a = {},
        _a[cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["view"], ["view"])))] = true,
        _a[cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["remote-hide"], ["remote-hide"])))] = remote,
        _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["table-mode"], ["table-mode"])))] = !!table,
        _a);
    var leftClassNames = classNames(__assign(__assign({}, baseClassNames), (_b = {}, _b[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["left-simple"], ["left-simple"])))] = simple, _b[cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["pagination-mode"], ["pagination-mode"])))] = !!sourcePagination, _b)));
    var rightClassNames = classNames(__assign(__assign({}, baseClassNames), (_c = {}, _c[cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["right-simple"], ["right-simple"])))] = simple, _c[cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["pagination-mode"], ["pagination-mode"])))] = !!targetPagination, _c[cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["right-pagination-mode"], ["right-pagination-mode"])))] = !!targetPagination, _c)));
    useImperativeHandle(ref, function () { return ({
        sourceTable: sourceTable,
        targetTable: targetTable,
    }); });
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject([""], [""]))), className), "data-cy": "c-m-table-transfer" },
        React.createElement("div", { className: leftClassNames, style: Array.isArray(listStyle) ? listStyle[0] : listStyle },
            React.createElement(Table, { table: sourceTable })),
        React.createElement(Operation, { sourceTable: sourceTable, targetTable: targetTable, cTransferProps: props, onMove: onMove }),
        React.createElement("div", { className: rightClassNames, style: Array.isArray(listStyle) ? listStyle[1] : listStyle },
            React.createElement(Table, { table: targetTable }))));
});
var CTableTransfer = Object.assign(InnerCTableTransfer, {
    Delete: Delete,
});
CTableTransfer.displayName = 'CTableTransfer';
export default CTableTransfer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map