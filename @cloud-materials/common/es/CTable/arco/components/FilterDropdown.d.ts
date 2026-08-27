import React from 'react';
import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];
export declare const FilterDropdown: React.FC<{
    dataIndex: string;
    dropdownOptions: ArcoFilterDropdownOptions;
}>;
export {};
