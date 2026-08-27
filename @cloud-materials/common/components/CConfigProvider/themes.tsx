import type { CComponentConfig, CConfigProviderProps } from './interface';

export const DefaultCComponentConfigEn: NonNullable<CConfigProviderProps['cComponentConfig']> = Object.freeze({
  'CInfoSection.List': { layout: 'vertical' },
  CForm: { layout: 'vertical', requiredSymbol: { position: 'end' } },
  CFeeCalculator: { theme: 'en' },
  CConfigPreview: { infoPreview: { layout: 'inline-vertical' } },
});

export const defineEnCComponentConfig = (
  config?: CConfigProviderProps['cComponentConfig'],
): NonNullable<CConfigProviderProps['cComponentConfig']> => {
  if (config) {
    const defaultConfig: Record<string, any> = { ...DefaultCComponentConfigEn };
    return Object.keys(config).reduce((prev, current) => {
      const componentConfig = config[current as keyof CComponentConfig];
      prev[current] = Object.prototype.hasOwnProperty.call(prev, current)
        ? {
            ...prev[current],
            ...componentConfig,
          }
        : componentConfig;

      return prev;
    }, defaultConfig);
  }

  return DefaultCComponentConfigEn;
};
