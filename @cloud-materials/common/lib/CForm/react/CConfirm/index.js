"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormDetail = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CFormDetail_1 = tslib_1.__importStar(require("./components/CFormDetail"));
Object.defineProperty(exports, "useFormDetail", { enumerable: true, get: function () { return CFormDetail_1.useFormDetail; } });
var CConfigProvider_1 = require("../../../CConfigProvider");
var CAgreement_1 = tslib_1.__importDefault(require("../Components/CAgreement"));
exports.default = (function (confirmConfig) {
    var _a;
    var locale = (0, CConfigProvider_1.getGlobalContextConfig)().locale;
    var detail = confirmConfig.detail, protocol = confirmConfig.protocol, _b = confirmConfig.stepTitle, stepTitle = _b === void 0 ? locale.CFormConfirm.confirm : _b, labelWidth = confirmConfig.labelWidth;
    return {
        name: 'confirm',
        title: stepTitle,
        fields: [
            {
                name: 'confirmDetail',
                type: 'VoidField',
                componentOptions: {
                    component: function () { return react_1.default.createElement(CFormDetail_1.default, { detail: detail, labelWidth: labelWidth }); },
                },
            },
            {
                name: 'confirmProtocol',
                type: 'VoidField',
                visible: !!protocol,
                fields: [
                    {
                        name: 'protocol',
                        title: (_a = protocol === null || protocol === void 0 ? void 0 : protocol.protocolLabel) !== null && _a !== void 0 ? _a : '',
                        componentOptions: {
                            component: CAgreement_1.default,
                            props: tslib_1.__assign({}, (protocol || {})),
                        },
                    },
                ],
            },
        ],
    };
});
//# sourceMappingURL=index.js.map