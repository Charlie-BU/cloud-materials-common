import { __assign } from "tslib";
import React from 'react';
import CFormDetail, { useFormDetail } from './components/CFormDetail';
import { getGlobalContextConfig } from '../../../CConfigProvider';
import CAgreement from '../Components/CAgreement';
export default (function (confirmConfig) {
    var _a;
    var locale = getGlobalContextConfig().locale;
    var detail = confirmConfig.detail, protocol = confirmConfig.protocol, _b = confirmConfig.stepTitle, stepTitle = _b === void 0 ? locale.CFormConfirm.confirm : _b, labelWidth = confirmConfig.labelWidth;
    return {
        name: 'confirm',
        title: stepTitle,
        fields: [
            {
                name: 'confirmDetail',
                type: 'VoidField',
                componentOptions: {
                    component: function () { return React.createElement(CFormDetail, { detail: detail, labelWidth: labelWidth }); },
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
                            component: CAgreement,
                            props: __assign({}, (protocol || {})),
                        },
                    },
                ],
            },
        ],
    };
});
export { useFormDetail };
//# sourceMappingURL=index.js.map