"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCCopy = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../CConfigProvider");
var useCCopy = function (props) {
    var _a = tslib_1.__read((0, react_1.useState)(), 2), result = _a[0], setResult = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), visible = _b[0], setVisible = _b[1];
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var text = props.text, options = props.options, onCopy = props.onCopy, _c = props.successMessage, successMessage = _c === void 0 ? locale.CCopy.successMessage : _c, _d = props.failMessage, failMessage = _d === void 0 ? locale.CCopy.failMessage : _d, tooltip = props.tooltip, disabled = props.disabled, _e = props.arcoPopoverProps, arcoPopoverProps = _e === void 0 ? {} : _e;
    var clearResult = function () { return setResult(undefined); };
    var handleCopy = function (e) {
        if (disabled)
            return;
        e.stopPropagation();
        var result = (0, copy_to_clipboard_1.default)(text, options);
        onCopy === null || onCopy === void 0 ? void 0 : onCopy(text, result);
        setResult(result);
    };
    var getResultContent = function (result) {
        var Icon = result ? iconbox_react_ve_o_design_1.IconCheckCircleFill : iconbox_react_ve_o_design_1.IconCloseCircleFill;
        var message = result ? successMessage : failMessage;
        return (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Icon, { style: { marginRight: '4px', fontSize: 14 } }),
            react_1.default.createElement("span", null, message)));
    };
    var copyProps = (0, react_1.useMemo)(function () {
        var onVisibleChange = arcoPopoverProps.onVisibleChange, _content = arcoPopoverProps.content, others = tslib_1.__rest(arcoPopoverProps, ["onVisibleChange", "content"]);
        var isCopied = typeof result === 'boolean';
        if (isCopied) {
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
    var controls = { handleCopy: handleCopy, clearResult: clearResult };
    return [copyProps, controls];
};
exports.useCCopy = useCCopy;
//# sourceMappingURL=hooks.js.map