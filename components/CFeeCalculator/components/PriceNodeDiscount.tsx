import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { feePrefix } from '../utils/prefix';

interface PriceNodeDiscountProps {
  // 定制“已省”文案
  savedText: string;
  // 折扣价格
  discountPrice: string;
  // 货币符号
  monetaryUnit: string;
  // 单位，如 /时
  unit?: string;
}

export const PriceNodeDiscount: React.FC<PriceNodeDiscountProps> = ({
  monetaryUnit,
  discountPrice,
  savedText,
  unit,
}) => {
  // 火山：已省 ¥30
  // bp：$30 saved
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  const discountPriceNode = (
    <span data-cy={testId.priceNodeDiscount} data-testid={testId.priceNodeDiscount}>
      {monetaryUnit}
      {discountPrice}
      {unit ? `/${unit}` : null}
    </span>
  );
  return (
    <div className={cssPrefix`price-item-discount`}>
      {/* 中文环境下，已省在前，英文环境下，已省在后 */}
      {locale.locale === 'en-US' ? (
        <span>
          {discountPriceNode}&nbsp;{savedText}
        </span>
      ) : (
        <span>
          {savedText}&nbsp;{discountPriceNode}
        </span>
      )}
    </div>
  );
};
