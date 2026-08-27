"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollLoad = void 0;
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
//不用ahooks里面useInfiniteScroll自带滚动加载的逻辑原因有三个：
//1. useInfiniteScroll是通过挂载ref在父级元素上，根据父级元素的高度、滚动高度等判断触发滚动加载等逻辑，但是select，option的父级是pop-inner，arco不支持外部挂载，且外面套层div，挂载在div上也不行。
//2. 无法设置debounceTime的逻辑，useInfiniteScroll内部不支持。
//3. 更灵活
var useScrollLoad = function (options) {
    var cb = options.cb, disabled = options.disabled, debounceTime = options.debounceTime;
    var scrollBottomToLoad = 10;
    var scrollHandler = (0, react_1.useCallback)((0, lodash_es_1.debounce)(function (element) {
        var scrollTop = element.scrollTop, scrollHeight = element.scrollHeight, clientHeight = element.clientHeight;
        var scrollBottom = scrollHeight - (scrollTop + clientHeight);
        if (scrollBottom < scrollBottomToLoad && !disabled) {
            cb();
        }
    }, debounceTime), [cb, disabled]);
    return scrollHandler;
};
exports.useScrollLoad = useScrollLoad;
//# sourceMappingURL=useScrollLoad.js.map