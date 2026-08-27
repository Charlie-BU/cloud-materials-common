/// <reference types="react" />
import type { CTagsProps } from '../interface';
export interface TagsCopyProps extends Pick<CTagsProps, 'copyable'> {
    content: string | string[];
}
/**
 * @description 标签内容复制
 */
export declare const TagsCopy: (props: TagsCopyProps) => JSX.Element | null;
