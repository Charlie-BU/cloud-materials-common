import { define, observable, action } from '@formily/reactive';
var ActionHistory = /** @class */ (function () {
    function ActionHistory() {
        this.history = [];
        // 将 ActionHistory 的属性变为响应式，这样 TableEditor 中的 hasActionHistory 属性才能变为响应式
        define(this, {
            history: observable,
            count: observable.computed,
            push: action,
            pop: action,
            clear: action,
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
export { ActionHistory };
//# sourceMappingURL=index.js.map