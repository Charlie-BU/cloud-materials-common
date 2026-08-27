"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var hooks_1 = require("../hooks");
var dataCy = tslib_1.__importStar(require("../dataCy"));
var OperationWrapper = function (props) {
    var operation = props.operation, inDropMenu = props.inDropMenu, children = props.children, popVisibleChange = props.popVisibleChange, currentPop = props.currentPop, setDropDownVisible = props.setDropDownVisible, index = props.index;
    var arcoPopoverProps = operation.arcoPopoverProps, arcoPopconfirmProps = operation.arcoPopconfirmProps, tooltip = operation.tooltip;
    var _a = tslib_1.__read((0, hooks_1.useMenu)(), 2), control = _a[1];
    var clearActiveMenu = control.clearActiveMenu;
    // 在 popcomfirm 成功后需关闭下拉展示
    var handleConfirmOk = function (e) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
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
    var content = inDropMenu ? react_1.default.createElement("div", { style: { padding: '0 12px' } }, children) : children;
    if (arcoPopoverProps || tooltip) {
        var popPosition = inDropMenu ? 'right' : undefined;
        content = (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ position: popPosition, content: tooltip }, arcoPopoverProps, { triggerProps: tslib_1.__assign({ updateOnScroll: true }, arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.triggerProps), popupVisible: (currentPop === null || currentPop === void 0 ? void 0 : currentPop.name) === (operation === null || operation === void 0 ? void 0 : operation.key) && (currentPop === null || currentPop === void 0 ? void 0 : currentPop.type) === 'popover', onVisibleChange: function (v) { return popVisibleChange({ type: 'popover', name: operation.key }, v); } }), content));
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
        var _arcoPopconfirmProps = (0, lodash_es_1.merge)({}, arcoPopconfirmProps, { okButtonProps: btnDataProps });
        content = (react_1.default.createElement(web_react_1.Popconfirm, tslib_1.__assign({ position: position, disabled: operation.disabled }, _arcoPopconfirmProps, { onOk: handleConfirmOk, popupVisible: (currentPop === null || currentPop === void 0 ? void 0 : currentPop.name) === (operation === null || operation === void 0 ? void 0 : operation.key) && (currentPop === null || currentPop === void 0 ? void 0 : currentPop.type) === 'popconfirm', onVisibleChange: function (v) { return popVisibleChange({ type: 'popconfirm', name: operation.key }, v); } }), content));
    }
    /** 当有 popconfirm 时点击菜单不应关闭，所以停止冒泡 */
    return react_1.default.createElement("div", { onClick: function (e) { return !!arcoPopconfirmProps && e.stopPropagation(); } }, content);
};
exports.default = OperationWrapper;
//# sourceMappingURL=OperationWrapper.js.map