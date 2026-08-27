import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import { feePrefix } from '../utils/prefix';
export var PriceNodeLoading = function () {
    var _a = useCConfigContext(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix(feePrefix);
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-loading"], ["price-item-loading"]))), "data-cy": testId.loadingText, "data-testid": testId.loadingText },
        React.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["price-item-loading-text"], ["price-item-loading-text"]))) }, locale.CFeeCalculator.calculating)));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=PriceNodeLoading.js.map