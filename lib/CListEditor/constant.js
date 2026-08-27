"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtInMap = exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var web_react_1 = require("@arco-design/web-react");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('list-editor');
exports.testId = {
    root: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
    rowItem: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["rowItem"], ["rowItem"]))),
    deleteButton: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["delete-button"], ["delete-button"]))),
};
exports.builtInMap = (_a = {
        Input: web_react_1.Input,
        InputTag: web_react_1.InputTag,
        Select: web_react_1.Select,
        InputNumber: web_react_1.InputNumber
    },
    _a['Input.TextArea'] = web_react_1.Input.TextArea,
    _a.Radio = web_react_1.Radio,
    _a['Radio.Group'] = web_react_1.Radio.Group,
    _a.Switch = web_react_1.Switch,
    _a.Rate = web_react_1.Rate,
    _a.Slider = web_react_1.Slider,
    _a.TimePicker = web_react_1.TimePicker,
    _a['TimePicker.RangePicker'] = web_react_1.TimePicker.RangePicker,
    _a.Cascader = web_react_1.Cascader,
    _a.Checkbox = web_react_1.Checkbox,
    _a);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=constant.js.map