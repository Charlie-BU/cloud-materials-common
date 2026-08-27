import { __read, __spreadArray } from "tslib";
import { isFn, isValid } from '../../shared';
import { isTable } from './checkers';
var GlobalState = {
    initializing: false,
    lifecycles: [],
    context: [],
    effectStart: false,
    effectEnd: false,
};
export var createEffectHook = function (type, callback) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (GlobalState.effectStart) {
            GlobalState.lifecycles.push({
                type: type,
                callback: function (ctx, payload) {
                    if (isFn(callback)) {
                        callback.apply(void 0, __spreadArray([ctx, payload], __read(GlobalState.context), false)).apply(void 0, __spreadArray([], __read(args), false));
                    }
                },
            });
        }
        else {
            throw new Error('Effect hooks cannot be used in asynchronous function body');
        }
    };
};
export var createEffectContext = function (defaultValue) {
    var index;
    return {
        provide: function (value) {
            if (GlobalState.effectStart) {
                index = GlobalState.context.length;
                GlobalState.context[index] = isValid(value) ? value : defaultValue;
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
var TableEffectContext = createEffectContext();
export var useEffectTable = TableEffectContext.consume;
export var runEffects = function (context) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    GlobalState.lifecycles = [];
    GlobalState.context = [];
    GlobalState.effectStart = true;
    GlobalState.effectEnd = false;
    if (isTable(context)) {
        TableEffectContext.provide(context);
    }
    args.forEach(function (effects) {
        if (isFn(effects)) {
            effects({ table: context });
        }
    });
    GlobalState.context = [];
    GlobalState.effectStart = false;
    GlobalState.effectEnd = true;
    return GlobalState.lifecycles;
};
//# sourceMappingURL=effectbox.js.map