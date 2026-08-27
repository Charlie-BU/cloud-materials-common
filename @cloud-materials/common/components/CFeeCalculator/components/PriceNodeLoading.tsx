import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { feePrefix } from '../utils/prefix';

export const PriceNodeLoading: React.FC = () => {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  return (
    <div className={cssPrefix`price-item-loading`} data-cy={testId.loadingText} data-testid={testId.loadingText}>
      <span className={cssPrefix`price-item-loading-text`}>{locale.CFeeCalculator.calculating}</span>
    </div>
  );
};
