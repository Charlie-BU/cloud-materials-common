import { __assign, __awaiter, __generator, __read } from "tslib";
import React from 'react';
import { Popover, Popconfirm } from '@arco-design/web-react';
import { merge } from 'lodash-es';
import { useMenu } from '../hooks';
import * as dataCy from '../dataCy';
var OperationWrapper = function (props) {
    var operation = props.operation, inDropMenu = props.inDropMenu, children = props.children, popVisibleChange = props.popVisibleChange, currentPop = props.currentPop, setDropDownVisible = props.setDropDownVisible, index = props.index;
    var arcoPopoverProps = operation.arcoPopoverProps, arcoPopconfirmProps = operation.arcoPopconfirmProps, tooltip = operation.tooltip;
    var _a = __read(useMenu(), 2), control = _a[1];
    var clearActiveMenu = control.clearActiveMenu;
    // 在 popcomfirm 成功后需关闭下拉展示
    var handleConfirmOk = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.stopPropagation();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, ((_a = arcoPopconfirmProps === null || arcoPopconfirmProps === void 0 ? void 0 : arcoPopconfirmProps.onOk) === null || _a === void 0 ? void 0 : _a.call(arcoPopconfirmProps, e))];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('操作按钮 popconfirm 失败', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setDropDownVisible === null || setDropDownVisible === void 0 ? void 0 : setDropDownVisible(false);
                    clearActiveMenu();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // NOTE: 用于处理 arcoPopconfirmProps/arcoPopoverProps 时，生效范围不包括 Padding 部分
    var content = inDropMenu ? React.createElement("div", { style: { padding: '0 12px' } }, children) : children;
    if (arcoPopoverProps || tooltip) {
        var popPosition = inDropMenu ? 'right' : undefined;
        content = (React.createElement(Popover, __assign({ position: popPosition, content: tooltip }, arcoPopoverProps, { triggerProps: __assign({ updateOnScroll: true }, arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.triggerProps), popupVisible: (currentPop === null || currentPop === void 0 ? void 0 : currentPop.name) === (operation === null || operation === void 0 ? void 0 : operation.key) && (currentPop === null || currentPop === void 0 ? void 0 : currentPop.type) === 'popover', onVisibleChange: function (v) { return popVisibleChange({ type: 'popover', name: operation.key }, v); } }), content));
    }
    if (arcoPopconfirmProps) {
        // 在下拉菜单内时应该默认使用左侧位置
        var position = inDropMenu ? 'top' : undefined;
        var btnDataProps = {
            'data-cy': inDropMenu
                ? dataCy.getMenuItemConfirmCy(operation.index, operation.name)
                : dataCy.getButtonItemConfirmCy(operation.index, operation.name),
            'data-cy-idx': inDropMenu ? dataCy.getMenuItemConfirmIndexCy(index) : dataCy.getButtonItemConfirmIndexCy(index),
        };
        var _arcoPopconfirmProps = merge({}, arcoPopconfirmProps, { okButtonProps: btnDataProps });
        content = (React.createElement(Popconfirm, __assign({ position: position, disabled: operation.disabled }, _arcoPopconfirmProps, { onOk: handleConfirmOk, popupVisible: (currentPop === null || currentPop === void 0 ? void 0 : currentPop.name) === (operation === null || operation === void 0 ? void 0 : operation.key) && (currentPop === null || currentPop === void 0 ? void 0 : currentPop.type) === 'popconfirm', onVisibleChange: function (v) { return popVisibleChange({ type: 'popconfirm', name: operation.key }, v); } }), content));
    }
    /** 当有 popconfirm 时点击菜单不应关闭，所以停止冒泡 */
    return React.createElement("div", { onClick: function (e) { return !!arcoPopconfirmProps && e.stopPropagation(); } }, content);
};
export default OperationWrapper;
//# sourceMappingURL=OperationWrapper.js.map