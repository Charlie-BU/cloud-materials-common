import type { FC, CSSProperties } from 'react';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';

export interface WordProps {
  onClick?: () => void;
  style?: CSSProperties;
  value?: string;
}

const Word: FC<WordProps> = props => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('info-section');
  return (
    <span onClick={props.onClick} className={cssPrefix`word-editor`} style={{ ...props.style }}>
      {props.value}
    </span>
  );
};

export default Word;
