/// <reference types="react" />
import type { CTagProps } from './interface';
/**
 * @description 标签
 */
declare const CTag: {
    (props: CTagProps): JSX.Element;
    displayName: string;
};
export { default as CTags } from './Tags';
export default CTag;
