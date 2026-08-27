"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixComponentConfig = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-12 17:15:35
 * @LastEditTime: 2021-10-12 17:17:51
 * @LastEditors: youjingyu
 * @Description:
 */
var checkers_1 = require("./checkers");
var fixComponentConfig = function (componentConfig, componentProps) {
    if ((0, checkers_1.isArr)(componentConfig)) {
        return componentConfig;
    }
    return [componentConfig, componentProps];
};
exports.fixComponentConfig = fixComponentConfig;
//# sourceMappingURL=config.js.map