"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRemoveItem = exports.getSourceCheckedKeys = exports.getNodeAllChild = exports.mergeAddItem = exports.generateMergeItem = exports.formatAddItem = exports.findItemByPath = exports.findItem = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var utils_1 = require("../utils");
var findItem = function (data, key) {
    return data.find(function (item) { return item.key === key; });
};
exports.findItem = findItem;
var findItemByPath = function (pathParentKeys, transferTree) {
    var item = (0, exports.findItem)(transferTree, pathParentKeys[0]);
    if (pathParentKeys.length === 1 || !item) {
        return item;
    }
    return (0, exports.findItemByPath)(pathParentKeys.slice(1), item.children || []);
};
exports.findItemByPath = findItemByPath;
// 格式化新增的 item。 若本次添加为全选该节点，则将其移到右侧时设置其为叶子节点，不支持展开
var formatAddItem = function (item) {
    var _a, _b;
    var childrenData = (_a = item.children) === null || _a === void 0 ? void 0 : _a.map(exports.formatAddItem);
    var isItemCheckAll = item.isClickCheckAll || !((_b = item.children) === null || _b === void 0 ? void 0 : _b.length);
    return tslib_1.__assign(tslib_1.__assign({}, item), { isLeaf: isItemCheckAll, children: isItemCheckAll ? [] : childrenData, 
        // 选中时的实际子数据。当全选节点在显示上其为叶子节点，但外层可能有使用此时子数据的需求，因此另外维护该数据
        childrenData: childrenData });
};
exports.formatAddItem = formatAddItem;
// 生成与已选中列表 merge 的数据。其需要有完整的层级结构
var generateMergeItem = function (data, pathParentKeys, addItem) {
    if (!pathParentKeys.length) {
        return (0, exports.formatAddItem)(addItem);
    }
    var mergeItem = data.find(function (item) { return item.key === pathParentKeys[0]; });
    if (mergeItem) {
        return tslib_1.__assign(tslib_1.__assign({}, mergeItem), { children: [(0, exports.generateMergeItem)(mergeItem.children || [], pathParentKeys.slice(1), addItem)] });
    }
    return addItem;
};
exports.generateMergeItem = generateMergeItem;
var mergeAddItem = function (newItem, targetData) {
    var _a;
    // const cloneTargetData = cloneDeep(targetData);
    // 不再每次 clone，耗时较长。在进入时将 clone 后的值传入
    var cloneTargetData = targetData;
    // 找到已选列表中对应节点
    var targetNodeIndex = cloneTargetData.findIndex(function (item) { return item.key === newItem.key; });
    var targetNode = cloneTargetData[targetNodeIndex];
    // 若无对应节点，则直接将新增节点放入
    if (!targetNode) {
        cloneTargetData.push(newItem);
        return cloneTargetData;
    }
    // 如果本次新选中节点为全选，且已选中节点不为全选（一定，否则不会走到添加逻辑），将当前选中节点中的该节点数据替换为新的添加数据
    if (newItem.isLeaf && !targetNode.isLeaf) {
        cloneTargetData[targetNodeIndex] = newItem;
        return cloneTargetData;
    }
    if ((0, utils_1.isTwoNodeChildSame)(newItem, targetNode)) {
        return cloneTargetData;
    }
    var newChildren = targetNode.children || [];
    (_a = newItem.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
        var _a;
        // 如果 targetNode 中已存在子节点与新的节点为叶子结点或子孙节点完全相同，则不进行递归添加
        var targetChildNode = (_a = targetNode.children) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.key === child.key; });
        if (targetChildNode && (targetChildNode.isLeaf || (0, utils_1.isTwoNodeChildSame)(child, targetChildNode))) {
            newChildren.push(targetChildNode);
            return;
        }
        if (!targetChildNode) {
            newChildren.push(child);
            return;
        }
        var data = (0, exports.mergeAddItem)(child, targetNode.children || []);
        var newItem = data.find(function (item) { return item.key === child.key; });
        if (newItem) {
            var childIndex = newChildren.findIndex(function (item) { return item.key === newItem.key; });
            if (childIndex > -1) {
                newChildren[childIndex] = newItem;
                return;
            }
            newChildren.push(newItem);
        }
    });
    targetNode.children = (0, lodash_es_1.uniqBy)(newChildren, 'key');
    return cloneTargetData;
};
exports.mergeAddItem = mergeAddItem;
var getNodeAllChild = function (node) {
    var _a, _b;
    var childIds = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item.key; })) || [];
    (_b = node.children) === null || _b === void 0 ? void 0 : _b.forEach(function (child) {
        childIds = childIds === null || childIds === void 0 ? void 0 : childIds.concat((0, exports.getNodeAllChild)(child));
    });
    return childIds;
};
exports.getNodeAllChild = getNodeAllChild;
var getSourceCheckedKeys = function (sourceData, targetFlattenMap) {
    var checkedKeys = [];
    var halfCheckedKeys = [];
    sourceData.forEach(function (item) {
        var targetItem = targetFlattenMap.get(item.key);
        if (!targetItem) {
            return;
        }
        if (targetItem === null || targetItem === void 0 ? void 0 : targetItem.isLeaf) {
            // 选中节点 isLeaf 为 true,说明其不能展开，状态为全选
            checkedKeys.push(item.key);
            var childIds = (0, exports.getNodeAllChild)(item);
            checkedKeys.push.apply(checkedKeys, tslib_1.__spreadArray([], tslib_1.__read(childIds), false));
        }
        else {
            // 可展开时，说明选中了该节点的子节点，该节点为半选状态
            halfCheckedKeys.push(item.key);
            var _a = (0, exports.getSourceCheckedKeys)(item.children || [], targetFlattenMap), childCheckedKeys = _a.checkedKeys, childHalfCheckedKeys = _a.halfCheckedKeys;
            checkedKeys = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(checkedKeys), false), tslib_1.__read(childCheckedKeys), false);
            halfCheckedKeys.push.apply(halfCheckedKeys, tslib_1.__spreadArray([], tslib_1.__read(childHalfCheckedKeys), false));
        }
    });
    return { checkedKeys: checkedKeys, halfCheckedKeys: halfCheckedKeys };
};
exports.getSourceCheckedKeys = getSourceCheckedKeys;
var deleteRemoveItem = function (_a) {
    var _b, _c;
    var removeItem = _a.removeItem, _d = _a.sourceTree, sourceTree = _d === void 0 ? [] : _d, _e = _a.targetTree, targetTree = _e === void 0 ? [] : _e, pathParent = _a.pathParent;
    // 一级一级寻找节点，直到找到本次移除节点的层级。
    if (!pathParent.length) {
        // 若当前层级的无以选中节点，则说明其父节点为全选状态，此时应将其设置为 sourceTree - 本次移除节点
        if (!targetTree.length) {
            var newChosenTree = sourceTree.filter(function (item) { return item.key !== removeItem.key; });
            return newChosenTree;
        }
        // 若当前层级有该节点，则将其移除即可
        return targetTree.filter(function (item) { return item.key !== removeItem.key; });
    }
    var cloneTargetTree = (0, lodash_es_1.cloneDeep)(targetTree);
    var sourceItem = sourceTree.find(function (item) { return item.key === pathParent[0]; });
    var targetItem = cloneTargetTree.find(function (item) { return item.key === pathParent[0]; });
    if (!targetItem) {
        return targetTree;
    }
    // 当前层级选中节点已无子节点，即之前为全选状态。则需要为其 children 赋值为 Source 的下级节点继续进行后续递归操作
    if ((targetItem === null || targetItem === void 0 ? void 0 : targetItem.isLeaf) && sourceItem && !(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.isLeaf)) {
        targetItem.isLeaf = false;
        targetItem.children = (_b = sourceItem.children) === null || _b === void 0 ? void 0 : _b.map(exports.formatAddItem);
    }
    targetItem.children = (0, exports.deleteRemoveItem)({
        removeItem: removeItem,
        sourceTree: sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.children,
        targetTree: targetItem === null || targetItem === void 0 ? void 0 : targetItem.children,
        pathParent: pathParent.slice(1),
    });
    // 若移除子节点后其子节点列表为空，则将该节点也移除
    if (!((_c = targetItem === null || targetItem === void 0 ? void 0 : targetItem.children) === null || _c === void 0 ? void 0 : _c.length)) {
        cloneTargetTree = cloneTargetTree.filter(function (item) { return item.key !== (targetItem === null || targetItem === void 0 ? void 0 : targetItem.key); });
    }
    else {
        // 若移除子节点后其子节点列表不为空，则将该节点 isLeaf 设置为false
        targetItem.isLeaf = false;
    }
    return cloneTargetTree;
};
exports.deleteRemoveItem = deleteRemoveItem;
//# sourceMappingURL=utils.js.map