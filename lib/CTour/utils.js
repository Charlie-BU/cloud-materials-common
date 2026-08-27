"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInViewPort = void 0;
function isInViewPort(element) {
    var viewWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewHeight = window.innerHeight || document.documentElement.clientHeight;
    var _a = element.getBoundingClientRect(), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
exports.isInViewPort = isInViewPort;
//# sourceMappingURL=utils.js.map