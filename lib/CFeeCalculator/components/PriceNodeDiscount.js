"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNodeDiscount = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var prefix_1 = require("../utils/prefix");
var PriceNodeDiscount = function (_a) {
    var monetaryUnit = _a.monetaryUnit, discountPrice = _a.discountPrice, savedText = _a.savedText, unit = _a.unit;
    // 火山：已省 ¥30
    // bp：$30 saved
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    var discountPriceNode = (react_1.default.createElement("span", { "data-cy": testId_1.testId.priceNodeDiscount, "data-testid": testId_1.testId.priceNodeDiscount },
        monetaryUnit,
        discountPrice,
        unit ? "/".concat(unit) : null));
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-discount"], ["price-item-discount"]))) }, locale.locale === 'en-US' ? (react_1.default.createElement("span", null,
        discountPriceNode,
        "\u00A0",
        savedText)) : (react_1.default.createElement("span", null,
        savedText,
        "\u00A0",
        discountPriceNode))));
};
exports.PriceNodeDiscount = PriceNodeDiscount;
var templateObject_1;
//# sourceMappingURL=PriceNodeDiscount.js.map