"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchInput = exports.range = exports.select = void 0;
var icon_1 = require("@arco-design/web-react/icon");
var FilterSearch_1 = require("../components/FilterSearch");
// arco 自己就实现了 radio 和 checkbox 的 filter component，
// 因此不传递 filter component，然后通过通过 arco 的 filterMultiple 来控制 radio 和 checkbox
// 本质上是在连接 arco 的实现中，开的后门
exports.select = {
    type: 'select',
    filterFn: function (_a) {
        var filterValue = _a.filterValue, cellData = _a.cellData;
        var arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
        if (arrFilterVal.length === 0) {
            return true;
        }
        return arrFilterVal.includes(cellData);
    },
};
exports.range = {
    type: 'range',
    filterFn: function (_a) {
        var filterValue = _a.filterValue, cellData = _a.cellData;
        var arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
        if (arrFilterVal.length === 0) {
            return true;
        }
        return arrFilterVal.every(function (val) { return cellData > val; });
    },
};
exports.searchInput = {
    type: 'searchInput',
    filterFn: function (_a) {
        var _b;
        var filterValue = _a.filterValue, cellData = _a.cellData;
        var arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
        if (arrFilterVal.length === 0) {
            return true;
        }
        return ((_b = cellData === null || cellData === void 0 ? void 0 : cellData.toString()) === null || _b === void 0 ? void 0 : _b.indexOf(arrFilterVal[0])) > -1;
    },
    icon: icon_1.IconSearch,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component: FilterSearch_1.SearchInput,
    componentProps: {
        dropdownProps: {
            triggerProps: {
                position: 'bottom',
                // 为了保持搜索框的值
                unmountOnExit: false,
            },
        },
    },
};
//# sourceMappingURL=index.js.map