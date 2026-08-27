"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var CTable_1 = tslib_1.__importDefault(require("../../../../CTable"));
var CInfoSection_1 = tslib_1.__importDefault(require("../../../../CInfoSection"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
exports.default = (function (props) {
    var detail = props.detail, _a = props.labelWidth, labelWidth = _a === void 0 ? 'normal' : _a, values = props.values, form = props.form, _b = props.onEdit, onEdit = _b === void 0 ? function () { } : _b;
    if (!detail) {
        return null;
    }
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('form-confirm');
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) }, detail.map(function (step, stepIndex) {
        var _a;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)((_a = {},
                _a[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["wrap"], ["wrap"])))] = stepIndex !== detail.length - 1,
                _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["wrap-last"], ["wrap-last"])))] = stepIndex === detail.length - 1,
                _a)), key: step.title },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["step"], ["step"]))) },
                react_1.default.createElement(web_react_1.Space, null,
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["title"], ["title"]))) },
                        " ",
                        step.title),
                    step.edit && react_1.default.createElement(icon_1.IconEdit, { onClick: function () { return onEdit(stepIndex); } }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(CTable_1.default, { config: tslib_1.__assign({ columns: step.section.map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, (item.columnConfig || {})), { dataIndex: item.title, title: (react_1.default.createElement(web_react_1.Space, null,
                                react_1.default.createElement("span", null,
                                    " ",
                                    item.title),
                                item.editAnchor && (react_1.default.createElement(icon_1.IconEdit, { onClick: function () { return onEdit(stepIndex, typeof item.editAnchor === 'string' ? item.editAnchor : ''); } })))), render: function (col) {
                                if ((0, lodash_es_1.isFunction)(item === null || item === void 0 ? void 0 : item.customRender)) {
                                    // 用户自定义当前列渲染
                                    return item === null || item === void 0 ? void 0 : item.customRender(values, col, form);
                                }
                                return (react_1.default.createElement(CInfoSection_1.default.List, { wrapperStyle: {
                                        marginTop: 0,
                                    }, colNumber: 1, listData: [
                                        {
                                            title: '',
                                            infoItemList: col,
                                        },
                                    ], labelWidth: labelWidth }));
                            } })); }), data: [
                            step.section.reduce(function (prev, curr) {
                                prev[curr.title] = curr.fields;
                                return prev;
                            }, {}),
                        ], pagination: false }, (step.CTableProps || {})) }))));
    })));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Detail.js.map