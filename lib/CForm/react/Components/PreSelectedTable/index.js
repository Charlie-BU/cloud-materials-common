"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreSelectedTable = exports.selectedTableTestId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var CTable_1 = tslib_1.__importDefault(require("../../../../CTable"));
var react_2 = require("@formily/react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../../../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-selected-table');
exports.selectedTableTestId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    table: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["table"], ["table"]))),
};
var PreSelectedTableComponent = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var value = props.value, onChange = props.onChange, tableProps = props.tableProps, _b = props.minCount, minCount = _b === void 0 ? 1 : _b, _c = props.showBatchConfig, showBatchConfig = _c === void 0 ? true : _c, arcoTableProps = props.arcoTableProps, customTip = props.customTip, columns = props.columns, rowKey = props.rowKey, disabled = props.disabled, style = props.style, className = props.className, restTableConfig = tslib_1.__rest(props, ["value", "onChange", "tableProps", "minCount", "showBatchConfig", "arcoTableProps", "customTip", "columns", "rowKey", "disabled", "style", "className"]);
    var tableRef = (0, react_1.useRef)(null);
    tableRef = (_a = ref) !== null && _a !== void 0 ? _a : tableRef;
    var _customTip = (0, lodash_es_1.isFunction)(customTip) ? customTip(value) : customTip;
    var showTip = showBatchConfig || _customTip;
    var _d = (0, CConfigProvider_1.useCConfigContext)(), locale = _d.locale, formatLocale = _d.formatLocale, useCssPrefix = _d.useCssPrefix;
    var cssPrefix = useCssPrefix('cform-selected-table');
    var defaultTips = formatLocale(locale.PreSelectedTable.defaultTips, { count: (value === null || value === void 0 ? void 0 : value.length) || 0 });
    var removeColumns = CTable_1.default.defineColumn({
        title: locale.PreSelectedTable.operationTitle,
        component: 'COperationMenu',
        fixed: 'right',
        componentProps: function (_a) {
            var table = _a.table, rowData = _a.rowData;
            var disabledByMinCount = table.total <= minCount;
            return {
                operations: [
                    {
                        name: locale.PreSelectedTable.removeText,
                        arcoPopconfirmProps: {
                            title: locale.PreSelectedTable.confirmRemoveText,
                            onOk: function () { var _a; return onChange === null || onChange === void 0 ? void 0 : onChange((_a = value === null || value === void 0 ? void 0 : value.filter(function (val) { return (val === null || val === void 0 ? void 0 : val[rowKey]) !== rowData[rowKey]; })) !== null && _a !== void 0 ? _a : []); },
                        },
                        disabled: disabled || disabledByMinCount,
                        tooltip: disabledByMinCount && formatLocale(locale.PreSelectedTable.lessWarning, { count: minCount }),
                    },
                ],
            };
        },
    });
    var config = CTable_1.default.getConfig(tslib_1.__assign(tslib_1.__assign({ pagination: false, data: value, rowKey: rowKey, columns: showBatchConfig ? columns === null || columns === void 0 ? void 0 : columns.concat([removeColumns]) : columns }, restTableConfig), { arcoTableProps: (0, lodash_es_1.isFunction)(arcoTableProps)
            ? arcoTableProps
            : tslib_1.__assign(tslib_1.__assign({ border: true }, arcoTableProps), { scroll: tslib_1.__assign({ y: 224 }, arcoTableProps === null || arcoTableProps === void 0 ? void 0 : arcoTableProps.scroll) }) }));
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))), className), style: style, "data-cy": exports.selectedTableTestId.container },
        showTip && react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["tips"], ["tips"]))) }, _customTip ? _customTip : defaultTips),
        react_1.default.createElement(CTable_1.default, tslib_1.__assign({ ref: tableRef, config: config, "data-cy": exports.selectedTableTestId.table }, tableProps))));
});
exports.PreSelectedTable = (0, react_2.connect)(PreSelectedTableComponent, (0, react_2.mapProps)(function (props, field) {
    var _a;
    if (!field)
        return props;
    return {
        value: props.data || field.value,
        rowKey: props.rowKey,
        disabled: (_a = props.disabled) !== null && _a !== void 0 ? _a : field.disabled,
    };
}));
exports.PreSelectedTable.displayName = 'PreSelectedTable';
exports.default = exports.PreSelectedTable;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map