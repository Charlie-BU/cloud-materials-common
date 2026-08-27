import type { ReactNode } from 'react';
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import { feePrefix } from '../utils/prefix';

interface PriceNodeDescriptionProps {
  description: ReactNode;
}

export const PriceNodeDescription: React.FC<PriceNodeDescriptionProps> = ({ description }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  return (
    <div
      className={classNames(cssPrefix`price-item-description`)}
      data-cy={testId.priceNodeDescription}
      data-testid={testId.priceNodeDescription}
    >
      {description}
    </div>
  );
};
