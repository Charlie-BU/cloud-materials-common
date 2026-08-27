/// <reference types="react" />
import type { LogDataItem } from '../interface';
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
declare const Serial: ({ serial, serialWidth }: {
    serial: string;
    serialWidth?: number | undefined;
}) => JSX.Element;
declare const LogItem: (props: LogItemProps) => JSX.Element;
export { LogItem, Serial };
