import { __assign } from "tslib";
export var DefaultCComponentConfigEn = Object.freeze({
    'CInfoSection.List': { layout: 'vertical' },
    CForm: { layout: 'vertical', requiredSymbol: { position: 'end' } },
    CFeeCalculator: { theme: 'en' },
    CConfigPreview: { infoPreview: { layout: 'inline-vertical' } },
});
export var defineEnCComponentConfig = function (config) {
    if (config) {
        var defaultConfig = __assign({}, DefaultCComponentConfigEn);
        return Object.keys(config).reduce(function (prev, current) {
            var componentConfig = config[current];
            prev[current] = Object.prototype.hasOwnProperty.call(prev, current)
                ? __assign(__assign({}, prev[current]), componentConfig) : componentConfig;
            return prev;
        }, defaultConfig);
    }
    return DefaultCComponentConfigEn;
};
//# sourceMappingURL=themes.js.map