import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import { isUndefined } from 'lodash-es';
import { feePrefix } from '../utils/prefix';
export var PriceNodeTitle = function (_a) {
    var title = _a.title, isRefund = _a.isRefund;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix(feePrefix);
    var mergedTitle = title;
    if (!isUndefined(title)) {
        mergedTitle = title;
    }
    else if (isRefund) {
        mergedTitle = locale.CFeeCalculator.defaultRefundTitle;
    }
    else {
        mergedTitle = locale.CFeeCalculator.defaultPriceInfoTitle;
    }
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-title"], ["price-item-title"])))), "data-cy": testId.priceNodeTitle, "data-testid": testId.priceNodeTitle }, mergedTitle));
};
var templateObject_1;
//# sourceMappingURL=PriceNodeTitle.js.map