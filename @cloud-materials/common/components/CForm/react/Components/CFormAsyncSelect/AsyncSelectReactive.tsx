import React, { useRef, useState } from 'react';
import { isEqual, isFunction, isObject, isUndefined } from 'lodash-es';
import type {
  CFormAsyncSelectFetchDataSource,
  CFormAsyncSelectInitDataSource,
  CFormAsyncSelectModel,
  CFormAsyncSelectOption,
  CFormAsyncSelectProps,
  FetchDataProps,
} from './interface';
import type { ReactiveHocParams } from '../RectiveWithCForm';
import reactiveWithCForm from '../RectiveWithCForm';
import type { CField, CForm, ObjectType } from '../../../interface';
import { connect, mapReadPretty, useField } from '@formily/react';
import { useCForm } from '../../hooks/useCForm';
import { useUpdateEffect } from 'ahooks';
import CFormAsyncSelect from '.';
import type { FieldDataSource } from '@formily/core';
import type { LabeledValue } from '@arco-design/web-react/es/Select/interface';

const CFormAsyncSelectSeletedOption = 'CFormAsyncSelectSeletedOption';

export type CAsyncSelectFetchDataProps = FetchDataProps & {
  depValues: ObjectType;
  dataDepValues: ObjectType;
  form: CForm;
  field: CField;
};

export interface CFormAsyncSelectReactiveInnerProps
  extends Omit<CFormAsyncSelectProps, 'enableRemoteLoadWhenDataSourceControlled' | 'value' | 'dataSource' | 'loading'> {
  /**
   * @zh deps改变时，是否禁用value的重置能力
   * @defaultValue false
   */
  disableDepsResetValue?: boolean;
  /**
   * @zh 是否将已选option存储在field.data中
   * @defaultValue true
   * @description 避免切换步骤导致label丢失，如要使用field.data，它将是Record，不要直接覆盖
   */
  enableCacheOption?: boolean;
  /**
   * @zh 远程拉取数据
   */
  fetchData: (options: CAsyncSelectFetchDataProps) => Promise<CFormAsyncSelectFetchDataSource>;
  /**
   * @zh 当初始值不在第一页时调用，以获取value对应的label
   */
  fetchInitData?: (form?: CForm, field?: CField) => Promise<CFormAsyncSelectInitDataSource>;
}

export type CFormAsyncSelectReactiveProps = Parameters<typeof CFormAsyncSelectReactive>[0];

/**
 * @description 注意！！！field.data会用来存储已经选择的选项，针对选择后切换步骤，导致组件卸载，状态丢失，显示value而不是label
 */
const CFormAsyncSelectReactive = reactiveWithCForm(
  (
    props: CFormAsyncSelectReactiveInnerProps &
      ReactiveHocParams & {
        ref?: React.MutableRefObject<CFormAsyncSelectModel>;
      },
  ) => {
    const {
      dataDepValues = {},
      depValues = {},
      disableDepsResetValue = false,
      enableCacheOption = true,
      labelInValue,
      ...rest
    } = props;
    const innerRef = useRef<CFormAsyncSelectModel>(null);
    const ref = props.ref ?? innerRef;
    const field: CField = useField();
    const form = useCForm();

    const [dataSource, setDataSource] = useState<CFormAsyncSelectFetchDataSource | undefined>();

    const processedFetchData = (originalProps: FetchDataProps) => {
      return props.fetchData?.({
        ...originalProps,
        depValues: depValues,
        dataDepValues: dataDepValues,
        form,
        field,
      });
    };

    const processedFetchInitData = isFunction(props.fetchInitData)
      ? () => {
          return props.fetchInitData!(form, field);
        }
      : undefined;

    const onDataSourceChange: CFormAsyncSelectReactiveInnerProps['onDataSourceChange'] = (
      newDataSource: CFormAsyncSelectFetchDataSource | undefined,
    ) => {
      setDataSource(newDataSource);
      field.setDataSource(newDataSource?.list as unknown as FieldDataSource);
      props.onDataSourceChange?.(newDataSource);
    };

    const onFetchDataLoadingChange: CFormAsyncSelectReactiveInnerProps['onFetchDataLoadingChange'] = (
      loading: boolean,
    ) => {
      field.loading = loading;
      props.onFetchDataLoadingChange?.(loading);
    };

    const onChange: CFormAsyncSelectReactiveInnerProps['onChange'] = (
      value: LabeledValue | LabeledValue[],
      options,
    ) => {
      if (enableCacheOption) {
        field.setData({
          ...(typeof field.data === 'object' ? field.data : {}),
          [CFormAsyncSelectSeletedOption]: value,
        });
      }
      let val: any = value;
      if (!labelInValue) {
        val = Array.isArray(value) ? value.map(el => el?.value) : value?.value;
      }
      props.onChange?.(val, options);
    };
    // 通过 CFormAsyncSelect labelInValue为true并结合在field.data中存储，解决切换步骤导致label丢失的问题
    // 因此这些函数直接传给CFormAsyncSelect，参数中value会是LabeledValue，需要根据设置的labelInValue处理一下
    if (rest.renderFormat) {
      const customRenderFormat = rest.renderFormat;
      rest.renderFormat = (option, value) => {
        return customRenderFormat(option, labelInValue ? value : isObject(value) ? value.value : value);
      };
    }
    if (rest.onSelect) {
      const customOnSelect = rest.onSelect;
      rest.onSelect = (value, option) => {
        return customOnSelect(labelInValue ? value : isObject(value) ? value.value : value, option);
      };
    }
    if (rest.onDeselect) {
      const customOnDeselect = rest.onDeselect;
      rest.onDeselect = (value, option) => {
        return customOnDeselect(labelInValue ? value : isObject(value) ? value.value : value, option);
      };
    }

    useUpdateEffect(() => {
      if (disableDepsResetValue) {
        ref.current?.refresh(false);
      } else {
        ref.current?.reset();
      }
    }, [depValues, dataDepValues]);

    useUpdateEffect(() => {
      if (isUndefined(field.dataSource)) {
        setDataSource(undefined);
      }
    }, [field.dataSource]);

    // 避免直接设置field.value，导致与field.data中存储不一致的情况
    let value = field.value;
    const cacheVal = field.data?.[CFormAsyncSelectSeletedOption];
    if (
      cacheVal &&
      isEqual(
        Array.isArray(cacheVal)
          ? cacheVal.map(el => el.value)
          : typeof cacheVal === 'object'
          ? cacheVal.value
          : cacheVal,
        value,
      )
    ) {
      value = cacheVal;
    }

    return (
      <CFormAsyncSelect
        {...rest}
        dataSource={
          isUndefined(dataSource)
            ? dataSource
            : { ...dataSource, list: field.dataSource as unknown as CFormAsyncSelectOption[] }
        }
        enableRemoteLoadWhenDataSourceControlled
        fetchData={processedFetchData}
        fetchInitData={processedFetchInitData}
        labelInValue
        loading={field.loading}
        onChange={onChange}
        onDataSourceChange={onDataSourceChange}
        onFetchDataLoadingChange={onFetchDataLoadingChange}
        ref={ref}
        value={value}
      />
    );
  },
);

const CFormAsyncSelectReactiveConnnect = connect(
  CFormAsyncSelectReactive,
  mapReadPretty(() => {
    const field = useField() as CField;
    const value = field.value;
    // labelInValue
    const cacheVal = field.data?.[CFormAsyncSelectSeletedOption];
    if (
      cacheVal &&
      isEqual(
        Array.isArray(cacheVal)
          ? cacheVal.map(el => el.value)
          : typeof cacheVal === 'object'
          ? cacheVal.value
          : cacheVal,
        value,
      )
    ) {
      if (Array.isArray(cacheVal) || typeof cacheVal === 'object') {
        const newCacheVal = Array.isArray(cacheVal) ? cacheVal : [cacheVal];
        if (newCacheVal.some(el => typeof el.label !== 'string' || typeof el.label !== 'number')) {
          return newCacheVal.map(el => el.label).join(', ');
        } else {
          return newCacheVal.map(el => el.value).join(', ');
        }
      } else {
        return field.value ?? '-';
      }
    }
    return Array.isArray(field.value) ? field.value.join(', ') : field.value ?? '-';
  }),
);

export default CFormAsyncSelectReactiveConnnect;
