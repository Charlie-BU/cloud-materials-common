import React, { useEffect, useRef } from 'react';
import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
import { Input } from '@arco-design/web-react';
import type { Column } from '../../../../core';
import { useTable, usePrefix } from '../../../../react';
import type { TableConfig } from '../../../types';

const { Search } = Input;

type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];

export const SearchInput: React.FC<{
  column: Column;
  placeholder: string;
  dropdownOptions: ArcoFilterDropdownOptions;
}> = ({ column, placeholder, dropdownOptions }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const table = useTable();
  const prefixCls = usePrefix('comp-filter-search');
  // 2023-05-09 修改
  // 问题：在 useEffect 中调用 inputElement.focus() 会导致页面滚动到顶部，原因暂时未知
  // 参考 arco 的做法，用 setTimeout 包裹下，并把延时设为 0ms
  // arco demo 链接: https://arco.bytedance.net/react/components/table#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AD%9B%E9%80%89%E8%8F%9C%E5%8D%95
  useEffect(() => {
    const timer = setTimeout(() => {
      const inputElement = inputRef.current;
      if (column.filterVisible && inputElement) {
        inputElement.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [column.filterVisible]);

  const tableConfig = table.config as TableConfig<any>;
  // 为了兼容老配置
  const isPolling = tableConfig.polling || tableConfig.extraConfig?.isPolling;

  return (
    <div className={prefixCls}>
      <Search
        ref={inputRef as any}
        searchButton
        allowClear={true}
        placeholder={placeholder}
        // 轮询模式下取消受控
        {...(isPolling ? {} : { value: dropdownOptions?.filterKeys?.[0] || '' })}
        onChange={value => {
          dropdownOptions?.setFilterKeys?.(value ? [value] : []);
        }}
        onSearch={() => {
          dropdownOptions?.confirm?.();
        }}
      />
    </div>
  );
};
