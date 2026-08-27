import { __awaiter, __generator, __read } from "tslib";
import { useState, useRef, useMemo } from 'react';
import { MenuStatus } from './interface';
import { getDisplayOperation, groupOperation } from './util';
import { merge } from 'lodash-es';
import { useCConfigContext } from '../CConfigProvider';
export var useCOperationMenu = function (props) {
    var _a = props.displayNum, displayNum = _a === void 0 ? 2 : _a, operations = props.operations, asyncOperations = props.asyncOperations, reloadOperationEachClick = props.reloadOperationEachClick, onMenuBtnClick = props.onMenuBtnClick, arcoDropdownProps = props.arcoDropdownProps;
    var _b = __read(useState(MenuStatus['success']), 2), menuStatus = _b[0], setMenuStatus = _b[1];
    var _c = __read(useState(), 2), currentPop = _c[0], setCurrentPop = _c[1];
    var _d = __read(useState(false), 2), dropdownVisible = _d[0], setDropDownVisible = _d[1];
    var createLogger = useCConfigContext().createLogger;
    var logger = createLogger('COperationMenu');
    // 该ref用于标记是否已经加载过异步菜单
    var loadedRef = useRef(false);
    // dropdownMenu array
    var menuOperationArr = useRef([]);
    var outsideOperationArr = useMemo(function () {
        var _a = getDisplayOperation(operations, displayNum), menuOperation = _a.menuOperation, outsideOperation = _a.outsideOperation;
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
        dropdownProps: merge({
            popupVisible: dropdownVisible,
            triggerProps: {
                onClickOutside: function () { return setDropDownVisible(false); },
                updateOnScroll: true,
            },
        }, arcoDropdownProps),
    };
    // 获取异步下拉菜单
    var getAsyncOperations = function () { return __awaiter(void 0, void 0, void 0, function () {
        var menuOperations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (menuStatus === MenuStatus['loading'])
                        return [2 /*return*/];
                    // 如果已经完成第一次异步加载， 且不需要每次点击都重新加载，直接return
                    if (loadedRef.current && !reloadOperationEachClick)
                        return [2 /*return*/];
                    setMenuStatus(MenuStatus['loading']);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (asyncOperations === null || asyncOperations === void 0 ? void 0 : asyncOperations())];
                case 2:
                    menuOperations = _a.sent();
                    loadedRef.current = true;
                    menuOperationArr.current = groupOperation(menuOperations);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger.error({ error: error_1, message: '异步获取菜单失败' });
                    setMenuStatus(MenuStatus['error']);
                    return [2 /*return*/];
                case 4:
                    setMenuStatus(MenuStatus['success']);
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
export var useMenu = function () {
    var _a = __read(useState(''), 2), activeMenu = _a[0], setActiveMenu = _a[1];
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
//# sourceMappingURL=hooks.js.map