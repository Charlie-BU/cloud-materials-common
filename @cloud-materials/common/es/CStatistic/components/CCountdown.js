import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import cs from 'classnames';
import { Statistic } from '@arco-design/web-react';
import CStatistic from '../index';
import { useCConfigContext } from '../../CConfigProvider';
var Countdown = Statistic.Countdown;
var CCountdown = function (props) {
    var style = props.style, className = props.className, title = props.title, unit = props.unit, describe = props.describe, suffix = props.suffix, prefix = props.prefix, styleValue = props.styleValue, border = props.border, renderFormat = props.renderFormat, restCountdownProps = __rest(props, ["style", "className", "title", "unit", "describe", "suffix", "prefix", "styleValue", "border", "renderFormat"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (React.createElement(Countdown, __assign({}, restCountdownProps, { style: __assign({}, style), className: cs(classPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), classPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["countdown"], ["countdown"]))), className), renderFormat: function (valueDiff, _value) {
            return (React.createElement(CStatistic, { title: title, styleValue: styleValue, border: border, value: _value, renderFormat: function () {
                    if (renderFormat) {
                        return renderFormat(valueDiff, _value);
                    }
                    else {
                        return _value;
                    }
                }, unit: unit, describe: describe, prefix: prefix, suffix: suffix }));
        } })));
};
export default CCountdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=CCountdown.js.map