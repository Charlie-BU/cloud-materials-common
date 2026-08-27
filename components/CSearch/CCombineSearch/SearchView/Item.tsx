import CTag from '../../../CTag';
import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import type {
  CCombineSearchItem,
  UseCCombineSearchControl,
  UseCCombineSearchCustomProps,
  UseCCombineSearchValue,
  ViewItemRenderProps,
} from '../../interface';
import { transformToString } from '../../utils';
import { useCConfigContext } from '../../../CConfigProvider';
import InlineItem from './InlineItem';
import classNames from 'classnames';

export interface SearchViewItemProps
  extends Pick<
      UseCCombineSearchCustomProps,
      'alignType' | 'enableEdit' | 'popoverClassName' | 'popoverStyle' | 'popoverTriggerProps'
    >,
    Pick<UseCCombineSearchValue, 'current'>,
    Pick<UseCCombineSearchControl, 'updateParams' | 'updateState' | 'updateTempValue'> {
  value: any;
  item: CCombineSearchItem;
}

const SearchViewItem = (props: SearchViewItemProps) => {
  const { value, item, alignType, current, enableEdit, updateParams, updateState, updateTempValue } = props;
  const alignTypeisInline = alignType === 'inline';
  const { getCPrefixCls } = useCConfigContext();
  const itemCls = getCPrefixCls('search-combine-view-item');
  const prefixClassName = `${itemCls}-prefix`;
  const edit = (item.viewItemConfig?.enableEdit ?? enableEdit) !== false;

  const onClose = (e?: Event) => {
    e?.stopPropagation();
    updateParams({ [item.fieldName]: undefined });
    if (current?.fieldName === item.fieldName) {
      updateState('default', null);
    }
  };

  const onClick = () => {
    if (!alignTypeisInline && edit) {
      updateState('value', item);
      updateTempValue(value);
    }
  };

  const cTagProps: ViewItemRenderProps = {
    className: classNames({
      [itemCls]: true,
      [getCPrefixCls('search-combine-view-item-nonedit')]: !edit,
    }),
    closable: true,
    onClose,
    onClick,
  };

  const tagContent = useMemo(() => {
    if (typeof item.renderViewItem === 'function') {
      return null;
    }
    return transformToString(value, item);
  }, [value, item]);

  let contentNode: ReactNode = null;
  if (typeof item.renderViewItem === 'function') {
    contentNode = item.renderViewItem(cTagProps, { item, value, prefixClassName });
  } else {
    contentNode = (
      <CTag {...cTagProps} cEllipsisProps={{ arcoPopoverProps: { className: `${itemCls}-pop` } }}>
        {!item.viewItemConfig?.hiddenLable && <span className={prefixClassName}>{`${item.label}：`}</span>}
        {tagContent}
      </CTag>
    );
  }

  if (alignTypeisInline) {
    return (
      <InlineItem {...props} itemCls={itemCls}>
        {contentNode}
      </InlineItem>
    );
  }
  return <>{contentNode}</>;
};

export default SearchViewItem;
