import type { R, WithRowKey } from '../types';
export declare const transformFormValuesToArray: <DataItemType extends R, ValueType extends R>(values: ValueType, tableData: (DataItemType & WithRowKey)[]) => (DataItemType & WithRowKey & ValueType)[];
