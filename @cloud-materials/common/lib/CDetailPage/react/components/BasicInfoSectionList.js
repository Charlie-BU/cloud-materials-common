"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicInfoSectionListProvider = exports.BasicInfoSectionContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.BasicInfoSectionContext = (0, react_1.createContext)({});
var BasicInfoSectionListProvider = function (props) {
    return (react_1.default.createElement(exports.BasicInfoSectionContext.Provider, { value: props === null || props === void 0 ? void 0 : props.infoSectionList }, props.children));
};
exports.BasicInfoSectionListProvider = BasicInfoSectionListProvider;
//# sourceMappingURL=BasicInfoSectionList.js.map