import { __assign, __awaiter, __generator, __read, __rest, __spreadArray } from "tslib";
import { Modal, Popover } from '@arco-design/web-react';
import React from 'react';
import CAgreement from '../CAgreement';
import { getGlobalContextConfig } from '../CConfigProvider';
import { testId } from './Base';
import { IconClose, IconInfoCircleFill, IconCheckCircleFill, IconExclamationCircleFill, IconCloseCircleFill, } from '@arco-design/iconbox-react-ve-o-design';
import { createDeferred } from '../_utils/createDeferred';
var staticsKeys = ['confirm', 'error', 'info', 'warning', 'success'];
var modalTypeIconMap = {
    confirm: React.createElement(IconExclamationCircleFill, null),
    error: React.createElement(IconCloseCircleFill, null),
    info: React.createElement(IconInfoCircleFill, null),
    success: React.createElement(IconCheckCircleFill, null),
    warning: React.createElement(IconExclamationCircleFill, null),
};
export var copyStaticsFromArcoModal = function (CModal) {
    var closeAll = CModal.closeAll;
    CModal.closeAll = function () {
        closeAll();
        Modal.destroyAll();
    };
    var statics = staticsKeys.reduce(function (prev, current) {
        prev[current] = function (_a) {
            var _b;
            var agreement = _a.agreement, content = _a.content, popoverOnOk = _a.popoverOnOk, footer = _a.footer, props = __rest(_a, ["agreement", "content", "popoverOnOk", "footer"]);
            var _c = __read(createDeferred(), 3), promise = _c[0], resolve = _c[1], reject = _c[2];
            var okButtonProps = __assign({ 
                // @ts-ignore
                'data-testid': testId.okBtn, disabled: Boolean(agreement) }, props.okButtonProps);
            var prefixCls = getGlobalContextConfig().prefixCls;
            var checkedFlag = false;
            var renderFooter = function (cancel, ok) { return (React.createElement(React.Fragment, null,
                !props.hideCancel && cancel,
                popoverOnOk ? (React.createElement(Popover, __assign({}, popoverOnOk, { disabled: checkedFlag }), React.cloneElement(ok, { className: "".concat(prefixCls !== null && prefixCls !== void 0 ? prefixCls : 'arco', "-btn") }))) : (ok))); };
            var modalReturn = Modal[current](__assign(__assign({ prefixCls: prefixCls, closable: true, closeIcon: React.createElement(IconClose, null), icon: modalTypeIconMap[current] }, props), { footer: footer === null ? footer : footer !== null && footer !== void 0 ? footer : renderFooter, content: agreement ? (React.createElement(React.Fragment, null,
                    content,
                    React.createElement(CAgreement, __assign({ style: { marginTop: 16 } }, (typeof agreement === 'string'
                        ? { prefix: agreement, link: [] }
                        : __assign(__assign({}, agreement), { link: (_b = agreement.link) !== null && _b !== void 0 ? _b : [] })), { onChange: function (checked) {
                            var _a;
                            checkedFlag = checked;
                            modalReturn.update({
                                okButtonProps: __assign(__assign({}, okButtonProps), { disabled: !checked }),
                            });
                            if (typeof agreement !== 'string') {
                                return (_a = agreement.onChange) === null || _a === void 0 ? void 0 : _a.call(agreement, checked);
                            }
                        } })))) : (content), onOk: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, ((_a = props.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], __read(args), false)))];
                                case 1:
                                    _b.sent();
                                    resolve(true);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    throw error_1;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                }, okButtonProps: okButtonProps, cancelButtonProps: __assign({ 
                    // @ts-ignore
                    'data-testid': testId.cancelBtn }, props.cancelButtonProps), onCancel: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], __read(args), false));
                    resolve(false);
                } }));
            return Object.assign(promise, modalReturn);
        };
        return prev;
    }, {});
    return Object.assign(CModal, statics);
};
//# sourceMappingURL=copyStaticsFromArcoModal.js.map