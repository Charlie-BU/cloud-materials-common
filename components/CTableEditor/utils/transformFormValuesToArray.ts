import { cloneDeep } from 'lodash-es';
import { ROW_KEY } from '../constants';
import type { R, WithRowKey } from '../types';

export const transformFormValuesToArray = <DataItemType extends R, ValueType extends R>(
  values: ValueType,
  tableData: (DataItemType & WithRowKey)[],
): (DataItemType & WithRowKey & ValueType)[] => {
  const t = tableData?.map(v => {
    return {
      ...v,
      ...values[v[ROW_KEY]],
    };
  });

  // cloneDeep 的原因: Table 和 Form 都会对数据建立响应式
  // 如果使用同一个对象，建立两次响应式时，第二次会失效。因为 formily/reactive 的响应式是基于对象引用来做记录的
  return cloneDeep(t);
};
