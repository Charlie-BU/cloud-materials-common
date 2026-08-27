import { ROW_KEY } from '../constants';

// 自增 rowKey 唯一标识
let rowKeyUniqId = 0;

// 给 数据加 rowKey，如果存在则跳过
export const addRowKey = <T extends Record<string, any>>(data: T) => {
  return {
    ...data,
    [ROW_KEY]: data[ROW_KEY] || `${rowKeyUniqId++}_${Date.now()}`,
  };
};

// 给 array 数据加 rowKey，如果存在则跳过
export const addRowKeyToArray = <T extends Record<string, any>>(data: T[]) => {
  return data.map(d => {
    return {
      ...d,
      [ROW_KEY]: d[ROW_KEY] || `${rowKeyUniqId++}_${Date.now()}`,
    };
  });
};
