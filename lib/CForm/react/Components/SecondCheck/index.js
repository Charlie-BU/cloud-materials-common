"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openSecondCheckModal = void 0;
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var openSecondCheckModal = function (params) {
    var _a, _b, _c;
    var onOk = params.onOk, form = params.form, unMountCFormSecondCheck = params.unMountCFormSecondCheck, locale = params.locale;
    var isEqualOmited = function (initialValues, values, excludes) {
        var initialValuesOmited = (0, lodash_es_1.omit)(initialValues, excludes);
        var valuesOmited = (0, lodash_es_1.omit)(values, excludes);
        return (0, lodash_es_1.isEqual)(initialValuesOmited, valuesOmited);
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
        web_react_1.Modal.confirm({
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
exports.openSecondCheckModal = openSecondCheckModal;
//# sourceMappingURL=index.js.map