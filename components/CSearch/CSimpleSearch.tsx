import type { ReactElement } from 'react';
import React from 'react';
import createBuiltInComponent from '../_factory/builtInComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CompactWrapper from './components/CompactWrapper';
import SearchComponent, { components } from './components/Component';
import { useDebounceHandler } from './hooks/useDebounceHandler';
import type { CSimpleSearchProps } from './interface';
import { dropUndefined } from './utils';
import { isString, merge } from 'lodash-es';
import { useFilterUserInput } from './hooks/useFilterUserInput';
import type { AutoCompleteProps, InputProps, SelectProps } from '@arco-design/web-react';
import CEllipsis from '../CEllipsis';

const cssPrefix = classNamePrefixFactory('simple-search');

const CSimpleSearchComponent = (props: CSimpleSearchProps): ReactElement => {
  const {
    wrapperClassName,
    wrapperStyle,
    label,
    labelWidth,
    labelBordered,
    onChange,
    content,
    debounceOptions,
    normalize,
    ...componentProps
  } = props;
  const { debounceHandleChange } = useDebounceHandler({ onChange, debounceOptions });
  const { filterUserInput } = useFilterUserInput({
    content,
    normalize,
  });
  const extraProps: Pick<InputProps, 'normalize'> &
    Pick<AutoCompleteProps, 'inputProps'> &
    Pick<SelectProps, 'renderFormat'> = {
    normalize: content.component === 'Input' ? filterUserInput : undefined,
    inputProps:
      content.component === 'AutoComplete'
        ? {
            normalize: filterUserInput,
          }
        : undefined,
    renderFormat:
      content.component === 'Select'
        ? option => {
            if (option?.children && isString(option?.children)) {
              return <CEllipsis content={option.children} />;
            }
            return option?.children;
          }
        : undefined,
  };

  return (
    <CompactWrapper
      data-cy={cssPrefix``}
      className={wrapperClassName}
      style={wrapperStyle}
      label={label}
      labelWidth={labelWidth}
      labelBordered={labelBordered}
    >
      <SearchComponent
        content={
          React.isValidElement(content)
            ? content
            : {
                component: content.component,
                componentProps: dropUndefined(
                  merge({}, dropUndefined(extraProps), {
                    ...(content as { componentProps?: Record<string, unknown> }).componentProps,
                  }),
                ),
              }
        }
        commonProps={dropUndefined({
          ...componentProps,
          onChange: debounceHandleChange,
        })}
      />
    </CompactWrapper>
  );
};

CSimpleSearchComponent.displayName = 'CSimpleSearch';

const CSimpleSearch = createBuiltInComponent(CSimpleSearchComponent, components);

export default CSimpleSearch;
