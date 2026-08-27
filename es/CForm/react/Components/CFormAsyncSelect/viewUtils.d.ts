import type { SelectProps } from '@arco-design/web-react';
import type { CFormAsyncSelectConfigOption, CFormAsyncSelectProps } from './interface';
import type { CLocale } from '../../../../locales/default';
export declare const renderOptions: ({ dataSource, cssPrefix, optionMode, locale, getPopupContainer, }: {
    optionMode: CFormAsyncSelectProps['optionMode'];
    cssPrefix: string;
    locale: CLocale;
    dataSource?: CFormAsyncSelectConfigOption[] | undefined;
    getPopupContainer?: SelectProps['getPopupContainer'];
}) => SelectProps['options'];
