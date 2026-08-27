// title 两边有 16px 的 padding
var padding = 16;
// 每个 icon 的宽度
var iconWidth = 12;
// 每个 icon 有 4px 的 margin left
var iconMarginLeft = 4;
export var getHeaderWidthInfo = function (column) {
    // 标题文字右边的宽度默认为 padding
    var rightWidth = padding;
    // 按照 icon 的排序依次加上对应的宽度
    if (column.config.tooltip) {
        // title 后面的 tooltip
        rightWidth += iconMarginLeft + iconWidth;
    }
    if (column.config.sorter) {
        // 排序 icon
        rightWidth += iconMarginLeft + iconWidth;
    }
    if (column.config.filter) {
        // 过滤 icon
        rightWidth += iconMarginLeft + 12;
        // 有过滤按钮时，右边 padding 是 28
        // 默认的 padding 是 16，相当于多了 12
        rightWidth += 12;
        // TODO：filter 右边有 6px 的不明宽度，暂时没看出来是啥
        rightWidth += 6;
    }
    // 同时有过滤和排序时，右边的 padding 是 0，因此扣除 28
    if (column.config.sorter && column.config.filter) {
        rightWidth = rightWidth - 28;
    }
    return {
        // title 文案左边的宽度
        leftWidth: padding,
        // title 文案右边的宽度
        rightWidth: rightWidth,
    };
};
// 获取 cell 内的数字右对齐时，让开的 icon 部分的宽度
export var getAlignRightWidth = function (column) {
    // 减去 padding 是因为 cell 自己也有 padding，不需要让开这部分宽度
    return getHeaderWidthInfo(column).rightWidth - padding;
};
//# sourceMappingURL=getHeaderWidthInfo.js.map