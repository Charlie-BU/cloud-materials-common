import type { TableConfig } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import type { CLocale } from '../../locales/default';
/**
 *  @description table基本配置
 * @param {CTableTransferProps<any>} cTransferProps
 * @return {*}  {TableConfig<any>}
 */
export declare const getTableBaseConfig: (cTransferProps: CTableTransferProps, locale: CLocale) => TableConfig<any>;
