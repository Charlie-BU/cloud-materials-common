"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNodeLoading = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var prefix_1 = require("../utils/prefix");
var PriceNodeLoading = function () {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-loading"], ["price-item-loading"]))), "data-cy": testId_1.testId.loadingText, "data-testid": testId_1.testId.loadingText },
        react_1.default.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["price-item-loading-text"], ["price-item-loading-text"]))) }, locale.CFeeCalculator.calculating)));
};
exports.PriceNodeLoading = PriceNodeLoading;
var templateObject_1, templateObject_2;
//# sourceMappingURL=PriceNodeLoading.js.map