"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNodeDescription = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var prefix_1 = require("../utils/prefix");
var PriceNodeDescription = function (_a) {
    var description = _a.description;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-description"], ["price-item-description"])))), "data-cy": testId_1.testId.priceNodeDescription, "data-testid": testId_1.testId.priceNodeDescription }, description));
};
exports.PriceNodeDescription = PriceNodeDescription;
var templateObject_1;
//# sourceMappingURL=PriceNodeDescription.js.map