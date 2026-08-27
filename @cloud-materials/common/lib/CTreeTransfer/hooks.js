"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCTreeTransfer = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var interface_1 = require("./interface");
var utils_1 = require("./utils");
var lodash_es_1 = require("lodash-es");
var lazyLoadModeUtils_1 = require("./lazyLoadModeUtils");
var class_1 = require("./class");
var CModal_1 = tslib_1.__importDefault(require("../CModal"));
var remoteExpandClass_1 = require("./action/remoteExpandClass");
var storage_utils_safe_race_1 = require("@byted-c/storage.utils.safe-race");
var useCTreeTransfer = function (props) {
    var treeData = props.treeData, hasLoadMore = props.hasLoadMore, localValue = props.localValue, extraInfo = props.extraInfo, loadMoreValue = props.loadMoreValue, removeChildConfirmInfo = props.removeChildConfirmInfo, defaultCheckInfo = props.checkInfo, _a = props.checkedStrategy, checkedStrategy = _a === void 0 ? interface_1.TransferCheckStrategy.all : _a, loadType = props.loadType, _b = props.isAutoExpandTarget, isAutoExpandTarget = _b === void 0 ? false : _b, onSearch = props.onSearch, onLoadMoreChange = props.onLoadMoreChange, onLocalChange = props.onLocalChange, onSourceLoadMore = props.onSourceLoadMore, onTargetLoadMore = props.onTargetLoadMore, onExpand = props.onExpand, onChange = props.onChange, checkNodeRemove = props.checkNodeRemove, value = props.value, enableRaceCondition = props.enableRaceCondition, isDisableItemNotCheckable = props.isDisableItemNotCheckable;
    var treeTransferHelper = (0, react_1.useMemo)(function () {
        // 创建 treeTransferHelper 实例
        return (loadType === interface_1.LoadType.remoteExpand ? new remoteExpandClass_1.RemoteExpandHelpers() : new class_1.TreeTransferHelper());
    }, [loadType]);
    var safeOnSourceLoadMore = (0, storage_utils_safe_race_1.useSafeRace)(onSourceLoadMore, { enabled: enableRaceCondition });
    var safeOnTargetLoadMore = (0, storage_utils_safe_race_1.useSafeRace)(onTargetLoadMore, { enabled: enableRaceCondition });
    var safeOnExpand = (0, storage_utils_safe_race_1.useSafeRace)(onExpand, { enabled: enableRaceCondition });
    var _c = tslib_1.__read((0, react_1.useState)(treeData), 2), sourceTree = _c[0], setSourceTree = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)([]), 2), targetTree = _d[0], setTargetTree = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)([]), 2), checkedKeys = _e[0], setCheckedKeys = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)([]), 2), halfCheckedKeys = _f[0], setHalfCheckedKeys = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(0), 2), totalChosenCount = _g[0], setTotalChosenCount = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)({ checked: false, indeterminate: false }), 2), checkAllStatus = _h[0], setCheckAllStatus = _h[1];
    // target tree 展开节点 keys，其需要在节点被移除时移除对应 key
    var _j = tslib_1.__read((0, react_1.useState)([]), 2), targetExpandKeys = _j[0], setTargetExpandKeys = _j[1];
    var handleRemoveTargetExpandKey = function (removeKeyArr) {
        setTargetExpandKeys(function (prev) {
            return prev.filter(function (key) { return !removeKeyArr.includes(key); });
        });
    };
    var handleRemoveExpandInTargetChange = function () {
        var removeKeys = (0, utils_1.getAllNoChildKeys)(treeTransferHelper.targetFlattenMap);
        handleRemoveTargetExpandKey(removeKeys);
    };
    var handleChange = function (targetNode, isChecked, curChecked, isFromSource) {
        if (isFromSource === void 0) { isFromSource = true; }
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var newData, _a, parentKey, isParentCheck, isRemove, newExpandKeys, _b, parentKey, newData, confirmStatus, newData;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(loadType === interface_1.LoadType.remoteExpand)) return [3 /*break*/, 5];
                        newData = [];
                        _a = targetNode.parentKey, parentKey = _a === void 0 ? '' : _a;
                        if (!isChecked) return [3 /*break*/, 1];
                        newData = treeTransferHelper.handleAddItem(targetNode);
                        return [3 /*break*/, 4];
                    case 1:
                        isParentCheck = checkedKeys.includes(parentKey);
                        isRemove = true;
                        if (!checkNodeRemove) return [3 /*break*/, 3];
                        return [4 /*yield*/, checkNodeRemove(isParentCheck, targetNode)];
                    case 2:
                        isRemove = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (isRemove) {
                            newData = treeTransferHelper.handleRemoveItem(targetNode, isFromSource);
                        }
                        _c.label = 4;
                    case 4:
                        onChange === null || onChange === void 0 ? void 0 : onChange(newData);
                        newExpandKeys = treeTransferHelper.getNewExpandKeys(targetNode, isChecked);
                        setTargetExpandKeys((0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(targetExpandKeys), false), tslib_1.__read(newExpandKeys), false)));
                        return [2 /*return*/];
                    case 5:
                        if (!!hasLoadMore) return [3 /*break*/, 6];
                        onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(curChecked);
                        return [3 /*break*/, 10];
                    case 6:
                        _b = targetNode.parentKey, parentKey = _b === void 0 ? '' : _b;
                        if (!isChecked) return [3 /*break*/, 7];
                        newData = (0, lazyLoadModeUtils_1.addItemInLazyLoad)({
                            addItem: targetNode,
                            targetTreeData: treeTransferHelper.targetData,
                            sourceTreeData: sourceTree,
                            flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
                            extraInfo: extraInfo,
                            searchStr: treeTransferHelper.sourceSearchStr,
                        });
                        onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange(newData || []);
                        return [3 /*break*/, 10];
                    case 7:
                        confirmStatus = true;
                        if (!(((defaultCheckInfo === null || defaultCheckInfo === void 0 ? void 0 : defaultCheckInfo.checkedKeys) || checkedKeys).includes(parentKey) &&
                            (removeChildConfirmInfo === null || removeChildConfirmInfo === void 0 ? void 0 : removeChildConfirmInfo.isShowConfirm))) return [3 /*break*/, 9];
                        return [4 /*yield*/, CModal_1.default.confirm({
                                title: removeChildConfirmInfo === null || removeChildConfirmInfo === void 0 ? void 0 : removeChildConfirmInfo.title,
                                content: removeChildConfirmInfo === null || removeChildConfirmInfo === void 0 ? void 0 : removeChildConfirmInfo.content,
                            })];
                    case 8:
                        confirmStatus = _c.sent();
                        _c.label = 9;
                    case 9:
                        if (confirmStatus) {
                            newData = (0, lazyLoadModeUtils_1.removeItemInLazyLoad)({
                                removeItem: targetNode,
                                targetTreeData: treeTransferHelper.targetData,
                                flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
                                removeFromSource: isFromSource,
                                extraInfo: extraInfo,
                                searchStr: treeTransferHelper.sourceSearchStr,
                            });
                            onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange(newData || []);
                        }
                        _c.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    var handleRemoveInTarget = function (removeNode) {
        if (loadType === interface_1.LoadType.remoteExpand) {
            handleChange(removeNode, false, [], false);
        }
        var _a = removeNode.pathParentKeys, pathParentKeys = _a === void 0 ? [] : _a, dataRef = removeNode.dataRef;
        if (dataRef) {
            if (!hasLoadMore && localValue) {
                var parentKeys = pathParentKeys;
                var childKeys = (0, utils_1.getNodeAllChild)(dataRef);
                var keyArr_1 = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(parentKeys), false), tslib_1.__read(childKeys), false), [dataRef.key], false);
                onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(localValue.filter(function (item) {
                    return !keyArr_1.includes(item);
                }));
            }
            else if (hasLoadMore) {
                handleChange(removeNode, false, [], false);
            }
        }
    };
    var handleCheckAll = function (isChecked) {
        if (loadType === interface_1.LoadType.remoteExpand) {
            var newData = treeTransferHelper.handleSelectAll(isChecked);
            onChange === null || onChange === void 0 ? void 0 : onChange(newData);
            setCheckAllStatus({ checked: isChecked, indeterminate: false });
        }
        if (!hasLoadMore) {
            var curKeys_1 = (0, utils_1.getAllKeys)(sourceTree, checkedStrategy, isDisableItemNotCheckable);
            if (isChecked) {
                onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange((0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(checkedKeys), false), tslib_1.__read(curKeys_1), false)));
            }
            else {
                var newValues = checkedKeys.filter(function (key) { return !curKeys_1.includes(key); });
                onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(newValues);
            }
            return;
        }
        if (isChecked) {
            var newData = (0, lazyLoadModeUtils_1.addAllSourceInLazyLoad)({
                sourceTreeData: sourceTree,
                targetTreeData: treeTransferHelper.targetData,
                flattenTargetTreeMap: treeTransferHelper.targetFlattenMap,
                searchStr: treeTransferHelper.sourceSearchStr,
                extraInfo: extraInfo,
            });
            onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange(newData);
        }
        else {
            var newData = (0, lazyLoadModeUtils_1.removeAllSourceDataInLazyLoad)({
                sourceTreeData: sourceTree,
                targetTreeData: treeTransferHelper.targetData,
            });
            onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange(newData);
        }
    };
    var handleClear = function () {
        if (!hasLoadMore) {
            onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange([]);
            return;
        }
        setTargetExpandKeys([]);
        onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange([]);
    };
    var handleSetCheckAllStatus = function (sourceKeys, checkedKeys) {
        var differenceArr = (0, lodash_es_1.difference)(sourceKeys, checkedKeys);
        var isCheckAll = differenceArr.length === 0;
        var isIndeterminate = isCheckAll ? false : differenceArr.length < sourceKeys.length;
        setCheckAllStatus({ checked: isCheckAll, indeterminate: isIndeterminate });
    };
    var handleCheckStatusChange = function () {
        var sourceKeys = (0, utils_1.getAllKeys)(sourceTree, checkedStrategy, isDisableItemNotCheckable);
        if (!hasLoadMore) {
            handleSetCheckAllStatus(sourceKeys, checkedKeys);
        }
        else {
            var checkedInfo = (0, lazyLoadModeUtils_1.getCheckStatusInLazyLoad)({
                flattenSourceTreeMap: treeTransferHelper.sourceFlattenMap,
                flattenTargetTreeMap: treeTransferHelper.targetFlattenMap,
                searchStr: treeTransferHelper.sourceSearchStr,
                extraInfo: extraInfo,
            });
            setCheckedKeys(checkedInfo.checkedKeys);
            setHalfCheckedKeys(checkedInfo.halfCheckedKeys);
            handleSetCheckAllStatus(sourceKeys, checkedInfo.checkedKeys);
        }
    };
    // 当需要自动展开时，设置新的展开项。获取到本次新增的且不为叶子节点的项展开
    var handleExpandAfterValueChange = function (flattenTargetMap) {
        if (!isAutoExpandTarget) {
            return;
        }
        var targetTreeKeys = Array.from(flattenTargetMap.keys());
        var newKeys = (0, lodash_es_1.difference)(targetTreeKeys, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(checkedKeys), false), tslib_1.__read(halfCheckedKeys), false));
        var newExpandKeys = newKeys.filter(function (item) {
            var _a;
            return !((_a = flattenTargetMap.get(item)) === null || _a === void 0 ? void 0 : _a.isLeaf);
        });
        if (!(newExpandKeys === null || newExpandKeys === void 0 ? void 0 : newExpandKeys.length)) {
            return;
        }
        setTargetExpandKeys((0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(targetExpandKeys), false), tslib_1.__read(newExpandKeys), false)));
    };
    var handleSearch = function (searchStr, type) {
        if (onSearch) {
            onSearch(searchStr, type);
            return;
        }
        if (type === 'source') {
            var searchData = (0, utils_1.searchTreeRenderData)(treeData, searchStr);
            setSourceTree(searchData);
            treeTransferHelper.setSourceSearchStr(searchStr);
        }
        else {
            var searchData = (0, utils_1.searchTreeRenderData)(treeTransferHelper.targetData, searchStr);
            setTargetTree(searchData);
            treeTransferHelper.setTargetSearchStr(searchStr);
        }
    };
    var handleLoadSource = function (keyPath) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(loadType === interface_1.LoadType.remoteExpand)) return [3 /*break*/, 2];
                    return [4 /*yield*/, treeTransferHelper.getData(keyPath || [])];
                case 1:
                    data = _a.sent();
                    setSourceTree(data);
                    return [2 /*return*/];
                case 2:
                    if (!safeOnSourceLoadMore) return [3 /*break*/, 4];
                    return [4 /*yield*/, safeOnSourceLoadMore(keyPath || [])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleLoadTarget = function (keyPath) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!safeOnTargetLoadMore) return [3 /*break*/, 2];
                    return [4 /*yield*/, safeOnTargetLoadMore(keyPath || [])];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var setTargetInfo = function (treeData) {
        treeTransferHelper.setTargetData(treeData);
        if (treeTransferHelper.targetSearchStr) {
            var searchData = (0, utils_1.searchTreeRenderData)(treeData, treeTransferHelper.targetSearchStr);
            setTargetTree(searchData);
        }
        else {
            setTargetTree(treeData);
        }
    };
    var handleTargetExpandChange = function (keys) {
        setTargetExpandKeys(keys);
    };
    var handleCheckedKeys = function () {
        var _a = treeTransferHelper.getCheckedKeys(), checkedKeys = _a.checkedKeys, halfCheckedKeys = _a.halfCheckedKeys;
        setCheckedKeys(checkedKeys);
        setHalfCheckedKeys(halfCheckedKeys);
    };
    var handleSetLocalModeTree = function () {
        if (localValue) {
            var curTargetTree = (0, utils_1.genTargetTree)({ data: tslib_1.__spreadArray([], tslib_1.__read(treeData), false), keys: localValue });
            setTargetInfo(curTargetTree);
            setCheckedKeys(localValue);
            setTotalChosenCount(localValue.length);
            var targetFlattenMap = new Map();
            (0, utils_1.flattenTreeMap)(curTargetTree, targetFlattenMap);
            // 当需要自动展开时，设置新的展开项。获取到本次新增的且不为叶子节点的项展开
            handleExpandAfterValueChange(targetFlattenMap);
        }
    };
    (0, react_1.useEffect)(function () {
        setSourceTree(treeData);
        if (!(targetTree === null || targetTree === void 0 ? void 0 : targetTree.length)) {
            handleSetLocalModeTree();
        }
    }, [treeData]);
    (0, react_1.useEffect)(function () {
        handleSetLocalModeTree();
    }, [localValue]);
    (0, react_1.useEffect)(function () {
        if (loadType === interface_1.LoadType.remoteExpand) {
            if (!targetTree.length) {
                setCheckAllStatus({ checked: false, indeterminate: false });
            }
            return;
        }
        if (!targetTree.length) {
            if (!hasLoadMore) {
                setCheckAllStatus({ checked: false, indeterminate: false });
                return;
            }
            setCheckAllStatus({ checked: false, indeterminate: false });
            setCheckedKeys([]);
            setHalfCheckedKeys([]);
        }
        else {
            handleExpandAfterValueChange(treeTransferHelper.targetFlattenMap);
            handleCheckStatusChange();
        }
    }, [sourceTree, targetTree]);
    // 懒加载模式的值变化
    (0, react_1.useEffect)(function () {
        if (loadMoreValue && hasLoadMore) {
            setTargetInfo(loadMoreValue);
            var targetFlattenMap = new Map();
            (0, utils_1.flattenTreeMap)(loadMoreValue, targetFlattenMap);
            treeTransferHelper.setTargetFlattenMap(targetFlattenMap);
            // 每次 target 值发生变化时，遍历 targetFlattenMap，将已展开但无 children 项的展开状态收起
            // 在懒加载模式下才会执行
            handleRemoveExpandInTargetChange();
        }
    }, [loadMoreValue]);
    (0, react_1.useEffect)(function () {
        if (loadType === interface_1.LoadType.remoteExpand) {
            treeTransferHelper === null || treeTransferHelper === void 0 ? void 0 : treeTransferHelper.init({
                onExpand: safeOnExpand,
            });
        }
    }, [treeTransferHelper]);
    (0, react_1.useEffect)(function () {
        var sourceFlattenMap = new Map();
        (0, utils_1.flattenTreeMap)(sourceTree, sourceFlattenMap);
        treeTransferHelper.setSourceFlattenMap(sourceFlattenMap);
        treeTransferHelper.setSourceData(sourceTree);
        if (loadType === interface_1.LoadType.remoteExpand) {
            handleCheckedKeys();
        }
    }, [sourceTree]);
    (0, react_1.useEffect)(function () {
        if (!(loadType === interface_1.LoadType.remoteExpand)) {
            return;
        }
        setTargetTree(value || []);
        var targetFlattenMap = new Map();
        (0, utils_1.flattenTreeMap)(value || [], targetFlattenMap);
        treeTransferHelper.setTargetFlattenMap(targetFlattenMap);
        treeTransferHelper.setTargetData(value || []);
        handleCheckedKeys();
        handleRemoveExpandInTargetChange();
    }, [value]);
    return {
        data: {
            sourceTree: sourceTree,
            targetTree: targetTree,
            checkedKeys: checkedKeys,
            halfCheckedKeys: halfCheckedKeys,
            totalChosenCount: totalChosenCount,
            checkAllStatus: checkAllStatus,
            treeTransferHelper: treeTransferHelper,
            targetExpandKeys: targetExpandKeys,
        },
        action: {
            handleChange: handleChange,
            handleRemoveInTarget: handleRemoveInTarget,
            handleCheckAll: handleCheckAll,
            handleClear: handleClear,
            handleSearch: handleSearch,
            handleLoadSource: handleLoadSource,
            handleLoadTarget: handleLoadTarget,
            handleTargetExpandChange: handleTargetExpandChange,
        },
    };
};
exports.useCTreeTransfer = useCTreeTransfer;
//# sourceMappingURL=hooks.js.map