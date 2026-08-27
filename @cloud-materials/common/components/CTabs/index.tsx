import React from 'react';
import { Tabs } from '@arco-design/web-react';
import classNames from 'classnames';

import type { CTabsProps } from './interface';
import { useCConfigContext } from '../CConfigProvider';
import { cssPrefix } from './util';

export const testId = {
  container: cssPrefix`container`,
  pullWithElement: cssPrefix`pullWithElement`,
};

function CTabs(props: CTabsProps) {
  const {
    style,
    className,
    leftBottomBorder = false,
    children,
    sceneType,
    isFullElement = false,
    ...restTabsProps
  } = props;

  const { useCssPrefix } = useCConfigContext();
  const classPrefix = useCssPrefix('tabs');
  const elementClassName = isFullElement ? classPrefix`fullelement` : classPrefix`container`;
  return (
    <div
      style={style}
      className={classNames(className, classPrefix`${sceneType}`)}
      data-testid={testId.container}
      data-cy={testId.container}
    >
      <div
        data-testid={testId.pullWithElement}
        className={classNames(`${elementClassName}`, {
          [classPrefix`no-left-bottom-border`]: !leftBottomBorder,
        })}
      >
        <Tabs {...restTabsProps}> {children}</Tabs>
      </div>
    </div>
  );
}

CTabs.displayName = 'CTabs';

export default CTabs;
