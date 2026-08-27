"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNodeTitle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var prefix_1 = require("../utils/prefix");
var PriceNodeTitle = function (_a) {
    var title = _a.title, isRefund = _a.isRefund;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    var mergedTitle = title;
    if (!(0, lodash_es_1.isUndefined)(title)) {
        mergedTitle = title;
    }
    else if (isRefund) {
        mergedTitle = locale.CFeeCalculator.defaultRefundTitle;
    }
    else {
        mergedTitle = locale.CFeeCalculator.defaultPriceInfoTitle;
    }
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-title"], ["price-item-title"])))), "data-cy": testId_1.testId.priceNodeTitle, "data-testid": testId_1.testId.priceNodeTitle }, mergedTitle));
};
exports.PriceNodeTitle = PriceNodeTitle;
var templateObject_1;
//# sourceMappingURL=PriceNodeTitle.js.map