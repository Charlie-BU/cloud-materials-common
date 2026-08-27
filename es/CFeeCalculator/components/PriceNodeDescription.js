import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import { feePrefix } from '../utils/prefix';
export var PriceNodeDescription = function (_a) {
    var description = _a.description;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix(feePrefix);
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-description"], ["price-item-description"])))), "data-cy": testId.priceNodeDescription, "data-testid": testId.priceNodeDescription }, description));
};
var templateObject_1;
//# sourceMappingURL=PriceNodeDescription.js.map