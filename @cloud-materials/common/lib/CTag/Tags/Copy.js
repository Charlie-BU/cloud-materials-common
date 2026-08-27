"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsCopy = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var constant_1 = require("../constant");
var hooks_1 = require("../../CCopy/hooks");
var CConfigProvider_1 = require("../../CConfigProvider");
/**
 * @description 标签内容复制
 */
var TagsCopy = function (props) {
    var copyable = props.copyable, content = props.content;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefixTags = useCssPrefix('tags');
    var defaultOnCopy = function (_, result) {
        return result ? web_react_1.Message.success(locale.CTag.successMsg) : web_react_1.Message.error(locale.CTag.failedMsg);
    };
    var _b = (!copyable || typeof copyable === 'boolean' ? {} : copyable), separator = _b.separator, _c = _b.buttonText, buttonText = _c === void 0 ? locale.CTag.copyText : _c, arcoButtonProps = _b.arcoButtonProps, _d = _b.onCopy, onCopy = _d === void 0 ? defaultOnCopy : _d, copyProps = tslib_1.__rest(_b, ["separator", "buttonText", "arcoButtonProps", "onCopy"]);
    var _e = tslib_1.__read((0, hooks_1.useCCopy)(tslib_1.__assign({ text: typeof content === 'string' ? content : content.join(separator !== null && separator !== void 0 ? separator : constant_1.SEPARATOR), onCopy: onCopy }, copyProps)), 2), _ = _e[0], handleCopy = _e[1].handleCopy;
    if (!copyable) {
        return null;
    }
    return (react_1.default.createElement("div", { className: cssPrefixTags(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["copy"], ["copy"]))) },
        react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "primary", className: cssPrefixTags(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["copy-button"], ["copy-button"]))), onClick: function (e) { return handleCopy(e); } }, arcoButtonProps), buttonText)));
};
exports.TagsCopy = TagsCopy;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Copy.js.map