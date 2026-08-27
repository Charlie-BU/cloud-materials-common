import { __assign, __awaiter, __generator, __read, __rest, __spreadArray } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import CConfigProvider, { getGlobalContextConfig } from '../../CConfigProvider';
import { createDeferred } from '../../_utils/createDeferred';
export var createStaticMethods = function (Component) {
    var getId = (function () {
        var id = 0;
        return function () { return (id += 1); };
    })();
    /** 存在多drawer共存的情况，这里应该是个数组，防止意外情况 */
    var drawerPool = [];
    var staticAttributes = {
        /** 通过函数调用打开一个实例 */
        open: function (initialProps) {
            var _this = this;
            var forceNew = initialProps.forceNew, props = __rest(initialProps, ["forceNew"]);
            var currentRenderProps = props;
            if (!forceNew && drawerPool.length && props.mask === false) {
                var instance = drawerPool[drawerPool.length - 1];
                instance.update(props);
                return instance;
            }
            var currentInstanceId = getId();
            var _a = __read(createDeferred(), 3), promise = _a[0], resolve = _a[1], reject = _a[2];
            var TypedComponent = Component;
            var target = document.createElement('div');
            var render = function (props) {
                var _a, _b;
                var configProviderProps = getGlobalContextConfig();
                var _c = __assign(__assign({}, (_a = configProviderProps.cComponentConfig) === null || _a === void 0 ? void 0 : _a[TypedComponent.displayName]), props), content = _c.content, wrapper = _c.wrapper, getMountContainer = _c.getMountContainer, _d = _c.throwOnOkErrorInPromise, throwOnOkErrorInPromise = _d === void 0 ? false : _d, restProps = __rest(_c, ["content", "wrapper", "getMountContainer", "throwOnOkErrorInPromise"]);
                var mergeTarget = (_b = getMountContainer === null || getMountContainer === void 0 ? void 0 : getMountContainer()) !== null && _b !== void 0 ? _b : target;
                var mainNode = (React.createElement(TypedComponent, __assign({ visible: Date.now(), 
                    // 动画结束后立即卸载，防止极端情况下 mask 闪烁
                    unmountOnExit: true }, restProps, { afterClose: function () {
                        var _a;
                        (_a = restProps.afterClose) === null || _a === void 0 ? void 0 : _a.call(restProps);
                        ReactDOM.unmountComponentAtNode(mergeTarget);
                        drawerPool = drawerPool.filter(function (_a) {
                            var id = _a.id;
                            return id !== currentInstanceId;
                        });
                    }, onOk: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return __awaiter(_this, void 0, void 0, function () {
                            var result, error_1;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, ((_a = restProps.onOk) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([restProps], __read(args), false)))];
                                    case 1:
                                        result = _b.sent();
                                        resolve(result);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_1 = _b.sent();
                                        if (throwOnOkErrorInPromise) {
                                            // 能够被外面catch
                                            reject(error_1);
                                        }
                                        // 能够阻止modal自动关闭
                                        throw error_1;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }, onCancel: function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        resolve((_a = restProps.onCancel) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([restProps], __read(args), false)));
                    } }), content !== null && content !== void 0 ? content : restProps.children));
                ReactDOM.render(React.createElement(CConfigProvider, __assign({}, configProviderProps), wrapper ? React.createElement(wrapper[0], wrapper[1], mainNode) : mainNode), mergeTarget);
            };
            render(currentRenderProps);
            var newCaller = Object.assign(promise, {
                id: currentInstanceId,
                update: function (newProps) {
                    if (drawerPool.includes(newCaller)) {
                        render((currentRenderProps = __assign(__assign({}, currentRenderProps), newProps)));
                    }
                },
                close: function () {
                    if (drawerPool.includes(newCaller)) {
                        render(__assign(__assign({}, currentRenderProps), { visible: false }));
                    }
                },
            });
            drawerPool.push(newCaller);
            return newCaller;
        },
        /**
         * 关闭实例
         * @param id 实例id 不传为关闭全部
         */
        close: function (id) {
            var _a;
            if (id) {
                (_a = drawerPool.find(function (drawer) { return drawer.id === id; })) === null || _a === void 0 ? void 0 : _a.close();
                drawerPool = drawerPool.filter(function (drawer) { return drawer.id !== id; });
            }
            else {
                drawerPool.forEach(function (drawer) {
                    drawer.close();
                });
                drawerPool = [];
            }
        },
    };
    return Object.assign(Component, staticAttributes);
};
//# sourceMappingURL=createStaticMethods.js.map