import type { ReactNode } from 'react';
import React from 'react';
import type { LinkProps, PopoverProps } from '@arco-design/web-react';
import { Link, Popover } from '@arco-design/web-react';

import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { ArrayTable } from '@storage-fe/formily-arco';
import { IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import classNames from 'classnames';
import { useCConfigContext } from '../../../../CConfigProvider';
import { observer } from '@formily/react';

export const cssPrefix = classNamePrefixFactory('cform-array-remove');

interface CArrayRemove {
  className?: string;
  /**
   * // 按钮的类型，支持单icon , 单text，和icon 和文案的组合
   */
  type?: 'icon' | 'text' | 'both';
  /**
   * 最小的数量
   */
  min?: number;
  /**
   * popover 的属性，优先级高于内置变量
   */
  popoverProps?: PopoverProps;
  /**
   * @deprecated 废弃，后续通过自定义删除按钮实现样式自定义
   * type 为 text & both 的时候生效
   */
  addButtonProps?: LinkProps;
  /**
   * 是否禁用，和 addButtonProps.disabled 功能一致
   */
  disabled?: boolean;
  /**
   * 删除的文案
   * type 为 text & both 的时候生效
   */
  text?: ReactNode;
  /**
   * @default '至少添加x个'
   * 自定义popover文案
   * 支持模板字符串如 '至少添加${count}个'
   * 支持自定义渲染 @param currentCount 当前已添加的个数
   */
  popoverInfo?: string | ((currentCount: number) => ReactNode);
  /**
   * 点击删除的回调，这里可以做埋点等需求
   * @param index 删除的行数 index
   * @returns void
   */
  onClick?: (index: number) => void;
}

const CArrayRemove = observer((props: CArrayRemove) => {
  const {
    min = 0,
    type = 'icon',
    popoverInfo,
    popoverProps,
    addButtonProps,
    text,
    className,
    disabled: disabledProps,
  } = props;
  const { removeItem, showRemove, disabled, index } = ArrayBase.useRemove!();
  const array = ArrayTable.useArray!();

  const { size = 'default', locale, formatLocale } = useCConfigContext();

  if (!showRemove) return null;

  const currentCount = array?.field?.value?.length ?? 0;
  const disableDelete = currentCount <= min;

  let popoverContent: ReactNode;
  if (typeof popoverInfo === 'function') {
    popoverContent = popoverInfo(currentCount);
  } else if (typeof popoverInfo === 'string') {
    popoverContent = popoverInfo.replace('${count}', `${min}`);
  } else {
    popoverContent = formatLocale(locale.CForm.array.lessCountText, { count: min });
  }

  const onRemove = () => {
    removeItem();
    props?.onClick?.(index);
  };

  return (
    <div
      className={classNames(className, {
        [cssPrefix``]: type === 'icon',
        [`${cssPrefix``}-size-${size}`]: Boolean(size),
      })}
    >
      <Popover content={popoverContent} disabled={!disableDelete} {...popoverProps}>
        <Link
          disabled={disabled || disableDelete || disabledProps}
          icon={
            (type === 'both' || type === 'icon') && (
              <IconDelete
                color={disabled || addButtonProps?.disabled || disabledProps || disableDelete ? '#C7CCD6' : '#41464f'}
              />
            )
          }
          {...addButtonProps}
          onClick={onRemove}
        >
          {type === 'both' || type === 'text' ? text || locale.CForm.array.deleteText : ''}
        </Link>
      </Popover>
    </div>
  );
});

CArrayRemove.displayName = 'CArrayRemove';

export default CArrayRemove;
