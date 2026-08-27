"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHistory = void 0;
var reactive_1 = require("@formily/reactive");
var ActionHistory = /** @class */ (function () {
    function ActionHistory() {
        this.history = [];
        // 将 ActionHistory 的属性变为响应式，这样 TableEditor 中的 hasActionHistory 属性才能变为响应式
        (0, reactive_1.define)(this, {
            history: reactive_1.observable,
            count: reactive_1.observable.computed,
            push: reactive_1.action,
            pop: reactive_1.action,
            clear: reactive_1.action,
        });
    }
    ActionHistory.prototype.push = function (action) {
        this.history.push(action);
    };
    ActionHistory.prototype.pop = function () {
        return this.history.pop();
    };
    ActionHistory.prototype.clear = function () {
        this.history = [];
    };
    Object.defineProperty(ActionHistory.prototype, "count", {
        get: function () {
            return this.history.length;
        },
        enumerable: false,
        configurable: true
    });
    return ActionHistory;
}());
exports.ActionHistory = ActionHistory;
//# sourceMappingURL=index.js.map