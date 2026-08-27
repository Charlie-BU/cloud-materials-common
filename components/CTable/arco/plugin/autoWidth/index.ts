import type { AutoWidth } from '../../../core';
import { getTextWidth } from '../../../utils';
import { getHeaderWidthInfo } from '../../utils';
import type { ColumnModel } from '../../types';

export const defaultAutoWidth: AutoWidth = {
  type: 'default',
  getCellWidth({ content }) {
    // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
    return getTextWidth(content) + 5;
  },
  getHeaderCellWidth({ column }) {
    const { leftWidth, rightWidth } = getHeaderWidthInfo(column as ColumnModel<any>);
    // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
    return leftWidth + getTextWidth(column.title) + rightWidth + 5;
  },
  maxWidth: 240,
  minWidth: 100,
  // 存储的场景下，padding 占 32px
  blankWidth: 32,
};
