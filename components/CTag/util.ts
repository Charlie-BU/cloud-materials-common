import type { CSSProperties } from 'react';
import { transformOpacity } from '../_utils/color';
import { ARCO_COLORS, COLORS, LINEAR_COLORS, TYPES } from './constant';
import type { CTagProps } from './interface';

/**
 * @description 根据 color 及 type 获取 Tag 样式
 */
export function getTagStyle(
  color: CTagProps['color'],
  type: CTagProps['type'],
  shape: NonNullable<CTagProps['shape']>,
): CSSProperties | undefined {
  if (!color || !type || !TYPES.includes(type)) {
    return;
  }
  const linearStyle = getLinearStyle(color, type, shape);
  const commonStyle = getCommonStyle(color, type);

  // Arco 内置颜色重写样式
  if (isArcoColor(color)) {
    const arcoStyle = (
      {
        bordered: {
          borderColor: `var(--tag-arco-color-${color}-20-pct)`,
        },
        outline: {
          backgroundColor: 'var(--tag-color-transparent)',
          borderColor: `var(--tag-arco-color-${color}-20-pct)`,
        },
      } as Record<Required<CTagProps>['type'], CSSProperties>
    )[type];
    return { ...commonStyle, ...arcoStyle };
  }

  // 内置颜色
  if (isCustomColor(color)) {
    const customStyle = (
      {
        bordered: {
          backgroundColor: `rgba(var(--tag-color-${color}), 0.2)`,
          borderColor: `rgba(var(--tag-color-${color}), 0.2)`,
        },
        outline: {
          borderColor: `rgba(var(--tag-color-${color}), 0.2)`,
        },
      } as Record<Required<CTagProps>['type'], CSSProperties>
    )[type];
    return { ...commonStyle, ...customStyle };
  }

  return { ...commonStyle, ...linearStyle };
}

/**
 * @description 转换为 kebab case
 */
export function toKebabCase(originalString: string) {
  return originalString
    ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('-');
}

/**
 * @description 获取公共样式
 */
export function getCommonStyle(color: NonNullable<CTagProps['color']>, type: NonNullable<CTagProps['color']>) {
  const themeColor = getThemeColor(color);

  if (isLinearColor(color as any)) {
    return;
  }

  switch (type) {
    case 'default':
      return {
        backgroundColor: themeColor,
        color: 'var(--tag-color-white)',
      };
    case 'bordered':
      return {
        backgroundColor: transformOpacity(themeColor),
        border: 'var(--tag-border)',
        borderColor: transformOpacity(themeColor),
        color: themeColor,
      };
    case 'outline':
      return {
        border: 'var(--tag-border)',
        borderColor: transformOpacity(themeColor),
        color: themeColor,
      };
    case 'text':
    case 'text-dot':
      return {
        backgroundColor: 'var(--tag-color-transparent)',
        border: 'var(--tag-border-none)',
        color: themeColor,
      };
    default:
      return;
  }
}

/**
 * @description 根据 color 获取渐变色
 */
export function getLinearStyle(
  color: NonNullable<CTagProps['color']>,
  type: CTagProps['type'],
  shape: CTagProps['shape'],
) {
  if (!shape || type !== 'default') {
    return;
  }
  const baseStyle = {
    backgroundImage: `var(--tag-color-${toKebabCase(color)})`,
    border: '1px solid transparent',
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
  };
  switch (color) {
    case 'linearRed':
    case 'linearOrangered':
      return {
        ...baseStyle,
        color: 'var(--tag-color-white)',
      };
    case 'linearGold':
      return {
        ...baseStyle,
        color: 'var(--tag-color-gold-text)',
      };
    default:
      return;
  }
}

/**
 * @description 根据 color 获取颜色
 */
function getThemeColor(color: NonNullable<CTagProps['color']>) {
  if (isArcoColor(color)) {
    return `var(--tag-arco-color-${color})`;
  }
  if (isCustomColor(color)) {
    return `rgb(var(--tag-color-${color}))`;
  }
  return color;
}

/**
 * @description 判断是否为内置颜色
 */
export function isCustomColor(color?: string) {
  return Boolean(color && COLORS.includes(color as any));
}

/**
 * @description 判断是否为 Arco 内置颜色
 */
export function isArcoColor(color?: string) {
  return Boolean(color && ARCO_COLORS.includes(color as any));
}

/**
 * @description 判断是否为内置渐变色
 */
export function isLinearColor(color?: string) {
  return Boolean(color && LINEAR_COLORS.includes(color as any));
}
