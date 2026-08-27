"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var reactChildren_1 = require("../../_utils/reactChildren");
var Copy_1 = require("./Copy");
var CCollapse_1 = tslib_1.__importDefault(require("../../CCollapse"));
var CConfigProvider_1 = require("../../CConfigProvider");
var __1 = tslib_1.__importDefault(require(".."));
/**
 * @description 标签组
 */
var CTags = function (props) {
    var _a;
    var children = props.children, maxShowCount = props.maxShowCount, className = props.className, data = props.data, cCollapseProps = props.cCollapseProps, style = props.style, copyable = props.copyable, renderItem = props.renderItem, restProps = tslib_1.__rest(props, ["children", "maxShowCount", "className", "data", "cCollapseProps", "style", "copyable", "renderItem"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefixTags = useCssPrefix('tags');
    var copyContent = children
        ? children.map(function (child) { return (0, reactChildren_1.getChildrenString)(child); })
        : data === null || data === void 0 ? void 0 : data.map(function (tag) { return (typeof tag === 'string' ? tag : "".concat(tag.prefix, ":").concat(tag.value)); });
    var _collapseProps = tslib_1.__assign(tslib_1.__assign({}, cCollapseProps), { style: style, className: (0, classnames_1.default)(cssPrefixTags(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className), mode: copyable || (cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.extraRender) ? 'popover' : cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.mode, extraRender: (_a = cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.extraRender) !== null && _a !== void 0 ? _a : (function () { return react_1.default.createElement(Copy_1.TagsCopy, { copyable: copyable, content: copyContent || '' }); }) });
    // 渲染子元素
    if (children) {
        return (react_1.default.createElement(CCollapse_1.default, tslib_1.__assign({}, _collapseProps, { data: children, showCount: maxShowCount, itemRender: function (item) { return item; } })));
    }
    // 渲染数据源
    return (react_1.default.createElement(CCollapse_1.default, tslib_1.__assign({}, _collapseProps, { data: data, showCount: maxShowCount, itemRender: renderItem !== null && renderItem !== void 0 ? renderItem : (function (tag, index) {
            var isStringTag = typeof tag === 'string';
            return (react_1.default.createElement(__1.default, tslib_1.__assign({ key: index, prefix: isStringTag ? undefined : tag.prefix }, restProps), isStringTag ? tag : tag.value));
        }) })));
};
CTags.displayName = 'CTags';
exports.default = CTags;
var templateObject_1;
//# sourceMappingURL=index.js.map