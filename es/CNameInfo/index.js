import { __assign, __makeTemplateObject, __rest } from "tslib";
import { Link } from '@arco-design/web-react';
import classNames from 'classnames';
import React from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CCopy from '../CCopy';
import CEllipsis from '../CEllipsis';
import CPopupEdit from '../CPopupEdit';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
export var cssPrefix = classNamePrefixFactory('name-info');
export var testId = {
    root: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
    copy: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["copy"], ["copy"]))),
    name: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["name"], ["name"]))),
};
var SuffixTypeEnum;
(function (SuffixTypeEnum) {
    SuffixTypeEnum[SuffixTypeEnum["name"] = 0] = "name";
    SuffixTypeEnum[SuffixTypeEnum["id"] = 1] = "id";
})(SuffixTypeEnum || (SuffixTypeEnum = {}));
var CNameInfo = function (props) {
    var _a;
    var _b;
    var _c = useCConfigContext(), getCPrefixCls = _c.getCPrefixCls, cComponentConfig = _c.cComponentConfig;
    var mergedProps = useMergeProps(props, {}, (_b = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CNameInfo) !== null && _b !== void 0 ? _b : {});
    var name = mergedProps.name, id = mergedProps.id, style = mergedProps.style, idStyle = mergedProps.idStyle, nameStyle = mergedProps.nameStyle, className = mergedProps.className, href = mergedProps.href, arcoLinkProps = mergedProps.arcoLinkProps, _d = mergedProps.nameRenderType, nameRenderType = _d === void 0 ? 'link' : _d, disableLink = mergedProps.disableLink, suffix = mergedProps.suffix, _e = mergedProps.nameCopyable, nameCopyable = _e === void 0 ? false : _e, nameCCopyProps = mergedProps.nameCCopyProps, nameEditable = mergedProps.nameEditable, nameEditRules = mergedProps.nameEditRules, nameEditPlaceholder = mergedProps.nameEditPlaceholder, nameCEllipsisProps = mergedProps.nameCEllipsisProps, nameCPopupEditProps = mergedProps.nameCPopupEditProps, _f = mergedProps.idCopyable, idCopyable = _f === void 0 ? false : _f, idCCopyProps = mergedProps.idCCopyProps, idCEllipsisProps = mergedProps.idCEllipsisProps, _g = mergedProps.idEditable, idEditable = _g === void 0 ? false : _g, idEditRules = mergedProps.idEditRules, idEditPlaceholder = mergedProps.idEditPlaceholder, idCPopupEditProps = mergedProps.idCPopupEditProps, _h = mergedProps.isIconHoverDisplay, isIconHoverDisplay = _h === void 0 ? true : _h, _j = mergedProps.isIconHoverSqueezeWidth, isIconHoverSqueezeWidth = _j === void 0 ? false : _j, onNameClick = mergedProps.onNameClick, onNameEditOk = mergedProps.onNameEditOk, onIdEditOk = mergedProps.onIdEditOk, rest = __rest(mergedProps, ["name", "id", "style", "idStyle", "nameStyle", "className", "href", "arcoLinkProps", "nameRenderType", "disableLink", "suffix", "nameCopyable", "nameCCopyProps", "nameEditable", "nameEditRules", "nameEditPlaceholder", "nameCEllipsisProps", "nameCPopupEditProps", "idCopyable", "idCCopyProps", "idCEllipsisProps", "idEditable", "idEditRules", "idEditPlaceholder", "idCPopupEditProps", "isIconHoverDisplay", "isIconHoverSqueezeWidth", "onNameClick", "onNameEditOk", "onIdEditOk"]);
    var nameInfoCls = getCPrefixCls('name-info');
    var renderSuffix = function (type) {
        var _a;
        if (type === void 0) { type = SuffixTypeEnum.name; }
        var copyable = type === SuffixTypeEnum.name ? nameCopyable : idCopyable;
        var CCopyProps = type === SuffixTypeEnum.name ? nameCCopyProps : idCCopyProps;
        var text = type === SuffixTypeEnum.name ? name : id;
        return (React.createElement("span", { className: "".concat(nameInfoCls, "-suffix") },
            copyable && (React.createElement("span", { className: classNames("".concat(nameInfoCls, "-copy"), (_a = {},
                    _a["".concat(nameInfoCls, "-copy-weight")] = !isIconHoverSqueezeWidth,
                    _a["".concat(nameInfoCls, "-copy-squeeze")] = isIconHoverSqueezeWidth,
                    _a)), "data-testid": testId.copy },
                React.createElement(CCopy, __assign({ text: text }, CCopyProps)))),
            type === SuffixTypeEnum.name ? suffix : null));
    };
    var renderLink = function () {
        if (nameRenderType === 'text') {
            return (React.createElement("span", { style: nameStyle, className: "".concat(nameInfoCls, "-name-text") }, name));
        }
        return (React.createElement(Link, __assign({ defaultValue: name, disabled: disableLink, href: href, style: __assign({ display: 'inline', padding: 0 }, nameStyle), onClick: function (event) {
                if (href && onNameClick) {
                    event.preventDefault();
                }
                if (onNameClick) {
                    onNameClick(event);
                }
            } }, arcoLinkProps), name));
    };
    return (React.createElement("div", __assign({}, rest, { style: style, "data-cy": testId.root, className: classNames("".concat(nameInfoCls), className, (_a = {},
            _a["".concat(nameInfoCls, "-edit-hide")] = isIconHoverDisplay,
            _a["".concat(nameInfoCls, "-edit-hide-squeeze")] = isIconHoverSqueezeWidth,
            _a["".concat(nameInfoCls, "-copy-visible")] = !isIconHoverDisplay,
            _a["".concat(nameInfoCls, "-edit-visible")] = !isIconHoverDisplay,
            _a)) }),
        (nameEditable || name) && (React.createElement("div", { className: "".concat(nameInfoCls, "-name"), "data-testid": testId.name }, nameEditable ? (React.createElement(CPopupEdit, __assign({ showEdit: false, defaultValue: name || '', rules: nameEditRules, placeholder: nameEditPlaceholder, onOk: onNameEditOk, displayContent: renderLink(), suffix: renderSuffix(), cEllipsisProps: __assign({ className: "".concat(nameInfoCls, "-name-content"), popoverContent: name, style: __assign({ paddingRight: 4 }, nameCEllipsisProps === null || nameCEllipsisProps === void 0 ? void 0 : nameCEllipsisProps.style) }, nameCEllipsisProps) }, nameCPopupEditProps))) : (React.createElement("div", { style: { display: 'flex' } },
            React.createElement(CEllipsis, __assign({ className: "".concat(nameInfoCls, "-name-content"), popoverContent: name, content: renderLink() }, nameCEllipsisProps, { style: __assign({}, nameCCopyProps === null || nameCCopyProps === void 0 ? void 0 : nameCCopyProps.style), suffix: React.createElement(React.Fragment, null,
                    renderSuffix(), nameCEllipsisProps === null || nameCEllipsisProps === void 0 ? void 0 :
                    nameCEllipsisProps.suffix) })))))),
        (idEditable || id) && (React.createElement("div", { className: "".concat(nameInfoCls, "-id") }, idEditable ? (React.createElement(CPopupEdit, __assign({ showEdit: false, defaultValue: id || '', rules: idEditRules, placeholder: idEditPlaceholder, onOk: onIdEditOk, displayContent: id, suffix: renderSuffix(SuffixTypeEnum.id), cEllipsisProps: __assign({ popoverContent: id, style: __assign(__assign({ paddingRight: 4 }, idCEllipsisProps === null || idCEllipsisProps === void 0 ? void 0 : idCEllipsisProps.style), idStyle) }, idCEllipsisProps) }, idCPopupEditProps))) : (React.createElement("div", { style: { display: 'flex' } },
            React.createElement(CEllipsis, __assign({ popoverContent: id, content: id || '' }, idCEllipsisProps, { style: idStyle, suffix: React.createElement(React.Fragment, null,
                    renderSuffix(SuffixTypeEnum.id), idCEllipsisProps === null || idCEllipsisProps === void 0 ? void 0 :
                    idCEllipsisProps.suffix) }))))))));
};
CNameInfo.displayName = 'CNameInfo';
export default CNameInfo;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map