"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseButton = void 0;
var tslib_1 = require("tslib");
var react_1 = require("@formily/react");
var react_2 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("../../../hooks");
var utils_1 = require("../utils");
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var usePrefix_1 = require("../../../hooks/usePrefix");
exports.BaseButton = (0, react_1.observer)(function (props) {
    var className = props.className, style = props.style, _a = props.visible, _visible = _a === void 0 ? true : _a, _disabled = props.disabled, _icon = props.icon, _text = props.text, _content = props.content, _popover = props.popover, testId = props.testId, onClick = props.onClick;
    var tableEditor = (0, hooks_1.useTableEditor)();
    var TableButtonCommonCls = (0, usePrefix_1.usePrefix)('operation-button');
    if (!tableEditor) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('按钮需要使用 TableEditorProvider 包裹，否则无法操作表格');
        }
        return null;
    }
    var disabled = (0, utils_1.runCallable)(_disabled, tableEditor);
    var content = (0, utils_1.runCallable)(_content, tableEditor);
    var text = (0, utils_1.runCallable)(_text, tableEditor);
    var icon = (0, utils_1.runCallable)(_icon, tableEditor);
    var visible = (0, utils_1.runCallable)(_visible, tableEditor);
    /**
     * 将 Popover 配置处理为 popover 格式
     * 方便只配置 content，或者完整配置整个 Popover
     */
    var popover = (0, utils_1.runCallable)(_popover, tableEditor);
    if (!(0, lodash_es_1.isUndefined)(popover) && !(popover === null || popover === void 0 ? void 0 : popover.content)) {
        popover = {
            content: popover,
        };
    }
    var clz = "".concat(TableButtonCommonCls, "-").concat(disabled ? 'disabled' : 'enabled');
    var handleClick = function () {
        if (!disabled) {
            onClick(tableEditor);
        }
    };
    var render = function () {
        return (react_2.default.createElement(react_2.default.Fragment, null, visible ? (react_2.default.createElement("div", { style: style, className: (0, classnames_1.default)(className, clz, TableButtonCommonCls), onClick: handleClick, "data-testid": testId, "data-cy": testId }, !content ? (react_2.default.createElement("span", { className: "".concat(TableButtonCommonCls, "-content") },
            icon ? react_2.default.createElement("span", { className: "".concat(TableButtonCommonCls, "-content-icon") }, icon) : null,
            text ? react_2.default.createElement("span", { className: "".concat(TableButtonCommonCls, "-content-text") }, text) : null)) : (content))) : null));
    };
    var dom = render();
    return popover ? react_2.default.createElement(web_react_1.Popover, tslib_1.__assign({}, popover), dom) : dom;
});
//# sourceMappingURL=index.js.map