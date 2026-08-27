"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtnSelectorContent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var CEllipsis_1 = tslib_1.__importDefault(require("../../CEllipsis"));
var CConfigProvider_1 = require("../../CConfigProvider");
// 分段选择器（CRadio和CCheckbox）的公共内容区组件
// 负责处理CRadio的children或者option
var BtnSelectorContent = function (props) {
    var _a;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var prefixCls = useCssPrefix('btn-selector-content');
    var textLineType = props.textLineType, option = props.option, _b = props.iconLayout, iconLayout = _b === void 0 ? 'left' : _b, _c = props.horizontalLayout, horizontalLayout = _c === void 0 ? 'center' : _c, children = props.children;
    var mergedOption = !option || (0, lodash_es_1.isObject)(option) ? option : { label: option, value: option };
    var _d = (mergedOption !== null && mergedOption !== void 0 ? mergedOption : {}), icon = _d.icon, label = _d.label, description = _d.description;
    var labelRender = !option ? children : react_1.default.createElement(CEllipsis_1.default, null, !(0, lodash_es_1.isUndefined)(label) ? label : null);
    var isDoubleTextLineType = textLineType === 'double';
    var textLineTypePrefix = textLineType === 'double' ? 'doubleline' : 'singleline';
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)((_a = {},
            _a[prefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"])))] = true,
            _a[prefixCls(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["iconLayout-right"], ["iconLayout-right"])))] = iconLayout === 'right',
            _a[prefixCls(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["horizontalLayout-stretch"], ["horizontalLayout-stretch"])))] = horizontalLayout === 'stretch',
            _a)) },
        react_1.default.createElement("div", { className: prefixCls(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), textLineTypePrefix) },
            react_1.default.createElement("div", { className: prefixCls(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["", "-container"], ["", "-container"])), textLineTypePrefix) },
                icon ? react_1.default.createElement("span", { className: prefixCls(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["", "-icon"], ["", "-icon"])), textLineTypePrefix) }, icon) : null,
                react_1.default.createElement("div", { className: prefixCls(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["", "-content"], ["", "-content"])), textLineTypePrefix) }, isDoubleTextLineType ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: prefixCls(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["doubleline-content-label"], ["doubleline-content-label"]))) }, labelRender),
                    react_1.default.createElement("div", { className: prefixCls(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["doubleline-content-description"], ["doubleline-content-description"]))) }, description))) : (labelRender))))));
};
exports.BtnSelectorContent = BtnSelectorContent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=BtnSelectorContent.js.map