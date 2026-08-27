import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CInlineEdit from '../CInlineEdit';
import CCopy from '../CCopy';
import Word from './Word';
import CEllipsis from '../CEllipsis';
import type { CInlineEditProps } from '../CInlineEdit/interface';

export const cssPrefix = classNamePrefixFactory('info-section');

export const DEFAULT_COLUMN = 2;

export const testId = {
  container: cssPrefix`container`,
  title: cssPrefix`title`,
  item: cssPrefix`item`,
};

export const builtInMap = { CEllipsis, CInlineEdit: CInlineEdit as React.FC<CInlineEditProps<any>>, CCopy, Word };

export const labelWidthMap = {
  normal: 80,
  small: 53,
};
