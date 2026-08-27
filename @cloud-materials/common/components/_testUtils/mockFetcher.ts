export const mockFetcher = <T>(expectValue: T, wait?: number, failed?: boolean) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (failed) {
        reject(new Error('error'));
      } else {
        resolve(expectValue);
      }
    }, wait);
  });
