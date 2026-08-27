"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourStep = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importStar(require("react"));
var DefaultPanel_1 = require("./DefaultPanel");
var DefaultOffset = 12;
var TourStep = function (props) {
    var realPosition = props.realPosition, classNamePrefix = props.classNamePrefix, hotspotStyle = props.hotspotStyle, restProps = tslib_1.__rest(props, ["realPosition", "classNamePrefix", "hotspotStyle"]);
    var _a = restProps.current, current = _a === void 0 ? 0 : _a, renderPanel = restProps.renderPanel, hotspot = restProps.hotspot;
    var hospotCls = "".concat(classNamePrefix, "-hotspot");
    var hotspotStyleInner = (0, react_1.useMemo)(function () {
        switch (realPosition) {
            case 'top':
            case 'tl':
            case 'tr':
                return { marginTop: DefaultOffset };
            case 'lt':
            case 'left':
            case 'lb':
                return { marginLeft: DefaultOffset, left: '100%' };
            case 'rt':
            case 'right':
            case 'rb':
                return { marginLeft: -DefaultOffset };
            default:
                return { marginTop: -DefaultOffset, top: 0 };
        }
    }, [realPosition]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        typeof renderPanel === 'function' ? renderPanel(props, current) : react_1.default.createElement(DefaultPanel_1.DefaultPanel, tslib_1.__assign({}, restProps)),
        hotspot && realPosition && (react_1.default.createElement("div", { className: (0, classnames_1.default)(hospotCls, "".concat(hospotCls, "-").concat(realPosition), "".concat(hospotCls, "-").concat(hotspot)), style: tslib_1.__assign(tslib_1.__assign({}, hotspotStyle), hotspotStyleInner) }))));
};
exports.TourStep = TourStep;
//# sourceMappingURL=TourStep.js.map