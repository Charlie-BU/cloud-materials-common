"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
/**
 * 获取价格
 * 返回 总价、折扣价、是否是退费、价格是否合法 等数据
 * @param options
 * @returns
 */
var getPrice = function (options) {
    var total = options.total, originTotal = options.originTotal, _a = options.precision, precision = _a === void 0 ? 2 : _a, thousandsSeparator = options.thousandsSeparator, _b = options.hidePriceInfo, hidePriceInfo = _b === void 0 ? false : _b;
    var _c = options.discountPrecision, discountPrecision = _c === void 0 ? precision : _c;
    var res = { totalPrice: '--', isRefund: false, isValid: true };
    // 当隐藏价格时，total/originTotal/precision等数据不能用于计算
    if (hidePriceInfo) {
        res.totalPrice = '***';
        return res;
    }
    // 未返回total 或 总价计算错误 时，显示 --
    if ((0, lodash_es_1.isUndefined)(total) ||
        (!(0, lodash_es_1.isArray)(total) && !(0, lodash_es_1.isNumber)(total)) || // 不是数值类型 返回 非法
        (!(0, lodash_es_1.isArray)(total) && Number.isNaN(total)) || // 是NaN 返回非法
        ((0, lodash_es_1.isArray)(total) && (!(0, lodash_es_1.isNumber)(total[0]) || !(0, lodash_es_1.isNumber)(total[1]))) || // 不是数值类型 返回 非法
        ((0, lodash_es_1.isArray)(total) && (Number.isNaN(total[0]) || Number.isNaN(total[1]))) // 是NaN 返回非法
    ) {
        res.isValid = false;
        return res;
    }
    var origin = !(0, lodash_es_1.isUndefined)(originTotal) ? originTotal : total;
    // 最小原价 / 最大原价
    var _d = tslib_1.__read((0, lodash_es_1.isArray)(origin) ? origin : [origin, origin], 2), minOrigin = _d[0], maxOrigin = _d[1];
    // 总价计算
    if ((0, lodash_es_1.isArray)(total)) {
        // 当价格为一个区间范围时
        // 最小价格 / 最大价格
        var _e = tslib_1.__read(total, 2), minTotal = _e[0], maxTotal = _e[1];
        // 最小差价 / 最大差价
        var _f = tslib_1.__read([minOrigin - minTotal, maxOrigin - maxTotal], 2), minDiff = _f[0], maxDiff = _f[1];
        res.totalPrice = "".concat(formatAmount({
            amount: minTotal,
            thousandsSeparator: thousandsSeparator,
            withAbs: true,
            precision: precision,
        }), "~").concat(formatAmount({
            amount: maxTotal,
            thousandsSeparator: thousandsSeparator,
            withAbs: true,
            precision: precision,
        }));
        res.isRefund = Boolean(total[0] < 0 || total[1] < 0);
        // 原价存在 & 差价大于0 时：展示折扣价格
        res.discountPrice =
            !(0, lodash_es_1.isUndefined)(originTotal) && (maxDiff > 0 || minDiff > 0)
                ? "".concat(formatAmount({
                    amount: minDiff,
                    thousandsSeparator: thousandsSeparator,
                    withAbs: false,
                    precision: discountPrecision,
                }), "~").concat(formatAmount({
                    amount: maxDiff,
                    thousandsSeparator: thousandsSeparator,
                    withAbs: false,
                    precision: discountPrecision,
                }))
                : undefined;
    }
    else {
        res.totalPrice = "".concat(formatAmount({ amount: total, thousandsSeparator: thousandsSeparator, withAbs: true, precision: precision }));
        res.isRefund = !!(total < 0);
        var diff = minOrigin - total;
        // 原价存在 & 差价大于0 时：展示折扣价格
        res.discountPrice =
            !(0, lodash_es_1.isUndefined)(originTotal) && diff > 0
                ? "".concat(formatAmount({
                    amount: diff,
                    thousandsSeparator: thousandsSeparator,
                    withAbs: false,
                    precision: discountPrecision,
                }))
                : undefined;
    }
    return res;
};
exports.getPrice = getPrice;
/**
 * 格式化金额（1. 取绝对值，2. 保留精度 3. 格式化生成金额的逗号分隔符）
 */
function formatAmount(options) {
    var amount = options.amount, precision = options.precision, thousandsSeparator = options.thousandsSeparator, withAbs = options.withAbs;
    // 取绝对值+保留精度
    var absFixedAmount = withAbs ? Math.abs(amount).toFixed(precision) : amount.toFixed(precision);
    if (thousandsSeparator) {
        // 小数前需要添加分隔符，小数后不添加分隔符
        var parts = absFixedAmount.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        // 正则说明：每3个数字后添加一个千位分隔符
        // \B:非字符边界
        return parts.join('.');
    }
    return absFixedAmount;
}
//# sourceMappingURL=priceCalculator.js.map