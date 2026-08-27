"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetLayout = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var testId_1 = require("./testId");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var atomLayout_1 = require("./atomLayout");
/**
 * 根据用户配置 实现 总体的布局
 * @param nodeParams
 * @param layoutParams
 * @param disClaimer
 * @param cssPrefix
 * @param className
 * @param style
 * @returns
 */
var presetLayout = function (options) {
    var _a;
    var nodeParams = options.nodeParams, layoutParams = options.layoutParams, disClaimer = options.disClaimer, cssPrefix = options.cssPrefix, cFeeCalculatorProps = options.cFeeCalculatorProps, isLoading = options.isLoading, theme = options.theme;
    var className = cFeeCalculatorProps.className, style = cFeeCalculatorProps.style;
    return (react_1.default.createElement("div", { "data-cy": testId_1.testId.container, "data-testid": testId_1.testId.container, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), (_a = {},
            _a[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["horizontal"], ["horizontal"])))] = layoutParams.presetLayoutMode === 'footer',
            _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["vertical"], ["vertical"])))] = layoutParams.presetLayoutMode === 'card',
            _a[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["en"], ["en"])))] = theme === 'en',
            _a), className), style: style },
        (0, atomLayout_1.paramLayout)({
            cssPrefix: cssPrefix,
            layoutParams: {
                paramsLayout: layoutParams.paramsLayout,
                presetLayoutMode: layoutParams.presetLayoutMode,
            },
            durationNode: nodeParams.durationNode,
            numNode: nodeParams.numNode,
        }),
        nodeParams.priceNodes.map(function (priceInfoItem, index) {
            return (0, atomLayout_1.priceAndTitleLayout)({
                index: index,
                title: priceInfoItem.title,
                description: priceInfoItem.description,
                priceTotalNode: priceInfoItem.price,
                priceDiscountNode: priceInfoItem.discount,
                customRenderPriceNode: priceInfoItem.customRenderPriceNode,
                layoutParams: {
                    discountLayoutPosition: layoutParams.discountPosition,
                    presetLayoutMode: layoutParams.presetLayoutMode,
                },
                isLoading: isLoading,
                cssPrefix: cssPrefix,
                hasDescription: Boolean(priceInfoItem.description),
            });
        }),
        disClaimer.hasDisclaimer ? react_1.default.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["disclaimer"], ["disclaimer"]))) }, disClaimer.disClaimerContent) : null));
};
exports.presetLayout = presetLayout;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=presetLayout.js.map