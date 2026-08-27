"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBaseMaskable = void 0;
var tslib_1 = require("tslib");
var hooks_1 = require("../../../hooks");
var react_1 = require("react");
var useFooter_1 = require("./useFooter");
var web_react_1 = require("@arco-design/web-react");
var useBaseMaskable = function (_a) {
    var componentName = _a.componentName, props = tslib_1.__rest(_a, ["componentName"]);
    var _b = props.preventCloseSelectors, preventCloseSelectors = _b === void 0 ? [] : _b, _ = props.confirmOnOk, onCancel = props.onCancel, restProps = tslib_1.__rest(props, ["preventCloseSelectors", "confirmOnOk", "onCancel"]);
    var mask = restProps.mask;
    var prefixCls = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext).prefixCls;
    var preventCloseSelectorsRef = (0, hooks_1.useAutoRef)([".".concat(prefixCls, "-trigger"), ".".concat(prefixCls, "-modal-wrapper")].concat(preventCloseSelectors));
    var onCancelRef = (0, hooks_1.useAutoRef)(onCancel);
    var _c = tslib_1.__read((0, useFooter_1.useFooter)(tslib_1.__assign(tslib_1.__assign({}, props), { componentName: componentName })), 2), okState = _c[0], okControl = _c[1];
    var innerVisible = okState.visible;
    var setVisible = okControl.setVisible;
    (0, react_1.useEffect)(function () {
        var timer = -1;
        var handleClick = function (e) {
            var _a;
            var typeTarget = e.target;
            if (typeTarget &&
                preventCloseSelectorsRef.current.some(function (preventCloseSelector) { return typeTarget.closest(preventCloseSelector); })) {
                return;
            }
            setVisible(false);
            (_a = onCancelRef.current) === null || _a === void 0 ? void 0 : _a.call(onCancelRef);
        };
        if (mask === false && innerVisible) {
            timer = window.setTimeout(function () {
                // 这里使用事件捕获，事件会先于react的事件触发，防止在用户交互后内容变化导致内容drawer隐藏起来
                // 展示后再绑定事件，不确定升级react 17+后是否有问题
                window.addEventListener('click', handleClick, true);
            });
        }
        return function () {
            window.removeEventListener('click', handleClick, true);
            clearTimeout(timer);
        };
    }, [innerVisible, mask]);
    var modalProps = tslib_1.__assign(tslib_1.__assign({}, restProps), okState);
    var controls = {
        setVisible: function (visible) {
            setVisible(Boolean(visible));
        },
    };
    return [modalProps, controls];
};
exports.useBaseMaskable = useBaseMaskable;
//# sourceMappingURL=useMaskable.js.map