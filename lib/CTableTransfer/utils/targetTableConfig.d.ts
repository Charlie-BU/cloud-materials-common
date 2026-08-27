import type { TableConfig } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import type { CLocale } from '../../locales/default';
interface TargetTableProps {
    cTransferProps: CTableTransferProps;
    onTargetTableSelectRow: () => void;
    onClear: () => void;
    locale: CLocale;
}
/**
 * @description 右侧Table配置
 *
 * @param {TargetTableProps} { cTransferProps, onTargetTableSelectRow, onClear }
 * @return {*}
 */
declare const TargetTable: ({ cTransferProps, onTargetTableSelectRow, onClear, locale }: TargetTableProps) => TableConfig<any, any>;
export default TargetTable;
