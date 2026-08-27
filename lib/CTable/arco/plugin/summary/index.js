"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
var shared_1 = require("../../../shared");
exports.sum = {
    type: 'sum',
    computedFn: function (_a) {
        var rows = _a.rows, column = _a.column;
        return rows.reduce(function (total, current) { return total + Number((0, shared_1.getCellData)(current.data, column.config.dataIndex)); }, 0);
    },
};
//# sourceMappingURL=index.js.map