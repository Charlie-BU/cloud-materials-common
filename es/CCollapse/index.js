import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CCollapseGroup from './Group';
import CCollapseText from './Text';
import { useCConfigContext } from '../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('collapse');
export var testId = {
    container: "".concat(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), "-container"),
    operate: "".concat(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), "-operate"),
};
var dataIsArray = function (val) { return Array.isArray(val); };
var CCollapse = function (props) {
    var data = props.data, emptyNode = props.emptyNode;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('collapse');
    if (!data || data.length === 0) {
        return React.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["empty"], ["empty"]))) }, emptyNode || '-');
    }
    if (dataIsArray(data)) {
        return React.createElement(CCollapseGroup, __assign({}, props, { data: data }));
    }
    else {
        return React.createElement(CCollapseText, __assign({}, props, { data: data }));
    }
};
CCollapse.displayName = 'CCollapse';
export default CCollapse;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map