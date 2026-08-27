import { isUndefined } from 'lodash-es';
/**
 * 获取分段选择器带索引的data-Cy生成函数
 * @param param0
 * @returns
 */
export var getBtnDataSuffix = function (_a) {
    var props = _a.props;
    var currentIndex = props === null || props === void 0 ? void 0 : props['data-inner-index'];
    var suffix = isUndefined(currentIndex) ? '' : "-index".concat(currentIndex);
    return function (prefix) {
        return prefix + suffix;
    };
};
//# sourceMappingURL=util.js.map