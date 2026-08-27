import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Spin } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/iconbox-react-ve-o-design';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';
var CSpin = function (props) {
    var style = props.style, className = props.className, _a = props.size, size = _a === void 0 ? 'small' : _a, _b = props.loading, loading = _b === void 0 ? false : _b, _c = props.isBlock, isBlock = _c === void 0 ? false : _c, arcoSpinProps = props.arcoSpinProps, children = props.children;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('spin');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
    var customSize = useMemo(function () {
        switch (size) {
            case 'small':
                return 24;
            case 'large':
                return 48;
            default:
                return size;
        }
    }, [size]);
    return (React.createElement(Spin, __assign({ className: classNames(cssRoot, className), style: style, size: customSize, icon: React.createElement(IconLoading, null), loading: loading, children: children, block: isBlock, "data-cy": TEST_ID.spin }, arcoSpinProps)));
};
CSpin.displayName = 'CSpin';
export default CSpin;
var templateObject_1;
//# sourceMappingURL=Spin.js.map