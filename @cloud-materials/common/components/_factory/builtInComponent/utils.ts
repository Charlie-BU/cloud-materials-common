import classNames from 'classnames';
import type { SpecialProps } from './interface';

export const mergeSpecialProps = (...restProps: (SpecialProps | undefined)[]): SpecialProps | undefined => {
  const safeProps = restProps.filter((v): v is SpecialProps => Boolean(v));
  if (safeProps.every(v => !v.style)) {
    return safeProps.reduce(
      (prev, current) => ({ ...prev, ...current, className: classNames(prev.className, current.className) || void 0 }),
      {},
    );
  }
  return safeProps.reduce<SpecialProps>(
    (prev, current) => ({
      ...prev,
      ...current,
      style: { ...prev.style, ...current.style },
      className: classNames(prev.className, current.className) || void 0,
    }),
    {},
  );
};
