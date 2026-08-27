import { __assign, __read } from "tslib";
import { isBoolean, isPlainObject } from 'lodash-es';
var defaultConfig = {
    size: 'mini',
    simple: true,
    sizeCanChange: false,
    showTotal: false,
};
var basePagination = function (CTableProps) {
    var pagination = (CTableProps || {}).pagination;
    if (isBoolean(pagination) && pagination) {
        return __assign({}, defaultConfig);
    }
    if (isPlainObject(pagination)) {
        return __assign({}, pagination);
    }
    return false;
};
export var getPagination = function (props) {
    var CTableProps = props.CTableProps;
    if (!CTableProps) {
        return [false, false];
    }
    var _a = __read(CTableProps, 2), sourceCTableProps = _a[0], _b = _a[1], targetCTableProps = _b === void 0 ? {} : _b;
    return [basePagination(sourceCTableProps), basePagination(targetCTableProps)];
};
//# sourceMappingURL=getPagination.js.map