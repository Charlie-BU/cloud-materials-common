import React from 'react';

import { Button, Message } from '@arco-design/web-react';

import { SEPARATOR } from '../constant';
import type { CopyableProps, CTagsProps } from '../interface';
import { useCCopy } from '../../CCopy/hooks';
import { useCConfigContext } from '../../CConfigProvider';

export interface TagsCopyProps extends Pick<CTagsProps, 'copyable'> {
  content: string | string[];
}

/**
 * @description 标签内容复制
 */
export const TagsCopy = (props: TagsCopyProps) => {
  const { copyable, content } = props;

  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefixTags = useCssPrefix('tags');

  const defaultOnCopy = (_: string, result: boolean) =>
    result ? Message.success(locale.CTag.successMsg) : Message.error(locale.CTag.failedMsg);

  const {
    separator,
    buttonText = locale.CTag.copyText,
    arcoButtonProps,
    onCopy = defaultOnCopy,
    ...copyProps
  } = (!copyable || typeof copyable === 'boolean' ? {} : copyable) as CopyableProps;

  const [_, { handleCopy }] = useCCopy({
    text: typeof content === 'string' ? content : content.join(separator ?? SEPARATOR),
    onCopy,
    ...copyProps,
  });

  if (!copyable) {
    return null;
  }

  return (
    <div className={cssPrefixTags`copy`}>
      <Button
        type="primary"
        className={cssPrefixTags`copy-button`}
        onClick={e => handleCopy(e as any)}
        {...arcoButtonProps}
      >
        {buttonText}
      </Button>
    </div>
  );
};
