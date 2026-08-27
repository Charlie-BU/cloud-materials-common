import React from 'react';
import type { CArrayBaseAddition } from '../ArrayBaseAddition';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import { usePagination } from '@storage-fe/formily-arco/es/ArrayTable';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import ArrayBaseAddition from '../ArrayBaseAddition';

const cssPrefix = classNamePrefixFactory('cform-array-table-addition');

const ArrayTableAddition: React.FC<CArrayBaseAddition> = props => {
  const { totalPage = 0, pageSize = 10, changePage, currentPage = 1 } = usePagination();
  const array = ArrayBase.useArray!();
  return (
    <div className={cssPrefix``}>
      <ArrayBaseAddition
        defaultValue={{}}
        {...props}
        onClick={() => {
          // 如果添加数据后将超过当前页，则自动切换到添加页
          const total = array?.field?.value?.length || 0;
          if (total > currentPage * pageSize && typeof changePage === 'function') {
            if (total === totalPage * pageSize + 1) {
              changePage(totalPage + 1);
            } else {
              changePage(totalPage);
            }
          }
          props?.onClick?.();
        }}
      />
    </div>
  );
};

ArrayTableAddition.displayName = 'ArrayTableAddition';

export default ArrayTableAddition;
