import React from 'react';

import CLoadingV2 from '../../../../CLoadingV2';

interface Props {
  loading?: boolean;
  error?: boolean;
  onReload?: () => void;
}

export const InfoSectionItemLoading: React.FC<Props> = props => {
  const { loading, error = true, onReload } = props;
  return (
    <CLoadingV2
      type={'inline'}
      hasError={!loading && error}
      loading={loading}
      cSpinProps={{
        size: 15,
      }}
      onReload={onReload}
    />
  );
};
