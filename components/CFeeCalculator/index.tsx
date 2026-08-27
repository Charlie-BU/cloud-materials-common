import type { CFeeCalculatorProps, PriceNode } from './interface';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { presetLayout } from './utils/presetLayout';
import useCFeeCalculator from './hooks';
import { NumNode } from './components/NumNode';
import { DurationNode } from './components/DurationNode';
import { PriceNodeTitle } from './components/PriceNodeTitle';
import { PriceNodeLoading } from './components/PriceNodeLoading';
import { PriceNodeTotal } from './components/PriceNodeTotal';
import { PriceNodeDescription } from './components/PriceNodeDescription';
import { PriceNodeDiscount } from './components/PriceNodeDiscount';
import { isNil, isNull } from 'lodash-es';
import { feePrefix } from './utils/prefix';
import { useMergeProps } from '../hooks';

const CFeeCalculator: React.FC<CFeeCalculatorProps> = props => {
  const { useCssPrefix, locale, cComponentConfig } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);

  const mergedProps = useMergeProps(props, {}, cComponentConfig?.CFeeCalculator ?? {});
  const {
    presetLayoutMode = 'footer',
    discountLayoutPosition = 'right',
    paramsLayout: userParamsLayout = 'horizontal',
    disClaimerContent = locale.CFeeCalculator.defaultDisClaimer,
    style,
    className,
    savedText = locale.CFeeCalculator.hasDiscount,
    monetaryUnit = locale.CFeeCalculator.monetaryUnit,
    monetaryCode,
    theme,
    visible = true,
  } = mergedProps;
  // 卡片模式下，时长和数量只能竖直摆放
  const paramsLayout = presetLayoutMode === 'card' ? 'vertical' : userParamsLayout;

  const [{ numConfigState, durationConfigState, priceArr, showLoading, hasDisclaimer }, { handleOnChange }] =
    useCFeeCalculator(mergedProps);

  if (!visible) {
    return null;
  }

  const numNode: JSX.Element | null = numConfigState.showNum ? (
    <NumNode handleOnChange={handleOnChange} numConfigState={numConfigState} />
  ) : null;

  const durationNode: JSX.Element | null = durationConfigState.showDuration ? (
    <DurationNode handleOnChange={handleOnChange} durationConfigState={durationConfigState} />
  ) : null;

  const priceNodes: PriceNode[] = priceArr.map(({ priceConfig, priceDetail }) => {
    return {
      title: !isNull(priceConfig.title) ? (
        <PriceNodeTitle title={priceConfig.title} isRefund={priceDetail.isRefund} />
      ) : null,
      price: showLoading ? (
        <PriceNodeLoading />
      ) : (
        <PriceNodeTotal
          popoverProps={mergedProps.popoverProps}
          monetaryUnit={monetaryUnit}
          monetaryCode={monetaryCode}
          priceDetail={priceDetail}
          priceConfig={priceConfig}
        />
      ),
      discount:
        !showLoading && priceDetail.discountPrice ? (
          <PriceNodeDiscount
            discountPrice={priceDetail.discountPrice}
            monetaryUnit={monetaryUnit}
            unit={priceConfig.unit}
            savedText={savedText}
          />
        ) : null,
      description: !isNil(priceConfig.description) ? (
        <PriceNodeDescription description={priceConfig.description} />
      ) : null,
      customRenderPriceNode: priceConfig.customRenderPriceNode,
    };
  });

  return presetLayout({
    theme,
    nodeParams: {
      numNode,
      durationNode,
      priceNodes,
    },
    layoutParams: {
      presetLayoutMode: presetLayoutMode,
      discountPosition: discountLayoutPosition,
      paramsLayout: paramsLayout,
    },
    cFeeCalculatorProps: {
      style,
      className,
    },
    isLoading: showLoading,
    cssPrefix,
    disClaimer: {
      hasDisclaimer,
      disClaimerContent,
    },
  });
};

CFeeCalculator.displayName = 'CFeeCalculator';

export default CFeeCalculator;
