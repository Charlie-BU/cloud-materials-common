"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCTextFormat = void 0;
var CConfigProvider_1 = require("../CConfigProvider");
var useCTextFormat = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, formatLocale = _a.formatLocale;
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
exports.useCTextFormat = useCTextFormat;
//# sourceMappingURL=hooks.js.map