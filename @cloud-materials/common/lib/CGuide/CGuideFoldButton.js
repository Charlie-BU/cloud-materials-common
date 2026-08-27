"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icon_1 = require("@arco-design/web-react/icon");
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../CConfigProvider");
var cssPrefix = (0, classNamePrefixFactory_1.default)('guide');
var CGuideFoldButton = function (props) {
    var _a;
    var style = props.style, className = props.className, isFold = props.isFold, otherProps = tslib_1.__rest(props, ["style", "className", "isFold"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var viewMsg = locale.CGuide.viewGuide;
    var hideMsg = locale.CGuide.hideGuide;
    return (react_1.default.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["btn-wrapper"], ["btn-wrapper"]))) },
        react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "text", style: tslib_1.__assign({ color: '#42464E' }, style) }, otherProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["fold-btn"], ["fold-btn"]))), className, (_a = {}, _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["fold-btn-isFold"], ["fold-btn-isFold"])))] = isFold, _a)), icon: isFold ? react_1.default.createElement(icon_1.IconEye, null) : react_1.default.createElement(icon_1.IconEyeInvisible, null) }),
            react_1.default.createElement("span", { style: { marginLeft: 4 } }, isFold ? viewMsg : hideMsg))));
};
exports.default = CGuideFoldButton;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CGuideFoldButton.js.map