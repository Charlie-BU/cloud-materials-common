var _a;
import { __read } from "tslib";
import { useResponsive, configResponsive } from 'ahooks';
/**
 * 断点枚举
 */
export var BreakpointEnum;
(function (BreakpointEnum) {
    /**
     * 0 - 576px
     */
    BreakpointEnum["xs"] = "xs";
    /**
     * 576px - 768px
     */
    BreakpointEnum["sm"] = "sm";
    /**
     * 768px - 992px
     */
    BreakpointEnum["md"] = "md";
    /**
     * 992px - 1280px
     */
    BreakpointEnum["lg"] = "lg";
    /**
     * 1280px - 1600px
     */
    BreakpointEnum["xl"] = "xl";
    /**
     * 1600px - 2000px
     */
    BreakpointEnum["xxl"] = "xxl";
    /**
     * 2000px - Infinity
     */
    BreakpointEnum["xxxl"] = "xxxl";
})(BreakpointEnum || (BreakpointEnum = {}));
/**
 * 屏幕宽度断点配置
 * @see https://arco.bytedance.net/react/components/Grid
 * @see https://ahooks.js.org/zh-CN/hooks/use-responsive
 */
export var BreakpointConfig = (_a = {},
    _a[BreakpointEnum.xs] = 0,
    _a[BreakpointEnum.sm] = 576,
    _a[BreakpointEnum.md] = 768,
    _a[BreakpointEnum.lg] = 992,
    _a[BreakpointEnum.xl] = 1280,
    _a[BreakpointEnum.xxl] = 1600,
    _a[BreakpointEnum.xxxl] = 2000,
    _a);
/**
 * 配置断点
 * @description 不要轻易配置！！此处会影响 SiderBar、CInfoSection组件
 * @param config
 */
export function configBreakpoint(config) {
    configResponsive(Object.assign({}, BreakpointConfig, config));
}
// 根据尺寸大小排序，object 可能乱序
var breakpointsArr = Object.entries(BreakpointConfig)
    .sort(function (a, b) { return b[1] - a[1]; }) // 大的排前面
    .map(function (_a) {
    var _b = __read(_a, 1), key = _b[0];
    return key;
});
// 全局配置
configBreakpoint(BreakpointConfig);
/**
 * 屏幕断点
 * @returns
 */
export function useBreakpoint() {
    var resInfo = useResponsive();
    var key = breakpointsArr.find(function (key) { return resInfo[key] === true; }) || BreakpointEnum.xs;
    return {
        breakpoint: key,
        breakpointWidth: BreakpointConfig[key],
    };
}
//# sourceMappingURL=useBreakpoint.js.map