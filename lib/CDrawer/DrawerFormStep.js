"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var maskableComponent_1 = require("../_factory/maskableComponent");
var CForm_1 = tslib_1.__importDefault(require("../CForm"));
var Base_1 = require("./Base");
var MaskablePlugin_1 = tslib_1.__importDefault(require("./MaskablePlugin"));
var DrawerFormStep = (0, maskableComponent_1.createBuiltInForm)(Base_1.BaseCDrawerComponent, 'stepConfig', {
    plugin: MaskablePlugin_1.default,
    defaultProps: { maskClosable: false },
    componentName: 'CDrawer.FormStep',
})(CForm_1.default);
exports.default = DrawerFormStep;
//# sourceMappingURL=DrawerFormStep.js.map