"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CEllipsis_1 = tslib_1.__importDefault(require("../../../../../CEllipsis"));
var react_3 = require("../../../../react");
exports.CheckboxItem = (0, react_2.observer)(function (props) {
    var name = props.name, value = props.value, tooltip = props.tooltip, disabled = props.disabled, onChange = props.onChange, restProps = tslib_1.__rest(props, ["name", "value", "tooltip", "disabled", "onChange"]);
    var prefixCls = (0, react_3.usePrefix)('comp-col-config-btn-checkbox-item');
    var handleClick = function () {
        if (disabled)
            return;
        onChange(!value);
    };
    return (react_1.default.createElement("span", { className: (0, classnames_1.default)("".concat(prefixCls), { disabled: disabled }), onClick: handleClick },
        react_1.default.createElement(web_react_1.Checkbox, tslib_1.__assign({ checked: value, disabled: disabled }, restProps)),
        react_1.default.createElement("span", { className: "".concat(prefixCls, "-name") },
            react_1.default.createElement(CEllipsis_1.default, { content: name })),
        tooltip && (react_1.default.createElement(web_react_1.Popover, { content: tooltip },
            react_1.default.createElement(icon_1.IconQuestionCircle, { className: "".concat(prefixCls, "-tooltip") })))));
});
//# sourceMappingURL=CheckboxItem.js.map