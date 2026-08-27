import React from 'react';
import type { CStatisticProps } from './interface';
export declare const testId: {
    container: string;
    title: string;
    describe: string;
    unit: string;
    suffix: string;
    placeholder: string;
    listWrapper: string;
    listTitle: string;
};
declare function CStatistic(props: CStatisticProps): JSX.Element;
declare namespace CStatistic {
    var displayName: string;
    var List: React.FC<import("./interface").CStatisticListProps>;
    var Countdown: React.FC<import("./interface").CCountdownProps>;
}
export default CStatistic;
