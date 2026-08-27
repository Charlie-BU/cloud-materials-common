"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyStaticsFromArcoModal = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var CAgreement_1 = tslib_1.__importDefault(require("../CAgreement"));
var CConfigProvider_1 = require("../CConfigProvider");
var Base_1 = require("./Base");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var createDeferred_1 = require("../_utils/createDeferred");
var staticsKeys = ['confirm', 'error', 'info', 'warning', 'success'];
var modalTypeIconMap = {
    confirm: react_1.default.createElement(iconbox_react_ve_o_design_1.IconExclamationCircleFill, null),
    error: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCloseCircleFill, null),
    info: react_1.default.createElement(iconbox_react_ve_o_design_1.IconInfoCircleFill, null),
    success: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleFill, null),
    warning: react_1.default.createElement(iconbox_react_ve_o_design_1.IconExclamationCircleFill, null),
};
var copyStaticsFromArcoModal = function (CModal) {
    var closeAll = CModal.closeAll;
    CModal.closeAll = function () {
        closeAll();
        web_react_1.Modal.destroyAll();
    };
    var statics = staticsKeys.reduce(function (prev, current) {
        prev[current] = function (_a) {
            var _b;
            var agreement = _a.agreement, content = _a.content, popoverOnOk = _a.popoverOnOk, footer = _a.footer, props = tslib_1.__rest(_a, ["agreement", "content", "popoverOnOk", "footer"]);
            var _c = tslib_1.__read((0, createDeferred_1.createDeferred)(), 3), promise = _c[0], resolve = _c[1], reject = _c[2];
            var okButtonProps = tslib_1.__assign({ 
                // @ts-ignore
                'data-testid': Base_1.testId.okBtn, disabled: Boolean(agreement) }, props.okButtonProps);
            var prefixCls = (0, CConfigProvider_1.getGlobalContextConfig)().prefixCls;
            var checkedFlag = false;
            var renderFooter = function (cancel, ok) { return (react_1.default.createElement(react_1.default.Fragment, null,
                !props.hideCancel && cancel,
                popoverOnOk ? (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({}, popoverOnOk, { disabled: checkedFlag }), react_1.default.cloneElement(ok, { className: "".concat(prefixCls !== null && prefixCls !== void 0 ? prefixCls : 'arco', "-btn") }))) : (ok))); };
            var modalReturn = web_react_1.Modal[current](tslib_1.__assign(tslib_1.__assign({ prefixCls: prefixCls, closable: true, closeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null), icon: modalTypeIconMap[current] }, props), { footer: footer === null ? footer : footer !== null && footer !== void 0 ? footer : renderFooter, content: agreement ? (react_1.default.createElement(react_1.default.Fragment, null,
                    content,
                    react_1.default.createElement(CAgreement_1.default, tslib_1.__assign({ style: { marginTop: 16 } }, (typeof agreement === 'string'
                        ? { prefix: agreement, link: [] }
                        : tslib_1.__assign(tslib_1.__assign({}, agreement), { link: (_b = agreement.link) !== null && _b !== void 0 ? _b : [] })), { onChange: function (checked) {
                            var _a;
                            checkedFlag = checked;
                            modalReturn.update({
                                okButtonProps: tslib_1.__assign(tslib_1.__assign({}, okButtonProps), { disabled: !checked }),
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
                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                        var error_1;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, ((_a = props.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([props], tslib_1.__read(args), false)))];
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
                }, okButtonProps: okButtonProps, cancelButtonProps: tslib_1.__assign({ 
                    // @ts-ignore
                    'data-testid': Base_1.testId.cancelBtn }, props.cancelButtonProps), onCancel: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([props], tslib_1.__read(args), false));
                    resolve(false);
                } }));
            return Object.assign(promise, modalReturn);
        };
        return prev;
    }, {});
    return Object.assign(CModal, statics);
};
exports.copyStaticsFromArcoModal = copyStaticsFromArcoModal;
//# sourceMappingURL=copyStaticsFromArcoModal.js.map