import { __assign } from "tslib";
import { get, isArray, identity, values, isEqual, isObject, isUndefined, isFunction, isNil } from 'lodash-es';
import Effect, { logWarn } from './effect';
import { getBrotherField, getParentField, checkArrayDuplicates } from './utils';
// selectFirst的默认checker，判断currValue是否已有值并且是dataSource中的有效值
var _defaultSelectFirstChecker = function (currentValue, dataSource, dataKey) {
    return isNil(currentValue) || !dataSource.some(function (item) { return isEqual(get(item, dataKey), currentValue); });
};
var _fieldDepValuesHandle = function (resultHandle, checker) {
    return (function (params) {
        var depValues = params.depValues, currField = params.currField;
        // 默认check depValues 第一项是否无值
        if (isUndefined(checker)) {
            checker = function (depValues) {
                var depValue = values(depValues)[0];
                return !identity(isObject(depValue) ? depValue === null || depValue === void 0 ? void 0 : depValue.value : depValue);
            };
        }
        if (!isFunction(checker)) {
            return logWarn("checker on ".concat(currField.address, " is not a valid function"));
        }
        resultHandle({ currField: currField, depValues: depValues, result: depValues ? !!checker(depValues, params) : false });
    });
};
var Helper = /** @class */ (function () {
    function Helper(config) {
        var _this = this;
        /**
         * 从字段的 dataSource 中(检查后)选中第一个元素赋值给字段
         * @param config
         * @param config.dataKey 第一个元素取值的dataKey，兼容lodash.get方法，默认值为value
         * @param config.checker 赋值前校验，返回true则为需要变更，默认为检查currValue无值或不是dataSource中的有效值则选中当前第一个
         * @param config.validFilter dataSource 的有效值过滤函数
         * @returns {FieldHandle} fieldCallback
         */
        this.selectFirstByDataSource = function (config) {
            var _a, _b;
            return _this.setValueByDataSource(__assign(__assign({}, config), { checker: (_a = config === null || config === void 0 ? void 0 : config.checker) !== null && _a !== void 0 ? _a : _defaultSelectFirstChecker, pathKey: "[0].".concat((_b = config === null || config === void 0 ? void 0 : config.dataKey) !== null && _b !== void 0 ? _b : 'value') }));
        };
        this.fieldCallback = {
            setDataSource: this.setDataSource,
            setValueByDataSource: this.setValueByDataSource,
            selectFirstByDataSource: this.selectFirstByDataSource,
            checkDisableByDeps: this.checkDisableByDeps,
            checkClearValueByDeps: this.checkClearValueByDeps,
        };
        this.effects = new Effect(config);
    }
    /**
     * 把 fetchData 的返回值设置为dataSource
     * @param config
     * @param config.fetchResultSourceKey 元素从fetchResult取值的key，值为路径，兼容lodash.get方法
     * @param config.validFilter dataSource 的有效值过滤函数
     * @returns {FieldHandle} fieldCallback
     */
    Helper.prototype.setDataSource = function (config) {
        return (function (_a) {
            var _b;
            var currField = _a.currField, fetchResult = _a.fetchResult, depValues = _a.depValues;
            var _c = config || {}, fetchResultSourceKey = _c.fetchResultSourceKey, depValuesSourceKey = _c.depValuesSourceKey, validFilter = _c.validFilter;
            var dataSource = fetchResultSourceKey ? get(fetchResult, fetchResultSourceKey) : fetchResult;
            if (depValuesSourceKey) {
                dataSource = get(depValues, depValuesSourceKey);
            }
            if (!isArray(dataSource)) {
                return logWarn("dataSource is not a valid array value. please check. ");
            }
            currField.dataSource = (_b = validFilter === null || validFilter === void 0 ? void 0 : validFilter(dataSource)) !== null && _b !== void 0 ? _b : dataSource;
        });
    };
    /**
     * 从字段的 dataSource 中取值并赋值给字段
     * @param {string} pathKey 必填元素取值的完整pathKey，值为路径，取值lodash.get(dataSource, pathKey)
     * @param {string} dataKey 元素取值的dataKey，默认为解析 pathKey 去掉第一级路径的值，即[x].y* -> y* (如果pathKey只有一级就为本身)
     * @returns {FieldHandle} fieldCallback
     */
    Helper.prototype.setValueByDataSource = function (config) {
        var pathKey = config.pathKey, checker = config.checker, _a = config.validFilter, validFilter = _a === void 0 ? identity : _a, _b = config.dataKey, dataKey = _b === void 0 ? pathKey.slice(pathKey.indexOf('.') + 1) : _b;
        return (function (params) {
            var _a;
            var currField = params.currField;
            var dataSource = get(currField, 'dataSource');
            if (!isArray(dataSource)) {
                return logWarn("currField: ".concat(currField.address, " dataSource is not a valid array value. please check. "));
            }
            if (!isUndefined(checker) && !isFunction(checker)) {
                return logWarn("checker on ".concat(currField.address, " is not a valid function"));
            }
            var currentValue = get(currField, 'value');
            var validSource = (_a = validFilter === null || validFilter === void 0 ? void 0 : validFilter(dataSource)) !== null && _a !== void 0 ? _a : dataSource;
            if (isUndefined(checker) || checker(currentValue, validSource, dataKey, params)) {
                currField.value = get(dataSource, pathKey);
            }
        });
    };
    /**
     * 检测依赖项，并设置该字段是否为disabled，若checker为true，则disabled
     * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
     * @returns {FieldHandle} fieldCallback
     */
    Helper.prototype.checkDisableByDeps = function (checker) {
        return _fieldDepValuesHandle(function (_a) {
            var currField = _a.currField, depValues = _a.depValues, result = _a.result;
            if (depValues) {
                currField.disabled = result;
            }
        }, checker);
    };
    /**
     * 检测依赖项，若checker为true，则清空
     * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
     * @returns {FieldHandle} fieldCallback
     */
    Helper.prototype.checkClearValueByDeps = function (checker) {
        return _fieldDepValuesHandle(function (_a) {
            var currField = _a.currField, result = _a.result;
            result && currField.setValue(undefined);
        }, checker);
    };
    return Helper;
}());
export { Helper };
export var createHelper = function (config) {
    return new Helper(config);
};
export default createHelper;
export { getParentField, getBrotherField, checkArrayDuplicates };
//# sourceMappingURL=index.js.map