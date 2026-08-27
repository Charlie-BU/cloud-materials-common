"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../CConfigProvider");
var useMergeProps_1 = require("../hooks/useMergeProps");
var util_1 = require("./util");
var CStatisticList_1 = tslib_1.__importDefault(require("./components/CStatisticList"));
var CCountdown_1 = tslib_1.__importDefault(require("./components/CCountdown"));
var cssRoot = (0, util_1.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.testId = {
    container: "".concat(cssRoot, "-container"),
    title: "".concat(cssRoot, "-title"),
    describe: "".concat(cssRoot, "-describe"),
    unit: "".concat(cssRoot, "-unit"),
    suffix: "".concat(cssRoot, "-suffix"),
    placeholder: "".concat(cssRoot, "-placeholder"),
    listWrapper: "".concat(cssRoot, "-list-Wrapper"),
    listTitle: "".concat(cssRoot, "-listTitle"),
};
var defaultProps = {
    type: 'default',
    disabled: false,
    border: true,
    placeholder: '-',
};
function CStatistic(props) {
    var _a;
    var _b = (0, useMergeProps_1.useMergeProps)(props, defaultProps, {}), style = _b.style, className = _b.className, describe = _b.describe, unit = _b.unit, prefix = _b.prefix, suffix = _b.suffix, title = _b.title, value = _b.value, type = _b.type, disabled = _b.disabled, border = _b.border, placeholder = _b.placeholder, loading = _b.loading, onClick = _b.onClick, restStatisticProps = tslib_1.__rest(_b, ["style", "className", "describe", "unit", "prefix", "suffix", "title", "value", "type", "disabled", "border", "placeholder", "loading", "onClick"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(classPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), className, classPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), type), (_a = {},
            _a[classPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["border"], ["border"])))] = border,
            _a[classPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["", "-disabled"], ["", "-disabled"])), type)] = disabled,
            _a)), "data-testid": exports.testId.container, onClick: function () {
            if (type === 'link' && !disabled) {
                onClick === null || onClick === void 0 ? void 0 : onClick();
            }
        } },
        react_1.default.createElement(web_react_1.Statistic, tslib_1.__assign({}, restStatisticProps, { value: value, loading: (0, lodash_es_1.isNil)(value) || loading, title: react_1.default.createElement("div", { className: classPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["title"], ["title"]))), "data-testid": exports.testId.title }, title), prefix: prefix, suffix: react_1.default.createElement("span", null,
                unit && (react_1.default.createElement("span", { className: classPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["unit"], ["unit"]))), "data-testid": exports.testId.unit }, unit)),
                suffix && (react_1.default.createElement("span", { className: classPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["suffix"], ["suffix"]))), "data-testid": exports.testId.suffix }, suffix))), extra: !(0, lodash_es_1.isNil)(value) && !loading ? (describe && (react_1.default.createElement("div", { className: classPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["describe"], ["describe"]))), "data-testid": exports.testId.describe }, describe))) : (react_1.default.createElement("span", { className: classPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["placeholder"], ["placeholder"]))), "data-testid": exports.testId.placeholder }, placeholder)) }))));
}
CStatistic.displayName = 'CStatistic';
CStatistic.List = CStatisticList_1.default;
CStatistic.Countdown = CCountdown_1.default;
exports.default = CStatistic;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=index.js.map