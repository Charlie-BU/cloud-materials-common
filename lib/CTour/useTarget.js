"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTarget = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var utils_1 = require("./utils");
var ahooks_1 = require("ahooks");
function isValidNumber(val) {
    return typeof val === 'number' && !Number.isNaN(val);
}
function useTarget(_a) {
    var target = _a.target, open = _a.open, gap = _a.gap, scrollIntoView = _a.scrollIntoView;
    // ========================= Target =========================
    // We trade `undefined` as not get target by function yet.
    // `null` as empty target.
    var _b = tslib_1.__read((0, react_1.useState)(), 2), targetElement = _b[0], setTargetElement = _b[1];
    (0, react_1.useLayoutEffect)(function () {
        var nextElement = typeof target === 'function' ? target() : target;
        setTargetElement(nextElement || null);
    });
    var _c = tslib_1.__read((0, react_1.useState)(), 2), posInfo = _c[0], setPosInfo = _c[1];
    var updatePos = (0, ahooks_1.useMemoizedFn)(function () {
        if (targetElement) {
            // Exist target element. We should scroll and get target position
            if (!(0, utils_1.isInViewPort)(targetElement) && open && scrollIntoView !== false) {
                targetElement.scrollIntoView(scrollIntoView);
            }
            var _a = targetElement.getBoundingClientRect(), left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
            var nextPosInfo_1 = { left: left, top: top_1, width: width, height: height, radius: 0 };
            setPosInfo(function (origin) {
                if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo_1)) {
                    return nextPosInfo_1;
                }
                return origin;
            });
        }
        else {
            // Not exist target which means we just show in center
            setPosInfo(void 0);
        }
    });
    var getGapOffset = function (index) { var _a; return (_a = (Array.isArray(gap === null || gap === void 0 ? void 0 : gap.offset) ? gap === null || gap === void 0 ? void 0 : gap.offset[index] : gap === null || gap === void 0 ? void 0 : gap.offset)) !== null && _a !== void 0 ? _a : 6; };
    (0, react_1.useLayoutEffect)(function () {
        updatePos();
        // update when window resize
        window.addEventListener('resize', updatePos);
        return function () {
            window.removeEventListener('resize', updatePos);
        };
    }, [targetElement, open, updatePos]);
    // ======================== PosInfo =========================
    var mergedPosInfo = (0, react_1.useMemo)(function () {
        if (!posInfo) {
            return posInfo;
        }
        var gapOffsetX = getGapOffset(0);
        var gapOffsetY = getGapOffset(1);
        var gapRadius = isValidNumber(gap === null || gap === void 0 ? void 0 : gap.radius) ? gap === null || gap === void 0 ? void 0 : gap.radius : 2;
        return {
            left: posInfo.left - gapOffsetX,
            top: posInfo.top - gapOffsetY,
            width: posInfo.width + gapOffsetX * 2,
            height: posInfo.height + gapOffsetY * 2,
            radius: gapRadius,
        };
    }, [posInfo, gap]);
    return [mergedPosInfo, posInfo, targetElement];
}
exports.useTarget = useTarget;
//# sourceMappingURL=useTarget.js.map