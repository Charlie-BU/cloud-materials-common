import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory('table-editor');

export const testId = {
  tableEditor: cssPrefix``,
  addRowButton: cssPrefix`addRowButton`,
  deleteRowButton: cssPrefix`deleteRowButton`,
  submitButton: cssPrefix`submitButton`,
  switchButton: cssPrefix`switchButton`,
  undoButton: cssPrefix`undoButton`,
};
