"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var Item_1 = tslib_1.__importDefault(require("./Item"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../_utils/classNamePrefixFactory"));
var utils_1 = require("../utils");
var utils_2 = require("../../utils");
var cssPrefix = (0, classNamePrefixFactory_1.default)('combine-search-view');
var SearchView = function (props) {
    var className = props.className, style = props.style, current = props.current, list = props.list, params = props.params, enableEdit = props.enableEdit, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, popoverTriggerProps = props.popoverTriggerProps, updateParams = props.updateParams, updateState = props.updateState, resetParams = props.resetParams, updateTempValue = props.updateTempValue, searchParamExtraLast = props.searchParamExtraLast, searchParamExtraStart = props.searchParamExtraStart;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var viewCls = getCPrefixCls('search-combine-view');
    var viewList = (0, utils_1.getViewList)((0, utils_2.dropUndefined)(params), list);
    if (!viewList.length) {
        return null;
    }
    return (react_1.default.createElement(web_react_1.Space, { className: (0, classnames_1.default)(viewCls, className), wrap: true, size: "mini", style: style, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        searchParamExtraStart && react_1.default.createElement("span", { className: "".concat(viewCls, "-extra") }, searchParamExtraStart),
        viewList.map(function (item) { return (react_1.default.createElement(Item_1.default, { key: item.fieldName, item: item, value: params[item.fieldName], current: current, enableEdit: enableEdit, popoverClassName: popoverClassName, popoverStyle: popoverStyle, popoverTriggerProps: popoverTriggerProps, updateParams: updateParams, updateState: updateState, updateTempValue: updateTempValue })); }),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(web_react_1.Divider, { type: "vertical", className: "".concat(viewCls, "-divider") }),
            react_1.default.createElement("span", { className: "".concat(viewCls, "-clear"), onClick: resetParams },
                react_1.default.createElement(iconbox_react_ve_o_design_1.IconDelete, null),
                locale.CSearch.clear),
            searchParamExtraLast && react_1.default.createElement("span", { className: "".concat(viewCls, "-extra") }, searchParamExtraLast))));
};
exports.default = SearchView;
var templateObject_1;
//# sourceMappingURL=index.js.map