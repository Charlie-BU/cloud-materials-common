"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("@formily/react");
var react_2 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var cssPrefix = (0, classNamePrefixFactory_1.default)('cform-preview');
var ConfigPreviewComponent = (0, react_1.observer)(function (props) {
    var config = props.config;
    var form = (0, react_1.useForm)();
    var renderItem = function (item) {
        var _a, _b, _c;
        if ((0, lodash_es_1.has)(item, 'customRender')) {
            return (_b = (_a = item).customRender) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        else if ((0, lodash_es_1.has)(item, 'fieldIndex')) {
            var formatter_1 = item.formatter;
            var layout = item.layout;
            var list_1 = {};
            (_c = item.fieldIndex) === null || _c === void 0 ? void 0 : _c.map(function (fieldKeyItem, index) {
                var _a;
                var path = item.fieldIndex[index];
                var field = (_a = form === null || form === void 0 ? void 0 : form.query(path)) === null || _a === void 0 ? void 0 : _a.take();
                var formatterRes = formatter_1 === null || formatter_1 === void 0 ? void 0 : formatter_1({
                    fieldKey: fieldKeyItem,
                    title: field === null || field === void 0 ? void 0 : field.title,
                    value: field === null || field === void 0 ? void 0 : field.value,
                }, form);
                if (!field || !formatterRes)
                    return;
                list_1[fieldKeyItem] = {
                    fieldKey: fieldKeyItem,
                    title: formatterRes.title,
                    value: formatterRes.value,
                };
            });
            var data = Object.values(list_1).map(function (item) { return ({
                label: item.title,
                value: item.value,
            }); });
            return (react_2.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["item-detail"], ["item-detail"]))) },
                react_2.default.createElement(web_react_1.Descriptions, { column: 1, layout: layout, title: null, data: data, style: { marginBottom: 10 } })));
        }
    };
    var renderComponent = function (items) {
        return items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            return (react_2.default.createElement("div", { key: "".concat(index), className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["item"], ["item"]))) },
                item.title ? (react_2.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["item-title"], ["item-title"]))) },
                    react_2.default.createElement("span", null, item.title))) : null,
                renderItem(item)));
        });
    };
    return react_2.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject([""], [""]))) }, renderComponent(config));
});
exports.default = ConfigPreviewComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map