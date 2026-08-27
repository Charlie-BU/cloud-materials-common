import type { ReactText } from 'react';
import React from 'react';
import type { CCheckboxGroupProps } from './interface';

export const GroupConfigContext = React.createContext<CCheckboxGroupProps<ReactText>>({
  textLineType: 'single',
  horizontalLayout: 'center',
  iconLayout: 'left',
  widthSize: 'default',
  heightSize: 'default',
  checkboxProps: {},
});
