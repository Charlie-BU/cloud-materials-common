import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import { useMergeProps } from '../hooks/useMergeProps';
import { useCConfigContext } from '../CConfigProvider';
import { Spin } from '@arco-design/web-react';
var cssRoot = "".concat(GLOBAL_PREFIX, "-detail-content-wrapper");
export var testId = {
    container: "".concat(cssRoot, "-container"),
};
var defaultProps = {};
function CDetailContentWrapper(props) {
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('detail-content-wrapper');
    var _a = useMergeProps(props, defaultProps, {}), style = _a.style, className = _a.className, children = _a.children, loading = _a.loading, arcoSpinProps = _a.arcoSpinProps;
    return children ? (React.createElement(Spin, __assign({ block: true, style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className), loading: loading }, arcoSpinProps, { "data-testid": testId.container }), children)) : null;
}
CDetailContentWrapper.displayName = 'CDetailContentWrapper';
export default CDetailContentWrapper;
var templateObject_1;
//# sourceMappingURL=CDetailContentWrapper.js.map