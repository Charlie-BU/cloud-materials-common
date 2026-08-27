"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var Group_1 = tslib_1.__importDefault(require("./Group"));
var Text_1 = tslib_1.__importDefault(require("./Text"));
var CConfigProvider_1 = require("../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('collapse');
exports.testId = {
    container: "".concat((0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), "-container"),
    operate: "".concat((0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), "-operate"),
};
var dataIsArray = function (val) { return Array.isArray(val); };
var CCollapse = function (props) {
    var data = props.data, emptyNode = props.emptyNode;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('collapse');
    if (!data || data.length === 0) {
        return react_1.default.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["empty"], ["empty"]))) }, emptyNode || '-');
    }
    if (dataIsArray(data)) {
        return react_1.default.createElement(Group_1.default, tslib_1.__assign({}, props, { data: data }));
    }
    else {
        return react_1.default.createElement(Text_1.default, tslib_1.__assign({}, props, { data: data }));
    }
};
CCollapse.displayName = 'CCollapse';
exports.default = CCollapse;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map