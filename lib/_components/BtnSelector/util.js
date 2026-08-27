"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBtnDataSuffix = void 0;
var lodash_es_1 = require("lodash-es");
/**
 * 获取分段选择器带索引的data-Cy生成函数
 * @param param0
 * @returns
 */
var getBtnDataSuffix = function (_a) {
    var props = _a.props;
    var currentIndex = props === null || props === void 0 ? void 0 : props['data-inner-index'];
    var suffix = (0, lodash_es_1.isUndefined)(currentIndex) ? '' : "-index".concat(currentIndex);
    return function (prefix) {
        return prefix + suffix;
    };
};
exports.getBtnDataSuffix = getBtnDataSuffix;
//# sourceMappingURL=util.js.map