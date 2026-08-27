import type { ReactNode } from 'react';
export declare const TableFontSize: {
    CN: string;
    US: string;
};
/**
 * @description 支持bytePlus环境下英文大小为14px
 * @param fontSize String
 */
export declare const setGlobalFontSize: (fontSize: string) => void;
export declare function filterDataKey(str: string | number): string;
export declare const getTextWidth: (text?: string, font?: string) => number;
/** 判断值是否是空值，比如在表单判断一个Input是否有输入*/
export declare function isEmptyValue(value: any): boolean;
export declare const isEmpty: (value: any) => boolean;
/** 对空值做些文本的兜底显示 */
export declare function fallbackText(value: ReactNode): ReactNode;
/** 加载脚本 */
export declare function loadScript(url: string, cb: () => void): void;
/** 尝试把字符串转成数字， 如果失败就返回原字符串 */
export declare function tryToNumber(numberString: string | number): string | number;
