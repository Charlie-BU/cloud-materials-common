import { isArray, isBoolean, isEmpty, isNil, isNumber, isString, isSymbol, chunk, sum } from 'lodash-es';
export var conversion = function (baseArray, col, direction) {
    if (!Array.isArray(baseArray) || baseArray.length === 0) {
        return [];
    }
    if (direction === 'column') {
        var len = baseArray.length;
        var lineNum = Math.ceil(len / col);
        return chunk(baseArray, lineNum);
    }
    else {
        var rows_1 = [];
        var rowIndex_1 = 0;
        baseArray.forEach(function (item) {
            if (rows_1[rowIndex_1] === undefined) {
                rows_1[rowIndex_1] = []; // 当前行没有元素，给 空字符串
            }
            rows_1[rowIndex_1].push(item); // push元素
            var rowSpan = sum(rows_1[rowIndex_1].map(function (v) { var _a; return (v === null || v === void 0 ? void 0 : v.span) || ((_a = v === null || v === void 0 ? void 0 : v.props) === null || _a === void 0 ? void 0 : _a.span) || 1; })); // 计算当前行总的 span
            if (rowSpan >= col) {
                // 加起来大于等于 col 就换行
                rowIndex_1 += 1;
            }
        });
        return rows_1;
    }
};
export var calcSpan = function (props) {
    var _a;
    var infoItem = props.infoItem, colNumber = props.colNumber;
    var span = (infoItem === null || infoItem === void 0 ? void 0 : infoItem.span) || ((_a = infoItem === null || infoItem === void 0 ? void 0 : infoItem.props) === null || _a === void 0 ? void 0 : _a.span) || 1;
    var colSpan = (span / colNumber) * 24;
    return colSpan;
};
/**
 * 格式化数据
 * @param props
 * @returns
 */
export var formatListData = function (props) {
    var _a = props.listData, listData = _a === void 0 ? [] : _a, _b = props.direction, direction = _b === void 0 ? 'row' : _b, _c = props.colNumber, colNumber = _c === void 0 ? 2 : _c;
    listData.forEach(function (infoSection) {
        var _a;
        // 历史逻辑：自己传入已分隔的数据，直接返回；为什么多个数据源字段。。
        if (infoSection.splitItemList) {
            return;
        }
        var _colNumber = (infoSection.colNumber || colNumber);
        var filterItemList = (_a = infoSection.infoItemList) === null || _a === void 0 ? void 0 : _a.filter(function (v) { return !v.hidden; });
        infoSection.splitItemList = conversion(filterItemList, _colNumber, direction);
    });
    return listData;
};
export var filterChildrenType = function (children) {
    return (isNil(children) ||
        isBoolean(children) ||
        isString(children) ||
        isArray(children) ||
        isSymbol(children) ||
        isNumber(children) ||
        isEmpty(children));
};
/**
 * 格式化 CInfoSection 的 children
 */
export var formatSectionChildren = function (opts) {
    var _a;
    var children = opts.children;
    if (isNil(children)) {
        return [];
    }
    if (!isArray(children) && typeof children === 'object') {
        children = [children];
    }
    if (isArray(children)) {
        children = (_a = children === null || children === void 0 ? void 0 : children.filter) === null || _a === void 0 ? void 0 : _a.call(children, function (ele) { return !filterChildrenType(ele); });
    }
    var filterChildren = children === null || children === void 0 ? void 0 : children.filter(function (v) { var _a; return !((_a = v === null || v === void 0 ? void 0 : v.props) === null || _a === void 0 ? void 0 : _a.hidden); });
    var res = conversion(filterChildren, opts.colNumber || 2, opts.direction);
    return res;
};
//# sourceMappingURL=util.js.map