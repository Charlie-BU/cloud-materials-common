import React, { useRef, useState } from 'react';
import { useField } from '@formily/react';
import CAsyncSelect from '../../../../CAsyncSelect';
import type {
  CAsyncSelectModel,
  CAsyncSelectProps,
  DataSource,
  FetchDataProps,
  InitDataSource,
  Option,
} from '../../../../CAsyncSelect/interface';
import type { Field, FieldDataSource, Form } from '@formily/core';
import { isEqual, isFunction } from 'lodash-es';
import { useCForm } from '../../hooks';
import type { ReactiveHocParams } from '../RectiveWithCForm';
import reactiveWithCForm from '../RectiveWithCForm';
import type { ObjectType } from '../../../interface';
import { useUpdateEffect } from 'ahooks';

export type CAsyncSelectDataSource = DataSource;

export type CAsyncSelectInitDataSource = InitDataSource;

export type CAsyncSelectFetchDataProps = FetchDataProps & {
  depValues: ObjectType;
  dataDepValues: ObjectType;
  form: Form;
  field: Field;
};

export interface CAsyncSelectFormProps extends CAsyncSelectProps {
  /**
   * @zh 依赖改变的防抖时间设置，可以避免依赖改变时频繁调用fetchData函数
   * @defaultValue 100
   */
  depsReactiveDebounce?: number;
  /**
   * @zh deps改变时，是否禁用value的重置能力
   * @defaultValue false
   */
  disableDepsResetValue?: boolean;
  fetchData: (options: CAsyncSelectFetchDataProps) => Promise<CAsyncSelectDataSource>;
  fetchInitData?: (form?: Form, field?: Field) => Promise<CAsyncSelectInitDataSource>;
}

export const CAsyncSelectForm = reactiveWithCForm(
  (
    props: CAsyncSelectFormProps &
      ReactiveHocParams & {
        ref?: React.MutableRefObject<CAsyncSelectModel>;
      },
  ) => {
    const { disableDepsResetValue = false, depValues = {}, dataDepValues = {}, ...rest } = props;
    const innerRef = useRef<CAsyncSelectModel>(null);
    const ref = props.ref ?? innerRef;
    const field: Field = useField();
    const form = useCForm();
    // 是否需要在focus事件时，触发重新加载
    const [refreshOnFocus, setRefreshOnFocus] = useState<boolean>(false);

    const [dataSource, setDataSource] = useState<DataSource>({
      page: 1,
      list: (field.dataSource ?? []) as Option[],
      noMore: false,
    });

    const processedFetchData = ({ page, searchWord, cacheData }: FetchDataProps) => {
      return props.fetchData({
        page,
        searchWord,
        cacheData,
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

    // 重新加载数据的函数
    const reloadData = () => {
      if (!disableDepsResetValue) ref?.current?.reset();
      else ref?.current?.refresh();
    };

    // 依赖发生变化时，进行相应的处理
    useUpdateEffect(() => {
      // 初始化时，默认不做清空操作
      // 依赖发生变化时，立即将dataSource置为空
      setDataSource({ page: 1, list: [], noMore: false });
      field.dataSource = [];
      // 如果配置了 依赖重置异步下拉组件的value，并且当前不是依赖第一次发生变化：则清除value
      if (!disableDepsResetValue) field.value = props.mode === 'multiple' ? [] : undefined;

      // 依赖改变时，如果配置了autoLoad，立即触发重新加载
      if (props.autoLoad) reloadData();
      // 依赖改变时，如果没有配置autoLoad，设置refreshOnFocus为true，等组件onFocus时消费refreshOnFocus，触发重新加载
      else setRefreshOnFocus(true);
    }, [depValues, dataDepValues]);

    return (
      <CAsyncSelect
        onError={e => {
          console.error(e);
        }}
        {...rest}
        ref={ref}
        fetchData={processedFetchData}
        fetchInitData={processedFetchInitData}
        onFocus={e => {
          if (refreshOnFocus) {
            reloadData();
            setRefreshOnFocus(false);
          }
          props?.onFocus?.(e);
        }}
        dataSource={dataSource}
        // 仅配置了该字段才能实现组件value的受控
        isControlStateChange={true}
        onDataSourceChange={(dataSource: DataSource) => {
          const currentList = dataSource?.list ?? [];
          // 数据源改变时，将数据源同步到field.dataSource
          const fieldDataSource = field.dataSource;
          if (!isEqual(currentList, fieldDataSource)) {
            field.setDataSource(currentList as FieldDataSource);
            setDataSource(dataSource);
          }
          rest?.onDataSourceChange?.(dataSource);
        }}
      />
    );
  },
);

export default CAsyncSelectForm;
