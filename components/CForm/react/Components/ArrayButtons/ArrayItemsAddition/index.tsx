import React from 'react';
import type { CArrayBaseAddition } from '../ArrayBaseAddition';
import ArrayBaseAddition from '../ArrayBaseAddition';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory('cform-array-items-addition');

const ArrayItemsAddition: React.FC<CArrayBaseAddition> = props => {
  return (
    <div className={cssPrefix``}>
      <ArrayBaseAddition {...props} />
    </div>
  );
};

ArrayItemsAddition.displayName = 'ArrayAddition';

export default ArrayItemsAddition;
