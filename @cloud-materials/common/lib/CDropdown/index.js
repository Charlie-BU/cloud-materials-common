"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var useControlledValue_1 = require("../hooks/useControlledValue");
var lodash_es_1 = require("lodash-es");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('cdropdown');
exports.testId = {
    popover: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
    component: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["component"], ["component"]))),
};
function CStatusDropdown(props) {
    var component = props.component, _a = props.labelKey, labelKey = _a === void 0 ? '' : _a, _b = props.valueKey, valueKey = _b === void 0 ? '' : _b, _c = props.options, options = _c === void 0 ? [] : _c, onChange = props.onChange, restProps = tslib_1.__rest(props, ["component", "labelKey", "valueKey", "options", "onChange"]);
    var filterOptions = (0, react_1.useMemo)(function () { return options.filter(Boolean); }, [options]);
    var _d = tslib_1.__read((0, useControlledValue_1.useControlledValue)(props), 2), value = _d[0], setValue = _d[1];
    var index = (0, react_1.useMemo)(function () {
        var result = filterOptions.findIndex(function (item) { return (item === null || item === void 0 ? void 0 : item[valueKey]) === value; });
        return result >= 0 ? result : undefined;
    }, [filterOptions, valueKey, value]);
    var handleChange = function (index) {
        var record = filterOptions[index];
        var value = record[valueKey];
        setValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
    };
    var dropList = (react_1.default.createElement(web_react_1.Menu, { onClickMenuItem: function (key) { return handleChange(Number(key)); } }, filterOptions.map(function (item, index) { return (react_1.default.createElement(web_react_1.Menu.Item, { key: index.toString() }, item === null || item === void 0 ? void 0 : item[labelKey])); })));
    var currentOption = (0, react_1.useMemo)(function () {
        var _a;
        if (typeof index === 'number') {
            var option = filterOptions[index];
            var element = option[labelKey];
            if (!!element) {
                element = (react_1.default.createElement(react_1.default.Fragment, null,
                    element,
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconDown, { style: { marginLeft: 4 } })));
            }
            return tslib_1.__assign(tslib_1.__assign({}, option), (_a = {}, _a[labelKey] = element, _a));
        }
        else {
            return undefined;
        }
    }, [filterOptions, index, labelKey]);
    return (react_1.default.createElement(web_react_1.Dropdown, tslib_1.__assign({}, (0, lodash_es_1.omit)(restProps, ['value', 'defaultValue']), { droplist: dropList }),
        react_1.default.createElement("span", { style: { cursor: 'pointer' }, "data-testid": exports.testId.component, "data-cy": exports.testId.component }, !!currentOption && !!component && react_1.default.createElement(component, currentOption))));
}
CStatusDropdown.displayName = 'CStatusDropdown';
exports.default = CStatusDropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map