import React from 'react';
import type { CDetailProps } from './interface';
export declare const testId: {
    container: string;
};
declare function CDetail(props: CDetailProps): JSX.Element;
declare namespace CDetail {
    var displayName: string;
    var CDetailHeader: React.ForwardRefExoticComponent<import("./interface").CDetailHeaderProps & React.RefAttributes<unknown>>;
    var CDetailContentWrapper: typeof import("./CDetailContentWrapper").default;
}
export default CDetail;
