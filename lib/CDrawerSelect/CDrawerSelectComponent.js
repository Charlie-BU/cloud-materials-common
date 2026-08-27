"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var lodash_es_1 = require("lodash-es");
var Base_1 = tslib_1.__importDefault(require("../CDrawer/Base"));
var CConfigProvider_1 = require("../CConfigProvider");
var interface_1 = require("./interface");
var TableSelect_1 = tslib_1.__importDefault(require("../CForm/react/Components/TableSelect"));
var react_2 = require("@formily/react");
var hooks_1 = require("../hooks");
var CDrawerSelectComponent = (0, react_2.observer)(function (props) {
    var defaultValue = props.value, visible = props.visible, customTip = props.customTip, searchConfig = props.searchConfig, showRefreshIcon = props.showRefreshIcon, _a = props.type, type = _a === void 0 ? interface_1.Type.radio : _a, footer = props.footer, _b = props.showDefaultFooter, showDefaultFooter = _b === void 0 ? false : _b, fetcher = props.fetcher, columns = props.columns, data = props.data, rowKey = props.rowKey, _c = props.min, min = _c === void 0 ? 0 : _c, _d = props.max, max = _d === void 0 ? Number.MAX_SAFE_INTEGER : _d, customErrorMessage = props.customErrorMessage, okButtonProps = props.okButtonProps, tableSelectProps = props.tableSelectProps, onCancel = props.onCancel, onOk = props.onOk, onChange = props.onChange, disabled = props.disabled, restDrawerConfig = tslib_1.__rest(props, ["value", "visible", "customTip", "searchConfig", "showRefreshIcon", "type", "footer", "showDefaultFooter", "fetcher", "columns", "data", "rowKey", "min", "max", "customErrorMessage", "okButtonProps", "tableSelectProps", "onCancel", "onOk", "onChange", "disabled"]);
    var _e = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _e.useCssPrefix, locale = _e.locale, formatLocale = _e.formatLocale;
    var cssPrefix = useCssPrefix('drawer-table-select');
    // 点击select输入框×时，组件值变更，value也要变更
    var _f = tslib_1.__read((0, hooks_1.useControlledValue)({ value: defaultValue }), 2), value = _f[0], setValue = _f[1];
    // 获取错误提示信息
    var errMsg = (0, react_1.useMemo)(function () {
        // 自定义校验信息放在最后，可以覆盖前面默认的数量校验文本
        var _customErrorMessage = (0, lodash_es_1.isFunction)(customErrorMessage) ? customErrorMessage(value) : customErrorMessage;
        if (_customErrorMessage)
            return _customErrorMessage;
        var len = (value === null || value === void 0 ? void 0 : value.length) || 0;
        if (min > len)
            return formatLocale(locale.CDrawerSelect.minMsg, { min: min });
        if (len > max)
            return formatLocale(locale.CDrawerSelect.maxMsg, { max: max });
        return '';
    }, [min, max, value, customErrorMessage]);
    // 单选且未传入footer时，将footer设为null
    var _footer = type === interface_1.Type.radio && (0, lodash_es_1.isNil)(footer) ? null : footer;
    var _g = tableSelectProps || {}, arcoTableProps = _g.arcoTableProps, otherTableSelectProps = tslib_1.__rest(_g, ["arcoTableProps"]);
    var getToolbar = function () {
        var _a = (tableSelectProps === null || tableSelectProps === void 0 ? void 0 : tableSelectProps.toolbar) || {}, _b = _a.left, left = _b === void 0 ? [] : _b, _c = _a.right, right = _c === void 0 ? [] : _c;
        customTip &&
            left.push({
                component: function () { return react_1.default.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["tip"], ["tip"]))) }, (0, lodash_es_1.isFunction)(customTip) ? customTip(value) : customTip); },
            });
        searchConfig && right.push.apply(right, tslib_1.__spreadArray([], tslib_1.__read(searchConfig), false));
        showRefreshIcon &&
            (right === null || right === void 0 ? void 0 : right.push({
                component: 'FunctionBtnList',
                componentProps: {
                    btnList: [{ component: 'RefreshBtn' }],
                },
            }));
        return tslib_1.__assign(tslib_1.__assign({}, tableSelectProps === null || tableSelectProps === void 0 ? void 0 : tableSelectProps.toolbar), { left: left, right: right });
    };
    return (react_1.default.createElement(Base_1.default, tslib_1.__assign({ wrapClassName: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["drawer"], ["drawer"]))), visible: visible, footer: showDefaultFooter ? undefined : _footer, autoFocus: false }, restDrawerConfig, { onCancel: function (e) {
            // 取消的时候，重置TableSelect选中的值
            setValue(defaultValue);
            onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
        }, okButtonProps: tslib_1.__assign({ disabled: Boolean(errMsg) }, okButtonProps), onOk: function () {
            onOk === null || onOk === void 0 ? void 0 : onOk(value);
        } }),
        react_1.default.createElement(TableSelect_1.default, tslib_1.__assign({ type: type, data: data, value: value, rowKey: rowKey, toolbar: getToolbar(), fetcher: fetcher, rowSelection: { preserveCrossPageKeys: true }, onChange: function (val) {
                setValue(val);
                // * 未使用默认footer再触发onChange，避免未点击确认按钮，抽屉还未关闭，就触发表单的onChange
                !showDefaultFooter && (onChange === null || onChange === void 0 ? void 0 : onChange(val));
                // 单选且没有配置footer时，选择值后关闭Drawer
                if (type === 'radio' && !showDefaultFooter) {
                    !_footer && (onOk === null || onOk === void 0 ? void 0 : onOk(val));
                }
            }, disabled: disabled, columns: columns, pagination: true, arcoTableProps: (0, lodash_es_1.isFunction)(arcoTableProps)
                ? arcoTableProps
                : tslib_1.__assign(tslib_1.__assign({}, arcoTableProps), { scroll: tslib_1.__assign({ y: false }, arcoTableProps === null || arcoTableProps === void 0 ? void 0 : arcoTableProps.scroll) }) }, otherTableSelectProps)),
        react_1.default.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["error-message"], ["error-message"]))) }, errMsg)));
});
CDrawerSelectComponent.displayName = 'CDrawerSelectComponent';
exports.default = CDrawerSelectComponent;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CDrawerSelectComponent.js.map