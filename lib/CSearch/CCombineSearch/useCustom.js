"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustom = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hooks_1 = require("../hooks");
var SearchView_1 = tslib_1.__importDefault(require("./SearchView"));
var SearchTrigger_1 = tslib_1.__importDefault(require("./SearchTrigger"));
var SearchInline_1 = tslib_1.__importDefault(require("./SearchInline"));
var useCustom = function (props) {
    var triggerClassName = props.triggerClassName, triggerStyle = props.triggerStyle, viewClassName = props.viewClassName, viewStyle = props.viewStyle, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, searchParamExtraLast = props.searchParamExtraLast, searchParamExtraStart = props.searchParamExtraStart, _a = props.trigger, trigger = _a === void 0 ? 'click' : _a, _b = props.alignType, alignType = _b === void 0 ? 'bottom' : _b, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.enableEdit, enableEdit = _d === void 0 ? true : _d, listGroup = props.listGroup, popoverTriggerProps = props.popoverTriggerProps, keyboardTip = props.keyboardTip, restProps = tslib_1.__rest(props, ["triggerClassName", "triggerStyle", "viewClassName", "viewStyle", "popoverClassName", "popoverStyle", "searchParamExtraLast", "searchParamExtraStart", "trigger", "alignType", "loading", "enableEdit", "listGroup", "popoverTriggerProps", "keyboardTip"]);
    var _e = tslib_1.__read((0, hooks_1.useCCombineSearch)(tslib_1.__assign(tslib_1.__assign({}, restProps), { enableEdit: enableEdit })), 2), _f = _e[0], list = _f.list, tempValue = _f.tempValue, params = _f.params, status = _f.status, current = _f.current, placeholder = _f.placeholder, defaultField = _f.defaultField, searchWord = _f.searchWord, errState = _f.errState, filterUserInput = _f.filterUserInput, _g = _e[1], updateParams = _g.updateParams, updateState = _g.updateState, updateTempValue = _g.updateTempValue, resetParams = _g.resetParams, updateSearchField = _g.updateSearchField, updateSearchValue = _g.updateSearchValue, updateSearchWord = _g.updateSearchWord;
    var loadingType = loading === false ? 'none' : loading === true ? 'block' : loading;
    if (alignType === 'inline') {
        return {
            CCombineSearchInline: (react_1.default.createElement(SearchInline_1.default, { className: triggerClassName, style: triggerStyle, popoverClassName: popoverClassName, popoverStyle: popoverStyle, alignType: alignType, trigger: trigger, popoverTriggerProps: popoverTriggerProps, loading: loadingType, tempValue: tempValue, params: params, status: status, current: current, list: list, errState: errState, placeholder: placeholder, defaultField: defaultField, fuzzy: restProps.fuzzy, searchParamExtraLast: searchParamExtraLast, searchWord: searchWord, enableEdit: enableEdit, listGroup: listGroup, ellipsisProps: restProps.ellipsisProps, keyboardTip: keyboardTip, updateSearchWord: updateSearchWord, filterUserInput: filterUserInput, updateTempValue: updateTempValue, updateState: updateState, updateParams: updateParams, resetParams: resetParams, updateSearchField: updateSearchField, updateSearchValue: updateSearchValue })),
        };
    }
    return {
        CCombineSearchTrigger: (react_1.default.createElement(SearchTrigger_1.default, { trigger: trigger, loading: loadingType, className: triggerClassName, style: triggerStyle, popoverClassName: popoverClassName, popoverStyle: popoverStyle, tempValue: tempValue, params: params, status: status, current: current, list: list, listGroup: listGroup, errState: errState, placeholder: placeholder, defaultField: defaultField, fuzzy: restProps.fuzzy, fuzzyConfig: restProps.fuzzyConfig, searchWord: searchWord, enableEdit: enableEdit, keyboardTip: keyboardTip, popoverTriggerProps: popoverTriggerProps, ellipsisProps: restProps.ellipsisProps, filterUserInput: filterUserInput, updateSearchWord: updateSearchWord, updateTempValue: updateTempValue, updateState: updateState, updateSearchField: updateSearchField, updateSearchValue: updateSearchValue })),
        CCombineSearchView: (react_1.default.createElement(SearchView_1.default, { className: viewClassName, style: viewStyle, current: current, list: list, params: params, enableEdit: enableEdit, updateParams: updateParams, updateState: updateState, updateTempValue: updateTempValue, resetParams: resetParams, searchParamExtraLast: searchParamExtraLast, searchParamExtraStart: searchParamExtraStart })),
    };
};
exports.useCustom = useCustom;
//# sourceMappingURL=useCustom.js.map