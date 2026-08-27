"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMaskableContext = exports.MaskableProvider = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importStar(require("react"));
var MaskableContext = react_1.default.createContext({
    setOnOkGuardPool: lodash_es_1.noop,
    onOkGuardPool: [],
});
var MaskableProvider = function (_a) {
    var children = _a.children;
    var _b = tslib_1.__read((0, react_1.useState)([]), 2), onOkGuardPool = _b[0], setOnOkGuardPool = _b[1];
    return react_1.default.createElement(MaskableContext.Provider, { value: { onOkGuardPool: onOkGuardPool, setOnOkGuardPool: setOnOkGuardPool } }, children);
};
exports.MaskableProvider = MaskableProvider;
var useMaskableContext = function () { return (0, react_1.useContext)(MaskableContext); };
exports.useMaskableContext = useMaskableContext;
//# sourceMappingURL=MaskableProvider.js.map