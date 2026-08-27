import type { ReactElement } from 'react';
import React from 'react';
import type { SelectProps } from '@arco-design/web-react';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';
declare const SingleSelect: (props: {
    popSelectRef?: React.MutableRefObject<SelectHandle | null> | undefined;
} & SelectProps) => ReactElement;
export default SingleSelect;
