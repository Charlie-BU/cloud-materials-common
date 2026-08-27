import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
import type { Filter } from '../../../core';
type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];
export declare const select: Filter;
export declare const range: Filter;
export declare const searchInput: Filter<{
    placeholder: string;
    dropdownOptions: ArcoFilterDropdownOptions;
}>;
export {};
