import { __makeTemplateObject } from "tslib";
import React from 'react';
import { testId } from './testId';
import classNames from 'classnames';
import { paramLayout, priceAndTitleLayout } from './atomLayout';
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
export var presetLayout = function (options) {
    var _a;
    var nodeParams = options.nodeParams, layoutParams = options.layoutParams, disClaimer = options.disClaimer, cssPrefix = options.cssPrefix, cFeeCalculatorProps = options.cFeeCalculatorProps, isLoading = options.isLoading, theme = options.theme;
    var className = cFeeCalculatorProps.className, style = cFeeCalculatorProps.style;
    return (React.createElement("div", { "data-cy": testId.container, "data-testid": testId.container, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), (_a = {},
            _a[cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["horizontal"], ["horizontal"])))] = layoutParams.presetLayoutMode === 'footer',
            _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["vertical"], ["vertical"])))] = layoutParams.presetLayoutMode === 'card',
            _a[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["en"], ["en"])))] = theme === 'en',
            _a), className), style: style },
        paramLayout({
            cssPrefix: cssPrefix,
            layoutParams: {
                paramsLayout: layoutParams.paramsLayout,
                presetLayoutMode: layoutParams.presetLayoutMode,
            },
            durationNode: nodeParams.durationNode,
            numNode: nodeParams.numNode,
        }),
        nodeParams.priceNodes.map(function (priceInfoItem, index) {
            return priceAndTitleLayout({
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
        disClaimer.hasDisclaimer ? React.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["disclaimer"], ["disclaimer"]))) }, disClaimer.disClaimerContent) : null));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=presetLayout.js.map