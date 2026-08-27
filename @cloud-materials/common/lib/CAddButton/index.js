"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var ahooks_1 = require("ahooks");
var CConfigProvider_1 = require("../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('add-button');
exports.testId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    popover: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
    dropdown: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["dropdown"], ["dropdown"]))),
    button: (0, exports.cssPrefix)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["button"], ["button"]))),
    addIcon: (0, exports.cssPrefix)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["add-icon"], ["add-icon"]))),
    text: (0, exports.cssPrefix)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["text"], ["text"]))),
    dropdownIcon: (0, exports.cssPrefix)(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["dropdown-icon"], ["dropdown-icon"]))),
};
var CAddButton = function (props) {
    var type = props.type, onClick = props.onClick, text = props.text, _a = props.enableAddCount, enableAddCount = _a === void 0 ? Number.MAX_SAFE_INTEGER : _a, _b = props.showEnableAddTips, showEnableAddTips = _b === void 0 ? false : _b, customTips = props.customTips, _c = props.disabled, disabled = _c === void 0 ? false : _c, popoverContent = props.popoverContent, dropdownList = props.dropdownList, _d = props.arcoPopoverProps, arcoPopoverProps = _d === void 0 ? {} : _d, _e = props.arcoDropdownProps, arcoDropdownProps = _e === void 0 ? {} : _e, style = props.style, className = props.className, _f = props.htmlType, htmlType = _f === void 0 ? 'button' : _f, basicProps = tslib_1.__rest(props, ["type", "onClick", "text", "enableAddCount", "showEnableAddTips", "customTips", "disabled", "popoverContent", "dropdownList", "arcoPopoverProps", "arcoDropdownProps", "style", "className", "htmlType"]);
    var btnRef = (0, react_1.useRef)(null);
    var isHovering = (0, ahooks_1.useHover)(btnRef);
    var _g = tslib_1.__read((0, react_1.useState)(false), 2), isActive = _g[0], setIsActive = _g[1];
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
    var _h = (0, CConfigProvider_1.useCConfigContext)(), locale = _h.locale, formatLocale = _h.formatLocale, useCssPrefix = _h.useCssPrefix;
    var cssPrefix = useCssPrefix('add-button');
    var defaultTips = formatLocale(locale.CAddButton.defaultTips, { enableAddCount: enableAddCount });
    return (react_1.default.createElement("div", tslib_1.__assign({ style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject([""], [""]))), cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["", "-container"], ["", "-container"])), type), dashedDisabled && cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["dashed-container-disabled"], ["dashed-container-disabled"]))), className), "data-cy": exports.testId.container }, basicProps),
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ disabled: popoverDisabled }, arcoPopoverProps, { "data-cy": exports.testId.popover }),
            react_1.default.createElement(web_react_1.Dropdown, tslib_1.__assign({}, arcoDropdownProps, { disabled: btnDisabled, "data-cy": exports.testId.dropdown }),
                react_1.default.createElement("button", { type: htmlType, ref: btnRef, onClick: function () {
                        onClick === null || onClick === void 0 ? void 0 : onClick();
                        setIsActive(false);
                    }, className: (0, classnames_1.default)(cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["btn"], ["btn"]))), cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), type), isHovering && cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["", "-hover"], ["", "-hover"])), type), isActive && cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["", "-active"], ["", "-active"])), type)), "data-cy": exports.testId.button, "data-testid": exports.testId.button, onMouseDown: function () { return setIsActive(true); } },
                    react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["btn-icon"], ["btn-icon"]))), cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["", "-icon"], ["", "-icon"])), type)), "data-cy": exports.testId.addIcon },
                        react_1.default.createElement(iconbox_react_ve_o_design_1.IconPlus, null)),
                    text && (react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["btn-text"], ["btn-text"]))), cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["", "-text"], ["", "-text"])), type)), "data-cy": exports.testId.text }, text)),
                    showDropdownIcon && (react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["btn-drop-icon"], ["btn-drop-icon"]))), cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["", "-drop-icon"], ["", "-drop-icon"])), type)), "data-cy": exports.testId.dropdownIcon },
                        react_1.default.createElement(iconbox_react_ve_o_design_1.IconDown, null)))))),
        showTips && type !== 'dashed' && react_1.default.createElement("span", { className: cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["tips"], ["tips"]))) }, customTips || defaultTips)));
};
CAddButton.displayName = 'CAddButton';
exports.default = CAddButton;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=index.js.map