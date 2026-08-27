import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import type {
  CCombineSearchProps,
  PropsWithBase,
  UseCCombineSearchControl,
  UseCCombineSearchValue,
} from '../../interface';
import classNames from 'classnames';
import { useCConfigContext } from '../../../CConfigProvider';
import SearchViewItem from './Item';
import { IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { getViewList } from '../utils';
import { dropUndefined } from '../../utils';

export type SearchViewProps = PropsWithBase &
  Pick<UseCCombineSearchValue, 'current' | 'list' | 'params'> &
  Pick<UseCCombineSearchControl, 'updateParams' | 'updateState' | 'resetParams' | 'updateTempValue'> &
  Pick<
    CCombineSearchProps,
    | 'searchParamExtraLast'
    | 'searchParamExtraStart'
    | 'enableEdit'
    | 'popoverClassName'
    | 'popoverStyle'
    | 'popoverTriggerProps'
  >;

const cssPrefix = classNamePrefixFactory('combine-search-view');

const SearchView = (props: SearchViewProps) => {
  const {
    className,
    style,
    current,
    list,
    params,
    enableEdit,
    popoverClassName,
    popoverStyle,
    popoverTriggerProps,
    updateParams,
    updateState,
    resetParams,
    updateTempValue,
    searchParamExtraLast,
    searchParamExtraStart,
  } = props;
  const { locale, getCPrefixCls } = useCConfigContext();
  const viewCls = getCPrefixCls('search-combine-view');
  const viewList = getViewList(dropUndefined(params), list);

  if (!viewList.length) {
    return null;
  }

  return (
    <Space className={classNames(viewCls, className)} wrap size="mini" style={style} data-cy={cssPrefix``}>
      {searchParamExtraStart && <span className={`${viewCls}-extra`}>{searchParamExtraStart}</span>}
      {viewList.map(item => (
        <SearchViewItem
          key={item.fieldName}
          item={item}
          value={params[item.fieldName]}
          current={current}
          enableEdit={enableEdit}
          popoverClassName={popoverClassName}
          popoverStyle={popoverStyle}
          popoverTriggerProps={popoverTriggerProps}
          updateParams={updateParams}
          updateState={updateState}
          updateTempValue={updateTempValue}
        />
      ))}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Divider type="vertical" className={`${viewCls}-divider`} />
        <span className={`${viewCls}-clear`} onClick={resetParams}>
          <IconDelete />
          {locale.CSearch.clear}
        </span>
        {searchParamExtraLast && <span className={`${viewCls}-extra`}>{searchParamExtraLast}</span>}
      </div>
    </Space>
  );
};

export default SearchView;
