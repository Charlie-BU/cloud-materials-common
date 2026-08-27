import { __assign } from "tslib";
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@storage-fe/formily-arco';
import { DefaultLayout } from '../const';
import SchemaField from './register';
var CFormSchema = forwardRef(function (props, ref) {
    var schemaField = props.schemaField, formProps = props.formProps, _a = props.formLayOutProps, formLayOutProps = _a === void 0 ? DefaultLayout : _a;
    var form = useMemo(function () {
        return createForm(__assign({ validateFirst: true }, formProps));
    }, []);
    //挂ref
    useImperativeHandle(ref, function () { return form; });
    return (React.createElement(FormProvider, { form: form },
        React.createElement(FormLayout, __assign({}, formLayOutProps),
            React.createElement(SchemaField, __assign({}, schemaField)))));
});
CFormSchema.displayName = 'CFormSchema';
export default CFormSchema;
//# sourceMappingURL=index.js.map