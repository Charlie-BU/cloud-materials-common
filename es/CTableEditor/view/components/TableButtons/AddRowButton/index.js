import { __assign, __rest } from "tslib";
import React from 'react';
import { BaseButton } from '../BaseButton';
import { IconPlusCircle } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';
export var AddRowButton = function (props) {
    var addRow = props.addRow, onAdd = props.onAdd, _a = props.icon, icon = _a === void 0 ? React.createElement(IconPlusCircle, null) : _a, _text = props.text, _b = props.position, position = _b === void 0 ? 'bottom' : _b, restProps = __rest(props, ["addRow", "onAdd", "icon", "text", "position"]);
    var locale = useCConfigContext().locale;
    var text = _text || locale.CTableEditor.addRow;
    var handleClick = function (tableEditor) {
        var data = addRow(tableEditor);
        var rowData = tableEditor.addRow(data, { position: position });
        onAdd === null || onAdd === void 0 ? void 0 : onAdd(rowData, tableEditor);
    };
    return React.createElement(BaseButton, __assign({ icon: icon, text: text }, restProps, { onClick: handleClick, testId: testId.addRowButton }));
};
//# sourceMappingURL=index.js.map