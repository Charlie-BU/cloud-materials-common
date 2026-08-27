import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import type { CFormAsyncSelectConfigOption, CFormAsyncSelectOption } from './interface';

const cssPrefix = classNamePrefixFactory('cform-async-select');

export const cformAsyncSelectTestId = {
  container: cssPrefix`container`,
  filter: cssPrefix`filter`,
};
/** 转换 CFormAsyncSelectOption -> CFormAsyncSelectConfigOption */
export const transCFormAsyncSelectOption = (option: CFormAsyncSelectOption): CFormAsyncSelectConfigOption => {
  return typeof option === 'object' ? option : { label: option, value: option };
};

/** 转换 CFormAsyncSelectOption[] -> CFormAsyncSelectConfigOption[] */
export const transCFormAsyncSelectOptions = (options: CFormAsyncSelectOption[]): CFormAsyncSelectConfigOption[] => {
  return options.map(option => (typeof option === 'object' ? option : { label: option, value: option }));
};
