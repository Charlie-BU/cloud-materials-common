import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

/**
 * @zh 内置颜色
 */
export const COLORS = ['blue', 'green', 'pink', 'darkblue', 'aquamarine', 'brown', 'gray'] as const;

/**
 * @zh Arco 内置颜色
 */
export const ARCO_COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
] as const;

/**
 * @zh 内置渐变色
 */
export const LINEAR_COLORS = ['linearRed', 'linearOrangered', 'linearGold'] as const;

/**
 * @zh Tag 颜色填充方式
 */
export const TYPES = ['default', 'bordered', 'outline', 'text-dot', 'text'] as const;

/**
 * @zh Tag 默认最大宽度，溢出省略
 */
export const MAX_WIDTH = 160;

/**
 * @zh 默认复制分割符
 */
export const SEPARATOR = '\n';

const tagCssPrefix = classNamePrefixFactory('tag');
export const TEST_ID = {
  prefixTag: tagCssPrefix`prefix`,
  tag: tagCssPrefix``,
};
