import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import { omit } from 'lodash-es';
import CTable from '../../CTable';
import { Empty, Popover } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { feePrefix } from '../utils/prefix';
export var PriceNodeTotal = function (_a) {
    var _b, _c;
    var _d, _e, _f, _g, _h, _j, _k, _l;
    var priceConfig = _a.priceConfig, popoverProps = _a.popoverProps, priceDetail = _a.priceDetail, monetaryUnit = _a.monetaryUnit, monetaryCode = _a.monetaryCode;
    var isRefund = priceDetail.isRefund, isValid = priceDetail.isValid, totalPrice = priceDetail.totalPrice;
    var _m = useCConfigContext(), useCssPrefix = _m.useCssPrefix, locale = _m.locale;
    var cssPrefix = useCssPrefix(feePrefix);
    var config = CTable.getConfig(__assign({ arcoTableProps: {
            border: true,
            size: 'small',
        }, pagination: false, columns: (_d = priceConfig.columns) !== null && _d !== void 0 ? _d : [], data: (_e = priceConfig.detailList) !== null && _e !== void 0 ? _e : [] }, ((_g = (_f = priceConfig.cTableProps) === null || _f === void 0 ? void 0 : _f.config) !== null && _g !== void 0 ? _g : {})));
    var _o = priceConfig.showPopover, showPopover = _o === void 0 ? true : _o;
    var customPopoverProps = (_h = priceConfig.popoverProps) !== null && _h !== void 0 ? _h : popoverProps;
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["price-item-content"], ["price-item-content"]))), (_b = {},
            _b[cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["price-item-content-green"], ["price-item-content-green"])))] = isRefund,
            _b)), "data-cy": testId.priceNodeContent, "data-testid": testId.priceNodeContent },
        React.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["price-item-content-symbol"], ["price-item-content-symbol"]))) }, monetaryUnit),
        React.createElement("span", { className: classNames((_c = {},
                _c[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["price-item-content-total"], ["price-item-content-total"])))] = true,
                _c[cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["price-item-content-no-total"], ["price-item-content-no-total"])))] = !isValid,
                _c)) }, totalPrice),
        monetaryCode ? React.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["price-item-content-code"], ["price-item-content-code"]))) }, monetaryCode) : null,
        isValid ? (React.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["price-item-content-unit"], ["price-item-content-unit"]))) }, priceConfig.unit ? "/".concat(priceConfig.unit) : '')) : null,
        showPopover ? (React.createElement(Popover, __assign({ title: React.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["price-item-content-popover-title"], ["price-item-content-popover-title"]))) },
                React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["price-item-content-popover-title-title"], ["price-item-content-popover-title-title"]))) }, (_j = priceConfig.detailTitle) !== null && _j !== void 0 ? _j : locale.CFeeCalculator.detailTitle),
                React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["price-item-content-popover-title-desc"], ["price-item-content-popover-title-desc"]))) }, (_k = priceConfig.detailDesc) !== null && _k !== void 0 ? _k : locale.CFeeCalculator.detailDescription)), style: __assign({ maxWidth: 900 }, customPopoverProps === null || customPopoverProps === void 0 ? void 0 : customPopoverProps.style), className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["price-item-content-popover"], ["price-item-content-popover"]))), content: ((_l = priceConfig.detailList) === null || _l === void 0 ? void 0 : _l.length) ? (React.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["price-item-content-popover-table-container"], ["price-item-content-popover-table-container"]))) },
                React.createElement(CTable, __assign({ config: config, "data-testid": testId.popoverTable, "data-cy": testId.popoverTable }, omit(priceConfig.cTableProps, 'config'))))) : (React.createElement(Empty, { style: { textAlign: 'center' } })) }, customPopoverProps),
            React.createElement(IconQuestionCircle, { className: cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["price-item-content-popover-icon"], ["price-item-content-popover-icon"]))) }))) : null));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=PriceNodeTotal.js.map