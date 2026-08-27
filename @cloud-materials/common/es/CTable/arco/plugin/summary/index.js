import { getCellData } from '../../../shared';
export var sum = {
    type: 'sum',
    computedFn: function (_a) {
        var rows = _a.rows, column = _a.column;
        return rows.reduce(function (total, current) { return total + Number(getCellData(current.data, column.config.dataIndex)); }, 0);
    },
};
//# sourceMappingURL=index.js.map