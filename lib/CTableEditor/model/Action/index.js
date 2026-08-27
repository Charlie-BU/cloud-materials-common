"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
var tslib_1 = require("tslib");
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
        (_b = (_a = this.options).execute) === null || _b === void 0 ? void 0 : _b.call.apply(_b, tslib_1.__spreadArray([_a], tslib_1.__read(args), false));
    };
    Action.prototype.undo = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_b = (_a = this.options).undo) === null || _b === void 0 ? void 0 : _b.call.apply(_b, tslib_1.__spreadArray([_a], tslib_1.__read(args), false));
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=index.js.map