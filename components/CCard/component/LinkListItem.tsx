import React from 'react';
import type { CLinkListItemProps } from '../interface';
import cs from 'classnames';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory(`card-link-card-item`);

export const testId = {
  container: cssPrefix`container`,
  tag: cssPrefix`tag`,
  content: cssPrefix`content`,
};

const LinkListItem: React.FC<CLinkListItemProps> = props => {
  const { children, content, className, tag, ...rest } = props;

  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix(`card-link-card-item`);
  return (
    <div {...rest} data-testid={testId.container} className={cs(cssPrefix``, className)}>
      {tag && (
        <div data-testid={testId.tag} className={cssPrefix`tag`}>
          {tag}
        </div>
      )}
      <div data-testid={testId.content} className={cssPrefix`content`}>
        {content ?? children}
      </div>
    </div>
  );
};

LinkListItem.displayName = 'LinkListItem';

export default LinkListItem;
