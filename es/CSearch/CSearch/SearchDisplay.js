import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { Space, Button, Badge } from '@arco-design/web-react';
import { IconFilter } from '@arco-design/iconbox-react-ve-o-design';
import SearchItem from './SearchItem';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import { isObject } from 'lodash-es';
var cssPrefix = classNamePrefixFactory('search-view');
var SearchDisplay = function (props) {
    var displayArcoSpaceProps = props.displayArcoSpaceProps, showReset = props.showReset, manual = props.manual, displayList = props.displayList, advanceList = props.advanceList, advanceVisible = props.advanceVisible, activeAdvanceCount = props.activeAdvanceCount, params = props.params, toggleAdvanceVisible = props.toggleAdvanceVisible, search = props.search, updateParams = props.updateParams, resetParams = props.resetParams;
    var _a = useCConfigContext(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    return (React.createElement(Space, __assign({ size: 12, align: "center" }, displayArcoSpaceProps, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["display"], ["display"]))) }),
        displayList.map(function (item, index) {
            var _a;
            return (React.createElement(SearchItem, __assign({}, item, { key: (_a = item.fieldName) !== null && _a !== void 0 ? _a : index, params: params, updateParams: updateParams })));
        }),
        advanceList.length > 0 && (React.createElement(Button, { type: "outline", className: "".concat(searchCls, "-advance-button"), onClick: toggleAdvanceVisible },
            React.createElement(IconFilter, null),
            React.createElement("span", null, locale.CSearch.advanceFilter),
            !advanceVisible && React.createElement(Badge, { dotClassName: "".concat(searchCls, "-advance-dot"), count: activeAdvanceCount }))),
        Boolean(manual) && (React.createElement(Button, __assign({ type: "primary" }, (isObject(manual) ? manual : {}), { onClick: function (e) {
                var _a;
                search(true);
                isObject(manual) && ((_a = manual.onClick) === null || _a === void 0 ? void 0 : _a.call(manual, e));
            } }), locale.CSearch.search)),
        showReset && (React.createElement(Button, __assign({ type: "outline" }, (isObject(showReset) ? showReset : {}), { onClick: function (e) {
                var _a;
                resetParams();
                isObject(showReset) && ((_a = showReset.onClick) === null || _a === void 0 ? void 0 : _a.call(showReset, e));
            } }), locale.CSearch.reset))));
};
export default SearchDisplay;
var templateObject_1;
//# sourceMappingURL=SearchDisplay.js.map