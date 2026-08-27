interface BaseError {
    componentName: string;
    extra?: any;
}
export interface ErrorLog extends BaseError {
    type: 'error';
    error: Error;
    message?: string;
}
export interface InfoLog extends BaseError {
    type: 'info';
    message: string;
}
export interface WarnLog extends BaseError {
    type: 'warn';
    message: string;
}
export type LogType = ErrorLog | InfoLog | WarnLog;
export type LoggerType<T extends LogType['type']> = (args: Omit<Extract<LogType, {
    type: T;
}>, 'type' | 'componentName'>) => void;
export type LoggerInstance = {
    [K in LogType['type']]: LoggerType<K>;
};
export type LoggerFactory = (componentName: string) => LoggerInstance;
export type OnLog = (arg: LogType) => void;
export declare const createLogger: (onLog: OnLog) => LoggerFactory;
export {};
