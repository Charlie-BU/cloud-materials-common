import type { ReactNode } from 'react';
import React from 'react';

export const getChildrenString = (node: ReactNode) => {
  const getTextInNode = (_node: ReactNode): string => {
    if (React.isValidElement(_node)) {
      if (_node.props.children instanceof Object) {
        return getTextInNode(_node.props.children);
      }
      return _node.props.children;
    }
    return String(_node);
  };
  return getTextInNode(node);
};
