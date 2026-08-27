import type { InputProps } from '@arco-design/web-react';
import type { CSearchComponentContent } from '../interface';

export const useFilterUserInput = (props: {
  content: CSearchComponentContent;
  normalize?:
    | InputProps['normalize']
    | {
        ignoreCharacters?: (string | RegExp)[] | undefined;
        letterCase?: 'upperCase' | 'lowerCase' | undefined;
      };
}) => {
  const { content, normalize } = props;
  const shouldHaveNormalize = content.component && ['Input', 'AutoComplete'].includes(content.component) && normalize;
  const filterUserInput: InputProps['normalize'] = shouldHaveNormalize
    ? typeof normalize === 'function'
      ? normalize
      : userInput => {
          if (!userInput) {
            return userInput;
          }
          let formattedValue: string = userInput || '';
          /** 方便后续更改格式化操作顺序 */
          const LowerCaseTurn = 0;
          const UpperCaseTurn = 1;
          const IgnoreCharTurn = 2;
          for (let order = 0; order < 3; order++) {
            if (!normalize) {
              break;
            }
            if (order === LowerCaseTurn) {
              if (normalize.letterCase === 'lowerCase') {
                formattedValue = formattedValue?.toLowerCase();
              }
              continue;
            }
            if (order === UpperCaseTurn) {
              if (normalize.letterCase === 'upperCase') {
                formattedValue = formattedValue?.toUpperCase();
              }
              continue;
            }
            if (order === IgnoreCharTurn) {
              if (Array.isArray(normalize.ignoreCharacters) && normalize.ignoreCharacters.length) {
                formattedValue =
                  normalize.ignoreCharacters.reduce((res: string | undefined, character: string | RegExp) => {
                    if (!character) {
                      return res;
                    }
                    return res?.replaceAll(character, '');
                  }, formattedValue) || '';
              }
              continue;
            }
          }

          return formattedValue;
        }
    : undefined;
  return { filterUserInput };
};
