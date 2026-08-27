// 限定 react 组件的返回值，排除 undefined
// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentExcludeUndefined = Exclude<{}, undefined> | null;

/**
 * AllowEmpty 用于允许在 columns 列表、toolbar item 列表中允许写表达式类控制 item 的可见性
 * 如 enableXxx & { ...config }，这个时候这个 item 的类型可能是 false，因此这里做类型处理
 * 因为 ts 限制这种联合类型每个类型都需要具有一个字段才能准确判断，如果加入 false，或导致类型提示不准确
 * 表现为 component 和 componentProps 同时报错，并且提示的错误字段不对
 * 因此强行为 false 与一个 component 字段
 * 因为 undefined & { component?: '-' } 结果是 never，因此无法使用该 hack 解决方案
 * 这里考虑 undefined 不常用，可以不支持
 */
export type AllowEmpty<T> = (false & { component?: '-' }) | T;
