import type { ReactNode } from 'react';
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import { isUndefined } from 'lodash-es';
import { feePrefix } from '../utils/prefix';

interface PriceNodeTitleProps {
  // 价格块的标题
  title?: Exclude<ReactNode, null>;
  // 是否是退费：退费场景和非退费场景的默认标题不一样
  isRefund: boolean;
}

export const PriceNodeTitle: React.FC<PriceNodeTitleProps> = ({ title, isRefund }) => {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  let mergedTitle = title;
  if (!isUndefined(title)) {
    mergedTitle = title;
  } else if (isRefund) {
    mergedTitle = locale.CFeeCalculator.defaultRefundTitle;
  } else {
    mergedTitle = locale.CFeeCalculator.defaultPriceInfoTitle;
  }
  return (
    <div
      className={classNames(cssPrefix`price-item-title`)}
      data-cy={testId.priceNodeTitle}
      data-testid={testId.priceNodeTitle}
    >
      {mergedTitle}
    </div>
  );
};
