"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollPosition = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var react_1 = require("react");
var getTargetElement_1 = require("../../../_utils/getTargetElement");
var resize_observer_1 = tslib_1.__importDefault(require("@react-hook/resize-observer"));
/**
 * 滚动时能自动加上阴影效果，滚动到顶部自动去掉阴影效果
 */
var useScrollPosition = function (scrollElement) {
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), shouldTopShadow = _a[0], setTopShadow = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), shouldBottomShadow = _b[0], setBottomShadow = _b[1];
    var _c = (0, ahooks_1.useThrottleFn)(function (scrollElement) {
        var scrollElementHeight = scrollElement.clientHeight;
        var scrollElementScrollHeight = scrollElement.scrollHeight;
        // const [topShadow, bottomShadow] = boxShadow;
        if (scrollElementScrollHeight > scrollElementHeight) {
            setTopShadow(scrollElement.scrollTop > 0);
            setBottomShadow(scrollElement.scrollTop < scrollElementScrollHeight - scrollElementHeight);
        }
        else {
            setTopShadow(false);
            setBottomShadow(false);
        }
    }, { wait: 200 }), setShadow = _c.run, flush = _c.flush;
    (0, react_1.useEffect)(function () {
        var element = scrollElement && (0, getTargetElement_1.getTargetElement)(scrollElement);
        if (element) {
            setShadow(element);
        }
    }, [scrollElement]);
    (0, resize_observer_1.default)(scrollElement, function (_a) {
        var target = _a.target;
        setShadow(target);
        // 立即执行，忽略防抖
        flush();
    });
    (0, ahooks_1.useEventListener)('scroll', function (e) {
        var scrollElement = e.target;
        setShadow(scrollElement);
    }, { target: scrollElement });
    return [shouldTopShadow, shouldBottomShadow];
};
exports.useScrollPosition = useScrollPosition;
//# sourceMappingURL=useScrollShadow.js.map