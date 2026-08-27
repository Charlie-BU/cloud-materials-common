/**
 * 断点枚举
 */
export declare enum BreakpointEnum {
    /**
     * 0 - 576px
     */
    xs = "xs",
    /**
     * 576px - 768px
     */
    sm = "sm",
    /**
     * 768px - 992px
     */
    md = "md",
    /**
     * 992px - 1280px
     */
    lg = "lg",
    /**
     * 1280px - 1600px
     */
    xl = "xl",
    /**
     * 1600px - 2000px
     */
    xxl = "xxl",
    /**
     * 2000px - Infinity
     */
    xxxl = "xxxl"
}
/**
 * 屏幕宽度断点配置
 * @see https://arco.bytedance.net/react/components/Grid
 * @see https://ahooks.js.org/zh-CN/hooks/use-responsive
 */
export declare const BreakpointConfig: Record<BreakpointEnum, number>;
/**
 * 配置断点
 * @description 不要轻易配置！！此处会影响 SiderBar、CInfoSection组件
 * @param config
 */
export declare function configBreakpoint(config: Partial<Record<BreakpointEnum, number>>): void;
/**
 * 屏幕断点
 * @returns
 */
export declare function useBreakpoint(): {
    breakpoint: BreakpointEnum;
    breakpointWidth: number;
};
