import type { TableEditorConstructorOptions } from './index';
import { TableEditor } from './index';

export const createTableEditor = (tableProps: TableEditorConstructorOptions) => {
  return new TableEditor(tableProps);
};
