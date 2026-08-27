"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAttach = void 0;
/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:12:22
 * @LastEditTime: 2021-10-20 11:25:25
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = require("react");
var useAttach = function (target) {
    var oldTargetRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (oldTargetRef.current && target !== oldTargetRef.current) {
            oldTargetRef.current.onUnmount();
        }
        oldTargetRef.current = target;
        target.onMount();
        return function () {
            target.onUnmount();
        };
    }, [target]);
    return target;
};
exports.useAttach = useAttach;
//# sourceMappingURL=useAttach.js.map