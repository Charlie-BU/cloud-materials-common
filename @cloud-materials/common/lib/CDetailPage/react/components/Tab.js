"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabProvider = exports.TabContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.TabContext = (0, react_1.createContext)({});
var TabProvider = function (props) {
    return react_1.default.createElement(exports.TabContext.Provider, { value: props.tab }, props.children);
};
exports.TabProvider = TabProvider;
//# sourceMappingURL=Tab.js.map