"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var index_1 = tslib_1.__importDefault(require("./index"));
var CPopoverVerifyFormItem = function (props) {
    var rules = props.rules, children = props.children, cPopoverVerifyProps = props.cPopoverVerifyProps, arcoPopoverProps = props.arcoPopoverProps, formItemProps = tslib_1.__rest(props, ["rules", "children", "cPopoverVerifyProps", "arcoPopoverProps"]);
    return (react_1.default.createElement(web_react_1.Form.Item, tslib_1.__assign({}, formItemProps, { rules: rules, help: "" }),
        react_1.default.createElement(index_1.default, tslib_1.__assign({ rules: rules }, cPopoverVerifyProps, { arcoPopoverProps: arcoPopoverProps }), children)));
};
exports.default = CPopoverVerifyFormItem;
//# sourceMappingURL=CPopoverVerifyFormItem.js.map