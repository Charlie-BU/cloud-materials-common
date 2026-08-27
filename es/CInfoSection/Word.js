import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
var Word = function (props) {
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('info-section');
    return (React.createElement("span", { onClick: props.onClick, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["word-editor"], ["word-editor"]))), style: __assign({}, props.style) }, props.value));
};
export default Word;
var templateObject_1;
//# sourceMappingURL=Word.js.map