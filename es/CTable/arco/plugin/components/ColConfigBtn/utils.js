/**
 * 清空 localStorage 中存储的被隐藏的列
 */
export var resetLocalStorageHiddenCols = function (storage, localStorageKey) {
    if (!localStorageKey)
        return;
    storage.removeItem(localStorageKey);
};
/**
 * 获取 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @returns
 */
export var getLocalStorageHiddenCols = function (storage, localStorageKey) {
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
/**
 * 设置 localStorage 中存储的被隐藏的列
 * @param localStorageKey
 * @param hiddenCols
 */
export var setLocalStorageHiddenCols = function (storage, hiddenCols, localStorageKey) {
    if (localStorageKey) {
        storage.setItem(localStorageKey, JSON.stringify(hiddenCols));
    }
};
/**
 * 获取自定义列中该列展示的 tooltip
 * @param tooltipConfig 自定义列组件的 columnTooltip
 * @param dataIndex 该列的 dataIndex
 * @param columnTooltip 该列 column 中的 tooltip 配置
 * @returns
 */
export var getTooltip = function (tooltipConfig, dataIndex, columnTooltip) {
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
//# sourceMappingURL=utils.js.map