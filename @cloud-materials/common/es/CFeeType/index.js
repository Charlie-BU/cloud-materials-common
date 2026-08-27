import { __makeTemplateObject } from "tslib";
import React from 'react';
import { DisplayTypeKey } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { isSingleTime } from './utils';
import { Normal, ChargeError } from './components';
import { IconLoading } from '@arco-design/iconbox-react-ve-o-design';
import { getChargeTypeLabel, setChargeStatusConfig, useChargeLocalConfig } from './config';
import { useCConfigContext } from '../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('fee-type');
var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    type: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["type"], ["type"]))),
};
var CFeeType = function (props) {
    var _a;
    var _b, _c;
    var chargeType = props.chargeType, chargeStatus = props.chargeStatus, createTime = props.createTime, statusChangeTime = props.statusChangeTime, style = props.style, className = props.className, customStatusMap = props.customStatusMap, defaultChargeLabel = props.defaultChargeLabel, isClosed = props.isClosed, isReclaim = props.isReclaim, customChargeLabel = props.customChargeLabel;
    var _d = useChargeLocalConfig({ chargeType: chargeType, isClosed: isClosed, isReclaim: isReclaim }), defaultStatusMap = _d.defaultStatusMap, ChargeTypeLabel = _d.ChargeTypeLabel;
    //获取计费状态的map映射表，优先级：组件props传入 > 组件config配置 > 组件内置map
    var statusMap = customStatusMap !== null && customStatusMap !== void 0 ? customStatusMap : defaultStatusMap;
    // 获取计费类型的label，优先级：组件props传入 > 组件config > 组件内置默认值
    var validChargeType = customChargeLabel !== null && customChargeLabel !== void 0 ? customChargeLabel : ChargeTypeLabel;
    var _e = statusMap[chargeStatus] || {}, _f = _e.statusName, statusName = _f === void 0 ? '' : _f, nextStatusName = _e.nextStatusName, displayType = _e.displayType;
    var chargeTypeLabel = (_c = (_b = validChargeType[chargeType]) !== null && _b !== void 0 ? _b : defaultChargeLabel) !== null && _c !== void 0 ? _c : getChargeTypeLabel();
    var isPostPaid = chargeType === 'PostPaid';
    // 判断当前数传入一个时间还是一次传入多个时间
    var _isSingleTime = isSingleTime(statusChangeTime);
    var overdueTime, closedTime, reclaimTime;
    if (_isSingleTime) {
        overdueTime = statusChangeTime;
        closedTime = statusChangeTime;
        reclaimTime = statusChangeTime;
    }
    else {
        (_a = statusChangeTime, overdueTime = _a.overdueTime, closedTime = _a.closedTime, reclaimTime = _a.reclaimTime);
    }
    var _g = useCConfigContext(), useCssPrefix = _g.useCssPrefix, locale = _g.locale;
    var cssPrefix = useCssPrefix('fee-type');
    var renderChargeStatus = function () {
        var detail;
        var date;
        switch (displayType) {
            case DisplayTypeKey.none:
                detail = null;
                break;
            case DisplayTypeKey.wait:
                detail = React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["detail-wait"], ["detail-wait"]))) }, statusName);
                break;
            case DisplayTypeKey.normal:
                if (isPostPaid) {
                    detail = createTime && (React.createElement(Normal, { date: createTime, name: locale.CFeeType.created, chargeStatus: chargeStatus }));
                }
                else {
                    detail = (React.createElement(Normal, { date: overdueTime, name: nextStatusName, chargeStatus: chargeStatus, chargeType: chargeType, statusMap: statusMap }));
                }
                break;
            case DisplayTypeKey.error:
                // 未关停 && 未删除时，处于到期/欠费状态，下一个状态是关停，取关停时间
                if (!isReclaim && !isClosed) {
                    date = closedTime;
                }
                else if (isClosed) {
                    // 关停态，下一状态是删除，取删除时间
                    date = reclaimTime;
                }
                else {
                    // 否则就是删除态，没有下一个状态
                    date = '';
                }
                detail = React.createElement(ChargeError, { statusName: statusName, nextStatusName: nextStatusName, date: date });
                break;
            case DisplayTypeKey.typechanging:
            case DisplayTypeKey.changing:
                detail = (React.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["detail-changing"], ["detail-changing"]))) },
                    React.createElement(IconLoading, { className: "arco-icon-loading" }),
                    React.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["detail-changing-text"], ["detail-changing-text"]))) }, statusName)));
                break;
            default:
                detail = null;
        }
        return detail;
    };
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""]))), className), "data-cy": testId.container },
        displayType !== DisplayTypeKey.typechanging && (React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["type"], ["type"]))), "data-cy": testId.type }, chargeTypeLabel)),
        renderChargeStatus()));
};
/** 注册全局状态映射配置 */
CFeeType.config = setChargeStatusConfig;
CFeeType.displayName = 'CFeeType';
export default CFeeType;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map