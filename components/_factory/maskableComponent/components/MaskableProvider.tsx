import { noop } from 'lodash-es';
import React, { useContext, useState } from 'react';

export type GuardCallback = () => boolean | Promise<boolean>;

interface MaskableProviderType {
  setOnOkGuardPool: React.Dispatch<React.SetStateAction<GuardCallback[]>>;
  onOkGuardPool: Array<GuardCallback>;
}

const MaskableContext = React.createContext<MaskableProviderType>({
  setOnOkGuardPool: noop,
  onOkGuardPool: [],
});

export const MaskableProvider: React.FC = ({ children }) => {
  const [onOkGuardPool, setOnOkGuardPool] = useState<Array<GuardCallback>>([]);

  return <MaskableContext.Provider value={{ onOkGuardPool, setOnOkGuardPool }}>{children}</MaskableContext.Provider>;
};

export const useMaskableContext = () => useContext(MaskableContext);
