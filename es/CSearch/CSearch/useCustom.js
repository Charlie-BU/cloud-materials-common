import { __read, __rest } from "tslib";
import React from 'react';
import { useCSearch } from '../hooks';
import SearchDisplay from './SearchDisplay';
import SearchCollapse from './SearchCollapse';
export var useCustom = function (props) {
    var displayArcoSpaceProps = props.displayArcoSpaceProps, collapsedClassName = props.collapsedClassName, labelWith = props.labelWith, showReset = props.showReset, showAdvanceReset = props.showAdvanceReset, colspan = props.colspan, restProps = __rest(props, ["displayArcoSpaceProps", "collapsedClassName", "labelWith", "showReset", "showAdvanceReset", "colspan"]);
    var _a = __read(useCSearch(restProps), 2), _b = _a[0], manual = _b.manual, displayList = _b.displayList, advanceList = _b.advanceList, advanceVisible = _b.advanceVisible, activeAdvanceCount = _b.activeAdvanceCount, params = _b.params, _c = _a[1], toggleAdvanceVisible = _c.toggleAdvanceVisible, search = _c.search, updateParams = _c.updateParams, resetParams = _c.resetParams, resetAdvanceParams = _c.resetAdvanceParams;
    return {
        CSearchDisplay: (React.createElement(SearchDisplay, { displayArcoSpaceProps: displayArcoSpaceProps, showReset: showReset, manual: manual, displayList: displayList, advanceList: advanceList, advanceVisible: advanceVisible, activeAdvanceCount: activeAdvanceCount, params: params, toggleAdvanceVisible: toggleAdvanceVisible, search: search, updateParams: updateParams, resetParams: resetParams })),
        CSearchCollapse: (React.createElement(SearchCollapse, { collapsedClassName: collapsedClassName, labelWith: labelWith, showAdvanceReset: showAdvanceReset, colspan: colspan, advanceList: advanceList, advanceVisible: advanceVisible, params: params, updateParams: updateParams, resetAdvanceParams: resetAdvanceParams })),
    };
};
//# sourceMappingURL=useCustom.js.map