"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineEnCComponentConfig = exports.DefaultCComponentConfigEn = void 0;
var tslib_1 = require("tslib");
exports.DefaultCComponentConfigEn = Object.freeze({
    'CInfoSection.List': { layout: 'vertical' },
    CForm: { layout: 'vertical', requiredSymbol: { position: 'end' } },
    CFeeCalculator: { theme: 'en' },
    CConfigPreview: { infoPreview: { layout: 'inline-vertical' } },
});
var defineEnCComponentConfig = function (config) {
    if (config) {
        var defaultConfig = tslib_1.__assign({}, exports.DefaultCComponentConfigEn);
        return Object.keys(config).reduce(function (prev, current) {
            var componentConfig = config[current];
            prev[current] = Object.prototype.hasOwnProperty.call(prev, current)
                ? tslib_1.__assign(tslib_1.__assign({}, prev[current]), componentConfig) : componentConfig;
            return prev;
        }, defaultConfig);
    }
    return exports.DefaultCComponentConfigEn;
};
exports.defineEnCComponentConfig = defineEnCComponentConfig;
//# sourceMappingURL=themes.js.map