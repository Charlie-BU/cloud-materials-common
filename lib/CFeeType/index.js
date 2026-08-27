"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var interface_1 = require("./interface");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var utils_1 = require("./utils");
var components_1 = require("./components");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var config_1 = require("./config");
var CConfigProvider_1 = require("../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('fee-type');
var testId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    type: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["type"], ["type"]))),
};
var CFeeType = function (props) {
    var _a;
    var _b, _c;
    var chargeType = props.chargeType, chargeStatus = props.chargeStatus, createTime = props.createTime, statusChangeTime = props.statusChangeTime, style = props.style, className = props.className, customStatusMap = props.customStatusMap, defaultChargeLabel = props.defaultChargeLabel, isClosed = props.isClosed, isReclaim = props.isReclaim, customChargeLabel = props.customChargeLabel;
    var _d = (0, config_1.useChargeLocalConfig)({ chargeType: chargeType, isClosed: isClosed, isReclaim: isReclaim }), defaultStatusMap = _d.defaultStatusMap, ChargeTypeLabel = _d.ChargeTypeLabel;
    //获取计费状态的map映射表，优先级：组件props传入 > 组件config配置 > 组件内置map
    var statusMap = customStatusMap !== null && customStatusMap !== void 0 ? customStatusMap : defaultStatusMap;
    // 获取计费类型的label，优先级：组件props传入 > 组件config > 组件内置默认值
    var validChargeType = customChargeLabel !== null && customChargeLabel !== void 0 ? customChargeLabel : ChargeTypeLabel;
    var _e = statusMap[chargeStatus] || {}, _f = _e.statusName, statusName = _f === void 0 ? '' : _f, nextStatusName = _e.nextStatusName, displayType = _e.displayType;
    var chargeTypeLabel = (_c = (_b = validChargeType[chargeType]) !== null && _b !== void 0 ? _b : defaultChargeLabel) !== null && _c !== void 0 ? _c : (0, config_1.getChargeTypeLabel)();
    var isPostPaid = chargeType === 'PostPaid';
    // 判断当前数传入一个时间还是一次传入多个时间
    var _isSingleTime = (0, utils_1.isSingleTime)(statusChangeTime);
    var overdueTime, closedTime, reclaimTime;
    if (_isSingleTime) {
        overdueTime = statusChangeTime;
        closedTime = statusChangeTime;
        reclaimTime = statusChangeTime;
    }
    else {
        (_a = statusChangeTime, overdueTime = _a.overdueTime, closedTime = _a.closedTime, reclaimTime = _a.reclaimTime);
    }
    var _g = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _g.useCssPrefix, locale = _g.locale;
    var cssPrefix = useCssPrefix('fee-type');
    var renderChargeStatus = function () {
        var detail;
        var date;
        switch (displayType) {
            case interface_1.DisplayTypeKey.none:
                detail = null;
                break;
            case interface_1.DisplayTypeKey.wait:
                detail = react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["detail-wait"], ["detail-wait"]))) }, statusName);
                break;
            case interface_1.DisplayTypeKey.normal:
                if (isPostPaid) {
                    detail = createTime && (react_1.default.createElement(components_1.Normal, { date: createTime, name: locale.CFeeType.created, chargeStatus: chargeStatus }));
                }
                else {
                    detail = (react_1.default.createElement(components_1.Normal, { date: overdueTime, name: nextStatusName, chargeStatus: chargeStatus, chargeType: chargeType, statusMap: statusMap }));
                }
                break;
            case interface_1.DisplayTypeKey.error:
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
                detail = react_1.default.createElement(components_1.ChargeError, { statusName: statusName, nextStatusName: nextStatusName, date: date });
                break;
            case interface_1.DisplayTypeKey.typechanging:
            case interface_1.DisplayTypeKey.changing:
                detail = (react_1.default.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["detail-changing"], ["detail-changing"]))) },
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconLoading, { className: "arco-icon-loading" }),
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["detail-changing-text"], ["detail-changing-text"]))) }, statusName)));
                break;
            default:
                detail = null;
        }
        return detail;
    };
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-cy": testId.container },
        displayType !== interface_1.DisplayTypeKey.typechanging && (react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["type"], ["type"]))), "data-cy": testId.type }, chargeTypeLabel)),
        renderChargeStatus()));
};
/** 注册全局状态映射配置 */
CFeeType.config = config_1.setChargeStatusConfig;
CFeeType.displayName = 'CFeeType';
exports.default = CFeeType;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map