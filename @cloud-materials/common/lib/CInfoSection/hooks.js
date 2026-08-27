"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCInfoSectionLayout = exports.DefaultInfoSectionLayoutConfig = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var lodash_es_1 = require("lodash-es");
var useBreakpoint_1 = require("../hooks/useBreakpoint");
exports.DefaultInfoSectionLayoutConfig = (_a = {},
    // 0
    _a[useBreakpoint_1.BreakpointEnum.xs] = {
        layout: 'vertical',
        colNumber: 1,
        direction: 'row',
    },
    // 576
    _a[useBreakpoint_1.BreakpointEnum.sm] = {
        layout: 'horizon',
        colNumber: 1,
        direction: 'row',
    },
    // 768
    _a[useBreakpoint_1.BreakpointEnum.md] = {
        layout: 'horizon',
        colNumber: 1,
        direction: 'row',
    },
    // 992
    _a[useBreakpoint_1.BreakpointEnum.lg] = {
        layout: 'vertical',
        colNumber: 2,
        direction: 'row',
    },
    // 1290
    _a[useBreakpoint_1.BreakpointEnum.xl] = {
        layout: 'horizon',
        colNumber: 2,
        direction: 'row',
    },
    // 1600
    _a[useBreakpoint_1.BreakpointEnum.xxl] = {
        layout: 'horizon',
        colNumber: 2,
        direction: 'row',
    },
    // 2000
    _a[useBreakpoint_1.BreakpointEnum.xxxl] = {
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
function useCInfoSectionLayout(opts) {
    var _a = (opts || {}).responsive, responsive = _a === void 0 ? true : _a;
    var breakpoint = (0, useBreakpoint_1.useBreakpoint)().breakpoint;
    var mergedConfig = (0, react_1.useMemo)(function () {
        if (!responsive) {
            return {
                layout: opts === null || opts === void 0 ? void 0 : opts.layout,
                colNumber: opts === null || opts === void 0 ? void 0 : opts.colNumber,
                direction: opts === null || opts === void 0 ? void 0 : opts.direction,
            };
        }
        var defaultBrkCfg = (0, lodash_es_1.get)(exports.DefaultInfoSectionLayoutConfig, breakpoint);
        var layout = (0, lodash_es_1.isPlainObject)(opts === null || opts === void 0 ? void 0 : opts.layout) ? (0, lodash_es_1.get)(opts === null || opts === void 0 ? void 0 : opts.layout, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.layout;
        var colNumber = (0, lodash_es_1.isPlainObject)(opts === null || opts === void 0 ? void 0 : opts.colNumber) ? (0, lodash_es_1.get)(opts === null || opts === void 0 ? void 0 : opts.colNumber, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.colNumber;
        var direction = (0, lodash_es_1.isPlainObject)(opts === null || opts === void 0 ? void 0 : opts.direction) ? (0, lodash_es_1.get)(opts === null || opts === void 0 ? void 0 : opts.direction, breakpoint) : opts === null || opts === void 0 ? void 0 : opts.direction;
        return (0, lodash_es_1.merge)(tslib_1.__assign({}, defaultBrkCfg), {
            layout: layout,
            colNumber: colNumber,
            direction: direction,
        });
    }, [breakpoint, opts === null || opts === void 0 ? void 0 : opts.colNumber, opts === null || opts === void 0 ? void 0 : opts.direction, opts === null || opts === void 0 ? void 0 : opts.layout]);
    return mergedConfig;
}
exports.useCInfoSectionLayout = useCInfoSectionLayout;
//# sourceMappingURL=hooks.js.map