"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var SecondCheck_1 = require("../SecondCheck");
var CConfigProvider_1 = require("../../../../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-header-render');
var HeaderRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callHeader = _a.callHeader, unMountCFormSecondCheck = _a.unMountCFormSecondCheck;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var header = typeof callHeader === 'function' ? callHeader(isStep ? formStep : formStep.form) : callHeader;
    var renderHeaderItems = function (items) {
        var _a;
        return (_a = items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                var itemNode = item(formStep);
                return !(0, lodash_es_1.isNil)(itemNode) ? react_1.default.createElement(react_1.Fragment, { key: index }, itemNode) : null;
            }
            if ((0, lodash_es_1.has)(item, 'title')) {
                var _a = item, title = _a.title, onBack_1 = _a.onBack;
                return (react_1.default.createElement("div", { key: index, className: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["item-title-container"], ["item-title-container"]))) },
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconLeft, { className: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["button"], ["button"]))), onClick: function () {
                            (0, SecondCheck_1.openSecondCheckModal)({
                                onOk: onBack_1,
                                form: formStep.form,
                                unMountCFormSecondCheck: unMountCFormSecondCheck,
                                locale: locale,
                            });
                        } }),
                    title && react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["title"], ["title"]))) }, title)));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !(0, lodash_es_1.isNil)(item);
        });
    };
    var headerNodes = renderHeaderItems(header);
    return (headerNodes === null || headerNodes === void 0 ? void 0 : headerNodes.length) ? react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject([""], [""]))) }, renderHeaderItems(header)) : null;
};
exports.default = HeaderRender;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map