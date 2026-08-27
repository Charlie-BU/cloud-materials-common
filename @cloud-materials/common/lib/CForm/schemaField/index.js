"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var core_1 = require("@formily/core");
var react_2 = require("@formily/react");
var formily_arco_1 = require("@storage-fe/formily-arco");
var const_1 = require("../const");
var register_1 = tslib_1.__importDefault(require("./register"));
var CFormSchema = (0, react_1.forwardRef)(function (props, ref) {
    var schemaField = props.schemaField, formProps = props.formProps, _a = props.formLayOutProps, formLayOutProps = _a === void 0 ? const_1.DefaultLayout : _a;
    var form = (0, react_1.useMemo)(function () {
        return (0, core_1.createForm)(tslib_1.__assign({ validateFirst: true }, formProps));
    }, []);
    //挂ref
    (0, react_1.useImperativeHandle)(ref, function () { return form; });
    return (react_1.default.createElement(react_2.FormProvider, { form: form },
        react_1.default.createElement(formily_arco_1.FormLayout, tslib_1.__assign({}, formLayOutProps),
            react_1.default.createElement(register_1.default, tslib_1.__assign({}, schemaField)))));
});
CFormSchema.displayName = 'CFormSchema';
exports.default = CFormSchema;
//# sourceMappingURL=index.js.map