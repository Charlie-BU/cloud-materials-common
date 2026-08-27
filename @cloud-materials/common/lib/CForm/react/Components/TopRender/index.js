"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CField_1 = tslib_1.__importDefault(require("../../CField/CField"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-top-render');
var TopRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callTop = _a.callTop;
    var top = typeof callTop === 'function' ? callTop(isStep ? formStep : formStep.form) : callTop;
    var renderTopItems = function (items) {
        var _a;
        return (_a = items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                var itemNode = item(isStep ? formStep : formStep.form);
                return !(0, lodash_es_1.isNil)(itemNode) ? react_1.default.createElement(react_1.Fragment, { key: index }, itemNode) : null;
            }
            if ((0, lodash_es_1.has)(item, 'alertType')) {
                var buildInItem = item;
                var icon = void 0;
                if (buildInItem.alertType === 'error') {
                    icon = react_1.default.createElement(iconbox_react_ve_o_design_1.IconCloseCircleFill, null);
                }
                else if (buildInItem.alertType === 'success') {
                    icon = react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleFill, null);
                }
                else if (buildInItem.alertType === 'warning') {
                    icon = react_1.default.createElement(iconbox_react_ve_o_design_1.IconExclamationCircleFill, null);
                }
                else {
                    icon = react_1.default.createElement(iconbox_react_ve_o_design_1.IconInfoCircleFill, null);
                }
                return react_1.default.createElement(web_react_1.Alert, tslib_1.__assign({ key: index, icon: icon }, buildInItem.props, { type: buildInItem.alertType }));
            }
            if ((0, lodash_es_1.has)(item, 'field')) {
                var field = item.field;
                return react_1.default.createElement(CField_1.default, tslib_1.__assign({ key: field.name.toString() }, field));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !(0, lodash_es_1.isNil)(item);
        });
    };
    var topNodes = renderTopItems(top);
    return (topNodes === null || topNodes === void 0 ? void 0 : topNodes.length) ? (react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement(web_react_1.Space, { direction: "vertical", style: { width: '100%' } }, renderTopItems(top)))) : null;
};
exports.default = TopRender;
var templateObject_1;
//# sourceMappingURL=index.js.map