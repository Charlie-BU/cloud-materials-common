import { __assign } from "tslib";
import { Input } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { isValidElement } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { DEFAULT_LABEL_WIDTH } from '../utils';
var CompactWrapper = function (props) {
    var className = props.className, style = props.style, label = props.label, _a = props.labelWidth, labelWidth = _a === void 0 ? DEFAULT_LABEL_WIDTH : _a, labelBordered = props.labelBordered, children = props.children;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var compactCls = getCPrefixCls('search-compact');
    var renderLabel = function () {
        if (!isValidElement(label) || labelBordered) {
            return (React.createElement("div", { className: classNames("".concat(compactCls, "-label"), "".concat(compactCls, "-bordered")), style: { width: labelWidth } }, label));
        }
        return React.cloneElement(label, __assign(__assign({}, label.props), { className: classNames("".concat(compactCls, "-before"), label.props.className), style: __assign({ width: labelWidth }, label.props.style) }));
    };
    if (!label) {
        return React.createElement(React.Fragment, null, children);
    }
    return (React.createElement(Input.Group, { compact: true, className: classNames(compactCls, className), style: style },
        renderLabel(),
        children));
};
export default CompactWrapper;
//# sourceMappingURL=CompactWrapper.js.map