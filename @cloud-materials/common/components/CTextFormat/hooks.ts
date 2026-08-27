import { useCConfigContext } from '../CConfigProvider';
import type { CTextFormatHooksProps } from './interface';

export const useCTextFormat = (props: CTextFormatHooksProps) => {
  const { locale, formatLocale } = useCConfigContext();
  if (props.type === 'Discount') {
    const { discount } = props;
    let finalDiscount = Math.min(Math.max(discount, 0), 10);
    if (locale.locale === 'en-US') {
      finalDiscount = 100 - 10 * discount;
    }

    return formatLocale(locale.CTextFormat.discount, { discount: finalDiscount });
  }

  return 'Unknown Type';
};
