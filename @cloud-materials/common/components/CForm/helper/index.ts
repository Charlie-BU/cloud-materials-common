import type { FieldDataSource, DataField } from '@formily/core';
import { get, isArray, identity, values, isEqual, isObject, isUndefined, isFunction, isNil } from 'lodash-es';
import type { ObjectType } from '../interface';
import type { FieldHandle, DepValues, FieldHandleParams } from './effect';
import Effect, { logWarn } from './effect';
import { getBrotherField, getParentField, checkArrayDuplicates } from './utils';

type DepValuesChecker = (values: DepValues, params: FieldHandleParams) => boolean;
type DataSourceChecker = (
  currentValue: any,
  dataSource: FieldDataSource,
  dataKey: string,
  params: FieldHandleParams,
) => boolean;

type DataSourceHandleParams = {
  dataKey?: string;
  checker?: DataSourceChecker;
  validFilter?: (dataSource: FieldDataSource) => FieldDataSource;
};

// selectFirst的默认checker，判断currValue是否已有值并且是dataSource中的有效值
const _defaultSelectFirstChecker: DataSourceChecker = (currentValue, dataSource, dataKey) =>
  isNil(currentValue) || !dataSource.some(item => isEqual(get(item, dataKey), currentValue));

const _fieldDepValuesHandle = (
  resultHandle: (params: { currField: DataField; depValues?: DepValues; result: boolean }) => void,
  checker?: DepValuesChecker,
) => {
  return ((params: FieldHandleParams) => {
    const { depValues, currField } = params;
    // 默认check depValues 第一项是否无值
    if (isUndefined(checker)) {
      checker = (depValues: DepValues) => {
        const depValue = values(depValues)[0];
        return !identity(isObject(depValue) ? (depValue as any)?.value : depValue);
      };
    }

    if (!isFunction(checker)) {
      return logWarn(`checker on ${currField.address} is not a valid function`);
    }

    resultHandle({ currField, depValues, result: depValues ? !!checker(depValues, params) : false });
  }) as FieldHandle;
};

interface HelperConfig {
  debounceWait?: number;
  enableRaceCondition?: boolean;
}

export class Helper<T extends ObjectType = ObjectType, D extends ObjectType = ObjectType> {
  public effects: Effect<T, D>;

  constructor(config?: HelperConfig) {
    this.effects = new Effect<T, D>(config);
  }

  /**
   * 把 fetchData 的返回值设置为dataSource
   * @param config
   * @param config.fetchResultSourceKey 元素从fetchResult取值的key，值为路径，兼容lodash.get方法
   * @param config.validFilter dataSource 的有效值过滤函数
   * @returns {FieldHandle} fieldCallback
   */
  private setDataSource(config?: {
    fetchResultSourceKey?: string;
    depValuesSourceKey?: string;
    validFilter?: (dataSource: FieldDataSource) => FieldDataSource;
  }) {
    return (({ currField, fetchResult, depValues }) => {
      const { fetchResultSourceKey, depValuesSourceKey, validFilter } = config || {};
      let dataSource = fetchResultSourceKey ? get(fetchResult, fetchResultSourceKey) : fetchResult;

      if (depValuesSourceKey) {
        dataSource = get(depValues, depValuesSourceKey);
      }

      if (!isArray(dataSource)) {
        return logWarn(`dataSource is not a valid array value. please check. `);
      }

      currField.dataSource = validFilter?.(dataSource) ?? dataSource;
    }) as FieldHandle;
  }

  /**
   * 从字段的 dataSource 中取值并赋值给字段
   * @param {string} pathKey 必填元素取值的完整pathKey，值为路径，取值lodash.get(dataSource, pathKey)
   * @param {string} dataKey 元素取值的dataKey，默认为解析 pathKey 去掉第一级路径的值，即[x].y* -> y* (如果pathKey只有一级就为本身)
   * @returns {FieldHandle} fieldCallback
   */
  private setValueByDataSource(config: { pathKey: string } & DataSourceHandleParams) {
    const { pathKey, checker, validFilter = identity, dataKey = pathKey.slice(pathKey.indexOf('.') + 1) } = config;
    return (params => {
      const { currField } = params;
      const dataSource = get(currField, 'dataSource');
      if (!isArray(dataSource)) {
        return logWarn(`currField: ${currField.address} dataSource is not a valid array value. please check. `);
      }

      if (!isUndefined(checker) && !isFunction(checker)) {
        return logWarn(`checker on ${currField.address} is not a valid function`);
      }

      const currentValue = get(currField, 'value');
      const validSource = validFilter?.(dataSource) ?? dataSource;

      if (isUndefined(checker) || checker(currentValue, validSource, dataKey, params)) {
        currField.value = get(dataSource, pathKey);
      }
    }) as FieldHandle;
  }

  /**
   * 从字段的 dataSource 中(检查后)选中第一个元素赋值给字段
   * @param config
   * @param config.dataKey 第一个元素取值的dataKey，兼容lodash.get方法，默认值为value
   * @param config.checker 赋值前校验，返回true则为需要变更，默认为检查currValue无值或不是dataSource中的有效值则选中当前第一个
   * @param config.validFilter dataSource 的有效值过滤函数
   * @returns {FieldHandle} fieldCallback
   */
  private selectFirstByDataSource = (config?: DataSourceHandleParams) => {
    return this.setValueByDataSource({
      ...config,
      checker: config?.checker ?? _defaultSelectFirstChecker,
      pathKey: `[0].${config?.dataKey ?? 'value'}`,
    });
  };

  /**
   * 检测依赖项，并设置该字段是否为disabled，若checker为true，则disabled
   * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
   * @returns {FieldHandle} fieldCallback
   */
  private checkDisableByDeps(checker?: DepValuesChecker) {
    return _fieldDepValuesHandle(({ currField, depValues, result }) => {
      if (depValues) {
        currField.disabled = result;
      }
    }, checker);
  }

  /**
   * 检测依赖项，若checker为true，则清空
   * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
   * @returns {FieldHandle} fieldCallback
   */
  private checkClearValueByDeps(checker?: DepValuesChecker) {
    return _fieldDepValuesHandle(({ currField, result }) => {
      result && currField.setValue(undefined);
    }, checker);
  }

  fieldCallback = {
    setDataSource: this.setDataSource,
    setValueByDataSource: this.setValueByDataSource,
    selectFirstByDataSource: this.selectFirstByDataSource,
    checkDisableByDeps: this.checkDisableByDeps,
    checkClearValueByDeps: this.checkClearValueByDeps,
  };
}

export const createHelper = <T extends ObjectType = ObjectType, D extends ObjectType = ObjectType>(
  config?: HelperConfig,
) => {
  return new Helper<T, D>(config);
};

export default createHelper;
export { getParentField, getBrotherField, checkArrayDuplicates };
