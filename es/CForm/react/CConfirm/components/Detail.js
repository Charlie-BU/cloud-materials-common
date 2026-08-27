import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { Space } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import CTable from '../../../../CTable';
import CInfoSection from '../../../../CInfoSection';
import { useCConfigContext } from '../../../../CConfigProvider';
export default (function (props) {
    var detail = props.detail, _a = props.labelWidth, labelWidth = _a === void 0 ? 'normal' : _a, values = props.values, form = props.form, _b = props.onEdit, onEdit = _b === void 0 ? function () { } : _b;
    if (!detail) {
        return null;
    }
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('form-confirm');
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) }, detail.map(function (step, stepIndex) {
        var _a;
        return (React.createElement("div", { className: classNames((_a = {},
                _a[cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["wrap"], ["wrap"])))] = stepIndex !== detail.length - 1,
                _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["wrap-last"], ["wrap-last"])))] = stepIndex === detail.length - 1,
                _a)), key: step.title },
            React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["step"], ["step"]))) },
                React.createElement(Space, null,
                    React.createElement("span", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["title"], ["title"]))) },
                        " ",
                        step.title),
                    step.edit && React.createElement(IconEdit, { onClick: function () { return onEdit(stepIndex); } }))),
            React.createElement("div", null,
                React.createElement(CTable, { config: __assign({ columns: step.section.map(function (item) { return (__assign(__assign({}, (item.columnConfig || {})), { dataIndex: item.title, title: (React.createElement(Space, null,
                                React.createElement("span", null,
                                    " ",
                                    item.title),
                                item.editAnchor && (React.createElement(IconEdit, { onClick: function () { return onEdit(stepIndex, typeof item.editAnchor === 'string' ? item.editAnchor : ''); } })))), render: function (col) {
                                if (isFunction(item === null || item === void 0 ? void 0 : item.customRender)) {
                                    // 用户自定义当前列渲染
                                    return item === null || item === void 0 ? void 0 : item.customRender(values, col, form);
                                }
                                return (React.createElement(CInfoSection.List, { wrapperStyle: {
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