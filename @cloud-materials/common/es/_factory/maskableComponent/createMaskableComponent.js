import { __assign } from "tslib";
import { createStaticMethods } from './createStaticMethods';
import { TriggerWrapper } from './TriggerWrapper';
export var createMaskableComponent = function (Component, attachMap) {
    var staticProps = Object.keys(attachMap).reduce(function (prev, current) {
        var _a;
        var ComponentWithStaticMethods = attachMap[current];
        var open = ComponentWithStaticMethods.open, close = ComponentWithStaticMethods.close;
        return __assign(__assign({}, prev), (_a = {}, _a[current] = ComponentWithStaticMethods, _a["open".concat(current)] = open, _a["close".concat(current)] = close, _a));
    }, {});
    var WithStaticBaseComponent = createStaticMethods(Component);
    var closeAll = function () {
        WithStaticBaseComponent.close();
        Object.keys(attachMap).forEach(function (key) {
            attachMap[key].close();
        });
    };
    return Object.assign(WithStaticBaseComponent, __assign(__assign({}, staticProps), { TriggerWrapper: TriggerWrapper, closeAll: closeAll }));
};
//# sourceMappingURL=createMaskableComponent.js.map