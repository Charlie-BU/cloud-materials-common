import { __assign, __read, __spreadArray } from "tslib";
import { Button, Select, Space } from '@arco-design/web-react';
import React from 'react';
import { useCConfigContext } from '../../../CConfigProvider';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';
import PopoverKeyBoardTip from './PopoverKeyBoardTip';
import { cloneDeep, get, uniq } from 'lodash-es';
import { valueToArray } from '../utils';
import { getFilterOptions } from './utils';
import CEllipsis from '../../../CEllipsis';
var PopoverContent = function (props) {
    var list = props.list, status = props.status, current = props.current, params = props.params, tempValue = props.tempValue, fuzzy = props.fuzzy, fuzzyConfig = props.fuzzyConfig, searchWord = props.searchWord, popSelectRef = props.popSelectRef, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, _a = props.keyboardTip, keyboardTip = _a === void 0 ? true : _a, filterUserInput = props.filterUserInput, updateSearchField = props.updateSearchField, updateTempValue = props.updateTempValue, updateSearchValue = props.updateSearchValue, updateState = props.updateState, updateSearchWord = props.updateSearchWord;
    var _b = useCConfigContext(), locale = _b.locale, getCPrefixCls = _b.getCPrefixCls;
    if (status === 'default') {
        return null;
    }
    var popoverCls = getCPrefixCls('search-combine-popover');
    var selectCls = getCPrefixCls('search-combine-select');
    var hideFooter = (current === null || current === void 0 ? void 0 : current.type) === 'input' ||
        ((current === null || current === void 0 ? void 0 : current.type) === 'select' && current.mode !== 'multiple') ||
        ((current === null || current === void 0 ? void 0 : current.type) === 'custom' && current.hideFooter);
    var onReset = function () {
        current && updateTempValue(get(params, current.fieldName));
    };
    var onSave = function (value) {
        if (value === void 0) { value = tempValue; }
        updateSearchValue(value, current === null || current === void 0 ? void 0 : current.fieldName);
        updateState('default', null);
        updateTempValue(undefined);
    };
    var onCancel = function () {
        updateState('default', null);
        updateTempValue(undefined);
    };
    // 选中筛选项后，popover中展示的候选项
    var renderContent = function () {
        if (!current || current.type === 'input') {
            return null;
        }
        if (current.type === 'select') {
            var options = getFilterOptions({
                fuzzyConfig: __assign(__assign({}, fuzzyConfig), current.fuzzyConfig),
                filterUserInput: filterUserInput,
                searchWord: searchWord,
                item: current,
                values: params,
            });
            if (current.mode === 'multiple') {
                return (React.createElement(MultipleSelect, { searchWord: searchWord, filterOption: function () { return true; }, options: options.map(function (el) {
                        var _a;
                        return (__assign(__assign({}, el), { label: (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (React.createElement(CEllipsis, __assign({ content: (_a = el.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (el.label) }));
                    }), value: tempValue, onChange: updateTempValue, popSelectRef: popSelectRef }));
            }
            return (React.createElement(SingleSelect, { dropdownMenuStyle: { maxHeight: '400px' }, inputValue: searchWord, filterOption: function () { return true; }, 
                // defaultValue={params[current.fieldName]}
                onChange: function (v) {
                    updateSearchValue(current.multiValues ? uniq(__spreadArray(__spreadArray([], __read(valueToArray(enableEdit ? tempValue : params[current.fieldName])), false), [v], false)) : v, current.fieldName);
                }, popSelectRef: popSelectRef }, options.map(function (option) {
                var _a;
                return (React.createElement(Select.Option, { value: option.value, key: option.value }, (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (React.createElement(CEllipsis, __assign({ content: (_a = option.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (option.label)));
            })));
        }
        return current.renderContent({
            item: current,
            value: tempValue !== null && tempValue !== void 0 ? tempValue : (enableEdit ? params[current.fieldName] : undefined),
            onChange: updateTempValue,
            onReset: onReset,
            onSave: onSave,
            onCancel: onCancel,
        });
    };
    // 模糊匹配的popover内容
    var renderFuzzyContent = function () {
        /** tempValue也会用来存用户选择的值，所以不可以简单的认为是输入框内的内容 */
        var formattedUserInput = undefined;
        try {
            formattedUserInput = filterUserInput(tempValue);
        }
        catch (e) { }
        if (typeof formattedUserInput !== 'string') {
            return null;
        }
        // 支持输入搜索以「,」进行分割的长字符串
        var renderList = list.filter(function (item) { return item.type === 'select' && item.options.length; });
        if (fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.fuzzyOptionsFilter) {
            renderList = fuzzyConfig.fuzzyOptionsFilter(formattedUserInput, cloneDeep(renderList));
        }
        else {
            renderList = renderList
                .map(function (item) {
                return __assign(__assign({}, item), { options: getFilterOptions({
                        fuzzyConfig: fuzzyConfig,
                        filterUserInput: filterUserInput,
                        searchWord: tempValue,
                        item: item,
                        values: params,
                    }) });
            })
                .filter(function (el) { return !!el.options.length; });
        }
        if (fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.displayNum) {
            renderList = renderList.map(function (el) { return (__assign(__assign({}, el), { options: el.options.slice(0, fuzzyConfig.displayNum) })); });
        }
        return (React.createElement(SingleSelect, { popupVisible: true, triggerElement: React.createElement("div", { className: selectCls }), getPopupContainer: function (node) { return node; }, triggerProps: {
                popupStyle: { boxShadow: 'none', border: 'none' },
                style: { position: 'static' },
            }, popSelectRef: popSelectRef, dropdownMenuStyle: { maxHeight: '440px' }, onChange: function (value) {
                var item = renderList.find(function (i) { return i.options.some(function (e) { return e.value === value; }); });
                if (item) {
                    updateSearchValue(item.mode === 'multiple' || item.multiValues
                        ? uniq(__spreadArray(__spreadArray([], __read(valueToArray(params[item.fieldName])), false), [value], false))
                        : value, String(item.fieldName || ''));
                }
            }, inputValue: formattedUserInput, filterOption: function () { return true; }, showSearch: true }, renderList.map(function (item) {
            return (React.createElement(Select.OptGroup, { label: item.label, key: item.fieldName, onClick: function () {
                    if (fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.enableChangeSearchItem) {
                        updateState('value', item);
                        setTimeout(function () {
                            updateSearchWord(tempValue);
                        }, 0);
                    }
                }, 
                // 这里传入 className，会覆盖原有的className
                style: (fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.enableChangeSearchItem) ? { cursor: 'pointer' } : undefined }, item.options.map(function (option) {
                var _a;
                return (React.createElement(Select.Option, { value: option.value, key: option.value }, (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (React.createElement(CEllipsis, __assign({ content: (_a = option.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (option.label)));
            })));
        })));
    };
    // 选择搜索项
    // 状态为field，或者为value且处于模糊搜索未搜索状态，展示
    // TODO: 判断popover content条件优化
    if (status === 'field' || (fuzzy && !tempValue && !(current === null || current === void 0 ? void 0 : current.fieldName))) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: popoverCls }, (listGroup === null || listGroup === void 0 ? void 0 : listGroup.length) ? (React.createElement(SingleSelect, { dropdownMenuStyle: { maxHeight: '400px' }, value: current === null || current === void 0 ? void 0 : current.fieldName, onChange: function (val) {
                    updateTempValue(undefined);
                    updateSearchField(val);
                }, popSelectRef: popSelectRef }, listGroup.map(function (el) {
                return (React.createElement(Select.OptGroup, { label: el.label, key: el.label }, el.fieldNames
                    .map(function (fieldName) { return list.find(function (listItem) { return listItem.fieldName === fieldName; }); })
                    .filter(function (i) { return !!i && !i.hidden; })
                    .map(function (item) { return (React.createElement(Select.Option, { key: item.fieldName, value: item.fieldName, disabled: item === null || item === void 0 ? void 0 : item.disabled }, item.label)); })));
            }))) : (React.createElement(SingleSelect, { dropdownMenuStyle: { maxHeight: '400px' }, value: current === null || current === void 0 ? void 0 : current.fieldName, options: list
                    .filter(function (item) { return !item.hidden; })
                    .map(function (item) { return ({
                    label: item.label,
                    value: item.fieldName,
                    disabled: item.disabled,
                }); }), onChange: function (val) {
                    updateTempValue(undefined);
                    updateSearchField(val);
                }, popSelectRef: popSelectRef }))),
            keyboardTip && React.createElement(PopoverKeyBoardTip, null)));
    }
    var content = renderContent();
    return fuzzy && !(current === null || current === void 0 ? void 0 : current.fieldName) ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: popoverCls }, renderFuzzyContent()),
        keyboardTip && React.createElement(PopoverKeyBoardTip, null))) : content ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: popoverCls },
            content,
            (current === null || current === void 0 ? void 0 : current.type) === 'select' && keyboardTip && (React.createElement(PopoverKeyBoardTip, { isExtra: (current === null || current === void 0 ? void 0 : current.type) === 'select' && current.mode === 'multiple' })),
            !hideFooter && (React.createElement(Space, { className: "".concat(popoverCls, "-footer"), size: 12 },
                React.createElement(Button, { size: "mini", onClick: function () {
                        onReset();
                    } }, locale.CSearch.reset),
                React.createElement(Button, { size: "mini", type: "primary", onClick: function () {
                        onSave();
                    } }, locale.CSearch.ok)))))) : null;
};
export default PopoverContent;
//# sourceMappingURL=Popover.js.map