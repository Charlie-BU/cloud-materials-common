import { __assign, __read, __rest, __spreadArray } from "tslib";
import React, { useMemo } from 'react';
import CompactWrapper from '../components/CompactWrapper';
import SearchComponent from '../components/Component';
import { isEmptyValue } from '../utils';
import { isFunction, isObject } from 'lodash-es';
var SearchItem = function (props) {
    var _a;
    var fieldName = props.fieldName, params = props.params, updateParams = props.updateParams, content = props.content, commonProps = props.commonProps, _b = props.valueFormatter, valueFormatter = _b === void 0 ? function (v) { return v; } : _b, restProps = __rest(props, ["fieldName", "params", "updateParams", "content", "commonProps", "valueFormatter"]);
    var controlledProps = useMemo(function () {
        if (!fieldName) {
            return commonProps;
        }
        return __assign(__assign({}, commonProps), { value: params[fieldName], onChange: function (val) {
                var _a;
                var _val = isEmptyValue(val) ? undefined : val;
                commonProps === null || commonProps === void 0 ? void 0 : commonProps.onChange(valueFormatter(_val));
                updateParams((_a = {}, _a[fieldName] = valueFormatter(_val), _a));
            } });
    }, [commonProps, fieldName, params, updateParams]);
    // renderBuiltInContent 中会用组件props覆盖commonProps，导致写了内置组件的onChange，CSearch的onChange就不会触发
    // 当配置了内置组件的onChange时，需要覆写一下
    if (isObject(content)) {
        var _content = content;
        if (isObject(_content.componentProps) && ((_a = _content.componentProps) === null || _a === void 0 ? void 0 : _a.onChange)) {
            var origin_1 = _content.componentProps.onChange;
            _content.componentProps.onChange = function (val) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                isFunction(origin_1) && origin_1.apply(void 0, __spreadArray([val], __read(rest), false));
                controlledProps === null || controlledProps === void 0 ? void 0 : controlledProps.onChange(val);
            };
        }
    }
    return (React.createElement(CompactWrapper, __assign({}, restProps),
        React.createElement(SearchComponent, { content: content, commonProps: controlledProps })));
};
export default SearchItem;
//# sourceMappingURL=SearchItem.js.map