import { useContext } from 'react';
import { TableEditorContext } from '../components';
import type { TableEditor } from '../../model/TableEditor';

export const useTableEditor: <DataItemType extends Record<string, any> = any>() => TableEditor<DataItemType> = () =>
  useContext(TableEditorContext);
