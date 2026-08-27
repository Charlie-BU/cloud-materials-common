"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoWidth = void 0;
var shared_1 = require("../../shared");
var getAutoWidth = function (table) {
    // 因为没有配置 width 信息的列，无法确定列宽的处理方式
    // 因此只有每一列都配置了 autoWidth 或者 width，才进入宽度自适应逻辑（可以使用 globalColumnConfig 一次性配置每一列）
    // const shouldAutoWidth = table.columns.every(
    //   column => Boolean(column.config.autoWidth) || Boolean(column.config.width),
    // );
    // if (!shouldAutoWidth) {
    //   return;
    // }
    // 收集每一列的宽度信息
    // const columnsWidthInfo: Record<
    //   string,
    //   { realWidth: number; fixedWidth: number; minWidth: number; maxWidth: number }
    // > = {};
    // 能计算出自适应的宽度最好，计算不出就算了，后面消费 columnsAutoWidth 的地方需要处理不存在的情况
    var autoWidthMap = {};
    table.columns
        .filter(function (item) { return item.show; })
        .forEach(function (column) {
        var _a;
        // 如果设置了宽度或者没有设置 autoWidth，不计算自适应宽度
        if (column.width || !column.config.autoWidth) {
            return;
        }
        var autoWidthConfig = table.plugin.getAutoWidth(column.config.autoWidth);
        var dataIndex = column.config.dataIndex;
        var headerWidth = ((_a = autoWidthConfig.getHeaderCellWidth) === null || _a === void 0 ? void 0 : _a.call(autoWidthConfig, { table: table, column: column })) || 0;
        var realWidth = headerWidth || 0;
        // 通过计算每一行的 cell 的宽度，获取最大值作为实际宽度
        table.rows.forEach(function (row) {
            var _a;
            var cell = row.getCellByDataIndex(dataIndex);
            var curRealWidth = ((_a = autoWidthConfig.getCellWidth) === null || _a === void 0 ? void 0 : _a.call(autoWidthConfig, {
                table: table,
                column: column,
                row: row,
                rowData: row.data,
                cell: cell,
                cellData: cell === null || cell === void 0 ? void 0 : cell.data,
                content: (0, shared_1.formatCellData)({
                    table: table,
                    column: column,
                    rowData: row.data,
                    cell: cell,
                    cellData: cell === null || cell === void 0 ? void 0 : cell.data,
                }),
            })) || 0;
            curRealWidth += autoWidthConfig.blankWidth || 0;
            if (curRealWidth > realWidth) {
                realWidth = curRealWidth;
            }
        });
        var autoWidth = realWidth;
        // 根据最大、最小宽度纠正真实宽度
        if (autoWidthConfig.maxWidth && realWidth > autoWidthConfig.maxWidth) {
            autoWidth = autoWidthConfig.maxWidth;
        }
        else if (autoWidthConfig.minWidth && realWidth < autoWidthConfig.minWidth) {
            autoWidth = autoWidthConfig.minWidth;
        }
        autoWidthMap[dataIndex] = autoWidth;
        // columnsWidthInfo[dataIndex] = {
        //   realWidth,
        //   fixedWidth,
        //   maxWidth: autoWidthConfig.maxWidth,
        //   minWidth: autoWidthConfig.minWidth,
        // };
    });
    /* 在存储的场景下，主要想达到的效果：
     * 1. 在内容不太长的时候，尽量不换行
     * 2. 在整个表格的内容很多时，能够撑开表格
     *
     * 针对自适应后的总宽度，主要有两种情况：
     * 1. 总宽度超过 table 宽度时，撑开 table，出现滚动条，能够达到上面两个诉求
     * 2. 总宽度小于 table 宽度时，浏览器会自己调整宽度（尽管我们指定了每一列的宽度），以充满整个 table，也能够达到上面两个诉求
     * 因此直接返回自适应后的宽度
     */
    return autoWidthMap;
    // return Object.keys(columnsWidthInfo).reduce((total, dataIndex) => {
    //   total[dataIndex] = columnsWidthInfo[dataIndex].fixedWidth;
    //   return total;
    // }, {});
    // const totalRealWidth = Object.values(columnsWidthInfo).reduce((total, cur) => {
    //   return total + cur.fixedWidth;
    // }, 0);
    // 如果没有配置 table 的宽度，或者实际总宽度大于 table 宽度，返回实际的宽度，将 table 撑开或出现横向滚动条
    // if (!table.width || totalRealWidth > table.width) {
    //   return Object.keys(columnsWidthInfo).reduce((total, dataIndex) => {
    //     total[dataIndex] = columnsWidthInfo[dataIndex].fixedWidth;
    //     return total;
    //   }, {});
    // }
    // // 实际的总宽度小于等于 table 的宽度，按比例分配宽度以充满总宽度
    // // 计算每列在计算比例时，占的宽度
    // const ratioWidthMap: Record<string, number> = {};
    // let ratioTotalWidth = 0;
    // Object.entries(columnsWidthInfo).forEach(([dataIndex, widthInfo]) => {
    //   let width = widthInfo.realWidth;
    //   // 如果宽度超过该列的最大宽度，将宽度增大，以增加最终的占比（最大不超多最大宽度的 1.5 倍）
    //   if (width > widthInfo.maxWidth) {
    //     width = Math.min(widthInfo.maxWidth * 1.5, width);
    //   }
    //   ratioTotalWidth += width;
    //   ratioWidthMap[dataIndex] = width;
    // });
    // const fixedWidthMap: Record<string, number> = {};
    // Object.entries(ratioWidthMap).forEach(([dataIndex, ratioWidth]) => {
    //   fixedWidthMap[dataIndex] = (ratioWidth / ratioTotalWidth) * table.width;
    // });
    // return fixedWidthMap;
};
exports.getAutoWidth = getAutoWidth;
//# sourceMappingURL=autoWidth.js.map