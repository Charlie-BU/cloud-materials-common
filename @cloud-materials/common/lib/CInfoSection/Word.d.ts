import type { FC, CSSProperties } from 'react';
export interface WordProps {
    onClick?: () => void;
    style?: CSSProperties;
    value?: string;
}
declare const Word: FC<WordProps>;
export default Word;
