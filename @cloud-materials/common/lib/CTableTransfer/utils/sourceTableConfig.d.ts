import React from 'react';
import type { TableConfig } from '../../CTable';
import type { CTableTransferItem, CTableTransferProps } from '../interface';
import type { CLocale } from '../../locales/default';
interface SourceTableProps {
    cTransferProps: CTableTransferProps;
    onSourceTableSelectRow: () => void;
    sourceTableChange: () => void;
    cachedSourceInitData: React.MutableRefObject<CTableTransferItem[]>;
    matchSelectedMax: (table: any) => {
        matched: boolean;
    };
    locale: CLocale;
}
/**
 * @description 左侧Table配置
 *
 * @param {{
 *   cTransferProps: CTableTransferProps<any>;
 *   onSourceTableSelectRow: () => void;
 * }} {
 *   cTransferProps,
 *   onSourceTableSelectRow,
 * }
 * @return {*}
 */
declare const SourceTable: ({ cTransferProps, onSourceTableSelectRow, sourceTableChange, cachedSourceInitData, matchSelectedMax, locale, }: SourceTableProps) => TableConfig<any, any>;
export default SourceTable;
