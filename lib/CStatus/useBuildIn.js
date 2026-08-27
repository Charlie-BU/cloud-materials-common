"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBuildIn = void 0;
var tslib_1 = require("tslib");
var CConfigProvider_1 = require("../CConfigProvider");
var config_1 = require("./config");
var useBuildIn = function () {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var statusCls = getCPrefixCls('status');
    var defaultStatusMap = {
        Usable: { status: 'usable', text: locale.CStatus.usable },
        Error: { status: 'error', text: locale.CStatus.error },
        Warning: { status: 'warning', text: locale.CStatus.warning },
        Running: { status: 'running', text: locale.CStatus.running },
        Wait: { status: 'wait', text: locale.CStatus.wait },
        Disable: { status: 'disable', text: locale.CStatus.disable },
    };
    var mergeProps = function (props) {
        var _a = (0, config_1.getStatusConfig)(), inputStatusMap = _a.statusMap, otherProps = tslib_1.__rest(_a, ["statusMap"]);
        var statusMap = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultStatusMap), inputStatusMap), props.statusMap);
        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, otherProps), props), { statusMap: statusMap });
    };
    return { defaultStatusMap: defaultStatusMap, mergeProps: mergeProps, statusCls: statusCls };
};
exports.useBuildIn = useBuildIn;
//# sourceMappingURL=useBuildIn.js.map