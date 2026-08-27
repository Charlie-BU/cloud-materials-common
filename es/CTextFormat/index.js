import { __assign } from "tslib";
import React from 'react';
import { useCTextFormat } from './hooks';
var CTextFormat = React.memo(function (props) {
    var text = useCTextFormat(props);
    return React.createElement(React.Fragment, null, text);
});
CTextFormat.displayName = 'CTextFormat';
var Discount = function (props) { return React.createElement(CTextFormat, __assign({ type: "Discount" }, props)); };
Discount.displayName = 'CTextFormat.Discount';
export default Object.assign(CTextFormat, { Discount: Discount });
//# sourceMappingURL=index.js.map