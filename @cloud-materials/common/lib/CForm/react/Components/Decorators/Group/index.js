"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGroup = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var toArray_1 = tslib_1.__importDefault(require("rc-util/lib/Children/toArray"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-group');
var GroupComponent = function (props) {
    var title = props.title, children = props.children, className = props.className, restProps = tslib_1.__rest(props, ["title", "children", "className"]);
    var childNodes = (0, toArray_1.default)(children);
    var itemsNodes = [];
    var removeNodes = [];
    childNodes.forEach(function (child) {
        var _a;
        var childPropsComponent = (_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.component;
        // 对应 field.component 属性
        var _b = tslib_1.__read(childPropsComponent || [], 1), component = _b[0];
        switch (component === null || component === void 0 ? void 0 : component.displayName) {
            case 'CArrayRemove':
                removeNodes.push(child);
                break;
            default:
                itemsNodes.push(child);
                break;
        }
    });
    var _a = tslib_1.__read(removeNodes, 1), removeNode = _a[0];
    return (react_1.default.createElement("div", tslib_1.__assign({}, restProps, { className: (0, classnames_1.default)((0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className) }),
        title && react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["title"], ["title"]))) }, title),
        removeNode && react_1.default.createElement("span", { className: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["remove-container"], ["remove-container"]))) }, removeNode),
        itemsNodes));
};
exports.CGroup = (0, react_2.connect)(GroupComponent, (0, react_2.mapProps)(function (props, field) {
    if (!field)
        return props;
    return tslib_1.__assign({ title: field.title }, field.decoratorProps);
}));
exports.CGroup.displayName = 'Group';
exports.default = exports.CGroup;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map