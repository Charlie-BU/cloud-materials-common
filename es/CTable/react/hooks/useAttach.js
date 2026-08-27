/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:12:22
 * @LastEditTime: 2021-10-20 11:25:25
 * @LastEditors: youjingyu
 * @Description:
 */
import { useRef, useEffect } from 'react';
export var useAttach = function (target) {
    var oldTargetRef = useRef(null);
    useEffect(function () {
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
//# sourceMappingURL=useAttach.js.map