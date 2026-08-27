import type { JSXElementConstructor, ComponentProps } from 'react';
import type { CDropdownProps } from './interface';
export declare const testId: {
    popover: string;
    component: string;
};
declare function CStatusDropdown<T extends JSXElementConstructor<any>, ValueKey extends keyof ComponentProps<T>>(props: CDropdownProps<T, ValueKey>): JSX.Element;
declare namespace CStatusDropdown {
    var displayName: string;
}
export default CStatusDropdown;
