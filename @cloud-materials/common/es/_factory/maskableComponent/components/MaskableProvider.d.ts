import React from 'react';
export type GuardCallback = () => boolean | Promise<boolean>;
interface MaskableProviderType {
    setOnOkGuardPool: React.Dispatch<React.SetStateAction<GuardCallback[]>>;
    onOkGuardPool: Array<GuardCallback>;
}
export declare const MaskableProvider: React.FC;
export declare const useMaskableContext: () => MaskableProviderType;
export {};
