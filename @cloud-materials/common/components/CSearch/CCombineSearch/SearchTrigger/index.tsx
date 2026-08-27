import React, { useEffect, useRef } from 'react';
import type { Key, KeyboardEventHandler, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Popover, Spin } from '@arco-design/web-react';
import type {
  CCombineSearchSelect,
  LoadingType,
  PropsWithBase,
  UseCCombineSearchControl,
  UseCCombineSearchCustomProps,
  UseCCombineSearchValue,
} from '../../interface';
import { useCConfigContext } from '../../../CConfigProvider';
import PopoverContent from './Popover';
import Content from './Content';
import { IconLoading, IconSearch } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { isArray, isString, uniq, xor } from 'lodash-es';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';
import { valueToArray } from '../utils';
import CLoadingV2 from '../../../CLoadingV2';

export type SearchTriggerProps = {
  loading: LoadingType;
} & PropsWithBase &
  Pick<
    UseCCombineSearchCustomProps,
    | 'alignType'
    | 'fuzzy'
    | 'fuzzyConfig'
    | 'enableEdit'
    | 'ellipsisProps'
    | 'trigger'
    | 'popoverClassName'
    | 'popoverStyle'
    | 'listGroup'
    | 'popoverTriggerProps'
    | 'keyboardTip'
  > &
  Pick<
    UseCCombineSearchValue,
    | 'current'
    | 'status'
    | 'list'
    | 'tempValue'
    | 'params'
    | 'placeholder'
    | 'defaultField'
    | 'filterUserInput'
    | 'searchWord'
    | 'errState'
  > &
  Pick<
    UseCCombineSearchControl,
    'updateTempValue' | 'updateState' | 'updateSearchField' | 'updateSearchValue' | 'updateSearchWord'
  >;

const cssPrefix = classNamePrefixFactory('combine-search-trigger');

const SearchTrigger = (props: SearchTriggerProps) => {
  const {
    alignType,
    trigger,
    className,
    style,
    popoverClassName,
    popoverStyle,
    params,
    current,
    status,
    list,
    tempValue,
    placeholder,
    defaultField,
    fuzzy,
    loading,
    fuzzyConfig,
    searchWord,
    errState,
    enableEdit,
    ellipsisProps,
    listGroup,
    keyboardTip,
    popoverTriggerProps,
    filterUserInput,
    updateTempValue,
    updateState,
    updateSearchField,
    updateSearchValue,
    updateSearchWord,
  } = props;
  const alignTypeisInline = alignType === 'inline';
  const { getCPrefixCls } = useCConfigContext();
  const triggerCls = getCPrefixCls('search-combine-trigger');
  const focused = status !== 'default';
  const popSelectRef = useRef<SelectHandle>(null);

  const changeField: MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    updateState('field');
  };

  const keyBoardEventHandle: KeyboardEventHandler = e => {
    let enableSelectEvent = true;

    const keyHandler: Record<string, () => void> = {
      // 按下Escape
      Escape: () => {
        updateState('field', null);
        updateTempValue(undefined);
        if (status === 'field') {
          updateState('default', null);
        }
      },
      // 按下Enter
      Enter: () => {
        // e.key 无法区分是否是中文输入法输入的Enter，当处于composing中按enter时，keyCode为229
        if (e.keyCode !== 13) {
          return;
        }
        // 同时按下shift和enter键，触发多选的保存
        const shiftEnter =
          current &&
          ((current.type === 'select' && current.mode === 'multiple') ||
            (current.type === 'custom' && !current.hideFooter));
        if (e.shiftKey && shiftEnter) {
          updateSearchValue(isArray(tempValue) && !tempValue.length ? undefined : tempValue, current?.fieldName);
          updateState('default', null);
          updateTempValue(undefined);
          enableSelectEvent = false;
          return;
        }
        // 仅按下enter键
        // 模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，但搜索项无匹配时，将搜索词作为搜索条件
        // 非模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，不关注是否有有处于active的选项，将搜索词作为搜索条件
        if (!current && defaultField && isString(tempValue) && !!tempValue.trim()) {
          let defaultFieldName: Key | undefined = undefined;
          if (fuzzy) {
            if (!popSelectRef.current?.activeOptionValue) {
              defaultFieldName = defaultField.fieldName;
              const candidate = popSelectRef.current?.getOptionInfoList();
              if (defaultField.type === 'auto' && candidate?.length) {
                defaultFieldName = (list.filter(el => el.type === 'select') as CCombineSearchSelect[]).find(el => {
                  return el.options.some(item => item.value === candidate[0].value);
                })?.fieldName;
              }
            }
          } else {
            defaultFieldName = defaultField.fieldName;
          }
          if (defaultFieldName) {
            const defaultItem = list.find(el => el.fieldName === defaultFieldName);
            const _value: string[] = valueToArray(params?.[defaultFieldName]);
            const multValue = xor([..._value, ...tempValue.trim().split(',').filter(Boolean)]);
            updateSearchValue(
              defaultItem?.type === 'select' && (defaultItem.mode === 'multiple' || defaultItem.multiValues)
                ? multValue
                : tempValue,
              defaultFieldName,
            );
            enableSelectEvent = false;
          }
        }
        // select筛选时，allowCreate时，搜索未匹配到搜索项，则用搜索词作为搜索条件
        if (
          current &&
          current.type === 'select' &&
          current.allowCreate &&
          !popSelectRef.current?.activeOptionValue &&
          isString(searchWord) &&
          !!searchWord.trim()
        ) {
          // enableEdit 可编辑时，使用tempValue。否则使用已选择的值，因为tempValue为undefined
          updateSearchValue(
            current.mode === 'multiple' || current.multiValues
              ? uniq([
                  ...valueToArray(enableEdit ? tempValue : params?.[current.fieldName]),
                  ...(searchWord.trim().split(',').filter(Boolean) ?? []),
                ])
              : searchWord.trim(),
            current.fieldName,
          );
        }
        // inputTag需要两次回车，因此没在这里处理，而是在组件上处理
        // inputTag onPressEnter 阻止事件冒泡
        if (current?.type === 'input') {
          updateSearchValue(tempValue);
          enableSelectEvent = false;
        }
      },
      // 按下Backspace
      Backspace: () => {
        // InputTag组件阻止了KeyboardEvent Backspace事件的冒泡。
        // - 因此select类型搜索和input的tag类型搜索的事件需要在ContentSelect上进行处理
        // input类型的搜索在这里进行处理
        if (current?.type === 'input' && !tempValue) {
          updateState('field', null);
          updateTempValue(undefined);
        }
      },
      // 按下 Tab，触发 active 下一个 option
      Tab: () => {
        e.preventDefault();
        popSelectRef.current?.hotkeyHandler(new KeyboardEvent('keydown', { keyCode: 40 }));
      },
    };

    keyHandler[e.key]?.();
    enableSelectEvent && popSelectRef.current?.hotkeyHandler(e as unknown as KeyboardEvent);
  };

  useEffect(() => {
    updateSearchWord(undefined);
  }, [status, current?.fieldName]);

  return (
    <Spin loading={loading === 'block'} block>
      <Popover
        style={{ ...popoverStyle, ...(current?.type === 'custom' ? current.popoverStyle : {}) }}
        trigger={trigger}
        triggerProps={{
          position: 'bl',
          showArrow: false,
          clickToClose: false,
          popupStyle: { padding: 0 },
          popupAlign: { bottom: 6 },
          autoFitPosition: false,
          ...popoverTriggerProps,
          onClickOutside:
            trigger === 'hover' || (isArray(trigger) && trigger.includes('hover'))
              ? () => {
                  updateState('default', null);
                  popoverTriggerProps?.onClickOutside?.();
                }
              : popoverTriggerProps?.onClickOutside,
        }}
        popupVisible={focused}
        onVisibleChange={val => {
          updateState(val ? (current ? 'value' : 'field') : 'default', null);
          updateSearchWord(undefined);
          updateTempValue(undefined);
        }}
        className={popoverClassName}
        content={
          <CLoadingV2.Spin loading={loading !== 'none'} arcoSpinProps={{ block: true }}>
            <PopoverContent
              popSelectRef={popSelectRef}
              list={list}
              params={params}
              status={status}
              current={current}
              tempValue={tempValue}
              fuzzy={fuzzy}
              fuzzyConfig={fuzzyConfig}
              searchWord={searchWord}
              enableEdit={enableEdit}
              ellipsisProps={ellipsisProps}
              listGroup={listGroup}
              keyboardTip={keyboardTip}
              filterUserInput={filterUserInput}
              updateState={updateState}
              updateSearchField={updateSearchField}
              updateSearchValue={updateSearchValue}
              updateTempValue={updateTempValue}
              updateSearchWord={updateSearchWord}
            />
          </CLoadingV2.Spin>
        }
      >
        <div
          className={
            alignTypeisInline
              ? getCPrefixCls('search-combine-trigger-inline')
              : classNames(
                  triggerCls,
                  { [`${triggerCls}-focused`]: focused, [`${triggerCls}-err`]: errState },
                  className,
                )
          }
          style={style}
          data-cy={cssPrefix``}
          onKeyDown={keyBoardEventHandle}
        >
          {alignTypeisInline ? null : <IconSearch className={`${triggerCls}-search`} />}
          {status !== 'default' && current && (
            <span
              className={`${triggerCls}-label`}
              onClick={changeField}
              tabIndex={0}
              onKeyDown={e => popSelectRef.current?.hotkeyHandler(e as unknown as KeyboardEvent)}
            >
              {current.label}:
            </span>
          )}
          <Content
            className={`${triggerCls}-content`}
            current={current}
            alignType={alignType}
            readOnly={!fuzzy}
            tempValue={tempValue}
            placeholder={placeholder}
            defaultField={defaultField}
            searchWord={searchWord}
            updateTempValue={updateTempValue}
            updateSearchValue={updateSearchValue}
            updateSearchWord={updateSearchWord}
            updateState={updateState}
          />
          {loading === 'inline' && <IconLoading className={`${triggerCls}-loading`} />}
        </div>
      </Popover>
    </Spin>
  );
};

export default SearchTrigger;
