import { __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useEffect, useState, useMemo } from 'react';
import { LoadType, TransferCheckStrategy } from './interface';
import { flattenTreeMap, genTargetTree, getAllKeys, getAllNoChildKeys, getNodeAllChild, searchTreeRenderData, } from './utils';
import { difference, uniq } from 'lodash-es';
import { addAllSourceInLazyLoad, addItemInLazyLoad, getCheckStatusInLazyLoad, removeAllSourceDataInLazyLoad, removeItemInLazyLoad, } from './lazyLoadModeUtils';
import { TreeTransferHelper } from './class';
import CModal from '../CModal';
import { RemoteExpandHelpers } from './action/remoteExpandClass';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';
export var useCTreeTransfer = function (props) {
    var treeData = props.treeData, hasLoadMore = props.hasLoadMore, localValue = props.localValue, extraInfo = props.extraInfo, loadMoreValue = props.loadMoreValue, removeChildConfirmInfo = props.removeChildConfirmInfo, defaultCheckInfo = props.checkInfo, _a = props.checkedStrategy, checkedStrategy = _a === void 0 ? TransferCheckStrategy.all : _a, loadType = props.loadType, _b = props.isAutoExpandTarget, isAutoExpandTarget = _b === void 0 ? false : _b, onSearch = props.onSearch, onLoadMoreChange = props.onLoadMoreChange, onLocalChange = props.onLocalChange, onSourceLoadMore = props.onSourceLoadMore, onTargetLoadMore = props.onTargetLoadMore, onExpand = props.onExpand, onChange = props.onChange, checkNodeRemove = props.checkNodeRemove, value = props.value, enableRaceCondition = props.enableRaceCondition, isDisableItemNotCheckable = props.isDisableItemNotCheckable;
    var treeTransferHelper = useMemo(function () {
        // 创建 treeTransferHelper 实例
        return (loadType === LoadType.remoteExpand ? new RemoteExpandHelpers() : new TreeTransferHelper());
    }, [loadType]);
    var safeOnSourceLoadMore = useSafeRace(onSourceLoadMore, { enabled: enableRaceCondition });
    var safeOnTargetLoadMore = useSafeRace(onTargetLoadMore, { enabled: enableRaceCondition });
    var safeOnExpand = useSafeRace(onExpand, { enabled: enableRaceCondition });
    var _c = __read(useState(treeData), 2), sourceTree = _c[0], setSourceTree = _c[1];
    var _d = __read(useState([]), 2), targetTree = _d[0], setTargetTree = _d[1];
    var _e = __read(useState([]), 2), checkedKeys = _e[0], setCheckedKeys = _e[1];
    var _f = __read(useState([]), 2), halfCheckedKeys = _f[0], setHalfCheckedKeys = _f[1];
    var _g = __read(useState(0), 2), totalChosenCount = _g[0], setTotalChosenCount = _g[1];
    var _h = __read(useState({ checked: false, indeterminate: false }), 2), checkAllStatus = _h[0], setCheckAllStatus = _h[1];
    // target tree 展开节点 keys，其需要在节点被移除时移除对应 key
    var _j = __read(useState([]), 2), targetExpandKeys = _j[0], setTargetExpandKeys = _j[1];
    var handleRemoveTargetExpandKey = function (removeKeyArr) {
        setTargetExpandKeys(function (prev) {
            return prev.filter(function (key) { return !removeKeyArr.includes(key); });
        });
    };
    var handleRemoveExpandInTargetChange = function () {
        var removeKeys = getAllNoChildKeys(treeTransferHelper.targetFlattenMap);
        handleRemoveTargetExpandKey(removeKeys);
    };
    var handleChange = function (targetNode, isChecked, curChecked, isFromSource) {
        if (isFromSource === void 0) { isFromSource = true; }
        return __awaiter(void 0, void 0, void 0, function () {
            var newData, _a, parentKey, isParentCheck, isRemove, newExpandKeys, _b, parentKey, newData, confirmStatus, newData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(loadType === LoadType.remoteExpand)) return [3 /*break*/, 5];
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
                        setTargetExpandKeys(uniq(__spreadArray(__spreadArray([], __read(targetExpandKeys), false), __read(newExpandKeys), false)));
                        return [2 /*return*/];
                    case 5:
                        if (!!hasLoadMore) return [3 /*break*/, 6];
                        onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(curChecked);
                        return [3 /*break*/, 10];
                    case 6:
                        _b = targetNode.parentKey, parentKey = _b === void 0 ? '' : _b;
                        if (!isChecked) return [3 /*break*/, 7];
                        newData = addItemInLazyLoad({
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
                        return [4 /*yield*/, CModal.confirm({
                                title: removeChildConfirmInfo === null || removeChildConfirmInfo === void 0 ? void 0 : removeChildConfirmInfo.title,
                                content: removeChildConfirmInfo === null || removeChildConfirmInfo === void 0 ? void 0 : removeChildConfirmInfo.content,
                            })];
                    case 8:
                        confirmStatus = _c.sent();
                        _c.label = 9;
                    case 9:
                        if (confirmStatus) {
                            newData = removeItemInLazyLoad({
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
        if (loadType === LoadType.remoteExpand) {
            handleChange(removeNode, false, [], false);
        }
        var _a = removeNode.pathParentKeys, pathParentKeys = _a === void 0 ? [] : _a, dataRef = removeNode.dataRef;
        if (dataRef) {
            if (!hasLoadMore && localValue) {
                var parentKeys = pathParentKeys;
                var childKeys = getNodeAllChild(dataRef);
                var keyArr_1 = __spreadArray(__spreadArray(__spreadArray([], __read(parentKeys), false), __read(childKeys), false), [dataRef.key], false);
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
        if (loadType === LoadType.remoteExpand) {
            var newData = treeTransferHelper.handleSelectAll(isChecked);
            onChange === null || onChange === void 0 ? void 0 : onChange(newData);
            setCheckAllStatus({ checked: isChecked, indeterminate: false });
        }
        if (!hasLoadMore) {
            var curKeys_1 = getAllKeys(sourceTree, checkedStrategy, isDisableItemNotCheckable);
            if (isChecked) {
                onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(uniq(__spreadArray(__spreadArray([], __read(checkedKeys), false), __read(curKeys_1), false)));
            }
            else {
                var newValues = checkedKeys.filter(function (key) { return !curKeys_1.includes(key); });
                onLocalChange === null || onLocalChange === void 0 ? void 0 : onLocalChange(newValues);
            }
            return;
        }
        if (isChecked) {
            var newData = addAllSourceInLazyLoad({
                sourceTreeData: sourceTree,
                targetTreeData: treeTransferHelper.targetData,
                flattenTargetTreeMap: treeTransferHelper.targetFlattenMap,
                searchStr: treeTransferHelper.sourceSearchStr,
                extraInfo: extraInfo,
            });
            onLoadMoreChange === null || onLoadMoreChange === void 0 ? void 0 : onLoadMoreChange(newData);
        }
        else {
            var newData = removeAllSourceDataInLazyLoad({
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
        var differenceArr = difference(sourceKeys, checkedKeys);
        var isCheckAll = differenceArr.length === 0;
        var isIndeterminate = isCheckAll ? false : differenceArr.length < sourceKeys.length;
        setCheckAllStatus({ checked: isCheckAll, indeterminate: isIndeterminate });
    };
    var handleCheckStatusChange = function () {
        var sourceKeys = getAllKeys(sourceTree, checkedStrategy, isDisableItemNotCheckable);
        if (!hasLoadMore) {
            handleSetCheckAllStatus(sourceKeys, checkedKeys);
        }
        else {
            var checkedInfo = getCheckStatusInLazyLoad({
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
        var newKeys = difference(targetTreeKeys, __spreadArray(__spreadArray([], __read(checkedKeys), false), __read(halfCheckedKeys), false));
        var newExpandKeys = newKeys.filter(function (item) {
            var _a;
            return !((_a = flattenTargetMap.get(item)) === null || _a === void 0 ? void 0 : _a.isLeaf);
        });
        if (!(newExpandKeys === null || newExpandKeys === void 0 ? void 0 : newExpandKeys.length)) {
            return;
        }
        setTargetExpandKeys(uniq(__spreadArray(__spreadArray([], __read(targetExpandKeys), false), __read(newExpandKeys), false)));
    };
    var handleSearch = function (searchStr, type) {
        if (onSearch) {
            onSearch(searchStr, type);
            return;
        }
        if (type === 'source') {
            var searchData = searchTreeRenderData(treeData, searchStr);
            setSourceTree(searchData);
            treeTransferHelper.setSourceSearchStr(searchStr);
        }
        else {
            var searchData = searchTreeRenderData(treeTransferHelper.targetData, searchStr);
            setTargetTree(searchData);
            treeTransferHelper.setTargetSearchStr(searchStr);
        }
    };
    var handleLoadSource = function (keyPath) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(loadType === LoadType.remoteExpand)) return [3 /*break*/, 2];
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
    var handleLoadTarget = function (keyPath) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
            var searchData = searchTreeRenderData(treeData, treeTransferHelper.targetSearchStr);
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
            var curTargetTree = genTargetTree({ data: __spreadArray([], __read(treeData), false), keys: localValue });
            setTargetInfo(curTargetTree);
            setCheckedKeys(localValue);
            setTotalChosenCount(localValue.length);
            var targetFlattenMap = new Map();
            flattenTreeMap(curTargetTree, targetFlattenMap);
            // 当需要自动展开时，设置新的展开项。获取到本次新增的且不为叶子节点的项展开
            handleExpandAfterValueChange(targetFlattenMap);
        }
    };
    useEffect(function () {
        setSourceTree(treeData);
        if (!(targetTree === null || targetTree === void 0 ? void 0 : targetTree.length)) {
            handleSetLocalModeTree();
        }
    }, [treeData]);
    useEffect(function () {
        handleSetLocalModeTree();
    }, [localValue]);
    useEffect(function () {
        if (loadType === LoadType.remoteExpand) {
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
    useEffect(function () {
        if (loadMoreValue && hasLoadMore) {
            setTargetInfo(loadMoreValue);
            var targetFlattenMap = new Map();
            flattenTreeMap(loadMoreValue, targetFlattenMap);
            treeTransferHelper.setTargetFlattenMap(targetFlattenMap);
            // 每次 target 值发生变化时，遍历 targetFlattenMap，将已展开但无 children 项的展开状态收起
            // 在懒加载模式下才会执行
            handleRemoveExpandInTargetChange();
        }
    }, [loadMoreValue]);
    useEffect(function () {
        if (loadType === LoadType.remoteExpand) {
            treeTransferHelper === null || treeTransferHelper === void 0 ? void 0 : treeTransferHelper.init({
                onExpand: safeOnExpand,
            });
        }
    }, [treeTransferHelper]);
    useEffect(function () {
        var sourceFlattenMap = new Map();
        flattenTreeMap(sourceTree, sourceFlattenMap);
        treeTransferHelper.setSourceFlattenMap(sourceFlattenMap);
        treeTransferHelper.setSourceData(sourceTree);
        if (loadType === LoadType.remoteExpand) {
            handleCheckedKeys();
        }
    }, [sourceTree]);
    useEffect(function () {
        if (!(loadType === LoadType.remoteExpand)) {
            return;
        }
        setTargetTree(value || []);
        var targetFlattenMap = new Map();
        flattenTreeMap(value || [], targetFlattenMap);
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
//# sourceMappingURL=hooks.js.map