import { __makeTemplateObject, __read, __spreadArray } from "tslib";
import React, { useState } from 'react';
import { combineDataCy, getViewList } from '../utils';
import SearchViewItem from '../SearchView/Item';
import SearchTrigger from '../SearchTrigger';
import { Space } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../../../CConfigProvider';
import { IconClose, IconSearch } from '@arco-design/iconbox-react-ve-o-design';
var CombineSearchInline = function (props) {
    var _a, _b;
    var style = props.style, className = props.className, alignType = props.alignType, params = props.params, list = props.list, current = props.current, errState = props.errState, trigger = props.trigger, loading = props.loading, status = props.status, fuzzy = props.fuzzy, tempValue = props.tempValue, placeholder = props.placeholder, defaultField = props.defaultField, searchParamExtraLast = props.searchParamExtraLast, searchWord = props.searchWord, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, popoverTriggerProps = props.popoverTriggerProps, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, keyboardTip = props.keyboardTip, updateParams = props.updateParams, updateState = props.updateState, filterUserInput = props.filterUserInput, updateTempValue = props.updateTempValue, updateSearchField = props.updateSearchField, updateSearchValue = props.updateSearchValue, updateSearchWord = props.updateSearchWord, resetParams = props.resetParams;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var viewList = getViewList(params, list);
    var inlineCls = getCPrefixCls('search-combine-inline');
    var _c = __read(useState(false), 2), focused = _c[0], setFocused = _c[1];
    var _d = __read(useState(false), 2), showClose = _d[0], setShowClose = _d[1];
    return (React.createElement("div", { className: classNames(inlineCls, (_a = {},
            _a[getCPrefixCls('search-combine-inline-focused')] = focused,
            _a[getCPrefixCls('search-combine-inline-err')] = errState,
            _a), className), "data-cy": combineDataCy(templateObject_1 || (templateObject_1 = __makeTemplateObject(["inline"], ["inline"]))), style: style, onMouseEnter: function () { return setShowClose(!!viewList.length); }, onMouseLeave: function () { return setShowClose(false); } },
        React.createElement(Space, { align: "center", wrap: true, size: "mini" },
            React.createElement(IconSearch, { className: "".concat(inlineCls, "-search") }),
            viewList.map(function (item) { return (React.createElement("span", { key: item.fieldName },
                React.createElement(SearchViewItem, { enableEdit: enableEdit, key: item.fieldName, item: item, alignType: alignType, value: params[item.fieldName], current: current, popoverClassName: popoverClassName, popoverStyle: popoverStyle, popoverTriggerProps: popoverTriggerProps, updateParams: function () {
                        var parmas = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            parmas[_i] = arguments[_i];
                        }
                        updateParams.apply(void 0, __spreadArray([], __read(parmas), false));
                        setFocused(false);
                    }, updateState: updateState, updateTempValue: updateTempValue }))); }),
            searchParamExtraLast,
            React.createElement(SearchTrigger, { alignType: alignType, trigger: trigger, loading: loading, tempValue: tempValue, params: params, status: status, current: current, list: list, popoverTriggerProps: popoverTriggerProps, placeholder: placeholder, defaultField: defaultField, fuzzy: fuzzy, searchWord: searchWord, enableEdit: enableEdit, ellipsisProps: ellipsisProps, listGroup: listGroup, keyboardTip: keyboardTip, filterUserInput: filterUserInput, updateTempValue: updateTempValue, updateState: function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    updateState.apply(void 0, __spreadArray([], __read(props), false));
                    var _a = __read(props, 1), status = _a[0];
                    setFocused(status !== 'default');
                }, updateSearchField: updateSearchField, updateSearchWord: updateSearchWord, updateSearchValue: function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    updateSearchValue.apply(void 0, __spreadArray([], __read(props), false));
                    setFocused(false);
                    setShowClose(false);
                } })),
        React.createElement(IconClose, { className: classNames((_b = {},
                _b["".concat(inlineCls, "-clear")] = true,
                _b["".concat(inlineCls, "-clear-show")] = showClose,
                _b)), onClick: function () {
                resetParams();
            } })));
};
export default CombineSearchInline;
var templateObject_1;
//# sourceMappingURL=index.js.map