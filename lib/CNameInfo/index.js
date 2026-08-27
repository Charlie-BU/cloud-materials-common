"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var CCopy_1 = tslib_1.__importDefault(require("../CCopy"));
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var CPopupEdit_1 = tslib_1.__importDefault(require("../CPopupEdit"));
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_1 = require("../hooks");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('name-info');
exports.testId = {
    root: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
    copy: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["copy"], ["copy"]))),
    name: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["name"], ["name"]))),
};
var SuffixTypeEnum;
(function (SuffixTypeEnum) {
    SuffixTypeEnum[SuffixTypeEnum["name"] = 0] = "name";
    SuffixTypeEnum[SuffixTypeEnum["id"] = 1] = "id";
})(SuffixTypeEnum || (SuffixTypeEnum = {}));
var CNameInfo = function (props) {
    var _a;
    var _b;
    var _c = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _c.getCPrefixCls, cComponentConfig = _c.cComponentConfig;
    var mergedProps = (0, hooks_1.useMergeProps)(props, {}, (_b = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CNameInfo) !== null && _b !== void 0 ? _b : {});
    var name = mergedProps.name, id = mergedProps.id, style = mergedProps.style, idStyle = mergedProps.idStyle, nameStyle = mergedProps.nameStyle, className = mergedProps.className, href = mergedProps.href, arcoLinkProps = mergedProps.arcoLinkProps, _d = mergedProps.nameRenderType, nameRenderType = _d === void 0 ? 'link' : _d, disableLink = mergedProps.disableLink, suffix = mergedProps.suffix, _e = mergedProps.nameCopyable, nameCopyable = _e === void 0 ? false : _e, nameCCopyProps = mergedProps.nameCCopyProps, nameEditable = mergedProps.nameEditable, nameEditRules = mergedProps.nameEditRules, nameEditPlaceholder = mergedProps.nameEditPlaceholder, nameCEllipsisProps = mergedProps.nameCEllipsisProps, nameCPopupEditProps = mergedProps.nameCPopupEditProps, _f = mergedProps.idCopyable, idCopyable = _f === void 0 ? false : _f, idCCopyProps = mergedProps.idCCopyProps, idCEllipsisProps = mergedProps.idCEllipsisProps, _g = mergedProps.idEditable, idEditable = _g === void 0 ? false : _g, idEditRules = mergedProps.idEditRules, idEditPlaceholder = mergedProps.idEditPlaceholder, idCPopupEditProps = mergedProps.idCPopupEditProps, _h = mergedProps.isIconHoverDisplay, isIconHoverDisplay = _h === void 0 ? true : _h, _j = mergedProps.isIconHoverSqueezeWidth, isIconHoverSqueezeWidth = _j === void 0 ? false : _j, onNameClick = mergedProps.onNameClick, onNameEditOk = mergedProps.onNameEditOk, onIdEditOk = mergedProps.onIdEditOk, rest = tslib_1.__rest(mergedProps, ["name", "id", "style", "idStyle", "nameStyle", "className", "href", "arcoLinkProps", "nameRenderType", "disableLink", "suffix", "nameCopyable", "nameCCopyProps", "nameEditable", "nameEditRules", "nameEditPlaceholder", "nameCEllipsisProps", "nameCPopupEditProps", "idCopyable", "idCCopyProps", "idCEllipsisProps", "idEditable", "idEditRules", "idEditPlaceholder", "idCPopupEditProps", "isIconHoverDisplay", "isIconHoverSqueezeWidth", "onNameClick", "onNameEditOk", "onIdEditOk"]);
    var nameInfoCls = getCPrefixCls('name-info');
    var renderSuffix = function (type) {
        var _a;
        if (type === void 0) { type = SuffixTypeEnum.name; }
        var copyable = type === SuffixTypeEnum.name ? nameCopyable : idCopyable;
        var CCopyProps = type === SuffixTypeEnum.name ? nameCCopyProps : idCCopyProps;
        var text = type === SuffixTypeEnum.name ? name : id;
        return (react_1.default.createElement("span", { className: "".concat(nameInfoCls, "-suffix") },
            copyable && (react_1.default.createElement("span", { className: (0, classnames_1.default)("".concat(nameInfoCls, "-copy"), (_a = {},
                    _a["".concat(nameInfoCls, "-copy-weight")] = !isIconHoverSqueezeWidth,
                    _a["".concat(nameInfoCls, "-copy-squeeze")] = isIconHoverSqueezeWidth,
                    _a)), "data-testid": exports.testId.copy },
                react_1.default.createElement(CCopy_1.default, tslib_1.__assign({ text: text }, CCopyProps)))),
            type === SuffixTypeEnum.name ? suffix : null));
    };
    var renderLink = function () {
        if (nameRenderType === 'text') {
            return (react_1.default.createElement("span", { style: nameStyle, className: "".concat(nameInfoCls, "-name-text") }, name));
        }
        return (react_1.default.createElement(web_react_1.Link, tslib_1.__assign({ defaultValue: name, disabled: disableLink, href: href, style: tslib_1.__assign({ display: 'inline', padding: 0 }, nameStyle), onClick: function (event) {
                if (href && onNameClick) {
                    event.preventDefault();
                }
                if (onNameClick) {
                    onNameClick(event);
                }
            } }, arcoLinkProps), name));
    };
    return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { style: style, "data-cy": exports.testId.root, className: (0, classnames_1.default)("".concat(nameInfoCls), className, (_a = {},
            _a["".concat(nameInfoCls, "-edit-hide")] = isIconHoverDisplay,
            _a["".concat(nameInfoCls, "-edit-hide-squeeze")] = isIconHoverSqueezeWidth,
            _a["".concat(nameInfoCls, "-copy-visible")] = !isIconHoverDisplay,
            _a["".concat(nameInfoCls, "-edit-visible")] = !isIconHoverDisplay,
            _a)) }),
        (nameEditable || name) && (react_1.default.createElement("div", { className: "".concat(nameInfoCls, "-name"), "data-testid": exports.testId.name }, nameEditable ? (react_1.default.createElement(CPopupEdit_1.default, tslib_1.__assign({ showEdit: false, defaultValue: name || '', rules: nameEditRules, placeholder: nameEditPlaceholder, onOk: onNameEditOk, displayContent: renderLink(), suffix: renderSuffix(), cEllipsisProps: tslib_1.__assign({ className: "".concat(nameInfoCls, "-name-content"), popoverContent: name, style: tslib_1.__assign({ paddingRight: 4 }, nameCEllipsisProps === null || nameCEllipsisProps === void 0 ? void 0 : nameCEllipsisProps.style) }, nameCEllipsisProps) }, nameCPopupEditProps))) : (react_1.default.createElement("div", { style: { display: 'flex' } },
            react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ className: "".concat(nameInfoCls, "-name-content"), popoverContent: name, content: renderLink() }, nameCEllipsisProps, { style: tslib_1.__assign({}, nameCCopyProps === null || nameCCopyProps === void 0 ? void 0 : nameCCopyProps.style), suffix: react_1.default.createElement(react_1.default.Fragment, null,
                    renderSuffix(), nameCEllipsisProps === null || nameCEllipsisProps === void 0 ? void 0 :
                    nameCEllipsisProps.suffix) })))))),
        (idEditable || id) && (react_1.default.createElement("div", { className: "".concat(nameInfoCls, "-id") }, idEditable ? (react_1.default.createElement(CPopupEdit_1.default, tslib_1.__assign({ showEdit: false, defaultValue: id || '', rules: idEditRules, placeholder: idEditPlaceholder, onOk: onIdEditOk, displayContent: id, suffix: renderSuffix(SuffixTypeEnum.id), cEllipsisProps: tslib_1.__assign({ popoverContent: id, style: tslib_1.__assign(tslib_1.__assign({ paddingRight: 4 }, idCEllipsisProps === null || idCEllipsisProps === void 0 ? void 0 : idCEllipsisProps.style), idStyle) }, idCEllipsisProps) }, idCPopupEditProps))) : (react_1.default.createElement("div", { style: { display: 'flex' } },
            react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({ popoverContent: id, content: id || '' }, idCEllipsisProps, { style: idStyle, suffix: react_1.default.createElement(react_1.default.Fragment, null,
                    renderSuffix(SuffixTypeEnum.id), idCEllipsisProps === null || idCEllipsisProps === void 0 ? void 0 :
                    idCEllipsisProps.suffix) }))))))));
};
CNameInfo.displayName = 'CNameInfo';
exports.default = CNameInfo;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map