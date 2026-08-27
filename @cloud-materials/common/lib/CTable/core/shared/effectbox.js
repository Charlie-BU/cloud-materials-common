"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEffects = exports.useEffectTable = exports.createEffectContext = exports.createEffectHook = void 0;
var tslib_1 = require("tslib");
var shared_1 = require("../../shared");
var checkers_1 = require("./checkers");
var GlobalState = {
    initializing: false,
    lifecycles: [],
    context: [],
    effectStart: false,
    effectEnd: false,
};
var createEffectHook = function (type, callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (GlobalState.effectStart) {
            GlobalState.lifecycles.push({
                type: type,
                callback: function (ctx, payload) {
                    if ((0, shared_1.isFn)(callback)) {
                        callback.apply(void 0, tslib_1.__spreadArray([ctx, payload], tslib_1.__read(GlobalState.context), false)).apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                    }
                },
            });
        }
        else {
            throw new Error('Effect hooks cannot be used in asynchronous function body');
        }
    };
};
exports.createEffectHook = createEffectHook;
var createEffectContext = function (defaultValue) {
    var index;
    return {
        provide: function (value) {
            if (GlobalState.effectStart) {
                index = GlobalState.context.length;
                GlobalState.context[index] = (0, shared_1.isValid)(value) ? value : defaultValue;
            }
            else {
                throw new Error('Provide method cannot be used in asynchronous function body');
            }
        },
        consume: function () {
            if (!GlobalState.effectStart) {
                throw new Error('Consume method cannot be used in asynchronous function body');
            }
            return GlobalState.context[index];
        },
    };
};
exports.createEffectContext = createEffectContext;
var TableEffectContext = (0, exports.createEffectContext)();
exports.useEffectTable = TableEffectContext.consume;
var runEffects = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    GlobalState.lifecycles = [];
    GlobalState.context = [];
    GlobalState.effectStart = true;
    GlobalState.effectEnd = false;
    if ((0, checkers_1.isTable)(context)) {
        TableEffectContext.provide(context);
    }
    args.forEach(function (effects) {
        if ((0, shared_1.isFn)(effects)) {
            effects({ table: context });
        }
    });
    GlobalState.context = [];
    GlobalState.effectStart = false;
    GlobalState.effectEnd = true;
    return GlobalState.lifecycles;
};
exports.runEffects = runEffects;
//# sourceMappingURL=effectbox.js.map