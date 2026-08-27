"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var prefix_1 = require("../utils/prefix");
var NumNode = function (_a) {
    var numConfigState = _a.numConfigState, handleOnChange = _a.handleOnChange;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["num"], ["num"]))) },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["num-title"], ["num-title"])))) }, numConfigState.numLabel),
        react_1.default.createElement(web_react_1.InputNumber, { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["num-input"], ["num-input"]))), "data-cy": testId_1.testId.numInput, "data-testid": testId_1.testId.numInput, defaultValue: numConfigState.num, max: numConfigState.maxNum, min: numConfigState.minNum, suffix: numConfigState.numUnit, 
            // InputNumber组件始终受控
            value: numConfigState.num, onChange: function (num) {
                handleOnChange({ num: num });
            }, mode: "button", precision: 0 })));
};
exports.NumNode = NumNode;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=NumNode.js.map