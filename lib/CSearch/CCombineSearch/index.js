"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var useCustom_1 = require("./useCustom");
var utils_1 = require("./utils");
var CCombineSearch = function (props) {
    var extraLeft = props.extraLeft, extraRight = props.extraRight, _a = props.triggerSpaceSize, triggerSpaceSize = _a === void 0 ? 12 : _a, _b = props.alignType, alignType = _b === void 0 ? 'bottom' : _b, className = props.className, style = props.style, restProps = tslib_1.__rest(props, ["extraLeft", "extraRight", "triggerSpaceSize", "alignType", "className", "style"]);
    var _c = (0, useCustom_1.useCustom)(tslib_1.__assign(tslib_1.__assign({}, restProps), { alignType: alignType })), CCombineSearchTrigger = _c.CCombineSearchTrigger, CCombineSearchView = _c.CCombineSearchView, CCombineSearchInline = _c.CCombineSearchInline;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var combineCls = getCPrefixCls('search-combine');
    var extraLeftNode = (0, utils_1.getTriggerExtraNode)(extraLeft);
    var extraRightNode = (0, utils_1.getTriggerExtraNode)(extraRight);
    if (alignType === 'inline') {
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(combineCls, "-wrapper"), (0, classnames_1.default)("".concat(combineCls, "-wrapper-inline")), className), style: style, "data-cy": (0, utils_1.combineDataCy)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
            react_1.default.createElement(web_react_1.Space, { size: triggerSpaceSize, align: "start", className: (0, classnames_1.default)("".concat(combineCls, "-wrapper-trigger-left")) },
                extraLeftNode,
                CCombineSearchInline),
            extraRight && (react_1.default.createElement(web_react_1.Space, { size: triggerSpaceSize, style: { marginLeft: 12 } }, extraRightNode))));
    }
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(combineCls, "-wrapper"), className), style: style, "data-cy": (0, utils_1.combineDataCy)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(combineCls, "-wrapper-bottom")) },
            react_1.default.createElement(web_react_1.Space, { size: triggerSpaceSize, align: "start", className: (0, classnames_1.default)("".concat(combineCls, "-wrapper-trigger-left")) },
                extraLeftNode,
                CCombineSearchTrigger),
            extraRight && (react_1.default.createElement(web_react_1.Space, { size: triggerSpaceSize, style: { marginLeft: 12 } }, extraRightNode))),
        CCombineSearchView));
};
CCombineSearch.useCustom = useCustom_1.useCustom;
CCombineSearch.displayName = 'CCombineSearch';
exports.default = CCombineSearch;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map