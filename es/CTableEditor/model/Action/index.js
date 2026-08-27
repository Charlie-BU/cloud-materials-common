import { __read, __spreadArray } from "tslib";
var Action = /** @class */ (function () {
    function Action(options) {
        this.options = options;
    }
    Action.prototype.execute = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_b = (_a = this.options).execute) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], __read(args), false));
    };
    Action.prototype.undo = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_b = (_a = this.options).undo) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], __read(args), false));
    };
    return Action;
}());
export { Action };
//# sourceMappingURL=index.js.map