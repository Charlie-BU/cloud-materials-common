"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var defaultConfig = {
    size: 'mini',
    simple: true,
    sizeCanChange: false,
    showTotal: false,
};
var basePagination = function (CTableProps) {
    var pagination = (CTableProps || {}).pagination;
    if ((0, lodash_es_1.isBoolean)(pagination) && pagination) {
        return tslib_1.__assign({}, defaultConfig);
    }
    if ((0, lodash_es_1.isPlainObject)(pagination)) {
        return tslib_1.__assign({}, pagination);
    }
    return false;
};
var getPagination = function (props) {
    var CTableProps = props.CTableProps;
    if (!CTableProps) {
        return [false, false];
    }
    var _a = tslib_1.__read(CTableProps, 2), sourceCTableProps = _a[0], _b = _a[1], targetCTableProps = _b === void 0 ? {} : _b;
    return [basePagination(sourceCTableProps), basePagination(targetCTableProps)];
};
exports.getPagination = getPagination;
//# sourceMappingURL=getPagination.js.map