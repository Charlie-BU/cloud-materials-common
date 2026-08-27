import type { InputProps } from '@arco-design/web-react';
import type { CSearchComponentContent } from '../interface';
export declare const useFilterUserInput: (props: {
    content: CSearchComponentContent;
    normalize?: InputProps['normalize'] | {
        ignoreCharacters?: (string | RegExp)[] | undefined;
        letterCase?: 'upperCase' | 'lowerCase' | undefined;
    };
}) => {
    filterUserInput: ((value: string) => string) | undefined;
};
