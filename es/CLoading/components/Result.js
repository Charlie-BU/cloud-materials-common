import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Result } from '@arco-design/web-react';
import { Icon404ErrorHighSaturation, Icon404ErrorLowSaturation, Icon403ErrorHighSaturation, Icon403ErrorLowSaturation, IconNoChartLowSaturation, IconNoChartHighSaturation, IconNoPicHighSaturation, IconNoPicLowSaturation, IconErrorTypeHighSaturation, IconErrorTypeLowSaturation, IconErrorTypeSimplified, IconSearchNullLowSaturation, IconSearchNullHighSaturation, IconSearchNullSimplified, IconNoContentHighSaturation, IconNoContentLowSaturation, IconNoContentSimplified, IconNetWorkErrorSimplified, IconNetworkErrorHighSaturation, IconNetworkErrorLowSaturation, IconNoDataHighSaturation, IconNoDataLowSaturation, IconNoDataSimplified, IconNoPermissionHighSaturation, IconNoPermissionLowSaturation, IconNoPermissionSimplified, } from '@arco-design/iconbox-react-ve-o-design';
import { CConfigContext } from '../../CConfigProvider';
import { TEST_ID } from '../constants';
/**
 * 请使用 CLoadingV2.Result 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
var CResult = function (props) {
    var style = props.style, className = props.className, arcoResultProps = props.arcoResultProps, children = props.children, _a = props.status, status = _a === void 0 ? 'no-picture' : _a, _b = props.size, size = _b === void 0 ? 'large' : _b, title = props.title, _c = props.extra, extra = _c === void 0 ? null : _c, icon = props.icon;
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
            case 'no-picture-gray':
                return React.createElement(IconNoPicLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission':
                return React.createElement(IconNoPermissionHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission-gray':
                return React.createElement(IconNoPermissionLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission-simple':
                return React.createElement(IconNoPermissionSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data':
                return React.createElement(IconNoDataHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data-gray':
                return React.createElement(IconNoDataLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data-simple':
                return React.createElement(IconNoDataSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result':
                return React.createElement(IconSearchNullHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result-gray':
                return React.createElement(IconSearchNullLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result-simple':
                return React.createElement(IconSearchNullSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type':
                return React.createElement(IconErrorTypeHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type-gray':
                return React.createElement(IconErrorTypeLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type-simple':
                return React.createElement(IconErrorTypeSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content':
                return React.createElement(IconNoContentHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content-gray':
                return React.createElement(IconNoContentLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content-simple':
                return React.createElement(IconNoContentSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error':
                return React.createElement(IconNetworkErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error-gray':
                return React.createElement(IconNetworkErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error-simple':
                return (React.createElement(React.Fragment, null,
                    React.createElement(IconNetWorkErrorSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit })));
            // return <IconNetWorkErrorSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
            case '404-error':
                return React.createElement(Icon404ErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '404-error-gray':
                return React.createElement(Icon404ErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '403-error':
                return React.createElement(Icon403ErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '403-error-gray':
                return React.createElement(Icon403ErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-chart':
                return React.createElement(IconNoChartHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-chart-gray':
                return React.createElement(IconNoChartLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case null:
            default:
                return icon;
        }
    }, [status, customSize]);
    return (React.createElement(Result, __assign({ className: classNames(cssRoot, className), style: style, status: null, title: title, extra: extra, children: children, icon: customIcon, "data-cy": TEST_ID.result }, arcoResultProps)));
};
CResult.displayName = 'CResult';
export default CResult;
var templateObject_1;
//# sourceMappingURL=Result.js.map