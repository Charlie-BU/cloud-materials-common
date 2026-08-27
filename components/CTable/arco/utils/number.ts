export const toLocaleString = (val?: number) => {
  // 设置 maximumFractionDigits，否则只会保留 3 位小数
  return val?.toLocaleString?.(undefined, { maximumFractionDigits: 20 });
};
