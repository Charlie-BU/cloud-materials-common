import { useRequest } from 'ahooks';
import React, { useImperativeHandle } from 'react';
import CLoadingV2 from '../CLoadingV2';
import type { CAsyncContentProps, CAsyncContentRef } from './interface';
import { isNil } from 'lodash-es';

const CAsyncContent = React.forwardRef<CAsyncContentRef<any>, CAsyncContentProps<any>>(
  ({ fetcher, children, requestOptions, cLoadingProps, placeholder }, ref) => {
    const request = useRequest(fetcher, requestOptions);
    const { loading, data, error, refresh } = request;

    useImperativeHandle(ref, () => request);

    return (
      <CLoadingV2
        isBlock
        type="block"
        hasError={Boolean(error)}
        loading={loading}
        onReload={refresh}
        {...cLoadingProps}
      >
        {isNil(data) ? placeholder ?? <div style={{ minHeight: 136 }} /> : children(data, request)}
      </CLoadingV2>
    );
  },
);

CAsyncContent.displayName = 'CAsyncContent';

export default CAsyncContent as <T>(
  props: CAsyncContentProps<T> & { ref?: React.Ref<CAsyncContentRef<T>> },
) => React.ReactElement;
