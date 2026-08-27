import type { ReactElement } from 'react';
import React from 'react';
import { Select } from '@arco-design/web-react';
import classNames from 'classnames';
import CompactWrapper from './components/CompactWrapper';
import type { CCascaderSearchProps } from './interface';
import { useCCascaderSearch } from './hooks';
import SearchComponent, { components } from './components/Component';
import createBuiltInComponent from '../_factory/builtInComponent';
import { useCConfigContext } from '../CConfigProvider';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { merge } from 'lodash-es';

const cssPrefix = classNamePrefixFactory('cascader-search');

const CCascaderSearchComponent = (props: CCascaderSearchProps): ReactElement => {
  const { getCPrefixCls, cComponentConfig } = useCConfigContext();
  const { className, style, arcoSelectProps, labelWidth, prefixAutoWidth, ...restProps } = props;
  const [
    {
      validOptions,
      state,
      searchComponent: { content, commonProps },
    },
    { updateField, updateValue },
  ] = useCCascaderSearch(restProps);
  const cascaderCls = getCPrefixCls('search-cascader');
  return (
    <CompactWrapper
      data-cy={cssPrefix``}
      className={classNames(cascaderCls, className)}
      style={style}
      labelWidth={labelWidth}
      label={
        <Select
          {...merge(
            {},
            arcoSelectProps,
            prefixAutoWidth ?? cComponentConfig?.['CSearch.CCascaderSearch']?.prefixAutoWidth
              ? {
                  triggerProps: {
                    autoAlignPopupMinWidth: false,
                    autoAlignPopupWidth: false,
                    position: 'bl',
                  },
                  style: {
                    width: 'auto',
                    maxWidth: '50%',
                  },
                }
              : {},
          )}
          options={validOptions.map(({ label, fieldName }) => ({ label, value: fieldName }))}
          value={state.fieldName}
          onChange={(value, option) => {
            updateField(value);
            arcoSelectProps?.onChange?.(value, option);
          }}
        />
      }
    >
      <SearchComponent
        content={content}
        commonProps={{
          ...commonProps,
          value: state.value,
          onChange: updateValue,
        }}
      />
    </CompactWrapper>
  );
};

CCascaderSearchComponent.useCCascaderSearch = useCCascaderSearch;
CCascaderSearchComponent.displayName = 'CCascaderSearch';

const CCascaderSearch = createBuiltInComponent(CCascaderSearchComponent, components);

export default CCascaderSearch;
