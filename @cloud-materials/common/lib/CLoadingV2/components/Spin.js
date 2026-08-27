"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../../CConfigProvider");
var constants_1 = require("../constants");
var CSpin = function (props) {
    var style = props.style, className = props.className, _a = props.size, size = _a === void 0 ? 'small' : _a, _b = props.loading, loading = _b === void 0 ? false : _b, _c = props.isBlock, isBlock = _c === void 0 ? false : _c, arcoSpinProps = props.arcoSpinProps, children = props.children;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('spin');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
    var customSize = (0, react_1.useMemo)(function () {
        switch (size) {
            case 'small':
                return 24;
            case 'large':
                return 48;
            default:
                return size;
        }
    }, [size]);
    return (react_1.default.createElement(web_react_1.Spin, tslib_1.__assign({ className: (0, classnames_1.default)(cssRoot, className), style: style, size: customSize, icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconLoading, null), loading: loading, children: children, block: isBlock, "data-cy": constants_1.TEST_ID.spin }, arcoSpinProps)));
};
CSpin.displayName = 'CSpin';
exports.default = CSpin;
var templateObject_1;
//# sourceMappingURL=Spin.js.map