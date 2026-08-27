import { __awaiter, __extends, __generator } from "tslib";
import { TreeTransferHelper } from '../class';
import { cloneDeep } from 'lodash-es';
import { deleteRemoveItem, findItemByPath, formatAddItem, generateMergeItem, getSourceCheckedKeys, mergeAddItem, } from './utils';
var RemoteExpandHelpers = /** @class */ (function (_super) {
    __extends(RemoteExpandHelpers, _super);
    function RemoteExpandHelpers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.init = function (data) {
            _this.props = data;
        };
        _this.getNodeDataFromSource = function (item) {
            var dataRef = item.dataRef, _a = item.pathParentKeys, pathParentKeys = _a === void 0 ? [] : _a;
            var nodeData = _this.sourceFlattenMap.get((dataRef === null || dataRef === void 0 ? void 0 : dataRef.key) || '');
            return { nodeData: nodeData, pathParentKeys: pathParentKeys };
        };
        _this.getNodeDataFromTarget = function (item) {
            var dataRef = item.dataRef, _a = item.pathParentKeys, pathParentKeys = _a === void 0 ? [] : _a;
            var nodeData = _this.targetFlattenMap.get((dataRef === null || dataRef === void 0 ? void 0 : dataRef.key) || '');
            return { nodeData: nodeData, pathParentKeys: pathParentKeys };
        };
        _this.getExpandData = function (nodeArr, key) { return __awaiter(_this, void 0, void 0, function () {
            var nodeItemIndex, nodeItem, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodeItemIndex = nodeArr.findIndex(function (item) { return item.key === key; });
                        nodeItem = nodeArr[nodeItemIndex];
                        if (!nodeItem) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onExpand(nodeItem)];
                    case 1:
                        newData = _a.sent();
                        return [2 /*return*/, { newData: newData, nodeItemIndex: nodeItemIndex }];
                    case 2: return [2 /*return*/, { newData: nodeItem, nodeItemIndex: nodeItemIndex }];
                }
            });
        }); };
        // 展开时加载子节点
        _this.getData = function (path) { return __awaiter(_this, void 0, void 0, function () {
            var cloneSourceTree, nodeParent, _a, newData_1, nodeItemIndex_1, _b, newData, nodeItemIndex;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cloneSourceTree = cloneDeep(this.sourceData);
                        if (!(path.length > 1)) return [3 /*break*/, 3];
                        nodeParent = findItemByPath(path.slice(0, path.length - 1), cloneSourceTree);
                        if (!(nodeParent === null || nodeParent === void 0 ? void 0 : nodeParent.children)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getExpandData(nodeParent.children, path[path.length - 1])];
                    case 1:
                        _a = _c.sent(), newData_1 = _a.newData, nodeItemIndex_1 = _a.nodeItemIndex;
                        nodeParent['children'][nodeItemIndex_1] = newData_1;
                        return [2 /*return*/, cloneSourceTree];
                    case 2: return [2 /*return*/, this.sourceData];
                    case 3: return [4 /*yield*/, this.getExpandData(cloneSourceTree, path[0])];
                    case 4:
                        _b = _c.sent(), newData = _b.newData, nodeItemIndex = _b.nodeItemIndex;
                        cloneSourceTree[nodeItemIndex] = newData;
                        return [2 /*return*/, cloneSourceTree];
                }
            });
        }); };
        _this.handleAddItem = function (addItem) {
            var _a = _this.getNodeDataFromSource(addItem), nodeData = _a.nodeData, pathParentKeys = _a.pathParentKeys;
            if (!nodeData) {
                return _this.targetData;
            }
            var mergeItem = generateMergeItem(_this.sourceData, pathParentKeys, nodeData);
            var cloneTargetTree = cloneDeep(_this.targetData);
            var newData = mergeAddItem(mergeItem, cloneTargetTree);
            return newData;
        };
        _this.handleRemoveItem = function (removeItem, isFromSource) {
            if (isFromSource === void 0) { isFromSource = true; }
            var _a = isFromSource
                ? _this.getNodeDataFromSource(removeItem)
                : _this.getNodeDataFromTarget(removeItem), nodeData = _a.nodeData, pathParentKeys = _a.pathParentKeys;
            if (!nodeData) {
                return _this.targetData;
            }
            var newData = deleteRemoveItem({
                removeItem: nodeData,
                sourceTree: _this.sourceData,
                targetTree: _this.targetData,
                pathParent: pathParentKeys,
            });
            return newData;
        };
        _this.getCheckedKeys = function () {
            return getSourceCheckedKeys(_this.sourceData, _this.targetFlattenMap);
        };
        _this.handleSelectAll = function (flag) {
            if (!flag) {
                return [];
            }
            return _this.sourceData.map(function (item) {
                return formatAddItem(item);
            });
        };
        // 获取进行选中/移除操作时新增的展开节点
        _this.getNewExpandKeys = function (item, isChecked) {
            var _a;
            var _b = item.parentKey, parentKey = _b === void 0 ? '' : _b, _c = item.pathParentKeys, pathParentKeys = _c === void 0 ? [] : _c;
            if (isChecked) {
                var parentItem = _this.targetFlattenMap.get(parentKey);
                // 选中节点时，判断其父节点当前是否已选中，若未选中则将其父节点展开
                if (!parentItem) {
                    return pathParentKeys;
                }
                return [];
            }
            // 移除节点时，若本次移除节点在已选列表中不存在，则说明父节点当前为全选，移除后需要将其父节点展开
            var itemKey = ((_a = item.dataRef) === null || _a === void 0 ? void 0 : _a.key) || '';
            var curTargetItem = _this.targetFlattenMap.get(itemKey);
            if (!curTargetItem) {
                return pathParentKeys;
            }
            return [];
        };
        return _this;
    }
    return RemoteExpandHelpers;
}(TreeTransferHelper));
export { RemoteExpandHelpers };
//# sourceMappingURL=remoteExpandClass.js.map