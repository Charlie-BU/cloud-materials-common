import { __assign, __rest } from "tslib";
import React from 'react';
import { Form } from '@arco-design/web-react';
import CPopoverVerify from './index';
var CPopoverVerifyFormItem = function (props) {
    var rules = props.rules, children = props.children, cPopoverVerifyProps = props.cPopoverVerifyProps, arcoPopoverProps = props.arcoPopoverProps, formItemProps = __rest(props, ["rules", "children", "cPopoverVerifyProps", "arcoPopoverProps"]);
    return (React.createElement(Form.Item, __assign({}, formItemProps, { rules: rules, help: "" }),
        React.createElement(CPopoverVerify, __assign({ rules: rules }, cPopoverVerifyProps, { arcoPopoverProps: arcoPopoverProps }), children)));
};
export default CPopoverVerifyFormItem;
//# sourceMappingURL=CPopoverVerifyFormItem.js.map