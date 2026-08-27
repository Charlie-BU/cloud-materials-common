import type { LogDataItem, CLogProps } from './interface';
export declare const useCLog: (props: CLogProps, listRef: any) => readonly [{
    listProps: Partial<Pick<import("@arco-design/web-react").ListProps<any>, "dataSource" | "virtualListProps" | "offsetBottom" | "throttleDelay" | "scrollLoading" | "onReachBottom" | "onListScroll">>;
    topDisabled: boolean;
    bottomDisabled: boolean;
    showButton: boolean | null | undefined;
    loading: boolean | undefined;
    serialWidth: number;
    isFullScreen: boolean;
    theme: "black" | "white";
    keyWord: string;
    logData: LogDataItem[] | undefined;
    noMoreData: boolean;
    hasLoadMoreFn: true | ((currentPage: number) => void) | undefined;
    keepLatest: boolean;
}, {
    onThemeChange: () => void;
    onFullScreenChange: () => void;
    onSearch: (val: string) => void;
    onDownload: () => void;
}];
