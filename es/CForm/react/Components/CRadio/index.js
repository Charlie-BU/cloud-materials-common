import { __assign } from "tslib";
import { observer, useField } from '@formily/react';
import React from 'react';
import Radio from '../../../../CRadio';
import { isObject } from 'lodash-es';
var CRadio = observer(function (props) {
    var _a, _b;
    var field = useField();
    var readPretty = field.readPretty;
    var dataSource = (_b = (_a = props === null || props === void 0 ? void 0 : props.options) !== null && _a !== void 0 ? _a : field.dataSource) !== null && _b !== void 0 ? _b : [];
    var currentOption = dataSource.find(function (optionItem) {
        var option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
        return option.value === (props === null || props === void 0 ? void 0 : props.value);
    });
    var readPrettyValue = props.value;
    if (currentOption) {
        readPrettyValue = isObject(currentOption) ? currentOption.label : currentOption;
    }
    return readPretty ? React.createElement("span", null, readPrettyValue) : React.createElement(Radio.Group, __assign({}, props, { options: dataSource }));
});
export default CRadio;
//# sourceMappingURL=index.js.map