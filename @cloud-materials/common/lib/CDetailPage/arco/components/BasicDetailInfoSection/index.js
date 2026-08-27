"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDetailInfoSectionList = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CInfoSection_1 = tslib_1.__importDefault(require("../../../../CInfoSection"));
var react_3 = require("../../../react");
var shared_1 = require("../../../shared");
var InfoSectionItemLoading_1 = require("../InfoSectionItemLoading");
var CConfigProvider_1 = require("../../../../CConfigProvider");
var List = CInfoSection_1.default.List;
var InnerBasicDetailInfoSection = (0, react_2.observer)(function (_a) {
    var _b, _c;
    var infoSectionListModel = _a.infoSectionListModel;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page-info-section');
    var detailPage = (0, react_3.useDetailPage)();
    var runCallableProps = {
        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
        infoSectionListModel: infoSectionListModel,
        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
        detailPage: detailPage,
    };
    var dom = (react_1.default.createElement(react_3.BasicInfoSectionListProvider, { infoSectionList: infoSectionListModel },
        react_1.default.createElement(List, tslib_1.__assign({}, infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.options, { listData: (_b = infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.sections) === null || _b === void 0 ? void 0 : _b.map(function (section) {
                var _a, _b, _c, _d, _e;
                var infoItemList = (_a = ((section === null || section === void 0 ? void 0 : section.infoItemList) || [])) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    var _a, _b, _c, _d, _e, _f;
                    var itemStatus = (0, shared_1.runCallable)((_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.itemStatus, runCallableProps);
                    var getItemContent = function () {
                        var _a;
                        if (itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.loading) {
                            return react_1.default.createElement(InfoSectionItemLoading_1.InfoSectionItemLoading, tslib_1.__assign({}, itemStatus));
                        }
                        else if (itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.hasError) {
                            return react_1.default.createElement(InfoSectionItemLoading_1.InfoSectionItemLoading, tslib_1.__assign({}, itemStatus));
                        }
                        return (0, shared_1.runCallable)((_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.content, runCallableProps);
                    };
                    return tslib_1.__assign(tslib_1.__assign({ enableEllipsis: true }, item === null || item === void 0 ? void 0 : item.options), { label: (0, shared_1.runCallable)((_b = item === null || item === void 0 ? void 0 : item.options) === null || _b === void 0 ? void 0 : _b.label, runCallableProps), content: getItemContent(), children: (0, shared_1.runCallable)((_c = item === null || item === void 0 ? void 0 : item.options) === null || _c === void 0 ? void 0 : _c.children, runCallableProps), hidden: (0, shared_1.runCallable)((_d = item === null || item === void 0 ? void 0 : item.options) === null || _d === void 0 ? void 0 : _d.hidden, {
                            data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                            infoSectionListModel: infoSectionListModel,
                            tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                            detailPage: detailPage,
                        }), visible: (0, shared_1.runCallable)((_e = item === null || item === void 0 ? void 0 : item.options) === null || _e === void 0 ? void 0 : _e.visible, runCallableProps), extraContent: !(itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.hasError) &&
                            !(itemStatus === null || itemStatus === void 0 ? void 0 : itemStatus.loading) &&
                            (0, shared_1.runCallable)((_f = item === null || item === void 0 ? void 0 : item.options) === null || _f === void 0 ? void 0 : _f.extraContent, runCallableProps) });
                });
                return tslib_1.__assign(tslib_1.__assign({}, section === null || section === void 0 ? void 0 : section.options), { hidden: (0, shared_1.runCallable)((_b = section === null || section === void 0 ? void 0 : section.options) === null || _b === void 0 ? void 0 : _b.hidden, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), visible: (0, shared_1.runCallable)((_c = section === null || section === void 0 ? void 0 : section.options) === null || _c === void 0 ? void 0 : _c.visible, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), title: (0, shared_1.runCallable)((_d = section === null || section === void 0 ? void 0 : section.options) === null || _d === void 0 ? void 0 : _d.title, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }), infoItemList: infoItemList, onModuleEditorClick: (0, shared_1.runCallable)((_e = section === null || section === void 0 ? void 0 : section.options) === null || _e === void 0 ? void 0 : _e.onModuleEditorClick, {
                        data: detailPage === null || detailPage === void 0 ? void 0 : detailPage.data,
                        infoSectionListModel: infoSectionListModel,
                        tab: detailPage === null || detailPage === void 0 ? void 0 : detailPage.getActiveTab(),
                        detailPage: detailPage,
                    }) });
            }), className: (0, classnames_1.default)(cssRoot, (_c = infoSectionListModel === null || infoSectionListModel === void 0 ? void 0 : infoSectionListModel.options) === null || _c === void 0 ? void 0 : _c.className) }))));
    return dom;
});
var BasicDetailInfoSectionList = function (props) {
    var infoSectionListModel = (0, react_3.useCreateInnerBasicInfoSectionList)(props.config);
    return react_1.default.createElement(InnerBasicDetailInfoSection, { infoSectionListModel: infoSectionListModel });
};
exports.BasicDetailInfoSectionList = BasicDetailInfoSectionList;
exports.BasicDetailInfoSectionList.defineConfig = shared_1.defineInfoSectionListConfig;
exports.BasicDetailInfoSectionList.displayName = 'BasicDetailInfoSectionList';
//# sourceMappingURL=index.js.map