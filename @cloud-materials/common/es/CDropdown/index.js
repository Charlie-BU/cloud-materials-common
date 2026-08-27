import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useMemo } from 'react';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/iconbox-react-ve-o-design';
import { useControlledValue } from '../hooks/useControlledValue';
import { omit } from 'lodash-es';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory('cdropdown');
export var testId = {
    popover: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["popover"], ["popover"]))),
    component: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["component"], ["component"]))),
};
function CStatusDropdown(props) {
    var component = props.component, _a = props.labelKey, labelKey = _a === void 0 ? '' : _a, _b = props.valueKey, valueKey = _b === void 0 ? '' : _b, _c = props.options, options = _c === void 0 ? [] : _c, onChange = props.onChange, restProps = __rest(props, ["component", "labelKey", "valueKey", "options", "onChange"]);
    var filterOptions = useMemo(function () { return options.filter(Boolean); }, [options]);
    var _d = __read(useControlledValue(props), 2), value = _d[0], setValue = _d[1];
    var index = useMemo(function () {
        var result = filterOptions.findIndex(function (item) { return (item === null || item === void 0 ? void 0 : item[valueKey]) === value; });
        return result >= 0 ? result : undefined;
    }, [filterOptions, valueKey, value]);
    var handleChange = function (index) {
        var record = filterOptions[index];
        var value = record[valueKey];
        setValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
    };
    var dropList = (React.createElement(Menu, { onClickMenuItem: function (key) { return handleChange(Number(key)); } }, filterOptions.map(function (item, index) { return (React.createElement(Menu.Item, { key: index.toString() }, item === null || item === void 0 ? void 0 : item[labelKey])); })));
    var currentOption = useMemo(function () {
        var _a;
        if (typeof index === 'number') {
            var option = filterOptions[index];
            var element = option[labelKey];
            if (!!element) {
                element = (React.createElement(React.Fragment, null,
                    element,
                    React.createElement(IconDown, { style: { marginLeft: 4 } })));
            }
            return __assign(__assign({}, option), (_a = {}, _a[labelKey] = element, _a));
        }
        else {
            return undefined;
        }
    }, [filterOptions, index, labelKey]);
    return (React.createElement(Dropdown, __assign({}, omit(restProps, ['value', 'defaultValue']), { droplist: dropList }),
        React.createElement("span", { style: { cursor: 'pointer' }, "data-testid": testId.component, "data-cy": testId.component }, !!currentOption && !!component && React.createElement(component, currentOption))));
}
CStatusDropdown.displayName = 'CStatusDropdown';
export default CStatusDropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map