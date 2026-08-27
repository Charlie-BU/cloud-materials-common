import type { ReactElement } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { CSearchProps } from '../interface';
import { useCustom } from './useCustom';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import SearchProvider from './SearchProvider';

const cssPrefix = classNamePrefixFactory('search');

const CSearch = (props: CSearchProps): ReactElement => {
  const { className, style, position, reverseNode, ...restProps } = props;
  const { CSearchDisplay, CSearchCollapse } = useCustom(restProps);
  const { getCPrefixCls } = useCConfigContext();
  const searchCls = getCPrefixCls('search');

  return (
    <SearchProvider>
      <div className={searchCls} data-cy={cssPrefix``}>
        <div className={classNames(`${searchCls}-tools`, className)} style={style}>
          {position === 'right' ? (
            <>
              {reverseNode}
              {CSearchDisplay}
            </>
          ) : (
            <>
              {CSearchDisplay}
              {reverseNode}
            </>
          )}
        </div>
        {CSearchCollapse}
      </div>
    </SearchProvider>
  );
};

CSearch.Provider = SearchProvider;
CSearch.useCustom = useCustom;
CSearch.displayName = 'CSearch';

export default CSearch;
