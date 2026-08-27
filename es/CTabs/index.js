import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { Tabs } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
import { cssPrefix } from './util';
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    pullWithElement: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["pullWithElement"], ["pullWithElement"]))),
};
function CTabs(props) {
    var _a;
    var style = props.style, className = props.className, _b = props.leftBottomBorder, leftBottomBorder = _b === void 0 ? false : _b, children = props.children, sceneType = props.sceneType, _c = props.isFullElement, isFullElement = _c === void 0 ? false : _c, restTabsProps = __rest(props, ["style", "className", "leftBottomBorder", "children", "sceneType", "isFullElement"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var classPrefix = useCssPrefix('tabs');
    var elementClassName = isFullElement ? classPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["fullelement"], ["fullelement"]))) : classPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["container"], ["container"])));
    return (React.createElement("div", { style: style, className: classNames(className, classPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", ""], ["", ""])), sceneType)), "data-testid": testId.container, "data-cy": testId.container },
        React.createElement("div", { "data-testid": testId.pullWithElement, className: classNames("".concat(elementClassName), (_a = {},
                _a[classPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["no-left-bottom-border"], ["no-left-bottom-border"])))] = !leftBottomBorder,
                _a)) },
            React.createElement(Tabs, __assign({}, restTabsProps),
                " ",
                children))));
}
CTabs.displayName = 'CTabs';
export default CTabs;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map