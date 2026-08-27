"use strict";
/*
 * @Author: youjingyu
 * @Date: 2021-10-06 16:21:11
 * @LastEditTime: 2021-10-06 16:48:09
 * @LastEditors: youjingyu
 * @Description:
 */
// fork from https://github.com/developit/mitt
Object.defineProperty(exports, "__esModule", { value: true });
exports.mitt = void 0;
var tslib_1 = require("tslib");
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * modify from mitt https://www.npmjs.com/package/mitt
 * support multiple event arguments callback
 *
 * @name mitt
 * @returns {Mitt}
 */
function mitt(_all) {
    var all = _all || new Map();
    return {
        /**
         * A Map of event names to registered handler functions.
         */
        all: all,
        /**
         * Register an event handler for the given type.
         * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
         * @param {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on: function (type, handler) {
            var handlers = all.get(type);
            var added = handlers && handlers.push(handler);
            if (!added) {
                all.set(type, [handler]);
            }
        },
        /**
         * Remove an event handler for the given type.
         * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
         * @param {Function} handler Handler function to remove
         * @memberOf mitt
         */
        off: function (type, handler) {
            var handlers = all.get(type);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        /**
         * Invoke all handlers for the given type.
         * If present, `"*"` handlers are invoked after type-matched handlers.
         *
         * Note: Manually firing "*" handlers is not supported.
         *
         * @param {string|symbol} type The event type to invoke
         * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit: function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (all.get(type) || []).slice().map(function (handler) {
                handler.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
            });
            (all.get('*') || []).slice().map(function (handler) {
                handler.apply(void 0, tslib_1.__spreadArray([type], tslib_1.__read(args), false));
            });
        },
    };
}
exports.mitt = mitt;
//# sourceMappingURL=mitt.js.map