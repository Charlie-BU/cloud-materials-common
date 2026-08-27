"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopupContainer = void 0;
var ahooks_1 = require("ahooks");
var getTargetElement_1 = require("../../../_utils/getTargetElement");
var react_1 = require("react");
var usePopupContainer = function (target, refreshFlag) {
    if (refreshFlag === void 0) { refreshFlag = 0; }
    var size = (0, ahooks_1.useSize)(target);
    var canScroll = (0, react_1.useRef)(false);
    var dom = (0, getTargetElement_1.getTargetElement)(target);
    (0, react_1.useEffect)(function () {
        if (dom && (size === null || size === void 0 ? void 0 : size.height)) {
            canScroll.current = dom.scrollHeight > dom.clientHeight;
        }
    }, [size === null || size === void 0 ? void 0 : size.height, dom, refreshFlag]);
    return function () { return (canScroll.current ? dom !== null && dom !== void 0 ? dom : document.body : document.body); };
};
exports.usePopupContainer = usePopupContainer;
//# sourceMappingURL=usePopupContainer.js.map