import { __assign, __makeTemplateObject } from "tslib";
import React, { Fragment } from 'react';
import CField from '../../CField/CField';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { Alert, Space } from '@arco-design/web-react';
import { has, isNil } from 'lodash-es';
import { IconExclamationCircleFill, IconCloseCircleFill, IconCheckCircleFill, IconInfoCircleFill, } from '@arco-design/iconbox-react-ve-o-design';
export var cssPrefix = classNamePrefixFactory('cform-top-render');
var TopRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callTop = _a.callTop;
    var top = typeof callTop === 'function' ? callTop(isStep ? formStep : formStep.form) : callTop;
    var renderTopItems = function (items) {
        var _a;
        return (_a = items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                var itemNode = item(isStep ? formStep : formStep.form);
                return !isNil(itemNode) ? React.createElement(Fragment, { key: index }, itemNode) : null;
            }
            if (has(item, 'alertType')) {
                var buildInItem = item;
                var icon = void 0;
                if (buildInItem.alertType === 'error') {
                    icon = React.createElement(IconCloseCircleFill, null);
                }
                else if (buildInItem.alertType === 'success') {
                    icon = React.createElement(IconCheckCircleFill, null);
                }
                else if (buildInItem.alertType === 'warning') {
                    icon = React.createElement(IconExclamationCircleFill, null);
                }
                else {
                    icon = React.createElement(IconInfoCircleFill, null);
                }
                return React.createElement(Alert, __assign({ key: index, icon: icon }, buildInItem.props, { type: buildInItem.alertType }));
            }
            if (has(item, 'field')) {
                var field = item.field;
                return React.createElement(CField, __assign({ key: field.name.toString() }, field));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !isNil(item);
        });
    };
    var topNodes = renderTopItems(top);
    return (topNodes === null || topNodes === void 0 ? void 0 : topNodes.length) ? (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
        React.createElement(Space, { direction: "vertical", style: { width: '100%' } }, renderTopItems(top)))) : null;
};
export default TopRender;
var templateObject_1;
//# sourceMappingURL=index.js.map