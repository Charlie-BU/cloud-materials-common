"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCheckbox = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var BtnSelector_1 = require("../_components/BtnSelector");
var CConfigProvider_1 = require("../CConfigProvider");
var utils_1 = require("./utils");
var context_1 = require("./context");
var util_1 = require("../_components/BtnSelector/util");
var lodash_es_1 = require("lodash-es");
function InnerCheckbox(props, ref) {
    var _a, _b;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var groupConfigContext = (0, react_1.useContext)(context_1.GroupConfigContext);
    var _c = groupConfigContext.textLineType, textLineType = _c === void 0 ? 'single' : _c, _d = groupConfigContext.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, iconLayout = groupConfigContext.iconLayout, widthSize = groupConfigContext.widthSize, _e = groupConfigContext.heightSize, heightSize = _e === void 0 ? 'default' : _e, _f = groupConfigContext.checkboxProps, checkboxProps = _f === void 0 ? {} : _f;
    var checkboxPropsStyle = checkboxProps.style, checkboxPropsClass = checkboxProps.className, restCheckboxProps = tslib_1.__rest(checkboxProps, ["style", "className"]);
    // CCheckbox特有样式
    var prefixCls = useCssPrefix('checkbox');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var tag = props.tag, CTagProps = props.CTagProps, children = props.children, className = props.className, style = props.style, arcoPopoverProps = props.arcoPopoverProps, restProps = tslib_1.__rest(props, ["tag", "CTagProps", "children", "className", "style", "arcoPopoverProps"]);
    // @ts-ignore
    var option = props === null || props === void 0 ? void 0 : props['data-inner-option'];
    var getBtnDataCy = (0, util_1.getBtnDataSuffix)({ props: props });
    // 可以通过传入函数类型的 children 来自定义渲染单选节点。
    var isCustomRender = (0, lodash_es_1.isFunction)(children);
    return (react_1.default.createElement("div", { ref: ref, "data-cy": getBtnDataCy(utils_1.testId.cCheckboxContainer), "data-testid": getBtnDataCy(utils_1.testId.cCheckboxContainer), className: (0, classnames_1.default)(btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["badge-container"], ["badge-container"]))), prefixCls(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["badge-container"], ["badge-container"])))) },
        !isCustomRender ? react_1.default.createElement(BtnSelector_1.BtnBadge, { tag: tag, CTagProps: CTagProps }) : null,
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ disabled: !arcoPopoverProps }, arcoPopoverProps),
            react_1.default.createElement("span", { className: (0, classnames_1.default)((_a = {}, _a[prefixCls(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["popover-inner"], ["popover-inner"])))] = !isCustomRender, _a)) },
                react_1.default.createElement(web_react_1.Checkbox, tslib_1.__assign({ className: (0, classnames_1.default)((_b = {},
                        _b[prefixCls(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["doubleline-checkbox"], ["doubleline-checkbox"])))] = !isCustomRender && textLineType === 'double',
                        _b[prefixCls(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["singleline-checkbox"], ["singleline-checkbox"])))] = !isCustomRender && textLineType !== 'double',
                        _b[prefixCls(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["height-size"], ["height-size"])))] = !isCustomRender,
                        _b[prefixCls(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["height-size-small"], ["height-size-small"])))] = !isCustomRender && heightSize === 'small',
                        _b[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["doubleline-item"], ["doubleline-item"])))] = !isCustomRender && textLineType === 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["singleline-item"], ["singleline-item"])))] = !isCustomRender && textLineType !== 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["item"], ["item"])))] = !isCustomRender,
                        _b[prefixCls(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["cover-render"], ["cover-render"])))] = !isCustomRender,
                        _b), checkboxPropsClass, className), style: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (typeof widthSize === 'number' ? { width: widthSize } : {})), (typeof heightSize === 'number' ? { height: heightSize } : {})), checkboxPropsStyle), style) }, restProps, restCheckboxProps, { "data-cy": getBtnDataCy(utils_1.testId.arcoCheckboxContainer), "data-testid": getBtnDataCy(utils_1.testId.arcoCheckboxContainer) }), !isCustomRender ? (react_1.default.createElement(BtnSelector_1.BtnSelectorContent, { option: option, textLineType: textLineType, iconLayout: iconLayout, horizontalLayout: horizontalLayout }, children)) : (function (_a) {
                    var checked = _a.checked;
                    return children({ checked: checked });
                }))))));
}
exports.CCheckbox = react_1.default.forwardRef(InnerCheckbox);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=CCheckbox.js.map