import { __assign } from "tslib";
import React from 'react';
import { ObjectField, useForm } from '@formily/react';
import { toJS } from '@formily/reactive';
import { useRow } from '../../../../CTable';
import { useTableEditor } from '../../hooks';
import { isFunction } from 'lodash-es';
export var RowDecorator = function (props) {
    var row = useRow();
    var form = useForm();
    var tableEditor = useTableEditor();
    var initialValue = toJS(row.data);
    var _formConfig = tableEditor.config.formConfig;
    var formConfig = isFunction(_formConfig) ? _formConfig(tableEditor) : _formConfig;
    var _rowFieldConfig = formConfig === null || formConfig === void 0 ? void 0 : formConfig.rowFieldConfig;
    var rowFieldConfig = isFunction(_rowFieldConfig)
        ? _rowFieldConfig(initialValue, form, tableEditor)
        : _rowFieldConfig;
    return (React.createElement(ObjectField, __assign({ name: row.key, initialValue: toJS(row.data) }, rowFieldConfig), props.children));
};
//# sourceMappingURL=index.js.map