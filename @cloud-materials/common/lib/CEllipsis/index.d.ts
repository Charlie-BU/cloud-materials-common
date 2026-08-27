/// <reference types="react" />
import type { CEllipsisProps } from './interface';
export declare const testId: {
    container: string;
    content: string;
    copy: string;
};
declare function CEllipsis(props: CEllipsisProps): JSX.Element;
declare namespace CEllipsis {
    var displayName: string;
}
export default CEllipsis;
export { useCEllipsis } from './hooks';
