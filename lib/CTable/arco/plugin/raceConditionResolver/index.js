"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceConditionResolver = exports.TaskPriority = void 0;
var tslib_1 = require("tslib");
var storage_utils_safe_race_1 = require("@byted-c/storage.utils.safe-race");
var TaskPriority;
(function (TaskPriority) {
    // task等级：lowest lower low high higher highest，先给low high，后续有需求再支持其他优先级任务
    TaskPriority[TaskPriority["HIGH"] = 4] = "HIGH";
    TaskPriority[TaskPriority["LOW"] = 3] = "LOW";
})(TaskPriority = exports.TaskPriority || (exports.TaskPriority = {}));
var RaceConditionResolver = /** @class */ (function () {
    function RaceConditionResolver() {
        var _this = this;
        this.wrapFetcher = this.wrapFetcher.bind(this);
        var memoFetcher = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (_a = _this.fetcher) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([_this], tslib_1.__read(args), false));
        };
        this._safeSchedulerFetcher = (0, storage_utils_safe_race_1.raceScheduler)({
            fetcherLow: { asyncFn: memoFetcher, priority: TaskPriority.LOW },
            fetcherHigh: { asyncFn: memoFetcher, priority: TaskPriority.HIGH },
        }, 
        // 设置为抛错模式，否则轮询无法继续进行
        { discardedPromiseAction: 'throw-error' });
    }
    RaceConditionResolver.prototype.setFetcher = function (fetcher) {
        // 刷新 fetcher
        this.fetcher = fetcher;
    };
    RaceConditionResolver.prototype.wrapFetcher = function (args) {
        var _a = args.taskPriority, taskPriority = _a === void 0 ? TaskPriority.HIGH : _a, restArgs = tslib_1.__rest(args, ["taskPriority"]);
        if (taskPriority === TaskPriority.HIGH) {
            // 执行高优任务
            // 当执行高优任务时，低优任务将被丢弃
            return this._safeSchedulerFetcher.fetcherHigh(restArgs);
        }
        // 执行低优任务
        // 如果此时有高优任务 pending，该任务将直接被丢弃
        return this._safeSchedulerFetcher.fetcherLow(restArgs);
    };
    return RaceConditionResolver;
}());
exports.RaceConditionResolver = RaceConditionResolver;
//# sourceMappingURL=index.js.map