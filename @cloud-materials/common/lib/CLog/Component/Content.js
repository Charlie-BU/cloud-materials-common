"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var web_react_1 = require("@arco-design/web-react");
var LogItem_1 = require("./LogItem");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../CLoadingV2"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var dataCy_1 = require("../dataCy");
var Content = function (props) {
    var showSerialNumber = props.showSerialNumber, serialNumberType = props.serialNumberType, formatSerial = props.formatSerial, renderItem = props.renderItem, onClickItem = props.onClickItem, listRef = props.listRef, state = props.state;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix('log');
    var listProps = state.listProps, topDisabled = state.topDisabled, bottomDisabled = state.bottomDisabled, loading = state.loading, serialWidth = state.serialWidth, showButton = state.showButton, keyWord = state.keyWord, hasLoadMoreFn = state.hasLoadMoreFn, noMoreData = state.noMoreData, keepLatest = state.keepLatest;
    // 配置 showLatest 时，自动展示最新的日志
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (keepLatest && ((_a = listProps.dataSource) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            (_b = listRef.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView(listProps.dataSource.length - 1);
        }
    }, [listProps.dataSource, keepLatest, listRef]);
    var getScrollLoading = function () {
        var _a;
        if (((_a = listProps.dataSource) === null || _a === void 0 ? void 0 : _a.length) > 0 && hasLoadMoreFn) {
            if (noMoreData) {
                return locale.CLog.noMoreData;
            }
            else {
                return (react_1.default.createElement(web_react_1.Space, { size: 4 },
                    react_1.default.createElement(CLoadingV2_1.default.Spin, { size: 16 }),
                    locale.CLog.dataLoading,
                    "..."));
            }
        }
        else {
            return null;
        }
    };
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["content"], ["content"]))) },
        loading ? (react_1.default.createElement(CLoadingV2_1.default.Spin, { loading: loading, arcoSpinProps: { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["content-loading"], ["content-loading"]))) } })) : (react_1.default.createElement(web_react_1.List, tslib_1.__assign({ style: { border: 'none' }, listRef: listRef, render: function (item, index) {
                return renderItem ? (renderItem === null || renderItem === void 0 ? void 0 : renderItem(item, index)) : (react_1.default.createElement(LogItem_1.LogItem, { index: index, data: item, showSerialNumber: showSerialNumber, serialNumberType: serialNumberType, serialWidth: serialWidth, keyWord: keyWord, formatSerial: formatSerial, onClickItem: onClickItem }));
            }, scrollLoading: getScrollLoading() }, state.listProps))),
        // NOTE: 有数据且出现滚动条的时候才展示
        showButton && (react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["content-btn"], ["content-btn"]))) },
            react_1.default.createElement(web_react_1.Popover, { content: locale.CLog.toTop, position: "left" },
                react_1.default.createElement(web_react_1.Button, { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconTopAlign, null), size: "mini", style: { marginBottom: 8 }, disabled: topDisabled, onClick: function () {
                        var _a;
                        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(0);
                    }, "data-cy": dataCy_1.testId.toTop, "data-testid": dataCy_1.testId.toTop })),
            react_1.default.createElement(web_react_1.Popover, { content: locale.CLog.toBottom, position: "left" },
                react_1.default.createElement(web_react_1.Button, { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconBottomAlign, null), size: "mini", disabled: bottomDisabled, onClick: function () {
                        var _a;
                        var index = listProps.dataSource ? listProps.dataSource.length - 1 : 0;
                        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(index);
                    }, "data-cy": dataCy_1.testId.toBottom, "data-testid": dataCy_1.testId.toBottom }))))));
};
exports.Content = Content;
exports.default = exports.Content;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Content.js.map