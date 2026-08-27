export const GLOBAL_PREFIX = `c-m`;

export const createCssPrefix = (prefix: string, componentName: string) => {
  return (string: TemplateStringsArray, ...params: any[]) => {
    const after = string.map((item, index) => item + (params[index] ?? '')).join('');
    return `${prefix}${componentName ? `-${componentName}` : ''}${after ? `-${after}` : after}`;
  };
};

const classNamePrefixFactory = (componentName: string) => {
  return createCssPrefix(GLOBAL_PREFIX, componentName);
};

export default classNamePrefixFactory;
