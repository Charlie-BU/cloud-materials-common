import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext } from 'react';
import { Checkbox, Popover } from '@arco-design/web-react';
import classNames from 'classnames';
import { BtnSelectorContent, BtnBadge } from '../_components/BtnSelector';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import { GroupConfigContext } from './context';
import { getBtnDataSuffix } from '../_components/BtnSelector/util';
import { isFunction } from 'lodash-es';
function InnerCheckbox(props, ref) {
    var _a, _b;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var groupConfigContext = useContext(GroupConfigContext);
    var _c = groupConfigContext.textLineType, textLineType = _c === void 0 ? 'single' : _c, _d = groupConfigContext.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, iconLayout = groupConfigContext.iconLayout, widthSize = groupConfigContext.widthSize, _e = groupConfigContext.heightSize, heightSize = _e === void 0 ? 'default' : _e, _f = groupConfigContext.checkboxProps, checkboxProps = _f === void 0 ? {} : _f;
    var checkboxPropsStyle = checkboxProps.style, checkboxPropsClass = checkboxProps.className, restCheckboxProps = __rest(checkboxProps, ["style", "className"]);
    // CCheckbox特有样式
    var prefixCls = useCssPrefix('checkbox');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var tag = props.tag, CTagProps = props.CTagProps, children = props.children, className = props.className, style = props.style, arcoPopoverProps = props.arcoPopoverProps, restProps = __rest(props, ["tag", "CTagProps", "children", "className", "style", "arcoPopoverProps"]);
    // @ts-ignore
    var option = props === null || props === void 0 ? void 0 : props['data-inner-option'];
    var getBtnDataCy = getBtnDataSuffix({ props: props });
    // 可以通过传入函数类型的 children 来自定义渲染单选节点。
    var isCustomRender = isFunction(children);
    return (React.createElement("div", { ref: ref, "data-cy": getBtnDataCy(testId.cCheckboxContainer), "data-testid": getBtnDataCy(testId.cCheckboxContainer), className: classNames(btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject(["badge-container"], ["badge-container"]))), prefixCls(templateObject_2 || (templateObject_2 = __makeTemplateObject(["badge-container"], ["badge-container"])))) },
        !isCustomRender ? React.createElement(BtnBadge, { tag: tag, CTagProps: CTagProps }) : null,
        React.createElement(Popover, __assign({ disabled: !arcoPopoverProps }, arcoPopoverProps),
            React.createElement("span", { className: classNames((_a = {}, _a[prefixCls(templateObject_3 || (templateObject_3 = __makeTemplateObject(["popover-inner"], ["popover-inner"])))] = !isCustomRender, _a)) },
                React.createElement(Checkbox, __assign({ className: classNames((_b = {},
                        _b[prefixCls(templateObject_4 || (templateObject_4 = __makeTemplateObject(["doubleline-checkbox"], ["doubleline-checkbox"])))] = !isCustomRender && textLineType === 'double',
                        _b[prefixCls(templateObject_5 || (templateObject_5 = __makeTemplateObject(["singleline-checkbox"], ["singleline-checkbox"])))] = !isCustomRender && textLineType !== 'double',
                        _b[prefixCls(templateObject_6 || (templateObject_6 = __makeTemplateObject(["height-size"], ["height-size"])))] = !isCustomRender,
                        _b[prefixCls(templateObject_7 || (templateObject_7 = __makeTemplateObject(["height-size-small"], ["height-size-small"])))] = !isCustomRender && heightSize === 'small',
                        _b[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = __makeTemplateObject(["doubleline-item"], ["doubleline-item"])))] = !isCustomRender && textLineType === 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_9 || (templateObject_9 = __makeTemplateObject(["singleline-item"], ["singleline-item"])))] = !isCustomRender && textLineType !== 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_10 || (templateObject_10 = __makeTemplateObject(["item"], ["item"])))] = !isCustomRender,
                        _b[prefixCls(templateObject_11 || (templateObject_11 = __makeTemplateObject(["cover-render"], ["cover-render"])))] = !isCustomRender,
                        _b), checkboxPropsClass, className), style: __assign(__assign(__assign(__assign({}, (typeof widthSize === 'number' ? { width: widthSize } : {})), (typeof heightSize === 'number' ? { height: heightSize } : {})), checkboxPropsStyle), style) }, restProps, restCheckboxProps, { "data-cy": getBtnDataCy(testId.arcoCheckboxContainer), "data-testid": getBtnDataCy(testId.arcoCheckboxContainer) }), !isCustomRender ? (React.createElement(BtnSelectorContent, { option: option, textLineType: textLineType, iconLayout: iconLayout, horizontalLayout: horizontalLayout }, children)) : (function (_a) {
                    var checked = _a.checked;
                    return children({ checked: checked });
                }))))));
}
export var CCheckbox = React.forwardRef(InnerCheckbox);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=CCheckbox.js.map