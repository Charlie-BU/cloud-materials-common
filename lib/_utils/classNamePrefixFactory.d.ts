export declare const GLOBAL_PREFIX = "c-m";
export declare const createCssPrefix: (prefix: string, componentName: string) => (string: TemplateStringsArray, ...params: any[]) => string;
declare const classNamePrefixFactory: (componentName: string) => (string: TemplateStringsArray, ...params: any[]) => string;
export default classNamePrefixFactory;
