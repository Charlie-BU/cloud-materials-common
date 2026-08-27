"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormDetail = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var lodash_es_1 = require("lodash-es");
var Detail_1 = tslib_1.__importDefault(require("./Detail"));
var hooks_1 = require("@storage-fe/formily-arco/es/FormStep/hooks");
var utils_1 = require("../../../shared/utils");
var DefaultText = '-';
var useFormDetail = function (props) {
    var detail = props.detail, labelWidth = props.labelWidth;
    var formStep = (0, hooks_1.useFormStep)();
    var form = (0, react_2.useForm)();
    var values = form.values;
    var cloneDetail = (0, react_1.useMemo)(function () { return (0, lodash_es_1.cloneDeep)(detail); }, [detail]);
    // TODO:下面这坨逻辑时间复杂度高，需要优化写法
    cloneDetail.forEach(function (step) {
        step.section = step.section.filter(function (item) {
            if ((0, lodash_es_1.isFunction)(item.hidden)) {
                return !item.hidden(values, form);
            }
            return true;
        });
        step.section.forEach(function (section) {
            // @ts-ignore
            section.fields = section.fields
                .filter(function (item) {
                if ((0, lodash_es_1.isString)(item)) {
                    return true;
                }
                if ((0, lodash_es_1.isPlainObject)(item)) {
                    var value = (item === null || item === void 0 ? void 0 : item.name) ? values[item.name] : '';
                    return (0, lodash_es_1.isFunction)(item.hidden) ? !item.hidden(value, values, form) : !item.hidden;
                }
                return true;
            })
                .map(function (item) {
                var _a, _b, _c, _d, _e, _f;
                if ((0, lodash_es_1.isString)(item)) {
                    var field = form.getFieldState(item);
                    var label = (_a = field === null || field === void 0 ? void 0 : field.title) !== null && _a !== void 0 ? _a : item;
                    var value_1 = values[item] || DefaultText;
                    var mapValue = (_b = ((field === null || field === void 0 ? void 0 : field.dataSource) || []).find(function (ele) { return ele.value === value_1; })) === null || _b === void 0 ? void 0 : _b.label;
                    return {
                        label: label,
                        content: mapValue !== null && mapValue !== void 0 ? mapValue : value_1,
                        hidden: false,
                    };
                }
                if ((0, lodash_es_1.isPlainObject)(item)) {
                    var field = (item === null || item === void 0 ? void 0 : item.name) ? form.getFieldState(item.name) : {};
                    var value_2 = (item === null || item === void 0 ? void 0 : item.name) ? values[item.name] : '';
                    var label = (0, lodash_es_1.isFunction)(item.label)
                        ? item.label(value_2, values, form)
                        : (_d = (_c = item === null || item === void 0 ? void 0 : item.label) !== null && _c !== void 0 ? _c : field === null || field === void 0 ? void 0 : field.title) !== null && _d !== void 0 ? _d : item === null || item === void 0 ? void 0 : item.name;
                    var formatValue = (0, lodash_es_1.isFunction)(item.formatter) ? item.formatter(value_2, values, form) : void 0;
                    var hidden = (0, lodash_es_1.isFunction)(item.hidden) ? !!item.hidden(value_2, values, form) : !!item.hidden;
                    var mapValue = (_e = ((field === null || field === void 0 ? void 0 : field.dataSource) || []).find(function (item) { return item.value === value_2; })) === null || _e === void 0 ? void 0 : _e.label;
                    return tslib_1.__assign(tslib_1.__assign({}, (0, lodash_es_1.omit)(item, ['name', 'formatter'])), { label: label, content: (_f = formatValue !== null && formatValue !== void 0 ? formatValue : mapValue) !== null && _f !== void 0 ? _f : value_2, hidden: hidden, labelStyle: tslib_1.__assign(tslib_1.__assign({}, (item.labelStyle || {})), { 
                            // 无label情况
                            display: label ? 'flex' : 'none' }) });
                }
                return item;
            });
        });
    });
    var onEdit = function (step, section) {
        var _a, _b;
        formStep.setCurrent(step);
        if (section) {
            // @ts-ignore
            var address = (_b = (_a = form.query(section)) === null || _a === void 0 ? void 0 : _a.addresses) === null || _b === void 0 ? void 0 : _b[0];
            if (address) {
                var dom = document.getElementById((0, utils_1.getFormFieldId)(address));
                dom === null || dom === void 0 ? void 0 : dom.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    };
    return {
        onEdit: onEdit,
        form: form,
        values: values,
        labelWidth: labelWidth,
        detail: cloneDetail,
    };
};
exports.useFormDetail = useFormDetail;
exports.default = (function (props) {
    var detail = props.detail;
    if (!detail) {
        return null;
    }
    var config = (0, exports.useFormDetail)(props);
    return react_1.default.createElement(Detail_1.default, tslib_1.__assign({}, config));
});
//# sourceMappingURL=CFormDetail.js.map