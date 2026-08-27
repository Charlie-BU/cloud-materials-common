import { __assign, __rest } from "tslib";
import React from 'react';
import { observer, useField } from '@formily/react';
import CTableTransfer from '../../../../CTableTransfer';
var CFormTableTransfer = observer(function (props) {
    var _a = props.value, value = _a === void 0 ? [] : _a, restProps = __rest(props, ["value"]);
    var field = useField();
    var onDataSource = function (dataSource) {
        field.setDataSource(dataSource);
    };
    return React.createElement(CTableTransfer, __assign({}, restProps, { defaultSelectedValues: value, onDataSource: onDataSource }));
});
export default CFormTableTransfer;
//# sourceMappingURL=index.js.map