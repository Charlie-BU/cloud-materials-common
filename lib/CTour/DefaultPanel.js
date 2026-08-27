"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPanel = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../CConfigProvider");
function DefaultPanel(_a) {
    var _b, _c, _d, _e;
    var current = _a.current, _f = _a.total, total = _f === void 0 ? 0 : _f, title = _a.title, desc = _a.desc, cover = _a.cover, _g = _a.closable, closable = _g === void 0 ? true : _g, className = _a.className, style = _a.style, prevButtonProps = _a.prevButtonProps, nextButtonProps = _a.nextButtonProps, _h = _a.footer, footer = _h === void 0 ? true : _h, onClose = _a.onClose, onPrev = _a.onPrev, onNext = _a.onNext, onFinish = _a.onFinish;
    var _j = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _j.useCssPrefix, CTour = _j.locale.CTour;
    var cssPrefix = useCssPrefix('tour-step');
    var singleStep = total === 1;
    var closeIcon = closable && (React.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["close"], ["close"]))), onClick: onClose },
        React.createElement(iconbox_react_ve_o_design_1.IconClose, null)));
    return (React.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["content"], ["content"]))), className), style: style },
        cover && React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["cover"], ["cover"]))) }, cover),
        title && (React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header"], ["header"]))) },
            React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["title"], ["title"]))) }, title),
            closeIcon)),
        title ? (desc && React.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["desc"], ["desc"]))) }, desc)) : (React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["header"], ["header"]))) },
            desc && React.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["desc"], ["desc"]))) }, desc),
            closeIcon)),
        footer && (React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["footer"], ["footer"]))) },
            total > 1 && (React.createElement("span", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["progress"], ["progress"]))) },
                current + 1,
                "/",
                total)),
            React.createElement(web_react_1.Space, { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["buttons"], ["buttons"]))) },
                prevButtonProps !== null &&
                    (singleStep ? (React.createElement(web_react_1.Button, tslib_1.__assign({ onClick: onFinish, size: "mini" }, prevButtonProps), (_b = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) !== null && _b !== void 0 ? _b : CTour.get)) : (current !== 0 && (React.createElement(web_react_1.Button, tslib_1.__assign({ onClick: onPrev, size: "mini", type: "text", key: "prev" }, prevButtonProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["prev-btn"], ["prev-btn"]))), prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.className) }), (_c = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) !== null && _c !== void 0 ? _c : CTour.prevStep)))),
                nextButtonProps !== null &&
                    (current === total - 1 ? (React.createElement(web_react_1.Button, tslib_1.__assign({ type: singleStep ? 'primary' : 'default', onClick: onFinish, size: "mini", key: "next" }, nextButtonProps), (_d = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) !== null && _d !== void 0 ? _d : CTour.sure)) : (React.createElement(web_react_1.Button, tslib_1.__assign({ type: "default", onClick: onNext, size: "mini", key: "next" }, nextButtonProps), (_e = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) !== null && _e !== void 0 ? _e : CTour.nextStep))))))));
}
exports.DefaultPanel = DefaultPanel;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=DefaultPanel.js.map