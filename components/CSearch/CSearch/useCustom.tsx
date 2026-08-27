import React from 'react';
import type { UseCSearchCustomProps } from '../interface';
import { useCSearch } from '../hooks';
import SearchDisplay from './SearchDisplay';
import SearchCollapse from './SearchCollapse';

export const useCustom = (props: UseCSearchCustomProps) => {
  const { displayArcoSpaceProps, collapsedClassName, labelWith, showReset, showAdvanceReset, colspan, ...restProps } =
    props;
  const [
    { manual, displayList, advanceList, advanceVisible, activeAdvanceCount, params },
    { toggleAdvanceVisible, search, updateParams, resetParams, resetAdvanceParams },
  ] = useCSearch(restProps);

  return {
    CSearchDisplay: (
      <SearchDisplay
        displayArcoSpaceProps={displayArcoSpaceProps}
        showReset={showReset}
        manual={manual}
        displayList={displayList}
        advanceList={advanceList}
        advanceVisible={advanceVisible}
        activeAdvanceCount={activeAdvanceCount}
        params={params}
        toggleAdvanceVisible={toggleAdvanceVisible}
        search={search}
        updateParams={updateParams}
        resetParams={resetParams}
      />
    ),
    CSearchCollapse: (
      <SearchCollapse
        collapsedClassName={collapsedClassName}
        labelWith={labelWith}
        showAdvanceReset={showAdvanceReset}
        colspan={colspan}
        advanceList={advanceList}
        advanceVisible={advanceVisible}
        params={params}
        updateParams={updateParams}
        resetAdvanceParams={resetAdvanceParams}
      />
    ),
  };
};
