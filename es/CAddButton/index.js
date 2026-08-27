import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useRef, useState } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconDown, IconPlus } from '@arco-design/iconbox-react-ve-o-design';
import { Dropdown, Popover } from '@arco-design/web-react';
import { useHover } from 'ahooks';
import { useCConfigContext } from '../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('add-button');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["popover"], ["popover"]))),
    dropdown: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["dropdown"], ["dropdown"]))),
    button: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["button"], ["button"]))),
    addIcon: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["add-icon"], ["add-icon"]))),
    text: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["text"], ["text"]))),
    dropdownIcon: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["dropdown-icon"], ["dropdown-icon"]))),
};
var CAddButton = function (props) {
    var type = props.type, onClick = props.onClick, text = props.text, _a = props.enableAddCount, enableAddCount = _a === void 0 ? Number.MAX_SAFE_INTEGER : _a, _b = props.showEnableAddTips, showEnableAddTips = _b === void 0 ? false : _b, customTips = props.customTips, _c = props.disabled, disabled = _c === void 0 ? false : _c, popoverContent = props.popoverContent, dropdownList = props.dropdownList, _d = props.arcoPopoverProps, arcoPopoverProps = _d === void 0 ? {} : _d, _e = props.arcoDropdownProps, arcoDropdownProps = _e === void 0 ? {} : _e, style = props.style, className = props.className, _f = props.htmlType, htmlType = _f === void 0 ? 'button' : _f, basicProps = __rest(props, ["type", "onClick", "text", "enableAddCount", "showEnableAddTips", "customTips", "disabled", "popoverContent", "dropdownList", "arcoPopoverProps", "arcoDropdownProps", "style", "className", "htmlType"]);
    var btnRef = useRef(null);
    var isHovering = useHover(btnRef);
    var _g = __read(useState(false), 2), isActive = _g[0], setIsActive = _g[1];
    // 按钮的disabled状态
    var btnDisabled = disabled || !enableAddCount;
    var dashedDisabled = btnDisabled && type === 'dashed';
    // 下拉属性的渲染
    var showDropdownIcon = dropdownList || (arcoDropdownProps === null || arcoDropdownProps === void 0 ? void 0 : arcoDropdownProps.droplist);
    dropdownList && Object.assign(arcoDropdownProps, { droplist: dropdownList });
    // 防止popover属性为空时展示空气泡框
    var popoverDisabled = !popoverContent && !(arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.content);
    popoverContent && Object.assign(arcoPopoverProps, { content: popoverContent });
    /** showEnableAddTips或者传入customTips时都可展示tips，自定义tips优先级高 */
    var showTips = showEnableAddTips || Boolean(customTips);
    var _h = useCConfigContext(), locale = _h.locale, formatLocale = _h.formatLocale, useCssPrefix = _h.useCssPrefix;
    var cssPrefix = useCssPrefix('add-button');
    var defaultTips = formatLocale(locale.CAddButton.defaultTips, { enableAddCount: enableAddCount });
    return (React.createElement("div", __assign({ style: style, className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject([""], [""]))), cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["", "-container"], ["", "-container"])), type), dashedDisabled && cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["dashed-container-disabled"], ["dashed-container-disabled"]))), className), "data-cy": testId.container }, basicProps),
        React.createElement(Popover, __assign({ disabled: popoverDisabled }, arcoPopoverProps, { "data-cy": testId.popover }),
            React.createElement(Dropdown, __assign({}, arcoDropdownProps, { disabled: btnDisabled, "data-cy": testId.dropdown }),
                React.createElement("button", { type: htmlType, ref: btnRef, onClick: function () {
                        onClick === null || onClick === void 0 ? void 0 : onClick();
                        setIsActive(false);
                    }, className: classNames(cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["btn"], ["btn"]))), cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["", ""], ["", ""])), type), isHovering && cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["", "-hover"], ["", "-hover"])), type), isActive && cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["", "-active"], ["", "-active"])), type)), "data-cy": testId.button, "data-testid": testId.button, onMouseDown: function () { return setIsActive(true); } },
                    React.createElement("span", { className: classNames(cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["btn-icon"], ["btn-icon"]))), cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["", "-icon"], ["", "-icon"])), type)), "data-cy": testId.addIcon },
                        React.createElement(IconPlus, null)),
                    text && (React.createElement("span", { className: classNames(cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["btn-text"], ["btn-text"]))), cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["", "-text"], ["", "-text"])), type)), "data-cy": testId.text }, text)),
                    showDropdownIcon && (React.createElement("span", { className: classNames(cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["btn-drop-icon"], ["btn-drop-icon"]))), cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["", "-drop-icon"], ["", "-drop-icon"])), type)), "data-cy": testId.dropdownIcon },
                        React.createElement(IconDown, null)))))),
        showTips && type !== 'dashed' && React.createElement("span", { className: cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["tips"], ["tips"]))) }, customTips || defaultTips)));
};
CAddButton.displayName = 'CAddButton';
export default CAddButton;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=index.js.map