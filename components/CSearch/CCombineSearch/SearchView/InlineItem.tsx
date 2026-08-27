import { useCConfigContext } from '../../../CConfigProvider';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import ContentInput from '../SearchTrigger/ContentInput';
import { getConbineSearchPlaceholder } from '../utils';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';
import { Popover } from '@arco-design/web-react';
import type { CCombineSearchItem, UseCCombineSearchControl, UseCCombineSearchCustomProps } from '../../interface';
import CEllipsis from '../../../CEllipsis';
import { isString } from 'lodash-es';
import { useSetState } from 'ahooks';

type InlineSearchViewItemProps = Pick<UseCCombineSearchControl, 'updateParams' | 'updateState'> &
  Pick<UseCCombineSearchCustomProps, 'enableEdit' | 'popoverClassName' | 'popoverStyle' | 'popoverTriggerProps'> & {
    value: any;
    item: CCombineSearchItem;
    itemCls: string;
  };

const InlineItem = ({
  children,
  item,
  itemCls,
  value,
  enableEdit,
  popoverClassName,
  popoverStyle,
  popoverTriggerProps,
  updateParams,
  updateState,
}: PropsWithChildren<InlineSearchViewItemProps>) => {
  const [state, setState] = useSetState({ current: value, inputEdit: false, visible: false });
  const { locale } = useCConfigContext();

  if (item.type === 'input') {
    const clsSuffix = item.mode === 'number' ? 'inputNumber' : item.mode === 'tag' ? 'inputTag' : 'input';
    return state.inputEdit ? (
      <div
        onKeyDown={e => {
          e.stopPropagation();
          if (e.key === 'Enter' && state.current && item.mode !== 'tag') {
            setState({ inputEdit: false });
            updateParams({ [item.fieldName]: state.current });
          }
        }}
      >
        <ContentInput
          className={`${itemCls}-inline-${clsSuffix}`}
          tempValue={state.current}
          item={item}
          size="mini"
          placeholder={item.placeholder || getConbineSearchPlaceholder('value', state.current, locale)}
          updateTempValue={val => {
            setState({ current: val });
          }}
          onBlur={() => {
            setState({ inputEdit: false, current: value });
          }}
          updateSearchValue={() => {
            setState({ inputEdit: false });
            updateParams({ [item.fieldName]: state.current });
          }}
          updateState={updateState}
        />
      </div>
    ) : (
      <span
        onClick={() => {
          if (enableEdit) {
            setState({ inputEdit: true });
          }
        }}
      >
        {children}
      </span>
    );
  }

  let popContentNode: ReactNode = null;
  if (item.type === 'select') {
    if (item.mode === 'multiple') {
      popContentNode = (
        <MultipleSelect
          options={item.options.map(el => ({
            ...el,
            label: isString(el.label) ? <CEllipsis content={el.label} /> : el.label,
          }))}
          value={state.current}
          onChange={val => {
            setState({ current: val });
          }}
        />
      );
    } else {
      popContentNode = (
        <SingleSelect
          value={state.current}
          options={item.options.map(el => ({
            ...el,
            label: isString(el.label) ? <CEllipsis content={el.label} /> : el.label,
          }))}
          onChange={val => {
            setState({ current: val });
          }}
        />
      );
    }
  } else if (item.type === 'custom') {
    popContentNode = item.renderContent({
      item,
      value: state.current,
      onChange: val => {
        setState({ current: val });
      },
      onReset: () => {
        setState({ current: value });
      },
      onSave: (value = state.current) => {
        updateParams({ [item.fieldName]: value });
        setState({ visible: false, current: value });
      },
      onCancel: () => setState({ visible: false }),
    });
  }
  return (
    <Popover
      trigger="click"
      style={{ ...popoverStyle, ...(item?.type === 'custom' ? item.popoverStyle : {}) }}
      className={popoverClassName}
      content={enableEdit ? popContentNode : null}
      triggerProps={{
        position: 'bl',
        showArrow: false,
        ...popoverTriggerProps,
      }}
      popupVisible={state.visible}
      onVisibleChange={visible => {
        //NOTE - 只有通过trigger切换显隐会触发，受控的方式更改显隐不会触发onVisibleChange
        setState({ visible, current: value });
        if (!visible && enableEdit) {
          updateParams({ [item.fieldName]: state.current });
        }
      }}
    >
      {children}
    </Popover>
  );
};

export default InlineItem;
