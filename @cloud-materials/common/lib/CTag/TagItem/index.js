"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../CConfigProvider");
var CEllipsis_1 = tslib_1.__importDefault(require("../../CEllipsis"));
var constant_1 = require("../constant");
var util_1 = require("../util");
/**
 * @description 渲染标签
 */
var TagItem = function (props) {
    var cEllipsisProps = props.cEllipsisProps, children = props.children, className = props.className, color = props.color, _a = props.maxWidth, maxWidth = _a === void 0 ? constant_1.MAX_WIDTH : _a, _b = props.size, size = _b === void 0 ? 'medium' : _b, _c = props.shape, shape = _c === void 0 ? 'default' : _c, style = props.style, _d = props.type, type = _d === void 0 ? 'default' : _d, restProps = tslib_1.__rest(props, ["cEllipsisProps", "children", "className", "color", "maxWidth", "size", "shape", "style", "type"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefixTag = useCssPrefix('tag');
    return (react_1.default.createElement(web_react_1.Tag, tslib_1.__assign({}, restProps, { color: (0, util_1.isArcoColor)(color) ? color : undefined, className: (0, classnames_1.default)(cssPrefixTag(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), cssPrefixTag(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), size), cssPrefixTag(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["type-", ""], ["type-", ""])), type), cssPrefixTag(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["shape-", ""], ["shape-", ""])), shape), !color && shape === 'mark' && cssPrefixTag(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["default-mark"], ["default-mark"]))), className), style: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (0, util_1.getTagStyle)(color, type, shape)), style), { maxWidth: maxWidth }), "data-testid": constant_1.TEST_ID.tag }),
        react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ showCopy: false }, cEllipsisProps),
            react_1.default.createElement(react_1.default.Fragment, null, children))));
};
exports.TagItem = TagItem;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map