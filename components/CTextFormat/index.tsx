import React from 'react';
import { useCTextFormat } from './hooks';
import type { CTextFormatProps, DiscountProps } from './interface';

const CTextFormat = React.memo((props: CTextFormatProps) => {
  const text = useCTextFormat(props);
  return <>{text}</>;
});

CTextFormat.displayName = 'CTextFormat';

const Discount: React.VFC<Omit<DiscountProps, 'type'>> = props => <CTextFormat type="Discount" {...props} />;

Discount.displayName = 'CTextFormat.Discount';

export default Object.assign(CTextFormat, { Discount });
