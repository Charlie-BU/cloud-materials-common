"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFormSection = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var icon_1 = require("@arco-design/web-react/icon");
var react_1 = require("@formily/react");
var react_2 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-section');
var Section = function (_a) {
    var _b, _c, _d;
    var title = _a.title, children = _a.children, _e = _a.isExpand, isExpand = _e === void 0 ? true : _e, _f = _a.enableCollapse, enableCollapse = _f === void 0 ? false : _f, className = _a.className, extra = _a.extra, restProps = tslib_1.__rest(_a, ["title", "children", "isExpand", "enableCollapse", "className", "extra"]);
    var _g = tslib_1.__read((0, react_2.useState)(!enableCollapse || (enableCollapse && isExpand)), 2), expandStatus = _g[0], setExpandStatus = _g[1];
    (0, react_2.useEffect)(function () {
        if (enableCollapse) {
            if (isExpand !== expandStatus) {
                setExpandStatus(isExpand);
            }
        }
    }, [isExpand, enableCollapse]);
    return (react_2.default.createElement("div", tslib_1.__assign({ className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className) }, restProps),
        react_2.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["header"], ["header"]))) },
            react_2.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header-tag"], ["header-tag"]))) }),
            react_2.default.createElement("div", { onClick: function () { return enableCollapse && setExpandStatus(function (exp) { return !exp; }); }, className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"]))), (_b = {}, _b[(0, exports.cssPrefix)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["header-title-pointer"], ["header-title-pointer"])))] = enableCollapse, _b)) },
                react_2.default.createElement("span", null, title),
                react_2.default.createElement("span", { className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["header-title-icon"], ["header-title-icon"]))), (_c = {},
                        _c[(0, exports.cssPrefix)(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["header-title-icon-expand"], ["header-title-icon-expand"])))] = expandStatus,
                        _c[(0, exports.cssPrefix)(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["header-title-icon-visible"], ["header-title-icon-visible"])))] = enableCollapse,
                        _c)) },
                    react_2.default.createElement(icon_1.IconDown, null))),
            !(0, lodash_es_1.isNil)(extra) && react_2.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["header-extra"], ["header-extra"]))) }, extra)),
        react_2.default.createElement("div", { className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["section-children"], ["section-children"]))), (_d = {},
                _d[(0, exports.cssPrefix)(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["collapse-children-hidden"], ["collapse-children-hidden"])))] = !expandStatus,
                _d)) }, children)));
};
exports.CFormSection = (0, react_1.connect)(Section, (0, react_1.mapProps)(function (props, field) {
    if (!field)
        return props;
    return tslib_1.__assign({ title: field.title }, field.decoratorProps);
}));
exports.default = Section;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=index.js.map