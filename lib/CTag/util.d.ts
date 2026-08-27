import type { CSSProperties } from 'react';
import type { CTagProps } from './interface';
/**
 * @description 根据 color 及 type 获取 Tag 样式
 */
export declare function getTagStyle(color: CTagProps['color'], type: CTagProps['type'], shape: NonNullable<CTagProps['shape']>): CSSProperties | undefined;
/**
 * @description 转换为 kebab case
 */
export declare function toKebabCase(originalString: string): string | undefined;
/**
 * @description 获取公共样式
 */
export declare function getCommonStyle(color: NonNullable<CTagProps['color']>, type: NonNullable<CTagProps['color']>): {
    backgroundColor: string;
    color: string;
    border?: undefined;
    borderColor?: undefined;
} | {
    backgroundColor: string;
    border: string;
    borderColor: string;
    color: string;
} | {
    border: string;
    borderColor: string;
    color: string;
    backgroundColor?: undefined;
} | {
    backgroundColor: string;
    border: string;
    color: string;
    borderColor?: undefined;
} | undefined;
/**
 * @description 根据 color 获取渐变色
 */
export declare function getLinearStyle(color: NonNullable<CTagProps['color']>, type: CTagProps['type'], shape: CTagProps['shape']): {
    color: string;
    backgroundImage: string;
    border: string;
    backgroundClip: string;
    backgroundOrigin: string;
} | undefined;
/**
 * @description 判断是否为内置颜色
 */
export declare function isCustomColor(color?: string): boolean;
/**
 * @description 判断是否为 Arco 内置颜色
 */
export declare function isArcoColor(color?: string): boolean;
/**
 * @description 判断是否为内置渐变色
 */
export declare function isLinearColor(color?: string): boolean;
