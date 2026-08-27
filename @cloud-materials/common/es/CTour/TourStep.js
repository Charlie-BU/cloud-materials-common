import { __assign, __rest } from "tslib";
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { DefaultPanel } from './DefaultPanel';
var DefaultOffset = 12;
export var TourStep = function (props) {
    var realPosition = props.realPosition, classNamePrefix = props.classNamePrefix, hotspotStyle = props.hotspotStyle, restProps = __rest(props, ["realPosition", "classNamePrefix", "hotspotStyle"]);
    var _a = restProps.current, current = _a === void 0 ? 0 : _a, renderPanel = restProps.renderPanel, hotspot = restProps.hotspot;
    var hospotCls = "".concat(classNamePrefix, "-hotspot");
    var hotspotStyleInner = useMemo(function () {
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
    return (React.createElement(React.Fragment, null,
        typeof renderPanel === 'function' ? renderPanel(props, current) : React.createElement(DefaultPanel, __assign({}, restProps)),
        hotspot && realPosition && (React.createElement("div", { className: classNames(hospotCls, "".concat(hospotCls, "-").concat(realPosition), "".concat(hospotCls, "-").concat(hotspot)), style: __assign(__assign({}, hotspotStyle), hotspotStyleInner) }))));
};
//# sourceMappingURL=TourStep.js.map