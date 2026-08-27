import { __assign, __read, __rest } from "tslib";
import React from 'react';
import { Form } from '@arco-design/web-react';
import BaseCModal from './Base';
import { createStaticMethods } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
var ModalArcoFormComponent = React.forwardRef(function (props, ref) {
    var _a;
    var _b = useCConfigContext().cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CModal.ArcoForm"], ModalArcoForm = _d === void 0 ? {} : _d;
    var _e = __read(Form.useForm(), 1), form = _e[0];
    var _f = useMergeProps(props, {}, ModalArcoForm), arcoFormProps = _f.arcoFormProps, children = _f.children, onOk = _f.onOk, restProps = __rest(_f, ["arcoFormProps", "children", "onOk"]);
    var realForm = (_a = arcoFormProps === null || arcoFormProps === void 0 ? void 0 : arcoFormProps.form) !== null && _a !== void 0 ? _a : form;
    return (React.createElement(BaseCModal, __assign({ maskClosable: false }, restProps, { onOk: function (e) { return realForm.validate().then(function (v) { return onOk === null || onOk === void 0 ? void 0 : onOk(v, form, e); }); }, ref: ref }),
        React.createElement(Form, __assign({ form: realForm }, arcoFormProps), children)));
});
ModalArcoFormComponent.displayName = 'CModal.ArcoForm';
var TypedModalArcoFormComponent = ModalArcoFormComponent;
var _a = createStaticMethods(TypedModalArcoFormComponent), open = _a.open, restStatics = __rest(_a, ["open"]);
var ModalArcoForm = Object.assign(TypedModalArcoFormComponent, restStatics, {
    open: function (props) { return open(props); },
});
export default ModalArcoForm;
//# sourceMappingURL=ModalArcoForm.js.map