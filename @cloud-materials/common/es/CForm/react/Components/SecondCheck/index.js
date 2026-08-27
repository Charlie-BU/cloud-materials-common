import { omit, isEqual } from 'lodash-es';
import { Modal } from '@arco-design/web-react';
export var openSecondCheckModal = function (params) {
    var _a, _b, _c;
    var onOk = params.onOk, form = params.form, unMountCFormSecondCheck = params.unMountCFormSecondCheck, locale = params.locale;
    var isEqualOmited = function (initialValues, values, excludes) {
        var initialValuesOmited = omit(initialValues, excludes);
        var valuesOmited = omit(values, excludes);
        return isEqual(initialValuesOmited, valuesOmited);
    };
    var excludes = typeof unMountCFormSecondCheck === 'object' ? (_a = unMountCFormSecondCheck.excludes) !== null && _a !== void 0 ? _a : [] : [];
    var customEqual = typeof unMountCFormSecondCheck === 'object' ? unMountCFormSecondCheck.customEqual : undefined;
    if (unMountCFormSecondCheck &&
        (customEqual ? !customEqual(form) : !isEqualOmited(form.initialValues, form.values, excludes))) {
        var title = typeof unMountCFormSecondCheck === 'object'
            ? (_b = unMountCFormSecondCheck.title) !== null && _b !== void 0 ? _b : locale.CForm.secondCheck.title
            : locale.CForm.secondCheck.title;
        var content = typeof unMountCFormSecondCheck === 'object'
            ? (_c = unMountCFormSecondCheck.content) !== null && _c !== void 0 ? _c : locale.CForm.secondCheck.content
            : locale.CForm.secondCheck.content;
        Modal.confirm({
            title: title,
            content: content,
            okText: locale.CForm.secondCheck.cancelText,
            cancelText: locale.CForm.secondCheck.confirmText,
            onCancel: function () { return onOk === null || onOk === void 0 ? void 0 : onOk(); },
        });
    }
    else {
        onOk === null || onOk === void 0 ? void 0 : onOk();
    }
};
//# sourceMappingURL=index.js.map