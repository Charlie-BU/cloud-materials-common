import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import { feePrefix } from './prefix';

const cssPrefix = classNamePrefixFactory(feePrefix);

export const testId = {
  numInput: cssPrefix`num-input`,
  durationSelect: cssPrefix`duration-select`,
  loadingText: cssPrefix`loading-text`,
  container: cssPrefix`container`,
  priceInfoItem: cssPrefix`price-node`,
  priceNodeTitle: cssPrefix`price-node-title`,
  priceNodeDescription: cssPrefix`price-node-description`,
  priceNodeContent: cssPrefix`price-node-content`,
  priceNodeDiscount: cssPrefix`price-node-discount`,
  popoverTable: cssPrefix`price-popoverTable`,
};
