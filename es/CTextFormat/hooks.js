import { useCConfigContext } from '../CConfigProvider';
export var useCTextFormat = function (props) {
    var _a = useCConfigContext(), locale = _a.locale, formatLocale = _a.formatLocale;
    if (props.type === 'Discount') {
        var discount = props.discount;
        var finalDiscount = Math.min(Math.max(discount, 0), 10);
        if (locale.locale === 'en-US') {
            finalDiscount = 100 - 10 * discount;
        }
        return formatLocale(locale.CTextFormat.discount, { discount: finalDiscount });
    }
    return 'Unknown Type';
};
//# sourceMappingURL=hooks.js.map