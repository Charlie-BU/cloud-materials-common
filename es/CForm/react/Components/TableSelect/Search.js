import { __assign, __rest } from "tslib";
import React from 'react';
import { tableSelectTestId } from '.';
import Radio from '../../../../CRadio';
import CSearch from '../../../../CSearch';
var CRadio = Radio.Group;
export var FilterSearch = CSearch.CSimpleSearch.register({ CRadio: CRadio });
var TableSelectFilter = function (props) {
    var component = props.component, componentProps = props.componentProps, restProps = __rest(props, ["component", "componentProps"]);
    return (React.createElement(FilterSearch, __assign({ content: {
            component: component,
            componentProps: componentProps,
        } // 增强了类型，安全跳过
        , "date-cy": tableSelectTestId.filter, debounceOptions: null }, restProps)));
};
TableSelectFilter.displayName = 'TableSelectFilter';
export default TableSelectFilter;
//# sourceMappingURL=Search.js.map