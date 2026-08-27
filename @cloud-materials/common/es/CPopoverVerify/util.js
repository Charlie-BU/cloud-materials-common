import { __assign } from "tslib";
import React from 'react';
import { IconCheckCircleFill, IconCloseCircleFill, IconCheckCircleFilled, } from '@arco-design/iconbox-react-ve-o-design';
export var ICONS = {
    init: React.createElement(IconCheckCircleFilled, null),
    success: React.createElement(IconCheckCircleFill, null),
    error: React.createElement(IconCloseCircleFill, null),
};
export var formatRules = function (rules) {
    return rules.map(function (rule, index) {
        var _a;
        return __assign(__assign({}, rule), { key: ((_a = rule === null || rule === void 0 ? void 0 : rule.key) !== null && _a !== void 0 ? _a : index) });
    });
};
//# sourceMappingURL=util.js.map