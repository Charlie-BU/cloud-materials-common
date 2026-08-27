import type { PopoverProps } from '@arco-design/web-react';
import type { ReactNode } from 'react';
import type { TableEditor } from '../../../model/TableEditor';
export type CallableProps<T> = T | ((tableEditor: TableEditor) => T);
export type CallAbleReactNode = CallableProps<ReactNode>;
export type CallAblePopover = CallableProps<ReactNode | PopoverProps>;
export type CallAbleBoolean = CallableProps<boolean>;
export declare const runCallable: <T>(props: CallableProps<T>, tableEditor: TableEditor) => T;
