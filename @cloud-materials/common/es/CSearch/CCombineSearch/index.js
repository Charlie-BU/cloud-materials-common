import { __assign, __makeTemplateObject, __rest } from "tslib";
import { Space } from '@arco-design/web-react';
import classNames from 'classnames';
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { useCustom } from './useCustom';
import { combineDataCy, getTriggerExtraNode } from './utils';
var CCombineSearch = function (props) {
    var extraLeft = props.extraLeft, extraRight = props.extraRight, _a = props.triggerSpaceSize, triggerSpaceSize = _a === void 0 ? 12 : _a, _b = props.alignType, alignType = _b === void 0 ? 'bottom' : _b, className = props.className, style = props.style, restProps = __rest(props, ["extraLeft", "extraRight", "triggerSpaceSize", "alignType", "className", "style"]);
    var _c = useCustom(__assign(__assign({}, restProps), { alignType: alignType })), CCombineSearchTrigger = _c.CCombineSearchTrigger, CCombineSearchView = _c.CCombineSearchView, CCombineSearchInline = _c.CCombineSearchInline;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var combineCls = getCPrefixCls('search-combine');
    var extraLeftNode = getTriggerExtraNode(extraLeft);
    var extraRightNode = getTriggerExtraNode(extraRight);
    if (alignType === 'inline') {
        return (React.createElement("div", { className: classNames("".concat(combineCls, "-wrapper"), classNames("".concat(combineCls, "-wrapper-inline")), className), style: style, "data-cy": combineDataCy(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
            React.createElement(Space, { size: triggerSpaceSize, align: "start", className: classNames("".concat(combineCls, "-wrapper-trigger-left")) },
                extraLeftNode,
                CCombineSearchInline),
            extraRight && (React.createElement(Space, { size: triggerSpaceSize, style: { marginLeft: 12 } }, extraRightNode))));
    }
    return (React.createElement("div", { className: classNames("".concat(combineCls, "-wrapper"), className), style: style, "data-cy": combineDataCy(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))) },
        React.createElement("div", { className: classNames("".concat(combineCls, "-wrapper-bottom")) },
            React.createElement(Space, { size: triggerSpaceSize, align: "start", className: classNames("".concat(combineCls, "-wrapper-trigger-left")) },
                extraLeftNode,
                CCombineSearchTrigger),
            extraRight && (React.createElement(Space, { size: triggerSpaceSize, style: { marginLeft: 12 } }, extraRightNode))),
        CCombineSearchView));
};
CCombineSearch.useCustom = useCustom;
CCombineSearch.displayName = 'CCombineSearch';
export default CCombineSearch;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map