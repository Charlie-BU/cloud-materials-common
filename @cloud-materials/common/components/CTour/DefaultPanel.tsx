import classNames from 'classnames';
import * as React from 'react';
import type { CTourStepProps } from './interface';
import { Button, Space } from '@arco-design/web-react';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { useCConfigContext } from '../CConfigProvider';

export function DefaultPanel({
  current,
  total = 0,
  title,
  desc,
  cover,
  closable = true,
  className,
  style,
  prevButtonProps,
  nextButtonProps,
  footer = true,
  onClose,
  onPrev,
  onNext,
  onFinish,
}: CTourStepProps) {
  const {
    useCssPrefix,
    locale: { CTour },
  } = useCConfigContext();
  const cssPrefix = useCssPrefix('tour-step');
  const singleStep = total === 1;

  const closeIcon = closable && (
    <span className={cssPrefix`close`} onClick={onClose}>
      <IconClose />
    </span>
  );

  return (
    <div className={classNames(cssPrefix`content`, className)} style={style}>
      {cover && <div className={cssPrefix`cover`}>{cover}</div>}
      {title && (
        <div className={cssPrefix`header`}>
          <div className={cssPrefix`title`}>{title}</div>
          {closeIcon}
        </div>
      )}
      {title ? (
        desc && <div className={cssPrefix`desc`}>{desc}</div>
      ) : (
        <div className={cssPrefix`header`}>
          {desc && <div className={cssPrefix`desc`}>{desc}</div>}
          {closeIcon}
        </div>
      )}
      {footer && (
        <div className={cssPrefix`footer`}>
          {total > 1 && (
            <span className={cssPrefix`progress`}>
              {current + 1}/{total}
            </span>
          )}
          <Space className={cssPrefix`buttons`}>
            {prevButtonProps !== null &&
              (singleStep ? (
                <Button onClick={onFinish} size="mini" {...prevButtonProps}>
                  {prevButtonProps?.children ?? CTour.get}
                </Button>
              ) : (
                current !== 0 && (
                  <Button
                    onClick={onPrev}
                    size="mini"
                    type="text"
                    key="prev"
                    {...prevButtonProps}
                    className={classNames(cssPrefix`prev-btn`, prevButtonProps?.className)}
                  >
                    {prevButtonProps?.children ?? CTour.prevStep}
                  </Button>
                )
              ))}

            {nextButtonProps !== null &&
              (current === total - 1 ? (
                <Button
                  type={singleStep ? 'primary' : 'default'}
                  onClick={onFinish}
                  size="mini"
                  key="next"
                  {...nextButtonProps}
                >
                  {nextButtonProps?.children ?? CTour.sure}
                </Button>
              ) : (
                <Button type="default" onClick={onNext} size="mini" key="next" {...nextButtonProps}>
                  {nextButtonProps?.children ?? CTour.nextStep}
                </Button>
              ))}
          </Space>
        </div>
      )}
    </div>
  );
}
