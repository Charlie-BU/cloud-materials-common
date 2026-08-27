import type { FC } from 'react';
import type { CStatusProps, WaitColor } from './interface';
import type { StatusConfigType } from './config';
export declare const IconList: (waitColor: WaitColor) => {
    usable: JSX.Element;
    error: JSX.Element;
    warning: JSX.Element;
    running: JSX.Element;
    wait: JSX.Element;
    disable: JSX.Element;
    loading: JSX.Element;
};
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export interface StatusComponent extends FC<CStatusProps> {
    config: (config: StatusConfigType) => void;
}
declare const ExportedStatusComponent: StatusComponent;
export type { CStatusProps };
export default ExportedStatusComponent;
