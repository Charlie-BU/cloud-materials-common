import { __assign } from "tslib";
var TreeTransferHelper = /** @class */ (function () {
    function TreeTransferHelper() {
        var _this = this;
        this.sourceFlattenMap = new Map();
        this.targetFlattenMap = new Map();
        this.sourceData = [];
        // 保存一份 target 树形结构，便于搜索时使用
        this.targetData = [];
        // 一份备份的 sourceTree 数据，在设置了自动展开时根据其判断是否为新加载数据
        this.oldSourceFlattenMap = new Map();
        this.sourceSearchStr = '';
        this.targetSearchStr = '';
        /**
         * 保存 Loading 状态的 Map
         */
        this.loadingMap = {};
        this.setSourceData = function (data) {
            _this.sourceData = data;
        };
        this.setSourceFlattenMap = function (map) {
            _this.sourceFlattenMap = map;
        };
        this.setOldSourceFlattenMap = function (map) {
            _this.oldSourceFlattenMap = map;
        };
        this.setTargetFlattenMap = function (map) {
            _this.targetFlattenMap = map;
        };
        this.setTargetData = function (data) {
            _this.targetData = data;
        };
        this.setSourceSearchStr = function (str) {
            _this.sourceSearchStr = str;
        };
        this.setTargetSearchStr = function (str) {
            _this.targetSearchStr = str;
        };
        // loadMore 按钮的加载状态。根据其判断是否要让按钮显示 loading 状态
        this.setGetDataLoading = function (loadingKey, isLoading) {
            var _a;
            _this.loadingMap = __assign(__assign({}, _this.loadingMap), (_a = {}, _a[loadingKey] = isLoading, _a));
        };
        this.getDataLoading = function (loadingKey) {
            var _a;
            return (_a = _this.loadingMap) === null || _a === void 0 ? void 0 : _a[loadingKey];
        };
    }
    return TreeTransferHelper;
}());
export { TreeTransferHelper };
//# sourceMappingURL=class.js.map