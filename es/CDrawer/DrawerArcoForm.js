import { __assign, __read, __rest } from "tslib";
import React from 'react';
import { Form } from '@arco-design/web-react';
import BaseCDrawer from './Base';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
var DrawerArcoFormComponent = React.forwardRef(function (props, ref) {
    var _a;
    var _b = useCConfigContext().cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CDrawer.ArcoForm"], CDrawerArcoForm = _d === void 0 ? {} : _d;
    var _e = useMergeProps(props, {}, CDrawerArcoForm), arcoFormProps = _e.arcoFormProps, children = _e.children, onOk = _e.onOk, restProps = __rest(_e, ["arcoFormProps", "children", "onOk"]);
    var _f = __read(Form.useForm(), 1), form = _f[0];
    var realForm = (_a = arcoFormProps === null || arcoFormProps === void 0 ? void 0 : arcoFormProps.form) !== null && _a !== void 0 ? _a : form;
    return (React.createElement(BaseCDrawer, __assign({ maskClosable: false }, restProps, { onOk: function (e) { return realForm.validate().then(function (v) { return onOk === null || onOk === void 0 ? void 0 : onOk(v, form, e); }); }, ref: ref }),
        React.createElement(Form, __assign({ form: realForm }, arcoFormProps), children)));
});
var TypedDrawerArcoFormComponent = DrawerArcoFormComponent;
var _a = createStaticMethods(TypedDrawerArcoFormComponent), open = _a.open, restStatics = __rest(_a, ["open"]);
var DrawerArcoForm = Object.assign(TypedDrawerArcoFormComponent, restStatics, {
    open: function (props) { return open(props); },
});
export default DrawerArcoForm;
//# sourceMappingURL=DrawerArcoForm.js.map