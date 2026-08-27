import { __assign, __makeTemplateObject } from "tslib";
import { IconNoPicHighSaturation } from '@arco-design/iconbox-react-ve-o-design';
import { Result } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';
var CResult = function (props) {
    var style = props.style, className = props.className, arcoResultProps = props.arcoResultProps, children = props.children, _a = props.status, status = _a === void 0 ? 'no-picture' : _a, _b = props.size, size = _b === void 0 ? 'large' : _b, title = props.title, _c = props.extra, extra = _c === void 0 ? null : _c;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('result');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
    var customSize = useMemo(function () {
        switch (size) {
            case 'small':
                return 48;
            case 'medium':
                return 60;
            case 'large':
                return 80;
            default:
                return size;
        }
    }, [size]);
    var customIcon = useMemo(function () {
        var sizeWithUnit = "".concat(customSize, "px");
        switch (status) {
            case 'no-picture':
                return React.createElement(IconNoPicHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            default: {
                if (React.isValidElement(status)) {
                    return React.cloneElement(status, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
                }
                return status;
            }
        }
    }, [status, customSize]);
    return (React.createElement(Result, __assign({ className: classNames(cssRoot, className), style: style, status: null, title: title, extra: extra, children: children, icon: customIcon, "data-cy": TEST_ID.result }, arcoResultProps)));
};
CResult.displayName = 'CResult';
export default CResult;
var templateObject_1;
//# sourceMappingURL=Result.js.map