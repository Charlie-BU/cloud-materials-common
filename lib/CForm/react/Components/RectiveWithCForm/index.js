"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var hooks_1 = require("../../hooks");
var lodash_es_1 = require("lodash-es");
var core_1 = require("@formily/core");
var reactive_1 = require("@formily/reactive");
var react_2 = require("@formily/react");
var effects_1 = require("../../hooks/effects");
var ahooks_1 = require("ahooks");
function reactiveWithCForm(component) {
    return (0, react_2.observer)(function (props) {
        var _a = props.deps, deps = _a === void 0 ? [] : _a, _b = props.dataDeps, dataDeps = _b === void 0 ? [] : _b, _c = props.depsReactiveDebounce, depsReactiveDebounce = _c === void 0 ? 100 : _c, rest = tslib_1.__rest(props, ["deps", "dataDeps", "depsReactiveDebounce"]);
        var form = (0, hooks_1.useCForm)();
        var _d = tslib_1.__read((0, react_1.useState)(function () {
            var initialValues = {};
            deps.forEach(function (path) {
                (0, lodash_es_1.set)(initialValues, path, (0, lodash_es_1.get)(form.values, path));
            });
            // 需要克隆，否则 {path: get(form.values, path)} 中get的数据为引用类型时，无法触发依赖更新
            return (0, lodash_es_1.cloneDeep)(initialValues);
        }), 2), depValues = _d[0], setDepsValues = _d[1];
        var _e = tslib_1.__read((0, react_1.useState)((0, lodash_es_1.pick)(form.data, dataDeps)), 2), dataDepValues = _e[0], setDepsDataValues = _e[1];
        var depValuesRef = (0, react_1.useRef)((0, lodash_es_1.cloneDeep)(depValues));
        var dataDepValuesRef = (0, react_1.useRef)((0, lodash_es_1.cloneDeep)(dataDepValues));
        // 创建唯一的debounce防抖函数
        var changeDepsValues = (0, ahooks_1.useDebounceFn)(function () {
            if (!(0, lodash_es_1.isEqual)(depValuesRef.current, depValues)) {
                setDepsValues((0, lodash_es_1.cloneDeep)(depValuesRef.current));
            }
        }, { wait: depsReactiveDebounce });
        var changeDepsData = (0, ahooks_1.useDebounceFn)(function () {
            if (!(0, lodash_es_1.isEqual)(dataDepValuesRef.current, dataDepValues)) {
                setDepsDataValues((0, lodash_es_1.cloneDeep)(dataDepValuesRef.current));
            }
        }, { wait: depsReactiveDebounce });
        (0, react_1.useEffect)(function () {
            var effectId = (0, lodash_es_1.uniqueId)('reactiveWithCForm');
            form.addEffects(effectId, function () {
                var changeCallback = function (field) {
                    depValuesRef.current = (0, lodash_es_1.set)(depValuesRef.current, field.path.toString(), (0, reactive_1.toJS)(field.value));
                    changeDepsValues.run();
                };
                if (deps.length > 0) {
                    deps.forEach(function (path) {
                        /**
                         * 监听的补充
                         * 主要用于数组字段长度改变监听 & 字段初始化监听 & 普通字段 value 改变监听
                         */
                        (0, core_1.onFieldReact)(path, function (field) {
                            if ((0, core_1.isDataField)(field)) {
                                changeCallback(field);
                            }
                        });
                        /**
                         * 数组子字段 & 对象子字段改变监听
                         */
                        (0, core_1.onFieldValueChange)("".concat(path, ".*"), function (field) {
                            changeCallback(field);
                        });
                    });
                }
                if (dataDeps.length > 0) {
                    (0, effects_1.onCFormDataChange)(function (data) {
                        dataDeps === null || dataDeps === void 0 ? void 0 : dataDeps.forEach(function (path) {
                            dataDepValuesRef.current = (0, lodash_es_1.set)(dataDepValuesRef.current, path.toString(), (0, lodash_es_1.get)(data, path));
                        });
                        changeDepsData.run();
                    });
                }
            });
            return function () {
                form.removeEffects(effectId);
                changeDepsValues.cancel();
                changeDepsData.cancel();
            };
        }, [form]);
        return component(tslib_1.__assign(tslib_1.__assign({}, rest), { depValues: depValues, dataDepValues: dataDepValues }));
    }, { forwardRef: true });
}
exports.default = reactiveWithCForm;
//# sourceMappingURL=index.js.map