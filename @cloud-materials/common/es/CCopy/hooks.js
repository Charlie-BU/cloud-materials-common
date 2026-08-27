import { __assign, __read, __rest } from "tslib";
import React, { useMemo, useState } from 'react';
import copy from 'copy-to-clipboard';
import { IconCheckCircleFill, IconCloseCircleFill } from '@arco-design/iconbox-react-ve-o-design';
import { useCConfigContext } from '../CConfigProvider';
export var useCCopy = function (props) {
    var _a = __read(useState(), 2), result = _a[0], setResult = _a[1];
    var _b = __read(useState(false), 2), visible = _b[0], setVisible = _b[1];
    var locale = useCConfigContext().locale;
    var text = props.text, options = props.options, onCopy = props.onCopy, _c = props.successMessage, successMessage = _c === void 0 ? locale.CCopy.successMessage : _c, _d = props.failMessage, failMessage = _d === void 0 ? locale.CCopy.failMessage : _d, tooltip = props.tooltip, disabled = props.disabled, _e = props.arcoPopoverProps, arcoPopoverProps = _e === void 0 ? {} : _e;
    var clearResult = function () { return setResult(undefined); };
    var handleCopy = function (e) {
        if (disabled)
            return;
        e.stopPropagation();
        var result = copy(text, options);
        onCopy === null || onCopy === void 0 ? void 0 : onCopy(text, result);
        setResult(result);
    };
    var getResultContent = function (result) {
        var Icon = result ? IconCheckCircleFill : IconCloseCircleFill;
        var message = result ? successMessage : failMessage;
        return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(Icon, { style: { marginRight: '4px', fontSize: 14 } }),
            React.createElement("span", null, message)));
    };
    var copyProps = useMemo(function () {
        var onVisibleChange = arcoPopoverProps.onVisibleChange, _content = arcoPopoverProps.content, others = __rest(arcoPopoverProps, ["onVisibleChange", "content"]);
        var isCopied = typeof result === 'boolean';
        if (isCopied) {
            return {
                message: result ? successMessage : failMessage,
                success: result,
                fail: !result,
                arcoPopoverProps: __assign({ content: getResultContent(result), popupVisible: true, onVisibleChange: function (visible) {
                        if (!visible) {
                            clearResult();
                        }
                        onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
                        setVisible(visible);
                    } }, others),
            };
        }
        return {
            arcoPopoverProps: __assign({ content: tooltip, popupVisible: visible && Boolean(tooltip || arcoPopoverProps.content), onVisibleChange: function (visible) {
                    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
                    setVisible(visible);
                } }, others),
        };
    }, [result, visible]);
    var controls = { handleCopy: handleCopy, clearResult: clearResult };
    return [copyProps, controls];
};
//# sourceMappingURL=hooks.js.map