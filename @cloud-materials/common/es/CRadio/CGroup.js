import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Radio } from '@arco-design/web-react';
import classNames from 'classnames';
import { maxBy, isObject, isArray } from 'lodash-es';
import { renderValidChildren } from '../_utils/renderValidChildren';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import GroupConfigContext from './context';
import { CRadio } from './CRadio';
var Group = Radio.Group;
export var CGroup = function (props) {
    var _a;
    var className = props.className, _b = props.textLineType, textLineType = _b === void 0 ? 'single' : _b, _c = props.type, type = _c === void 0 ? 'button' : _c, heightSize = props.heightSize, widthSizeInProp = props.widthSize, autoWidth = props.autoWidth, disabled = props.disabled, options = props.options, checkedStyle = props.checkedStyle, _d = props.iconLayout, iconLayout = _d === void 0 ? 'left' : _d, _e = props.horizontalLayout, horizontalLayout = _e === void 0 ? 'center' : _e, radioProps = props.radioProps, restProps = __rest(props, ["className", "textLineType", "type", "heightSize", "widthSize", "autoWidth", "disabled", "options", "checkedStyle", "iconLayout", "horizontalLayout", "radioProps"]);
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var isButtonRadio = type === 'button';
    // CRadio特有样式
    var prefixCls = useCssPrefix('radio');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    // 宽度
    var _f = __read(useState(widthSizeInProp), 2), widthSize = _f[0], setWidthSize = _f[1];
    // Group组件接收的配置
    var contextValue = useMemo(function () {
        return {
            textLineType: textLineType,
            radioProps: radioProps,
            horizontalLayout: horizontalLayout,
            iconLayout: iconLayout,
            widthSize: widthSize,
            heightSize: heightSize,
            type: type,
        };
    }, [widthSize, heightSize, textLineType, radioProps, horizontalLayout, iconLayout, type]);
    var RadioListRef = useRef([]);
    useEffect(function () {
        var _a;
        if (autoWidth === 'groupAdaptive') {
            var maxLength = (_a = maxBy(RadioListRef.current, function (item) { return item.offsetWidth; })) === null || _a === void 0 ? void 0 : _a.offsetWidth;
            if (maxLength && maxLength > 0)
                setWidthSize(maxLength);
        }
    }, [autoWidth]);
    var cs = classNames(prefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), prefixCls(templateObject_2 || (templateObject_2 = __makeTemplateObject(["group"], ["group"]))), (_a = {},
        _a[btnSelectorCommonPrefixCls(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])))] = isButtonRadio,
        _a[prefixCls(templateObject_4 || (templateObject_4 = __makeTemplateObject(["checked-style-", ""], ["checked-style-", ""])), checkedStyle)] = isButtonRadio && !!checkedStyle,
        _a[btnSelectorCommonPrefixCls(templateObject_5 || (templateObject_5 = __makeTemplateObject(["height-size"], ["height-size"])))] = isButtonRadio,
        _a[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = __makeTemplateObject(["height-size-small"], ["height-size-small"])))] = isButtonRadio && heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = __makeTemplateObject(["width-size"], ["width-size"])))] = isButtonRadio,
        _a[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = __makeTemplateObject(["width-size-", ""], ["width-size-", ""])), widthSize)] = isButtonRadio && !!widthSize && typeof widthSize === 'string',
        _a), className);
    return (React.createElement(GroupConfigContext.Provider, { value: contextValue },
        React.createElement(Group, __assign({}, restProps, { type: type, disabled: disabled, className: cs, "data-cy": testId.groupContainer, "data-testid": testId.groupContainer }), options && isArray(options)
            ? options.map(function (optionItem, index) {
                var option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
                return (React.createElement(CRadio, { ref: function (dom) { return RadioListRef.current.push(dom); }, key: option.value, "data-inner-option": optionItem, "data-inner-index": index, disabled: option.disabled || disabled, value: option.value, tag: option.tag, CTagProps: option.CTagProps, arcoPopoverProps: option.arcoPopoverProps }));
            })
            : renderValidChildren(props.children, {
                ref: function (dom) { return RadioListRef.current.push(dom); },
            }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=CGroup.js.map