import React from 'react';
import { Grid, Button } from '@arco-design/web-react';
import { DEFAULT_COLSPAN, DEFAULT_LABEL_WIDTH } from '../utils';
import classNames from 'classnames';
import SearchItem from './SearchItem';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import type { UseCSearchControl, UseCSearchCustomProps, UseCSearchValue } from '../interface';

type SearchCollapseProps = Pick<UseCSearchValue, 'advanceList' | 'advanceVisible' | 'params'> &
  Pick<UseCSearchControl, 'updateParams' | 'resetAdvanceParams'> &
  Pick<UseCSearchCustomProps, 'collapsedClassName' | 'labelWith' | 'showAdvanceReset' | 'colspan'>;

const cssPrefix = classNamePrefixFactory('search-view');

const SearchCollapse = (props: SearchCollapseProps) => {
  const {
    collapsedClassName,
    labelWith = DEFAULT_LABEL_WIDTH,
    showAdvanceReset,
    colspan: defaultColspan,
    advanceList,
    advanceVisible,
    params,
    updateParams,
    resetAdvanceParams,
  } = props;
  const { locale, getCPrefixCls } = useCConfigContext();
  const searchCls = getCPrefixCls('search');

  const colspan = { ...DEFAULT_COLSPAN, ...defaultColspan };

  return advanceVisible && advanceList.length > 0 ? (
    <div className={classNames(`${searchCls}-collapse`, collapsedClassName)} data-cy={cssPrefix`collapse`}>
      <Grid.Row gutter={[12, 12]}>
        {advanceList.map(({ colspan: itemColspan, labelWidth: itemLabelWidth, content, ...rest }, index) => {
          return (
            // @ts-ignore
            <Grid.Col key={rest.fieldName ?? index} span={itemColspan ?? colspan[content?.component]}>
              <SearchItem
                {...rest}
                content={content}
                labelWidth={itemLabelWidth ?? labelWith}
                params={params}
                updateParams={updateParams}
              />
            </Grid.Col>
          );
        })}
        {showAdvanceReset && (
          <Grid.Col span={4}>
            <Button type="outline" onClick={resetAdvanceParams}>
              {locale.CSearch.reset}
            </Button>
          </Grid.Col>
        )}
      </Grid.Row>
    </div>
  ) : null;
};

export default SearchCollapse;
