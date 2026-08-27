import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from 'react';
import type { CAsyncSelectModel, CAsyncSelectProps, SelectOption } from './interface';
import classNames from 'classnames';
import { loadingSpin, renderOptions, defaultRenderTag } from './util';
// import CAsyncSelectForDrawer from './CAsyncSelectForDrawer';
import type { SelectProps } from '@arco-design/web-react';
import { Button, Empty, Select } from '@arco-design/web-react';
import { useCAsyncSelect } from './hooks/useAsyncSelect';
import type { LabeledValue, OptionInfo } from '@arco-design/web-react/es/Select/interface';
import { testId, cssRoot } from './dataCy';
import { useControlledValue } from '../hooks/useControlledValue';
import { useCConfigContext } from '../CConfigProvider';
import { ConfigContext } from '@arco-design/web-react/es/ConfigProvider';
import { useUpdateEffect } from 'ahooks';
import { IconDown, IconClose, IconRefresh } from '@arco-design/iconbox-react-ve-o-design';
import type { ObjectValueType } from '@arco-design/web-react/es/InputTag/interface';
import { IconLoading } from '@arco-design/web-react/icon';
import { isObject } from 'lodash-es';

const CAsyncSelect = forwardRef<CAsyncSelectModel, CAsyncSelectProps>((props, ref) => {
  const {
    style,
    className,
    wrapperClassName,
    wrapperStyle,
    dropMenuMaxHeight = 312,
    optionMode = 'singleRow',
    reloadKey,
    onDataSourceChange,
    enableSearch = true,
    showMaxTagToolTip = false,
    enableCopy = false,
    emptyProps,
    showRefreshBtn = false,
    isControlStateChange = false,
    ...restProps
  } = props;

  const [state, setState] = useControlledValue<
    string | number | string[] | number[] | LabeledValue | LabeledValue[] | undefined
  >(props);
  const [selectedOption, setSelectedOption] = useState<OptionInfo | OptionInfo[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const { useCssPrefix, locale } = useCConfigContext();
  const { prefixCls } = useContext(ConfigContext);
  const cssPrefix = useCssPrefix('async-select');
  // 异步下拉组件是否有包装层
  const hasOuterWrapper = showRefreshBtn;
  //是否是多选且双行模式
  const isMuiAndDoubleRows = optionMode === 'doubleRow' && restProps.mode === 'multiple';

  const [{ data, loading, loadingMore, autoLoadFirstValue }, asyncSelectControls] = useCAsyncSelect(props);

  const onChange: SelectProps['onChange'] = (val, option) => {
    if (!isControlStateChange) {
      setState(val);
    }
    setSelectedOption(option);
    if (!props.labelInValue) {
      // 如果未设置labelInValue，则直接对外传val
      props.onChange?.(val, option);
    } else {
      // 如果设置了labelInValue，则对label进行处理后传出（未经处理的label是fragment）
      if (!option || (Array.isArray(option) && !option.length)) {
        props.onChange?.(val, option);
      } else if (Array.isArray(val)) {
        // 多选模式
        const formatOptionArr = Array.isArray(option) ? option : [option];
        const res = val.map((item: any) => {
          const relatedOption = formatOptionArr.find(optionItem => optionItem.value === item.value);
          return {
            value: item.value,
            label: relatedOption?.extra?.['select-tagLabel'] ?? item.value,
          };
        });
        props.onChange?.(res, option);
      } else {
        // 单选模式
        const formatOptionArr = Array.isArray(option) ? option : [option];
        const relatedOption = formatOptionArr.find(optionItem => optionItem.value === val.value);
        val.label = relatedOption?.extra?.['select-tagLabel'] ?? val.value;
        props.onChange?.(val, option);
      }
    }
  };

  /**
   * 重置能力：清空value并重新fetch数据
   */
  const reset = useCallback(() => {
    // 清空选中值
    if (props.mode === 'multiple') {
      onChange([], []);
    } else {
      onChange(undefined, []);
    }
    // 清空自动选中的第一项
    asyncSelectControls.clearAutoLoadFirstValue();
    asyncSelectControls.setAutoLoadFirstFlag(false);
    // 清空搜索值
    asyncSelectControls.clearSearchWord();
    // 重新加载第一页数据
    asyncSelectControls.reload();
  }, []);

  /**
   * 刷新能力：重新fetch数据，但不清除已选值
   */
  const refresh = useCallback(() => {
    // 清空自动选中的第一项
    asyncSelectControls.clearAutoLoadFirstValue();
    // 清空搜索值
    asyncSelectControls.clearSearchWord();
    // 重新加载第一页数据
    asyncSelectControls.reload();
  }, []);

  // 支持ref
  useImperativeHandle(ref, () => {
    return {
      data: data,
      reset() {
        reset();
      },
      refresh() {
        refresh();
      },
    };
  });

  // 数据源发生变化时，调用onDataSourceChange
  useEffect(() => {
    const options = data?.list ?? [];
    const mergedOptions = options;
    onDataSourceChange?.({
      page: data?.page ?? 1,
      noMore: data?.noMore ?? false,
      list: mergedOptions,
    });
  }, [data]);

  // reloadKey发生变化时，重新加载数据源并清除已选项
  useUpdateEffect(() => {
    reset();
  }, [reloadKey]);

  const getEmptyDropdownRender = (loading: boolean) => {
    if (!loading) {
      if (props.dropdownRender) {
        return props.dropdownRender(<Empty {...emptyProps} />);
      }
      return <Empty {...emptyProps} />;
    }
    return <div className={cssPrefix`drop-down-loading`} />;
  };

  const customDropdownRender = (menu: React.ReactNode) => {
    const isNotEmpty = Boolean(data?.list?.length);
    if (isNotEmpty || restProps.allowCreate) {
      return (
        <div
          className={isMuiAndDoubleRows ? cssPrefix`drop-down-mui` : cssPrefix`drop-down`}
          data-testid={testId.dropDownId}
        >
          {props.dropdownRender ? props.dropdownRender(menu) : menu}
          {loadingSpin(loadingMore)}
        </div>
      );
    } else {
      return (
        <div className={cssPrefix`drop-down`}>
          <>
            {getEmptyDropdownRender(loading)}
            {loadingSpin(loading)}
          </>
        </div>
      );
    }
  };

  const onFocus = (val: unknown) => {
    //CCopy方法内置的copy方法会重新focus已经active的元素 若超出缓存时间会reload 用下行代码暂时避免
    if (enableCopy && popupVisible) return;
    asyncSelectControls?.clearSearchWord();
    asyncSelectControls?.handleFocusCacheData();
    restProps.onFocus?.(val);
  };

  const onClear = (val: boolean) => {
    asyncSelectControls?.clearSearchWord();
    restProps.onClear?.(val);
  };

  const onVisibleChange = (val: boolean) => {
    setPopupVisible(val);
    restProps.onVisibleChange?.(val);
  };

  const renderFormat = (options: OptionInfo | null, value: string | number | LabeledValue) => {
    if (!restProps.renderFormat) {
      if (!!options) {
        if (restProps.mode === 'multiple') return options?.extra;
        return options.extra?.placeholder || options.extra?.['select-tagLabel'] || options?.children;
      }
      return isObject(value) ? value?.value : value;
    }
    return restProps.renderFormat?.(options, value);
  };

  const renderTag = (props: any, index: number, values: ObjectValueType[]) => {
    if (!restProps.renderTag) {
      return defaultRenderTag(
        selectedOption,
        props,
        cssPrefix,
        index,
        showMaxTagToolTip,
        locale,
        restProps?.maxTagCount,
        prefixCls,
      );
    }
    return restProps.renderTag?.(props, index, values);
  };

  useEffect(() => {
    if (autoLoadFirstValue) {
      if (Array.isArray(autoLoadFirstValue)) {
        const value = autoLoadFirstValue.map(item => {
          return (item as SelectOption)?.value ?? item;
        }) as string[] | number[];
        const autoLoadFirstValueOption = autoLoadFirstValue.map(item => ({
          value: (item as SelectOption)?.value ?? item,
          label: (item as SelectOption)?.label ?? item,
        }));
        onChange(props.labelInValue ? autoLoadFirstValueOption : value, []);
      } else {
        const value = (autoLoadFirstValue as SelectOption)?.value ?? autoLoadFirstValue;
        const autoLoadFirstValueOption = {
          value: (autoLoadFirstValue as SelectOption)?.value ?? autoLoadFirstValue,
          label: (autoLoadFirstValue as SelectOption)?.label ?? autoLoadFirstValue,
        };
        onChange(props.labelInValue ? autoLoadFirstValueOption : value, []);
      }
    }
  }, [autoLoadFirstValue]);

  const SelectCom = (
    <Select
      clearIcon={<IconClose />}
      suffixIcon={<IconDown />}
      removeIcon={<IconClose />}
      {...restProps}
      style={style}
      className={classNames(className, cssRoot)}
      data-cy={testId.selectId}
      data-testid={testId.selectId}
      filterOption={false}
      dropdownMenuStyle={{ maxHeight: dropMenuMaxHeight }}
      onFocus={onFocus}
      onClear={onClear}
      onChange={onChange}
      options={renderOptions(data, cssPrefix, locale, optionMode, enableCopy)}
      dropdownRender={customDropdownRender}
      loading={loading || loadingMore}
      value={state}
      onVisibleChange={onVisibleChange}
      onSearch={asyncSelectControls.onSearch}
      onPopupScroll={asyncSelectControls.popupScrollHandler}
      showSearch={restProps.showSearch === undefined ? enableSearch : restProps.showSearch}
      renderFormat={renderFormat}
      renderTag={renderTag}
    />
  );

  if (!hasOuterWrapper) {
    return SelectCom;
  } else {
    return (
      <div className={classNames(cssPrefix`wrapper`, wrapperClassName)} style={wrapperStyle}>
        {SelectCom}
        {showRefreshBtn && (
          <div className={classNames(cssPrefix`refresh-container`)}>
            {/* class覆盖背景色选择器权重不够 */}
            <Button
              className={cssPrefix`refresh-btn`}
              style={{ backgroundColor: 'var(--color-bg-1)' }}
              onClick={refresh}
            >
              {loading ? (
                <IconLoading className={cssPrefix`loading-icon`} />
              ) : (
                <IconRefresh className={cssPrefix`refresh-icon`} />
              )}
            </Button>
          </div>
        )}
      </div>
    );
  }
});

// CAsyncSelect.ForDrawer = CAsyncSelectForDrawer;

export default CAsyncSelect;
