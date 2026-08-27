export declare const addRowKey: <T extends Record<string, any>>(data: T) => T & {
    __ROW_KEY: any;
};
export declare const addRowKeyToArray: <T extends Record<string, any>>(data: T[]) => (T & {
    __ROW_KEY: any;
})[];
