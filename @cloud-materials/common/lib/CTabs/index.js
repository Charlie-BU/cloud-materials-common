"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var util_1 = require("./util");
exports.testId = {
    container: (0, util_1.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    pullWithElement: (0, util_1.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["pullWithElement"], ["pullWithElement"]))),
};
function CTabs(props) {
    var _a;
    var style = props.style, className = props.className, _b = props.leftBottomBorder, leftBottomBorder = _b === void 0 ? false : _b, children = props.children, sceneType = props.sceneType, _c = props.isFullElement, isFullElement = _c === void 0 ? false : _c, restTabsProps = tslib_1.__rest(props, ["style", "className", "leftBottomBorder", "children", "sceneType", "isFullElement"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var classPrefix = useCssPrefix('tabs');
    var elementClassName = isFullElement ? classPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["fullelement"], ["fullelement"]))) : classPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["container"], ["container"])));
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(className, classPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), sceneType)), "data-testid": exports.testId.container, "data-cy": exports.testId.container },
        react_1.default.createElement("div", { "data-testid": exports.testId.pullWithElement, className: (0, classnames_1.default)("".concat(elementClassName), (_a = {},
                _a[classPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["no-left-bottom-border"], ["no-left-bottom-border"])))] = !leftBottomBorder,
                _a)) },
            react_1.default.createElement(web_react_1.Tabs, tslib_1.__assign({}, restTabsProps),
                " ",
                children))));
}
CTabs.displayName = 'CTabs';
exports.default = CTabs;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map