import { __makeTemplateObject } from "tslib";
import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../../../CConfigProvider';
import SearchViewItem from './Item';
import { IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { getViewList } from '../utils';
import { dropUndefined } from '../../utils';
var cssPrefix = classNamePrefixFactory('combine-search-view');
var SearchView = function (props) {
    var className = props.className, style = props.style, current = props.current, list = props.list, params = props.params, enableEdit = props.enableEdit, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, popoverTriggerProps = props.popoverTriggerProps, updateParams = props.updateParams, updateState = props.updateState, resetParams = props.resetParams, updateTempValue = props.updateTempValue, searchParamExtraLast = props.searchParamExtraLast, searchParamExtraStart = props.searchParamExtraStart;
    var _a = useCConfigContext(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var viewCls = getCPrefixCls('search-combine-view');
    var viewList = getViewList(dropUndefined(params), list);
    if (!viewList.length) {
        return null;
    }
    return (React.createElement(Space, { className: classNames(viewCls, className), wrap: true, size: "mini", style: style, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
        searchParamExtraStart && React.createElement("span", { className: "".concat(viewCls, "-extra") }, searchParamExtraStart),
        viewList.map(function (item) { return (React.createElement(SearchViewItem, { key: item.fieldName, item: item, value: params[item.fieldName], current: current, enableEdit: enableEdit, popoverClassName: popoverClassName, popoverStyle: popoverStyle, popoverTriggerProps: popoverTriggerProps, updateParams: updateParams, updateState: updateState, updateTempValue: updateTempValue })); }),
        React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(Divider, { type: "vertical", className: "".concat(viewCls, "-divider") }),
            React.createElement("span", { className: "".concat(viewCls, "-clear"), onClick: resetParams },
                React.createElement(IconDelete, null),
                locale.CSearch.clear),
            searchParamExtraLast && React.createElement("span", { className: "".concat(viewCls, "-extra") }, searchParamExtraLast))));
};
export default SearchView;
var templateObject_1;
//# sourceMappingURL=index.js.map