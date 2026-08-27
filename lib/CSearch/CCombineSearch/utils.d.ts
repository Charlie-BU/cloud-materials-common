import type { ReactNode } from 'react';
import type { CLocale } from '../../locales/default';
import type { CCombineSearchProps, CSearchParams, UseCCombineSearchCustomProps, UseCCombineSearchValue } from '../interface';
import type { COperationMenuProps } from '../../COperationMenu/interface';
/**
 * CombineSearch 获取处理用户输入字符的函数，处理结果进行模糊匹配
 * @param fuzzy
 * @param fuzzyConfig
 * @returns
 */
export declare const getCombineFilterUserInput: (fuzzy: UseCCombineSearchCustomProps['fuzzy'], fuzzyConfig: UseCCombineSearchCustomProps['fuzzyConfig']) => UseCCombineSearchValue['filterUserInput'];
/**
 * CCombineSearch 获取placeholder
 * @param status
 * @param current
 * @param locale
 * @returns
 */
export declare const getConbineSearchPlaceholder: (status: UseCCombineSearchValue['status'], current: UseCCombineSearchValue['current'], locale: CLocale, comPlaceholder?: string) => string;
/**
 * 获取 trigger 前后react node
 * @param extraConfig
 * @returns
 */
export declare const getTriggerExtraNode: (extraConfig?: ReactNode | COperationMenuProps) => ReactNode;
/**
 * 获取已选择的搜索条件list
 * @param params
 * @param list
 * @returns
 */
export declare const getViewList: (params: CSearchParams, list: NonNullable<CCombineSearchProps['list']>) => import("../interface").CCombineSearchItem[];
export declare const combineDataCy: (string: TemplateStringsArray, ...params: any[]) => string;
/**
 * 值转为Array
 * @param v
 * @returns Array|undefined|null
 */
export declare const valueToArray: <T extends unknown>(v: T | T[]) => T[];
/**
 * 获取defaultField 配置
 */
export declare const getDefaultFieldConfig: (defaultField: UseCCombineSearchCustomProps['defaultField']) => UseCCombineSearchValue['defaultField'];
