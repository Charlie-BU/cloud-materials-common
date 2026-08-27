"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalFormStep = void 0;
var tslib_1 = require("tslib");
var maskableComponent_1 = require("../_factory/maskableComponent");
var CForm_1 = tslib_1.__importDefault(require("../CForm"));
var Base_1 = require("./Base");
exports.ModalFormStep = (0, maskableComponent_1.createBuiltInForm)(Base_1.BaseCModalComponent, 'stepConfig', {
    defaultProps: { maskClosable: false },
    componentName: 'CModal.FormStep',
})(CForm_1.default);
//# sourceMappingURL=ModalFormStep.js.map