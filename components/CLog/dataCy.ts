import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory('log');

export const testId = {
  container: cssPrefix`container`,
  header: cssPrefix`header`,
  operation: cssPrefix`operation`,
  toTop: cssPrefix`toTop`,
  toBottom: cssPrefix`toBottom`,
  logItem: cssPrefix`logItem`,
};
