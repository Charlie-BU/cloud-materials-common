"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramLayout = exports.priceAndTitleLayout = exports.priceTotalDiscountNodeLayout = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var testId_1 = require("./testId");
var web_react_1 = require("@arco-design/web-react");
/**
 * 原子布局文件
 */
/**
 * 根据 用户配置 实现 总价和折扣价 的排列布局
 * @param options
 * @returns
 */
var priceTotalDiscountNodeLayout = function (options) {
    var _a;
    var priceTotalNode = options.priceTotalNode, priceDiscountNode = options.priceDiscountNode, isLoading = options.isLoading, cssPrefix = options.cssPrefix, hasDescription = options.hasDescription, layoutParams = options.layoutParams, customRenderPriceNode = options.customRenderPriceNode;
    var _b = layoutParams.discountLayoutPosition, discountLayoutPosition = _b === void 0 ? 'right' : _b;
    if (customRenderPriceNode) {
        return react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-container"], ["price-item-container"])))) }, customRenderPriceNode());
    }
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["price-item-container"], ["price-item-container"]))), (_a = {},
            _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["price-item-container-with-desc"], ["price-item-container-with-desc"])))] = hasDescription,
            _a[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["price-item-container-horizontal"], ["price-item-container-horizontal"])))] = Boolean(priceDiscountNode) && discountLayoutPosition === 'right',
            _a[cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["price-item-container-vertical"], ["price-item-container-vertical"])))] = Boolean(priceDiscountNode) && !isLoading && discountLayoutPosition === 'bottom',
            _a)) },
        priceTotalNode,
        priceDiscountNode));
};
exports.priceTotalDiscountNodeLayout = priceTotalDiscountNodeLayout;
/**
 * 根据用户配置 实现 价格标题 和 价格 的排列布局
 * @param options
 * @returns
 */
var priceAndTitleLayout = function (options) {
    var _a;
    var index = options.index, priceTotalNode = options.priceTotalNode, priceDiscountNode = options.priceDiscountNode, title = options.title, description = options.description, hasDescription = options.hasDescription, cssPrefix = options.cssPrefix, layoutParams = options.layoutParams, isLoading = options.isLoading, customRenderPriceNode = options.customRenderPriceNode;
    var _b = layoutParams.discountLayoutPosition, discountLayoutPosition = _b === void 0 ? 'right' : _b, _c = layoutParams.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["price-item"], ["price-item"]))), (_a = {},
            _a[cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["price-item-vertical"], ["price-item-vertical"])))] = presetLayoutMode === 'card',
            _a)), key: "price-item-".concat(index), "data-cy": testId_1.testId.priceInfoItem, "data-testid": testId_1.testId.priceInfoItem },
        title,
        (0, exports.priceTotalDiscountNodeLayout)({
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
exports.priceAndTitleLayout = priceAndTitleLayout;
/**
 * 根据用户配置 实现 时长和数量 的排列布局
 * @param options
 * @returns
 */
var paramLayout = function (options) {
    var _a;
    var layoutParams = options.layoutParams, numNode = options.numNode, durationNode = options.durationNode, cssPrefix = options.cssPrefix;
    var _b = layoutParams.paramsLayout, paramsLayout = _b === void 0 ? 'horizontal' : _b, _c = layoutParams.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c;
    return numNode || durationNode ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["paramlayout"], ["paramlayout"]))), (_a = {},
                _a[cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["paramlayout-vertical"], ["paramlayout-vertical"])))] = Boolean(numNode) && Boolean(durationNode) && paramsLayout === 'vertical',
                _a)) },
            numNode,
            durationNode),
        presetLayoutMode === 'card' ? react_1.default.createElement(web_react_1.Divider, { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["divider"], ["divider"]))) }) : null)) : null;
};
exports.paramLayout = paramLayout;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=atomLayout.js.map