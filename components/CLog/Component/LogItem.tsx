import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import type { LogDataItem } from '../interface';
import { transformAnsi } from '../util';
import Ansi from './ansi';
import { testId } from '../dataCy';

interface LogItemProps {
  showSerialNumber?: boolean;
  serialNumberType?: 'number' | 'time';
  data: LogDataItem;
  index: number;
  serialWidth?: number;
  keyWord?: string;
  formatSerial?: (val: string | number) => string;
  onClickItem?: (val: LogDataItem) => void;
}

const Serial = ({ serial, serialWidth }: { serial: string; serialWidth?: number }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('log');
  return (
    <div className={cssPrefix`item-serial`} style={{ minWidth: serialWidth }}>
      {serial}
    </div>
  );
};

const LogItem = (props: LogItemProps) => {
  const { showSerialNumber, serialNumberType, data, index, serialWidth, keyWord, formatSerial, onClickItem } = props;
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('log');

  // NOTE: 只支持object 的格式，数据中包含 Time， 如果是 string 要如何处理
  const serial =
    serialNumberType === 'time' && typeof data !== 'string' && data.Time
      ? `[${formatSerial?.(data?.Time) ?? data?.Time}]`
      : `${index}`;
  const content = typeof data === 'object' ? transformAnsi(data?.Log) : transformAnsi(data);

  return (
    <div
      className={cssPrefix`item`}
      onClick={() => onClickItem?.(data)}
      data-cy={testId.logItem}
      data-testid={testId.logItem}
    >
      {showSerialNumber && <Serial serial={serial} serialWidth={serialWidth} />}
      <Ansi searchText={keyWord}>{content}</Ansi>
    </div>
  );
};

export { LogItem, Serial };
