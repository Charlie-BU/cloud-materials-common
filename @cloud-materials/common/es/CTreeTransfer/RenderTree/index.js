import { __assign, __awaiter, __generator, __makeTemplateObject, __read, __spreadArray } from "tslib";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LoadType } from '../interface';
import { Tree as ArcoTree } from '@arco-design/web-react';
import classNames from 'classnames';
import CEllipsis from '../../CEllipsis';
import { firstLevelLoadingKey, genTreeRenderData, renderLoadButton } from '../lazyLoadModeUtils';
import { getAllNodeKeysWithChildren, getKeyPath } from '../utils';
import { useMount } from 'ahooks';
import { CConfigContext } from '../../CConfigProvider';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { uniq } from 'lodash-es';
export var RenderTree = function (_a) {
    var treeData = _a.treeData, hasLoadMore = _a.hasLoadMore, treeProps = _a.treeProps, checkedKeys = _a.checkedKeys, halfCheckedKeys = _a.halfCheckedKeys, type = _a.type, _b = _a.firstLevelHasMore, firstLevelHasMore = _b === void 0 ? false : _b, helper = _a.helper, dataCy = _a.dataCy, emptyContent = _a.emptyContent, targetExpandKeys = _a.targetExpandKeys, checkedStrategy = _a.checkedStrategy, loadType = _a.loadType, isEmptyShowLoadMore = _a.isEmptyShowLoadMore, isAutoExpandSource = _a.isAutoExpandSource, isAutoExpandTarget = _a.isAutoExpandTarget, itemRender = _a.itemRender, onCheck = _a.onCheck, onLoadMore = _a.onLoadMore, onRemove = _a.onRemove, onTargetExpandChange = _a.onTargetExpandChange;
    var _c = useContext(CConfigContext), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('tree-transfer');
    var _d = __read(useState({}), 2), loadingMap = _d[0], setLoadingMap = _d[1];
    var _e = __read(useState(__spreadArray([], __read(((treeProps === null || treeProps === void 0 ? void 0 : treeProps.defaultExpandedKeys) || [])), false)), 2), expandedKeys = _e[0], setExpandedKeys = _e[1];
    var autoExpandParent = treeProps === null || treeProps === void 0 ? void 0 : treeProps.autoExpandParent;
    var handleOpen = function (treeNode) { return __awaiter(void 0, void 0, void 0, function () {
        var keyPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyPath = getKeyPath(treeNode);
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore(keyPath))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleLoadMore = function (treeNode) { return __awaiter(void 0, void 0, void 0, function () {
        var parentKey, keyPath;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parentKey = treeNode.parentKey || '';
                    setLoadingMap(__assign(__assign({}, loadingMap), (_a = {}, _a[parentKey] = true, _a)));
                    keyPath = treeNode.pathParentKeys || [];
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore(keyPath))];
                case 1:
                    _c.sent();
                    setLoadingMap(__assign(__assign({}, loadingMap), (_b = {}, _b[parentKey] = false, _b)));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFirstLevelLoad = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    helper.setOldSourceFlattenMap(helper.sourceFlattenMap);
                    setLoadingMap(__assign(__assign({}, loadingMap), (_a = {}, _a[firstLevelLoadingKey] = true, _a)));
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore([]))];
                case 1:
                    _c.sent();
                    // const newData =
                    setLoadingMap(__assign(__assign({}, loadingMap), (_b = {}, _b[firstLevelLoadingKey] = false, _b)));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCheck = function (checkedKeys, extra) {
        var node = extra.node, checked = extra.checked;
        onCheck === null || onCheck === void 0 ? void 0 : onCheck(node.props, checked, checkedKeys);
        // 自动展开选中的非叶子节点
        if (extra.checked && isAutoExpandSource && !node.props.isLeaf) {
            setExpandedKeys(uniq(__spreadArray(__spreadArray([], __read(expandedKeys), false), [String(node.key)], false)));
        }
    };
    var handleExpandKeys = function (keys) {
        if (type === 'source') {
            setExpandedKeys(keys);
        }
        else {
            onTargetExpandChange === null || onTargetExpandChange === void 0 ? void 0 : onTargetExpandChange(keys);
        }
    };
    useMount(function () {
        if (autoExpandParent) {
            var keys = getAllNodeKeysWithChildren(treeData);
            setExpandedKeys(keys);
        }
    });
    useEffect(function () {
        // 处理首层加载更多后需默认打开的情况
        if (type === 'source' && autoExpandParent) {
            var newData = treeData.filter(function (item) { return !helper.oldSourceFlattenMap.get(item.key); });
            var newExpandedKeys = getAllNodeKeysWithChildren(newData);
            setExpandedKeys(__spreadArray(__spreadArray([], __read(expandedKeys), false), __read(newExpandedKeys), false));
        }
    }, [treeData]);
    useEffect(function () {
        // 在设置了自动展开右侧选中项的情况下，需要重新 setState，否则无法触发更新
        if (targetExpandKeys && isAutoExpandTarget) {
            setExpandedKeys(targetExpandKeys);
        }
    }, [targetExpandKeys]);
    var renderData = useMemo(function () { return genTreeRenderData(treeData, hasLoadMore, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore); }, [treeData, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore]);
    var arcoTreeProps = type === 'source'
        ? {
            checkedStrategy: checkedStrategy || ArcoTree.SHOW_ALL,
            checkStrictly: hasLoadMore || loadType === LoadType.remoteExpand,
            checkable: true,
            checkedKeys: checkedKeys,
            halfCheckedKeys: halfCheckedKeys,
            onCheck: handleCheck,
        }
        : {};
    if (!(renderData === null || renderData === void 0 ? void 0 : renderData.length) && emptyContent) {
        return emptyContent;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ArcoTree, __assign({}, arcoTreeProps, treeProps, { "data-cy": dataCy, "data-testid": dataCy, treeData: renderData, expandedKeys: type === 'source' || isAutoExpandTarget ? expandedKeys : targetExpandKeys, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["tree"], ["tree"]))), treeProps === null || treeProps === void 0 ? void 0 : treeProps.className), 
            // 避免显示 selected 样式
            selectedKeys: [], onExpand: handleExpandKeys, virtualListProps: (treeProps === null || treeProps === void 0 ? void 0 : treeProps.virtualListProps) || {
                height: 394,
            }, loadMore: handleOpen, renderExtra: function (node) {
                var _a;
                var nodeData = node.dataRef;
                if (!((_a = node === null || node === void 0 ? void 0 : node.childrenData) === null || _a === void 0 ? void 0 : _a.length) && (node === null || node === void 0 ? void 0 : node.expanded)) {
                    return React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["load-empty"], ["load-empty"]))) }, locale.CTreeTransfer.noExpandData);
                }
                if (type === 'source' && (node === null || node === void 0 ? void 0 : node.expanded) && node.checked && nodeData.nodeCheckAllExtra) {
                    return React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["load-custom-info"], ["load-custom-info"]))) }, nodeData.nodeCheckAllExtra);
                }
            }, renderTitle: function (node) {
                var nodeData = node.dataRef;
                if (nodeData === null || nodeData === void 0 ? void 0 : nodeData.isLoadNode) {
                    return nodeData.key === "load-".concat(firstLevelLoadingKey)
                        ? renderLoadButton(node.title, function () { return handleFirstLevelLoad(); }, loadingMap[firstLevelLoadingKey])
                        : renderLoadButton(node.title, function () { return handleLoadMore(node); }, loadingMap[node.parentKey || '']);
                }
                if (type === 'source') {
                    if (itemRender && nodeData) {
                        return itemRender(node);
                    }
                    return React.createElement(CEllipsis, null, (nodeData === null || nodeData === void 0 ? void 0 : nodeData.title) || '');
                }
                return (React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["target-tree-title"], ["target-tree-title"]))) },
                    itemRender && nodeData ? (itemRender(node, treeData)) : (React.createElement(CEllipsis, { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["target-tree-title-content"], ["target-tree-title-content"]))) }, (nodeData === null || nodeData === void 0 ? void 0 : nodeData.title) || '')),
                    React.createElement(IconClose, { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["target-tree-remove"], ["target-tree-remove"]))), onClick: function () {
                            onRemove === null || onRemove === void 0 ? void 0 : onRemove(node);
                        } })));
            } }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map