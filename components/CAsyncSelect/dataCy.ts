import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

//---------test lib------------

export const cssPrefix = classNamePrefixFactory('async-select');
export const cssRoot = cssPrefix``;

export const testId = {
  selectId: `${cssRoot}`,
  dropDownId: `${cssRoot}-dropDownId`,
  tooltipLabelId: `${cssRoot}-tooltipLabelId`,
  tooltipDesId: `${cssRoot}-tooltipDesId`,
  singleLabelId: `${cssRoot}-singleLabelId`,
  singleDesId: `${cssRoot}-singleDesId`,
  doubleLabelId: `${cssRoot}-doubleLabelId`,
  doubleDesId: `${cssRoot}-doubleDesId`,
  maxTagId: `${cssRoot}-maxTagId`,
};
