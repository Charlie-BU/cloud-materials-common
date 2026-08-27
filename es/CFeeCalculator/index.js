import { __read } from "tslib";
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { presetLayout } from './utils/presetLayout';
import useCFeeCalculator from './hooks';
import { NumNode } from './components/NumNode';
import { DurationNode } from './components/DurationNode';
import { PriceNodeTitle } from './components/PriceNodeTitle';
import { PriceNodeLoading } from './components/PriceNodeLoading';
import { PriceNodeTotal } from './components/PriceNodeTotal';
import { PriceNodeDescription } from './components/PriceNodeDescription';
import { PriceNodeDiscount } from './components/PriceNodeDiscount';
import { isNil, isNull } from 'lodash-es';
import { feePrefix } from './utils/prefix';
import { useMergeProps } from '../hooks';
var CFeeCalculator = function (props) {
    var _a;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, locale = _b.locale, cComponentConfig = _b.cComponentConfig;
    var cssPrefix = useCssPrefix(feePrefix);
    var mergedProps = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CFeeCalculator) !== null && _a !== void 0 ? _a : {});
    var _c = mergedProps.presetLayoutMode, presetLayoutMode = _c === void 0 ? 'footer' : _c, _d = mergedProps.discountLayoutPosition, discountLayoutPosition = _d === void 0 ? 'right' : _d, _e = mergedProps.paramsLayout, userParamsLayout = _e === void 0 ? 'horizontal' : _e, _f = mergedProps.disClaimerContent, disClaimerContent = _f === void 0 ? locale.CFeeCalculator.defaultDisClaimer : _f, style = mergedProps.style, className = mergedProps.className, _g = mergedProps.savedText, savedText = _g === void 0 ? locale.CFeeCalculator.hasDiscount : _g, _h = mergedProps.monetaryUnit, monetaryUnit = _h === void 0 ? locale.CFeeCalculator.monetaryUnit : _h, monetaryCode = mergedProps.monetaryCode, theme = mergedProps.theme, _j = mergedProps.visible, visible = _j === void 0 ? true : _j;
    // 卡片模式下，时长和数量只能竖直摆放
    var paramsLayout = presetLayoutMode === 'card' ? 'vertical' : userParamsLayout;
    var _k = __read(useCFeeCalculator(mergedProps), 2), _l = _k[0], numConfigState = _l.numConfigState, durationConfigState = _l.durationConfigState, priceArr = _l.priceArr, showLoading = _l.showLoading, hasDisclaimer = _l.hasDisclaimer, handleOnChange = _k[1].handleOnChange;
    if (!visible) {
        return null;
    }
    var numNode = numConfigState.showNum ? (React.createElement(NumNode, { handleOnChange: handleOnChange, numConfigState: numConfigState })) : null;
    var durationNode = durationConfigState.showDuration ? (React.createElement(DurationNode, { handleOnChange: handleOnChange, durationConfigState: durationConfigState })) : null;
    var priceNodes = priceArr.map(function (_a) {
        var priceConfig = _a.priceConfig, priceDetail = _a.priceDetail;
        return {
            title: !isNull(priceConfig.title) ? (React.createElement(PriceNodeTitle, { title: priceConfig.title, isRefund: priceDetail.isRefund })) : null,
            price: showLoading ? (React.createElement(PriceNodeLoading, null)) : (React.createElement(PriceNodeTotal, { popoverProps: mergedProps.popoverProps, monetaryUnit: monetaryUnit, monetaryCode: monetaryCode, priceDetail: priceDetail, priceConfig: priceConfig })),
            discount: !showLoading && priceDetail.discountPrice ? (React.createElement(PriceNodeDiscount, { discountPrice: priceDetail.discountPrice, monetaryUnit: monetaryUnit, unit: priceConfig.unit, savedText: savedText })) : null,
            description: !isNil(priceConfig.description) ? (React.createElement(PriceNodeDescription, { description: priceConfig.description })) : null,
            customRenderPriceNode: priceConfig.customRenderPriceNode,
        };
    });
    return presetLayout({
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
export default CFeeCalculator;
//# sourceMappingURL=index.js.map