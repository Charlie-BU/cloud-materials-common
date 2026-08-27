import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import cs from 'classnames';
import { useCConfigContext } from '../../CConfigProvider';
import CStatistic, { testId } from '../index';
var CStatisticList = function (props) {
    var style = props.style, className = props.className, children = props.children, title = props.title, _a = props.list, list = _a === void 0 ? [] : _a;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (React.createElement("div", { style: style, className: cs(classPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["list"], ["list"]))), className), "data-testid": testId.listWrapper },
        title && (React.createElement("div", { className: classPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["list-title"], ["list-title"]))), "data-testid": testId.listTitle, "data-cy": true }, title)),
        React.createElement("div", { className: classPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["list-content"], ["list-content"]))) },
            list.map(function (item, idx) {
                return item.isCountdown ? (React.createElement(CStatistic.Countdown, __assign({ key: idx }, item, { border: false }))) : (React.createElement(CStatistic, __assign({ key: idx }, item, { border: false })));
            }),
            children)));
};
export default CStatisticList;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CStatisticList.js.map