import React, { useContext } from 'react';
import CLoadingV2 from '../CLoadingV2';
import { CConfigContext } from '../CConfigProvider';
import { IconNoDataLowSaturation } from '@arco-design/iconbox-react-ve-o-design';

export const DefaultEmptyContent = () => {
  const { locale } = useContext(CConfigContext);
  return (
    <div>
      <CLoadingV2.Result status={<IconNoDataLowSaturation />} title={locale.CTreeTransfer.noData} />
    </div>
  );
};
