import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const loadingPrefix = classNamePrefixFactory('loading');
const resultPrefix = classNamePrefixFactory('result');
const spinPrefix = classNamePrefixFactory('spin');

export const TEST_ID = {
  loading: loadingPrefix``,
  spin: spinPrefix``,
  result: resultPrefix``,
};
