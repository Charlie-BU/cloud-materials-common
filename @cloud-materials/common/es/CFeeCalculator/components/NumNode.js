import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { InputNumber } from '@arco-design/web-react';
import classNames from 'classnames';
import { feePrefix } from '../utils/prefix';
export var NumNode = function (_a) {
    var numConfigState = _a.numConfigState, handleOnChange = _a.handleOnChange;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix(feePrefix);
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["num"], ["num"]))) },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["num-title"], ["num-title"])))) }, numConfigState.numLabel),
        React.createElement(InputNumber, { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["num-input"], ["num-input"]))), "data-cy": testId.numInput, "data-testid": testId.numInput, defaultValue: numConfigState.num, max: numConfigState.maxNum, min: numConfigState.minNum, suffix: numConfigState.numUnit, 
            // InputNumber组件始终受控
            value: numConfigState.num, onChange: function (num) {
                handleOnChange({ num: num });
            }, mode: "button", precision: 0 })));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=NumNode.js.map