import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import { LoadType, TransferCheckStrategy } from './interface';
import { difference, isString } from 'lodash-es';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { DefaultEmptyContent } from './DefaultEmptyContent';
import React from 'react';
var cssPrefix = classNamePrefixFactory('tree-transfer');
export var getHookProps = function (props) {
    var baseHooksProps = {
        treeData: props.treeData,
        hasLoadMore: props.hasLoadMore || false,
        onSearch: props.onSearch,
        extraInfo: props.extraInfo,
        checkInfo: props.checkInfo,
        checkedStrategy: props.checkedStrategy,
        checkNodeRemove: props.checkNodeRemove,
        isAutoExpandTarget: props.isExpandTarget || false,
        enableRaceCondition: props.enableRaceCondition || false,
        isDisableItemNotCheckable: props.isDisableItemNotCheckable || false,
    };
    if (props.loadType === LoadType.remoteExpand) {
        var curProps_1 = props;
        return __assign(__assign({}, baseHooksProps), { onExpand: curProps_1.onExpand, loadType: curProps_1.loadType, onChange: curProps_1.onChange, value: curProps_1.targetTreeData });
    }
    if (props.hasLoadMore) {
        return __assign(__assign({}, baseHooksProps), { onLoadMoreChange: props.onChange, onSourceLoadMore: props.onSourceLoadMore, onTargetLoadMore: props.onTargetLoadMore, loadMoreValue: props.targetTreeData, removeChildConfirmInfo: props.removeChildConfirmInfo });
    }
    var curProps = props;
    return __assign(__assign({}, baseHooksProps), { onLocalChange: curProps.onChange, localValue: curProps.value });
};
/**
 * 生成 target tree 渲染数据
 * 需遍历整个 source tree，在数据量大的情况下耗时可能较长，后续考虑优化方案
 */
export var genTargetTree = function (options) {
    var data = options.data, keys = options.keys;
    var tempKeys = __spreadArray([], __read(keys), false);
    var traverse = function (curKeys, nodes) {
        var levelValues = [];
        nodes.forEach(function (item) {
            if (curKeys.includes(item.key)) {
                levelValues.push(item);
            }
            else {
                var children = traverse(curKeys, item.children || []);
                if (children.length > 0) {
                    levelValues.push(__assign(__assign({}, item), { children: children }));
                }
            }
        });
        return levelValues;
    };
    return traverse(tempKeys, data);
};
export var flattenTreeMap = function (treeData, map) {
    treeData === null || treeData === void 0 ? void 0 : treeData.forEach(function (item) {
        // lodashSet(map, item.key, item);
        map.set(item.key, item);
        flattenTreeMap(item.children || [], map);
    });
};
export var getNodeAllChild = function (node, isDisableItemNotCheckable) {
    // let childIds = node.children?.map(item => item.key) || [];
    var _a, _b;
    if (isDisableItemNotCheckable === void 0) { isDisableItemNotCheckable = false; }
    var nodeChildrenInfo = isDisableItemNotCheckable
        ? (_a = node.children) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return !item.disableCheckbox && !item.disabled; })
        : node.children;
    var childIds = (nodeChildrenInfo === null || nodeChildrenInfo === void 0 ? void 0 : nodeChildrenInfo.map(function (item) { return item.key; })) || [];
    (_b = node.children) === null || _b === void 0 ? void 0 : _b.forEach(function (child) {
        childIds = childIds === null || childIds === void 0 ? void 0 : childIds.concat(getNodeAllChild(child, isDisableItemNotCheckable));
    });
    return childIds;
};
export var getAllChildKeys = function (node, isDisableItemNotCheckable) {
    var _a;
    if (isDisableItemNotCheckable === void 0) { isDisableItemNotCheckable = false; }
    var childIds = [];
    if (!((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length)) {
        if ((!node.disableCheckbox && !node.disabled) || !isDisableItemNotCheckable) {
            childIds.push(node.key);
        }
    }
    else {
        node.children.forEach(function (item) {
            var itemChildIds = getAllChildKeys(item, isDisableItemNotCheckable);
            childIds = __spreadArray(__spreadArray([], __read(childIds), false), __read(itemChildIds), false);
        });
    }
    return childIds;
};
export var getAllKeys = function (tree, checkedStrategy, isDisableItemNotCheckable) {
    if (checkedStrategy === void 0) { checkedStrategy = TransferCheckStrategy.all; }
    if (isDisableItemNotCheckable === void 0) { isDisableItemNotCheckable = false; }
    switch (checkedStrategy) {
        case TransferCheckStrategy.child:
            return getAllChildKeys({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
        case TransferCheckStrategy.parent:
            return tree.map(function (item) { return item.key; });
        default:
            return getNodeAllChild({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
    }
};
// 根据搜索条件过滤数据
export var searchTreeRenderData = function (treeItems, searchInfo) {
    if (!searchInfo) {
        return treeItems || [];
    }
    var loop = function (data) {
        var result = [];
        data.forEach(function (item) {
            if (isString(item.title)) {
                if (item.title.indexOf(searchInfo) > -1) {
                    result.push(__assign({}, item));
                }
                else if (item.children) {
                    var filterData = loop(item.children);
                    if (filterData.length) {
                        result.push(__assign(__assign({}, item), { children: filterData }));
                    }
                }
            }
        });
        return result;
    };
    var searchData = loop(treeItems || []);
    return searchData;
};
export var getKeyPath = function (treeNode) {
    return __spreadArray(__spreadArray([], __read((treeNode.props.pathParentKeys || [])), false), [treeNode.key], false);
};
// 获取所有有子节点的节点 key
export var getAllNodeKeysWithChildren = function (tree) {
    var keys = [];
    var itemHasChildren = tree.filter(function (item) { var _a; return (_a = item.children) === null || _a === void 0 ? void 0 : _a.length; });
    // const keys = itemHasChildren.map(item => item.key);
    itemHasChildren.forEach(function (item) {
        keys.push(item.key);
        var childrenKeys = getAllNodeKeysWithChildren(item.children || []);
        keys = keys.concat(childrenKeys);
    });
    return keys;
};
export var getEmptyContentContent = function (emptyContent) {
    if (emptyContent === false) {
        return undefined;
    }
    if (emptyContent === true) {
        return React.createElement(DefaultEmptyContent, null);
    }
    return emptyContent;
};
// 获取所有无 child 节点的 key
export var getAllNoChildKeys = function (flattenTreeMap) {
    var arr = Array.from(flattenTreeMap);
    var keys = arr.filter(function (item) { var _a; return !((_a = item[1].children) === null || _a === void 0 ? void 0 : _a.length); }).map(function (item) { return item[1].key; });
    return keys;
};
export var getSourceEmptyChildKey = function (nodeData, flattenTargetTree) {
    var _a, _b, _c;
    var curNodeKey = nodeData.key;
    var key = [];
    if (!((_a = nodeData === null || nodeData === void 0 ? void 0 : nodeData.children) === null || _a === void 0 ? void 0 : _a.length) && curNodeKey) {
        var checkedNode = flattenTargetTree.get(curNodeKey);
        if (checkedNode) {
            var childKeys = getNodeAllChild(checkedNode);
            key = __spreadArray([curNodeKey], __read(childKeys), false);
        }
    }
    else if ((_b = nodeData === null || nodeData === void 0 ? void 0 : nodeData.children) === null || _b === void 0 ? void 0 : _b.length) {
        (_c = nodeData.children) === null || _c === void 0 ? void 0 : _c.forEach(function (child) {
            var childKeys = getSourceEmptyChildKey(child, flattenTargetTree);
            key = __spreadArray(__spreadArray([], __read(key), false), __read(childKeys), false);
        });
    }
    return key;
};
export var isTwoNodeChildSame = function (nodeData, targetNode) {
    var nodeKeys = getAllChildKeys(nodeData);
    var targetKeys = getAllChildKeys(targetNode);
    return difference(nodeKeys, targetKeys).length === 0;
};
export var DataCy = {
    transfer: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["transfer"], ["transfer"]))),
    sourceTree: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["sourceTree"], ["sourceTree"]))),
    targetTree: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["targetTree"], ["targetTree"]))),
    sourceHeader: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["sourceHeader"], ["sourceHeader"]))),
    targetHeader: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["targetHeader"], ["targetHeader"]))),
    sourceSearch: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["sourceSearch"], ["sourceSearch"]))),
    targetSearch: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["targetSearch"], ["targetSearch"]))),
    sourceCheckAll: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["checkAll"], ["checkAll"]))),
    targetClear: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["clear"], ["clear"]))),
    loadMoreButton: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["loadMoreButton"], ["loadMoreButton"]))),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=utils.js.map