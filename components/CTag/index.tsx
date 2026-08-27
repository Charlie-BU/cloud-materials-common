import React, { useState } from 'react';
import classNames from 'classnames';

import type { CTagProps } from './interface';
import { TagItem } from './TagItem';
import { useCConfigContext } from '../CConfigProvider';
import { TEST_ID } from './constant';

/**
 * @description 标签
 */
const CTag = (props: CTagProps) => {
  const { prefix, ...restProps } = props;

  const { useCssPrefix } = useCConfigContext();
  const cssPrefixTag = useCssPrefix('tag');
  const [isVisible, setIsVisible] = useState(restProps.visible ?? true);

  if (prefix) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, style, ...restTagProps } = restProps;
    const isStringPrefix = typeof prefix === 'string';

    return (
      <div
        className={classNames(
          cssPrefixTag`prefix`,
          cssPrefixTag`prefix-${props.size || 'medium'}`,
          isStringPrefix && cssPrefixTag`prefix-string`,
          restProps.className,
        )}
        style={!isVisible ? { ...restProps.style, display: 'none' } : restProps.style}
        data-testid={TEST_ID.prefixTag}
      >
        {isStringPrefix ? (
          <TagItem
            type="bordered"
            color={restProps.color}
            className={!restProps.color ? cssPrefixTag`prefix-default` : undefined}
            {...restTagProps}
            closable={false}
            closeIcon={undefined}
            checkable={false}
          >
            {prefix}
          </TagItem>
        ) : (
          prefix
        )}
        <TagItem
          type="outline"
          {...restTagProps}
          style={{ borderLeft: 'none' }}
          onClose={e => {
            setIsVisible(false);
            restProps.onClose?.(e);
          }}
        />
      </div>
    );
  }

  return <TagItem {...restProps} />;
};

CTag.displayName = 'CTag';

export { default as CTags } from './Tags';
export default CTag;
