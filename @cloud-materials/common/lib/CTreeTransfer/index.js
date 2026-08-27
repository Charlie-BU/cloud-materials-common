"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var utils_1 = require("./utils");
var web_react_1 = require("@arco-design/web-react");
var RenderTree_1 = require("./RenderTree");
var SourceHeader_1 = require("./Headers/SourceHeader");
var TargetHeader_1 = require("./Headers/TargetHeader");
var CLoadingV2_1 = tslib_1.__importDefault(require("../CLoadingV2"));
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_2 = require("../hooks");
var CTreeTransfer = function (props) {
    var _a;
    var _b = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var cssPrefix = useCssPrefix('tree-transfer');
    var mergedProps = (0, hooks_2.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CTreeTransfer) !== null && _a !== void 0 ? _a : {});
    var _c = mergedProps.hasLoadMore, hasLoadMore = _c === void 0 ? false : _c, loading = mergedProps.loading, arcoTransferProps = mergedProps.arcoTransferProps, arcoSourceTreeProps = mergedProps.arcoSourceTreeProps, arcoTargetTreeProps = mergedProps.arcoTargetTreeProps, extraTargetAction = mergedProps.extraTargetAction, extraSourceAction = mergedProps.extraSourceAction, checkInfo = mergedProps.checkInfo, sourceSearchPlaceholder = mergedProps.sourceSearchPlaceholder, targetSearchPlaceholder = mergedProps.targetSearchPlaceholder, _d = mergedProps.sourceEmptyContent, sourceEmptyContent = _d === void 0 ? true : _d, _e = mergedProps.targetEmptyContent, targetEmptyContent = _e === void 0 ? false : _e, checkedStrategy = mergedProps.checkedStrategy, loadType = mergedProps.loadType, _f = mergedProps.isEmptyShowLoadMore, isEmptyShowLoadMore = _f === void 0 ? false : _f, _g = mergedProps.loadingTitle, loadingTitle = _g === void 0 ? '' : _g, targetHeader = mergedProps.targetHeader, targetItemRender = mergedProps.targetItemRender, sourceHeader = mergedProps.sourceHeader, sourceItemRender = mergedProps.sourceItemRender, targetTitle = mergedProps.targetTitle, isAutoExpandSource = mergedProps.isAutoExpandSource;
    var hooksProps = (0, utils_1.getHookProps)(mergedProps);
    var _h = (0, hooks_1.useCTreeTransfer)(hooksProps), data = _h.data, action = _h.action;
    return (react_1.default.createElement(web_react_1.Transfer, tslib_1.__assign({}, arcoTransferProps, { "data-cy": utils_1.DataCy.transfer, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), arcoTransferProps === null || arcoTransferProps === void 0 ? void 0 : arcoTransferProps.className), listStyle: (arcoTransferProps === null || arcoTransferProps === void 0 ? void 0 : arcoTransferProps.listStyle) || [{ height: '480px' }, { height: '480px' }], simple: true, titleTexts: [
            sourceHeader
                ? function () { return sourceHeader(action.handleCheckAll, data.checkAllStatus); }
                : function () { return (react_1.default.createElement(SourceHeader_1.SourceHeader, { extraAction: extraSourceAction, onCheckAll: action.handleCheckAll, checkAllStatus: data.checkAllStatus, onSearchChange: action.handleSearch, placeholder: sourceSearchPlaceholder, sourceHeaderCustomText: props.sourceHeaderCustomText })); },
            targetHeader
                ? function () { return targetHeader(); }
                : function () { return (react_1.default.createElement(TargetHeader_1.TargetHeader, { extraAction: extraTargetAction, totalChosenCount: data.totalChosenCount, placeholder: targetSearchPlaceholder, onClear: action.handleClear, onSearchChange: action.handleSearch, title: targetTitle })); },
        ] }), function (renderProps) {
        var listType = renderProps.listType;
        if (listType === 'source') {
            return loading ? (react_1.default.createElement(CLoadingV2_1.default, { type: "block", loading: true, className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["loading"], ["loading"]))), cSpinProps: {
                    arcoSpinProps: {
                        tip: loadingTitle,
                    },
                } })) : (react_1.default.createElement(RenderTree_1.RenderTree, { treeData: data.sourceTree, hasLoadMore: hasLoadMore, treeProps: arcoSourceTreeProps, checkedKeys: (checkInfo === null || checkInfo === void 0 ? void 0 : checkInfo.checkedKeys) || data.checkedKeys, halfCheckedKeys: (checkInfo === null || checkInfo === void 0 ? void 0 : checkInfo.halfCheckedKeys) || data.halfCheckedKeys, helper: data.treeTransferHelper, firstLevelHasMore: props.hasLoadMore ? props.firstLevelHasMore : false, dataCy: utils_1.DataCy.sourceTree, itemRender: sourceItemRender, onCheck: action.handleChange, onLoadMore: action.handleLoadSource, type: "source", emptyContent: (0, utils_1.getEmptyContentContent)(sourceEmptyContent), checkedStrategy: checkedStrategy, loadType: loadType, isEmptyShowLoadMore: isEmptyShowLoadMore, isAutoExpandSource: isAutoExpandSource || false }));
        }
        return (react_1.default.createElement(RenderTree_1.RenderTree, { treeData: data.targetTree, hasLoadMore: hasLoadMore, treeProps: arcoTargetTreeProps, dataCy: utils_1.DataCy.targetTree, type: "target", firstLevelHasMore: props.hasLoadMore ? props.targetFirstLevelHasMore : false, helper: data.treeTransferHelper, onRemove: action.handleRemoveInTarget, itemRender: targetItemRender, onLoadMore: action.handleLoadTarget, emptyContent: (0, utils_1.getEmptyContentContent)(targetEmptyContent), targetExpandKeys: data.targetExpandKeys, onTargetExpandChange: action.handleTargetExpandChange, isEmptyShowLoadMore: isEmptyShowLoadMore, isAutoExpandTarget: props.isExpandTarget || false }));
    }));
};
CTreeTransfer.displayName = 'CTreeTransfer';
exports.default = CTreeTransfer;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map