"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var useCustom_1 = require("./useCustom");
var CConfigProvider_1 = require("../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
var SearchProvider_1 = tslib_1.__importDefault(require("./SearchProvider"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('search');
var CSearch = function (props) {
    var className = props.className, style = props.style, position = props.position, reverseNode = props.reverseNode, restProps = tslib_1.__rest(props, ["className", "style", "position", "reverseNode"]);
    var _a = (0, useCustom_1.useCustom)(restProps), CSearchDisplay = _a.CSearchDisplay, CSearchCollapse = _a.CSearchCollapse;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    return (react_1.default.createElement(SearchProvider_1.default, null,
        react_1.default.createElement("div", { className: searchCls, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(searchCls, "-tools"), className), style: style }, position === 'right' ? (react_1.default.createElement(react_1.default.Fragment, null,
                reverseNode,
                CSearchDisplay)) : (react_1.default.createElement(react_1.default.Fragment, null,
                CSearchDisplay,
                reverseNode))),
            CSearchCollapse)));
};
CSearch.Provider = SearchProvider_1.default;
CSearch.useCustom = useCustom_1.useCustom;
CSearch.displayName = 'CSearch';
exports.default = CSearch;
var templateObject_1;
//# sourceMappingURL=index.js.map