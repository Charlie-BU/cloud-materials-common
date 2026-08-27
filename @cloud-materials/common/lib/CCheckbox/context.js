"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupConfigContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
exports.GroupConfigContext = react_1.default.createContext({
    textLineType: 'single',
    horizontalLayout: 'center',
    iconLayout: 'left',
    widthSize: 'default',
    heightSize: 'default',
    checkboxProps: {},
});
//# sourceMappingURL=context.js.map