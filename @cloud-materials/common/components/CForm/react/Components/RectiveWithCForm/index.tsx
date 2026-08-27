import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useCForm } from '../../hooks';
import { cloneDeep, get, isEqual, pick, set, uniqueId } from 'lodash-es';
import type { DataField } from '@formily/core';
import { isDataField, onFieldReact, onFieldValueChange } from '@formily/core';
import { toJS } from '@formily/reactive';
import { observer } from '@formily/react';
import { onCFormDataChange } from '../../hooks/effects';
import type { ObjectType } from '../../../interface';
import { useDebounceFn } from 'ahooks';

/**
 * @title 依赖收集高阶组件 Props
 */
export interface ReactiveHocProps {
  /**
   * @zh 依赖的字段路径集合
   */
  deps?: string[];
  /**
   * @zh 依赖的form.data 的key集合
   */
  dataDeps?: string[];
  /**
   * @zh 依赖触发联动的防抖时间
   * @defaultValue 100
   */
  depsReactiveDebounce?: number;
}

/**
 * @title 依赖收集高阶组件 Params
 */
export interface ReactiveHocParams {
  /**
   * @zh 依赖的字段的值
   */
  depValues?: ObjectType;
  /**
   * @zh 依赖的form.data的值
   */
  dataDepValues?: ObjectType;
}

function reactiveWithCForm<P extends ReactiveHocParams>(component: React.FC<P>) {
  return observer(
    (props: Omit<P, 'depValues' | 'dataDepValues'> & ReactiveHocProps) => {
      const { deps = [], dataDeps = [], depsReactiveDebounce = 100, ...rest } = props;
      const form = useCForm();
      const [depValues, setDepsValues] = useState(() => {
        const initialValues = {};
        deps.forEach(path => {
          set(initialValues, path, get(form.values, path));
        });
        // 需要克隆，否则 {path: get(form.values, path)} 中get的数据为引用类型时，无法触发依赖更新
        return cloneDeep(initialValues);
      });
      const [dataDepValues, setDepsDataValues] = useState(pick(form.data, dataDeps));
      const depValuesRef = useRef(cloneDeep(depValues));
      const dataDepValuesRef = useRef(cloneDeep(dataDepValues));

      // 创建唯一的debounce防抖函数
      const changeDepsValues = useDebounceFn(
        () => {
          if (!isEqual(depValuesRef.current, depValues)) {
            setDepsValues(cloneDeep(depValuesRef.current));
          }
        },
        { wait: depsReactiveDebounce },
      );

      const changeDepsData = useDebounceFn(
        () => {
          if (!isEqual(dataDepValuesRef.current, dataDepValues)) {
            setDepsDataValues(cloneDeep(dataDepValuesRef.current));
          }
        },
        { wait: depsReactiveDebounce },
      );

      useEffect(() => {
        const effectId = uniqueId('reactiveWithCForm');
        form.addEffects(effectId, () => {
          const changeCallback = (field: DataField) => {
            depValuesRef.current = set(depValuesRef.current, field.path.toString(), toJS(field.value));
            changeDepsValues.run();
          };

          if (deps.length > 0) {
            deps.forEach(path => {
              /**
               * 监听的补充
               * 主要用于数组字段长度改变监听 & 字段初始化监听 & 普通字段 value 改变监听
               */
              onFieldReact(path, field => {
                if (isDataField(field)) {
                  changeCallback(field);
                }
              });
              /**
               * 数组子字段 & 对象子字段改变监听
               */
              onFieldValueChange(`${path}.*`, field => {
                changeCallback(field);
              });
            });
          }

          if (dataDeps.length > 0) {
            onCFormDataChange((data: any) => {
              dataDeps?.forEach(path => {
                dataDepValuesRef.current = set(dataDepValuesRef.current, path.toString(), get(data, path));
              });
              changeDepsData.run();
            });
          }
        });

        return () => {
          form.removeEffects(effectId);
          changeDepsValues.cancel();
          changeDepsData.cancel();
        };
      }, [form]);

      return component({ ...(rest as P), depValues, dataDepValues });
    },
    { forwardRef: true },
  );
}

export default reactiveWithCForm;
