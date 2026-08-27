import { useRequest } from 'ahooks';
import { useRef } from 'react';
import { TaskPriority } from '../plugin/raceConditionResolver';
export var usePolling = function (options) {
    var _a;
    var table = options.table;
    var polling = table.config.polling;
    // 连续请求失败的次数
    var errorCountRef = useRef(0);
    // 没有传 polling 或 fetcher 都不能进行轮询
    var isInvalid = !polling || !table.config.fetcher;
    // 主动声明了 startPoolingAfterInitData，手动开始轮训
    var manual = (polling === null || polling === void 0 ? void 0 : polling.options.startPoolingAfterInitData)
        ? polling === null || polling === void 0 ? void 0 : polling.options.startPoolingAfterInitData
        : polling === null || polling === void 0 ? void 0 : polling.options.manual;
    var _b = useRequest(function () {
        // 因为 hooks 不能写在条件语句中，所以这样处理。如果没有传 polling，useRequest 会执行一次就结束，不会实际发请求
        if (!polling)
            return Promise.resolve();
        // 配轮询必须配 fetcher，所以这里为了逻辑的完备性，加了这个判断
        // 1. 因为这个函数必须返回 Promise，所以返回了 Promise.reject
        // 2. useRequest 会捕获这里的错误，并在控制台用 console.error 打印
        if (!table.config.fetcher)
            return Promise.reject('CTable polling error: no fetcher');
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = table
                .refresh({
                showLoading: polling.options.showLoading,
                resetSelectedRows: polling.options.resetSelectedRows,
                // refresh触发来源
                taskPriority: TaskPriority.LOW,
                isPooling: true,
            })) === null || _a === void 0 ? void 0 : _a.then(function (res) {
                // table 的 fetchData 返回的 promise 没有 reject error，所以通过 table.status.error 判断
                // 暂时不改造 fetchData，避免对存量用法造成影响
                if (table.status.error) {
                    reject(table.status.error);
                    errorCountRef.current += 1;
                }
                else {
                    errorCountRef.current = 0;
                    resolve(res);
                }
            }).finally(function () {
                if (!polling.options.errorCountBeforeStoppingPolling)
                    return;
                if (errorCountRef.current >= polling.options.errorCountBeforeStoppingPolling) {
                    cancel();
                }
            });
        });
    }, {
        pollingInterval: (_a = polling === null || polling === void 0 ? void 0 : polling.options) === null || _a === void 0 ? void 0 : _a.pollingInterval,
        // 没有传 polling 或没有配 fetcher 则设为 true，一次都不会请求
        manual: isInvalid ? true : manual,
        // 隐藏时不轮询
        pollingWhenHidden: false,
    }), run = _b.run, cancel = _b.cancel;
    // useRequest 会在组件卸载时自动调用 cancel，所以这里不用手动调用 cancel
    if (polling) {
        polling.start = function () {
            if (!table.config.fetcher) {
                console.error('CTable polling error: no fetcher');
                return;
            }
            // 手动开启轮询时，重置 errorCount
            errorCountRef.current = 0;
            run();
        };
        polling.stop = cancel;
    }
    return polling;
};
//# sourceMappingURL=usePolling.js.map