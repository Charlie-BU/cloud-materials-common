import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React from 'react';
import { Button, Message } from '@arco-design/web-react';
import { SEPARATOR } from '../constant';
import { useCCopy } from '../../CCopy/hooks';
import { useCConfigContext } from '../../CConfigProvider';
/**
 * @description 标签内容复制
 */
export var TagsCopy = function (props) {
    var copyable = props.copyable, content = props.content;
    var _a = useCConfigContext(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefixTags = useCssPrefix('tags');
    var defaultOnCopy = function (_, result) {
        return result ? Message.success(locale.CTag.successMsg) : Message.error(locale.CTag.failedMsg);
    };
    var _b = (!copyable || typeof copyable === 'boolean' ? {} : copyable), separator = _b.separator, _c = _b.buttonText, buttonText = _c === void 0 ? locale.CTag.copyText : _c, arcoButtonProps = _b.arcoButtonProps, _d = _b.onCopy, onCopy = _d === void 0 ? defaultOnCopy : _d, copyProps = __rest(_b, ["separator", "buttonText", "arcoButtonProps", "onCopy"]);
    var _e = __read(useCCopy(__assign({ text: typeof content === 'string' ? content : content.join(separator !== null && separator !== void 0 ? separator : SEPARATOR), onCopy: onCopy }, copyProps)), 2), _ = _e[0], handleCopy = _e[1].handleCopy;
    if (!copyable) {
        return null;
    }
    return (React.createElement("div", { className: cssPrefixTags(templateObject_1 || (templateObject_1 = __makeTemplateObject(["copy"], ["copy"]))) },
        React.createElement(Button, __assign({ type: "primary", className: cssPrefixTags(templateObject_2 || (templateObject_2 = __makeTemplateObject(["copy-button"], ["copy-button"]))), onClick: function (e) { return handleCopy(e); } }, arcoButtonProps), buttonText)));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=Copy.js.map