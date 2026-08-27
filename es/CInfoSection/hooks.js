var _a;
import { __assign } from "tslib";
import { useMemo } from 'react';
import { isPlainObject, merge, get } from 'lodash-es';
import { BreakpointEnum, useBreakpoint } from '../hooks/useBreakpoint';
export var DefaultInfoSectionLayoutConfig = (_a = {},
    // 0
    _a[BreakpointEnum.xs] = {
        layout: 'vertical',
        colNumber: 1,
        direction: 'row',
    },
    // 576
    _a[BreakpointEnum.sm] = {
        layout: 'horizon',
        colNumber: 1,
        direction: 'row',
    },
    // 768
    _a[BreakpointEnum.md] = {
        layout: 'horizon',
        colNumber: 1,
        direction: 'row',
    },
    // 992
    _a[BreakpointEnum.lg] = {
        layout: 'vertical',
        colNumber: 2,
        direction: 'row',
    },
    // 1290
    _a[BreakpointEnum.xl] = {
        layout: 'horizon',
        colNumber: 2,
        direction: 'row',
    },
    // 1600
    _a[BreakpointEnum.xxl] = {
        layout: 'horizon',
        colNumber: 2,
        direction: 'row',
    },
    // 2000
    _a[BreakpointEnum.xxxl] = {
        layout: 'horizon',
        colNumber: 2,
        direction: 'row',
    },
    _a);
/**
 * CInfoSection 组件布局
 * - colNumber - 1 | 2 | 3 | 4
 * - layout -  horizon | vertical
 * @description 布局配置以传入的优先
 */
export function useCInfoSectionLayout(opts) {
    var _a = (opts || {}).responsive, responsive = _a === void 0 ? true : _a;
    var breakpoint = useBreakpoint().breakpoint;
    var mergedConfig = useMemo(function () {
        if (!responsive) {
            return {
                layout: opts === null || opts === void 0 ? void 0 : opts.layout,
                colNumber: opts === null || opts === void 0 ? void 0 : opts.colNumber,
                direction: opts === null || opts === void 0 ? void 0 : opts.direction,
            };
        }
        var defaultBrkCfg = get(DefaultInfoSectionLayoutConfig, breakpoint);
        var layout = isPlainObject(opts === null || opts === void 0 ? void 0 : opts.layout) ? get(opts === null || opts === void 0 ? void 0 : opts.layout, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.layout;
        var colNumber = isPlainObject(opts === null || opts === void 0 ? void 0 : opts.colNumber) ? get(opts === null || opts === void 0 ? void 0 : opts.colNumber, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.colNumber;
        var direction = isPlainObject(opts === null || opts === void 0 ? void 0 : opts.direction) ? get(opts === null || opts === void 0 ? void 0 : opts.direction, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.direction;
        return merge(__assign({}, defaultBrkCfg), {
            layout: layout,
            colNumber: colNumber,
            direction: direction,
        });
    }, [breakpoint, opts === null || opts === void 0 ? void 0 : opts.colNumber, opts === null || opts === void 0 ? void 0 : opts.direction, opts === null || opts === void 0 ? void 0 : opts.layout]);
    return mergedConfig;
}
//# sourceMappingURL=hooks.js.map