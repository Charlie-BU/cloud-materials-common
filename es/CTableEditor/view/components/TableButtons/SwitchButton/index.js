import { __assign, __rest } from "tslib";
import React from 'react';
import { BaseButton } from '../BaseButton';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';
export var SwitchButton = function (props) {
    var onSwitch = props.onSwitch, _a = props.icon, icon = _a === void 0 ? null : _a, _text = props.text, restProps = __rest(props, ["onSwitch", "icon", "text"]);
    var locale = useCConfigContext().locale;
    var text = _text || locale.CTableEditor.switch;
    var handleClick = function (tableEditor) {
        var nextState = tableEditor.switchEditable();
        onSwitch === null || onSwitch === void 0 ? void 0 : onSwitch(nextState, tableEditor);
    };
    return React.createElement(BaseButton, __assign({ icon: icon, text: text }, restProps, { onClick: handleClick, testId: testId.switchButton }));
};
//# sourceMappingURL=index.js.map