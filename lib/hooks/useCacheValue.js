"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCacheValue = void 0;
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
var CConfigProvider_1 = require("../CConfigProvider");
var useCacheValue = function (options, initValue) {
    var _a;
    var defaultValue = options.defaultValue, value = options.value, cacheKey = options.cacheKey;
    var _value = (_a = (!(0, lodash_es_1.isUndefined)(value) ? value : defaultValue)) !== null && _a !== void 0 ? _a : initValue;
    var storage = (0, CConfigProvider_1.useCConfigContext)().storage;
    if (storage.localStorage && cacheKey) {
        var cacheValue = storage.localStorage.getItem(cacheKey);
        if (cacheValue) {
            try {
                _value = JSON.parse(cacheValue);
            }
            catch (error) {
                console.warn("[AdvanceSearch] parse cache \"".concat(cacheKey, "\" failed."));
            }
        }
    }
    var setCacheValue = (0, react_1.useCallback)(function (value) {
        if (storage.localStorage && cacheKey) {
            storage.localStorage.setItem(cacheKey, JSON.stringify(value));
        }
    }, [cacheKey]);
    return [_value, setCacheValue];
};
exports.useCacheValue = useCacheValue;
//# sourceMappingURL=useCacheValue.js.map