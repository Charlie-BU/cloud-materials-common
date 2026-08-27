import React from 'react';
import type { CTableTransferProps } from '../../../../CTableTransfer/interface';
export interface ICFormTableTransfer extends CTableTransferProps {
    value?: CTableTransferProps['defaultSelectedValues'];
}
declare const CFormTableTransfer: React.MemoExoticComponent<import("@formily/react").ReactFC<ICFormTableTransfer>>;
export default CFormTableTransfer;
