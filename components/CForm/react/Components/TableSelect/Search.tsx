import React from 'react';
import { tableSelectTestId } from '.';
import Radio from '../../../../CRadio';
import CSearch from '../../../../CSearch';
import type { TableSelectFilterProps } from './interface';

const CRadio = Radio.Group;

export const FilterSearch = CSearch.CSimpleSearch.register({ CRadio });

const TableSelectFilter = (props: TableSelectFilterProps) => {
  const { component, componentProps, ...restProps } = props;

  return (
    <FilterSearch
      content={
        {
          component,
          componentProps,
        } as any // 增强了类型，安全跳过
      }
      date-cy={tableSelectTestId.filter}
      debounceOptions={null}
      {...restProps}
    />
  );
};

TableSelectFilter.displayName = 'TableSelectFilter';

export default TableSelectFilter;
