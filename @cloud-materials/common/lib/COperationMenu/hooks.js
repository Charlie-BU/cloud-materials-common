"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenu = exports.useCOperationMenu = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var interface_1 = require("./interface");
var util_1 = require("./util");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../CConfigProvider");
var useCOperationMenu = function (props) {
    var _a = props.displayNum, displayNum = _a === void 0 ? 2 : _a, operations = props.operations, asyncOperations = props.asyncOperations, reloadOperationEachClick = props.reloadOperationEachClick, onMenuBtnClick = props.onMenuBtnClick, arcoDropdownProps = props.arcoDropdownProps;
    var _b = tslib_1.__read((0, react_1.useState)(interface_1.MenuStatus['success']), 2), menuStatus = _b[0], setMenuStatus = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(), 2), currentPop = _c[0], setCurrentPop = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(false), 2), dropdownVisible = _d[0], setDropDownVisible = _d[1];
    var createLogger = (0, CConfigProvider_1.useCConfigContext)().createLogger;
    var logger = createLogger('COperationMenu');
    // 该ref用于标记是否已经加载过异步菜单
    var loadedRef = (0, react_1.useRef)(false);
    // dropdownMenu array
    var menuOperationArr = (0, react_1.useRef)([]);
    var outsideOperationArr = (0, react_1.useMemo)(function () {
        var _a = (0, util_1.getDisplayOperation)(operations, displayNum), menuOperation = _a.menuOperation, outsideOperation = _a.outsideOperation;
        if (!asyncOperations) {
            menuOperationArr.current = menuOperation;
        }
        return outsideOperation;
    }, [operations, displayNum]);
    var operationMenuState = {
        outsideOperation: outsideOperationArr,
        menuOperation: menuOperationArr.current,
        menuStatus: menuStatus,
        loadedRef: loadedRef,
        currentPop: currentPop,
        dropdownVisible: dropdownVisible,
        dropdownProps: (0, lodash_es_1.merge)({
            popupVisible: dropdownVisible,
            triggerProps: {
                onClickOutside: function () { return setDropDownVisible(false); },
                updateOnScroll: true,
            },
        }, arcoDropdownProps),
    };
    // 获取异步下拉菜单
    var getAsyncOperations = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var menuOperations, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (menuStatus === interface_1.MenuStatus['loading'])
                        return [2 /*return*/];
                    // 如果已经完成第一次异步加载， 且不需要每次点击都重新加载，直接return
                    if (loadedRef.current && !reloadOperationEachClick)
                        return [2 /*return*/];
                    setMenuStatus(interface_1.MenuStatus['loading']);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (asyncOperations === null || asyncOperations === void 0 ? void 0 : asyncOperations())];
                case 2:
                    menuOperations = _a.sent();
                    loadedRef.current = true;
                    menuOperationArr.current = (0, util_1.groupOperation)(menuOperations);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger.error({ error: error_1, message: '异步获取菜单失败' });
                    setMenuStatus(interface_1.MenuStatus['error']);
                    return [2 /*return*/];
                case 4:
                    setMenuStatus(interface_1.MenuStatus['success']);
                    return [2 /*return*/];
            }
        });
    }); };
    var controls = {
        setDropDownVisible: setDropDownVisible,
        getAsyncOperations: getAsyncOperations,
        dropdownBtnClick: function () {
            setDropDownVisible(function (preState) { return !preState; });
            if (asyncOperations) {
                getAsyncOperations();
            }
            onMenuBtnClick === null || onMenuBtnClick === void 0 ? void 0 : onMenuBtnClick();
        },
        popVisibleChange: function (val, visible) {
            if (!visible) {
                setCurrentPop(undefined);
            }
            else {
                setCurrentPop(val);
            }
        },
    };
    return [operationMenuState, controls];
};
exports.useCOperationMenu = useCOperationMenu;
var useMenu = function () {
    var _a = tslib_1.__read((0, react_1.useState)(''), 2), activeMenu = _a[0], setActiveMenu = _a[1];
    var dropdownState = {
        activeMenu: activeMenu,
    };
    var controls = {
        setActiveMenu: setActiveMenu,
        clearActiveMenu: function () { return setActiveMenu(''); },
        subMenuVisible: function (visible, key) {
            if (visible) {
                setActiveMenu(key);
            }
            else {
                setActiveMenu('');
            }
        },
    };
    return [dropdownState, controls];
};
exports.useMenu = useMenu;
//# sourceMappingURL=hooks.js.map