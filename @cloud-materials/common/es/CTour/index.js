import { __assign, __makeTemplateObject, __read } from "tslib";
import { Portal, Trigger } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { useCTour } from './hooks';
import { Mask } from './Mask';
import { TourStep } from './TourStep';
import { useTarget } from './useTarget';
var DefaultOffset = 8;
var DefaultPopupAlign = {
    top: DefaultOffset,
    bottom: DefaultOffset,
    left: DefaultOffset,
    right: DefaultOffset,
};
var CTour = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var gap = props.gap, _g = props.steps, steps = _g === void 0 ? [] : _g, disabledInteraction = props.disabledInteraction, _h = props.zIndex, zIndex = _h === void 0 ? 1000 : _h, position = props.position, children = props.children, _j = props.trigger, trigger = _j === void 0 ? 'click' : _j, _k = props.closable, closable = _k === void 0 ? true : _k, hotspot = props.hotspot, mask = props.mask, triggerRef = props.triggerRef, triggerProps = props.triggerProps, _l = props.animated, animated = _l === void 0 ? true : _l, scrollIntoView = props.scrollIntoView, onClose = props.onClose, onChange = props.onChange, onFinish = props.onFinish, getPopupContainer = props.getPopupContainer;
    var _m = useCTour(props), open = _m.open, currentStep = _m.currentStep, showMask = _m.showMask, realPosition = _m.realPosition, hasOpened = _m.hasOpened, setOpen = _m.setOpen, setStep = _m.setStep, setRealPosition = _m.setRealPosition;
    var arcoTriggerRef = useRef(null);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('tour');
    var currentStepProps = (_a = steps[currentStep]) !== null && _a !== void 0 ? _a : {};
    var _o = __read(useTarget({
        target: (_b = currentStepProps.target) !== null && _b !== void 0 ? _b : (function () { var _a; return (_a = arcoTriggerRef.current) === null || _a === void 0 ? void 0 : _a.childrenDom; }),
        open: !!open,
        gap: gap,
        scrollIntoView: scrollIntoView,
    }), 1), posInfo = _o[0];
    useImperativeHandle(triggerRef, function () { return arcoTriggerRef.current; });
    useEffect(function () {
        if (arcoTriggerRef.current) {
            var originGetPopupStyle_1 = arcoTriggerRef.current.getPopupStyle;
            arcoTriggerRef.current.getPopupStyle = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var exeReturn = originGetPopupStyle_1.apply(arcoTriggerRef.current, args);
                // @ts-expect-error
                setRealPosition((_a = arcoTriggerRef.current) === null || _a === void 0 ? void 0 : _a.realPosition);
                return exeReturn;
            };
        }
    }, []);
    var singleStep = steps.length === 1;
    var handleClose = function () {
        setOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose(currentStep);
    };
    // ========================= Change =========================
    var onInternalChange = function (nextCurrent) {
        setStep(nextCurrent);
        onChange === null || onChange === void 0 ? void 0 : onChange(nextCurrent);
    };
    var mergedHotspot = (_c = currentStepProps.hotspot) !== null && _c !== void 0 ? _c : hotspot;
    var mergedClosable = (_d = currentStepProps.closable) !== null && _d !== void 0 ? _d : closable;
    var getPopupElement = function () {
        var _a;
        return (React.createElement(TourStep, __assign({ total: steps.length, onPrev: function () {
                onInternalChange(currentStep - 1);
            }, onNext: function () {
                onInternalChange(currentStep + 1);
            }, current: currentStep, onFinish: function () {
                handleClose();
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }, onClose: handleClose }, currentStepProps, { hotspot: mergedHotspot, closable: children ? false : mergedClosable, classNamePrefix: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), realPosition: realPosition, hotspotStyle: (_a = arcoTriggerRef.current) === null || _a === void 0 ? void 0 : _a.arrowStyle })));
    };
    var _p = __read(useMemo(function () {
        if (gap === null || gap === void 0 ? void 0 : gap.offset) {
            if (Array.isArray(gap.offset)) {
                return gap.offset;
            }
            return [gap.offset, gap.offset];
        }
        return [0, 0];
    }, [gap === null || gap === void 0 ? void 0 : gap.offset]), 2), gapOffsetLeftRight = _p[0], gapOffsetTopBottom = _p[1];
    if (!hasOpened && !children) {
        return null;
    }
    var popupAlign = (gap === null || gap === void 0 ? void 0 : gap.offset)
        ? {
            top: gapOffsetTopBottom + DefaultOffset,
            bottom: gapOffsetTopBottom + DefaultOffset,
            left: gapOffsetLeftRight + DefaultOffset,
            right: gapOffsetLeftRight + DefaultOffset,
        }
        : showMask
            ? void 0
            : DefaultPopupAlign;
    return (React.createElement(React.Fragment, null,
        (mask || !children) && (React.createElement(Mask, { pos: posInfo, showMask: showMask, open: open, disabledInteraction: disabledInteraction, zIndex: zIndex - 1, getContainer: getPopupContainer, animated: animated })),
        React.createElement(Trigger, __assign({ ref: arcoTriggerRef, popupVisible: open, popup: getPopupElement, onVisibleChange: function (v) {
                if (v) {
                    setOpen(v);
                }
                else {
                    handleClose();
                }
            }, clickOutsideToClose: mergedClosable, showArrow: (_e = currentStepProps.arrow) !== null && _e !== void 0 ? _e : true, className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["trigger"], ["trigger"]))), singleStep && cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["trigger-single"], ["trigger-single"]))), animated && cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["trigger-animated"], ["trigger-animated"])))), style: { zIndex: zIndex }, position: (_f = currentStepProps.position) !== null && _f !== void 0 ? _f : position, trigger: trigger, popupAlign: popupAlign, unmountOnExit: true }, triggerProps), children !== null && children !== void 0 ? children : (React.createElement(Portal, { visible: open },
            React.createElement("div", { style: __assign(__assign({}, posInfo), { position: 'fixed', pointerEvents: 'none' }) }))))));
};
CTour.displayName = 'CTour';
export { CTour as default };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map