import type { OperationList, Operation, ExtraOperation } from './interface';
/**
 * 删除不可见的 operation
 * @param operation
 */
export declare const removeInvisibleOperation: (operation: Operation, index: string, parentKey?: string) => ExtraOperation | undefined;
/**
 *
 * 对操作进行分组
 * 并过滤掉 visible 是 false 的操作
 * 例如：[1,2,3,[4],5,[6,7,8], 9] => [[1,2,3], [4], [5], [6,7,8], [9]]
 * @param operation
 */
export declare function groupOperation(operation?: OperationList): ExtraOperation[][];
/**
 * 从二维数组中取出前n个保持后面的结构不变
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [[3],[4,5]]
 * @param operation
 * @param displayNum
 */
export declare function splitOperation(operation: ExtraOperation[][], displayNum: number): [ExtraOperation[], ExtraOperation[][]];
/**
 * 从二维数据中拆出外露的操作，和收入在 dropdown 的操作
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [1, 2], [[3],[4,5]]
 */
export declare function getDisplayOperation(operations: OperationList | undefined, displayNum: number): {
    outsideOperation: ExtraOperation[];
    menuOperation: ExtraOperation[][];
};
export declare function makeKey(index: string, str?: string): string;
/**
 * 最大展示数下，显示的分组分割线的数量
 * @param menuOperations
 * @param maxMenuOperationNum
 */
export declare function getGroupNumInMaxNum(menuOperations: ExtraOperation[][], maxMenuOperationNum: number): number;
