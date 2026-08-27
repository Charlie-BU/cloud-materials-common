"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCSideBar = exports.useSideBarWidthControl = exports.DefaultMinSideBarWidth = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var ahooks_1 = require("ahooks");
var createUseStorageState_1 = require("ahooks/es/createUseStorageState");
var react_1 = require("react");
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_1 = require("../hooks");
var util_1 = require("./util");
exports.DefaultMinSideBarWidth = 100;
var useSideBarWidthControl = function (_a) {
    var controlledRefs = _a.controlledRefs, widthControllerRef = _a.widthControllerRef, widthControl = _a.widthControl, storage = _a.storage, onSetStorage = _a.onSetStorage, onSetCollapse = _a.onSetCollapse;
    var widthControlDataRef = (0, hooks_1.useAutoRef)(widthControl);
    var controlledAutoRefs = (0, hooks_1.useAutoRef)(controlledRefs !== null && controlledRefs !== void 0 ? controlledRefs : []);
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), widthControlling = _b[0], setWidthControlling = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(storage === null || storage === void 0 ? void 0 : storage.width), 2), sidebarWidth = _c[0], setSidebarWidth = _c[1];
    (0, react_1.useEffect)(function () {
        if (widthControlDataRef.current && (widthControllerRef === null || widthControllerRef === void 0 ? void 0 : widthControllerRef.current) && (controlledAutoRefs === null || controlledAutoRefs === void 0 ? void 0 : controlledAutoRefs.current)) {
            var startWidths_1 = [];
            var startX_1 = 0;
            var currentWidth_1 = 0;
            var defaultWidthControl = {
                minWidth: exports.DefaultMinSideBarWidth,
                autoCollapse: true,
            };
            var widthControl_1 = typeof widthControlDataRef.current === 'boolean'
                ? defaultWidthControl
                : tslib_1.__assign(tslib_1.__assign({}, defaultWidthControl), widthControlDataRef.current);
            var endWidthControl_1 = function () {
                // eslint-disable-next-line no-use-before-define
                document.removeEventListener('mousemove', handleMouseMove_1);
                // eslint-disable-next-line no-use-before-define
                document.removeEventListener('mouseup', handleMouseUp_1);
                (0, util_1.batchSetStyle)(controlledAutoRefs.current, { transition: '' });
                setWidthControlling(false);
            };
            var handleMouseUp_1 = function () {
                endWidthControl_1();
                if (currentWidth_1 > 0) {
                    setSidebarWidth(currentWidth_1);
                    onSetStorage({ width: currentWidth_1 });
                }
            };
            var handleMouseMove_1 = function (e) {
                var offset = e.clientX - startX_1;
                startWidths_1.some(function (startWidth, index) {
                    var _a, _b;
                    var width = startWidth + offset;
                    var minWidth = Math.max(exports.DefaultMinSideBarWidth, (_a = widthControl_1.minWidth) !== null && _a !== void 0 ? _a : 0);
                    var inRangeWidth = Math.max(Math.min((_b = widthControl_1.maxWidth) !== null && _b !== void 0 ? _b : window.innerWidth / 2, width), minWidth);
                    // 小于最小宽度后继续缩小则直接收起
                    if (width < minWidth - 80 && widthControl_1.autoCollapse) {
                        endWidthControl_1();
                        onSetCollapse(true);
                        onSetStorage({ collapse: true });
                        return true;
                    }
                    currentWidth_1 = inRangeWidth;
                    // fps 对齐
                    requestAnimationFrame(function () {
                        (0, util_1.batchSetStyle)([controlledAutoRefs.current[index]], { width: "".concat(inRangeWidth, "px") });
                    });
                });
            };
            var handleMousedown_1 = function (e) {
                startWidths_1 = controlledAutoRefs.current.map(function (ref) { var _a, _b; return (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0; });
                startX_1 = e.clientX;
                (0, util_1.batchSetStyle)(controlledAutoRefs.current, { transition: 'none' });
                setWidthControlling(true);
                document.addEventListener('mouseup', handleMouseUp_1);
                document.addEventListener('mousemove', handleMouseMove_1);
            };
            widthControllerRef.current.addEventListener('mousedown', handleMousedown_1);
            return function () {
                var _a;
                endWidthControl_1();
                (_a = widthControllerRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mousedown', handleMousedown_1);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthControl]);
    return {
        /** 宽度是否处于控制中 */
        widthControlling: widthControlling,
        /** 控制后的宽度 */
        sidebarWidth: sidebarWidth,
    };
};
exports.useSideBarWidthControl = useSideBarWidthControl;
var useCSideBar = function (props) {
    var _a, _b, _c;
    var _d = (0, CConfigProvider_1.useCConfigContext)(), cComponentConfig = _d.cComponentConfig, storage = _d.storage;
    // 创建自定义 storage hooks
    var _e = tslib_1.__read((0, react_1.useState)(function () { return (0, createUseStorageState_1.createUseStorageState)(function () { return storage.localStorage; }); }), 1), useLocalStorageState = _e[0];
    var _f = (0, hooks_1.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CSideBar) !== null && _a !== void 0 ? _a : {}), _g = _f.defaultCollapse, defaultCollapse = _g === void 0 ? false : _g, _h = _f.defaultOpenKeys, defaultOpenKeys = _h === void 0 ? [] : _h, _j = _f.defaultSelectedKeys, defaultSelectedKeys = _j === void 0 ? [] : _j, currentPath = _f.currentPath, _k = _f.accordion, accordion = _k === void 0 ? false : _k, controlledRefs = _f.controlledRefs, expandTriggerRef = _f.expandTriggerRef, rootRef = _f.rootRef, widthControllerRef = _f.widthControllerRef, widthControl = _f.widthControl, _l = _f.autoCollapse, autoCollapse = _l === void 0 ? true : _l, onClickMenuItem = _f.onClickMenuItem, appId = _f.appId, defaultOpenSubMenu = _f.defaultOpenSubMenu, collapsePersistFirstWhenControlled = _f.collapsePersistFirstWhenControlled, onCollapseChange = _f.onCollapseChange, onSelectedKeysChange = _f.onSelectedKeysChange, onOpenKeysChange = _f.onOpenKeysChange, _m = _f.collapsible, collapsible = _m === void 0 ? true : _m, resetProps = tslib_1.__rest(_f, ["defaultCollapse", "defaultOpenKeys", "defaultSelectedKeys", "currentPath", "accordion", "controlledRefs", "expandTriggerRef", "rootRef", "widthControllerRef", "widthControl", "autoCollapse", "onClickMenuItem", "appId", "defaultOpenSubMenu", "collapsePersistFirstWhenControlled", "onCollapseChange", "onSelectedKeysChange", "onOpenKeysChange", "collapsible"]);
    var collapse = resetProps.collapse, selectedKeys = resetProps.selectedKeys, openKeys = resetProps.openKeys, nextProps = tslib_1.__rest(resetProps, ["collapse", "selectedKeys", "openKeys"]);
    var _o = resetProps.menus, initialMenus = _o === void 0 ? [] : _o;
    var menus = (0, react_1.useMemo)(function () { return (0, util_1.collectMenusFromCustomRender)(initialMenus); }, [initialMenus]);
    var innerAppId = appId !== null && appId !== void 0 ? appId : (0, util_1.getNodeText)((_b = resetProps.title) === null || _b === void 0 ? void 0 : _b.text);
    var enableAutoCollapse = Boolean(autoCollapse);
    var createControllableProps = function (props, propName) {
        if (!Object.prototype.hasOwnProperty.call(resetProps, propName)) {
            delete props.value;
        }
        return props;
    };
    // 992 的屏幕宽度，满足则为true
    var lg = (0, ahooks_1.useResponsive)().lg;
    var canAutoCollapseByScreenWidth = !lg;
    var _p = tslib_1.__read(useLocalStorageState((0, util_1.testIdPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["state-", ""], ["state-", ""])), innerAppId), {
        defaultValue: {},
    }), 2), storageState = _p[0], setStorageState = _p[1];
    var defaultCollapseInner = (0, react_1.useMemo)(function () {
        var _a, _b;
        // 手动优先，其次是自动，再则是传进来的默认值
        if (enableAutoCollapse && canAutoCollapseByScreenWidth) {
            return (_a = storageState.collapse) !== null && _a !== void 0 ? _a : (canAutoCollapseByScreenWidth || defaultCollapse);
        }
        return (_b = storageState.collapse) !== null && _b !== void 0 ? _b : defaultCollapse;
    }, []);
    var _q = tslib_1.__read((0, ahooks_1.useControllableValue)(createControllableProps({
        // 当用户操作过优先取用户的结果。
        value: collapsePersistFirstWhenControlled ? (_c = storageState.collapse) !== null && _c !== void 0 ? _c : collapse : collapse,
        // 非受控模式直接取值 defaultValue
        defaultValue: defaultCollapseInner,
        onChange: onCollapseChange,
    }, 'collapse')), 2), innerCollapse = _q[0], setCollapse = _q[1];
    var defaultOpenKeysInner = (0, react_1.useMemo)(function () {
        if (defaultOpenSubMenu) {
            return Array.from(new Set((0, util_1.getAllSubMenuKeys)(menus)));
        }
        // 当初始化时存在 currentPath 时，我们应当立即匹配出 openKeys，如果在 useEffect 中去处理，将出现加载完成后菜单再展开的情况
        if (currentPath) {
            var matchedMenu = (0, util_1.matchMenuFromPropsMenuByCurrentPath)(currentPath, menus);
            if (matchedMenu && matchedMenu._menuPath.length > 1) {
                // 移除最后一个，最后一个为菜单项自身，为非可折叠菜单
                return matchedMenu._menuPath.slice(0, -1);
            }
        }
        return defaultOpenKeys;
    }, []);
    var defaultSelectedKeysInner = (0, react_1.useMemo)(function () {
        if (currentPath) {
            var matchedMenu = (0, util_1.matchMenuFromPropsMenuByCurrentPath)(currentPath, menus);
            if (matchedMenu && matchedMenu.selectable !== false) {
                return [matchedMenu.key];
            }
        }
        return defaultSelectedKeys;
    }, []);
    var _r = tslib_1.__read((0, react_1.useState)(false), 2), innerIsExpandTriggerHovering = _r[0], setInnerIsExpandTriggerHovering = _r[1];
    var _s = tslib_1.__read((0, ahooks_1.useControllableValue)(createControllableProps({
        defaultValue: defaultOpenKeysInner,
        value: openKeys,
        onChange: onOpenKeysChange,
    }, 'openKeys')), 2), innerOpenKeys = _s[0], setOpenKeys = _s[1];
    var _t = tslib_1.__read((0, ahooks_1.useControllableValue)(createControllableProps({
        value: selectedKeys,
        defaultValue: defaultSelectedKeysInner,
        onChange: onSelectedKeysChange,
    }, 'selectedKeys')), 2), innerSelectedKeys = _t[0], setSelectedKeys = _t[1];
    var isExpandTriggerHovering = (0, ahooks_1.useHover)(expandTriggerRef);
    var sidebarRootHovering = (0, ahooks_1.useHover)(rootRef);
    var iconLessMode = resetProps.mode === 'icon-less';
    /** 顶层的菜单key */
    var outerKeys = menus.map(function (_a) {
        var key = _a.key;
        return key;
    });
    var rootMenus = (0, hooks_1.useAutoRef)((0, util_1.filterRootMenus)(menus));
    (0, ahooks_1.useUpdateEffect)(function () {
        // 自动展开/收起仅限于用户未操作过或者主动设置为展开状态时生效，程序不主动缩小用户视野
        if (enableAutoCollapse && !storageState.collapse) {
            setCollapse(canAutoCollapseByScreenWidth);
        }
    }, [canAutoCollapseByScreenWidth, enableAutoCollapse]);
    var sidebarControlState = (0, exports.useSideBarWidthControl)({
        controlledRefs: controlledRefs,
        widthControllerRef: widthControllerRef,
        widthControl: widthControl,
        storage: storageState,
        onSetCollapse: setCollapse,
        onSetStorage: function (storage) {
            setStorageState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), storage)); });
        },
    });
    (0, ahooks_1.useUpdateEffect)(function () {
        if (iconLessMode || sidebarControlState.widthControlling) {
            return;
        }
        // 如果已经展开了，hover到 sidebar 内部不收起，除非移出 sidebar
        if (!isExpandTriggerHovering && sidebarRootHovering) {
            return;
        }
        setInnerIsExpandTriggerHovering(isExpandTriggerHovering);
    }, [isExpandTriggerHovering, sidebarRootHovering]);
    var activeRootMenuIndex = (0, react_1.useMemo)(function () {
        if (innerSelectedKeys.length) {
            var _a = tslib_1.__read(innerSelectedKeys, 1), selectedKey = _a[0];
            var keyMapping = (0, util_1.generateMenuItemKeyToRootKeyMapping)(menus, {});
            var rootKey_1 = keyMapping[selectedKey];
            return rootMenus.current.findIndex(function (menu) { return menu.key === rootKey_1; });
        }
        return -1;
    }, [innerSelectedKeys]);
    var sideBarProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, nextProps), sidebarControlState), { collapsible: collapsible, 
        /** 鼠标移进 */
        isExpandTriggerHovering: innerIsExpandTriggerHovering, 
        /** 收起状态，当 collapsible 为 false 时，collapse 始终返回 false */
        collapse: collapsible && innerCollapse, openKeys: innerOpenKeys, rootMenus: rootMenus.current, activeRootMenuIndex: activeRootMenuIndex, selectedKeys: innerSelectedKeys, widthControl: Boolean(widthControl) });
    (0, ahooks_1.useUpdateEffect)(function () {
        if (currentPath) {
            var matchedMenu = (0, util_1.matchMenuFromPropsMenuByCurrentPath)(currentPath, menus);
            setSelectedKeys(matchedMenu && matchedMenu.selectable !== false ? [matchedMenu.key] : []);
            // 大于 1 即为子菜单
            if (matchedMenu && matchedMenu._menuPath.length > 1) {
                var menuPathCopy_1 = matchedMenu._menuPath.slice(0, -1);
                if (accordion) {
                    setOpenKeys(menuPathCopy_1);
                }
                else {
                    setOpenKeys(function (oldKeys) { return Array.from(new Set(oldKeys.concat(menuPathCopy_1))); });
                }
            }
        }
    }, [currentPath, accordion, initialMenus]);
    var controls = {
        setOpenKeys: function (key) {
            setOpenKeys(function (oldKeys) {
                if (accordion && outerKeys.includes(key)) {
                    return oldKeys.length > 0 && oldKeys.includes(key) ? [] : [key];
                }
                return oldKeys.includes(key) ? oldKeys.filter(function (v) { return v !== key; }) : oldKeys.concat(key);
            });
        },
        /**
         * 状态会被储存
         * @param collapse
         */
        toggleCollapse: function (collapse) {
            if (collapse === void 0) { collapse = !innerCollapse; }
            setCollapse(collapse);
            // 仅在用户操作时对状态进行持久化保存
            setStorageState(tslib_1.__assign(tslib_1.__assign({}, storageState), { collapse: collapse }));
            if (collapse) {
                setInnerIsExpandTriggerHovering(false);
            }
        },
        onClickMenuItem: function (key) {
            var restArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restArgs[_i - 1] = arguments[_i];
            }
            var flatMenus = (0, util_1.flatMenusFromPropMenus)(menus);
            var clickedMenuItem = flatMenus.find(function (_a) {
                var menuKey = _a.key;
                return key === menuKey;
            });
            if ((clickedMenuItem === null || clickedMenuItem === void 0 ? void 0 : clickedMenuItem.selectable) !== false) {
                setSelectedKeys([key]);
            }
            if (clickedMenuItem) {
                onClickMenuItem === null || onClickMenuItem === void 0 ? void 0 : onClickMenuItem.apply(void 0, tslib_1.__spreadArray([clickedMenuItem], tslib_1.__read(restArgs), false));
            }
        },
    };
    return [sideBarProps, controls];
};
exports.useCSideBar = useCSideBar;
var templateObject_1;
//# sourceMappingURL=hooks.js.map