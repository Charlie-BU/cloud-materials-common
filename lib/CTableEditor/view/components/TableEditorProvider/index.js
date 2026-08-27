"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEditorProvider = exports.TableEditorContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.TableEditorContext = (0, react_1.createContext)(null);
var TableEditorProvider = function (props) {
    return react_1.default.createElement(exports.TableEditorContext.Provider, { value: props.tableEditor }, props.children);
};
exports.TableEditorProvider = TableEditorProvider;
//# sourceMappingURL=index.js.map