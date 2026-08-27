import { __assign, __read, __rest } from "tslib";
import { useEffect, useRef, useState } from 'react';
import { useCForm } from '../../hooks';
import { cloneDeep, get, isEqual, pick, set, uniqueId } from 'lodash-es';
import { isDataField, onFieldReact, onFieldValueChange } from '@formily/core';
import { toJS } from '@formily/reactive';
import { observer } from '@formily/react';
import { onCFormDataChange } from '../../hooks/effects';
import { useDebounceFn } from 'ahooks';
function reactiveWithCForm(component) {
    return observer(function (props) {
        var _a = props.deps, deps = _a === void 0 ? [] : _a, _b = props.dataDeps, dataDeps = _b === void 0 ? [] : _b, _c = props.depsReactiveDebounce, depsReactiveDebounce = _c === void 0 ? 100 : _c, rest = __rest(props, ["deps", "dataDeps", "depsReactiveDebounce"]);
        var form = useCForm();
        var _d = __read(useState(function () {
            var initialValues = {};
            deps.forEach(function (path) {
                set(initialValues, path, get(form.values, path));
            });
            // 需要克隆，否则 {path: get(form.values, path)} 中get的数据为引用类型时，无法触发依赖更新
            return cloneDeep(initialValues);
        }), 2), depValues = _d[0], setDepsValues = _d[1];
        var _e = __read(useState(pick(form.data, dataDeps)), 2), dataDepValues = _e[0], setDepsDataValues = _e[1];
        var depValuesRef = useRef(cloneDeep(depValues));
        var dataDepValuesRef = useRef(cloneDeep(dataDepValues));
        // 创建唯一的debounce防抖函数
        var changeDepsValues = useDebounceFn(function () {
            if (!isEqual(depValuesRef.current, depValues)) {
                setDepsValues(cloneDeep(depValuesRef.current));
            }
        }, { wait: depsReactiveDebounce });
        var changeDepsData = useDebounceFn(function () {
            if (!isEqual(dataDepValuesRef.current, dataDepValues)) {
                setDepsDataValues(cloneDeep(dataDepValuesRef.current));
            }
        }, { wait: depsReactiveDebounce });
        useEffect(function () {
            var effectId = uniqueId('reactiveWithCForm');
            form.addEffects(effectId, function () {
                var changeCallback = function (field) {
                    depValuesRef.current = set(depValuesRef.current, field.path.toString(), toJS(field.value));
                    changeDepsValues.run();
                };
                if (deps.length > 0) {
                    deps.forEach(function (path) {
                        /**
                         * 监听的补充
                         * 主要用于数组字段长度改变监听 & 字段初始化监听 & 普通字段 value 改变监听
                         */
                        onFieldReact(path, function (field) {
                            if (isDataField(field)) {
                                changeCallback(field);
                            }
                        });
                        /**
                         * 数组子字段 & 对象子字段改变监听
                         */
                        onFieldValueChange("".concat(path, ".*"), function (field) {
                            changeCallback(field);
                        });
                    });
                }
                if (dataDeps.length > 0) {
                    onCFormDataChange(function (data) {
                        dataDeps === null || dataDeps === void 0 ? void 0 : dataDeps.forEach(function (path) {
                            dataDepValuesRef.current = set(dataDepValuesRef.current, path.toString(), get(data, path));
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
        return component(__assign(__assign({}, rest), { depValues: depValues, dataDepValues: dataDepValues }));
    }, { forwardRef: true });
}
export default reactiveWithCForm;
//# sourceMappingURL=index.js.map