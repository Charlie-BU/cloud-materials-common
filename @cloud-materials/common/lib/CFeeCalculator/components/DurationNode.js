"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var prefix_1 = require("../utils/prefix");
var DurationNode = function (_a) {
    var durationConfigState = _a.durationConfigState, handleOnChange = _a.handleOnChange;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["duration"], ["duration"]))) },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["duration-title"], ["duration-title"])))) }, durationConfigState.durationLabel),
        react_1.default.createElement(web_react_1.Select, { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["duration-select"], ["duration-select"]))), "data-cy": testId_1.testId.durationSelect, "data-testid": testId_1.testId.durationSelect, options: durationConfigState.durationOptions, defaultValue: durationConfigState.duration, 
            // Select组件始终受控
            value: durationConfigState.duration, onChange: function (duration) {
                handleOnChange({ duration: duration });
            } })));
};
exports.DurationNode = DurationNode;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=DurationNode.js.map