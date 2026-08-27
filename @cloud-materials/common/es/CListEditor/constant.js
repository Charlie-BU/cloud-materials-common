var _a;
import { __makeTemplateObject } from "tslib";
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { Input, InputTag, Select, InputNumber, Radio, Switch, Rate, Slider, TimePicker, Cascader, Checkbox, } from '@arco-design/web-react';
export var cssPrefix = classNamePrefixFactory('list-editor');
export var testId = {
    root: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
    rowItem: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["rowItem"], ["rowItem"]))),
    deleteButton: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["delete-button"], ["delete-button"]))),
};
export var builtInMap = (_a = {
        Input: Input,
        InputTag: InputTag,
        Select: Select,
        InputNumber: InputNumber
    },
    _a['Input.TextArea'] = Input.TextArea,
    _a.Radio = Radio,
    _a['Radio.Group'] = Radio.Group,
    _a.Switch = Switch,
    _a.Rate = Rate,
    _a.Slider = Slider,
    _a.TimePicker = TimePicker,
    _a['TimePicker.RangePicker'] = TimePicker.RangePicker,
    _a.Cascader = Cascader,
    _a.Checkbox = Checkbox,
    _a);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=constant.js.map