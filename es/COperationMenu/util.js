import { __assign, __read } from "tslib";
import { set } from 'lodash-es';
/**
 * 删除不可见的 operation
 * @param operation
 */
export var removeInvisibleOperation = function (operation, index, parentKey) {
    var _a, _b;
    var _opertaion = __assign({}, operation);
    if (operation.visible === false) {
        return undefined;
    }
    else if (operation.subOperation) {
        _opertaion.subOperation = [];
        var visibleOperation = (_a = operation.subOperation) === null || _a === void 0 ? void 0 : _a.filter(function (o) { return (o === null || o === void 0 ? void 0 : o.visible) !== false; });
        if ((visibleOperation === null || visibleOperation === void 0 ? void 0 : visibleOperation.length) > 0) {
            visibleOperation.forEach(function (item, i) {
                var _a;
                var key = "".concat(parentKey ? "".concat(parentKey, ".") : '').concat(makeKey("".concat(index).concat(i), operation.name));
                var result = removeInvisibleOperation(item, "".concat(index).concat(i), key);
                if (result) {
                    (_a = _opertaion === null || _opertaion === void 0 ? void 0 : _opertaion.subOperation) === null || _a === void 0 ? void 0 : _a.push(result);
                }
            });
            if (((_b = _opertaion === null || _opertaion === void 0 ? void 0 : _opertaion.subOperation) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    var key = "".concat(parentKey ? "".concat(parentKey, ".") : '').concat(makeKey(index, operation.name));
    set(_opertaion, 'key', key);
    set(_opertaion, 'index', index);
    return _opertaion;
};
/**
 *
 * 对操作进行分组
 * 并过滤掉 visible 是 false 的操作
 * 例如：[1,2,3,[4],5,[6,7,8], 9] => [[1,2,3], [4], [5], [6,7,8], [9]]
 * @param operation
 */
export function groupOperation(operation) {
    var newOperation = [];
    var tempGroup = [];
    operation === null || operation === void 0 ? void 0 : operation.forEach(function (item, index) {
        if (item instanceof Array) {
            item.forEach(function (sub, i) {
                var temp = removeInvisibleOperation(sub, "".concat(index).concat(i));
                if (temp) {
                    tempGroup.push(temp);
                }
            });
            if ((tempGroup === null || tempGroup === void 0 ? void 0 : tempGroup.length) > 0) {
                newOperation.push(tempGroup);
                tempGroup = [];
            }
        }
        else {
            var temp = removeInvisibleOperation(item, "".concat(index));
            if (temp) {
                tempGroup.push(temp);
            }
        }
        var next = operation[index + 1];
        if (next instanceof Array && tempGroup.length > 0) {
            newOperation.push(tempGroup);
            tempGroup = [];
        }
    });
    if (tempGroup.length > 0) {
        newOperation.push(tempGroup);
    }
    return newOperation;
}
/**
 * 从二维数组中取出前n个保持后面的结构不变
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [[3],[4,5]]
 * @param operation
 * @param displayNum
 */
export function splitOperation(operation, displayNum) {
    var poped = operation.reduce(function (prev, current) {
        return prev.length < displayNum ? prev.concat(current.splice(0, displayNum - prev.length)) : prev;
    }, []);
    return [poped, operation.filter(function (o) { return o.length; })];
}
/**
 * 从二维数据中拆出外露的操作，和收入在 dropdown 的操作
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [1, 2], [[3],[4,5]]
 */
export function getDisplayOperation(operations, displayNum) {
    if (operations === void 0) { operations = []; }
    var groupedOpt = groupOperation(operations);
    if (displayNum > 0) {
        var _a = __read(splitOperation(groupedOpt, displayNum), 2), outsideOperation = _a[0], menuOperation = _a[1];
        return {
            // 未被收入菜单的操作项
            outsideOperation: outsideOperation,
            // 菜单中的操作项
            menuOperation: menuOperation,
        };
    }
    return {
        outsideOperation: [],
        menuOperation: groupedOpt,
    };
}
// 如果那么不存在的时候，使用 index 作为 key
export function makeKey(index, str) {
    if (str) {
        return str;
    }
    return "operation-".concat(index);
}
/**
 * 最大展示数下，显示的分组分割线的数量
 * @param menuOperations
 * @param maxMenuOperationNum
 */
export function getGroupNumInMaxNum(menuOperations, maxMenuOperationNum) {
    var num = 0;
    menuOperations.reduce(function (prev, current, index) {
        if ((current === null || current === void 0 ? void 0 : current.length) <= maxMenuOperationNum - prev && menuOperations[index + 1]) {
            num++;
            return (prev += current === null || current === void 0 ? void 0 : current.length);
        }
        else {
            return (prev += current.length);
        }
    }, 0);
    return num;
}
//# sourceMappingURL=util.js.map