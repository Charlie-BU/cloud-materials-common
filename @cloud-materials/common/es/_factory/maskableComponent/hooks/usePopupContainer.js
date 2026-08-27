import { useSize } from 'ahooks';
import { getTargetElement } from '../../../_utils/getTargetElement';
import { useEffect, useRef } from 'react';
export var usePopupContainer = function (target, refreshFlag) {
    if (refreshFlag === void 0) { refreshFlag = 0; }
    var size = useSize(target);
    var canScroll = useRef(false);
    var dom = getTargetElement(target);
    useEffect(function () {
        if (dom && (size === null || size === void 0 ? void 0 : size.height)) {
            canScroll.current = dom.scrollHeight > dom.clientHeight;
        }
    }, [size === null || size === void 0 ? void 0 : size.height, dom, refreshFlag]);
    return function () { return (canScroll.current ? dom !== null && dom !== void 0 ? dom : document.body : document.body); };
};
//# sourceMappingURL=usePopupContainer.js.map