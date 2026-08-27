"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTags = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var TagItem_1 = require("./TagItem");
var CConfigProvider_1 = require("../CConfigProvider");
var constant_1 = require("./constant");
/**
 * @description 标签
 */
var CTag = function (props) {
    var _a;
    var prefix = props.prefix, restProps = tslib_1.__rest(props, ["prefix"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefixTag = useCssPrefix('tag');
    var _b = tslib_1.__read((0, react_1.useState)((_a = restProps.visible) !== null && _a !== void 0 ? _a : true), 2), isVisible = _b[0], setIsVisible = _b[1];
    if (prefix) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var className = restProps.className, style = restProps.style, restTagProps = tslib_1.__rest(restProps, ["className", "style"]);
        var isStringPrefix = typeof prefix === 'string';
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefixTag(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["prefix"], ["prefix"]))), cssPrefixTag(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["prefix-", ""], ["prefix-", ""])), props.size || 'medium'), isStringPrefix && cssPrefixTag(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["prefix-string"], ["prefix-string"]))), restProps.className), style: !isVisible ? tslib_1.__assign(tslib_1.__assign({}, restProps.style), { display: 'none' }) : restProps.style, "data-testid": constant_1.TEST_ID.prefixTag },
            isStringPrefix ? (react_1.default.createElement(TagItem_1.TagItem, tslib_1.__assign({ type: "bordered", color: restProps.color, className: !restProps.color ? cssPrefixTag(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["prefix-default"], ["prefix-default"]))) : undefined }, restTagProps, { closable: false, closeIcon: undefined, checkable: false }), prefix)) : (prefix),
            react_1.default.createElement(TagItem_1.TagItem, tslib_1.__assign({ type: "outline" }, restTagProps, { style: { borderLeft: 'none' }, onClose: function (e) {
                    var _a;
                    setIsVisible(false);
                    (_a = restProps.onClose) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
                } }))));
    }
    return react_1.default.createElement(TagItem_1.TagItem, tslib_1.__assign({}, restProps));
};
CTag.displayName = 'CTag';
var Tags_1 = require("./Tags");
Object.defineProperty(exports, "CTags", { enumerable: true, get: function () { return tslib_1.__importDefault(Tags_1).default; } });
exports.default = CTag;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map