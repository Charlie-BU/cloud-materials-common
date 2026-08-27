/**
 *
 * @returns 从url中获取tabKey查询字段
 */
export declare const getUrlTabKey: (keyName?: string) => string;
export declare const changeUrlTabKey: (options: {
    tabKey: string;
    tabKeyName?: string | undefined;
    replaceHistory?: boolean | undefined;
}) => void;
