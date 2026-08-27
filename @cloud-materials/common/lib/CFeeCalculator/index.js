"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var presetLayout_1 = require("./utils/presetLayout");
var hooks_1 = tslib_1.__importDefault(require("./hooks"));
var NumNode_1 = require("./components/NumNode");
var DurationNode_1 = require("./components/DurationNode");
var PriceNodeTitle_1 = require("./components/PriceNodeTitle");
var PriceNodeLoading_1 = require("./components/PriceNodeLoading");
var PriceNodeTotal_1 = require("./components/PriceNodeTotal");
var PriceNodeDescription_1 = require("./components/PriceNodeDescription");
var PriceNodeDiscount_1 = require("./components/PriceNodeDiscount");
var lodash_es_1 = require("lodash-es");
var prefix_1 = require("./utils/prefix");
var hooks_2 = require("../hooks");
var CFeeCalculator = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale, cComponentConfig = _b.cComponentConfig;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    var mergedProps = (0, hooks_2.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CFeeCalculator) !== null && _a !== void 0 ? _a : {});
    var _c = mergedProps.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c, _d = mergedProps.discountLayoutPosition, discountLayoutPosition = _d === void 0 ? 'right' : _d, _e = mergedProps.paramsLayout, userParamsLayout = _e === void 0 ? 'horizontal' : _e, _f = mergedProps.disClaimerContent, disClaimerContent = _f === void 0 ? locale.CFeeCalculator.defaultDisClaimer : _f, style = mergedProps.style, className = mergedProps.className, _g = mergedProps.savedText, savedText = _g === void 0 ? locale.CFeeCalculator.hasDiscount : _g, _h = mergedProps.monetaryUnit, monetaryUnit = _h === void 0 ? locale.CFeeCalculator.monetaryUnit : _h, monetaryCode = mergedProps.monetaryCode, theme = mergedProps.theme, _j = mergedProps.visible, visible = _j === void 0 ? true : _j;
    // 卡片模式下，时长和数量只能竖直摆放
    var paramsLayout = presetLayoutMode === 'card' ? 'vertical' : userParamsLayout;
    var _k = tslib_1.__read((0, hooks_1.default)(mergedProps), 2), _l = _k[0], numConfigState = _l.numConfigState, durationConfigState = _l.durationConfigState, priceArr = _l.priceArr, showLoading = _l.showLoading, hasDisclaimer = _l.hasDisclaimer, handleOnChange = _k[1].handleOnChange;
    if (!visible) {
        return null;
    }
    var numNode = numConfigState.showNum ? (react_1.default.createElement(NumNode_1.NumNode, { handleOnChange: handleOnChange, numConfigState: numConfigState })) : null;
    var durationNode = durationConfigState.showDuration ? (react_1.default.createElement(DurationNode_1.DurationNode, { handleOnChange: handleOnChange, durationConfigState: durationConfigState })) : null;
    var priceNodes = priceArr.map(function (_a) {
        var priceConfig = _a.priceConfig, priceDetail = _a.priceDetail;
        return {
            title: !(0, lodash_es_1.isNull)(priceConfig.title) ? (react_1.default.createElement(PriceNodeTitle_1.PriceNodeTitle, { title: priceConfig.title, isRefund: priceDetail.isRefund })) : null,
            price: showLoading ? (react_1.default.createElement(PriceNodeLoading_1.PriceNodeLoading, null)) : (react_1.default.createElement(PriceNodeTotal_1.PriceNodeTotal, { popoverProps: mergedProps.popoverProps, monetaryUnit: monetaryUnit, monetaryCode: monetaryCode, priceDetail: priceDetail, priceConfig: priceConfig })),
            discount: !showLoading && priceDetail.discountPrice ? (react_1.default.createElement(PriceNodeDiscount_1.PriceNodeDiscount, { discountPrice: priceDetail.discountPrice, monetaryUnit: monetaryUnit, unit: priceConfig.unit, savedText: savedText })) : null,
            description: !(0, lodash_es_1.isNil)(priceConfig.description) ? (react_1.default.createElement(PriceNodeDescription_1.PriceNodeDescription, { description: priceConfig.description })) : null,
            customRenderPriceNode: priceConfig.customRenderPriceNode,
        };
    });
    return (0, presetLayout_1.presetLayout)({
        theme: theme,
        nodeParams: {
            numNode: numNode,
            durationNode: durationNode,
            priceNodes: priceNodes,
        },
        layoutParams: {
            presetLayoutMode: presetLayoutMode,
            discountPosition: discountLayoutPosition,
            paramsLayout: paramsLayout,
        },
        cFeeCalculatorProps: {
            style: style,
            className: className,
        },
        isLoading: showLoading,
        cssPrefix: cssPrefix,
        disClaimer: {
            hasDisclaimer: hasDisclaimer,
            disClaimerContent: disClaimerContent,
        },
    });
};
CFeeCalculator.displayName = 'CFeeCalculator';
exports.default = CFeeCalculator;
//# sourceMappingURL=index.js.map