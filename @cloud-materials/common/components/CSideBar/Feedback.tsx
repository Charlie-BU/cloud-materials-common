import { IconMessageNotificationService, IconWrappedGift } from '@arco-design/iconbox-react-ve-o-design';
import { Button, Popover } from '@arco-design/web-react';
import classNames from 'classnames';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
import type { FeedbackProps } from './interface';

export const Feedback = ({
  children,
  circle,
  popoverProps,
  popoverContent,
  type = 'normal',
  ...rest
}: React.PropsWithChildren<FeedbackProps>) => {
  const { useCssPrefix, locale } = useCConfigContext();
  const clsPrefix = useCssPrefix('sidebar-feedback');
  const text = type === 'normal' ? locale.CSidebar.feedbackNormal : locale.CSidebar.feedbackPrize;
  return (
    <div className={classNames(circle && clsPrefix`box`)}>
      <Popover
        position="right"
        {...popoverProps}
        triggerProps={{
          autoFitPosition: false,
          ...popoverProps?.triggerProps,
        }}
        content={popoverContent ?? text}
        getPopupContainer={node => node.parentElement!}
        style={{ whiteSpace: 'nowrap', ...popoverProps?.style }}
        disabled={!circle}
      >
        <Button
          icon={
            type === 'normal' ? <IconMessageNotificationService useCurrentColor /> : <IconWrappedGift useCurrentColor />
          }
          {...rest}
          size={circle ? 'default' : 'mini'}
          shape={circle ? 'circle' : 'round'}
          className={classNames(clsPrefix``, circle && clsPrefix`circle`, rest.className)}
        >
          {circle ? void 0 : children ?? text}
        </Button>
      </Popover>
    </div>
  );
};

Feedback._Feedback = true;
