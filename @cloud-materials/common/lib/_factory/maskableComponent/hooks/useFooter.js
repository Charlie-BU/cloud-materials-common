"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFooter = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var react_1 = tslib_1.__importStar(require("react"));
var components_1 = require("../components");
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../../CConfigProvider");
var useFooter = function (_a) {
    var visible = _a.visible, onOk = _a.onOk, onCancel = _a.onCancel, confirmOnOk = _a.confirmOnOk, footer = _a.footer, hideCancel = _a.hideCancel, componentName = _a.componentName;
    var createLogger = (0, CConfigProvider_1.useCConfigContext)().createLogger;
    var logger = createLogger(componentName);
    var _b = tslib_1.__read((0, react_1.useState)(Boolean(visible)), 2), innerVisible = _b[0], setVisible = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), confirmLoading = _c[0], setConfirmLoading = _c[1];
    var isNotControlled = typeof visible === 'number';
    var onOkGuardPool = (0, components_1.useMaskableContext)().onOkGuardPool;
    var onOkArgsRef = (0, react_1.useRef)([]);
    var shouldOkConfirm = Boolean(confirmOnOk && !confirmOnOk.disabled);
    (0, ahooks_1.useUpdateEffect)(function () {
        setVisible(Boolean(visible));
    }, [visible]);
    var handleOk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var allowContinue, _a, error_1;
            return tslib_1.__generator(this, function (_b) {
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
                        return [4 /*yield*/, (onOk === null || onOk === void 0 ? void 0 : onOk.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)))];
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
        onCancel === null || onCancel === void 0 ? void 0 : onCancel.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
    };
    var renderFooter = function (cancelButtonNode, okButtonNode) {
        var newOkButtonNode = confirmOnOk ? (react_1.default.createElement(web_react_1.Popconfirm, tslib_1.__assign({}, confirmOnOk, { onOk: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return Promise.resolve((_a = confirmOnOk.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([confirmOnOk], tslib_1.__read(args), false))).then(function () { return handleOk.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(onOkArgsRef.current), false)); });
            } }), okButtonNode)) : (okButtonNode);
        return (0, lodash_es_1.isFunction)(footer)
            ? footer(cancelButtonNode, newOkButtonNode)
            : footer !== null && footer !== void 0 ? footer : (react_1.default.createElement(react_1.default.Fragment, null,
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
                return handleOk.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
            },
            onCancel: handleCancel,
            visible: innerVisible,
            confirmLoading: confirmLoading,
            footer: footer === null ? null : renderFooter,
        },
        { setVisible: setVisible },
    ];
};
exports.useFooter = useFooter;
//# sourceMappingURL=useFooter.js.map