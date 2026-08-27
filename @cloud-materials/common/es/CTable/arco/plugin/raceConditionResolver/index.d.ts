interface IRequest {
    taskPriority?: TaskPriority;
    [key: string]: any;
}
type Fetcher<RequestParam extends Record<string, any>, Response extends Record<string, any>> = (params: RequestParam) => Promise<Response>;
export declare enum TaskPriority {
    HIGH = 4,
    LOW = 3
}
export declare class RaceConditionResolver<RequestParam extends Record<string, any>, Response extends Record<string, any>> {
    private fetcher;
    private _safeSchedulerFetcher;
    constructor();
    setFetcher(fetcher: Fetcher<RequestParam, Response>): void;
    wrapFetcher(args: IRequest): Promise<Response>;
}
export {};
