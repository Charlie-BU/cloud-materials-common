import React from 'react';
import type { CRadioGroupProps } from './interface';

const GroupConfigContext = React.createContext<CRadioGroupProps>({
  textLineType: 'single',
  horizontalLayout: 'center',
  iconLayout: 'left',
  widthSize: 'default',
  heightSize: 'default',
  radioProps: {},
});

export default GroupConfigContext;
