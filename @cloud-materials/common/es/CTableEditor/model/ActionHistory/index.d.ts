import type { Action } from '../Action';
export declare class ActionHistory {
    history: Action[];
    constructor();
    push(action: Action): void;
    pop(): Action | undefined;
    clear(): void;
    get count(): number;
}
