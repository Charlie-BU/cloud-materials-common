import { Popover } from '@arco-design/web-react';
import type { FC, ReactNode } from 'react';
import React from 'react';
import {
  IconCheckCircleFill,
  IconCheckCircleBlue,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconClockCircleFill,
  IconLoading,
  IconMinusCircleFillGrey,
  IconClockCircleGreyFill,
} from '@arco-design/iconbox-react-ve-o-design';
import classNames from 'classnames';
import { getStyle } from './utils';
import type { CStatusProps, StatusType, TextProps, Type, Size, WaitColor } from './interface';
import { IconType } from './const';
import type { StatusConfigType } from './config';
import { setStatusConfig } from './config';
import { useBuildIn } from './useBuildIn';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { omit } from 'lodash-es';
import CEllipsis from '../CEllipsis';

export const IconList = (waitColor: WaitColor) => ({
  usable: <IconCheckCircleBlue />,
  error: <IconCloseCircleFill />,
  warning: <IconExclamationCircleFill />,
  running: <IconCheckCircleFill />,
  wait: waitColor === 'grey' ? <IconClockCircleGreyFill /> : <IconClockCircleFill />,
  disable: <IconMinusCircleFillGrey />,
  loading: <IconLoading className="arco-icon-loading" />,
});

export const cssPrefix = classNamePrefixFactory('status');
const testId = {
  root: cssPrefix``,
};

const renderText = (props: TextProps, statusCls: string) => {
  const { text, popoverContent, arcoPopoverProps } = props;
  if (!popoverContent && !arcoPopoverProps?.content) return text;

  return (
    <Popover content={popoverContent} {...arcoPopoverProps}>
      <span className={`${statusCls}-text`}>{text}</span>
    </Popover>
  );
};

type RenderIconType = { status: StatusType; type: Type; icon: ReactNode; size: Size; waitColor: WaitColor };
const renderIcon = (props: RenderIconType, statusCls: string) => {
  const { icon, status, type, size, waitColor } = props;
  if (type === 'dot' && status !== 'loading') {
    let backgroundColor = `var(--${status}-nbd-color)`;
    if (status === 'wait' || status === 'disable') {
      backgroundColor = `var(--${status}-dot-color)`;
      if (waitColor === 'blue' && status === 'wait') {
        backgroundColor = `var(--usable-nbd-color)`;
      }
    }

    return (
      <span
        className={`${statusCls}-dot`}
        style={{
          backgroundColor,
        }}
      />
    );
  }
  if (icon) {
    return (
      <span className={classNames(`${statusCls}-icon`, { [`${statusCls}-icon-large`]: size === 'large' })}>{icon}</span>
    );
  }
  return (
    <span
      className={classNames(`${statusCls}-icon`, {
        [`${statusCls}-icon-large`]: size === 'large',
      })}
    >
      {IconList(waitColor)[status]}
    </span>
  );
};

const Status: FC<CStatusProps> = props => {
  const { defaultStatusMap, mergeProps, statusCls } = useBuildIn();
  const _props = mergeProps(props);
  const { children } = props;
  const {
    status = 'usable',
    type = 'normal',
    text,
    icon,
    popoverContent,
    arcoPopoverProps,
    className = '',
    statusName,
    statusMap = defaultStatusMap,
    size = 'default',
    waitColor = 'grey',
    maxWidth = 160,
    ...rest
  } = _props;
  const _status = statusName ? statusMap[statusName]?.status : status;
  const textContent = statusName ? children ?? text ?? statusMap[statusName]?.text : children ?? text;
  const _icon = statusName ? statusMap[statusName]?.icon : undefined;

  const haveIcon = IconType.includes(type);

  return (
    <span
      {...omit(rest, 'highlightColor', 'borderColor', 'tagColor')}
      data-cy={testId.root}
      className={classNames(className, statusCls, {
        [`${statusCls}-large`]: size === 'large',
        [`${statusCls}-normal`]: type === 'normal',
      })}
      style={getStyle({ ..._props, statusMap, status: _status, waitColor })}
    >
      {haveIcon ? renderIcon({ icon: icon ?? _icon, status: _status, type, size, waitColor }, statusCls) : null}
      <CEllipsis showCopy={false} maxWidth={maxWidth}>
        <span className={`${statusCls}-textWrapper`}>
          {renderText(
            {
              text: textContent,
              popoverContent,
              arcoPopoverProps,
            },
            statusCls,
          )}
        </span>
      </CEllipsis>
    </span>
  );
};

export interface StatusComponent extends FC<CStatusProps> {
  config: (config: StatusConfigType) => void;
}

Status.displayName = 'Status';

const ExportedStatusComponent: StatusComponent = Status as StatusComponent;

ExportedStatusComponent.config = setStatusConfig;

export type { CStatusProps };

export default ExportedStatusComponent;
