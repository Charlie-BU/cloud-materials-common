"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CModalFormStep = exports.CModalArcoForm = exports.CModalTable = exports.CModalForm = exports.default = void 0;
var tslib_1 = require("tslib");
var Base_1 = tslib_1.__importDefault(require("./Base"));
var maskableComponent_1 = require("../_factory/maskableComponent");
var ModalArcoForm_1 = tslib_1.__importDefault(require("./ModalArcoForm"));
exports.CModalArcoForm = ModalArcoForm_1.default;
var ModalTable_1 = tslib_1.__importDefault(require("./ModalTable"));
exports.CModalTable = ModalTable_1.default;
var ModalForm_1 = tslib_1.__importDefault(require("./ModalForm"));
exports.CModalForm = ModalForm_1.default;
var copyStaticsFromArcoModal_1 = require("./copyStaticsFromArcoModal");
var ModalFormStep_1 = require("./ModalFormStep");
Object.defineProperty(exports, "CModalFormStep", { enumerable: true, get: function () { return ModalFormStep_1.ModalFormStep; } });
var CModal = (0, copyStaticsFromArcoModal_1.copyStaticsFromArcoModal)((0, maskableComponent_1.createMaskableComponent)(Base_1.default, {
    Form: ModalForm_1.default,
    Table: ModalTable_1.default,
    ArcoForm: ModalArcoForm_1.default,
    FormStep: ModalFormStep_1.ModalFormStep,
}));
exports.default = CModal;
//# sourceMappingURL=index.js.map