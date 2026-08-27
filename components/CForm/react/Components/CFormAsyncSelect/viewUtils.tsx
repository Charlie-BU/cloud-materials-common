import { Popover } from '@arco-design/web-react';
import type { SelectProps } from '@arco-design/web-react';
import type { CFormAsyncSelectConfigOption, CFormAsyncSelectProps } from './interface';
import React from 'react';
import classNames from 'classnames';
import CEllipsis from '../../../../CEllipsis';
import { LabelAlias } from './const';
import type { CLocale } from '../../../../locales/default';

export const renderOptions = ({
  dataSource,
  cssPrefix,
  optionMode,
  locale,
  getPopupContainer,
}: {
  optionMode: CFormAsyncSelectProps['optionMode'];
  cssPrefix: string;
  locale: CLocale;
  dataSource?: CFormAsyncSelectConfigOption[];
  getPopupContainer?: SelectProps['getPopupContainer'];
}): SelectProps['options'] => {
  if (!dataSource) return [];
  if (optionMode === 'custom') {
    return dataSource;
  }
  const isDouble = optionMode === 'doubleRow';
  const options = dataSource.map(item => {
    const showDisableReason = item.disabled && item.disabledTooltipContent;
    const popContent = (
      <div className={`${cssPrefix}-option-pop`}>
        <span className={`${cssPrefix}-option-pop-label`}>{item.label}</span>
        {item.description && <span className={`${cssPrefix}-option-pop-des`}>{item.description}</span>}
        {showDisableReason && (
          <span className={`${cssPrefix}-option-pop-tip`}>
            {typeof item.disabledTooltipContent === 'string'
              ? `${locale.CForm.text.disabledReason}${item.disabledTooltipContent}`
              : item.disabledTooltipContent}
          </span>
        )}
      </div>
    );
    const content = (
      <span
        className={classNames({
          [`${cssPrefix}-option`]: true,
          [`${cssPrefix}-option-double`]: isDouble,
        })}
      >
        <span
          className={classNames({
            [`${cssPrefix}-option-label`]: true,
            [`${cssPrefix}-option-label-empty`]: item.label === '',
            [`${cssPrefix}-option-label-double`]: isDouble && !!item.description,
            [`${cssPrefix}-option-disabled`]: item.disabled,
          })}
        >
          {item.label}
        </span>
        {item.description && (
          <span
            className={classNames({
              [`${cssPrefix}-option-des`]: true,
              [`${cssPrefix}-option-des-nodouble`]: !isDouble,
              [`${cssPrefix}-option-des-nodisabled`]: !item.disabled,
              [`${cssPrefix}-option-disabled`]: item.disabled,
            })}
          >
            {item.description}
          </span>
        )}
      </span>
    );

    return {
      ...item,
      extra: { ...item.extra, [LabelAlias]: item.label },
      label:
        typeof item.label === 'string' || typeof item.label === 'number' ? (
          showDisableReason ? (
            <Popover position="right" getPopupContainer={getPopupContainer} content={popContent}>
              <div>
                <CEllipsis content={content} arcoPopoverProps={{ popupVisible: false }} />
              </div>
            </Popover>
          ) : (
            <CEllipsis
              arcoPopoverProps={{
                position: 'right',
                getPopupContainer,
              }}
              content={content}
              popoverContent={popContent}
            />
          )
        ) : (
          item.label
        ),
    };
  });
  return options;
};
