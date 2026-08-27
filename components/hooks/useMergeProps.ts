import { useMemo } from 'react';

export const useMergeProps = <PropsType>(
  componentProps: PropsType,
  defaultProps: PropsType,
  globalComponentConfig: Partial<PropsType>,
  deps: unknown[] = [],
): PropsType => {
  const _defaultProps = useMemo(() => {
    return { ...defaultProps, ...globalComponentConfig };
  }, [defaultProps, globalComponentConfig, ...deps]);

  const props = useMemo(() => {
    const mProps = { ...componentProps };
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName];
      }
    }
    return mProps;
  }, [componentProps, _defaultProps, ...deps]);

  return props;
};
