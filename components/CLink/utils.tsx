import type { CSSProperties, ReactNode } from 'react';
import type { CLinkProps } from './interface';
import React from 'react';
import type { CLocale } from '../locales/default';
import { IconAttachment, IconDocumentFeedback, IconKnowledge } from '@arco-design/iconbox-react-ve-o-design';

export const getCLinkStyle = (size: Required<CLinkProps>['size'], style?: CSSProperties): CSSProperties | undefined => {
  if (typeof size === 'number') {
    return { ...style, fontSize: `${size}px` };
  } else if (size === 'small') {
    return { ...style, fontSize: '12px' };
  }
  return style;
};

export const getInnerLinkSetting = (
  locale: CLocale,
): Record<Required<CLinkProps>['type'], { icon: ReactNode; label: string } | undefined> => ({
  default: undefined,
  example: { icon: <IconKnowledge />, label: locale.CLink.example },
  'help-doc': { icon: <IconDocumentFeedback />, label: locale.CLink.helpDoc },
  file: { icon: <IconAttachment />, label: locale.CLink.file },
});
