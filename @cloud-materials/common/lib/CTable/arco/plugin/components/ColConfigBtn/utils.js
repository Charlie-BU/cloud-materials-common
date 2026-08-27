"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTooltip = exports.setLocalStorageHiddenCols = exports.getLocalStorageHiddenCols = exports.resetLocalStorageHiddenCols = void 0;
/**
 * 清空 localStorage 中存储的被隐藏的列
 */
var resetLocalStorageHiddenCols = function (storage, localStorageKey) {
    if (!localStorageKey)
        return;
    storage.removeItem(localStorageKey);
};
exports.resetLocalStorageHiddenCols = resetLocalStorageHiddenCols;
/**
 * 获取 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @returns
 */
var getLocalStorageHiddenCols = function (storage, localStorageKey) {
    if (!localStorageKey)
        return;
    var savedKeys = storage.getItem(localStorageKey);
    if (savedKeys) {
        var hiddenCols = [];
        try {
            hiddenCols = JSON.parse(savedKeys);
        }
        catch (error) {
            console.error("[CTable] \u83B7\u53D6\u672C\u5730\u5B58\u50A8\u7684\u88AB\u9690\u85CF\u7684\u5217\u5931\u8D25, key:".concat(localStorageKey, "."), error);
        }
        return hiddenCols;
    }
};
exports.getLocalStorageHiddenCols = getLocalStorageHiddenCols;
/**
 * 设置 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @param hiddenCols
 */
var setLocalStorageHiddenCols = function (storage, hiddenCols, localStorageKey) {
    if (localStorageKey) {
        storage.setItem(localStorageKey, JSON.stringify(hiddenCols));
    }
};
exports.setLocalStorageHiddenCols = setLocalStorageHiddenCols;
/**
 * 获取自定义列中该列展示的 tooltip
 * @param tooltipConfig 自定义列组件的 columnTooltip
 * @param dataIndex 该列的 dataIndex
 * @param columnTooltip 该列 column 中的 tooltip 配置
 * @returns
 */
var getTooltip = function (tooltipConfig, dataIndex, columnTooltip) {
    if (!tooltipConfig) {
        return undefined;
    }
    if (tooltipConfig === true) {
        return columnTooltip;
    }
    var _tooltip = tooltipConfig[dataIndex];
    if (_tooltip === true) {
        return columnTooltip;
    }
    return _tooltip;
};
exports.getTooltip = getTooltip;
//# sourceMappingURL=utils.js.map