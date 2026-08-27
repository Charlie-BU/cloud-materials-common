import { useRequest } from 'ahooks';
import { useRef } from 'react';
import { TaskPriority } from '../plugin/raceConditionResolver';
import type { TableModel } from '../types';

export const usePolling = (options: { table: TableModel<any> }) => {
  const { table } = options;
  const polling = table.config.polling;

  // 连续请求失败的次数
  const errorCountRef = useRef(0);

  // 没有传 polling 或 fetcher 都不能进行轮询
  const isInvalid = !polling || !table.config.fetcher;

  // 主动声明了 startPoolingAfterInitData，手动开始轮训
  const manual = polling?.options.startPoolingAfterInitData
    ? polling?.options.startPoolingAfterInitData
    : polling?.options.manual;

  const { run, cancel } = useRequest(
    () => {
      // 因为 hooks 不能写在条件语句中，所以这样处理。如果没有传 polling，useRequest 会执行一次就结束，不会实际发请求
      if (!polling) return Promise.resolve();
      // 配轮询必须配 fetcher，所以这里为了逻辑的完备性，加了这个判断
      // 1. 因为这个函数必须返回 Promise，所以返回了 Promise.reject
      // 2. useRequest 会捕获这里的错误，并在控制台用 console.error 打印
      if (!table.config.fetcher) return Promise.reject('CTable polling error: no fetcher');
      return new Promise((resolve, reject) => {
        table
          .refresh({
            showLoading: polling.options.showLoading,
            resetSelectedRows: polling.options.resetSelectedRows,
            // refresh触发来源
            taskPriority: TaskPriority.LOW,
            isPooling: true,
          })
          ?.then(res => {
            // table 的 fetchData 返回的 promise 没有 reject error，所以通过 table.status.error 判断
            // 暂时不改造 fetchData，避免对存量用法造成影响
            if (table.status.error) {
              reject(table.status.error);
              errorCountRef.current += 1;
            } else {
              errorCountRef.current = 0;
              resolve(res);
            }
          })
          // table.refresh 返回的 Promise 的结果没有 rejected，所以不需要写 catch 的逻辑
          // 下面的逻辑写在 finally 里是为了更清晰的语义，意思是请求结束后做的事儿
          .finally(() => {
            if (!polling.options.errorCountBeforeStoppingPolling) return;
            if (errorCountRef.current >= polling.options.errorCountBeforeStoppingPolling) {
              cancel();
            }
          });
      });
    },
    {
      pollingInterval: polling?.options?.pollingInterval,
      // 没有传 polling 或没有配 fetcher 则设为 true，一次都不会请求
      manual: isInvalid ? true : manual,
      // 隐藏时不轮询
      pollingWhenHidden: false,
    },
  );

  // useRequest 会在组件卸载时自动调用 cancel，所以这里不用手动调用 cancel

  if (polling) {
    polling.start = () => {
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
