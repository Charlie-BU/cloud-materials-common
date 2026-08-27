"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)("card-link-card-item");
exports.testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    tag: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["tag"], ["tag"]))),
    content: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["content"], ["content"]))),
};
var LinkListItem = function (props) {
    var children = props.children, content = props.content, className = props.className, tag = props.tag, rest = tslib_1.__rest(props, ["children", "content", "className", "tag"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix("card-link-card-item");
    return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { "data-testid": exports.testId.container, className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject([""], [""]))), className) }),
        tag && (react_1.default.createElement("div", { "data-testid": exports.testId.tag, className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["tag"], ["tag"]))) }, tag)),
        react_1.default.createElement("div", { "data-testid": exports.testId.content, className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["content"], ["content"]))) }, content !== null && content !== void 0 ? content : children)));
};
LinkListItem.displayName = 'LinkListItem';
exports.default = LinkListItem;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=LinkListItem.js.map