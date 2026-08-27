export const createDeferred = <T extends any = any>() => {
  let resolve: (...args: any[]) => any = () => {};
  let reject = resolve;
  const promise = new Promise<T>((rs, rj) => {
    resolve = rs;
    reject = rj;
  });

  return [promise, resolve, reject] as const;
};
