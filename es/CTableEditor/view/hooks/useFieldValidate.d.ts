import type { TableEditor as TableEditorModel } from '../../model/TableEditor';
/**
 * TableEditor 外层 Form validate 时，手动触发 TableEditor 内部 form 的 validate
 * @param tableEditor
 */
export declare const useFieldValidate: (tableEditor: TableEditorModel) => void;
