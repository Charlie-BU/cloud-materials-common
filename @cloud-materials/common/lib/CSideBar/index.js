"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var CollapsedMenu_1 = tslib_1.__importDefault(require("./CollapsedMenu"));
var SubMenu_1 = tslib_1.__importDefault(require("./SubMenu"));
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var Feedback_1 = require("./Feedback");
var MenuItem = web_react_1.Menu.Item, ItemGroup = web_react_1.Menu.ItemGroup;
var defaultRenderMenuItem = function (props) { return react_1.default.createElement("span", tslib_1.__assign({}, props)); };
var CSideBar = react_1.default.forwardRef(function (props, ref) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var sidebarRef = (0, react_1.useRef)(null);
    var expandTriggerRef = (0, react_1.useRef)(null);
    var popupContainerRef = (0, react_1.useRef)(null);
    var widthControlledRef = (0, react_1.useRef)(null);
    var widthControllerRef = (0, react_1.useRef)(null);
    var _k = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _k.useCssPrefix, locale = _k.locale;
    var cssPrefix = useCssPrefix('sidebar');
    var _l = tslib_1.__read((0, hooks_1.useCSideBar)(tslib_1.__assign(tslib_1.__assign({}, props), { controlledRefs: [sidebarRef, widthControlledRef], widthControllerRef: widthControllerRef, expandTriggerRef: expandTriggerRef, rootRef: sidebarRef })), 2), _m = _l[0], sideBarControls = _l[1], menus = _m.menus, collapse = _m.collapse, isExpandTriggerHovering = _m.isExpandTriggerHovering, userSetMode = _m.mode, title = _m.title, rootMenus = _m.rootMenus, activeRootMenuIndex = _m.activeRootMenuIndex, arcoMenuProps = _m.arcoMenuProps, selectedKeys = _m.selectedKeys, openKeys = _m.openKeys, widthControl = _m.widthControl, widthControlling = _m.widthControlling, _o = _m.renderMenuItem, renderMenuItem = _o === void 0 ? defaultRenderMenuItem : _o, extraCtrl = _m.extraCtrl, collapsible = _m.collapsible, sidebarProps = tslib_1.__rest(_m, ["menus", "collapse", "isExpandTriggerHovering", "mode", "title", "rootMenus", "activeRootMenuIndex", "arcoMenuProps", "selectedKeys", "openKeys", "widthControl", "widthControlling", "renderMenuItem", "extraCtrl", "collapsible"]);
    // 用户在未传入mode时，自动计算mode
    var mode = userSetMode !== null && userSetMode !== void 0 ? userSetMode : (rootMenus.length ? 'normal' : 'icon-less');
    var _p = sidebarProps.sidebarWidth, sidebarWidth = _p === void 0 ? (_b = (_a = sidebarProps.style) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 200 : _p, restProps = tslib_1.__rest(sidebarProps, ["sidebarWidth"]);
    (0, react_1.useImperativeHandle)(ref, function () { return sidebarRef.current; });
    var renderBadge = function (badge, redDot, reactNode, defaultProps) {
        if (defaultProps === void 0) { defaultProps = {}; }
        var _a = (0, util_1.badgeToProps)(badge, defaultProps), _b = _a.type, badgeType = _b === void 0 ? 'badge' : _b, content = _a.content, follow = _a.follow;
        var isBadge = badgeType === 'badge';
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["menu-item-left"], ["menu-item-left"]))), !follow && cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["menu-item-left-full-up"], ["menu-item-left-full-up"]))), redDot && cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["menu-item-badge-dot"], ["menu-item-badge-dot"])))) }, reactNode),
            content && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["menu-item-badge"], ["menu-item-badge"]))), isBadge && cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["menu-item-badge-builtin"], ["menu-item-badge-builtin"])))) }, content))));
    };
    var renderMenu = function (_a) {
        var mode = _a.mode, openKeys = _a.openKeys, _b = _a.menus, menus = _b === void 0 ? [] : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
        var renderIcon = function (icon) {
            if (mode !== 'icon-less') {
                if (react_1.default.isValidElement(icon)) {
                    return react_1.default.cloneElement(icon, {
                        className: (0, classnames_1.default)(icon.props.className, cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["prefix-icon"], ["prefix-icon"])))),
                    });
                }
                return icon && react_1.default.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["prefix-icon"], ["prefix-icon"]))) }, icon);
            }
            return null;
        };
        return menus.map(function (menuConfig) {
            if (menuConfig.type === 'group') {
                var children = menuConfig.children, title_1 = menuConfig.title, className = menuConfig.className, groupProps = tslib_1.__rest(menuConfig, ["children", "title", "className"]);
                return (
                // eslint-disable-next-line react/jsx-key
                react_1.default.createElement(ItemGroup, tslib_1.__assign({}, groupProps, { title: title_1 && (react_1.default.createElement(CEllipsis_1.default, { arcoPopoverProps: { getPopupContainer: function () { return popupContainerRef.current; } } }, title_1)), className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["group-title"], ["group-title"]))), className) }), renderMenu({ mode: mode, menus: children, openKeys: openKeys })));
            }
            if (menuConfig.type === 'sub-menu') {
                var children = menuConfig.children, icon_2 = menuConfig.icon, title_2 = menuConfig.title, badge_1 = menuConfig.badge, _a = menuConfig.redDot, redDot = _a === void 0 ? false : _a, _b = menuConfig.disabled, disabledSubMenu_1 = _b === void 0 ? disabled : _b, subMenuProps = tslib_1.__rest(menuConfig, ["children", "icon", "title", "badge", "redDot", "disabled"]);
                return (
                // eslint-disable-next-line react/jsx-key
                react_1.default.createElement(SubMenu_1.default, tslib_1.__assign({}, subMenuProps, { className: (0, classnames_1.default)(openKeys.includes(subMenuProps.key) && cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["submenu-open"], ["submenu-open"]))), subMenuProps.className, disabledSubMenu_1 && cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["submenu-disabled"], ["submenu-disabled"])))), onClickCapture: function (e) {
                        // 禁用后阻止事件传播，可以禁用子元素的 onClick
                        if (disabledSubMenu_1) {
                            e.stopPropagation();
                        }
                    }, title: renderBadge(badge_1, redDot, react_1.default.createElement(CEllipsis_1.default, { popoverContent: title_2, showPopover: disabledSubMenu_1 ? false : 'auto', arcoPopoverProps: { getPopupContainer: function () { return popupContainerRef.current; } } },
                        renderIcon(icon_2),
                        react_1.default.createElement("span", { style: { verticalAlign: 'middle' } }, title_2)), { type: 'custom', follow: true }) }), renderMenu({ mode: mode, menus: children, openKeys: openKeys, disabled: disabledSubMenu_1 })));
            }
            if (menuConfig.type === 'category-title') {
                var label_1 = menuConfig.label, className = menuConfig.className, _1 = menuConfig.type, key = menuConfig.key, restMenuConfig_1 = tslib_1.__rest(menuConfig, ["label", "className", "type", "key"]);
                return (label_1 && (react_1.default.createElement(CEllipsis_1.default, { key: key, className: (0, classnames_1.default)(cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["category-title"], ["category-title"]))), className), arcoPopoverProps: { getPopupContainer: function () { return popupContainerRef.current; } } },
                    react_1.default.createElement("span", tslib_1.__assign({}, restMenuConfig_1), label_1))));
            }
            if (menuConfig.type === 'custom') {
                return (react_1.default.createElement(react_1.default.Fragment, { key: menuConfig.key }, menuConfig.render({
                    renderMenus: function (menus) { return renderMenu({ mode: mode, menus: menus, openKeys: openKeys }); },
                })));
            }
            var label = menuConfig.label, name = menuConfig.name, isOuter = menuConfig.isOuter, _c = menuConfig.outerMarkIcon, outerMarkIcon = _c === void 0 ? react_1.default.createElement(icon_1.IconLaunch, null) : _c, icon = menuConfig.icon, hidden = menuConfig.hidden, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            extraMatchKeys = menuConfig.extraMatchKeys, data = menuConfig.data, exact = menuConfig.exact, path = menuConfig.path, type = menuConfig.type, selectable = menuConfig.selectable, badge = menuConfig.badge, 
            /* eslint-enable @typescript-eslint/no-unused-vars */
            _d = menuConfig.disabled, 
            /* eslint-enable @typescript-eslint/no-unused-vars */
            menuDisabled = _d === void 0 ? disabled : _d, restMenuConfig = tslib_1.__rest(menuConfig, ["label", "name", "isOuter", "outerMarkIcon", "icon", "hidden", "extraMatchKeys", "data", "exact", "path", "type", "selectable", "badge", "disabled"]);
            return (!hidden && (react_1.default.createElement(MenuItem, tslib_1.__assign({}, restMenuConfig, { "data-testid": path !== null && path !== void 0 ? path : restMenuConfig.key, disabled: menuDisabled }), renderMenuItem({
                children: renderBadge(badge, false, react_1.default.createElement(react_1.default.Fragment, null,
                    renderIcon(icon),
                    react_1.default.createElement(CEllipsis_1.default, { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["menu-item-text"], ["menu-item-text"]))), showPopover: menuDisabled ? false : 'auto', arcoPopoverProps: {
                            getPopupContainer: function () { return popupContainerRef.current; },
                        } }, label !== null && label !== void 0 ? label : name),
                    isOuter &&
                        outerMarkIcon &&
                        react_1.default.cloneElement(outerMarkIcon, { className: cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["menu-item-suffix"], ["menu-item-suffix"]))) }))),
                className: cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["menu-item-box"], ["menu-item-box"]))),
            }, menuConfig))));
        });
    };
    var iconLessMode = mode === 'icon-less';
    var normalMode = mode === 'normal';
    var menuChildren = (0, react_1.useMemo)(function () { return renderMenu({ menus: menus, mode: mode, openKeys: openKeys }); }, [menus, mode, openKeys]);
    var showMenu = !collapse || isExpandTriggerHovering || iconLessMode;
    var hasTitleMenus = Boolean(title === null || title === void 0 ? void 0 : title.menuConfig);
    var titleNode = (title === null || title === void 0 ? void 0 : title.text) && (react_1.default.createElement("span", { className: (0, classnames_1.default)(cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["title-text"], ["title-text"]))), hasTitleMenus && cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["title-text-point"], ["title-text-point"])))), style: { fontSize: title.size } },
        title.text,
        hasTitleMenus && react_1.default.createElement(iconbox_react_ve_o_design_1.IconCaretDown, { className: cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["title-dropdown-arrow"], ["title-dropdown-arrow"]))) })));
    return (react_1.default.createElement("div", tslib_1.__assign({}, restProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject([""], [""]))), collapse && normalMode && cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["collapse"], ["collapse"]))), collapse && iconLessMode && cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["iconLess-collapse"], ["iconLess-collapse"]))), collapse && isExpandTriggerHovering && normalMode && cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["expand"], ["expand"]))), restProps.className), ref: sidebarRef, style: tslib_1.__assign(tslib_1.__assign({}, restProps.style), { width: collapse ? '' : sidebarWidth }), "data-collapse": collapse, "data-cy": (0, util_1.testIdPrefix)(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject([""], [""]))) }),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["inner"], ["inner"]))), style: { width: isExpandTriggerHovering && normalMode && collapse ? sidebarWidth : '' } },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["menus-box"], ["menus-box"]))), ref: expandTriggerRef },
                normalMode && collapse && !isExpandTriggerHovering && (react_1.default.createElement(CollapsedMenu_1.default, { menus: rootMenus, logo: title === null || title === void 0 ? void 0 : title.logo, activeRootMenuIndex: activeRootMenuIndex })),
                react_1.default.createElement("div", { ref: widthControlledRef, 
                    // 将title撑起来，不让title因为换行挤压下面的内容造成动画不连贯
                    className: cssPrefix(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["prop-up-box"], ["prop-up-box"]))), style: {
                        width: (isExpandTriggerHovering && normalMode) || !collapse ? sidebarWidth : '',
                        display: showMenu ? void 0 : 'none',
                    } },
                    title && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["title"], ["title"]))), hasTitleMenus && cssPrefix(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["title-with-menus"], ["title-with-menus"])))), style: {
                            display: showMenu ? void 0 : 'none',
                        } },
                        title.onBack ? (react_1.default.createElement("button", { type: "button", className: cssPrefix(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["back"], ["back"]))), onClick: title.onBack },
                            react_1.default.createElement(iconbox_react_ve_o_design_1.IconLeft, null))) : (title.logo && react_1.default.createElement("span", { className: cssPrefix(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["title-logo"], ["title-logo"]))) }, title.logo)),
                        hasTitleMenus ? (react_1.default.createElement(web_react_1.Dropdown, tslib_1.__assign({ position: "bottom", droplist: react_1.default.createElement(web_react_1.Menu, tslib_1.__assign({ style: { maxWidth: parseInt(sidebarWidth.toString(), 10) * (152 / 200) } }, (_c = title.menuConfig) === null || _c === void 0 ? void 0 : _c.arcoMenuProps), (_f = (_e = (_d = title.menuConfig) === null || _d === void 0 ? void 0 : _d.arcoMenuProps) === null || _e === void 0 ? void 0 : _e.children) !== null && _f !== void 0 ? _f : (_h = (_g = title.menuConfig) === null || _g === void 0 ? void 0 : _g.menus) === null || _h === void 0 ? void 0 : _h.map(function (_a) {
                                var children = _a.children, menuItemProps = tslib_1.__rest(_a, ["children"]);
                                return (
                                // eslint-disable-next-line react/jsx-key
                                react_1.default.createElement(web_react_1.Menu.Item, tslib_1.__assign({}, menuItemProps),
                                    react_1.default.createElement(CEllipsis_1.default, { arcoPopoverProps: {
                                            position: 'right',
                                            getPopupContainer: function () { return popupContainerRef.current; },
                                        } }, children)));
                            })) }, (_j = title.menuConfig) === null || _j === void 0 ? void 0 : _j.arcoDropdownProps), titleNode)) : (titleNode))),
                    react_1.default.createElement(web_react_1.Menu, tslib_1.__assign({}, arcoMenuProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["menu"], ["menu"]))), arcoMenuProps === null || arcoMenuProps === void 0 ? void 0 : arcoMenuProps.className), hasCollapseButton: false, collapse: false, onClickSubMenu: function () {
                            var _a;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            sideBarControls.setOpenKeys(args[0]);
                            (_a = arcoMenuProps === null || arcoMenuProps === void 0 ? void 0 : arcoMenuProps.onClickSubMenu) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([arcoMenuProps], tslib_1.__read(args), false));
                        }, onClickMenuItem: sideBarControls.onClickMenuItem, levelIndent: iconLessMode ? 12 : 32, style: arcoMenuProps === null || arcoMenuProps === void 0 ? void 0 : arcoMenuProps.style, selectedKeys: selectedKeys, openKeys: openKeys, icons: tslib_1.__assign({ horizontalArrowDown: react_1.default.createElement(iconbox_react_ve_o_design_1.IconDown, { useCurrentColor: true }) }, arcoMenuProps === null || arcoMenuProps === void 0 ? void 0 : arcoMenuProps.icons) }), menuChildren))),
            collapsible && (react_1.default.createElement("div", { className: cssPrefix(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["collapse-ctrl"], ["collapse-ctrl"]))) },
                react_1.default.createElement(web_react_1.Popover, { content: collapse ? locale.CSidebar.expandNavigation : locale.CSidebar.collapseNavigation, position: collapse && !isExpandTriggerHovering ? 'right' : 'tl', getPopupContainer: function (node) { return node.parentElement; }, style: { whiteSpace: 'nowrap' }, triggerProps: { autoFitPosition: false } },
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["collapse-button"], ["collapse-button"]))), onClick: function () { return sideBarControls.toggleCollapse(); } }, react_1.default.createElement(collapse ? iconbox_react_ve_o_design_1.IconMenuUnfold : iconbox_react_ve_o_design_1.IconMenuFold, {
                        className: cssPrefix(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["collapse-button-icon"], ["collapse-button-icon"]))),
                    }))),
                !(0, lodash_es_1.isNil)(extraCtrl) && showMenu && react_1.default.createElement("div", { className: cssPrefix(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["collapse-ctrl-extra"], ["collapse-ctrl-extra"]))) }, extraCtrl),
                (0, util_1.extraCtrlIsFeedback)(extraCtrl) &&
                    !showMenu &&
                    normalMode &&
                    react_1.default.cloneElement(extraCtrl, { circle: true })))),
        widthControl && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_35 || (templateObject_35 = tslib_1.__makeTemplateObject(["width-controller"], ["width-controller"]))), widthControlling && cssPrefix(templateObject_36 || (templateObject_36 = tslib_1.__makeTemplateObject(["width-controller-active"], ["width-controller-active"])))), ref: widthControllerRef, style: { visibility: collapse ? 'hidden' : undefined } })),
        react_1.default.createElement("div", { ref: popupContainerRef, className: cssPrefix(templateObject_37 || (templateObject_37 = tslib_1.__makeTemplateObject(["popup-container"], ["popup-container"]))) })));
});
CSideBar.displayName = 'CSideBar';
exports.default = Object.assign(CSideBar, { Feedback: Feedback_1.Feedback });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37;
//# sourceMappingURL=index.js.map