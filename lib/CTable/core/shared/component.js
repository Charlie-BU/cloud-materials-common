"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFnComponentProps = exports.setComponentProps = exports.setComputedComponent = exports.formatComponentConfig = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-22 10:07:53
 * @LastEditTime: 2021-10-28 14:58:40
 * @LastEditors: youjingyu
 * @Description:
 */
var shared_1 = require("../../shared");
var formatComponentConfig = function (componentConfig, componentProps) {
    var arr;
    if ((0, shared_1.isArr)(componentConfig)) {
        // @ts-ignore
        arr = componentConfig;
    }
    else {
        arr = [componentConfig, componentProps];
    }
    // 在 row、cell 场景，props 配置来自 table、column，
    // 然后被多个 row、cell  使用，每个 row、cell  应该用独立的 props
    // 因此这里统一把 props 复制一遍
    // Todo 每个 cell 和 row 都有自己独有的 props ，在大数据场景下是否有性能问题
    return [arr[0], (0, shared_1.shallowCloneObj)(arr[1])];
};
exports.formatComponentConfig = formatComponentConfig;
var setComputedComponent = function (target, keyPrefix, componentConf) {
    var component = (0, exports.formatComponentConfig)(componentConf);
    target["".concat(keyPrefix, "Type")] = component[0];
    target["".concat(keyPrefix, "Props")] = component[1];
};
exports.setComputedComponent = setComputedComponent;
var setComponentProps = function (target, keyPrefix, props) {
    if (props) {
        var key = "".concat(keyPrefix, "Props");
        if ((0, shared_1.isFn)(props)) {
            target[key] = props;
        }
        else {
            target[key] = target[key] || {};
            // 使用 assign，保证引用不变
            Object.assign(target[key], props);
        }
    }
};
exports.setComponentProps = setComponentProps;
var getFnComponentProps = function (props, options) {
    if ((0, shared_1.isFn)(props)) {
        return props(options);
    }
    return props;
};
exports.getFnComponentProps = getFnComponentProps;
//# sourceMappingURL=component.js.map