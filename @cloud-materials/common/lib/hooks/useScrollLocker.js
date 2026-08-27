"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var dynamicCSS_1 = require("rc-util/es/Dom/dynamicCSS");
var getScrollBarSize_1 = require("rc-util/es/getScrollBarSize");
var isBodyOverflowing = function () {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
        window.innerWidth > document.body.offsetWidth;
};
var UNIQUE_ID = "scroll-locker-".concat(Date.now());
var uuid = 0;
function useScrollLocker(lock) {
    var mergedLock = !!lock;
    var _a = tslib_1.__read((0, react_1.useState)(function () { return "".concat(UNIQUE_ID, "_").concat((uuid += 1)); }), 1), id = _a[0];
    (0, react_1.useLayoutEffect)(function () {
        if (mergedLock) {
            var scrollbarSize = (0, getScrollBarSize_1.getTargetScrollBarSize)(document.body).width;
            var isOverflow = isBodyOverflowing();
            (0, dynamicCSS_1.updateCSS)("html body {overflow-y: hidden;".concat(isOverflow ? "width: calc(100% - ".concat(scrollbarSize, "px);") : '', "}"), id);
        }
        else {
            (0, dynamicCSS_1.removeCSS)(id);
        }
        return function () {
            (0, dynamicCSS_1.removeCSS)(id);
        };
    }, [mergedLock, id]);
}
exports.default = useScrollLocker;
//# sourceMappingURL=useScrollLocker.js.map