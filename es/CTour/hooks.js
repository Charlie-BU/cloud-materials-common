import { __read } from "tslib";
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { useLayoutEffect, useRef, useState } from 'react';
export var useCTour = function (_a) {
    var _b;
    var defaultCurrent = _a.defaultCurrent, current = _a.current, open = _a.open, _c = _a.mask, mask = _c === void 0 ? true : _c, defaultOpen = _a.defaultOpen, _d = _a.steps, steps = _d === void 0 ? [] : _d;
    var _e = __read(useMergedState(defaultCurrent !== null && defaultCurrent !== void 0 ? defaultCurrent : 0, { value: current }), 2), currentStep = _e[0], setStep = _e[1];
    var _f = __read(useState(), 2), realPosition = _f[0], setRealPosition = _f[1];
    var _g = __read(useMergedState(defaultOpen, {
        value: open,
        postState: function (origin) { return (currentStep < 0 || currentStep >= steps.length ? false : origin !== null && origin !== void 0 ? origin : false); },
    }), 2), mergedOpen = _g[0], setOpen = _g[1];
    var _h = __read(useState(mergedOpen), 2), hasOpened = _h[0], setHasOpened = _h[1];
    var openRef = useRef(mergedOpen);
    var stepMask = ((_b = steps[currentStep]) !== null && _b !== void 0 ? _b : {}).mask;
    var mergedMask = mergedOpen && (stepMask !== null && stepMask !== void 0 ? stepMask : mask);
    useLayoutEffect(function () {
        if (mergedOpen) {
            if (!openRef.current) {
                setStep(defaultCurrent !== null && defaultCurrent !== void 0 ? defaultCurrent : 0);
            }
            setHasOpened(true);
        }
        openRef.current = mergedOpen;
    }, [mergedOpen]);
    return {
        currentStep: currentStep,
        hasOpened: hasOpened,
        realPosition: realPosition,
        open: mergedOpen,
        showMask: mergedMask,
        setStep: setStep,
        setOpen: setOpen,
        setRealPosition: setRealPosition,
    };
};
//# sourceMappingURL=hooks.js.map