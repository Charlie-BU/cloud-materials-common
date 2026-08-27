import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Popover, Spin } from '@arco-design/web-react';
import { useCConfigContext } from '../../../CConfigProvider';
import PopoverContent from './Popover';
import Content from './Content';
import { IconLoading, IconSearch } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { isArray, isString, uniq, xor } from 'lodash-es';
import { valueToArray } from '../utils';
import CLoadingV2 from '../../../CLoadingV2';
var cssPrefix = classNamePrefixFactory('combine-search-trigger');
var SearchTrigger = function (props) {
    var _a;
    var alignType = props.alignType, trigger = props.trigger, className = props.className, style = props.style, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, params = props.params, current = props.current, status = props.status, list = props.list, tempValue = props.tempValue, placeholder = props.placeholder, defaultField = props.defaultField, fuzzy = props.fuzzy, loading = props.loading, fuzzyConfig = props.fuzzyConfig, searchWord = props.searchWord, errState = props.errState, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, keyboardTip = props.keyboardTip, popoverTriggerProps = props.popoverTriggerProps, filterUserInput = props.filterUserInput, updateTempValue = props.updateTempValue, updateState = props.updateState, updateSearchField = props.updateSearchField, updateSearchValue = props.updateSearchValue, updateSearchWord = props.updateSearchWord;
    var alignTypeisInline = alignType === 'inline';
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var triggerCls = getCPrefixCls('search-combine-trigger');
    var focused = status !== 'default';
    var popSelectRef = useRef(null);
    var changeField = function (e) {
        e.stopPropagation();
        updateState('field');
    };
    var keyBoardEventHandle = function (e) {
        var _a, _b;
        var enableSelectEvent = true;
        var keyHandler = {
            // 按下Escape
            Escape: function () {
                updateState('field', null);
                updateTempValue(undefined);
                if (status === 'field') {
                    updateState('default', null);
                }
            },
            // 按下Enter
            Enter: function () {
                var _a, _b, _c, _d, _e;
                // e.key 无法区分是否是中文输入法输入的Enter，当处于composing中按enter时，keyCode为229
                if (e.keyCode !== 13) {
                    return;
                }
                // 同时按下shift和enter键，触发多选的保存
                var shiftEnter = current &&
                    ((current.type === 'select' && current.mode === 'multiple') ||
                        (current.type === 'custom' && !current.hideFooter));
                if (e.shiftKey && shiftEnter) {
                    updateSearchValue(isArray(tempValue) && !tempValue.length ? undefined : tempValue, current === null || current === void 0 ? void 0 : current.fieldName);
                    updateState('default', null);
                    updateTempValue(undefined);
                    enableSelectEvent = false;
                    return;
                }
                // 仅按下enter键
                // 模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，但搜索项无匹配时，将搜索词作为搜索条件
                // 非模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，不关注是否有有处于active的选项，将搜索词作为搜索条件
                if (!current && defaultField && isString(tempValue) && !!tempValue.trim()) {
                    var defaultFieldName_1 = undefined;
                    if (fuzzy) {
                        if (!((_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.activeOptionValue)) {
                            defaultFieldName_1 = defaultField.fieldName;
                            var candidate_1 = (_b = popSelectRef.current) === null || _b === void 0 ? void 0 : _b.getOptionInfoList();
                            if (defaultField.type === 'auto' && (candidate_1 === null || candidate_1 === void 0 ? void 0 : candidate_1.length)) {
                                defaultFieldName_1 = (_c = list.filter(function (el) { return el.type === 'select'; }).find(function (el) {
                                    return el.options.some(function (item) { return item.value === candidate_1[0].value; });
                                })) === null || _c === void 0 ? void 0 : _c.fieldName;
                            }
                        }
                    }
                    else {
                        defaultFieldName_1 = defaultField.fieldName;
                    }
                    if (defaultFieldName_1) {
                        var defaultItem = list.find(function (el) { return el.fieldName === defaultFieldName_1; });
                        var _value = valueToArray(params === null || params === void 0 ? void 0 : params[defaultFieldName_1]);
                        var multValue = xor(__spreadArray(__spreadArray([], __read(_value), false), __read(tempValue.trim().split(',').filter(Boolean)), false));
                        updateSearchValue((defaultItem === null || defaultItem === void 0 ? void 0 : defaultItem.type) === 'select' && (defaultItem.mode === 'multiple' || defaultItem.multiValues)
                            ? multValue
                            : tempValue, defaultFieldName_1);
                        enableSelectEvent = false;
                    }
                }
                // select筛选时，allowCreate时，搜索未匹配到搜索项，则用搜索词作为搜索条件
                if (current &&
                    current.type === 'select' &&
                    current.allowCreate &&
                    !((_d = popSelectRef.current) === null || _d === void 0 ? void 0 : _d.activeOptionValue) &&
                    isString(searchWord) &&
                    !!searchWord.trim()) {
                    // enableEdit 可编辑时，使用tempValue。否则使用已选择的值，因为tempValue为undefined
                    updateSearchValue(current.mode === 'multiple' || current.multiValues
                        ? uniq(__spreadArray(__spreadArray([], __read(valueToArray(enableEdit ? tempValue : params === null || params === void 0 ? void 0 : params[current.fieldName])), false), __read(((_e = searchWord.trim().split(',').filter(Boolean)) !== null && _e !== void 0 ? _e : [])), false))
                        : searchWord.trim(), current.fieldName);
                }
                // inputTag需要两次回车，因此没在这里处理，而是在组件上处理
                // inputTag onPressEnter 阻止事件冒泡
                if ((current === null || current === void 0 ? void 0 : current.type) === 'input') {
                    updateSearchValue(tempValue);
                    enableSelectEvent = false;
                }
            },
            // 按下Backspace
            Backspace: function () {
                // InputTag组件阻止了KeyboardEvent Backspace事件的冒泡。
                // - 因此select类型搜索和input的tag类型搜索的事件需要在ContentSelect上进行处理
                // input类型的搜索在这里进行处理
                if ((current === null || current === void 0 ? void 0 : current.type) === 'input' && !tempValue) {
                    updateState('field', null);
                    updateTempValue(undefined);
                }
            },
            // 按下 Tab，触发 active 下一个 option
            Tab: function () {
                var _a;
                e.preventDefault();
                (_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.hotkeyHandler(new KeyboardEvent('keydown', { keyCode: 40 }));
            },
        };
        (_a = keyHandler[e.key]) === null || _a === void 0 ? void 0 : _a.call(keyHandler);
        enableSelectEvent && ((_b = popSelectRef.current) === null || _b === void 0 ? void 0 : _b.hotkeyHandler(e));
    };
    useEffect(function () {
        updateSearchWord(undefined);
    }, [status, current === null || current === void 0 ? void 0 : current.fieldName]);
    return (React.createElement(Spin, { loading: loading === 'block', block: true },
        React.createElement(Popover, { style: __assign(__assign({}, popoverStyle), ((current === null || current === void 0 ? void 0 : current.type) === 'custom' ? current.popoverStyle : {})), trigger: trigger, triggerProps: __assign(__assign({ position: 'bl', showArrow: false, clickToClose: false, popupStyle: { padding: 0 }, popupAlign: { bottom: 6 }, autoFitPosition: false }, popoverTriggerProps), { onClickOutside: trigger === 'hover' || (isArray(trigger) && trigger.includes('hover'))
                    ? function () {
                        var _a;
                        updateState('default', null);
                        (_a = popoverTriggerProps === null || popoverTriggerProps === void 0 ? void 0 : popoverTriggerProps.onClickOutside) === null || _a === void 0 ? void 0 : _a.call(popoverTriggerProps);
                    }
                    : popoverTriggerProps === null || popoverTriggerProps === void 0 ? void 0 : popoverTriggerProps.onClickOutside }), popupVisible: focused, onVisibleChange: function (val) {
                updateState(val ? (current ? 'value' : 'field') : 'default', null);
                updateSearchWord(undefined);
                updateTempValue(undefined);
            }, className: popoverClassName, content: React.createElement(CLoadingV2.Spin, { loading: loading !== 'none', arcoSpinProps: { block: true } },
                React.createElement(PopoverContent, { popSelectRef: popSelectRef, list: list, params: params, status: status, current: current, tempValue: tempValue, fuzzy: fuzzy, fuzzyConfig: fuzzyConfig, searchWord: searchWord, enableEdit: enableEdit, ellipsisProps: ellipsisProps, listGroup: listGroup, keyboardTip: keyboardTip, filterUserInput: filterUserInput, updateState: updateState, updateSearchField: updateSearchField, updateSearchValue: updateSearchValue, updateTempValue: updateTempValue, updateSearchWord: updateSearchWord })) },
            React.createElement("div", { className: alignTypeisInline
                    ? getCPrefixCls('search-combine-trigger-inline')
                    : classNames(triggerCls, (_a = {}, _a["".concat(triggerCls, "-focused")] = focused, _a["".concat(triggerCls, "-err")] = errState, _a), className), style: style, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), onKeyDown: keyBoardEventHandle },
                alignTypeisInline ? null : React.createElement(IconSearch, { className: "".concat(triggerCls, "-search") }),
                status !== 'default' && current && (React.createElement("span", { className: "".concat(triggerCls, "-label"), onClick: changeField, tabIndex: 0, onKeyDown: function (e) { var _a; return (_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.hotkeyHandler(e); } },
                    current.label,
                    ":")),
                React.createElement(Content, { className: "".concat(triggerCls, "-content"), current: current, alignType: alignType, readOnly: !fuzzy, tempValue: tempValue, placeholder: placeholder, defaultField: defaultField, searchWord: searchWord, updateTempValue: updateTempValue, updateSearchValue: updateSearchValue, updateSearchWord: updateSearchWord, updateState: updateState }),
                loading === 'inline' && React.createElement(IconLoading, { className: "".concat(triggerCls, "-loading") })))));
};
export default SearchTrigger;
var templateObject_1;
//# sourceMappingURL=index.js.map