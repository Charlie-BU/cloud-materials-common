/// <reference types="react" />
import type { CCollapseProps } from './interface';
interface CCollapseTextProps<T> extends Omit<CCollapseProps<T>, 'data'> {
    data: string;
}
declare const CCollapseText: <T extends unknown>(props: CCollapseTextProps<T>) => JSX.Element;
export default CCollapseText;
