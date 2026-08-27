import { __makeTemplateObject } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { testId } from './testId';
import { Divider } from '@arco-design/web-react';
/**
 * 原子布局文件
 */
/**
 * 根据 用户配置 实现 总价和折扣价 的排列布局
 * @param options
 * @returns
 */
export var priceTotalDiscountNodeLayout = function (options) {
    var _a;
    var priceTotalNode = options.priceTotalNode, priceDiscountNode = options.priceDiscountNode, isLoading = options.isLoading, cssPrefix = options.cssPrefix, hasDescription = options.hasDescription, layoutParams = options.layoutParams, customRenderPriceNode = options.customRenderPriceNode;
    var _b = layoutParams.discountLayoutPosition, discountLayoutPosition = _b === void 0 ? 'right' : _b;
    if (customRenderPriceNode) {
        return React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-container"], ["price-item-container"])))) }, customRenderPriceNode());
    }
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["price-item-container"], ["price-item-container"]))), (_a = {},
            _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["price-item-container-with-desc"], ["price-item-container-with-desc"])))] = hasDescription,
            _a[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["price-item-container-horizontal"], ["price-item-container-horizontal"])))] = Boolean(priceDiscountNode) && discountLayoutPosition === 'right',
            _a[cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["price-item-container-vertical"], ["price-item-container-vertical"])))] = Boolean(priceDiscountNode) && !isLoading && discountLayoutPosition === 'bottom',
            _a)) },
        priceTotalNode,
        priceDiscountNode));
};
/**
 * 根据用户配置 实现 价格标题 和 价格 的排列布局
 * @param options
 * @returns
 */
export var priceAndTitleLayout = function (options) {
    var _a;
    var index = options.index, priceTotalNode = options.priceTotalNode, priceDiscountNode = options.priceDiscountNode, title = options.title, description = options.description, hasDescription = options.hasDescription, cssPrefix = options.cssPrefix, layoutParams = options.layoutParams, isLoading = options.isLoading, customRenderPriceNode = options.customRenderPriceNode;
    var _b = layoutParams.discountLayoutPosition, discountLayoutPosition = _b === void 0 ? 'right' : _b, _c = layoutParams.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c;
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["price-item"], ["price-item"]))), (_a = {},
            _a[cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["price-item-vertical"], ["price-item-vertical"])))] = presetLayoutMode === 'card',
            _a)), key: "price-item-".concat(index), "data-cy": testId.priceInfoItem, "data-testid": testId.priceInfoItem },
        title,
        priceTotalDiscountNodeLayout({
            customRenderPriceNode: customRenderPriceNode,
            priceTotalNode: priceTotalNode,
            priceDiscountNode: priceDiscountNode,
            layoutParams: {
                discountLayoutPosition: discountLayoutPosition,
            },
            isLoading: isLoading,
            cssPrefix: cssPrefix,
            hasDescription: hasDescription,
        }),
        description));
};
/**
 * 根据用户配置 实现 时长和数量 的排列布局
 * @param options
 * @returns
 */
export var paramLayout = function (options) {
    var _a;
    var layoutParams = options.layoutParams, numNode = options.numNode, durationNode = options.durationNode, cssPrefix = options.cssPrefix;
    var _b = layoutParams.paramsLayout, paramsLayout = _b === void 0 ? 'horizontal' : _b, _c = layoutParams.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c;
    return numNode || durationNode ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["paramlayout"], ["paramlayout"]))), (_a = {},
                _a[cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["paramlayout-vertical"], ["paramlayout-vertical"])))] = Boolean(numNode) && Boolean(durationNode) && paramsLayout === 'vertical',
                _a)) },
            numNode,
            durationNode),
        presetLayoutMode === 'card' ? React.createElement(Divider, { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["divider"], ["divider"]))) }) : null)) : null;
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=atomLayout.js.map