import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useUpdateEffect } from 'ahooks';
import React, { useRef, useState } from 'react';
import { useMaskableContext } from '../components';
import { Popconfirm } from '@arco-design/web-react';
import { isFunction } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';
export var useFooter = function (_a) {
    var visible = _a.visible, onOk = _a.onOk, onCancel = _a.onCancel, confirmOnOk = _a.confirmOnOk, footer = _a.footer, hideCancel = _a.hideCancel, componentName = _a.componentName;
    var createLogger = useCConfigContext().createLogger;
    var logger = createLogger(componentName);
    var _b = __read(useState(Boolean(visible)), 2), innerVisible = _b[0], setVisible = _b[1];
    var _c = __read(useState(false), 2), confirmLoading = _c[0], setConfirmLoading = _c[1];
    var isNotControlled = typeof visible === 'number';
    var onOkGuardPool = useMaskableContext().onOkGuardPool;
    var onOkArgsRef = useRef([]);
    var shouldOkConfirm = Boolean(confirmOnOk && !confirmOnOk.disabled);
    useUpdateEffect(function () {
        setVisible(Boolean(visible));
    }, [visible]);
    var handleOk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var allowContinue, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = onOkGuardPool.length === 0;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(onOkGuardPool.map(function (guard) { return guard(); })).then(function (result) { return result.every(Boolean); })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        allowContinue = _a;
                        // 有任何一个Guard返回了false，则终止onOK并不去隐藏组件
                        if (!allowContinue) {
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 6, 7]);
                        setConfirmLoading(true);
                        return [4 /*yield*/, (onOk === null || onOk === void 0 ? void 0 : onOk.apply(void 0, __spreadArray([], __read(args), false)))];
                    case 4:
                        _b.sent();
                        if (isNotControlled) {
                            setVisible(false);
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _b.sent();
                        logger.error({ error: error_1, message: 'onOk error' });
                        return [3 /*break*/, 7];
                    case 6:
                        setConfirmLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    var handleCancel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNotControlled) {
            setVisible(false);
        }
        onCancel === null || onCancel === void 0 ? void 0 : onCancel.apply(void 0, __spreadArray([], __read(args), false));
    };
    var renderFooter = function (cancelButtonNode, okButtonNode) {
        var newOkButtonNode = confirmOnOk ? (React.createElement(Popconfirm, __assign({}, confirmOnOk, { onOk: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return Promise.resolve((_a = confirmOnOk.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([confirmOnOk], __read(args), false))).then(function () { return handleOk.apply(void 0, __spreadArray([], __read(onOkArgsRef.current), false)); });
            } }), okButtonNode)) : (okButtonNode);
        return isFunction(footer)
            ? footer(cancelButtonNode, newOkButtonNode)
            : footer !== null && footer !== void 0 ? footer : (React.createElement(React.Fragment, null,
                !hideCancel && cancelButtonNode,
                newOkButtonNode));
    };
    return [
        {
            onOk: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (shouldOkConfirm) {
                    onOkArgsRef.current = args;
                    return;
                }
                return handleOk.apply(void 0, __spreadArray([], __read(args), false));
            },
            onCancel: handleCancel,
            visible: innerVisible,
            confirmLoading: confirmLoading,
            footer: footer === null ? null : renderFooter,
        },
        { setVisible: setVisible },
    ];
};
//# sourceMappingURL=useFooter.js.map