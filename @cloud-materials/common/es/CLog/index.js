import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useRef } from 'react';
import classNames from 'classnames';
import { useCLog } from './hooks';
import { useCConfigContext } from '../CConfigProvider';
import Header from './Component/Header';
import Content from './Component/Content';
import { testId } from './dataCy';
var CLog = function (props) {
    var _a;
    var style = props.style, className = props.className, _b = props.showSearch, showSearch = _b === void 0 ? true : _b, title = props.title, cStatusProps = props.cStatusProps, renderOperation = props.renderOperation, _c = props.showSerialNumber, showSerialNumber = _c === void 0 ? true : _c, _d = props.serialNumberType, serialNumberType = _d === void 0 ? 'number' : _d, formatSerial = props.formatSerial, renderItem = props.renderItem, onClickItem = props.onClickItem, operationConfig = props.operationConfig, showLatest = props.showLatest, extraHeaderContent = props.extraHeaderContent, renderFooter = props.renderFooter;
    var listRef = useRef(null);
    var _e = __read(useCLog(props, listRef), 2), state = _e[0], controls = _e[1];
    var theme = state.theme, keyWord = state.keyWord, isFullScreen = state.isFullScreen, logData = state.logData, restState = __rest(state, ["theme", "keyWord", "isFullScreen", "logData"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className, (_a = {},
            _a[cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["fullscreen"], ["fullscreen"])))] = isFullScreen,
            _a[cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["black"], ["black"])))] = theme === 'black',
            _a)), "data-cy": testId.container, "data-testid": testId.container },
        React.createElement(Header, { theme: theme, keyWord: keyWord, isFullScreen: isFullScreen, showSearch: showSearch, title: title, cStatusProps: cStatusProps, renderOperation: renderOperation, controls: controls, logData: logData, operationConfig: operationConfig, extraHeaderContent: extraHeaderContent }),
        React.createElement(Content, { showSerialNumber: showSerialNumber, serialNumberType: serialNumberType, formatSerial: formatSerial, renderItem: renderItem, onClickItem: onClickItem, state: __assign({ keyWord: keyWord }, restState), listRef: listRef, showLatest: showLatest }),
        renderFooter && React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["footer"], ["footer"]))) }, renderFooter())));
};
CLog.displayName = 'CLog';
export default CLog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map