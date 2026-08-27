import { __assign, __rest } from "tslib";
import React from 'react';
import { BaseButton } from '../BaseButton';
import { IconClose } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';
export var UndoButton = function (props) {
    var _a = props.icon, icon = _a === void 0 ? React.createElement(IconClose, null) : _a, _text = props.text, _b = props.type, type = _b === void 0 ? 'LastStep' : _b, restProps = __rest(props, ["icon", "text", "type"]);
    var locale = useCConfigContext().locale;
    var text = _text || locale.CTableEditor.undo;
    var handleClick = function (tableEditor) {
        tableEditor.undo({ type: type });
    };
    return (React.createElement(BaseButton, __assign({ icon: icon, text: text, disabled: function (tableEditor) {
            if (type === 'AllSteps') {
                return !tableEditor.hasChanged;
            }
            return !tableEditor.hasActionHistory;
        } }, restProps, { onClick: handleClick, testId: testId.undoButton })));
};
//# sourceMappingURL=index.js.map