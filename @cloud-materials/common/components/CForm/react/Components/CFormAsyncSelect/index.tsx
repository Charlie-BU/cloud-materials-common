import React, { useCallback, useImperativeHandle } from 'react';
import useCFormAsyncSelect from './hooks/useCFormAsyncSelect';
import { debounce, isUndefined, pick } from 'lodash-es';
import type { CFormAsyncSelectModel, CFormAsyncSelectProps, UseCFormAsyncSelectProps } from './interface';
import type { ButtonProps, SelectProps } from '@arco-design/web-react';
import { Button, Select } from '@arco-design/web-react';
import { IconClose, IconDown, IconRefresh } from '@arco-design/iconbox-react-ve-o-design';
import classNames from 'classnames';
import { useCConfigContext } from '../../../../CConfigProvider';
import { renderOptions } from './viewUtils';
import { LabelAlias } from './const';
import CLoadingV2 from '../../../../CLoadingV2';
import { useThrottleFn } from 'ahooks';
import CEllipsis from '../../../../CEllipsis';

const CFormAsyncSelect = React.forwardRef<CFormAsyncSelectModel, CFormAsyncSelectProps>((props, ref) => {
  const [state, control] = useCFormAsyncSelect(
    pick<CFormAsyncSelectProps, keyof UseCFormAsyncSelectProps>(props, [
      'autoLoad',
      'dataSource',
      'enableRemoteLoadWhenDataSourceControlled',
      'expiredTime',
      'fetchData',
      'fetchInitData',
      'ifAutoLoadFirst',
      'labelInValue',
      'mode',
      'onChange',
      'onDataSourceChange',
      'onError',
      'onFetchDataLoadingChange',
      'value',
    ]),
  );
  const {
    className,
    dropdownMenuStyle,
    filterOption = false,
    loadThrottleWait = 200,
    loading,
    renderFormatType = 'label',
    renderOptions: customRenderOptions,
    searchDebounceWait = 300,
    showRefreshBtn,
    rootMargin = 10,
    wrapperClassName,
    wrapperStyle,
  } = props;

  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('cform-async-select');
  const hasOuterWrapper = !!showRefreshBtn;
  const refreshBtnProps: ButtonProps = typeof showRefreshBtn === 'object' ? showRefreshBtn : {};
  const localLoading = loading ?? !!state.loadingType;

  // flash为true，立马重新fetchData；否则autoLoad为false时通过focus获取
  const handleRefresh = (flash = true) => {
    if (state.enableFetchData) {
      if (flash) {
        control.reload();
      } else {
        control.resetFetchState(true);
      }
    }
  };

  const handleReset = () => {
    !state.valueControlled && control.setValue(undefined);
    !isUndefined(state.value) && props.onChange?.(undefined, []);
    handleRefresh(false);
  };

  const handleRefreshBtnClick: ButtonProps['onClick'] = e => {
    refreshBtnProps.onClick?.(e);
    handleRefresh();
  };

  useImperativeHandle<CFormAsyncSelectModel, CFormAsyncSelectModel>(
    ref,
    () => ({
      data: state.dataSource,
      refresh: handleRefresh,
      reset: handleReset,
      ...control,
    }),
    [state.dataSource],
  );

  const handleChange: SelectProps['onChange'] = (v, option) => {
    let value = v;
    if (props.labelInValue && option) {
      if (Array.isArray(option)) {
        value = option.map((el, index) => ({ value: el.value, label: el.extra?.[LabelAlias] ?? v[index]?.label }));
      } else {
        value = { value: option.value, label: option?.extra?.[LabelAlias] ?? v.label };
      }
    }

    !state.valueControlled && control.setValue(value);
    props.onChange?.(value, option);
  };

  const debounceSearch = useCallback(
    debounce((val: string) => control.setSearchWord(val), searchDebounceWait),
    [],
  );
  const handleSearch: SelectProps['onSearch'] = (val, ...rest) => {
    debounceSearch(val);
    props.onSearch?.(val, ...rest);
  };

  const handleFocus: SelectProps['onFocus'] = e => {
    if (
      state.enableFetchData &&
      (control.getDataSourceExpired() || (isUndefined(state.dataSource) && !state.enableAutoFetchData))
    ) {
      control.reload();
    }
    props.onFocus?.(e);
  };

  const handleVisibleChange: SelectProps['onVisibleChange'] = visible => {
    state.searchWord && control.setSearchWord('');
    props.onVisibleChange?.(visible);
  };

  const { run: throttleLoad } = useThrottleFn(() => control.loadMore(), { wait: loadThrottleWait });

  const handlePopupScroll: SelectProps['onPopupScroll'] = (element: Element) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);
    if (!state.errorType && state.enableFetchData && isUndefined(state.loadingType) && scrollBottom < rootMargin) {
      throttleLoad();
    }
    props.onPopupScroll?.(element);
  };

  const renderFormat: SelectProps['renderFormat'] = (option, value) => {
    let label: React.ReactNode;
    const val = typeof value === 'object' ? value.value : value;
    if (option) {
      label = option.extra?.[LabelAlias] ?? option.children;
    } else {
      label = typeof value === 'object' ? value.label ?? value.value : value;
    }
    if (renderFormatType === 'value') {
      return val;
    }
    if (renderFormatType === 'labelWithValue') {
      return (
        <CEllipsis
          content={
            <>
              <span>{label ?? ''}</span>
              <span className={cssPrefix`format-value`}>{` (${val ?? ''})`}</span>
            </>
          }
        />
      );
    }
    return label;
  };

  const dropdownRender: SelectProps['dropdownRender'] = menu => {
    if (state.loadingType || state.errorType) {
      const dropdownNode = (
        <>
          {!!state.dataSource?.list?.length && menu}
          <CLoadingV2
            type="inline"
            loading={!!state.loadingType}
            className={classNames({
              [cssPrefix`menu`]: true,
              [cssPrefix`menu-loading-empty`]: state.loadingType && !state.dataSource?.list.length,
              [cssPrefix`menu-loading`]: state.loadingType && !!state.dataSource?.list.length,
            })}
            hasError={!!state.errorType}
            onReload={() => {
              if (state.errorType === 'init') {
                control.reload();
              } else if (state.errorType === 'loadmore') {
                control.loadMore();
              }
            }}
          />
        </>
      );
      return props.dropdownRender?.(dropdownNode, menu, state.loadingType, state.errorType) ?? dropdownNode;
    }
    return props.dropdownRender?.(undefined, menu) ?? menu;
  };

  // const renderTag: SelectProps['renderTag'] = props => {
  //   return (
  //     <Tag closable={props.closable} onClose={props.onClose}>
  //       <CEllipsis content={props.label ?? props.value} />
  //     </Tag>
  //   );
  // };

  const selectDom = (
    <Select
      allowClear
      clearIcon={<IconClose />}
      suffixIcon={<IconDown />}
      removeIcon={<IconClose />}
      {...props}
      className={classNames(className, cssPrefix``)}
      dropdownMenuStyle={{ maxHeight: 312, ...dropdownMenuStyle }}
      dropdownRender={dropdownRender}
      filterOption={state.dataSourceControlled ? filterOption : false}
      loading={localLoading}
      onChange={handleChange}
      onFocus={handleFocus}
      onPopupScroll={handlePopupScroll}
      onSearch={handleSearch}
      onVisibleChange={handleVisibleChange}
      options={
        customRenderOptions
          ? customRenderOptions(state.dataSource?.list)
          : renderOptions({
              locale,
              dataSource: state.dataSource?.list,
              optionMode: props.optionMode,
              cssPrefix: cssPrefix``,
              getPopupContainer: props.getPopupContainer,
            })
      }
      renderFormat={props.renderFormat ?? renderFormat}
      value={state.value}
      // renderTag={props.renderTag ?? renderTag}
    />
  );

  if (!hasOuterWrapper) return selectDom;

  return (
    <div style={wrapperStyle} className={classNames(wrapperClassName, cssPrefix`wrapper`)}>
      {selectDom}
      {showRefreshBtn && (
        <Button
          iconOnly
          icon={<IconRefresh />}
          className={cssPrefix`wrapper-btn`}
          size={props.size}
          {...refreshBtnProps}
          loading={localLoading ?? refreshBtnProps.loading}
          onClick={handleRefreshBtnClick}
        />
      )}
    </div>
  );
});

export default CFormAsyncSelect;
