export type ActionOptions = {
    /** 创建 Action 后立即执行 */
    immediately?: boolean;
    /** 执行操作*/
    execute?: (...args: any[]) => void;
    /** 撤销操作 */
    undo?: (...args: any[]) => void;
};
export declare class Action {
    options: ActionOptions;
    constructor(options: ActionOptions);
    execute(...args: any[]): void;
    undo(...args: any[]): void;
}
