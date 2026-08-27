import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import React, { useRef, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { Button } from '@arco-design/web-react';
import CGuideFoldButton from './CGuideFoldButton';
import { CConfigContext } from '../CConfigProvider';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
export var cssPrefix = classNamePrefixFactory('guide');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
};
var Container = function (props) {
    var _a;
    var isFold = props.isFold, style = props.style, className = props.className;
    var ref = useRef(null);
    var height = useRef();
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('guide');
    var calculateHeight = function () {
        var _a;
        var children = ((_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.children) || {};
        var heightList = [];
        for (var i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
            heightList.push(children[i].clientHeight);
        }
        var height = Math.max.apply(Math, __spreadArray([], __read(heightList), false));
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
    useEffect(function () {
        height.current = calculateHeight();
    }, []);
    return (React.createElement("div", { ref: ref, className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), className, (_a = {}, _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["isFold"], ["isFold"])))] = isFold, _a)), style: __assign(__assign({}, style), visibleStyles), "data-testid": testId.container }, props.children));
};
function CGuide(props) {
    var steps = props.steps, style = props.style, className = props.className, _a = props.isFold, isFold = _a === void 0 ? false : _a;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('guide');
    return (React.createElement(React.Fragment, null,
        React.createElement(Container, { isFold: isFold, style: __assign({}, style), className: className }, steps === null || steps === void 0 ? void 0 : steps.map(function (step, index) {
            var title = step.title, introduction = step.introduction, operationButton = step.operationButton, operationRender = step.operationRender;
            return (React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["step-item"], ["step-item"]))), key: index },
                React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["step-item-title"], ["step-item-title"]))) },
                    React.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["step-item-title-index"], ["step-item-title-index"]))) }, "0".concat(index + 1)),
                    React.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["step-item-title-text"], ["step-item-title-text"]))) }, title)),
                React.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["step-item-introduction"], ["step-item-introduction"]))) }, introduction),
                operationButton && (React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["step-item-content"], ["step-item-content"]))) },
                    React.createElement(Button, __assign({ type: "primary", size: "small" }, operationButton), operationButton.text))),
                operationRender && React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["step-item-content"], ["step-item-content"]))) }, operationRender)));
        }))));
}
CGuide.displayName = 'CGuide';
CGuide.CGuideFoldButton = CGuideFoldButton;
export default CGuide;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=index.js.map