import { __makeTemplateObject } from "tslib";
import { observer, useForm } from '@formily/react';
import React from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has } from 'lodash-es';
import { Descriptions } from '@arco-design/web-react';
var cssPrefix = classNamePrefixFactory('cform-preview');
var ConfigPreviewComponent = observer(function (props) {
    var config = props.config;
    var form = useForm();
    var renderItem = function (item) {
        var _a, _b, _c;
        if (has(item, 'customRender')) {
            return (_b = (_a = item).customRender) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        else if (has(item, 'fieldIndex')) {
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
            return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["item-detail"], ["item-detail"]))) },
                React.createElement(Descriptions, { column: 1, layout: layout, title: null, data: data, style: { marginBottom: 10 } })));
        }
    };
    var renderComponent = function (items) {
        return items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            return (React.createElement("div", { key: "".concat(index), className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["item"], ["item"]))) },
                item.title ? (React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["item-title"], ["item-title"]))) },
                    React.createElement("span", null, item.title))) : null,
                renderItem(item)));
        });
    };
    return React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""]))) }, renderComponent(config));
});
export default ConfigPreviewComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map