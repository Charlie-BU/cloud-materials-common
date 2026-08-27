/// <reference types="react" />
import type { CCollapseProps } from './interface';
export type GetItemKeyType<T> = (item: T) => string;
interface CCollapseGroupProps<T> extends Omit<CCollapseProps<T>, 'data'> {
    data: T[];
}
declare const CCollapseGroup: <T extends unknown>(props: CCollapseGroupProps<T>) => JSX.Element;
export default CCollapseGroup;
