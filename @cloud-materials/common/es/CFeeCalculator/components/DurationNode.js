import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { Select } from '@arco-design/web-react';
import classNames from 'classnames';
import { feePrefix } from '../utils/prefix';
export var DurationNode = function (_a) {
    var durationConfigState = _a.durationConfigState, handleOnChange = _a.handleOnChange;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix(feePrefix);
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["duration"], ["duration"]))) },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["duration-title"], ["duration-title"])))) }, durationConfigState.durationLabel),
        React.createElement(Select, { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["duration-select"], ["duration-select"]))), "data-cy": testId.durationSelect, "data-testid": testId.durationSelect, options: durationConfigState.durationOptions, defaultValue: durationConfigState.duration, 
            // Select组件始终受控
            value: durationConfigState.duration, onChange: function (duration) {
                handleOnChange({ duration: duration });
            } })));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=DurationNode.js.map