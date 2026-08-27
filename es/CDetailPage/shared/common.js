import { isFunction } from 'lodash-es';
/**
 * 处理可能是函数的参数
 * @param config
 * @param option
 * @returns
 */
export var runCallable = function (config, option) {
    if (isFunction(config)) {
        return config === null || config === void 0 ? void 0 : config(option);
    }
    return config;
};
//# sourceMappingURL=common.js.map