"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var CGuideFoldButton_1 = tslib_1.__importDefault(require("./CGuideFoldButton"));
var CConfigProvider_1 = require("../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('guide');
exports.testId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
};
var Container = function (props) {
    var _a;
    var isFold = props.isFold, style = props.style, className = props.className;
    var ref = (0, react_1.useRef)(null);
    var height = (0, react_1.useRef)();
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('guide');
    var calculateHeight = function () {
        var _a;
        var children = ((_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.children) || {};
        var heightList = [];
        for (var i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
            heightList.push(children[i].clientHeight);
        }
        var height = Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(heightList), false));
        return height;
    };
    var visibleStyles = isFold
        ? {
            height: 0,
            opacity: 0,
        }
        : {
            height: 'unset',
            opacity: '1',
        };
    (0, react_1.useEffect)(function () {
        height.current = calculateHeight();
    }, []);
    return (react_1.default.createElement("div", { ref: ref, className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), className, (_a = {}, _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["isFold"], ["isFold"])))] = isFold, _a)), style: tslib_1.__assign(tslib_1.__assign({}, style), visibleStyles), "data-testid": exports.testId.container }, props.children));
};
function CGuide(props) {
    var steps = props.steps, style = props.style, className = props.className, _a = props.isFold, isFold = _a === void 0 ? false : _a;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('guide');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Container, { isFold: isFold, style: tslib_1.__assign({}, style), className: className }, steps === null || steps === void 0 ? void 0 : steps.map(function (step, index) {
            var title = step.title, introduction = step.introduction, operationButton = step.operationButton, operationRender = step.operationRender;
            return (react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["step-item"], ["step-item"]))), key: index },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["step-item-title"], ["step-item-title"]))) },
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["step-item-title-index"], ["step-item-title-index"]))) }, "0".concat(index + 1)),
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["step-item-title-text"], ["step-item-title-text"]))) }, title)),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["step-item-introduction"], ["step-item-introduction"]))) }, introduction),
                operationButton && (react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["step-item-content"], ["step-item-content"]))) },
                    react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "primary", size: "small" }, operationButton), operationButton.text))),
                operationRender && react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["step-item-content"], ["step-item-content"]))) }, operationRender)));
        }))));
}
CGuide.displayName = 'CGuide';
CGuide.CGuideFoldButton = CGuideFoldButton_1.default;
exports.default = CGuide;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=index.js.map