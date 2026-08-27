import { isArray, isNumber, isUndefined } from 'lodash-es';
import type { GetPriceRes } from '../interface';

type GetPriceProps = {
  total?: number | [number, number];
  originTotal?: number | [number, number];
  precision?: number;
  /** 金额千位分隔符，默认不生成金额分隔符 */
  thousandsSeparator?: string;
  discountPrecision?: number;
  // 隐藏价格信息
  hidePriceInfo?: boolean;
};

/**
 * 获取价格
 * 返回 总价、折扣价、是否是退费、价格是否合法 等数据
 * @param options
 * @returns
 */
export const getPrice = (options: GetPriceProps): GetPriceRes => {
  const { total, originTotal, precision = 2, thousandsSeparator, hidePriceInfo = false } = options;
  const { discountPrecision = precision } = options;
  const res: GetPriceRes = { totalPrice: '--', isRefund: false, isValid: true };

  // 当隐藏价格时，total/originTotal/precision等数据不能用于计算
  if (hidePriceInfo) {
    res.totalPrice = '***';
    return res;
  }

  // 未返回total 或 总价计算错误 时，显示 --
  if (
    isUndefined(total) ||
    (!isArray(total) && !isNumber(total)) || // 不是数值类型 返回 非法
    (!isArray(total) && Number.isNaN(total)) || // 是NaN 返回非法
    (isArray(total) && (!isNumber(total[0]) || !isNumber(total[1]))) || // 不是数值类型 返回 非法
    (isArray(total) && (Number.isNaN(total[0]) || Number.isNaN(total[1]))) // 是NaN 返回非法
  ) {
    res.isValid = false;
    return res;
  }

  const origin = !isUndefined(originTotal) ? originTotal : total;

  // 最小原价 / 最大原价
  const [minOrigin, maxOrigin] = isArray(origin) ? origin : [origin, origin];

  // 总价计算
  if (isArray(total)) {
    // 当价格为一个区间范围时

    // 最小价格 / 最大价格
    const [minTotal, maxTotal] = total;
    // 最小差价 / 最大差价
    const [minDiff, maxDiff] = [minOrigin - minTotal, maxOrigin - maxTotal];
    res.totalPrice = `${formatAmount({
      amount: minTotal,
      thousandsSeparator,
      withAbs: true,
      precision,
    })}~${formatAmount({
      amount: maxTotal,
      thousandsSeparator,
      withAbs: true,
      precision,
    })}`;
    res.isRefund = Boolean(total[0] < 0 || total[1] < 0);
    // 原价存在 & 差价大于0 时：展示折扣价格
    res.discountPrice =
      !isUndefined(originTotal) && (maxDiff > 0 || minDiff > 0)
        ? `${formatAmount({
            amount: minDiff,
            thousandsSeparator,
            withAbs: false,
            precision: discountPrecision,
          })}~${formatAmount({
            amount: maxDiff,
            thousandsSeparator,
            withAbs: false,
            precision: discountPrecision,
          })}`
        : undefined;
  } else {
    res.totalPrice = `${formatAmount({ amount: total, thousandsSeparator, withAbs: true, precision })}`;
    res.isRefund = !!(total < 0);
    const diff = minOrigin - total;
    // 原价存在 & 差价大于0 时：展示折扣价格
    res.discountPrice =
      !isUndefined(originTotal) && diff > 0
        ? `${formatAmount({
            amount: diff,
            thousandsSeparator,
            withAbs: false,
            precision: discountPrecision,
          })}`
        : undefined;
  }

  return res;
};

/**
 * 格式化金额（1. 取绝对值，2. 保留精度 3. 格式化生成金额的逗号分隔符）
 */
function formatAmount(options: {
  amount: number;
  precision: number;
  thousandsSeparator?: string;
  withAbs: boolean;
}): string {
  const { amount, precision, thousandsSeparator, withAbs } = options;
  // 取绝对值+保留精度
  const absFixedAmount = withAbs ? Math.abs(amount).toFixed(precision) : amount.toFixed(precision);
  if (thousandsSeparator) {
    // 小数前需要添加分隔符，小数后不添加分隔符
    const parts = absFixedAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    // 正则说明：每3个数字后添加一个千位分隔符
    // \B:非字符边界
    return parts.join('.');
  }
  return absFixedAmount;
}
