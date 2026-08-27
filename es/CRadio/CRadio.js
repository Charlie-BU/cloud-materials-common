import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useContext } from 'react';
import { Popover, Radio } from '@arco-design/web-react';
import classNames from 'classnames';
import { BtnSelectorContent, BtnBadge } from '../_components/BtnSelector';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import GroupConfigContext from './context';
import { getBtnDataSuffix } from '../_components/BtnSelector/util';
import { isFunction } from 'lodash-es';
function InnerCRadio(props, ref) {
    var _a, _b;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var groupConfigContext = useContext(GroupConfigContext);
    var _c = groupConfigContext.textLineType, textLineType = _c === void 0 ? 'single' : _c, _d = groupConfigContext.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, iconLayout = groupConfigContext.iconLayout, widthSize = groupConfigContext.widthSize, _e = groupConfigContext.heightSize, heightSize = _e === void 0 ? 'default' : _e, _f = groupConfigContext.radioProps, radioProps = _f === void 0 ? {} : _f, _g = groupConfigContext.type, type = _g === void 0 ? 'button' : _g;
    var radioPropsStyle = radioProps.style, radioPropsClass = radioProps.className, restRadioProps = __rest(radioProps, ["style", "className"]);
    // CRadio特有样式
    var prefixCls = useCssPrefix('radio');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var tag = props.tag, CTagProps = props.CTagProps, children = props.children, className = props.className, style = props.style, arcoPopoverProps = props.arcoPopoverProps, restProps = __rest(props, ["tag", "CTagProps", "children", "className", "style", "arcoPopoverProps"]);
    // @ts-ignore
    var option = props === null || props === void 0 ? void 0 : props['data-inner-option'];
    var getBtnDataCy = getBtnDataSuffix({ props: props });
    // 可以通过传入函数类型的 children 来自定义渲染单选节点。
    var isCustomRender = isFunction(children);
    return (React.createElement("div", { ref: ref, "data-cy": getBtnDataCy(testId.cRadioContainer), "data-testid": getBtnDataCy(testId.cRadioContainer), className: classNames(btnSelectorCommonPrefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject(["badge-container"], ["badge-container"]))), prefixCls(templateObject_2 || (templateObject_2 = __makeTemplateObject(["badge-container"], ["badge-container"])))) },
        !isCustomRender ? React.createElement(BtnBadge, { tag: tag, CTagProps: CTagProps }) : null,
        React.createElement(Popover, __assign({ disabled: !arcoPopoverProps }, arcoPopoverProps),
            React.createElement("span", { className: classNames((_a = {},
                    _a[prefixCls(templateObject_3 || (templateObject_3 = __makeTemplateObject(["popover-inner"], ["popover-inner"])))] = !isCustomRender,
                    _a[prefixCls(templateObject_4 || (templateObject_4 = __makeTemplateObject(["popover-inner-button"], ["popover-inner-button"])))] = !isCustomRender && type === 'button',
                    _a)) },
                React.createElement(Radio, __assign({ className: classNames((_b = {},
                        _b[btnSelectorCommonPrefixCls(templateObject_5 || (templateObject_5 = __makeTemplateObject(["doubleline-item"], ["doubleline-item"])))] = !isCustomRender && textLineType === 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = __makeTemplateObject(["singleline-item"], ["singleline-item"])))] = !isCustomRender && textLineType !== 'double',
                        _b[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = __makeTemplateObject(["item"], ["item"])))] = !isCustomRender,
                        _b), radioPropsClass, className), style: __assign(__assign(__assign(__assign({}, (typeof widthSize === 'number' ? { width: widthSize } : {})), (typeof heightSize === 'number' ? { height: heightSize } : {})), radioPropsStyle), style) }, restProps, restRadioProps, { "data-cy": getBtnDataCy(testId.arcoRadioContainer), "data-testid": getBtnDataCy(testId.arcoRadioContainer) }), !isCustomRender ? (React.createElement(BtnSelectorContent, { option: option, textLineType: textLineType, iconLayout: iconLayout, horizontalLayout: horizontalLayout }, children)) : (function (_a) {
                    var checked = _a.checked;
                    return children({ checked: checked });
                }))))));
}
export var CRadio = React.forwardRef(InnerCRadio);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=CRadio.js.map