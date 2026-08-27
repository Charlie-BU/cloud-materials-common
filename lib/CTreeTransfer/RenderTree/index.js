"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTree = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var interface_1 = require("../interface");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CEllipsis_1 = tslib_1.__importDefault(require("../../CEllipsis"));
var lazyLoadModeUtils_1 = require("../lazyLoadModeUtils");
var utils_1 = require("../utils");
var ahooks_1 = require("ahooks");
var CConfigProvider_1 = require("../../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var lodash_es_1 = require("lodash-es");
var RenderTree = function (_a) {
    var treeData = _a.treeData, hasLoadMore = _a.hasLoadMore, treeProps = _a.treeProps, checkedKeys = _a.checkedKeys, halfCheckedKeys = _a.halfCheckedKeys, type = _a.type, _b = _a.firstLevelHasMore, firstLevelHasMore = _b === void 0 ? false : _b, helper = _a.helper, dataCy = _a.dataCy, emptyContent = _a.emptyContent, targetExpandKeys = _a.targetExpandKeys, checkedStrategy = _a.checkedStrategy, loadType = _a.loadType, isEmptyShowLoadMore = _a.isEmptyShowLoadMore, isAutoExpandSource = _a.isAutoExpandSource, isAutoExpandTarget = _a.isAutoExpandTarget, itemRender = _a.itemRender, onCheck = _a.onCheck, onLoadMore = _a.onLoadMore, onRemove = _a.onRemove, onTargetExpandChange = _a.onTargetExpandChange;
    var _c = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('tree-transfer');
    var _d = tslib_1.__read((0, react_1.useState)({}), 2), loadingMap = _d[0], setLoadingMap = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(tslib_1.__spreadArray([], tslib_1.__read(((treeProps === null || treeProps === void 0 ? void 0 : treeProps.defaultExpandedKeys) || [])), false)), 2), expandedKeys = _e[0], setExpandedKeys = _e[1];
    var autoExpandParent = treeProps === null || treeProps === void 0 ? void 0 : treeProps.autoExpandParent;
    var handleOpen = function (treeNode) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var keyPath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyPath = (0, utils_1.getKeyPath)(treeNode);
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore(keyPath))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleLoadMore = function (treeNode) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var parentKey, keyPath;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parentKey = treeNode.parentKey || '';
                    setLoadingMap(tslib_1.__assign(tslib_1.__assign({}, loadingMap), (_a = {}, _a[parentKey] = true, _a)));
                    keyPath = treeNode.pathParentKeys || [];
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore(keyPath))];
                case 1:
                    _c.sent();
                    setLoadingMap(tslib_1.__assign(tslib_1.__assign({}, loadingMap), (_b = {}, _b[parentKey] = false, _b)));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFirstLevelLoad = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    helper.setOldSourceFlattenMap(helper.sourceFlattenMap);
                    setLoadingMap(tslib_1.__assign(tslib_1.__assign({}, loadingMap), (_a = {}, _a[lazyLoadModeUtils_1.firstLevelLoadingKey] = true, _a)));
                    return [4 /*yield*/, (onLoadMore === null || onLoadMore === void 0 ? void 0 : onLoadMore([]))];
                case 1:
                    _c.sent();
                    // const newData =
                    setLoadingMap(tslib_1.__assign(tslib_1.__assign({}, loadingMap), (_b = {}, _b[lazyLoadModeUtils_1.firstLevelLoadingKey] = false, _b)));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCheck = function (checkedKeys, extra) {
        var node = extra.node, checked = extra.checked;
        onCheck === null || onCheck === void 0 ? void 0 : onCheck(node.props, checked, checkedKeys);
        // 自动展开选中的非叶子节点
        if (extra.checked && isAutoExpandSource && !node.props.isLeaf) {
            setExpandedKeys((0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(expandedKeys), false), [String(node.key)], false)));
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
    (0, ahooks_1.useMount)(function () {
        if (autoExpandParent) {
            var keys = (0, utils_1.getAllNodeKeysWithChildren)(treeData);
            setExpandedKeys(keys);
        }
    });
    (0, react_1.useEffect)(function () {
        // 处理首层加载更多后需默认打开的情况
        if (type === 'source' && autoExpandParent) {
            var newData = treeData.filter(function (item) { return !helper.oldSourceFlattenMap.get(item.key); });
            var newExpandedKeys = (0, utils_1.getAllNodeKeysWithChildren)(newData);
            setExpandedKeys(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(expandedKeys), false), tslib_1.__read(newExpandedKeys), false));
        }
    }, [treeData]);
    (0, react_1.useEffect)(function () {
        // 在设置了自动展开右侧选中项的情况下，需要重新 setState，否则无法触发更新
        if (targetExpandKeys && isAutoExpandTarget) {
            setExpandedKeys(targetExpandKeys);
        }
    }, [targetExpandKeys]);
    var renderData = (0, react_1.useMemo)(function () { return (0, lazyLoadModeUtils_1.genTreeRenderData)(treeData, hasLoadMore, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore); }, [treeData, type, firstLevelHasMore, cssPrefix, isEmptyShowLoadMore]);
    var arcoTreeProps = type === 'source'
        ? {
            checkedStrategy: checkedStrategy || web_react_1.Tree.SHOW_ALL,
            checkStrictly: hasLoadMore || loadType === interface_1.LoadType.remoteExpand,
            checkable: true,
            checkedKeys: checkedKeys,
            halfCheckedKeys: halfCheckedKeys,
            onCheck: handleCheck,
        }
        : {};
    if (!(renderData === null || renderData === void 0 ? void 0 : renderData.length) && emptyContent) {
        return emptyContent;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(web_react_1.Tree, tslib_1.__assign({}, arcoTreeProps, treeProps, { "data-cy": dataCy, "data-testid": dataCy, treeData: renderData, expandedKeys: type === 'source' || isAutoExpandTarget ? expandedKeys : targetExpandKeys, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["tree"], ["tree"]))), treeProps === null || treeProps === void 0 ? void 0 : treeProps.className), 
            // 避免显示 selected 样式
            selectedKeys: [], onExpand: handleExpandKeys, virtualListProps: (treeProps === null || treeProps === void 0 ? void 0 : treeProps.virtualListProps) || {
                height: 394,
            }, loadMore: handleOpen, renderExtra: function (node) {
                var _a;
                var nodeData = node.dataRef;
                if (!((_a = node === null || node === void 0 ? void 0 : node.childrenData) === null || _a === void 0 ? void 0 : _a.length) && (node === null || node === void 0 ? void 0 : node.expanded)) {
                    return react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["load-empty"], ["load-empty"]))) }, locale.CTreeTransfer.noExpandData);
                }
                if (type === 'source' && (node === null || node === void 0 ? void 0 : node.expanded) && node.checked && nodeData.nodeCheckAllExtra) {
                    return react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["load-custom-info"], ["load-custom-info"]))) }, nodeData.nodeCheckAllExtra);
                }
            }, renderTitle: function (node) {
                var nodeData = node.dataRef;
                if (nodeData === null || nodeData === void 0 ? void 0 : nodeData.isLoadNode) {
                    return nodeData.key === "load-".concat(lazyLoadModeUtils_1.firstLevelLoadingKey)
                        ? (0, lazyLoadModeUtils_1.renderLoadButton)(node.title, function () { return handleFirstLevelLoad(); }, loadingMap[lazyLoadModeUtils_1.firstLevelLoadingKey])
                        : (0, lazyLoadModeUtils_1.renderLoadButton)(node.title, function () { return handleLoadMore(node); }, loadingMap[node.parentKey || '']);
                }
                if (type === 'source') {
                    if (itemRender && nodeData) {
                        return itemRender(node);
                    }
                    return react_1.default.createElement(CEllipsis_1.default, null, (nodeData === null || nodeData === void 0 ? void 0 : nodeData.title) || '');
                }
                return (react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["target-tree-title"], ["target-tree-title"]))) },
                    itemRender && nodeData ? (itemRender(node, treeData)) : (react_1.default.createElement(CEllipsis_1.default, { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["target-tree-title-content"], ["target-tree-title-content"]))) }, (nodeData === null || nodeData === void 0 ? void 0 : nodeData.title) || '')),
                    react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["target-tree-remove"], ["target-tree-remove"]))), onClick: function () {
                            onRemove === null || onRemove === void 0 ? void 0 : onRemove(node);
                        } })));
            } }))));
};
exports.RenderTree = RenderTree;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map