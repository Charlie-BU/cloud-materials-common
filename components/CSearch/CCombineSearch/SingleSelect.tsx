import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import type { SelectProps } from '@arco-design/web-react';
import { Select } from '@arco-design/web-react';
import { useCConfigContext } from '../../CConfigProvider';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';

const SingleSelect = (
  props: { popSelectRef?: React.MutableRefObject<SelectHandle | null> } & SelectProps,
): ReactElement => {
  const { popSelectRef, ...restProps } = props;
  const { getCPrefixCls } = useCConfigContext();
  const selectCls = getCPrefixCls('search-combine-select');

  useEffect(() => {
    return () => {
      if (popSelectRef?.current) {
        popSelectRef.current = null;
      }
    };
  }, []);

  return (
    <Select
      {...restProps}
      ref={popSelectRef}
      popupVisible
      getPopupContainer={node => node}
      triggerProps={{
        popupStyle: { boxShadow: 'none', border: 'none' },
        style: { position: 'static' },
      }}
      defaultActiveFirstOption={false}
      triggerElement={<div className={selectCls} />}
    />
  );
};

export default SingleSelect;
