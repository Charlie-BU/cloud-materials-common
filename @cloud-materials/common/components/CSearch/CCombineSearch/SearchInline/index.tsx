import React, { useState } from 'react';
import type { UseCCombineSearchControl, UseCCombineSearchCustomProps } from '../../interface';
import { combineDataCy, getViewList } from '../utils';
import SearchViewItem from '../SearchView/Item';
import type { SearchTriggerProps } from '../SearchTrigger';
import SearchTrigger from '../SearchTrigger';
import { Space } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../../../CConfigProvider';
import { IconClose, IconSearch } from '@arco-design/iconbox-react-ve-o-design';

type CombineSearchInlineProps = SearchTriggerProps &
  Pick<UseCCombineSearchControl, 'resetParams' | 'updateParams'> &
  Pick<UseCCombineSearchCustomProps, 'searchParamExtraLast' | 'enableEdit' | 'ellipsisProps' | 'listGroup'>;

const CombineSearchInline = (props: CombineSearchInlineProps) => {
  const {
    style,
    className,
    alignType,
    params,
    list,
    current,
    errState,
    trigger,
    loading,
    status,
    fuzzy,
    tempValue,
    placeholder,
    defaultField,
    searchParamExtraLast,
    searchWord,
    enableEdit,
    ellipsisProps,
    listGroup,
    popoverTriggerProps,
    popoverClassName,
    popoverStyle,
    keyboardTip,
    updateParams,
    updateState,
    filterUserInput,
    updateTempValue,
    updateSearchField,
    updateSearchValue,
    updateSearchWord,
    resetParams,
  } = props;
  const { getCPrefixCls } = useCConfigContext();
  const viewList = getViewList(params, list);
  const inlineCls = getCPrefixCls('search-combine-inline');
  const [focused, setFocused] = useState(false);
  const [showClose, setShowClose] = useState(false);
  return (
    <div
      className={classNames(
        inlineCls,
        {
          [getCPrefixCls('search-combine-inline-focused')]: focused,
          [getCPrefixCls('search-combine-inline-err')]: errState,
        },
        className,
      )}
      data-cy={combineDataCy`inline`}
      style={style}
      onMouseEnter={() => setShowClose(!!viewList.length)}
      onMouseLeave={() => setShowClose(false)}
    >
      <Space align="center" wrap size="mini">
        <IconSearch className={`${inlineCls}-search`} />
        {viewList.map(item => (
          <span key={item.fieldName}>
            <SearchViewItem
              enableEdit={enableEdit}
              key={item.fieldName}
              item={item}
              alignType={alignType}
              value={params[item.fieldName]}
              current={current}
              popoverClassName={popoverClassName}
              popoverStyle={popoverStyle}
              popoverTriggerProps={popoverTriggerProps}
              updateParams={(...parmas) => {
                updateParams(...parmas);
                setFocused(false);
              }}
              updateState={updateState}
              updateTempValue={updateTempValue}
            />
          </span>
        ))}
        {searchParamExtraLast}
        <SearchTrigger
          alignType={alignType}
          trigger={trigger}
          loading={loading}
          tempValue={tempValue}
          params={params}
          status={status}
          current={current}
          list={list}
          popoverTriggerProps={popoverTriggerProps}
          placeholder={placeholder}
          defaultField={defaultField}
          fuzzy={fuzzy}
          searchWord={searchWord}
          enableEdit={enableEdit}
          ellipsisProps={ellipsisProps}
          listGroup={listGroup}
          keyboardTip={keyboardTip}
          filterUserInput={filterUserInput}
          updateTempValue={updateTempValue}
          updateState={(...props) => {
            updateState(...props);
            const [status] = props;
            setFocused(status !== 'default');
          }}
          updateSearchField={updateSearchField}
          updateSearchWord={updateSearchWord}
          updateSearchValue={(...props) => {
            updateSearchValue(...props);
            setFocused(false);
            setShowClose(false);
          }}
        />
      </Space>
      <IconClose
        className={classNames({
          [`${inlineCls}-clear`]: true,
          [`${inlineCls}-clear-show`]: showClose,
        })}
        onClick={() => {
          resetParams();
        }}
      />
    </div>
  );
};

export default CombineSearchInline;
