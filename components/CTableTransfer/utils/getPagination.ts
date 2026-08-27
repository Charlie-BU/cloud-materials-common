import type { PaginationProps } from '@arco-design/web-react';
import { isBoolean, isPlainObject } from 'lodash-es';
import type { TableConfig } from '../../CTable';
import type { CTableTransferProps } from '../interface';

const defaultConfig: PaginationProps = {
  size: 'mini',
  simple: true,
  sizeCanChange: false,
  showTotal: false,
};

const basePagination = (CTableProps: TableConfig<any>): PaginationProps | false => {
  const { pagination } = CTableProps || {};
  if (isBoolean(pagination) && pagination) {
    return {
      ...defaultConfig,
    };
  }
  if (isPlainObject(pagination)) {
    return {
      ...pagination,
    };
  }
  return false;
};

export const getPagination = (props: CTableTransferProps): (PaginationProps | false)[] => {
  const { CTableProps } = props;
  if (!CTableProps) {
    return [false, false];
  }
  const [sourceCTableProps, targetCTableProps = {}] = CTableProps;
  return [basePagination(sourceCTableProps), basePagination(targetCTableProps)];
};
