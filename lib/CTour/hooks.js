"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCTour = void 0;
var tslib_1 = require("tslib");
var useMergedState_1 = tslib_1.__importDefault(require("rc-util/es/hooks/useMergedState"));
var react_1 = require("react");
var useCTour = function (_a) {
    var _b;
    var defaultCurrent = _a.defaultCurrent, current = _a.current, open = _a.open, _c = _a.mask, mask = _c === void 0 ? true : _c, defaultOpen = _a.defaultOpen, _d = _a.steps, steps = _d === void 0 ? [] : _d;
    var _e = tslib_1.__read((0, useMergedState_1.default)(defaultCurrent !== null && defaultCurrent !== void 0 ? defaultCurrent : 0, { value: current }), 2), currentStep = _e[0], setStep = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(), 2), realPosition = _f[0], setRealPosition = _f[1];
    var _g = tslib_1.__read((0, useMergedState_1.default)(defaultOpen, {
        value: open,
        postState: function (origin) { return (currentStep < 0 || currentStep >= steps.length ? false : origin !== null && origin !== void 0 ? origin : false); },
    }), 2), mergedOpen = _g[0], setOpen = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(mergedOpen), 2), hasOpened = _h[0], setHasOpened = _h[1];
    var openRef = (0, react_1.useRef)(mergedOpen);
    var stepMask = ((_b = steps[currentStep]) !== null && _b !== void 0 ? _b : {}).mask;
    var mergedMask = mergedOpen && (stepMask !== null && stepMask !== void 0 ? stepMask : mask);
    (0, react_1.useLayoutEffect)(function () {
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
exports.useCTour = useCTour;
//# sourceMappingURL=hooks.js.map