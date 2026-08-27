"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCallable = void 0;
var lodash_es_1 = require("lodash-es");
/**
 * 处理可能是函数的参数
 * @param config
 * @param option
 * @returns
 */
var runCallable = function (config, option) {
    if ((0, lodash_es_1.isFunction)(config)) {
        return config === null || config === void 0 ? void 0 : config(option);
    }
    return config;
};
exports.runCallable = runCallable;
//# sourceMappingURL=common.js.map