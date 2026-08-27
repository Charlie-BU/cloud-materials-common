"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRadio = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var BtnSelector_1 = require("../_components/BtnSelector");
var CConfigProvider_1 = require("../CConfigProvider");
var utils_1 = require("./utils");
var context_1 = tslib_1.__importDefault(require("./context"));
var util_1 = require("../_components/BtnSelector/util");
var lodash_es_1 = require("lodash-es");
function InnerCRadio(props, ref) {
    var _a, _b;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var groupConfigContext = (0, react_1.useContext)(context_1.default);
    var _c = groupConfigContext.textLineType, textLineType = _c === void 0 ? 'single' : _c, _d = groupConfigContext.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, iconLayout = groupConfigContext.iconLayout, widthSize = groupConfigContext.widthSize, _e = groupConfigContext.heightSize, heightSize = _e === void 0 ? 'default' : _e, _f = groupConfigContext.radioProps, radioProps = _f === void 0 ? {} : _f, _g = groupConfigContext.type, type = _g === void 0 ? 'button' : _g;
    var radioPropsStyle = radioProps.style, radioPropsClass = radioProps.className, restRadioProps = tslib_1.__rest(radioProps, ["style", "className"]);
    // CRadio特有样式
    var prefixCls = useCssPrefix('radio');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var tag = props.tag, CTagProps = props.CTagProps, children = props.children, className = props.className, style = props.style, arcoPopoverProps = props.arcoPopoverProps, restProps = tslib_1.__rest(props, ["tag", "CTagProps", "children", "className", "style", "arcoPopoverProps"]);
    // @ts-ignore
    var option = props === null || props === void 0 ? void 0 : props['data-inner-option'];
    var getBtnDataCy = (0, util_1.getBtnDataSuffix)({ props: props });
    // 可以通过传入函数类型的 children 来自定义渲染单选节点。
    var isCustomRender = (0, lodash_es_1.isFunction)(children);
    return (react_1.default.createElement("div", { ref: ref, "data-cy": getBtnDataCy(utils_1.testId.cRadioContainer), "data-testid": getBtnDataCy(utils_1.testId.cRadioContainer), className: (0, classnames_1.default)(btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["badge-container"], ["badge-container"]))), prefixCls(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["badge-container"], ["badge-container"])))) },
        !isCustomRender ? react_1.default.createElement(BtnSelector_1.BtnBadge, { tag: tag, CTagProps: CTagProps }) : null,
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ disabled: !arcoPopoverProps }, arcoPopoverProps),
            react_1.default.createElement("span", { className: (0, classnames_1.default)((_a = {},
                    _a[prefixCls(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["popover-inner"], ["popover-inner"])))] = !isCustomRender,
                    _a[prefixCls(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["popover-inner-button"], ["popover-inner-button"])))] = !isCustomRender && type === 'button',
                    _a)) },
                react_1.default.createElement(web_react_1.Radio, tslib_1.__assign({ className: (0, classnames_1.default)((_b = {},
                        _b[btnSelectorCommonPrefixCls(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["doubleline-item"], ["doubleline-item"])))] = !isCustomRender && textLineType === 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["singleline-item"], ["singleline-item"])))] = !isCustomRender && textLineType !== 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["item"], ["item"])))] = !isCustomRender,
                        _b), radioPropsClass, className), style: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (typeof widthSize === 'number' ? { width: widthSize } : {})), (typeof heightSize === 'number' ? { height: heightSize } : {})), radioPropsStyle), style) }, restProps, restRadioProps, { "data-cy": getBtnDataCy(utils_1.testId.arcoRadioContainer), "data-testid": getBtnDataCy(utils_1.testId.arcoRadioContainer) }), !isCustomRender ? (react_1.default.createElement(BtnSelector_1.BtnSelectorContent, { option: option, textLineType: textLineType, iconLayout: iconLayout, horizontalLayout: horizontalLayout }, children)) : (function (_a) {
                    var checked = _a.checked;
                    return children({ checked: checked });
                }))))));
}
exports.CRadio = react_1.default.forwardRef(InnerCRadio);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=CRadio.js.map