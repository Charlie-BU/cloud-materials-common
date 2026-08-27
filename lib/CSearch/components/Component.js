"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var builtInComponent_1 = require("../../_factory/builtInComponent");
var CConfigProvider_1 = require("../../CConfigProvider");
var SearchInput_1 = tslib_1.__importDefault(require("./SearchInput"));
var RangePicker = web_react_1.DatePicker.RangePicker;
exports.components = {
    Input: SearchInput_1.default,
    InputNumber: web_react_1.InputNumber,
    Select: web_react_1.Select,
    DatePicker: web_react_1.DatePicker,
    RangePicker: RangePicker,
    AutoComplete: web_react_1.AutoComplete,
};
var SearchComponent = function (_a) {
    var content = _a.content, commonProps = _a.commonProps;
    var renderBuiltIn = (0, builtInComponent_1.useBuiltIn)().renderBuiltIn;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _b.getCPrefixCls, locale = _b.locale;
    var componentCls = getCPrefixCls('search-component');
    var getDefaultPlaceholder = function (name) {
        if (['Input', 'InputNumber', 'AutoComplete'].includes(name)) {
            return locale.CSearch.inputPlaceholder;
        }
        if (name === 'Select') {
            return locale.CSearch.selectPlaceholder;
        }
        return;
    };
    var defaultProps = Object.fromEntries(Object.keys(exports.components).map(function (name) { return [
        name,
        {
            className: componentCls,
            placeholder: getDefaultPlaceholder(name),
        },
    ]; }));
    return (react_1.default.createElement(react_1.default.Fragment, null, renderBuiltIn(content, {
        defaultPropsMap: defaultProps,
        commonProps: commonProps,
    })));
};
exports.default = SearchComponent;
//# sourceMappingURL=Component.js.map