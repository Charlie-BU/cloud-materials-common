export declare const helper: {
    getUrlQuery: (parseOptions?: import("qs").IParseOptions | undefined) => {
        [x: string]: any;
    };
    setUrlQuery: (params: {
        [x: string]: any;
    }, options?: {
        merge?: boolean | undefined;
        stringifyOptions?: import("qs").IStringifyOptions | undefined;
        method?: "pushState" | "replaceState" | undefined;
        newState?: {
            [x: string]: any;
        } | ((oldState: {
            [x: string]: any;
        }) => {
            [x: string]: any;
        }) | undefined;
        genNewUrl?: ((newUrl: string, newParams: {
            [x: string]: any;
        }, newQuery: string) => string) | undefined;
    } | undefined) => {
        url: string;
        newParams: {
            [x: string]: any;
        };
        newQuery: string;
        state: any;
    };
};
