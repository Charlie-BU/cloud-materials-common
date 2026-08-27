import { createEffectHook } from '@formily/core';
export var onCFormDataChange = createEffectHook('onCFormDataChange', function (data, form) { return function (listener) {
    listener(data, form);
}; });
//# sourceMappingURL=effects.js.map