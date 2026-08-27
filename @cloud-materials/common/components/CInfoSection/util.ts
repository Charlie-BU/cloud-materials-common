import type { ReactNode } from 'react';
import type { CInfoSectionProps, ItemProps, CInfoSectionData, CInfoSectionListProps } from './interface';
import { isArray, isBoolean, isEmpty, isNil, isNumber, isString, isSymbol, chunk, sum } from 'lodash-es';

export const conversion = (baseArray: unknown, col: number, direction: CInfoSectionProps['direction']) => {
  if (!Array.isArray(baseArray) || baseArray.length === 0) {
    return [] as CInfoSectionData[][];
  }

  if (direction === 'column') {
    const len = baseArray.length;
    const lineNum = Math.ceil(len / col);
    return chunk(baseArray, lineNum);
  } else {
    const rows: (ReactNode | ItemProps)[][] = [];
    let rowIndex = 0;
    baseArray.forEach(item => {
      if (rows[rowIndex] === undefined) {
        rows[rowIndex] = []; // 当前行没有元素，给 空字符串
      }

      rows[rowIndex].push(item); // push元素
      const rowSpan = sum(rows[rowIndex].map((v: any) => v?.span || v?.props?.span || 1)); // 计算当前行总的 span

      if (rowSpan >= col) {
        // 加起来大于等于 col 就换行
        rowIndex += 1;
      }
    });

    return rows;
  }
};

export const calcSpan = (props: {
  arr: (ReactNode | ItemProps)[];
  key: number;
  infoItem: ReactNode | ItemProps;
  colNumber: number;
}) => {
  const { infoItem, colNumber } = props;
  const span = (infoItem as any)?.span || (infoItem as any)?.props?.span || 1;
  const colSpan = (span / colNumber) * 24;

  return colSpan;
};

/**
 * 格式化数据
 * @param props
 * @returns
 */
export const formatListData = (props: {
  listData?: CInfoSectionListProps['listData'];
  colNumber?: number;
  direction?: CInfoSectionProps['direction'];
}) => {
  const { listData = [], direction = 'row', colNumber = 2 } = props;
  listData.forEach(infoSection => {
    // 历史逻辑：自己传入已分隔的数据，直接返回；为什么多个数据源字段。。
    if (infoSection.splitItemList) {
      return;
    }

    const _colNumber = (infoSection.colNumber || colNumber) as number;
    const filterItemList = infoSection.infoItemList?.filter(v => !v.hidden);

    infoSection.splitItemList = conversion(filterItemList, _colNumber, direction);
  });

  return listData;
};

export const filterChildrenType = (children: any) => {
  return (
    isNil(children) ||
    isBoolean(children) ||
    isString(children) ||
    isArray(children) ||
    isSymbol(children) ||
    isNumber(children) ||
    isEmpty(children)
  );
};

/**
 * 格式化 CInfoSection 的 children
 */
export const formatSectionChildren = (opts: {
  children: Array<ReactNode> | ReactNode;
  colNumber?: number;
  direction?: CInfoSectionProps['direction'];
}) => {
  let children = opts.children;

  if (isNil(children)) {
    return [];
  }

  if (!isArray(children) && typeof children === 'object') {
    children = [children];
  }

  if (isArray(children)) {
    children = children?.filter?.(ele => !filterChildrenType(ele));
  }

  const filterChildren = (children as [])?.filter((v: any) => !v?.props?.hidden);
  const res = conversion(filterChildren, opts.colNumber || 2, opts.direction);

  return res;
};
