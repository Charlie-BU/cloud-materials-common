"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaskableComponent = void 0;
var tslib_1 = require("tslib");
var createStaticMethods_1 = require("./createStaticMethods");
var TriggerWrapper_1 = require("./TriggerWrapper");
var createMaskableComponent = function (Component, attachMap) {
    var staticProps = Object.keys(attachMap).reduce(function (prev, current) {
        var _a;
        var ComponentWithStaticMethods = attachMap[current];
        var open = ComponentWithStaticMethods.open, close = ComponentWithStaticMethods.close;
        return tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[current] = ComponentWithStaticMethods, _a["open".concat(current)] = open, _a["close".concat(current)] = close, _a));
    }, {});
    var WithStaticBaseComponent = (0, createStaticMethods_1.createStaticMethods)(Component);
    var closeAll = function () {
        WithStaticBaseComponent.close();
        Object.keys(attachMap).forEach(function (key) {
            attachMap[key].close();
        });
    };
    return Object.assign(WithStaticBaseComponent, tslib_1.__assign(tslib_1.__assign({}, staticProps), { TriggerWrapper: TriggerWrapper_1.TriggerWrapper, closeAll: closeAll }));
};
exports.createMaskableComponent = createMaskableComponent;
//# sourceMappingURL=createMaskableComponent.js.map