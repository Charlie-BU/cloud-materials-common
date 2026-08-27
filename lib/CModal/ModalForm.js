"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var maskableComponent_1 = require("../_factory/maskableComponent");
var CForm_1 = tslib_1.__importDefault(require("../CForm"));
var Base_1 = require("./Base");
var ModalForm = (0, maskableComponent_1.createBuiltInForm)(Base_1.BaseCModalComponent, 'config', {
    defaultProps: {
        maskClosable: false,
        okButtonProps: {
            // @ts-ignore
            'data-testid': Base_1.testId.okBtn,
        },
        cancelButtonProps: {
            // @ts-ignore
            'data-testid': Base_1.testId.cancelBtn,
        },
    },
    componentName: 'CModal.Form',
})(CForm_1.default);
exports.default = ModalForm;
//# sourceMappingURL=ModalForm.js.map