"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var index_1 = tslib_1.__importDefault(require("../index"));
var CConfigProvider_1 = require("../../CConfigProvider");
var Countdown = web_react_1.Statistic.Countdown;
var CCountdown = function (props) {
    var style = props.style, className = props.className, title = props.title, unit = props.unit, describe = props.describe, suffix = props.suffix, prefix = props.prefix, styleValue = props.styleValue, border = props.border, renderFormat = props.renderFormat, restCountdownProps = tslib_1.__rest(props, ["style", "className", "title", "unit", "describe", "suffix", "prefix", "styleValue", "border", "renderFormat"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (react_1.default.createElement(Countdown, tslib_1.__assign({}, restCountdownProps, { style: tslib_1.__assign({}, style), className: (0, classnames_1.default)(classPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), classPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["countdown"], ["countdown"]))), className), renderFormat: function (valueDiff, _value) {
            return (react_1.default.createElement(index_1.default, { title: title, styleValue: styleValue, border: border, value: _value, renderFormat: function () {
                    if (renderFormat) {
                        return renderFormat(valueDiff, _value);
                    }
                    else {
                        return _value;
                    }
                }, unit: unit, describe: describe, prefix: prefix, suffix: suffix }));
        } })));
};
exports.default = CCountdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=CCountdown.js.map