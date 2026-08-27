import React from 'react';
import cs from 'classnames';

import { useCConfigContext } from '../../CConfigProvider';
import type { CStatisticListProps, CStatisticListItemProps, CStatisticListCountdownItemProps } from '../interface';
import CStatistic, { testId } from '../index';

const CStatisticList: React.FC<CStatisticListProps> = props => {
  const { style, className, children, title, list = [] } = props;
  const { useCssPrefix } = useCConfigContext();
  const classPrefix = useCssPrefix('statistic');
  return (
    <div style={style} className={cs(classPrefix`list`, className)} data-testid={testId.listWrapper}>
      {title && (
        <div className={classPrefix`list-title`} data-testid={testId.listTitle} data-cy>
          {title}
        </div>
      )}
      <div className={classPrefix`list-content`}>
        {list.map((item, idx) => {
          return item.isCountdown ? (
            <CStatistic.Countdown key={idx} {...(item as CStatisticListCountdownItemProps)} border={false} />
          ) : (
            <CStatistic key={idx} {...(item as CStatisticListItemProps)} border={false} />
          );
        })}
        {children}
      </div>
    </div>
  );
};
export default CStatisticList;
