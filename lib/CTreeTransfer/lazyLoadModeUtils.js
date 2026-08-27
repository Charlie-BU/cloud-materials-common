"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLoadButton = exports.genTreeRenderData = exports.setRenderData = exports.genLoadMoreItem = exports.removeAllSourceDataInLazyLoad = exports.addAllSourceInLazyLoad = exports.removeItemInLazyLoad = exports.getCheckStatusInLazyLoad = exports.addItemInLazyLoad = exports.firstLevelLoadingKey = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var lodash_es_1 = require("lodash-es");
var utils_1 = require("./utils");
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
exports.firstLevelLoadingKey = 'first-level';
var findItem = function (data, key) {
    return data.find(function (item) { return item.key === key; });
};
/**
 * 选中时设置 Item 状态
 */
var setItemStatus = function (treeItems, searchInfo, extraInfo) {
    return treeItems.map(function (item) {
        return tslib_1.__assign(tslib_1.__assign({}, item), { isCheckAll: true, searchInfo: searchInfo, extraInfo: extraInfo, children: setItemStatus(item.children || [], searchInfo, extraInfo) });
    });
};
// 将指定路径的 item children 设置为新的值
var setItemByPath = function (pathParentKeys, sourceData, curItem) {
    if (pathParentKeys.length === 0) {
        return curItem;
    }
    var item = findItem(sourceData, pathParentKeys[0]);
    if (item) {
        var _a = item.children, children = _a === void 0 ? [] : _a;
        return tslib_1.__assign(tslib_1.__assign({}, item), { children: [setItemByPath(pathParentKeys.slice(1), children, curItem)] || [], extraInfo: (0, lodash_es_1.isEmpty)(item.extraInfo) ? curItem.extraInfo : item.extraInfo, isCheckHalf: true, isCheckAll: false });
    }
    return item || curItem;
};
// 在懒加载模式下 某个 item 是否已是 checkAll 状态，根据其 isCheckAll 参数与其添加时的 searchInfo 和 当前 extraInfo 对比来确定
// 可能在 A 搜索条件下其为全选，但没有搜索条件或改变条件后变为半选
var isItemCheckAll = function (targetItem, curSearchInfo, curExtraInfo) {
    return (targetItem.isCheckAll &&
        (0, lodash_es_1.isEqual)(targetItem.searchInfo || '', curSearchInfo || '') &&
        (0, lodash_es_1.isEqual)(targetItem.extraInfo, curExtraInfo));
};
var setItemCheckStatus = function (_a) {
    var _b, _c, _d;
    var addItem = _a.addItem, sourceItem = _a.sourceItem;
    if (!sourceItem) {
        return;
    }
    if (!((_b = addItem.children) === null || _b === void 0 ? void 0 : _b.length) || addItem.isCheckAll) {
        addItem.isCheckAll = true;
        return;
    }
    addItem.children.forEach(function (childItem) {
        var _a;
        var sourceChild = (_a = sourceItem.children) === null || _a === void 0 ? void 0 : _a.find(function (e) { return e.key === childItem.key; });
        if (sourceChild) {
            setItemCheckStatus({ addItem: childItem, sourceItem: sourceChild });
        }
    });
    var isAllChildCheckAll = !((_c = addItem.children) === null || _c === void 0 ? void 0 : _c.find(function (item) { return !item.isCheckAll; })) &&
        addItem.children.length === ((_d = sourceItem.children) === null || _d === void 0 ? void 0 : _d.length) &&
        !sourceItem.hasMore;
    addItem.isCheckAll = isAllChildCheckAll;
};
// 合并当前已选中树与本次新增/发生修改的树节点
var mergeAddItem = function (_a) {
    var _b, _c, _d;
    var tempData = _a.tempData, addItemObj = _a.addItemObj, curSearchInfo = _a.curSearchInfo, curExtraInfo = _a.curExtraInfo, flattenSourceTreeMap = _a.flattenSourceTreeMap;
    if (!addItemObj) {
        return;
    }
    var chosenItemInTargetIndex = tempData.findIndex(function (item) { return item.key === addItemObj.key; });
    var chosenItemInTarget = chosenItemInTargetIndex > -1 ? tempData[chosenItemInTargetIndex] : undefined;
    // 如果本层无该节点，则直接将新增的节点放入
    if (!chosenItemInTarget) {
        var sourceItem_1 = flattenSourceTreeMap.get(addItemObj.key);
        setItemCheckStatus({ addItem: addItemObj, sourceItem: sourceItem_1 });
        tempData.push(tslib_1.__assign(tslib_1.__assign({}, addItemObj), { extraInfo: curExtraInfo }));
        return;
    }
    var key = chosenItemInTarget.key;
    var sourceItem = flattenSourceTreeMap.get(key);
    // 若本次选中后该节点为全选状态，则将之前的选择内容覆盖
    if (!isItemCheckAll(chosenItemInTarget, curSearchInfo, curExtraInfo) &&
        isItemCheckAll(addItemObj, curSearchInfo, curExtraInfo)) {
        (0, lodash_es_1.set)(tempData, chosenItemInTargetIndex, addItemObj);
        return;
    }
    // 继续 merge 其子节点
    (addItemObj.children || []).forEach(function (childItem) {
        mergeAddItem({
            tempData: chosenItemInTarget.children || [],
            addItemObj: childItem,
            curExtraInfo: curExtraInfo,
            curSearchInfo: curSearchInfo,
            flattenSourceTreeMap: flattenSourceTreeMap,
        });
    });
    if (!(0, lodash_es_1.isEqual)(chosenItemInTarget.searchInfo, curSearchInfo) || !(0, lodash_es_1.isEqual)(chosenItemInTarget.extraInfo, curExtraInfo)) {
        (0, lodash_es_1.set)(chosenItemInTarget, 'isCheckAll', false);
    }
    // 若不能继续加载更多，且子节点已全部选中，则设置其 isCheckAll 为 true
    if (sourceItem && !sourceItem.hasMore && ((_b = sourceItem.children) === null || _b === void 0 ? void 0 : _b.length) === ((_c = chosenItemInTarget.children) === null || _c === void 0 ? void 0 : _c.length)) {
        var isAllChildCheckAll = !((_d = chosenItemInTarget.children) === null || _d === void 0 ? void 0 : _d.find(function (item) { return !item.isCheckAll; }));
        (0, lodash_es_1.set)(chosenItemInTarget, 'isCheckAll', isAllChildCheckAll);
    }
};
var addItemInLazyLoad = function (_a) {
    var _b;
    var addItem = _a.addItem, targetTreeData = _a.targetTreeData, sourceTreeData = _a.sourceTreeData, flattenSourceTreeMap = _a.flattenSourceTreeMap, searchStr = _a.searchStr, extraInfo = _a.extraInfo;
    var _c = addItem.pathParentKeys, pathParentKeys = _c === void 0 ? [] : _c, itemData = addItem.dataRef;
    var tempData = (0, lodash_es_1.cloneDeep)(targetTreeData);
    var sourceItemData = flattenSourceTreeMap.get((itemData === null || itemData === void 0 ? void 0 : itemData.key) || '');
    if (sourceItemData) {
        // 从 sourceData 中取到对应值，避免多加入后续渲染的 “加载数据” 节点
        var newData = tslib_1.__assign(tslib_1.__assign({}, sourceItemData), { isCheckAll: true });
        var itemObj = setItemByPath(pathParentKeys, sourceTreeData, (_b = setItemStatus([newData], searchStr, extraInfo)) === null || _b === void 0 ? void 0 : _b[0]);
        mergeAddItem({
            tempData: tempData,
            addItemObj: itemObj,
            curSearchInfo: searchStr,
            curExtraInfo: extraInfo,
            flattenSourceTreeMap: flattenSourceTreeMap,
        });
    }
    return tempData;
};
exports.addItemInLazyLoad = addItemInLazyLoad;
var getCheckStatusInLazyLoad = function (_a) {
    var flattenSourceTreeMap = _a.flattenSourceTreeMap, flattenTargetTreeMap = _a.flattenTargetTreeMap, searchStr = _a.searchStr, extraInfo = _a.extraInfo;
    var checkedKeys = [];
    var halfCheckedKeys = [];
    flattenTargetTreeMap.forEach(function (item) {
        var key = item.key;
        if (!checkedKeys.includes(key)) {
            var item_1 = flattenTargetTreeMap.get(key);
            var sourceItem = flattenSourceTreeMap.get(key);
            if (item_1 && sourceItem && isItemCheckAll(item_1, searchStr, extraInfo)) {
                checkedKeys.push(key);
                var childKeys = (0, utils_1.getNodeAllChild)(sourceItem);
                checkedKeys = checkedKeys.concat(childKeys);
            }
            else {
                halfCheckedKeys.push(key);
            }
        }
    });
    return { checkedKeys: checkedKeys, halfCheckedKeys: halfCheckedKeys };
};
exports.getCheckStatusInLazyLoad = getCheckStatusInLazyLoad;
var deleteItem = function (_a) {
    var _b, _c, _d;
    var tempData = _a.tempData, pathParentKeys = _a.pathParentKeys, deleteItemData = _a.deleteItemData, deleteFormSource = _a.deleteFormSource, flattenSourceTreeMap = _a.flattenSourceTreeMap, searchStr = _a.searchStr, extraInfo = _a.extraInfo;
    if (!pathParentKeys.length) {
        (0, lodash_es_1.remove)(tempData, function (e) { return e.key === deleteItemData.key; });
    }
    var item = findItem(tempData, pathParentKeys[0]);
    if (item) {
        // 当 item 为 checkAll 状态，且右侧无 children。 则说明右侧 item 未展开。将左侧展开后的 children 赋值给 targetItem
        if (item.isCheckAll && !((_b = item.children) === null || _b === void 0 ? void 0 : _b.length)) {
            var sourceItem = flattenSourceTreeMap.get(pathParentKeys[0]);
            item.children = setItemStatus((0, lodash_es_1.cloneDeep)(sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.children) || [], searchStr, extraInfo);
        }
        deleteItem({
            tempData: item.children || [],
            pathParentKeys: pathParentKeys.slice(1),
            deleteItemData: deleteItemData,
            deleteFormSource: deleteFormSource,
            flattenSourceTreeMap: flattenSourceTreeMap,
            searchStr: searchStr,
            extraInfo: extraInfo,
        });
        if (isItemCheckAll(item, searchStr, extraInfo) && pathParentKeys.length === 1) {
            var sourceItem = flattenSourceTreeMap.get((0, lodash_es_1.last)(pathParentKeys) || '');
            var sourceChildren = (_c = sourceItem === null || sourceItem === void 0 ? void 0 : sourceItem.children) === null || _c === void 0 ? void 0 : _c.filter(function (item) { return item.key !== deleteItemData.key; });
            var newChildren = deleteFormSource ? sourceChildren : item.children;
            (0, lodash_es_1.set)(item, 'children', setItemStatus(newChildren || [], searchStr, extraInfo));
        }
        if (!((_d = item.children) === null || _d === void 0 ? void 0 : _d.length)) {
            (0, lodash_es_1.remove)(tempData, function (e) { return e.key === item.key; });
        }
        (0, lodash_es_1.set)(item, 'isCheckAll', false);
    }
};
var removeItemInLazyLoad = function (_a) {
    var removeItem = _a.removeItem, targetTreeData = _a.targetTreeData, removeFromSource = _a.removeFromSource, flattenSourceTreeMap = _a.flattenSourceTreeMap, searchStr = _a.searchStr, extraInfo = _a.extraInfo;
    var _b = removeItem.pathParentKeys, pathParentKeys = _b === void 0 ? [] : _b, itemData = removeItem.dataRef;
    var tempData = (0, lodash_es_1.cloneDeep)(targetTreeData);
    if (itemData) {
        deleteItem({
            tempData: tempData,
            pathParentKeys: pathParentKeys,
            deleteItemData: itemData,
            deleteFormSource: removeFromSource,
            flattenSourceTreeMap: flattenSourceTreeMap,
            searchStr: searchStr,
            extraInfo: extraInfo,
        });
    }
    return tempData;
};
exports.removeItemInLazyLoad = removeItemInLazyLoad;
/**
 * 全选时使用，将当前 source data 与 target data 融合
 * 只对比第一层数据，target data 中若存在且不是全选状态，则替换已选中项，若不存在则将 source data 中的数据放入
 */
var addAllSourceInLazyLoad = function (_a) {
    var sourceTreeData = _a.sourceTreeData, targetTreeData = _a.targetTreeData, flattenTargetTreeMap = _a.flattenTargetTreeMap, searchStr = _a.searchStr, extraInfo = _a.extraInfo;
    var newData = (0, lodash_es_1.cloneDeep)(targetTreeData);
    sourceTreeData === null || sourceTreeData === void 0 ? void 0 : sourceTreeData.forEach(function (nodeItem) {
        var key = nodeItem.key;
        var targetItem = flattenTargetTreeMap.get(key);
        var itemResult = setItemStatus([nodeItem], searchStr, extraInfo)[0];
        if (!targetItem) {
            newData.push(itemResult);
        }
        else {
            if (!isItemCheckAll(targetItem, searchStr, extraInfo)) {
                var targetItemIndex = newData.findIndex(function (item) { return item.key === key; });
                (0, lodash_es_1.set)(newData, targetItemIndex, itemResult);
            }
        }
    });
    return newData;
};
exports.addAllSourceInLazyLoad = addAllSourceInLazyLoad;
/**
 * 反选全部，移除当前所有 source data
 * 只对比第一层数据
 */
var removeAllSourceDataInLazyLoad = function (_a) {
    var targetTreeData = _a.targetTreeData, sourceTreeData = _a.sourceTreeData;
    return targetTreeData.filter(function (item) {
        return !sourceTreeData.find(function (e) { return e.key === item.key; });
    });
};
exports.removeAllSourceDataInLazyLoad = removeAllSourceDataInLazyLoad;
var genLoadMoreItem = function (id, hasMore, cssPrefix) {
    return {
        key: "load-".concat(id),
        checkable: false,
        isLoadNode: true,
        icon: react_1.default.createElement("span", null),
        isLeaf: true,
        className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["load-more-button"], ["load-more-button"]))),
        title: hasMore === 'error' ? (react_1.default.createElement("span", null,
            react_1.default.createElement("span", { style: { color: '#737A87' } }, "\u52A0\u8F7D\u5931\u8D25\uFF0C"),
            react_1.default.createElement("span", null, "\u70B9\u51FB\u91CD\u8BD5"))) : ('点击加载'),
    };
};
exports.genLoadMoreItem = genLoadMoreItem;
var setRenderData = function (treeItems, hasRenderMore, type, cssPrefix, isEmptyShowLoadMore) {
    if (type === void 0) { type = 'source'; }
    return treeItems.map(function (item) {
        var _a = item.children, children = _a === void 0 ? [] : _a, _b = item.hasMore, hasMore = _b === void 0 ? true : _b, isCheckAll = item.isCheckAll;
        var newChildren = (0, exports.setRenderData)(children, hasRenderMore, type, cssPrefix, isEmptyShowLoadMore);
        if (hasRenderMore) {
            var loadNode = (0, exports.genLoadMoreItem)(item.key, hasMore, cssPrefix);
            if (item.children && hasMore && (isCheckAll || type === 'source') && isEmptyShowLoadMore) {
                newChildren.push(loadNode);
            }
            else if (newChildren.length && hasMore && (isCheckAll || type === 'source')) {
                newChildren.push(loadNode);
            }
        }
        return tslib_1.__assign(tslib_1.__assign({}, item), { icon: item.icon || (item.isLeaf ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconDocLog, null) : react_1.default.createElement(iconbox_react_ve_o_design_1.IconFileCloudStorage, null)), children: newChildren.length > 0 ? newChildren : undefined, className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["tree-item"], ["tree-item"]))) });
    });
};
exports.setRenderData = setRenderData;
/**
 *   生成实际用来渲染树的数据，会根据是否有更多数据在最后加入一个 loadMore 节点
 */
var genTreeRenderData = function (treeItems, hasRenderMore, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore) {
    if (type === void 0) { type = 'source'; }
    if (!treeItems) {
        return [];
    }
    var newTree = (0, exports.setRenderData)(treeItems, hasRenderMore, type, cssPrefix, isEmptyShowLoadMore);
    if (firstLevelHasMore) {
        var firstLevelLoadButton = (0, exports.genLoadMoreItem)(exports.firstLevelLoadingKey, firstLevelHasMore, cssPrefix);
        newTree.push(firstLevelLoadButton);
    }
    return newTree;
};
exports.genTreeRenderData = genTreeRenderData;
var renderLoadButton = function (title, handleClick, isLoading) {
    return (react_1.default.createElement(web_react_1.Button, { type: "text", onClick: handleClick, loading: isLoading, "data-cy": utils_1.DataCy.loadMoreButton }, isLoading ? '加载中' : title));
};
exports.renderLoadButton = renderLoadButton;
var templateObject_1, templateObject_2;
//# sourceMappingURL=lazyLoadModeUtils.js.map