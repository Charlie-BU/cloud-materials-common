import { __assign, __makeTemplateObject } from "tslib";
import React, { useEffect } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { List, Popover, Button, Space } from '@arco-design/web-react';
import { LogItem } from './LogItem';
import CLoadingV2 from '../../CLoadingV2';
import { IconTopAlign, IconBottomAlign } from '@arco-design/iconbox-react-ve-o-design';
import { testId } from '../dataCy';
export var Content = function (props) {
    var showSerialNumber = props.showSerialNumber, serialNumberType = props.serialNumberType, formatSerial = props.formatSerial, renderItem = props.renderItem, onClickItem = props.onClickItem, listRef = props.listRef, state = props.state;
    var _a = useCConfigContext(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix('log');
    var listProps = state.listProps, topDisabled = state.topDisabled, bottomDisabled = state.bottomDisabled, loading = state.loading, serialWidth = state.serialWidth, showButton = state.showButton, keyWord = state.keyWord, hasLoadMoreFn = state.hasLoadMoreFn, noMoreData = state.noMoreData, keepLatest = state.keepLatest;
    // 配置 showLatest 时，自动展示最新的日志
    useEffect(function () {
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
                return (React.createElement(Space, { size: 4 },
                    React.createElement(CLoadingV2.Spin, { size: 16 }),
                    locale.CLog.dataLoading,
                    "..."));
            }
        }
        else {
            return null;
        }
    };
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["content"], ["content"]))) },
        loading ? (React.createElement(CLoadingV2.Spin, { loading: loading, arcoSpinProps: { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["content-loading"], ["content-loading"]))) } })) : (React.createElement(List, __assign({ style: { border: 'none' }, listRef: listRef, render: function (item, index) {
                return renderItem ? (renderItem === null || renderItem === void 0 ? void 0 : renderItem(item, index)) : (React.createElement(LogItem, { index: index, data: item, showSerialNumber: showSerialNumber, serialNumberType: serialNumberType, serialWidth: serialWidth, keyWord: keyWord, formatSerial: formatSerial, onClickItem: onClickItem }));
            }, scrollLoading: getScrollLoading() }, state.listProps))),
        // NOTE: 有数据且出现滚动条的时候才展示
        showButton && (React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["content-btn"], ["content-btn"]))) },
            React.createElement(Popover, { content: locale.CLog.toTop, position: "left" },
                React.createElement(Button, { icon: React.createElement(IconTopAlign, null), size: "mini", style: { marginBottom: 8 }, disabled: topDisabled, onClick: function () {
                        var _a;
                        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(0);
                    }, "data-cy": testId.toTop, "data-testid": testId.toTop })),
            React.createElement(Popover, { content: locale.CLog.toBottom, position: "left" },
                React.createElement(Button, { icon: React.createElement(IconBottomAlign, null), size: "mini", disabled: bottomDisabled, onClick: function () {
                        var _a;
                        var index = listProps.dataSource ? listProps.dataSource.length - 1 : 0;
                        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(index);
                    }, "data-cy": testId.toBottom, "data-testid": testId.toBottom }))))));
};
export default Content;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Content.js.map