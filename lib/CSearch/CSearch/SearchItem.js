"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CompactWrapper_1 = tslib_1.__importDefault(require("../components/CompactWrapper"));
var Component_1 = tslib_1.__importDefault(require("../components/Component"));
var utils_1 = require("../utils");
var lodash_es_1 = require("lodash-es");
var SearchItem = function (props) {
    var _a;
    var fieldName = props.fieldName, params = props.params, updateParams = props.updateParams, content = props.content, commonProps = props.commonProps, _b = props.valueFormatter, valueFormatter = _b === void 0 ? function (v) { return v; } : _b, restProps = tslib_1.__rest(props, ["fieldName", "params", "updateParams", "content", "commonProps", "valueFormatter"]);
    var controlledProps = (0, react_1.useMemo)(function () {
        if (!fieldName) {
            return commonProps;
        }
        return tslib_1.__assign(tslib_1.__assign({}, commonProps), { value: params[fieldName], onChange: function (val) {
                var _a;
                var _val = (0, utils_1.isEmptyValue)(val) ? undefined : val;
                commonProps === null || commonProps === void 0 ? void 0 : commonProps.onChange(valueFormatter(_val));
                updateParams((_a = {}, _a[fieldName] = valueFormatter(_val), _a));
            } });
    }, [commonProps, fieldName, params, updateParams]);
    // renderBuiltInContent 中会用组件props覆盖commonProps，导致写了内置组件的onChange，CSearch的onChange就不会触发
    // 当配置了内置组件的onChange时，需要覆写一下
    if ((0, lodash_es_1.isObject)(content)) {
        var _content = content;
        if ((0, lodash_es_1.isObject)(_content.componentProps) && ((_a = _content.componentProps) === null || _a === void 0 ? void 0 : _a.onChange)) {
            var origin_1 = _content.componentProps.onChange;
            _content.componentProps.onChange = function (val) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                (0, lodash_es_1.isFunction)(origin_1) && origin_1.apply(void 0, tslib_1.__spreadArray([val], tslib_1.__read(rest), false));
                controlledProps === null || controlledProps === void 0 ? void 0 : controlledProps.onChange(val);
            };
        }
    }
    return (react_1.default.createElement(CompactWrapper_1.default, tslib_1.__assign({}, restProps),
        react_1.default.createElement(Component_1.default, { content: content, commonProps: controlledProps })));
};
exports.default = SearchItem;
//# sourceMappingURL=SearchItem.js.map