export type ArrayItem<T extends any[]> = T extends (infer P)[] ? P : never;
export type IsUnion<T, K = T> = T extends K ? ([K] extends [T] ? false : true) : never;
