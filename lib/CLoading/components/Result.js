"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../../CConfigProvider");
var constants_1 = require("../constants");
/**
 * 请使用 CLoadingV2.Result 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
var CResult = function (props) {
    var style = props.style, className = props.className, arcoResultProps = props.arcoResultProps, children = props.children, _a = props.status, status = _a === void 0 ? 'no-picture' : _a, _b = props.size, size = _b === void 0 ? 'large' : _b, title = props.title, _c = props.extra, extra = _c === void 0 ? null : _c, icon = props.icon;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('result');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
    var customSize = (0, react_1.useMemo)(function () {
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
    var customIcon = (0, react_1.useMemo)(function () {
        var sizeWithUnit = "".concat(customSize, "px");
        switch (status) {
            case 'no-picture':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoPicHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-picture-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoPicLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoPermissionHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoPermissionLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-permission-simple':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoPermissionSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoDataHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoDataLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-data-simple':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoDataSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearchNullHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearchNullLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-search-result-simple':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearchNullSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconErrorTypeHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconErrorTypeLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'error-type-simple':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconErrorTypeSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoContentHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoContentLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-content-simple':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoContentSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNetworkErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNetworkErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'network-error-simple':
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconNetWorkErrorSimplified, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit })));
            // return <IconNetWorkErrorSimplified width={sizeWithUnit} height={sizeWithUnit} fontSize={sizeWithUnit} />;
            case '404-error':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.Icon404ErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '404-error-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.Icon404ErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '403-error':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.Icon403ErrorHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case '403-error-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.Icon403ErrorLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-chart':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoChartHighSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case 'no-chart-gray':
                return react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoChartLowSaturation, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
            case null:
            default:
                return icon;
        }
    }, [status, customSize]);
    return (react_1.default.createElement(web_react_1.Result, tslib_1.__assign({ className: (0, classnames_1.default)(cssRoot, className), style: style, status: null, title: title, extra: extra, children: children, icon: customIcon, "data-cy": constants_1.TEST_ID.result }, arcoResultProps)));
};
CResult.displayName = 'CResult';
exports.default = CResult;
var templateObject_1;
//# sourceMappingURL=Result.js.map