import { __assign } from "tslib";
import React from 'react';
import { observer } from '@formily/react';
import cls from 'classnames';
import InfoSection from '../../../../CInfoSection';
import { useCreateInnerBasicInfoSectionList, BasicInfoSectionListProvider, useDetailPage } from '../../../react';
import { runCallable, defineInfoSectionListConfig } from '../../../shared';
import { InfoSectionItemLoading } from '../InfoSectionItemLoading';
import { useCConfigContext } from '../../../../CConfigProvider';
var List = InfoSection.List;
var InnerBasicDetailInfoSection = observer(function (_a) {
    var _b, _c;
    var infoSectionListModel = _a.infoSectionListModel;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page-info-section');
    var detailPage = useDetailPage();
    var runCallableProps = {
        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
        infoSectionListModel: infoSectionListModel,
        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
        detailPage: detailPage,
    };
    var dom = (React.createElement(BasicInfoSectionListProvider, { infoSectionList: infoSectionListModel },
        React.createElement(List, __assign({}, infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.options, { listData: (_b = infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.sections) === null || _b === void 0 ? void 0 : _b.map(function (section) {
                var _a, _b, _c, _d, _e;
                var infoItemList = (_a = ((section === null || section === void 0 ? void 0 : section.infoItemList) || [])) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    var _a, _b, _c, _d, _e, _f;
                    var itemStatus = runCallable((_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.itemStatus, runCallableProps);
                    var getItemContent = function () {
                        var _a;
                        if (itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.loading) {
                            return React.createElement(InfoSectionItemLoading, __assign({}, itemStatus));
                        }
                        else if (itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.hasError) {
                            return React.createElement(InfoSectionItemLoading, __assign({}, itemStatus));
                        }
                        return runCallable((_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.content, runCallableProps);
                    };
                    return __assign(__assign({ enableEllipsis: true }, item === null || item === void 0 ? void 0 : item.options), { label: runCallable((_b = item === null || item === void 0 ? void 0 : item.options) === null || _b === void 0 ? void 0 : _b.label, runCallableProps), content: getItemContent(), children: runCallable((_c = item === null || item === void 0 ? void 0 : item.options) === null || _c === void 0 ? void 0 : _c.children, runCallableProps), hidden: runCallable((_d = item === null || item === void 0 ? void 0 : item.options) === null || _d === void 0 ? void 0 : _d.hidden, {
                            data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                            infoSectionListModel: infoSectionListModel,
                            tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                            detailPage: detailPage,
                        }), visible: runCallable((_e = item === null || item === void 0 ? void 0 : item.options) === null || _e === void 0 ? void 0 : _e.visible, runCallableProps), extraContent: !(itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.hasError) &&
                            !(itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.loading) &&
                            runCallable((_f = item === null || item === void 0 ? void 0 : item.options) === null || _f === void 0 ? void 0 : _f.extraContent, runCallableProps) });
                });
                return __assign(__assign({}, section === null || section === void 0 ? void 0 : section.options), { hidden: runCallable((_b = section === null || section === void 0 ? void 0 : section.options) === null || _b === void 0 ? void 0 : _b.hidden, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), visible: runCallable((_c = section === null || section === void 0 ? void 0 : section.options) === null || _c === void 0 ? void 0 : _c.visible, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), title: runCallable((_d = section === null || section === void 0 ? void 0 : section.options) === null || _d === void 0 ? void 0 : _d.title, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), infoItemList: infoItemList, onModuleEditorClick: runCallable((_e = section === null || section === void 0 ? void 0 : section.options) === null || _e === void 0 ? void 0 : _e.onModuleEditorClick, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }) });
            }), className: cls(cssRoot, (_c = infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.options) === null || _c === void 0 ? void 0 : _c.className) }))));
    return dom;
});
export var BasicDetailInfoSectionList = function (props) {
    var infoSectionListModel = useCreateInnerBasicInfoSectionList(props.config);
    return React.createElement(InnerBasicDetailInfoSection, { infoSectionListModel: infoSectionListModel });
};
BasicDetailInfoSectionList.defineConfig = defineInfoSectionListConfig;
BasicDetailInfoSectionList.displayName = 'BasicDetailInfoSectionList';
//# sourceMappingURL=index.js.map