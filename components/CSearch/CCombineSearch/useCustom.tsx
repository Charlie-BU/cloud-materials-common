import React from 'react';
import type { LoadingType, UseCCombineSearchCustomProps } from '../interface';
import { useCCombineSearch } from '../hooks';
import SearchView from './SearchView';
import SearchTrigger from './SearchTrigger';
import CombineSearchInline from './SearchInline';

export const useCustom = (props: UseCCombineSearchCustomProps) => {
  const {
    triggerClassName,
    triggerStyle,
    viewClassName,
    viewStyle,
    popoverClassName,
    popoverStyle,
    searchParamExtraLast,
    searchParamExtraStart,
    trigger = 'click',
    alignType = 'bottom',
    loading = false,
    enableEdit = true,
    listGroup,
    popoverTriggerProps,
    keyboardTip,
    ...restProps
  } = props;
  const [
    { list, tempValue, params, status, current, placeholder, defaultField, searchWord, errState, filterUserInput },
    { updateParams, updateState, updateTempValue, resetParams, updateSearchField, updateSearchValue, updateSearchWord },
  ] = useCCombineSearch({ ...restProps, enableEdit });
  const loadingType: LoadingType = loading === false ? 'none' : loading === true ? 'block' : loading;

  if (alignType === 'inline') {
    return {
      CCombineSearchInline: (
        <CombineSearchInline
          className={triggerClassName}
          style={triggerStyle}
          popoverClassName={popoverClassName}
          popoverStyle={popoverStyle}
          alignType={alignType}
          trigger={trigger}
          popoverTriggerProps={popoverTriggerProps}
          loading={loadingType}
          tempValue={tempValue}
          params={params}
          status={status}
          current={current}
          list={list}
          errState={errState}
          placeholder={placeholder}
          defaultField={defaultField}
          fuzzy={restProps.fuzzy}
          searchParamExtraLast={searchParamExtraLast}
          searchWord={searchWord}
          enableEdit={enableEdit}
          listGroup={listGroup}
          ellipsisProps={restProps.ellipsisProps}
          keyboardTip={keyboardTip}
          updateSearchWord={updateSearchWord}
          filterUserInput={filterUserInput}
          updateTempValue={updateTempValue}
          updateState={updateState}
          updateParams={updateParams}
          resetParams={resetParams}
          updateSearchField={updateSearchField}
          updateSearchValue={updateSearchValue}
        />
      ),
    };
  }

  return {
    CCombineSearchTrigger: (
      <SearchTrigger
        trigger={trigger}
        loading={loadingType}
        className={triggerClassName}
        style={triggerStyle}
        popoverClassName={popoverClassName}
        popoverStyle={popoverStyle}
        tempValue={tempValue}
        params={params}
        status={status}
        current={current}
        list={list}
        listGroup={listGroup}
        errState={errState}
        placeholder={placeholder}
        defaultField={defaultField}
        fuzzy={restProps.fuzzy}
        fuzzyConfig={restProps.fuzzyConfig}
        searchWord={searchWord}
        enableEdit={enableEdit}
        keyboardTip={keyboardTip}
        popoverTriggerProps={popoverTriggerProps}
        ellipsisProps={restProps.ellipsisProps}
        filterUserInput={filterUserInput}
        updateSearchWord={updateSearchWord}
        updateTempValue={updateTempValue}
        updateState={updateState}
        updateSearchField={updateSearchField}
        updateSearchValue={updateSearchValue}
      />
    ),
    CCombineSearchView: (
      <SearchView
        className={viewClassName}
        style={viewStyle}
        current={current}
        list={list}
        params={params}
        enableEdit={enableEdit}
        updateParams={updateParams}
        updateState={updateState}
        updateTempValue={updateTempValue}
        resetParams={resetParams}
        searchParamExtraLast={searchParamExtraLast}
        searchParamExtraStart={searchParamExtraStart}
      />
    ),
  };
};
