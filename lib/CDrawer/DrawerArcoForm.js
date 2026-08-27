"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var Base_1 = tslib_1.__importDefault(require("./Base"));
var maskableComponent_1 = require("../_factory/maskableComponent");
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_1 = require("../hooks");
var DrawerArcoFormComponent = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)().cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CDrawer.ArcoForm"], CDrawerArcoForm = _d === void 0 ? {} : _d;
    var _e = (0, hooks_1.useMergeProps)(props, {}, CDrawerArcoForm), arcoFormProps = _e.arcoFormProps, children = _e.children, onOk = _e.onOk, restProps = tslib_1.__rest(_e, ["arcoFormProps", "children", "onOk"]);
    var _f = tslib_1.__read(web_react_1.Form.useForm(), 1), form = _f[0];
    var realForm = (_a = arcoFormProps === null || arcoFormProps === void 0 ? void 0 : arcoFormProps.form) !== null && _a !== void 0 ? _a : form;
    return (react_1.default.createElement(Base_1.default, tslib_1.__assign({ maskClosable: false }, restProps, { onOk: function (e) { return realForm.validate().then(function (v) { return onOk === null || onOk === void 0 ? void 0 : onOk(v, form, e); }); }, ref: ref }),
        react_1.default.createElement(web_react_1.Form, tslib_1.__assign({ form: realForm }, arcoFormProps), children)));
});
var TypedDrawerArcoFormComponent = DrawerArcoFormComponent;
var _a = (0, maskableComponent_1.createStaticMethods)(TypedDrawerArcoFormComponent), open = _a.open, restStatics = tslib_1.__rest(_a, ["open"]);
var DrawerArcoForm = Object.assign(TypedDrawerArcoFormComponent, restStatics, {
    open: function (props) { return open(props); },
});
exports.default = DrawerArcoForm;
//# sourceMappingURL=DrawerArcoForm.js.map