"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var utils_1 = require("../utils");
var Item_1 = tslib_1.__importDefault(require("../SearchView/Item"));
var SearchTrigger_1 = tslib_1.__importDefault(require("../SearchTrigger"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CombineSearchInline = function (props) {
    var _a, _b;
    var style = props.style, className = props.className, alignType = props.alignType, params = props.params, list = props.list, current = props.current, errState = props.errState, trigger = props.trigger, loading = props.loading, status = props.status, fuzzy = props.fuzzy, tempValue = props.tempValue, placeholder = props.placeholder, defaultField = props.defaultField, searchParamExtraLast = props.searchParamExtraLast, searchWord = props.searchWord, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, popoverTriggerProps = props.popoverTriggerProps, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, keyboardTip = props.keyboardTip, updateParams = props.updateParams, updateState = props.updateState, filterUserInput = props.filterUserInput, updateTempValue = props.updateTempValue, updateSearchField = props.updateSearchField, updateSearchValue = props.updateSearchValue, updateSearchWord = props.updateSearchWord, resetParams = props.resetParams;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var viewList = (0, utils_1.getViewList)(params, list);
    var inlineCls = getCPrefixCls('search-combine-inline');
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), focused = _c[0], setFocused = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(false), 2), showClose = _d[0], setShowClose = _d[1];
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(inlineCls, (_a = {},
            _a[getCPrefixCls('search-combine-inline-focused')] = focused,
            _a[getCPrefixCls('search-combine-inline-err')] = errState,
            _a), className), "data-cy": (0, utils_1.combineDataCy)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["inline"], ["inline"]))), style: style, onMouseEnter: function () { return setShowClose(!!viewList.length); }, onMouseLeave: function () { return setShowClose(false); } },
        react_1.default.createElement(web_react_1.Space, { align: "center", wrap: true, size: "mini" },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearch, { className: "".concat(inlineCls, "-search") }),
            viewList.map(function (item) { return (react_1.default.createElement("span", { key: item.fieldName },
                react_1.default.createElement(Item_1.default, { enableEdit: enableEdit, key: item.fieldName, item: item, alignType: alignType, value: params[item.fieldName], current: current, popoverClassName: popoverClassName, popoverStyle: popoverStyle, popoverTriggerProps: popoverTriggerProps, updateParams: function () {
                        var parmas = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            parmas[_i] = arguments[_i];
                        }
                        updateParams.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(parmas), false));
                        setFocused(false);
                    }, updateState: updateState, updateTempValue: updateTempValue }))); }),
            searchParamExtraLast,
            react_1.default.createElement(SearchTrigger_1.default, { alignType: alignType, trigger: trigger, loading: loading, tempValue: tempValue, params: params, status: status, current: current, list: list, popoverTriggerProps: popoverTriggerProps, placeholder: placeholder, defaultField: defaultField, fuzzy: fuzzy, searchWord: searchWord, enableEdit: enableEdit, ellipsisProps: ellipsisProps, listGroup: listGroup, keyboardTip: keyboardTip, filterUserInput: filterUserInput, updateTempValue: updateTempValue, updateState: function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    updateState.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(props), false));
                    var _a = tslib_1.__read(props, 1), status = _a[0];
                    setFocused(status !== 'default');
                }, updateSearchField: updateSearchField, updateSearchWord: updateSearchWord, updateSearchValue: function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    updateSearchValue.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(props), false));
                    setFocused(false);
                    setShowClose(false);
                } })),
        react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, { className: (0, classnames_1.default)((_b = {},
                _b["".concat(inlineCls, "-clear")] = true,
                _b["".concat(inlineCls, "-clear-show")] = showClose,
                _b)), onClick: function () {
                resetParams();
            } })));
};
exports.default = CombineSearchInline;
var templateObject_1;
//# sourceMappingURL=index.js.map