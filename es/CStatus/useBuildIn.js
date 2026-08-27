import { __assign, __rest } from "tslib";
import { useCConfigContext } from '../CConfigProvider';
import { getStatusConfig } from './config';
export var useBuildIn = function () {
    var _a = useCConfigContext(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
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
        var _a = getStatusConfig(), inputStatusMap = _a.statusMap, otherProps = __rest(_a, ["statusMap"]);
        var statusMap = __assign(__assign(__assign({}, defaultStatusMap), inputStatusMap), props.statusMap);
        return __assign(__assign(__assign({}, otherProps), props), { statusMap: statusMap });
    };
    return { defaultStatusMap: defaultStatusMap, mergeProps: mergeProps, statusCls: statusCls };
};
//# sourceMappingURL=useBuildIn.js.map