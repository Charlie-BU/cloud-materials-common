import React from 'react';
import classNames from 'classnames';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { mapProps, connect } from '@formily/react';
import type { Field } from '@formily/core';

const cssPrefix = classNamePrefixFactory('cform-text');

const TextComponent: React.FC<React.HTMLAttributes<HTMLSpanElement>> = props => {
  const { className, children, ...rest } = props || {};
  return (
    <span className={classNames(cssPrefix``, className)} {...rest}>
      {children}
    </span>
  );
};

const Text = connect(
  TextComponent,
  mapProps((props, field) => {
    return {
      children: props.children || field.content || (field as Field).value,
    };
  }),
);

export default Text;
