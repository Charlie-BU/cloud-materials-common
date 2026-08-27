"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var SectionEditor = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, useCssPrefix = _a.useCssPrefix;
    var cssPrefix = useCssPrefix('info-section');
    if ((props === null || props === void 0 ? void 0 : props.showModuleEditor) === false) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return !props.disable ? (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({}, props === null || props === void 0 ? void 0 : props.popoverProps, { disabled: (props === null || props === void 0 ? void 0 : props.popoverProps) === undefined }),
        react_1.default.createElement("div", { onClick: props === null || props === void 0 ? void 0 : props.onClick, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["module-editor"], ["module-editor"]))) },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconEdit, { height: "22px" }),
            react_1.default.createElement("span", { style: { marginLeft: 8 } }, locale.CInfoSection.editor)))) : (react_1.default.createElement(web_react_1.Popover, { content: props.disableContent || locale.CInfoSection.noEditorTip },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["module-editor"], ["module-editor"]))), cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["module-editor-disable"], ["module-editor-disable"])))) },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconEdit, { height: "22px" }),
            react_1.default.createElement("span", { style: { marginLeft: 8 } }, locale.CInfoSection.editor))));
};
exports.default = SectionEditor;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=ModuleEditor.js.map