/// <reference types="react" />
import type { InputValueChangeReason } from '@arco-design/web-react/es/Select/interface';
import type { CAsyncSelectHooksProps, DataSource, Option } from '../interface';
export declare const useCAsyncSelect: (props: CAsyncSelectHooksProps) => readonly [{
    data: DataSource | undefined;
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
    autoLoadFirstValue: Option | Option[] | undefined;
    cacheDataRef: import("react").MutableRefObject<boolean>;
}, {
    onSearch: import("lodash-es").DebouncedFunc<(value: string, reason: InputValueChangeReason) => void>;
    clearSearchWord: () => void;
    clearAutoLoadFirstValue: () => void;
    reload: () => void;
    loadMore: () => void;
    popupScrollHandler: import("lodash-es").DebouncedFunc<(element: Element) => void>;
    handleFocusCacheData: () => void;
    loadMoreAsync: () => Promise<DataSource>;
    reloadAsync: () => Promise<DataSource>;
    mutate: import("react").Dispatch<import("react").SetStateAction<DataSource | undefined>>;
    cancel: () => void;
    setAutoLoadFirstFlag: import("react").Dispatch<import("react").SetStateAction<boolean>>;
}];
