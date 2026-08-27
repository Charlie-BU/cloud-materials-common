"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtnBadge = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CTag_1 = tslib_1.__importDefault(require("../../CTag"));
var CConfigProvider_1 = require("../../CConfigProvider");
var lodash_es_1 = require("lodash-es");
// 分段选择器（CRadio和CCheckbox）公共的角标
var BtnBadge = function (props) {
    var tag = props.tag, CTagProps = props.CTagProps;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    return (react_1.default.createElement(react_1.default.Fragment, null, !!tag ? (react_1.default.createElement("span", { className: btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["badge"], ["badge"]))) },
        react_1.default.createElement(CTag_1.default, tslib_1.__assign({}, (0, lodash_es_1.omit)(CTagProps, 'style'), { shape: "mark", size: "large", style: tslib_1.__assign(tslib_1.__assign({}, CTagProps === null || CTagProps === void 0 ? void 0 : CTagProps.style), { transformOrigin: 'top right' }) }), tag))) : null));
};
exports.BtnBadge = BtnBadge;
var templateObject_1;
//# sourceMappingURL=BtnBadge.js.map