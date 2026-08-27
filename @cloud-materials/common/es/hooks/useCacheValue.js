import { isUndefined } from 'lodash-es';
import { useCallback } from 'react';
import { useCConfigContext } from '../CConfigProvider';
export var useCacheValue = function (options, initValue) {
    var _a;
    var defaultValue = options.defaultValue, value = options.value, cacheKey = options.cacheKey;
    var _value = (_a = (!isUndefined(value) ? value : defaultValue)) !== null && _a !== void 0 ? _a : initValue;
    var storage = useCConfigContext().storage;
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
    var setCacheValue = useCallback(function (value) {
        if (storage.localStorage && cacheKey) {
            storage.localStorage.setItem(cacheKey, JSON.stringify(value));
        }
    }, [cacheKey]);
    return [_value, setCacheValue];
};
//# sourceMappingURL=useCacheValue.js.map