import { __assign } from "tslib";
import React from 'react';
import { IconAttachment, IconDocumentFeedback, IconKnowledge } from '@arco-design/iconbox-react-ve-o-design';
export var getCLinkStyle = function (size, style) {
    if (typeof size === 'number') {
        return __assign(__assign({}, style), { fontSize: "".concat(size, "px") });
    }
    else if (size === 'small') {
        return __assign(__assign({}, style), { fontSize: '12px' });
    }
    return style;
};
export var getInnerLinkSetting = function (locale) { return ({
    default: undefined,
    example: { icon: React.createElement(IconKnowledge, null), label: locale.CLink.example },
    'help-doc': { icon: React.createElement(IconDocumentFeedback, null), label: locale.CLink.helpDoc },
    file: { icon: React.createElement(IconAttachment, null), label: locale.CLink.file },
}); };
//# sourceMappingURL=utils.js.map