import { __assign, __rest } from "tslib";
import React from 'react';
import { BaseButton } from '../BaseButton';
import { IconCloseCircle } from '@arco-design/web-react/icon';
import cls from 'classnames';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { usePrefix } from '../../../hooks/usePrefix';
import { testId } from '../../../../testId';
export var DeleteRowButton = function (props) {
    var onDelete = props.onDelete, _a = props.icon, icon = _a === void 0 ? React.createElement(IconCloseCircle, null) : _a, _text = props.text, className = props.className, restProps = __rest(props, ["onDelete", "icon", "text", "className"]);
    var locale = useCConfigContext().locale;
    var prefixCls = usePrefix('delete-row-button');
    var text = _text || locale.CTableEditor.deleteRow;
    var handleClick = function (tableEditor) {
        var rowData = tableEditor.deleteRows();
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(rowData, tableEditor);
    };
    return (React.createElement(BaseButton, __assign({ icon: icon, text: text, disabled: function (tableEditor) { return !tableEditor.table.selectedRowKeys.length; }, className: cls(prefixCls, className) }, restProps, { onClick: handleClick, testId: testId.deleteRowButton })));
};
//# sourceMappingURL=index.js.map