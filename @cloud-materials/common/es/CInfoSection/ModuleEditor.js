import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { IconEdit } from '@arco-design/iconbox-react-ve-o-design';
import { Popover } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
var SectionEditor = function (props) {
    var _a = useCConfigContext(), locale = _a.locale, useCssPrefix = _a.useCssPrefix;
    var cssPrefix = useCssPrefix('info-section');
    if ((props === null || props === void 0 ? void 0 : props.showModuleEditor) === false) {
        return React.createElement(React.Fragment, null);
    }
    return !props.disable ? (React.createElement(Popover, __assign({}, props === null || props === void 0 ? void 0 : props.popoverProps, { disabled: (props === null || props === void 0 ? void 0 : props.popoverProps) === undefined }),
        React.createElement("div", { onClick: props === null || props === void 0 ? void 0 : props.onClick, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["module-editor"], ["module-editor"]))) },
            React.createElement(IconEdit, { height: "22px" }),
            React.createElement("span", { style: { marginLeft: 8 } }, locale.CInfoSection.editor)))) : (React.createElement(Popover, { content: props.disableContent || locale.CInfoSection.noEditorTip },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["module-editor"], ["module-editor"]))), cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["module-editor-disable"], ["module-editor-disable"])))) },
            React.createElement(IconEdit, { height: "22px" }),
            React.createElement("span", { style: { marginLeft: 8 } }, locale.CInfoSection.editor))));
};
export default SectionEditor;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=ModuleEditor.js.map