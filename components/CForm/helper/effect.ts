import {
  onFieldInit,
  isDataField,
  onFieldValueChange,
  isObjectField,
  onFormMount,
  onFormGraphChange,
  onFormUnmount,
  isVoidField,
} from '@formily/core';
import type { GeneralField, FormPathPattern, DataField, ObjectField, VoidField } from '@formily/core';
import { debounce, isArray, noop, intersection, xorWith, isNil, get, values } from 'lodash-es';
import type { CForm, ObjectType } from '../interface';
import { ReloadPrefixKey, SubFieldValidKey } from '../const';
import { autorun, batch, untracked } from '@formily/reactive';
import type { IsUnion } from '../../_utils/types';
import { checkArrayDuplicates as innerCheckArrayDuplicates } from './utils';
import { safeRace } from '@byted-c/storage.utils.safe-race';

export type DepValues = Record<string, unknown>;

export type FetchDataHandle<
  DV extends DepValues = DepValues,
  T extends ObjectType = any,
  D extends ObjectType = any,
> = (params: { form: CForm<T, D>; fields: GeneralField | GeneralField[]; depValues?: DV }) => Promise<any>;

export type FieldHandleParams<
  DV extends DepValues = DepValues,
  T extends ObjectType = any,
  D extends ObjectType = any,
> = {
  form: CForm<T, D>;
  currField: DataField;
  depValues?: DV;
  fetchResult?: any;
};
export type FieldHandle<DV extends DepValues = DepValues, T extends ObjectType = any, D extends ObjectType = any> = (
  params: FieldHandleParams<DV, T, D>,
) => void;

export type FormPathType = FormPathPattern | FormPathPattern[];

export interface EffectParams<
  DV extends DepValues = DepValues,
  T extends ObjectType = any,
  D extends ObjectType = any,
> {
  fieldNames: FormPathType;
  fetchData?: FetchDataHandle<DV, T, D>;
  fieldCallback?: FieldHandle<DV, T, D> | FieldHandle<DV, T, D>[];
  voidFieldCallback?: (params: { currField: VoidField } & Omit<FieldHandleParams<DV, T, D>, 'currField'>) => void;
  debounceWait?: number;
  /** 可配置此联动的fetchData是否开启竞态处理 */
  enableRaceCondition?: boolean;
}

export interface EffectConfig {
  debounceWait?: number;
  enableRaceCondition?: boolean;
}

const wrapArr = (item: unknown | unknown[]) => (isArray(item) ? item : [item]);

const reloadKey = (name: FormPathType) =>
  ReloadPrefixKey + (isArray(name) ? name.map(n => n.toString()).join('_') : name.toString());

export const logWarn = (message?: any, ...optionalParams: any[]) => {
  process.env.NODE_ENV !== 'production' && console.warn(message, ...optionalParams);
};

const batchFieldHandle = (params: {
  name: FormPathType;
  effectHooks: (pattern: FormPathPattern, callback: (field: GeneralField, form: CForm) => void) => void;
  callback: (field: GeneralField, form: CForm) => void;
  debounceWait: number;
}) => {
  const { name, effectHooks, callback, debounceWait } = params;
  const _callback = debounce(callback, debounceWait);
  if (!isArray(name)) {
    effectHooks(name, _callback);
  } else {
    name.forEach(pattern => effectHooks(pattern, _callback));
  }
};

const runFieldsCallbacks = async (
  params: {
    form: CForm;
    getDepValues?: (form: CForm) => DepValues;
  } & EffectParams,
) => {
  const { form, getDepValues, fieldNames, fetchData, fieldCallback, voidFieldCallback } = params;
  const depValues = getDepValues?.(form);

  //获取所有响应字段对象
  const fields: GeneralField[] = [];
  wrapArr(fieldNames).forEach(pattern => {
    form.query(pattern).forEach(f => {
      f && fields.push(f);
    });
  });
  if (fields.length <= 0) return;

  const dataFields = fields.filter(isDataField);
  //处理异步回调
  let fetchResult: any = null;
  if (fetchData) {
    try {
      dataFields.forEach(_field => {
        _field.loading = true;
      });
      fetchResult = await fetchData({ depValues, form, fields: isArray(fieldNames) ? fields : fields[0] });
      dataFields.forEach(_field => {
        _field.setData({ failedData: {} });
        _field.loading = false;
      });
    } catch (error) {
      dataFields.forEach(_field => {
        // TODO: 手动加入LoadingError组件使用
        _field.setData({ failedData: { failed: true, notifyKey: reloadKey(fieldNames) } });
        _field.loading = false;
      });
      console.error(`Field - ${wrapArr(fieldNames).join(',')} 回调函数fetchData运行错误`, error);
      return;
    }
  }

  // 处理同步回调
  if (fieldCallback) {
    dataFields.forEach(currField => {
      if (isArray(fieldCallback)) {
        fieldCallback.forEach(cb => {
          cb({ form, fetchResult, depValues, currField });
        });
      } else {
        fieldCallback({ form, fetchResult, depValues, currField });
      }
    });
  }

  if (voidFieldCallback) {
    fields.filter(isVoidField).forEach(currField => {
      voidFieldCallback({ form, fetchResult, depValues, currField });
    });
  }
};
export default class Effect<T extends ObjectType = ObjectType, D extends ObjectType = ObjectType> {
  private data = {} as Record<string, unknown>;
  debounceWait = 200;
  enableRaceCondition: boolean | undefined = undefined;

  constructor(config?: EffectConfig) {
    const time = config?.debounceWait;
    if (!isNil(time) && !Number.isNaN(time)) {
      this.debounceWait = time;
    }
    this.enableRaceCondition = config?.enableRaceCondition;
  }

  /**
   * (多)字段初始化逻辑，支持单个/批量操作
   * @param {EffectParams} options
   * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
   * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
   * @param options.fieldCallback 可配置每个字段的处理，如：设置dataSource、visible、value等
   * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
   * @param options.debounceWait 可配置多字段响应防抖时间
   * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
   */
  fieldsInit(options: EffectParams<any, T, D>) {
    const {
      fieldNames,
      fetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait = this.debounceWait,
      enableRaceCondition = this.enableRaceCondition,
    } = options;
    const safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
    batchFieldHandle({
      name: fieldNames,
      debounceWait,
      effectHooks: onFieldInit,
      callback: (_, form: CForm<T, D>) => {
        runFieldsCallbacks({ form, fieldNames, fetchData: safeRaceFetchData, fieldCallback, voidFieldCallback });
      },
    });

    //TODO: LoadingError组件 重新加载触发钩子
    //onReloadFields(name, callback);
  }

  private fieldsReactiveByDeps(options: EffectParams & { getDepValues: (form: CForm<T, D>) => DepValues }) {
    const {
      fieldNames,
      fetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait = this.debounceWait,
      getDepValues,
    } = options;
    let dispose: any = null;
    const _runFieldsCallbacks = debounce(runFieldsCallbacks, debounceWait);
    const callback = (_: GeneralField, form: CForm<T, D>) => {
      if (dispose) {
        // 多个field的初始化分批执行，会多次收集依赖，保留最后一次就行
        dispose();
      }
      dispose = autorun(() => {
        getDepValues(form);
        untracked(() => {
          _runFieldsCallbacks({ form, fieldNames, getDepValues, fetchData, fieldCallback, voidFieldCallback });
        });
      });
    };
    batchFieldHandle({ name: fieldNames, debounceWait, effectHooks: onFieldInit, callback });

    //TODO: LoadingError组件 重新加载触发钩子
    //onReloadFields(name, callback);
  }
  /**
   * (多)字段联动逻辑，支持单个/批量操作
   * @param options
   * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
   * @param options.deps 被依赖的字段名/路径，支持传入单个 & 数组
   * @param options.watches 可以传入具体要监听的的属性集合，也可以不传，默认是监听每个 dep 的 value 变化
   * @param options.fetchData 可配置拉取数据请求 & 相应格式化，函数返回结果会传递给fieldCallback做入参
   * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
   * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
   * @param options.debounceWait 可配置多字段响应防抖时间
   * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
   */
  fieldsReactive<DP extends string, W extends string = 'value'>(
    options: { deps: DP | DP[]; watches?: W | W[] } & EffectParams<
      {
        [key in DP]?: IsUnion<W> extends true ? { [key in W]?: unknown } : T[key];
      },
      T,
      D
    >,
  ) {
    const {
      fieldNames,
      deps,
      watches = 'value',
      fetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait,
      enableRaceCondition = this.enableRaceCondition,
    } = options;
    const safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
    this.fieldsReactiveByDeps({
      fieldNames,
      fetchData: safeRaceFetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait,
      getDepValues: form => {
        const depValues: DepValues = {};
        wrapArr(deps).forEach(dep => {
          const _field = form.query(dep).take();
          // 被依赖字段可能在下一步/还未被init，此时field为空
          depValues[dep] = _field;
          if (_field) {
            if (isArray(watches)) {
              const _values = {};
              watches.forEach(key => {
                Object.assign(_values, { [key]: get(_field, key) });
              });
              depValues[dep] = _values;
            } else {
              depValues[dep] = get(_field, watches);
            }
          }
        });
        return depValues;
      },
    });
  }

  /**
   * 全局数据的响应逻辑，支持单个/批量字段响应
   * @param options
   * @param options.fieldNames 要操作的字段名/路径，支持传入单个 & 数组
   * @param options.fieldCallback 可配置每个要操作字段的处理，如：设置dataSource、visible、value等
   * @param options.voidFieldCallback 可配置每个VoidField类型的字段的处理，因与常用的DataField属性区别较大，所以单独提供此方法
   * @param options.debounceWait 可配置多字段响应防抖时间
   * @param options.enableRaceCondition 可配置此联动的fetchData是否开启竞态处理
   */
  formDataReactive(options: EffectParams<D>) {
    const {
      fieldNames,
      fetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait,
      enableRaceCondition = this.enableRaceCondition,
    } = options;
    const safeRaceFetchData = safeRace(fetchData, { enabled: enableRaceCondition });
    this.fieldsReactiveByDeps({
      fieldNames,
      fetchData: safeRaceFetchData,
      fieldCallback,
      voidFieldCallback,
      debounceWait,
      getDepValues: form => ({ ...form.data }),
    });
  }

  /**
   * 判断 ArrayItems/ArrayTable 中是否有重复的行
   * @param params
   * @param params.arrayFieldName 数组字段的 name
   * @param params.itemName 要校验的 item，传入数组可同时校验多列
   * @param params.firstError 重复时第一个重复项是否报错，默认 true
   * @param params.message 自定义错误信息，如果 itemName 传入多个，这里需要和 itemName 按顺序对应
   */
  checkArrayDuplicates(params: {
    arrayFieldName: string;
    itemName: string | string[];
    firstError?: boolean;
    message?: string | string[];
  }) {
    innerCheckArrayDuplicates(params);
  }

  /**
   * 自动隐藏整个 Section，当子字段全部隐藏或为空时
   * @param {FormPathPattern} pattern
   */
  autoHiddenEmptySection(pattern: FormPathPattern) {
    this.fieldsReactiveByDeps({
      fieldNames: pattern,
      voidFieldCallback: ({ depValues, currField }) => {
        currField.hidden = !values(depValues)?.find(Boolean);
      },
      getDepValues: form => {
        const depValues: DepValues = {};
        const field = form.query(pattern).take();
        form.query(`${field?.address.entire}.*`)?.forEach(v => {
          depValues[String(v.path.entire)] = v.selfDisplay === 'visible' || v.display === 'visible' || v.visible;
        });
        return depValues;
      },
    });
  }

  /**
   * 字段校验联动逻辑，任意一个改动自动触发其他关联字段校验
   * @param {FormPathPattern[]} patterns 互相触发校验的字段
   */
  validatorReactive(patterns: FormPathPattern[]) {
    // 避免同步里执行，因为validate是异步的
    const callback = debounce((_: GeneralField, form: CForm<T, D>) => {
      patterns
        .flatMap(pattern => form.query(pattern).map(f => f))
        .filter(isDataField)
        .forEach(field => field.validate().catch(noop));
    }, 10);
    patterns.forEach(pattern => {
      onFieldValueChange(pattern, callback);
    });
  }

  /**
   * 自动收集检测所有子字段是否合法
   * @param {FormPathPattern} pattern
   */
  subFieldValidChecker(pattern: FormPathPattern, options?: { alwaysCheckOnGraphChange?: boolean }) {
    if (!pattern) {
      return;
    }
    const { alwaysCheckOnGraphChange } = options ?? {};
    const patternKey = pattern.toString();
    if (this.data[patternKey]) {
      logWarn(`subFieldValidChecker helper 对于同一字段${pattern}只能调用一次。`);
      return;
    }

    this.data[patternKey] = true;

    let preSubFieldsPath: string[] = [];
    let currentParentField: ObjectField | null = null;
    let currentSubFields: DataField[] = [];

    const checkHasChanged = (a: string[], b: string[]) => {
      if (a.length !== b.length) {
        return true;
      }

      const inter = intersection(a, b);
      return inter.length !== a.length;
    };

    const checkSubValidByWithOutTrack = async (field: ObjectField | null, subFields: DataField[]) => {
      if (!field || !subFields) {
        return;
      }

      const notModifedFields = subFields.filter(f => !f.modified);
      const errorFields = notModifedFields.filter(f => f.errors.length > 0);
      await Promise.all(notModifedFields.map(f => f.validate().catch(() => {})));

      const isInValid = subFields.map(f => f.valid).some(v => !v);

      field.value[SubFieldValidKey] = !isInValid;

      // 避免将默认有error的字段给清空了，故取一个差集
      const needResetFields = xorWith(
        errorFields,
        notModifedFields.filter(f => f.errors.length > 0),
        (a, b) => a.address.entire === b.address.entire,
      );
      if (needResetFields.length > 0) {
        batch(() => {
          needResetFields.forEach(f =>
            f.setFeedback({
              type: 'error',
              messages: [],
            }),
          );
        });
      }
    };

    const handelGraphChange = debounce((form: CForm<T, D>) => {
      const field = form.query(pattern).take();
      if (field) {
        if (!isObjectField(field)) {
          logWarn(
            `subFieldValidChecker helper 只能用于ObjectField，而${field.path.entire} 类型为${field?.displayName}`,
          );
          return;
        }
        // 取所有的子孙节点
        const subFields = form.query(`${field.address.entire}.*`).map().filter(isDataField) as DataField[];
        const subFieldsPath = subFields.map(f => f.address.entire) as string[];
        // 排个序 & 对比
        const hasSubChanged = checkHasChanged(preSubFieldsPath, subFieldsPath);
        if (alwaysCheckOnGraphChange || hasSubChanged) {
          currentParentField = field;
          currentSubFields = subFields;
          checkSubValidByWithOutTrack(field, subFields);
        }

        preSubFieldsPath = subFieldsPath;
      }
    }, 100);

    const handleFieldChange = debounce((field: GeneralField) => {
      // formily升级之后，原先Field的includes方法内部逻辑发生改变
      // 导致即使是两个完全相同的字段，也有可能无法通过includes返回true
      // 因此这里使用专门的逻辑来实现includes的判断
      const ifInclude = currentSubFields?.map(item => item.path.entire).includes(field.path.entire);
      if (ifInclude) {
        checkSubValidByWithOutTrack(currentParentField, currentSubFields);
      }
    }, 50);

    onFieldValueChange('*', handleFieldChange);

    onFormMount(handelGraphChange);
    onFormGraphChange(handelGraphChange);
    onFormUnmount(() => {
      handelGraphChange.cancel();
      handleFieldChange?.cancel();
      delete this.data[patternKey];
    });
  }
}
