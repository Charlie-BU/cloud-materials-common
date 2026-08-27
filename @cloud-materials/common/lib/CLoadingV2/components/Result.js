"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var constants_1 = require("../constants");
var CResult = function (props) {
    var style = props.style, className = props.className, arcoResultProps = props.arcoResultProps, children = props.children, _a = props.status, status = _a === void 0 ? 'no-picture' : _a, _b = props.size, size = _b === void 0 ? 'large' : _b, title = props.title, _c = props.extra, extra = _c === void 0 ? null : _c;
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
            default: {
                if (react_1.default.isValidElement(status)) {
                    return react_1.default.cloneElement(status, { width: sizeWithUnit, height: sizeWithUnit, fontSize: sizeWithUnit });
                }
                return status;
            }
        }
    }, [status, customSize]);
    return (react_1.default.createElement(web_react_1.Result, tslib_1.__assign({ className: (0, classnames_1.default)(cssRoot, className), style: style, status: null, title: title, extra: extra, children: children, icon: customIcon, "data-cy": constants_1.TEST_ID.result }, arcoResultProps)));
};
CResult.displayName = 'CResult';
exports.default = CResult;
var templateObject_1;
//# sourceMappingURL=Result.js.map