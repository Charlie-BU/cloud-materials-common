import { __assign, __read, __rest } from "tslib";
import { useAutoRef } from '../../../hooks';
import { useContext, useEffect } from 'react';
import { useFooter } from './useFooter';
import { ConfigProvider } from '@arco-design/web-react';
export var useBaseMaskable = function (_a) {
    var componentName = _a.componentName, props = __rest(_a, ["componentName"]);
    var _b = props.preventCloseSelectors, preventCloseSelectors = _b === void 0 ? [] : _b, _ = props.confirmOnOk, onCancel = props.onCancel, restProps = __rest(props, ["preventCloseSelectors", "confirmOnOk", "onCancel"]);
    var mask = restProps.mask;
    var prefixCls = useContext(ConfigProvider.ConfigContext).prefixCls;
    var preventCloseSelectorsRef = useAutoRef([".".concat(prefixCls, "-trigger"), ".".concat(prefixCls, "-modal-wrapper")].concat(preventCloseSelectors));
    var onCancelRef = useAutoRef(onCancel);
    var _c = __read(useFooter(__assign(__assign({}, props), { componentName: componentName })), 2), okState = _c[0], okControl = _c[1];
    var innerVisible = okState.visible;
    var setVisible = okControl.setVisible;
    useEffect(function () {
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
    var modalProps = __assign(__assign({}, restProps), okState);
    var controls = {
        setVisible: function (visible) {
            setVisible(Boolean(visible));
        },
    };
    return [modalProps, controls];
};
//# sourceMappingURL=useMaskable.js.map