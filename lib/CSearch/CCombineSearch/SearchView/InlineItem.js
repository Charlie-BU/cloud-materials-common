"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CConfigProvider_1 = require("../../../CConfigProvider");
var react_1 = tslib_1.__importDefault(require("react"));
var ContentInput_1 = tslib_1.__importDefault(require("../SearchTrigger/ContentInput"));
var utils_1 = require("../utils");
var MultipleSelect_1 = tslib_1.__importDefault(require("../MultipleSelect"));
var SingleSelect_1 = tslib_1.__importDefault(require("../SingleSelect"));
var web_react_1 = require("@arco-design/web-react");
var CEllipsis_1 = tslib_1.__importDefault(require("../../../CEllipsis"));
var lodash_es_1 = require("lodash-es");
var ahooks_1 = require("ahooks");
var InlineItem = function (_a) {
    var children = _a.children, item = _a.item, itemCls = _a.itemCls, value = _a.value, enableEdit = _a.enableEdit, popoverClassName = _a.popoverClassName, popoverStyle = _a.popoverStyle, popoverTriggerProps = _a.popoverTriggerProps, updateParams = _a.updateParams, updateState = _a.updateState;
    var _b = tslib_1.__read((0, ahooks_1.useSetState)({ current: value, inputEdit: false, visible: false }), 2), state = _b[0], setState = _b[1];
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    if (item.type === 'input') {
        var clsSuffix = item.mode === 'number' ? 'inputNumber' : item.mode === 'tag' ? 'inputTag' : 'input';
        return state.inputEdit ? (react_1.default.createElement("div", { onKeyDown: function (e) {
                var _a;
                e.stopPropagation();
                if (e.key === 'Enter' && state.current && item.mode !== 'tag') {
                    setState({ inputEdit: false });
                    updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
                }
            } },
            react_1.default.createElement(ContentInput_1.default, { className: "".concat(itemCls, "-inline-").concat(clsSuffix), tempValue: state.current, item: item, size: "mini", placeholder: item.placeholder || (0, utils_1.getConbineSearchPlaceholder)('value', state.current, locale), updateTempValue: function (val) {
                    setState({ current: val });
                }, onBlur: function () {
                    setState({ inputEdit: false, current: value });
                }, updateSearchValue: function () {
                    var _a;
                    setState({ inputEdit: false });
                    updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
                }, updateState: updateState }))) : (react_1.default.createElement("span", { onClick: function () {
                if (enableEdit) {
                    setState({ inputEdit: true });
                }
            } }, children));
    }
    var popContentNode = null;
    if (item.type === 'select') {
        if (item.mode === 'multiple') {
            popContentNode = (react_1.default.createElement(MultipleSelect_1.default, { options: item.options.map(function (el) { return (tslib_1.__assign(tslib_1.__assign({}, el), { label: (0, lodash_es_1.isString)(el.label) ? react_1.default.createElement(CEllipsis_1.default, { content: el.label }) : el.label })); }), value: state.current, onChange: function (val) {
                    setState({ current: val });
                } }));
        }
        else {
            popContentNode = (react_1.default.createElement(SingleSelect_1.default, { value: state.current, options: item.options.map(function (el) { return (tslib_1.__assign(tslib_1.__assign({}, el), { label: (0, lodash_es_1.isString)(el.label) ? react_1.default.createElement(CEllipsis_1.default, { content: el.label }) : el.label })); }), onChange: function (val) {
                    setState({ current: val });
                } }));
        }
    }
    else if (item.type === 'custom') {
        popContentNode = item.renderContent({
            item: item,
            value: state.current,
            onChange: function (val) {
                setState({ current: val });
            },
            onReset: function () {
                setState({ current: value });
            },
            onSave: function (value) {
                var _a;
                if (value === void 0) { value = state.current; }
                updateParams((_a = {}, _a[item.fieldName] = value, _a));
                setState({ visible: false, current: value });
            },
            onCancel: function () { return setState({ visible: false }); },
        });
    }
    return (react_1.default.createElement(web_react_1.Popover, { trigger: "click", style: tslib_1.__assign(tslib_1.__assign({}, popoverStyle), ((item === null || item === void 0 ? void 0 : item.type) === 'custom' ? item.popoverStyle : {})), className: popoverClassName, content: enableEdit ? popContentNode : null, triggerProps: tslib_1.__assign({ position: 'bl', showArrow: false }, popoverTriggerProps), popupVisible: state.visible, onVisibleChange: function (visible) {
            var _a;
            //NOTE - 只有通过trigger切换显隐会触发，受控的方式更改显隐不会触发onVisibleChange
            setState({ visible: visible, current: value });
            if (!visible && enableEdit) {
                updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
            }
        } }, children));
};
exports.default = InlineItem;
//# sourceMappingURL=InlineItem.js.map