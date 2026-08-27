"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTableSelect = exports.tableSelectTestId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var CTable_1 = tslib_1.__importStar(require("../../../../CTable"));
var react_2 = require("@formily/react");
var utils_1 = require("./utils");
var lodash_es_1 = require("lodash-es");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-table-select');
exports.tableSelectTestId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    filter: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["filter"], ["filter"]))),
};
var CTableSelectComponent = react_1.default.forwardRef(function (props, ref) {
    var _a, _b;
    var _c = props.type, type = _c === void 0 ? 'radio' : _c, fetcher = props.fetcher, value = props.value, onChange = props.onChange, afterSelectRow = props.afterSelectRow, customEffects = props.effects, _d = props.rowSelection, rowSelection = _d === void 0 ? {} : _d, renderSelectCell = props.renderSelectCell, loading = props.loading, disabled = props.disabled, tableProps = props.tableProps, arcoTableProps = props.arcoTableProps, restSelectProps = tslib_1.__rest(props, ["type", "fetcher", "value", "onChange", "afterSelectRow", "effects", "rowSelection", "renderSelectCell", "loading", "disabled", "tableProps", "arcoTableProps"]);
    var field = (0, react_2.useField)();
    var cleanTableProps = (0, lodash_es_1.omit)(restSelectProps, [
        'type',
        'filterOptions',
        'onChange',
        'value',
        'columns',
        'allValueOption',
    ]);
    var _e = tableProps || {}, className = _e.className, restTableProps = tslib_1.__rest(_e, ["className"]);
    // 判断自定义的rowSelection 是字符串还是一个对象
    var _rowSelection = typeof rowSelection === 'object' ? rowSelection : { type: rowSelection };
    var tableRef = (0, react_1.useRef)(null);
    tableRef = (_a = ref) !== null && _a !== void 0 ? _a : tableRef;
    (0, react_1.useEffect)(function () {
        var _a, _b;
        // 监听，整个组件disabled状态发生变化 && table.totalData 变化时（历史逻辑，rowData.disabled也可以设置某行的禁止状态）——设置行是否可选择
        (_b = (_a = tableRef === null || tableRef === void 0 ? void 0 : tableRef.current) === null || _a === void 0 ? void 0 : _a.rows) === null || _b === void 0 ? void 0 : _b.forEach(function (row) {
            var _a, _b;
            var rowDisabled = 
            // row禁止选择的场景：全局禁止；某行selectable为false；或者某行数据传入了disabled
            disabled ||
                ((_a = _rowSelection === null || _rowSelection === void 0 ? void 0 : _rowSelection.selectable) === null || _a === void 0 ? void 0 : _a.call(_rowSelection, { table: tableRef === null || tableRef === void 0 ? void 0 : tableRef.current, row: row, rowData: row === null || row === void 0 ? void 0 : row.data })) ===
                    false ||
                ((_b = row === null || row === void 0 ? void 0 : row.data) === null || _b === void 0 ? void 0 : _b.disabled);
            row.setSelectable(!rowDisabled);
        });
    }, [disabled, (_b = tableRef === null || tableRef === void 0 ? void 0 : tableRef.current) === null || _b === void 0 ? void 0 : _b.totalData]);
    var config = CTable_1.default.getConfig(tslib_1.__assign(tslib_1.__assign({ pagination: false }, cleanTableProps), { toolbar: (0, utils_1.getToolbarConfig)(props), rowSelection: tslib_1.__assign({ type: type }, _rowSelection), columns: (0, utils_1.getColumnFilterDefault)(props), arcoTableProps: function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var customArcoTableProps = (0, lodash_es_1.isFunction)(arcoTableProps) ? arcoTableProps.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)) : arcoTableProps;
            var customCheckboxProps = (_a = customArcoTableProps === null || customArcoTableProps === void 0 ? void 0 : customArcoTableProps.rowSelection) === null || _a === void 0 ? void 0 : _a.checkboxProps;
            var arcoRowSelection = tslib_1.__assign({ selectedRowKeys: type === 'radio' ? [value] : value || [], onChange: function (val) { return onChange === null || onChange === void 0 ? void 0 : onChange(type === 'radio' ? val === null || val === void 0 ? void 0 : val[0] : val || []); } }, customArcoTableProps === null || customArcoTableProps === void 0 ? void 0 : customArcoTableProps.rowSelection);
            // 当传入自定义时，该字段配置才会生效；原因，传入checkboxProps属性时，会覆盖掉当前的selectable配置
            customCheckboxProps &&
                Object.assign(arcoRowSelection, {
                    checkboxProps: function (record) {
                        var _a;
                        var _customCheckboxProps = (0, lodash_es_1.isFunction)(customCheckboxProps)
                            ? customCheckboxProps(record)
                            : customCheckboxProps;
                        return tslib_1.__assign({ disabled: ((_a = record === null || record === void 0 ? void 0 : record.data) === null || _a === void 0 ? void 0 : _a.disabled) || disabled }, _customCheckboxProps);
                    },
                });
            return tslib_1.__assign(tslib_1.__assign({ border: true, size: 'middle', rowClassName: utils_1.getRowClassName, loading: loading }, customArcoTableProps), { scroll: tslib_1.__assign({ y: 200 }, customArcoTableProps === null || customArcoTableProps === void 0 ? void 0 : customArcoTableProps.scroll), rowSelection: tslib_1.__assign(tslib_1.__assign({}, arcoRowSelection), { renderCell: renderSelectCell }) });
        }, fetcher: fetcher, effects: function (options) {
            (0, CTable_1.onRowSelect)(function (options) {
                afterSelectRow === null || afterSelectRow === void 0 ? void 0 : afterSelectRow(options, options.table.selectedRowKeys);
            });
            customEffects === null || customEffects === void 0 ? void 0 : customEffects(options);
            (0, CTable_1.onTableUpdateDataEnd)(function (_a) {
                var table = _a.table;
                // 通过fetcher设置table的数据后，设置field的dataSource
                fetcher && (field === null || field === void 0 ? void 0 : field.setDataSource(table === null || table === void 0 ? void 0 : table.totalData));
            });
        } }));
    return (react_1.default.createElement(CTable_1.default, tslib_1.__assign({ ref: tableRef, config: config, className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-cy": exports.tableSelectTestId.container }, restTableProps)));
});
exports.CTableSelect = (0, react_2.connect)(CTableSelectComponent, (0, react_2.mapProps)(function (props, field) {
    var _a;
    if (!field)
        return props;
    return {
        data: props.data || field.dataSource,
        rowKey: props.rowKey,
        loading: field.loading,
        disabled: (_a = props.disabled) !== null && _a !== void 0 ? _a : field.disabled,
    };
}));
exports.CTableSelect.displayName = 'CTableSelect';
exports.default = exports.CTableSelect;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map