"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDownload = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var useDownload = function (props) {
    var _a = tslib_1.__read((0, react_1.useState)(), 2), result = _a[0], setResult = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), visible = _b[0], setVisible = _b[1];
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var value = props.value, fileName = props.fileName, _c = props.successMessage, successMessage = _c === void 0 ? locale.useDownload.successMsg : _c, _d = props.failMessage, failMessage = _d === void 0 ? locale.useDownload.failMsg : _d, _e = props.arcoPopoverProps, arcoPopoverProps = _e === void 0 ? {} : _e, _f = props.tooltip, tooltip = _f === void 0 ? locale.useDownload.download : _f;
    var clearResult = function () { return setResult(undefined); };
    // 来源：https://juejin.cn/post/6844904069958467592
    var downloadFile = function () {
        var file = new Blob([value], {
            type: 'text/plain',
        });
        var url = window.URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setResult(true);
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    };
    var getResultContent = function (result) {
        var Icon = result ? iconbox_react_ve_o_design_1.IconCheckCircleFill : iconbox_react_ve_o_design_1.IconCloseCircleFill;
        var message = result ? successMessage : failMessage;
        return (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Icon, { style: { marginRight: '4px' } }),
            react_1.default.createElement("span", null, message)));
    };
    var downloadProps = (0, react_1.useMemo)(function () {
        var onVisibleChange = arcoPopoverProps.onVisibleChange, _content = arcoPopoverProps.content, others = tslib_1.__rest(arcoPopoverProps, ["onVisibleChange", "content"]);
        var isDownload = typeof result === 'boolean';
        if (isDownload) {
            return {
                message: result ? successMessage : failMessage,
                success: result,
                fail: !result,
                arcoPopoverProps: tslib_1.__assign({ content: getResultContent(result), popupVisible: true, onVisibleChange: function (visible) {
                        if (!visible) {
                            clearResult();
                        }
                        onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
                        setVisible(visible);
                    } }, others),
            };
        }
        return {
            arcoPopoverProps: tslib_1.__assign({ content: tooltip, popupVisible: visible && Boolean(tooltip || arcoPopoverProps.content), onVisibleChange: function (visible) {
                    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
                    setVisible(visible);
                } }, others),
        };
    }, [result, visible]);
    var controls = { downloadFile: downloadFile, clearResult: clearResult };
    return [downloadProps, controls];
};
exports.useDownload = useDownload;
//# sourceMappingURL=useDownload.js.map