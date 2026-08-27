"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var CConfigProvider_1 = require("../CConfigProvider");
var Header_1 = tslib_1.__importDefault(require("./Component/Header"));
var Content_1 = tslib_1.__importDefault(require("./Component/Content"));
var dataCy_1 = require("./dataCy");
var CLog = function (props) {
    var _a;
    var style = props.style, className = props.className, _b = props.showSearch, showSearch = _b === void 0 ? true : _b, title = props.title, cStatusProps = props.cStatusProps, renderOperation = props.renderOperation, _c = props.showSerialNumber, showSerialNumber = _c === void 0 ? true : _c, _d = props.serialNumberType, serialNumberType = _d === void 0 ? 'number' : _d, formatSerial = props.formatSerial, renderItem = props.renderItem, onClickItem = props.onClickItem, operationConfig = props.operationConfig, showLatest = props.showLatest, extraHeaderContent = props.extraHeaderContent, renderFooter = props.renderFooter;
    var listRef = (0, react_1.useRef)(null);
    var _e = tslib_1.__read((0, hooks_1.useCLog)(props, listRef), 2), state = _e[0], controls = _e[1];
    var theme = state.theme, keyWord = state.keyWord, isFullScreen = state.isFullScreen, logData = state.logData, restState = tslib_1.__rest(state, ["theme", "keyWord", "isFullScreen", "logData"]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className, (_a = {},
            _a[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["fullscreen"], ["fullscreen"])))] = isFullScreen,
            _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["black"], ["black"])))] = theme === 'black',
            _a)), "data-cy": dataCy_1.testId.container, "data-testid": dataCy_1.testId.container },
        react_1.default.createElement(Header_1.default, { theme: theme, keyWord: keyWord, isFullScreen: isFullScreen, showSearch: showSearch, title: title, cStatusProps: cStatusProps, renderOperation: renderOperation, controls: controls, logData: logData, operationConfig: operationConfig, extraHeaderContent: extraHeaderContent }),
        react_1.default.createElement(Content_1.default, { showSerialNumber: showSerialNumber, serialNumberType: serialNumberType, formatSerial: formatSerial, renderItem: renderItem, onClickItem: onClickItem, state: tslib_1.__assign({ keyWord: keyWord }, restState), listRef: listRef, showLatest: showLatest }),
        renderFooter && react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["footer"], ["footer"]))) }, renderFooter())));
};
CLog.displayName = 'CLog';
exports.default = CLog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map