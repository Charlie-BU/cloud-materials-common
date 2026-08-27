"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailPageProvider = exports.DetailPageContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.DetailPageContext = (0, react_1.createContext)({});
var DetailPageProvider = function (props) {
    return react_1.default.createElement(exports.DetailPageContext.Provider, { value: props === null || props === void 0 ? void 0 : props.detailPage }, props.children);
};
exports.DetailPageProvider = DetailPageProvider;
//# sourceMappingURL=DetailPage.js.map