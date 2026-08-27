import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import classNames from 'classnames';
import { useCTreeTransfer } from './hooks';
import { DataCy, getEmptyContentContent, getHookProps } from './utils';
import { Transfer } from '@arco-design/web-react';
import { RenderTree } from './RenderTree';
import { SourceHeader } from './Headers/SourceHeader';
import { TargetHeader } from './Headers/TargetHeader';
import CLoadingV2 from '../CLoadingV2';
import { CConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
var CTreeTransfer = function (props) {
    var _a;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var cssPrefix = useCssPrefix('tree-transfer');
    var mergedProps = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CTreeTransfer) !== null && _a !== void 0 ? _a : {});
    var _c = mergedProps.hasLoadMore, hasLoadMore = _c === void 0 ? false : _c, loading = mergedProps.loading, arcoTransferProps = mergedProps.arcoTransferProps, arcoSourceTreeProps = mergedProps.arcoSourceTreeProps, arcoTargetTreeProps = mergedProps.arcoTargetTreeProps, extraTargetAction = mergedProps.extraTargetAction, extraSourceAction = mergedProps.extraSourceAction, checkInfo = mergedProps.checkInfo, sourceSearchPlaceholder = mergedProps.sourceSearchPlaceholder, targetSearchPlaceholder = mergedProps.targetSearchPlaceholder, _d = mergedProps.sourceEmptyContent, sourceEmptyContent = _d === void 0 ? true : _d, _e = mergedProps.targetEmptyContent, targetEmptyContent = _e === void 0 ? false : _e, checkedStrategy = mergedProps.checkedStrategy, loadType = mergedProps.loadType, _f = mergedProps.isEmptyShowLoadMore, isEmptyShowLoadMore = _f === void 0 ? false : _f, _g = mergedProps.loadingTitle, loadingTitle = _g === void 0 ? '' : _g, targetHeader = mergedProps.targetHeader, targetItemRender = mergedProps.targetItemRender, sourceHeader = mergedProps.sourceHeader, sourceItemRender = mergedProps.sourceItemRender, targetTitle = mergedProps.targetTitle, isAutoExpandSource = mergedProps.isAutoExpandSource;
    var hooksProps = getHookProps(mergedProps);
    var _h = useCTreeTransfer(hooksProps), data = _h.data, action = _h.action;
    return (React.createElement(Transfer, __assign({}, arcoTransferProps, { "data-cy": DataCy.transfer, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), arcoTransferProps === null || arcoTransferProps === void 0 ? void 0 : arcoTransferProps.className), listStyle: (arcoTransferProps === null || arcoTransferProps === void 0 ? void 0 : arcoTransferProps.listStyle) || [{ height: '480px' }, { height: '480px' }], simple: true, titleTexts: [
            sourceHeader
                ? function () { return sourceHeader(action.handleCheckAll, data.checkAllStatus); }
                : function () { return (React.createElement(SourceHeader, { extraAction: extraSourceAction, onCheckAll: action.handleCheckAll, checkAllStatus: data.checkAllStatus, onSearchChange: action.handleSearch, placeholder: sourceSearchPlaceholder, sourceHeaderCustomText: props.sourceHeaderCustomText })); },
            targetHeader
                ? function () { return targetHeader(); }
                : function () { return (React.createElement(TargetHeader, { extraAction: extraTargetAction, totalChosenCount: data.totalChosenCount, placeholder: targetSearchPlaceholder, onClear: action.handleClear, onSearchChange: action.handleSearch, title: targetTitle })); },
        ] }), function (renderProps) {
        var listType = renderProps.listType;
        if (listType === 'source') {
            return loading ? (React.createElement(CLoadingV2, { type: "block", loading: true, className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["loading"], ["loading"]))), cSpinProps: {
                    arcoSpinProps: {
                        tip: loadingTitle,
                    },
                } })) : (React.createElement(RenderTree, { treeData: data.sourceTree, hasLoadMore: hasLoadMore, treeProps: arcoSourceTreeProps, checkedKeys: (checkInfo === null || checkInfo === void 0 ? void 0 : checkInfo.checkedKeys) || data.checkedKeys, halfCheckedKeys: (checkInfo === null || checkInfo === void 0 ? void 0 : checkInfo.halfCheckedKeys) || data.halfCheckedKeys, helper: data.treeTransferHelper, firstLevelHasMore: props.hasLoadMore ? props.firstLevelHasMore : false, dataCy: DataCy.sourceTree, itemRender: sourceItemRender, onCheck: action.handleChange, onLoadMore: action.handleLoadSource, type: "source", emptyContent: getEmptyContentContent(sourceEmptyContent), checkedStrategy: checkedStrategy, loadType: loadType, isEmptyShowLoadMore: isEmptyShowLoadMore, isAutoExpandSource: isAutoExpandSource || false }));
        }
        return (React.createElement(RenderTree, { treeData: data.targetTree, hasLoadMore: hasLoadMore, treeProps: arcoTargetTreeProps, dataCy: DataCy.targetTree, type: "target", firstLevelHasMore: props.hasLoadMore ? props.targetFirstLevelHasMore : false, helper: data.treeTransferHelper, onRemove: action.handleRemoveInTarget, itemRender: targetItemRender, onLoadMore: action.handleLoadTarget, emptyContent: getEmptyContentContent(targetEmptyContent), targetExpandKeys: data.targetExpandKeys, onTargetExpandChange: action.handleTargetExpandChange, isEmptyShowLoadMore: isEmptyShowLoadMore, isAutoExpandTarget: props.isExpandTarget || false }));
    }));
};
CTreeTransfer.displayName = 'CTreeTransfer';
export default CTreeTransfer;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map