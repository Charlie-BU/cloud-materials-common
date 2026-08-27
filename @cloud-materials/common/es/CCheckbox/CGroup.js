import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import { Checkbox } from '@arco-design/web-react';
import classNames from 'classnames';
import { maxBy, isObject, isArray } from 'lodash-es';
import { renderValidChildren } from '../_utils/renderValidChildren';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import { GroupConfigContext } from './context';
import { CCheckbox } from './CCheckbox';
var Group = Checkbox.Group;
export var CGroup = function (props) {
    var _a;
    var className = props.className, _b = props.textLineType, textLineType = _b === void 0 ? 'single' : _b, heightSize = props.heightSize, widthSizeInProp = props.widthSize, autoWidth = props.autoWidth, disabled = props.disabled, options = props.options, checkboxProps = props.checkboxProps, _c = props.iconLayout, iconLayout = _c === void 0 ? 'left' : _c, _d = props.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, restProps = __rest(props, ["className", "textLineType", "heightSize", "widthSize", "autoWidth", "disabled", "options", "checkboxProps", "iconLayout", "horizontalLayout"]);
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    // CCheckbox特有样式
    var prefixCls = useCssPrefix('checkbox');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var _e = __read(useState(widthSizeInProp), 2), widthSize = _e[0], setWidthSize = _e[1];
    // Group组件接收的配置
    var contextValue = useMemo(function () {
        return {
            textLineType: textLineType,
            checkboxProps: checkboxProps,
            horizontalLayout: horizontalLayout,
            iconLayout: iconLayout,
            widthSize: widthSize,
            heightSize: heightSize,
        };
    }, [widthSize, heightSize, textLineType, checkboxProps, horizontalLayout, iconLayout]);
    var CheckboxListRef = useRef([]);
    useEffect(function () {
        var _a;
        if (autoWidth === 'groupAdaptive') {
            var maxLength = (_a = maxBy(CheckboxListRef.current, function (item) { return item.offsetWidth; })) === null || _a === void 0 ? void 0 : _a.offsetWidth;
            if (maxLength && maxLength > 0)
                setWidthSize(maxLength);
        }
    }, [autoWidth]);
    var cs = classNames(prefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), prefixCls(templateObject_2 || (templateObject_2 = __makeTemplateObject(["group"], ["group"]))), btnSelectorCommonPrefixCls(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))), (_a = {},
        _a[prefixCls(templateObject_4 || (templateObject_4 = __makeTemplateObject(["height-size"], ["height-size"])))] = true,
        _a[prefixCls(templateObject_5 || (templateObject_5 = __makeTemplateObject(["height-size-small"], ["height-size-small"])))] = heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = __makeTemplateObject(["height-size"], ["height-size"])))] = true,
        _a[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = __makeTemplateObject(["height-size-small"], ["height-size-small"])))] = heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = __makeTemplateObject(["width-size"], ["width-size"])))] = true,
        _a[btnSelectorCommonPrefixCls(templateObject_9 || (templateObject_9 = __makeTemplateObject(["width-size-", ""], ["width-size-", ""])), widthSize)] = !!widthSize && typeof widthSize === 'string',
        _a), className);
    return (React.createElement(GroupConfigContext.Provider, { value: contextValue },
        React.createElement("div", { "data-cy": testId.groupContainer, "data-testid": testId.groupContainer, className: cs },
            React.createElement(Group, __assign({ disabled: disabled }, restProps), options && isArray(options)
                ? options.map(function (optionItem, index) {
                    var option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
                    return (React.createElement(CCheckbox
                    // 仅通过Group的option属性来配置多选组时，才能支持同组内自适应
                    , { 
                        // 仅通过Group的option属性来配置多选组时，才能支持同组内自适应
                        ref: function (dom) { return CheckboxListRef.current.push(dom); }, key: option.value, "data-inner-index": index, "data-inner-option": optionItem, disabled: option.disabled || disabled, value: option.value, tag: option.tag, CTagProps: option.CTagProps, arcoPopoverProps: option.arcoPopoverProps }));
                })
                : renderValidChildren(props.children, {
                    ref: function (dom) { return CheckboxListRef.current.push(dom); },
                })))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=CGroup.js.map