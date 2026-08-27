import type { PopoverProps } from '@arco-design/web-react';
import { isFunction } from 'lodash-es';
import type { ReactNode } from 'react';
import type { TableEditor } from '../../../model/TableEditor';

export type CallableProps<T> = T | ((tableEditor: TableEditor) => T);
export type CallAbleReactNode = CallableProps<ReactNode>;
export type CallAblePopover = CallableProps<ReactNode | PopoverProps>;
export type CallAbleBoolean = CallableProps<boolean>;

export const runCallable = <T>(props: CallableProps<T>, tableEditor: TableEditor) => {
  if (isFunction(props)) return props(tableEditor);
  return props;
};
