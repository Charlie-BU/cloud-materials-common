import { __assign } from "tslib";
import { observer } from '@formily/react';
import React from 'react';
import cls from 'classnames';
import { useTableEditor } from '../../../hooks';
import { runCallable } from '../utils';
import { Popover } from '@arco-design/web-react';
import { isUndefined } from 'lodash-es';
import { usePrefix } from '../../../hooks/usePrefix';
export var BaseButton = observer(function (props) {
    var className = props.className, style = props.style, _a = props.visible, _visible = _a === void 0 ? true : _a, _disabled = props.disabled, _icon = props.icon, _text = props.text, _content = props.content, _popover = props.popover, testId = props.testId, onClick = props.onClick;
    var tableEditor = useTableEditor();
    var TableButtonCommonCls = usePrefix('operation-button');
    if (!tableEditor) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('按钮需要使用 TableEditorProvider 包裹，否则无法操作表格');
        }
        return null;
    }
    var disabled = runCallable(_disabled, tableEditor);
    var content = runCallable(_content, tableEditor);
    var text = runCallable(_text, tableEditor);
    var icon = runCallable(_icon, tableEditor);
    var visible = runCallable(_visible, tableEditor);
    /**
     * 将 Popover 配置处理为 popover 格式
     * 方便只配置 content，或者完整配置整个 Popover
     */
    var popover = runCallable(_popover, tableEditor);
    if (!isUndefined(popover) && !(popover === null || popover === void 0 ? void 0 : popover.content)) {
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
        return (React.createElement(React.Fragment, null, visible ? (React.createElement("div", { style: style, className: cls(className, clz, TableButtonCommonCls), onClick: handleClick, "data-testid": testId, "data-cy": testId }, !content ? (React.createElement("span", { className: "".concat(TableButtonCommonCls, "-content") },
            icon ? React.createElement("span", { className: "".concat(TableButtonCommonCls, "-content-icon") }, icon) : null,
            text ? React.createElement("span", { className: "".concat(TableButtonCommonCls, "-content-text") }, text) : null)) : (content))) : null));
    };
    var dom = render();
    return popover ? React.createElement(Popover, __assign({}, popover), dom) : dom;
});
//# sourceMappingURL=index.js.map