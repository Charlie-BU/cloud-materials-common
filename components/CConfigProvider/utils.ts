import { useMemo } from 'react';
import defaultLocale from '../locales/default';
import { createCssPrefix, GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import type { CConfigContextValue } from './interface';

export const DEFAULT_C_PREFIX_CLS = GLOBAL_PREFIX;
export const defaultProps = {
  locale: defaultLocale,
  cPrefixCls: DEFAULT_C_PREFIX_CLS,
};

export const getCPrefixClsFn =
  (defaultPrefixCls: string): CConfigContextValue['getCPrefixCls'] =>
  (componentName, customPrefix?) => {
    return `${customPrefix || defaultPrefixCls}-${componentName}`;
  };

export const formatLocale: CConfigContextValue['formatLocale'] = (locale, replaceParams) => {
  let value = locale;
  Object.entries(replaceParams).forEach(([key, val]) => {
    value = value.replace(`{${key}}`, `${val}`);
  });
  return value;
};

export const createClassNamePrefixHooks = (prefix: string) => {
  const useCssPrefix = (componentName: string, customPrefix?: string) => {
    return useMemo(() => {
      return createCssPrefix(customPrefix || prefix, componentName);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentName, customPrefix, prefix]);
  };

  return useCssPrefix;
};
