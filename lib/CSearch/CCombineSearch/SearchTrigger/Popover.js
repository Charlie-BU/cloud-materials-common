"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var MultipleSelect_1 = tslib_1.__importDefault(require("../MultipleSelect"));
var SingleSelect_1 = tslib_1.__importDefault(require("../SingleSelect"));
var PopoverKeyBoardTip_1 = tslib_1.__importDefault(require("./PopoverKeyBoardTip"));
var lodash_es_1 = require("lodash-es");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
var CEllipsis_1 = tslib_1.__importDefault(require("../../../CEllipsis"));
var PopoverContent = function (props) {
    var list = props.list, status = props.status, current = props.current, params = props.params, tempValue = props.tempValue, fuzzy = props.fuzzy, fuzzyConfig = props.fuzzyConfig, searchWord = props.searchWord, popSelectRef = props.popSelectRef, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, _a = props.keyboardTip, keyboardTip = _a === void 0 ? true : _a, filterUserInput = props.filterUserInput, updateSearchField = props.updateSearchField, updateTempValue = props.updateTempValue, updateSearchValue = props.updateSearchValue, updateState = props.updateState, updateSearchWord = props.updateSearchWord;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), locale = _b.locale, getCPrefixCls = _b.getCPrefixCls;
    if (status === 'default') {
        return null;
    }
    var popoverCls = getCPrefixCls('search-combine-popover');
    var selectCls = getCPrefixCls('search-combine-select');
    var hideFooter = (current === null || current === void 0 ? void 0 : current.type) === 'input' ||
        ((current === null || current === void 0 ? void 0 : current.type) === 'select' && current.mode !== 'multiple') ||
        ((current === null || current === void 0 ? void 0 : current.type) === 'custom' && current.hideFooter);
    var onReset = function () {
        current && updateTempValue((0, lodash_es_1.get)(params, current.fieldName));
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
            var options = (0, utils_2.getFilterOptions)({
                fuzzyConfig: tslib_1.__assign(tslib_1.__assign({}, fuzzyConfig), current.fuzzyConfig),
                filterUserInput: filterUserInput,
                searchWord: searchWord,
                item: current,
                values: params,
            });
            if (current.mode === 'multiple') {
                return (react_1.default.createElement(MultipleSelect_1.default, { searchWord: searchWord, filterOption: function () { return true; }, options: options.map(function (el) {
                        var _a;
                        return (tslib_1.__assign(tslib_1.__assign({}, el), { label: (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ content: (_a = el.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (el.label) }));
                    }), value: tempValue, onChange: updateTempValue, popSelectRef: popSelectRef }));
            }
            return (react_1.default.createElement(SingleSelect_1.default, { dropdownMenuStyle: { maxHeight: '400px' }, inputValue: searchWord, filterOption: function () { return true; }, 
                // defaultValue={params[current.fieldName]}
                onChange: function (v) {
                    updateSearchValue(current.multiValues ? (0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, utils_1.valueToArray)(enableEdit ? tempValue : params[current.fieldName])), false), [v], false)) : v, current.fieldName);
                }, popSelectRef: popSelectRef }, options.map(function (option) {
                var _a;
                return (react_1.default.createElement(web_react_1.Select.Option, { value: option.value, key: option.value }, (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ content: (_a = option.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (option.label)));
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
            renderList = fuzzyConfig.fuzzyOptionsFilter(formattedUserInput, (0, lodash_es_1.cloneDeep)(renderList));
        }
        else {
            renderList = renderList
                .map(function (item) {
                return tslib_1.__assign(tslib_1.__assign({}, item), { options: (0, utils_2.getFilterOptions)({
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
            renderList = renderList.map(function (el) { return (tslib_1.__assign(tslib_1.__assign({}, el), { options: el.options.slice(0, fuzzyConfig.displayNum) })); });
        }
        return (react_1.default.createElement(SingleSelect_1.default, { popupVisible: true, triggerElement: react_1.default.createElement("div", { className: selectCls }), getPopupContainer: function (node) { return node; }, triggerProps: {
                popupStyle: { boxShadow: 'none', border: 'none' },
                style: { position: 'static' },
            }, popSelectRef: popSelectRef, dropdownMenuStyle: { maxHeight: '440px' }, onChange: function (value) {
                var item = renderList.find(function (i) { return i.options.some(function (e) { return e.value === value; }); });
                if (item) {
                    updateSearchValue(item.mode === 'multiple' || item.multiValues
                        ? (0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, utils_1.valueToArray)(params[item.fieldName])), false), [value], false))
                        : value, String(item.fieldName || ''));
                }
            }, inputValue: formattedUserInput, filterOption: function () { return true; }, showSearch: true }, renderList.map(function (item) {
            return (react_1.default.createElement(web_react_1.Select.OptGroup, { label: item.label, key: item.fieldName, onClick: function () {
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
                return (react_1.default.createElement(web_react_1.Select.Option, { value: option.value, key: option.value }, (ellipsisProps === null || ellipsisProps === void 0 ? void 0 : ellipsisProps.enable) ? (react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ content: (_a = option.label) !== null && _a !== void 0 ? _a : '' }, ellipsisProps.config))) : (option.label)));
            })));
        })));
    };
    // 选择搜索项
    // 状态为field，或者为value且处于模糊搜索未搜索状态，展示
    // TODO: 判断popover content条件优化
    if (status === 'field' || (fuzzy && !tempValue && !(current === null || current === void 0 ? void 0 : current.fieldName))) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: popoverCls }, (listGroup === null || listGroup === void 0 ? void 0 : listGroup.length) ? (react_1.default.createElement(SingleSelect_1.default, { dropdownMenuStyle: { maxHeight: '400px' }, value: current === null || current === void 0 ? void 0 : current.fieldName, onChange: function (val) {
                    updateTempValue(undefined);
                    updateSearchField(val);
                }, popSelectRef: popSelectRef }, listGroup.map(function (el) {
                return (react_1.default.createElement(web_react_1.Select.OptGroup, { label: el.label, key: el.label }, el.fieldNames
                    .map(function (fieldName) { return list.find(function (listItem) { return listItem.fieldName === fieldName; }); })
                    .filter(function (i) { return !!i && !i.hidden; })
                    .map(function (item) { return (react_1.default.createElement(web_react_1.Select.Option, { key: item.fieldName, value: item.fieldName, disabled: item === null || item === void 0 ? void 0 : item.disabled }, item.label)); })));
            }))) : (react_1.default.createElement(SingleSelect_1.default, { dropdownMenuStyle: { maxHeight: '400px' }, value: current === null || current === void 0 ? void 0 : current.fieldName, options: list
                    .filter(function (item) { return !item.hidden; })
                    .map(function (item) { return ({
                    label: item.label,
                    value: item.fieldName,
                    disabled: item.disabled,
                }); }), onChange: function (val) {
                    updateTempValue(undefined);
                    updateSearchField(val);
                }, popSelectRef: popSelectRef }))),
            keyboardTip && react_1.default.createElement(PopoverKeyBoardTip_1.default, null)));
    }
    var content = renderContent();
    return fuzzy && !(current === null || current === void 0 ? void 0 : current.fieldName) ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: popoverCls }, renderFuzzyContent()),
        keyboardTip && react_1.default.createElement(PopoverKeyBoardTip_1.default, null))) : content ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: popoverCls },
            content,
            (current === null || current === void 0 ? void 0 : current.type) === 'select' && keyboardTip && (react_1.default.createElement(PopoverKeyBoardTip_1.default, { isExtra: (current === null || current === void 0 ? void 0 : current.type) === 'select' && current.mode === 'multiple' })),
            !hideFooter && (react_1.default.createElement(web_react_1.Space, { className: "".concat(popoverCls, "-footer"), size: 12 },
                react_1.default.createElement(web_react_1.Button, { size: "mini", onClick: function () {
                        onReset();
                    } }, locale.CSearch.reset),
                react_1.default.createElement(web_react_1.Button, { size: "mini", type: "primary", onClick: function () {
                        onSave();
                    } }, locale.CSearch.ok)))))) : null;
};
exports.default = PopoverContent;
//# sourceMappingURL=Popover.js.map