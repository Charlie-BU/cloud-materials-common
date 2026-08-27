"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceNodeTotal = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var testId_1 = require("../utils/testId");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var CTable_1 = tslib_1.__importDefault(require("../../CTable"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var prefix_1 = require("../utils/prefix");
var PriceNodeTotal = function (_a) {
    var _b, _c;
    var _d, _e, _f, _g, _h, _j, _k, _l;
    var priceConfig = _a.priceConfig, popoverProps = _a.popoverProps, priceDetail = _a.priceDetail, monetaryUnit = _a.monetaryUnit, monetaryCode = _a.monetaryCode;
    var isRefund = priceDetail.isRefund, isValid = priceDetail.isValid, totalPrice = priceDetail.totalPrice;
    var _m = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _m.useCssPrefix, locale = _m.locale;
    var cssPrefix = useCssPrefix(prefix_1.feePrefix);
    var config = CTable_1.default.getConfig(tslib_1.__assign({ arcoTableProps: {
            border: true,
            size: 'small',
        }, pagination: false, columns: (_d = priceConfig.columns) !== null && _d !== void 0 ? _d : [], data: (_e = priceConfig.detailList) !== null && _e !== void 0 ? _e : [] }, ((_g = (_f = priceConfig.cTableProps) === null || _f === void 0 ? void 0 : _f.config) !== null && _g !== void 0 ? _g : {})));
    var _o = priceConfig.showPopover, showPopover = _o === void 0 ? true : _o;
    var customPopoverProps = (_h = priceConfig.popoverProps) !== null && _h !== void 0 ? _h : popoverProps;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["price-item-content"], ["price-item-content"]))), (_b = {},
            _b[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["price-item-content-green"], ["price-item-content-green"])))] = isRefund,
            _b)), "data-cy": testId_1.testId.priceNodeContent, "data-testid": testId_1.testId.priceNodeContent },
        react_1.default.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["price-item-content-symbol"], ["price-item-content-symbol"]))) }, monetaryUnit),
        react_1.default.createElement("span", { className: (0, classnames_1.default)((_c = {},
                _c[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["price-item-content-total"], ["price-item-content-total"])))] = true,
                _c[cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["price-item-content-no-total"], ["price-item-content-no-total"])))] = !isValid,
                _c)) }, totalPrice),
        monetaryCode ? react_1.default.createElement("span", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["price-item-content-code"], ["price-item-content-code"]))) }, monetaryCode) : null,
        isValid ? (react_1.default.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["price-item-content-unit"], ["price-item-content-unit"]))) }, priceConfig.unit ? "/".concat(priceConfig.unit) : '')) : null,
        showPopover ? (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ title: react_1.default.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["price-item-content-popover-title"], ["price-item-content-popover-title"]))) },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["price-item-content-popover-title-title"], ["price-item-content-popover-title-title"]))) }, (_j = priceConfig.detailTitle) !== null && _j !== void 0 ? _j : locale.CFeeCalculator.detailTitle),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["price-item-content-popover-title-desc"], ["price-item-content-popover-title-desc"]))) }, (_k = priceConfig.detailDesc) !== null && _k !== void 0 ? _k : locale.CFeeCalculator.detailDescription)), style: tslib_1.__assign({ maxWidth: 900 }, customPopoverProps === null || customPopoverProps === void 0 ? void 0 : customPopoverProps.style), className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["price-item-content-popover"], ["price-item-content-popover"]))), content: ((_l = priceConfig.detailList) === null || _l === void 0 ? void 0 : _l.length) ? (react_1.default.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["price-item-content-popover-table-container"], ["price-item-content-popover-table-container"]))) },
                react_1.default.createElement(CTable_1.default, tslib_1.__assign({ config: config, "data-testid": testId_1.testId.popoverTable, "data-cy": testId_1.testId.popoverTable }, (0, lodash_es_1.omit)(priceConfig.cTableProps, 'config'))))) : (react_1.default.createElement(web_react_1.Empty, { style: { textAlign: 'center' } })) }, customPopoverProps),
            react_1.default.createElement(icon_1.IconQuestionCircle, { className: cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["price-item-content-popover-icon"], ["price-item-content-popover-icon"]))) }))) : null));
};
exports.PriceNodeTotal = PriceNodeTotal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=PriceNodeTotal.js.map