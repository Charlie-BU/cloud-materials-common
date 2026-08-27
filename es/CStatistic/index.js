import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import cs from 'classnames';
import { Statistic } from '@arco-design/web-react';
import { isNil } from 'lodash-es';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks/useMergeProps';
import { cssPrefix } from './util';
import CStatisticList from './components/CStatisticList';
import CCountdown from './components/CCountdown';
var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
export var testId = {
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
    var _b = useMergeProps(props, defaultProps, {}), style = _b.style, className = _b.className, describe = _b.describe, unit = _b.unit, prefix = _b.prefix, suffix = _b.suffix, title = _b.title, value = _b.value, type = _b.type, disabled = _b.disabled, border = _b.border, placeholder = _b.placeholder, loading = _b.loading, onClick = _b.onClick, restStatisticProps = __rest(_b, ["style", "className", "describe", "unit", "prefix", "suffix", "title", "value", "type", "disabled", "border", "placeholder", "loading", "onClick"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (React.createElement("div", { style: style, className: cs(classPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), className, classPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), type), (_a = {},
            _a[classPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["border"], ["border"])))] = border,
            _a[classPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", "-disabled"], ["", "-disabled"])), type)] = disabled,
            _a)), "data-testid": testId.container, onClick: function () {
            if (type === 'link' && !disabled) {
                onClick === null || onClick === void 0 ? void 0 : onClick();
            }
        } },
        React.createElement(Statistic, __assign({}, restStatisticProps, { value: value, loading: isNil(value) || loading, title: React.createElement("div", { className: classPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["title"], ["title"]))), "data-testid": testId.title }, title), prefix: prefix, suffix: React.createElement("span", null,
                unit && (React.createElement("span", { className: classPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["unit"], ["unit"]))), "data-testid": testId.unit }, unit)),
                suffix && (React.createElement("span", { className: classPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["suffix"], ["suffix"]))), "data-testid": testId.suffix }, suffix))), extra: !isNil(value) && !loading ? (describe && (React.createElement("div", { className: classPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["describe"], ["describe"]))), "data-testid": testId.describe }, describe))) : (React.createElement("span", { className: classPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["placeholder"], ["placeholder"]))), "data-testid": testId.placeholder }, placeholder)) }))));
}
CStatistic.displayName = 'CStatistic';
CStatistic.List = CStatisticList;
CStatistic.Countdown = CCountdown;
export default CStatistic;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=index.js.map