import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useRef } from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import CTable from '../../../../CTable';
import { connect, mapProps } from '@formily/react';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { useCConfigContext } from '../../../../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('cform-selected-table');
export var selectedTableTestId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    table: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["table"], ["table"]))),
};
var PreSelectedTableComponent = React.forwardRef(function (props, ref) {
    var _a;
    var value = props.value, onChange = props.onChange, tableProps = props.tableProps, _b = props.minCount, minCount = _b === void 0 ? 1 : _b, _c = props.showBatchConfig, showBatchConfig = _c === void 0 ? true : _c, arcoTableProps = props.arcoTableProps, customTip = props.customTip, columns = props.columns, rowKey = props.rowKey, disabled = props.disabled, style = props.style, className = props.className, restTableConfig = __rest(props, ["value", "onChange", "tableProps", "minCount", "showBatchConfig", "arcoTableProps", "customTip", "columns", "rowKey", "disabled", "style", "className"]);
    var tableRef = useRef(null);
    tableRef = (_a = ref) !== null && _a !== void 0 ? _a : tableRef;
    var _customTip = isFunction(customTip) ? customTip(value) : customTip;
    var showTip = showBatchConfig || _customTip;
    var _d = useCConfigContext(), locale = _d.locale, formatLocale = _d.formatLocale, useCssPrefix = _d.useCssPrefix;
    var cssPrefix = useCssPrefix('cform-selected-table');
    var defaultTips = formatLocale(locale.PreSelectedTable.defaultTips, { count: (value === null || value === void 0 ? void 0 : value.length) || 0 });
    var removeColumns = CTable.defineColumn({
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
    var config = CTable.getConfig(__assign(__assign({ pagination: false, data: value, rowKey: rowKey, columns: showBatchConfig ? columns === null || columns === void 0 ? void 0 : columns.concat([removeColumns]) : columns }, restTableConfig), { arcoTableProps: isFunction(arcoTableProps)
            ? arcoTableProps
            : __assign(__assign({ border: true }, arcoTableProps), { scroll: __assign({ y: 224 }, arcoTableProps === null || arcoTableProps === void 0 ? void 0 : arcoTableProps.scroll) }) }));
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))), className), style: style, "data-cy": selectedTableTestId.container },
        showTip && React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["tips"], ["tips"]))) }, _customTip ? _customTip : defaultTips),
        React.createElement(CTable, __assign({ ref: tableRef, config: config, "data-cy": selectedTableTestId.table }, tableProps))));
});
export var PreSelectedTable = connect(PreSelectedTableComponent, mapProps(function (props, field) {
    var _a;
    if (!field)
        return props;
    return {
        value: props.data || field.value,
        rowKey: props.rowKey,
        disabled: (_a = props.disabled) !== null && _a !== void 0 ? _a : field.disabled,
    };
}));
PreSelectedTable.displayName = 'PreSelectedTable';
export default PreSelectedTable;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map