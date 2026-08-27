import type { TableProps as ArcoTableProps } from '@arco-design/web-react';
import type { CConfigContextValue } from '../../CConfigProvider/interface';
import type { TableModel } from './types';
export declare const mapTableConfig: (table: TableModel<any>, ctx: CConfigContextValue) => ArcoTableProps<any>;
