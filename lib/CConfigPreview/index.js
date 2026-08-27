"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var InfoPreview_1 = tslib_1.__importDefault(require("./components/InfoPreview"));
var CFeeCalculator_1 = tslib_1.__importDefault(require("../CFeeCalculator"));
var CAgreement_1 = tslib_1.__importDefault(require("../CAgreement"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var utils_1 = require("./utils");
var ahooks_1 = require("ahooks");
var lodash_es_1 = require("lodash-es");
var FormItem = web_react_1.Form.Item;
var cssPrefix = (0, classNamePrefixFactory_1.default)(utils_1.comPrefix);
var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
};
var CConfigPreview = function (props) {
    var _a, _b, _c;
    var _d = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _d.useCssPrefix, locale = _d.locale;
    var containerRef = (0, react_1.useRef)(null);
    var cssPrefix = useCssPrefix(utils_1.comPrefix);
    var _e = props.maxHeight, maxHeight = _e === void 0 ? 600 : _e, infoPreview = props.infoPreview, agreementConfig = props.agreementConfig, feeConfig = props.feeConfig, watchedForm = props.watchedForm, submitButtonConfig = props.submitButtonConfig, onSubmit = props.onSubmit, beforeSubmit = props.beforeSubmit, style = props.style, className = props.className;
    // 监听container容器高度的变化
    var size = (0, ahooks_1.useSize)(containerRef);
    // 监听计费组件的依赖变化
    var formValues = web_react_1.Form.useWatch((_a = feeConfig === null || feeConfig === void 0 ? void 0 : feeConfig.deps) !== null && _a !== void 0 ? _a : [], watchedForm);
    // formValues的合并：依赖关联的formValues会覆盖用户传入的
    var mergedFormVaues = Object.assign({}, (_b = feeConfig === null || feeConfig === void 0 ? void 0 : feeConfig.formValues) !== null && _b !== void 0 ? _b : {}, formValues);
    var _f = tslib_1.__read(web_react_1.Form.useForm(), 1), previewForm = _f[0];
    var fieldPrefix = utils_1.comPrefix;
    var processMaxHeight = (0, react_1.useCallback)(function () {
        var container = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current;
        var listContainer = document.getElementById(utils_1.listContainerId);
        if (!container.offsetHeight || !listContainer.offsetHeight)
            return;
        // 重新计算配置详情组件的max-height前重置max-height，避免用户自定义的显隐逻辑无法触发高度的重新计算
        listContainer.style.maxHeight = '';
        // 高度小于等于最大高度，不做操作
        if (container.offsetHeight <= maxHeight)
            return;
        // 高度大于最大高度，限制列表区域的高度
        var redundantHeight = container.offsetHeight - maxHeight;
        listContainer.style.maxHeight = Math.max(listContainer.offsetHeight - redundantHeight, 50) + 'px';
    }, []);
    (0, react_1.useEffect)(function () {
        processMaxHeight();
    }, [size]);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), className), style: style, ref: containerRef, "data-cy": testId.container, "data-testid": testId.container },
        react_1.default.createElement(web_react_1.Form, { labelCol: { span: 0 }, form: previewForm, wrapperCol: { span: 24 } },
            infoPreview ? (react_1.default.createElement(FormItem, { label: "", field: "".concat(fieldPrefix, "-info") },
                react_1.default.createElement(InfoPreview_1.default, tslib_1.__assign({}, infoPreview, { form: watchedForm })),
                react_1.default.createElement(web_react_1.Divider, { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["divider"], ["divider"])))) }))) : null,
            feeConfig ? (react_1.default.createElement(FormItem, { label: "", field: "".concat(fieldPrefix, "-fee"), className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["fee-formitem"], ["fee-formitem"]))) },
                react_1.default.createElement(CFeeCalculator_1.default, tslib_1.__assign({}, feeConfig, { formValues: mergedFormVaues })))) : null,
            agreementConfig ? (react_1.default.createElement(FormItem, { label: "", field: "".concat(fieldPrefix, "-agree"), rules: [
                    {
                        validator: function (value, callback) {
                            if (value)
                                callback();
                            else
                                callback(' ');
                        },
                    },
                ] }, function (_, form) {
                // 获取错误状态
                var errorObj = form.getFieldError("".concat(fieldPrefix, "-agree"));
                return (react_1.default.createElement(CAgreement_1.default, tslib_1.__assign({ validateStatusError: errorObj ? true : false }, agreementConfig, { className: (0, classnames_1.default)(agreementConfig === null || agreementConfig === void 0 ? void 0 : agreementConfig.className, cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["agree"], ["agree"])))) })));
            })) : null,
            submitButtonConfig ? (react_1.default.createElement(FormItem, { field: "".concat(fieldPrefix, "-submit") },
                react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "primary" }, submitButtonConfig, { className: (0, classnames_1.default)(submitButtonConfig === null || submitButtonConfig === void 0 ? void 0 : submitButtonConfig.className, cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["submit"], ["submit"])))), onClick: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var watchedFormErrors, previewFormErrors, validateStatus, e_1, goOnSubmit, formValues, previewFormValues, feeConfig;
                        var _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    validateStatus = 'success';
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, Promise.all([watchedForm.validate(), previewForm.validate()])];
                                case 2:
                                    _c.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _c.sent();
                                    console.error(e_1);
                                    validateStatus = 'failed';
                                    // 收集具体的错误信息，供beforeSubmit自定义消费
                                    watchedFormErrors = watchedForm.getFieldsError();
                                    previewFormErrors = previewForm.getFieldsError();
                                    return [3 /*break*/, 4];
                                case 4: return [4 /*yield*/, (beforeSubmit === null || beforeSubmit === void 0 ? void 0 : beforeSubmit({ watchedFormErrors: watchedFormErrors, previewFormErrors: previewFormErrors }))];
                                case 5:
                                    goOnSubmit = _c.sent();
                                    // 1. 校验失败：终止提交流程
                                    // 2. 定义了beforeSubmit，但beforeSubmit返回false：终止流程
                                    if (validateStatus === 'failed' || goOnSubmit === false)
                                        return [2 /*return*/];
                                    formValues = watchedForm.getFieldsValue();
                                    previewFormValues = previewForm.getFieldsValue();
                                    feeConfig = (0, lodash_es_1.omitBy)({
                                        num: (_a = previewFormValues === null || previewFormValues === void 0 ? void 0 : previewFormValues["".concat(fieldPrefix, "-fee")]) === null || _a === void 0 ? void 0 : _a.num,
                                        duration: (_b = previewFormValues === null || previewFormValues === void 0 ? void 0 : previewFormValues["".concat(fieldPrefix, "-fee")]) === null || _b === void 0 ? void 0 : _b.duration,
                                    }, lodash_es_1.isUndefined);
                                    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(formValues, feeConfig);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }), (_c = submitButtonConfig === null || submitButtonConfig === void 0 ? void 0 : submitButtonConfig.children) !== null && _c !== void 0 ? _c : locale.CConfigPreview.submitMsg))) : null)));
};
CConfigPreview.displayName = 'CConfigPreview';
exports.default = CConfigPreview;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map