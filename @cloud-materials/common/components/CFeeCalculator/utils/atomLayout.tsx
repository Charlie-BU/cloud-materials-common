import React from 'react';
import type { CFeeCalculatorProps, PriceInfo } from '../interface';
import classNames from 'classnames';
import { testId } from './testId';
import { Divider } from '@arco-design/web-react';

/**
 * 原子布局文件
 */

/**
 * 根据 用户配置 实现 总价和折扣价 的排列布局
 * @param options
 * @returns
 */
export const priceTotalDiscountNodeLayout = (options: {
  customRenderPriceNode?: PriceInfo['customRenderPriceNode'];
  priceTotalNode: JSX.Element;
  priceDiscountNode?: JSX.Element | null;
  layoutParams: {
    discountLayoutPosition: CFeeCalculatorProps['discountLayoutPosition'];
  };
  isLoading: boolean;
  cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
  hasDescription: boolean;
}) => {
  const {
    priceTotalNode,
    priceDiscountNode,
    isLoading,
    cssPrefix,
    hasDescription,
    layoutParams,
    customRenderPriceNode,
  } = options;
  const { discountLayoutPosition = 'right' } = layoutParams;
  if (customRenderPriceNode) {
    return <div className={classNames(cssPrefix`price-item-container`)}>{customRenderPriceNode()}</div>;
  }
  return (
    <div
      className={classNames(cssPrefix`price-item-container`, {
        [cssPrefix`price-item-container-with-desc`]: hasDescription, // 存在描述信息时，具有margin-right样式
        [cssPrefix`price-item-container-horizontal`]: Boolean(priceDiscountNode) && discountLayoutPosition === 'right',
        [cssPrefix`price-item-container-vertical`]:
          Boolean(priceDiscountNode) && !isLoading && discountLayoutPosition === 'bottom',
      })}
    >
      {priceTotalNode}
      {priceDiscountNode}
    </div>
  );
};

/**
 * 根据用户配置 实现 价格标题 和 价格 的排列布局
 * @param options
 * @returns
 */
export const priceAndTitleLayout = (options: {
  index: number;
  priceTotalNode: JSX.Element;
  priceDiscountNode?: JSX.Element | null;
  title?: JSX.Element | null;
  description?: JSX.Element | null;
  layoutParams: {
    discountLayoutPosition: CFeeCalculatorProps['discountLayoutPosition'];
    presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
  };
  isLoading: boolean;
  cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
  hasDescription: boolean;
  customRenderPriceNode?: PriceInfo['customRenderPriceNode'];
}) => {
  const {
    index,
    priceTotalNode,
    priceDiscountNode,
    title,
    description,
    hasDescription,
    cssPrefix,
    layoutParams,
    isLoading,
    customRenderPriceNode,
  } = options;
  const { discountLayoutPosition = 'right', presetLayoutMode = 'footer' } = layoutParams;
  return (
    <div
      className={classNames(cssPrefix`price-item`, {
        [cssPrefix`price-item-vertical`]: presetLayoutMode === 'card',
      })}
      key={`price-item-${index}`}
      data-cy={testId.priceInfoItem}
      data-testid={testId.priceInfoItem}
    >
      {title}
      {priceTotalDiscountNodeLayout({
        customRenderPriceNode,
        priceTotalNode,
        priceDiscountNode,
        layoutParams: {
          discountLayoutPosition,
        },
        isLoading,
        cssPrefix: cssPrefix,
        hasDescription,
      })}
      {description}
    </div>
  );
};

/**
 * 根据用户配置 实现 时长和数量 的排列布局
 * @param options
 * @returns
 */
export const paramLayout = (options: {
  layoutParams: {
    paramsLayout: CFeeCalculatorProps['paramsLayout'];
    presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
  };
  numNode?: JSX.Element | null;
  durationNode?: JSX.Element | null;
  cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
}) => {
  const { layoutParams, numNode, durationNode, cssPrefix } = options;
  const { paramsLayout = 'horizontal', presetLayoutMode = 'footer' } = layoutParams;
  return numNode || durationNode ? (
    <>
      <div
        className={classNames(cssPrefix`paramlayout`, {
          [cssPrefix`paramlayout-vertical`]: Boolean(numNode) && Boolean(durationNode) && paramsLayout === 'vertical',
        })}
      >
        {numNode}
        {durationNode}
      </div>
      {/* 卡片模式下，参数配置下方有一条分割线 */}
      {presetLayoutMode === 'card' ? <Divider className={cssPrefix`divider`} /> : null}
    </>
  ) : null;
};
