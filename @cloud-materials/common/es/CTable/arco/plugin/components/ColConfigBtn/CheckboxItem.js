import { __assign, __rest } from "tslib";
import React from 'react';
import { observer } from '@formily/react';
import { Checkbox, Popover } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import classnames from 'classnames';
import CEllipsis from '../../../../../CEllipsis';
import { usePrefix } from '../../../../react';
export var CheckboxItem = observer(function (props) {
    var name = props.name, value = props.value, tooltip = props.tooltip, disabled = props.disabled, onChange = props.onChange, restProps = __rest(props, ["name", "value", "tooltip", "disabled", "onChange"]);
    var prefixCls = usePrefix('comp-col-config-btn-checkbox-item');
    var handleClick = function () {
        if (disabled)
            return;
        onChange(!value);
    };
    return (React.createElement("span", { className: classnames("".concat(prefixCls), { disabled: disabled }), onClick: handleClick },
        React.createElement(Checkbox, __assign({ checked: value, disabled: disabled }, restProps)),
        React.createElement("span", { className: "".concat(prefixCls, "-name") },
            React.createElement(CEllipsis, { content: name })),
        tooltip && (React.createElement(Popover, { content: tooltip },
            React.createElement(IconQuestionCircle, { className: "".concat(prefixCls, "-tooltip") })))));
});
//# sourceMappingURL=CheckboxItem.js.map