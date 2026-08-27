"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDrawerArcoForm = exports.CDrawerFormStep = exports.CDrawerDetail = exports.CDrawerForm = exports.default = void 0;
var tslib_1 = require("tslib");
var maskableComponent_1 = require("../_factory/maskableComponent");
var DrawerArcoForm_1 = tslib_1.__importDefault(require("./DrawerArcoForm"));
exports.CDrawerArcoForm = DrawerArcoForm_1.default;
var Base_1 = tslib_1.__importDefault(require("./Base"));
var DrawerForm_1 = tslib_1.__importDefault(require("./DrawerForm"));
exports.CDrawerForm = DrawerForm_1.default;
var DrawerFormStep_1 = tslib_1.__importDefault(require("./DrawerFormStep"));
exports.CDrawerFormStep = DrawerFormStep_1.default;
var DrawerDetail_1 = tslib_1.__importDefault(require("./DrawerDetail"));
exports.CDrawerDetail = DrawerDetail_1.default;
var CDrawer = (0, maskableComponent_1.createMaskableComponent)(Base_1.default, {
    Form: DrawerForm_1.default,
    Detail: DrawerDetail_1.default,
    ArcoForm: DrawerArcoForm_1.default,
    FormStep: DrawerFormStep_1.default,
});
exports.default = CDrawer;
//# sourceMappingURL=index.js.map