import React from 'react';
import { Space, Button, Badge } from '@arco-design/web-react';
import { IconFilter } from '@arco-design/iconbox-react-ve-o-design';
import SearchItem from './SearchItem';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';
import { isObject } from 'lodash-es';

type SearchDisplayProps = Pick<
  UseCSearchValue,
  'activeAdvanceCount' | 'advanceList' | 'advanceVisible' | 'displayList' | 'manual' | 'params'
> &
  Pick<UseCSearchControl, 'resetParams' | 'search' | 'toggleAdvanceVisible' | 'updateParams'> &
  Pick<UseCSearchCustomProps, 'displayArcoSpaceProps' | 'showReset'>;

const cssPrefix = classNamePrefixFactory('search-view');

const SearchDisplay = (props: SearchDisplayProps) => {
  const {
    displayArcoSpaceProps,
    showReset,
    manual,
    displayList,
    advanceList,
    advanceVisible,
    activeAdvanceCount,
    params,
    toggleAdvanceVisible,
    search,
    updateParams,
    resetParams,
  } = props;
  const { locale, getCPrefixCls } = useCConfigContext();
  const searchCls = getCPrefixCls('search');

  return (
    <Space size={12} align="center" {...displayArcoSpaceProps} data-cy={cssPrefix`display`}>
      {displayList.map((item, index) => (
        <SearchItem {...item} key={item.fieldName ?? index} params={params} updateParams={updateParams} />
      ))}
      {advanceList.length > 0 && (
        <Button type="outline" className={`${searchCls}-advance-button`} onClick={toggleAdvanceVisible}>
          <IconFilter />
          <span>{locale.CSearch.advanceFilter}</span>
          {!advanceVisible && <Badge dotClassName={`${searchCls}-advance-dot`} count={activeAdvanceCount} />}
        </Button>
      )}
      {Boolean(manual) && (
        <Button
          type="primary"
          {...(isObject(manual) ? manual : {})}
          onClick={e => {
            search(true);
            isObject(manual) && manual.onClick?.(e);
          }}
        >
          {locale.CSearch.search}
        </Button>
      )}
      {showReset && (
        <Button
          type="outline"
          {...(isObject(showReset) ? showReset : {})}
          onClick={e => {
            resetParams();
            isObject(showReset) && showReset.onClick?.(e);
          }}
        >
          {locale.CSearch.reset}
        </Button>
      )}
    </Space>
  );
};

export default SearchDisplay;
