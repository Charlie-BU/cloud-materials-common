import { __makeTemplateObject } from "tslib";
import classNames from 'classnames';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import React from 'react';
import { testId } from '../../index';
var Line = function (_a) {
    var showRowNumber = _a.showRowNumber, index = _a.index, value = _a.value, numberWidth = _a.numberWidth;
    var cssPrefix = classNamePrefixFactory('code-block');
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["code-content"], ["code-content"])))) },
        showRowNumber && (React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["index"], ["index"])))), style: { width: numberWidth, left: -"".concat(numberWidth + 16) }, "data-testid": testId.line }, index)),
        React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["code-value"], ["code-value"])))) }, value)));
};
export default Line;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map