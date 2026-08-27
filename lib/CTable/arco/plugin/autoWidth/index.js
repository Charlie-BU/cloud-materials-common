"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAutoWidth = void 0;
var utils_1 = require("../../../utils");
var utils_2 = require("../../utils");
exports.defaultAutoWidth = {
    type: 'default',
    getCellWidth: function (_a) {
        var content = _a.content;
        // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
        return (0, utils_1.getTextWidth)(content) + 5;
    },
    getHeaderCellWidth: function (_a) {
        var column = _a.column;
        var _b = (0, utils_2.getHeaderWidthInfo)(column), leftWidth = _b.leftWidth, rightWidth = _b.rightWidth;
        // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
        return leftWidth + (0, utils_1.getTextWidth)(column.title) + rightWidth + 5;
    },
    maxWidth: 240,
    minWidth: 100,
    // 存储的场景下，padding 占 32px
    blankWidth: 32,
};
//# sourceMappingURL=index.js.map