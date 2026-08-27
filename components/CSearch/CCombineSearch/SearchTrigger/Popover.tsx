import { Button, Select, Space } from '@arco-design/web-react';
import React from 'react';
import { useCConfigContext } from '../../../CConfigProvider';
import type {
  CCombineSearchSelect,
  UseCCombineSearchControl,
  UseCCombineSearchCustomProps,
  UseCCombineSearchValue,
} from '../../interface';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';
import PopoverKeyBoardTip from './PopoverKeyBoardTip';
import { cloneDeep, get, uniq } from 'lodash-es';
import { valueToArray } from '../utils';
import { getFilterOptions } from './utils';
import CEllipsis from '../../../CEllipsis';

export type PopoverContentProps = {
  popSelectRef?: React.MutableRefObject<SelectHandle | null>;
} & Pick<
  UseCCombineSearchValue,
  'list' | 'status' | 'current' | 'params' | 'tempValue' | 'filterUserInput' | 'searchWord'
> &
  Pick<
    UseCCombineSearchCustomProps,
    'fuzzy' | 'fuzzyConfig' | 'enableEdit' | 'ellipsisProps' | 'listGroup' | 'keyboardTip'
  > &
  Pick<
    UseCCombineSearchControl,
    'updateSearchField' | 'updateTempValue' | 'updateSearchValue' | 'updateState' | 'updateSearchWord'
  >;

const PopoverContent = (props: PopoverContentProps) => {
  const {
    list,
    status,
    current,
    params,
    tempValue,
    fuzzy,
    fuzzyConfig,
    searchWord,
    popSelectRef,
    enableEdit,
    ellipsisProps,
    listGroup,
    keyboardTip = true,
    filterUserInput,
    updateSearchField,
    updateTempValue,
    updateSearchValue,
    updateState,
    updateSearchWord,
  } = props;
  const { locale, getCPrefixCls } = useCConfigContext();

  if (status === 'default') {
    return null;
  }

  const popoverCls = getCPrefixCls('search-combine-popover');
  const selectCls = getCPrefixCls('search-combine-select');

  const hideFooter =
    current?.type === 'input' ||
    (current?.type === 'select' && current.mode !== 'multiple') ||
    (current?.type === 'custom' && current.hideFooter);

  const onReset = () => {
    current && updateTempValue(get(params, current.fieldName));
  };

  const onSave = (value = tempValue) => {
    updateSearchValue(value, current?.fieldName);
    updateState('default', null);
    updateTempValue(undefined);
  };

  const onCancel = () => {
    updateState('default', null);
    updateTempValue(undefined);
  };

  // 选中筛选项后，popover中展示的候选项
  const renderContent = () => {
    if (!current || current.type === 'input') {
      return null;
    }

    if (current.type === 'select') {
      const options = getFilterOptions({
        fuzzyConfig: { ...fuzzyConfig, ...current.fuzzyConfig },
        filterUserInput,
        searchWord,
        item: current,
        values: params,
      });
      if (current.mode === 'multiple') {
        return (
          <MultipleSelect
            searchWord={searchWord}
            filterOption={() => true}
            options={options.map(el => ({
              ...el,
              label: ellipsisProps?.enable ? (
                <CEllipsis content={el.label ?? ''} {...ellipsisProps.config} />
              ) : (
                el.label
              ),
            }))}
            value={tempValue}
            onChange={updateTempValue}
            popSelectRef={popSelectRef}
          />
        );
      }
      return (
        <SingleSelect
          dropdownMenuStyle={{ maxHeight: '400px' }}
          inputValue={searchWord}
          filterOption={() => true}
          // defaultValue={params[current.fieldName]}
          onChange={v => {
            updateSearchValue(
              current.multiValues ? uniq([...valueToArray(enableEdit ? tempValue : params[current.fieldName]), v]) : v,
              current.fieldName,
            );
          }}
          popSelectRef={popSelectRef}
        >
          {options.map(option => (
            <Select.Option value={option.value} key={option.value}>
              {ellipsisProps?.enable ? (
                <CEllipsis content={option.label ?? ''} {...ellipsisProps.config} />
              ) : (
                option.label
              )}
            </Select.Option>
          ))}
        </SingleSelect>
      );
    }

    return current.renderContent({
      item: current,
      value: tempValue ?? (enableEdit ? params[current.fieldName] : undefined),
      onChange: updateTempValue,
      onReset,
      onSave,
      onCancel,
    });
  };

  // 模糊匹配的popover内容
  const renderFuzzyContent = () => {
    /** tempValue也会用来存用户选择的值，所以不可以简单的认为是输入框内的内容 */
    let formattedUserInput: undefined | string = undefined;
    try {
      formattedUserInput = filterUserInput(tempValue);
    } catch (e) {}
    if (typeof formattedUserInput !== 'string') {
      return null;
    }
    // 支持输入搜索以「,」进行分割的长字符串
    let renderList = list.filter(item => item.type === 'select' && item.options.length) as CCombineSearchSelect[];
    if (fuzzyConfig?.fuzzyOptionsFilter) {
      renderList = fuzzyConfig.fuzzyOptionsFilter(formattedUserInput, cloneDeep(renderList));
    } else {
      renderList = renderList
        .map(item => {
          return {
            ...item,
            options: getFilterOptions({
              fuzzyConfig,
              filterUserInput,
              searchWord: tempValue,
              item,
              values: params,
            }),
          };
        })
        .filter(el => !!el.options.length);
    }

    if (fuzzyConfig?.displayNum) {
      renderList = renderList.map(el => ({ ...el, options: el.options.slice(0, fuzzyConfig.displayNum) }));
    }

    return (
      <SingleSelect
        popupVisible={true}
        triggerElement={<div className={selectCls} />}
        getPopupContainer={node => node}
        triggerProps={{
          popupStyle: { boxShadow: 'none', border: 'none' },
          style: { position: 'static' },
        }}
        popSelectRef={popSelectRef}
        dropdownMenuStyle={{ maxHeight: '440px' }}
        onChange={value => {
          const item = renderList.find(i => i.options.some(e => e.value === value)) as CCombineSearchSelect;
          if (item) {
            updateSearchValue(
              item.mode === 'multiple' || item.multiValues
                ? uniq([...valueToArray(params[item.fieldName]), value])
                : value,
              String(item.fieldName || ''),
            );
          }
        }}
        inputValue={formattedUserInput}
        filterOption={() => true}
        showSearch
      >
        {renderList.map(item => {
          return (
            <Select.OptGroup
              label={item.label}
              key={item.fieldName}
              onClick={() => {
                if (fuzzyConfig?.enableChangeSearchItem) {
                  updateState('value', item);
                  setTimeout(() => {
                    updateSearchWord(tempValue);
                  }, 0);
                }
              }}
              // 这里传入 className，会覆盖原有的className
              style={fuzzyConfig?.enableChangeSearchItem ? { cursor: 'pointer' } : undefined}
            >
              {item.options.map(option => (
                <Select.Option value={option.value} key={option.value}>
                  {ellipsisProps?.enable ? (
                    <CEllipsis content={option.label ?? ''} {...ellipsisProps.config} />
                  ) : (
                    option.label
                  )}
                </Select.Option>
              ))}
            </Select.OptGroup>
          );
        })}
      </SingleSelect>
    );
  };

  // 选择搜索项
  // 状态为field，或者为value且处于模糊搜索未搜索状态，展示
  // TODO: 判断popover content条件优化
  if (status === 'field' || (fuzzy && !tempValue && !current?.fieldName)) {
    return (
      <>
        <div className={popoverCls}>
          {listGroup?.length ? (
            <SingleSelect
              dropdownMenuStyle={{ maxHeight: '400px' }}
              value={current?.fieldName}
              onChange={val => {
                updateTempValue(undefined);
                updateSearchField(val);
              }}
              popSelectRef={popSelectRef}
            >
              {listGroup.map(el => {
                return (
                  <Select.OptGroup label={el.label} key={el.label}>
                    {el.fieldNames
                      .map(fieldName => list.find(listItem => listItem.fieldName === fieldName))
                      .filter(i => !!i && !i.hidden)
                      .map(item => (
                        <Select.Option key={item!.fieldName} value={item!.fieldName} disabled={item?.disabled}>
                          {item!.label}
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                );
              })}
            </SingleSelect>
          ) : (
            <SingleSelect
              dropdownMenuStyle={{ maxHeight: '400px' }}
              value={current?.fieldName}
              options={list
                .filter(item => !item.hidden)
                .map(item => ({
                  label: item.label,
                  value: item.fieldName,
                  disabled: item.disabled,
                }))}
              onChange={val => {
                updateTempValue(undefined);
                updateSearchField(val);
              }}
              popSelectRef={popSelectRef}
            />
          )}
        </div>
        {keyboardTip && <PopoverKeyBoardTip />}
      </>
    );
  }

  const content = renderContent();
  return fuzzy && !current?.fieldName ? (
    <>
      <div className={popoverCls}>{renderFuzzyContent()}</div>
      {keyboardTip && <PopoverKeyBoardTip />}
    </>
  ) : content ? (
    <>
      <div className={popoverCls}>
        {content}
        {current?.type === 'select' && keyboardTip && (
          <PopoverKeyBoardTip isExtra={current?.type === 'select' && current.mode === 'multiple'} />
        )}
        {!hideFooter && (
          <Space className={`${popoverCls}-footer`} size={12}>
            <Button
              size="mini"
              onClick={() => {
                onReset();
              }}
            >
              {locale.CSearch.reset}
            </Button>
            <Button
              size="mini"
              type="primary"
              onClick={() => {
                onSave();
              }}
            >
              {locale.CSearch.ok}
            </Button>
          </Space>
        )}
      </div>
    </>
  ) : null;
};

export default PopoverContent;
