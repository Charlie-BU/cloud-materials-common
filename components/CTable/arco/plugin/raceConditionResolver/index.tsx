import { raceScheduler } from '@byted-c/storage.utils.safe-race';

interface IRequest {
  taskPriority?: TaskPriority;
  [key: string]: any;
}

type Fetcher<RequestParam extends Record<string, any>, Response extends Record<string, any>> = (
  params: RequestParam,
) => Promise<Response>;

export enum TaskPriority {
  // task等级：lowest lower low high higher highest，先给low high，后续有需求再支持其他优先级任务
  HIGH = 4,
  LOW = 3,
}

export class RaceConditionResolver<RequestParam extends Record<string, any>, Response extends Record<string, any>> {
  private fetcher!: Fetcher<RequestParam, Response>;
  private _safeSchedulerFetcher: {
    fetcherLow: Fetcher<RequestParam, Response>;
    fetcherHigh: Fetcher<RequestParam, Response>;
  };

  constructor() {
    this.wrapFetcher = this.wrapFetcher.bind(this);

    const memoFetcher: Fetcher<RequestParam, Response> = (...args) => this.fetcher?.(...args);
    this._safeSchedulerFetcher = raceScheduler(
      {
        fetcherLow: { asyncFn: memoFetcher, priority: TaskPriority.LOW },
        fetcherHigh: { asyncFn: memoFetcher, priority: TaskPriority.HIGH },
      },
      // 设置为抛错模式，否则轮询无法继续进行
      { discardedPromiseAction: 'throw-error' },
    );
  }

  setFetcher(fetcher: Fetcher<RequestParam, Response>) {
    // 刷新 fetcher
    this.fetcher = fetcher;
  }

  public wrapFetcher(args: IRequest): Promise<Response> {
    const { taskPriority = TaskPriority.HIGH, ...restArgs } = args;
    if (taskPriority === TaskPriority.HIGH) {
      // 执行高优任务
      // 当执行高优任务时，低优任务将被丢弃
      return this._safeSchedulerFetcher.fetcherHigh(restArgs as RequestParam);
    }

    // 执行低优任务
    // 如果此时有高优任务 pending，该任务将直接被丢弃
    return this._safeSchedulerFetcher.fetcherLow(restArgs as RequestParam);
  }
}
