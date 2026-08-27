import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';

//---------test lib------------

export const cssPrefix = classNamePrefixFactory('detail-page');
export const cssRoot = cssPrefix``;

export const testId = {
  detailPage: `${cssRoot}`,
  detailPageLoading: `${cssRoot}-detailPageLoading`,
  globalLoadError: `${cssRoot}-globalLoadError`,
  tabLoadError: `${cssRoot}-tabLoadError`,
  detailPageHeader: `${cssRoot}-header`,
  detailPageContent: `${cssRoot}-content`,
  detailPageNotice: `${cssRoot}-notice`,
};
