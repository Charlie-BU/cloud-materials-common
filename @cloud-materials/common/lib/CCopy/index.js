"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var reactChildren_1 = require("../_utils/reactChildren");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var icon_1 = require("@arco-design/web-react/icon");
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../CConfigProvider");
var cssPrefix = (0, classNamePrefixFactory_1.default)('copy');
exports.testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
    icon: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))),
};
var CCopy = function (props) {
    var _a;
    var style = props.style, className = props.className, children = props.children, disabled = props.disabled, triggerIcon = props.triggerIcon, triggerEle = props.triggerEle, showCopy = props.showCopy;
    var text = (0, react_1.useMemo)(function () { return props.text || (0, reactChildren_1.getChildrenString)(children); }, [props.text, children]);
    var _b = tslib_1.__read((0, hooks_1.useCCopy)(tslib_1.__assign(tslib_1.__assign({}, props), { text: text })), 2), arcoPopoverProps = _b[0].arcoPopoverProps, controls = _b[1];
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var cssRoot = getCPrefixCls('copy');
    var iconCls = getCPrefixCls('icon');
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssRoot, className), "data-cy": exports.testId.container },
        children,
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({}, arcoPopoverProps, { "data-cy": exports.testId.popover }),
            react_1.default.createElement("span", { className: (0, classnames_1.default)("".concat(cssRoot, "-icon"), (_a = {}, _a["".concat(cssRoot, "-icon-hover")] = showCopy === 'hover', _a)), onClick: controls.handleCopy, "data-cy": exports.testId.icon, "data-testid": exports.testId.icon }, triggerEle ||
                react_1.default.cloneElement(triggerIcon || react_1.default.createElement(icon_1.IconCopy, null), {
                    className: (0, classnames_1.default)(iconCls, disabled && 'disabled'),
                })))));
};
CCopy.displayName = 'CCopy';
exports.default = CCopy;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map