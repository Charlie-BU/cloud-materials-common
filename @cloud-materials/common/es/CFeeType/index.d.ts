/// <reference types="react" />
import type { CFeeTypeProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
declare const CFeeType: {
    (props: CFeeTypeProps): JSX.Element;
    /** 注册全局状态映射配置 */
    config: (config: import("./interface").ChargeStatusConfigType) => void;
    displayName: string;
};
export default CFeeType;
