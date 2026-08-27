import React from 'react';
import { testId } from './testId';
import type { CFeeCalculatorProps, PriceNode } from '../interface';
import classNames from 'classnames';
import { paramLayout, priceAndTitleLayout } from './atomLayout';

/**
 * 根据用户配置 实现 总体的布局
 * @param nodeParams
 * @param layoutParams
 * @param disClaimer
 * @param cssPrefix
 * @param className
 * @param style
 * @returns
 */
export const presetLayout = (options: {
  nodeParams: {
    numNode: JSX.Element | null;
    durationNode: JSX.Element | null;
    priceNodes: PriceNode[];
  };
  layoutParams: {
    presetLayoutMode: CFeeCalculatorProps['presetLayoutMode'];
    paramsLayout: CFeeCalculatorProps['paramsLayout'];
    discountPosition: CFeeCalculatorProps['discountLayoutPosition'];
  };
  disClaimer: {
    disClaimerContent: string;
    hasDisclaimer: boolean;
  };
  isLoading: boolean;
  cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
  theme: CFeeCalculatorProps['theme'];
  cFeeCalculatorProps: Pick<CFeeCalculatorProps, 'className' | 'style'>;
}) => {
  const { nodeParams, layoutParams, disClaimer, cssPrefix, cFeeCalculatorProps, isLoading, theme } = options;
  const { className, style } = cFeeCalculatorProps;
  return (
    <div
      data-cy={testId.container}
      data-testid={testId.container}
      className={classNames(
        cssPrefix``,
        {
          [cssPrefix`horizontal`]: layoutParams.presetLayoutMode === 'footer',
          [cssPrefix`vertical`]: layoutParams.presetLayoutMode === 'card',
          [cssPrefix`en`]: theme === 'en',
        },
        className,
      )}
      style={style}
    >
      {/* 参数项（时长和数量） 配置 */}
      {paramLayout({
        cssPrefix,
        layoutParams: {
          paramsLayout: layoutParams.paramsLayout,
          presetLayoutMode: layoutParams.presetLayoutMode,
        },
        durationNode: nodeParams.durationNode,
        numNode: nodeParams.numNode,
      })}
      {/* 多个价格块 循环渲染 */}
      {nodeParams.priceNodes.map((priceInfoItem, index) => {
        return priceAndTitleLayout({
          index,
          title: priceInfoItem.title,
          description: priceInfoItem.description,
          priceTotalNode: priceInfoItem.price,
          priceDiscountNode: priceInfoItem.discount,
          customRenderPriceNode: priceInfoItem.customRenderPriceNode,
          layoutParams: {
            discountLayoutPosition: layoutParams.discountPosition,
            presetLayoutMode: layoutParams.presetLayoutMode,
          },
          isLoading,
          cssPrefix: cssPrefix,
          hasDescription: Boolean(priceInfoItem.description),
        });
      })}
      {/* 免责声明 */}
      {disClaimer.hasDisclaimer ? <span className={cssPrefix`disclaimer`}>{disClaimer.disClaimerContent}</span> : null}
    </div>
  );
};
