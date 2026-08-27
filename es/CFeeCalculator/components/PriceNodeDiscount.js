import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { feePrefix } from '../utils/prefix';
export var PriceNodeDiscount = function (_a) {
    var monetaryUnit = _a.monetaryUnit, discountPrice = _a.discountPrice, savedText = _a.savedText, unit = _a.unit;
    // 火山：已省 ¥30
    // bp：$30 saved
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix(feePrefix);
    var discountPriceNode = (React.createElement("span", { "data-cy": testId.priceNodeDiscount, "data-testid": testId.priceNodeDiscount },
        monetaryUnit,
        discountPrice,
        unit ? "/".concat(unit) : null));
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-discount"], ["price-item-discount"]))) }, locale.locale === 'en-US' ? (React.createElement("span", null,
        discountPriceNode,
        "\u00A0",
        savedText)) : (React.createElement("span", null,
        savedText,
        "\u00A0",
        discountPriceNode))));
};
var templateObject_1;
//# sourceMappingURL=PriceNodeDiscount.js.map