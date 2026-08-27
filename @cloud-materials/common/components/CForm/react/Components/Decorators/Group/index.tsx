import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { connect, mapProps } from '@formily/react';
import toArray from 'rc-util/lib/Children/toArray';

import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';

export const cssPrefix = classNamePrefixFactory('cform-group');

export interface GroupProps {
  title: ReactNode;
}

const GroupComponent: React.FC<React.HTMLAttributes<HTMLDivElement> & GroupProps> = props => {
  const { title, children, className, ...restProps } = props;

  const childNodes = toArray(children);

  const itemsNodes: ReactNode[] = [];
  const removeNodes: ReactNode[] = [];
  childNodes.forEach(child => {
    const childPropsComponent = (child as ReactElement)?.props?.component;
    // 对应 field.component 属性
    const [component] = childPropsComponent || [];
    switch (component?.displayName) {
      case 'CArrayRemove':
        removeNodes.push(child);
        break;
      default:
        itemsNodes.push(child);
        break;
    }
  });

  const [removeNode] = removeNodes;

  return (
    <div {...restProps} className={classNames(cssPrefix``, className)}>
      {title && <div className={cssPrefix`title`}>{title}</div>}
      {removeNode && <span className={cssPrefix`remove-container`}>{removeNode}</span>}
      {itemsNodes}
    </div>
  );
};

export const CGroup = connect(
  GroupComponent,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      title: field.title,
      ...field.decoratorProps,
    };
  }),
);

CGroup.displayName = 'Group';

export default CGroup;
