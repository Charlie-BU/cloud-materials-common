import { __assign, __read } from "tslib";
import { useCConfigContext } from '../../../CConfigProvider';
import React from 'react';
import ContentInput from '../SearchTrigger/ContentInput';
import { getConbineSearchPlaceholder } from '../utils';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';
import { Popover } from '@arco-design/web-react';
import CEllipsis from '../../../CEllipsis';
import { isString } from 'lodash-es';
import { useSetState } from 'ahooks';
var InlineItem = function (_a) {
    var children = _a.children, item = _a.item, itemCls = _a.itemCls, value = _a.value, enableEdit = _a.enableEdit, popoverClassName = _a.popoverClassName, popoverStyle = _a.popoverStyle, popoverTriggerProps = _a.popoverTriggerProps, updateParams = _a.updateParams, updateState = _a.updateState;
    var _b = __read(useSetState({ current: value, inputEdit: false, visible: false }), 2), state = _b[0], setState = _b[1];
    var locale = useCConfigContext().locale;
    if (item.type === 'input') {
        var clsSuffix = item.mode === 'number' ? 'inputNumber' : item.mode === 'tag' ? 'inputTag' : 'input';
        return state.inputEdit ? (React.createElement("div", { onKeyDown: function (e) {
                var _a;
                e.stopPropagation();
                if (e.key === 'Enter' && state.current && item.mode !== 'tag') {
                    setState({ inputEdit: false });
                    updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
                }
            } },
            React.createElement(ContentInput, { className: "".concat(itemCls, "-inline-").concat(clsSuffix), tempValue: state.current, item: item, size: "mini", placeholder: item.placeholder || getConbineSearchPlaceholder('value', state.current, locale), updateTempValue: function (val) {
                    setState({ current: val });
                }, onBlur: function () {
                    setState({ inputEdit: false, current: value });
                }, updateSearchValue: function () {
                    var _a;
                    setState({ inputEdit: false });
                    updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
                }, updateState: updateState }))) : (React.createElement("span", { onClick: function () {
                if (enableEdit) {
                    setState({ inputEdit: true });
                }
            } }, children));
    }
    var popContentNode = null;
    if (item.type === 'select') {
        if (item.mode === 'multiple') {
            popContentNode = (React.createElement(MultipleSelect, { options: item.options.map(function (el) { return (__assign(__assign({}, el), { label: isString(el.label) ? React.createElement(CEllipsis, { content: el.label }) : el.label })); }), value: state.current, onChange: function (val) {
                    setState({ current: val });
                } }));
        }
        else {
            popContentNode = (React.createElement(SingleSelect, { value: state.current, options: item.options.map(function (el) { return (__assign(__assign({}, el), { label: isString(el.label) ? React.createElement(CEllipsis, { content: el.label }) : el.label })); }), onChange: function (val) {
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
    return (React.createElement(Popover, { trigger: "click", style: __assign(__assign({}, popoverStyle), ((item === null || item === void 0 ? void 0 : item.type) === 'custom' ? item.popoverStyle : {})), className: popoverClassName, content: enableEdit ? popContentNode : null, triggerProps: __assign({ position: 'bl', showArrow: false }, popoverTriggerProps), popupVisible: state.visible, onVisibleChange: function (visible) {
            var _a;
            //NOTE - 只有通过trigger切换显隐会触发，受控的方式更改显隐不会触发onVisibleChange
            setState({ visible: visible, current: value });
            if (!visible && enableEdit) {
                updateParams((_a = {}, _a[item.fieldName] = state.current, _a));
            }
        } }, children));
};
export default InlineItem;
//# sourceMappingURL=InlineItem.js.map