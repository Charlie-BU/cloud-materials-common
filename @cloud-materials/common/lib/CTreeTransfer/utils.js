"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCy = exports.isTwoNodeChildSame = exports.getSourceEmptyChildKey = exports.getAllNoChildKeys = exports.getEmptyContentContent = exports.getAllNodeKeysWithChildren = exports.getKeyPath = exports.searchTreeRenderData = exports.getAllKeys = exports.getAllChildKeys = exports.getNodeAllChild = exports.flattenTreeMap = exports.genTargetTree = exports.getHookProps = void 0;
var tslib_1 = require("tslib");
var interface_1 = require("./interface");
var lodash_es_1 = require("lodash-es");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var DefaultEmptyContent_1 = require("./DefaultEmptyContent");
var react_1 = tslib_1.__importDefault(require("react"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('tree-transfer');
var getHookProps = function (props) {
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
    if (props.loadType === interface_1.LoadType.remoteExpand) {
        var curProps_1 = props;
        return tslib_1.__assign(tslib_1.__assign({}, baseHooksProps), { onExpand: curProps_1.onExpand, loadType: curProps_1.loadType, onChange: curProps_1.onChange, value: curProps_1.targetTreeData });
    }
    if (props.hasLoadMore) {
        return tslib_1.__assign(tslib_1.__assign({}, baseHooksProps), { onLoadMoreChange: props.onChange, onSourceLoadMore: props.onSourceLoadMore, onTargetLoadMore: props.onTargetLoadMore, loadMoreValue: props.targetTreeData, removeChildConfirmInfo: props.removeChildConfirmInfo });
    }
    var curProps = props;
    return tslib_1.__assign(tslib_1.__assign({}, baseHooksProps), { onLocalChange: curProps.onChange, localValue: curProps.value });
};
exports.getHookProps = getHookProps;
/**
 * 生成 target tree 渲染数据
 * 需遍历整个 source tree，在数据量大的情况下耗时可能较长，后续考虑优化方案
 */
var genTargetTree = function (options) {
    var data = options.data, keys = options.keys;
    var tempKeys = tslib_1.__spreadArray([], tslib_1.__read(keys), false);
    var traverse = function (curKeys, nodes) {
        var levelValues = [];
        nodes.forEach(function (item) {
            if (curKeys.includes(item.key)) {
                levelValues.push(item);
            }
            else {
                var children = traverse(curKeys, item.children || []);
                if (children.length > 0) {
                    levelValues.push(tslib_1.__assign(tslib_1.__assign({}, item), { children: children }));
                }
            }
        });
        return levelValues;
    };
    return traverse(tempKeys, data);
};
exports.genTargetTree = genTargetTree;
var flattenTreeMap = function (treeData, map) {
    treeData === null || treeData === void 0 ? void 0 : treeData.forEach(function (item) {
        // lodashSet(map, item.key, item);
        map.set(item.key, item);
        (0, exports.flattenTreeMap)(item.children || [], map);
    });
};
exports.flattenTreeMap = flattenTreeMap;
var getNodeAllChild = function (node, isDisableItemNotCheckable) {
    // let childIds = node.children?.map(item => item.key) || [];
    var _a, _b;
    if (isDisableItemNotCheckable === void 0) { isDisableItemNotCheckable = false; }
    var nodeChildrenInfo = isDisableItemNotCheckable
        ? (_a = node.children) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return !item.disableCheckbox && !item.disabled; })
        : node.children;
    var childIds = (nodeChildrenInfo === null || nodeChildrenInfo === void 0 ? void 0 : nodeChildrenInfo.map(function (item) { return item.key; })) || [];
    (_b = node.children) === null || _b === void 0 ? void 0 : _b.forEach(function (child) {
        childIds = childIds === null || childIds === void 0 ? void 0 : childIds.concat((0, exports.getNodeAllChild)(child, isDisableItemNotCheckable));
    });
    return childIds;
};
exports.getNodeAllChild = getNodeAllChild;
var getAllChildKeys = function (node, isDisableItemNotCheckable) {
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
            var itemChildIds = (0, exports.getAllChildKeys)(item, isDisableItemNotCheckable);
            childIds = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(childIds), false), tslib_1.__read(itemChildIds), false);
        });
    }
    return childIds;
};
exports.getAllChildKeys = getAllChildKeys;
var getAllKeys = function (tree, checkedStrategy, isDisableItemNotCheckable) {
    if (checkedStrategy === void 0) { checkedStrategy = interface_1.TransferCheckStrategy.all; }
    if (isDisableItemNotCheckable === void 0) { isDisableItemNotCheckable = false; }
    switch (checkedStrategy) {
        case interface_1.TransferCheckStrategy.child:
            return (0, exports.getAllChildKeys)({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
        case interface_1.TransferCheckStrategy.parent:
            return tree.map(function (item) { return item.key; });
        default:
            return (0, exports.getNodeAllChild)({ key: '1', title: '1', children: tree }, isDisableItemNotCheckable);
    }
};
exports.getAllKeys = getAllKeys;
// 根据搜索条件过滤数据
var searchTreeRenderData = function (treeItems, searchInfo) {
    if (!searchInfo) {
        return treeItems || [];
    }
    var loop = function (data) {
        var result = [];
        data.forEach(function (item) {
            if ((0, lodash_es_1.isString)(item.title)) {
                if (item.title.indexOf(searchInfo) > -1) {
                    result.push(tslib_1.__assign({}, item));
                }
                else if (item.children) {
                    var filterData = loop(item.children);
                    if (filterData.length) {
                        result.push(tslib_1.__assign(tslib_1.__assign({}, item), { children: filterData }));
                    }
                }
            }
        });
        return result;
    };
    var searchData = loop(treeItems || []);
    return searchData;
};
exports.searchTreeRenderData = searchTreeRenderData;
var getKeyPath = function (treeNode) {
    return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((treeNode.props.pathParentKeys || [])), false), [treeNode.key], false);
};
exports.getKeyPath = getKeyPath;
// 获取所有有子节点的节点 key
var getAllNodeKeysWithChildren = function (tree) {
    var keys = [];
    var itemHasChildren = tree.filter(function (item) { var _a; return (_a = item.children) === null || _a === void 0 ? void 0 : _a.length; });
    // const keys = itemHasChildren.map(item => item.key);
    itemHasChildren.forEach(function (item) {
        keys.push(item.key);
        var childrenKeys = (0, exports.getAllNodeKeysWithChildren)(item.children || []);
        keys = keys.concat(childrenKeys);
    });
    return keys;
};
exports.getAllNodeKeysWithChildren = getAllNodeKeysWithChildren;
var getEmptyContentContent = function (emptyContent) {
    if (emptyContent === false) {
        return undefined;
    }
    if (emptyContent === true) {
        return react_1.default.createElement(DefaultEmptyContent_1.DefaultEmptyContent, null);
    }
    return emptyContent;
};
exports.getEmptyContentContent = getEmptyContentContent;
// 获取所有无 child 节点的 key
var getAllNoChildKeys = function (flattenTreeMap) {
    var arr = Array.from(flattenTreeMap);
    var keys = arr.filter(function (item) { var _a; return !((_a = item[1].children) === null || _a === void 0 ? void 0 : _a.length); }).map(function (item) { return item[1].key; });
    return keys;
};
exports.getAllNoChildKeys = getAllNoChildKeys;
var getSourceEmptyChildKey = function (nodeData, flattenTargetTree) {
    var _a, _b, _c;
    var curNodeKey = nodeData.key;
    var key = [];
    if (!((_a = nodeData === null || nodeData === void 0 ? void 0 : nodeData.children) === null || _a === void 0 ? void 0 : _a.length) && curNodeKey) {
        var checkedNode = flattenTargetTree.get(curNodeKey);
        if (checkedNode) {
            var childKeys = (0, exports.getNodeAllChild)(checkedNode);
            key = tslib_1.__spreadArray([curNodeKey], tslib_1.__read(childKeys), false);
        }
    }
    else if ((_b = nodeData === null || nodeData === void 0 ? void 0 : nodeData.children) === null || _b === void 0 ? void 0 : _b.length) {
        (_c = nodeData.children) === null || _c === void 0 ? void 0 : _c.forEach(function (child) {
            var childKeys = (0, exports.getSourceEmptyChildKey)(child, flattenTargetTree);
            key = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(key), false), tslib_1.__read(childKeys), false);
        });
    }
    return key;
};
exports.getSourceEmptyChildKey = getSourceEmptyChildKey;
var isTwoNodeChildSame = function (nodeData, targetNode) {
    var nodeKeys = (0, exports.getAllChildKeys)(nodeData);
    var targetKeys = (0, exports.getAllChildKeys)(targetNode);
    return (0, lodash_es_1.difference)(nodeKeys, targetKeys).length === 0;
};
exports.isTwoNodeChildSame = isTwoNodeChildSame;
exports.DataCy = {
    transfer: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["transfer"], ["transfer"]))),
    sourceTree: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["sourceTree"], ["sourceTree"]))),
    targetTree: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["targetTree"], ["targetTree"]))),
    sourceHeader: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["sourceHeader"], ["sourceHeader"]))),
    targetHeader: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["targetHeader"], ["targetHeader"]))),
    sourceSearch: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["sourceSearch"], ["sourceSearch"]))),
    targetSearch: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["targetSearch"], ["targetSearch"]))),
    sourceCheckAll: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["checkAll"], ["checkAll"]))),
    targetClear: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["clear"], ["clear"]))),
    loadMoreButton: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["loadMoreButton"], ["loadMoreButton"]))),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=utils.js.map