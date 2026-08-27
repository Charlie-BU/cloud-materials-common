import React from 'react';
import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
import type { Column } from '../../../../core';
type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];
export declare const SearchInput: React.FC<{
    column: Column;
    placeholder: string;
    dropdownOptions: ArcoFilterDropdownOptions;
}>;
export {};
