"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCModal = void 0;
var tslib_1 = require("tslib");
var maskableComponent_1 = require("../_factory/maskableComponent");
var useCModal = function (props) {
    return (0, maskableComponent_1.useBaseMaskable)(tslib_1.__assign(tslib_1.__assign({}, props), { componentName: 'CModal' }));
};
exports.useCModal = useCModal;
//# sourceMappingURL=hooks.js.map