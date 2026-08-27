import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { Grid, Button } from '@arco-design/web-react';
import { DEFAULT_COLSPAN, DEFAULT_LABEL_WIDTH } from '../utils';
import classNames from 'classnames';
import SearchItem from './SearchItem';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory('search-view');
var SearchCollapse = function (props) {
    var collapsedClassName = props.collapsedClassName, _a = props.labelWith, labelWith = _a === void 0 ? DEFAULT_LABEL_WIDTH : _a, showAdvanceReset = props.showAdvanceReset, defaultColspan = props.colspan, advanceList = props.advanceList, advanceVisible = props.advanceVisible, params = props.params, updateParams = props.updateParams, resetAdvanceParams = props.resetAdvanceParams;
    var _b = useCConfigContext(), locale = _b.locale, getCPrefixCls = _b.getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    var colspan = __assign(__assign({}, DEFAULT_COLSPAN), defaultColspan);
    return advanceVisible && advanceList.length > 0 ? (React.createElement("div", { className: classNames("".concat(searchCls, "-collapse"), collapsedClassName), "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["collapse"], ["collapse"]))) },
        React.createElement(Grid.Row, { gutter: [12, 12] },
            advanceList.map(function (_a, index) {
                var _b;
                var itemColspan = _a.colspan, itemLabelWidth = _a.labelWidth, content = _a.content, rest = __rest(_a, ["colspan", "labelWidth", "content"]);
                return (
                // @ts-ignore
                React.createElement(Grid.Col, { key: (_b = rest.fieldName) !== null && _b !== void 0 ? _b : index, span: itemColspan !== null && itemColspan !== void 0 ? itemColspan : colspan[content === null || content === void 0 ? void 0 : content.component] },
                    React.createElement(SearchItem, __assign({}, rest, { content: content, labelWidth: itemLabelWidth !== null && itemLabelWidth !== void 0 ? itemLabelWidth : labelWith, params: params, updateParams: updateParams }))));
            }),
            showAdvanceReset && (React.createElement(Grid.Col, { span: 4 },
                React.createElement(Button, { type: "outline", onClick: resetAdvanceParams }, locale.CSearch.reset)))))) : null;
};
export default SearchCollapse;
var templateObject_1;
//# sourceMappingURL=SearchCollapse.js.map