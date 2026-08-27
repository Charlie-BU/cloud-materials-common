import classNames from 'classnames';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import React from 'react';
import { testId } from '../../index';

interface LineProps {
  showRowNumber?: boolean;
  index?: number;
  value: string;
  numberWidth: number;
}

const Line = ({ showRowNumber, index, value, numberWidth }: LineProps) => {
  const cssPrefix = classNamePrefixFactory('code-block');

  return (
    <div className={classNames(cssPrefix`code-content`)}>
      {showRowNumber && (
        <div
          className={classNames(cssPrefix`index`)}
          style={{ width: numberWidth, left: -`${numberWidth + 16}` }}
          data-testid={testId.line}
        >
          {index}
        </div>
      )}
      <div className={classNames(cssPrefix`code-value`)}>{value}</div>
    </div>
  );
};

export default Line;
