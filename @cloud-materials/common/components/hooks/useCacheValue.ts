import { isUndefined } from 'lodash-es';
import { useCallback } from 'react';
import { useCConfigContext } from '../CConfigProvider';

interface UseCacheValueOption<T> {
  defaultValue?: T;
  value?: T;
  cacheKey?: string;
}

export const useCacheValue = <T>(options: UseCacheValueOption<T>, initValue: T): [T, (value: T) => void] => {
  const { defaultValue, value, cacheKey } = options;
  let _value = (!isUndefined(value) ? value : defaultValue) ?? initValue;
  const { storage } = useCConfigContext();

  if (storage.localStorage && cacheKey) {
    const cacheValue = storage.localStorage.getItem(cacheKey);
    if (cacheValue) {
      try {
        _value = JSON.parse(cacheValue);
      } catch (error) {
        console.warn(`[AdvanceSearch] parse cache "${cacheKey}" failed.`);
      }
    }
  }

  const setCacheValue = useCallback(
    value => {
      if (storage.localStorage && cacheKey) {
        storage.localStorage.setItem(cacheKey, JSON.stringify(value));
      }
    },
    [cacheKey],
  );

  return [_value, setCacheValue];
};
