import type { CFormAsyncSelectConfigOption, CFormAsyncSelectOption } from './interface';
export declare const cformAsyncSelectTestId: {
    container: string;
    filter: string;
};
/** 转换 CFormAsyncSelectOption -> CFormAsyncSelectConfigOption */
export declare const transCFormAsyncSelectOption: (option: CFormAsyncSelectOption) => CFormAsyncSelectConfigOption;
/** 转换 CFormAsyncSelectOption[] -> CFormAsyncSelectConfigOption[] */
export declare const transCFormAsyncSelectOptions: (options: CFormAsyncSelectOption[]) => CFormAsyncSelectConfigOption[];
