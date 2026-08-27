import React from 'react';
import { TriggerName } from './constants';

const prop = { [TriggerName]: true };
/**
 * 用于mask: false时包裹其他组件以阻止点击后关闭 modal
 */
export const TriggerWrapper: React.FC<{ inlineAttr?: boolean }> = ({ children, inlineAttr }) => {
  if (!inlineAttr) {
    return React.createElement(
      'div',
      {
        ...prop,
        style: { display: 'unset' },
      },
      children,
    );
  }

  return React.isValidElement(children)
    ? React.cloneElement(children, prop)
    : React.createElement(React.Fragment, null, children);
};
