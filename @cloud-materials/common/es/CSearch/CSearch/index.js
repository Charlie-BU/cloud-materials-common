import { __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { useCustom } from './useCustom';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import SearchProvider from './SearchProvider';
var cssPrefix = classNamePrefixFactory('search');
var CSearch = function (props) {
    var className = props.className, style = props.style, position = props.position, reverseNode = props.reverseNode, restProps = __rest(props, ["className", "style", "position", "reverseNode"]);
    var _a = useCustom(restProps), CSearchDisplay = _a.CSearchDisplay, CSearchCollapse = _a.CSearchCollapse;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    return (React.createElement(SearchProvider, null,
        React.createElement("div", { className: searchCls, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
            React.createElement("div", { className: classNames("".concat(searchCls, "-tools"), className), style: style }, position === 'right' ? (React.createElement(React.Fragment, null,
                reverseNode,
                CSearchDisplay)) : (React.createElement(React.Fragment, null,
                CSearchDisplay,
                reverseNode))),
            CSearchCollapse)));
};
CSearch.Provider = SearchProvider;
CSearch.useCustom = useCustom;
CSearch.displayName = 'CSearch';
export default CSearch;
var templateObject_1;
//# sourceMappingURL=index.js.map