"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCFormDataChange = void 0;
var core_1 = require("@formily/core");
exports.onCFormDataChange = (0, core_1.createEffectHook)('onCFormDataChange', function (data, form) { return function (listener) {
    listener(data, form);
}; });
//# sourceMappingURL=effects.js.map