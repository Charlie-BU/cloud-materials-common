"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var web_react_1 = require("@arco-design/web-react");
var util_1 = require("./util");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("../hooks");
var CConfigProvider_1 = require("../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('popover-verify');
exports.testId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    popover: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
};
var RuleStatus;
(function (RuleStatus) {
    RuleStatus["INIT"] = "init";
    RuleStatus["ERROR"] = "error";
    RuleStatus["SUCCESS"] = "success";
})(RuleStatus || (RuleStatus = {}));
var getIcon = function (status) {
    switch (status) {
        case RuleStatus.INIT:
            return util_1.ICONS.init;
        case RuleStatus.ERROR:
            return util_1.ICONS.error;
        default:
            return util_1.ICONS.success;
    }
};
var CPopoverVerify = function (props) {
    var rules = props.rules, value = props.value, _a = props.error, arcoFromItemError = _a === void 0 ? false : _a, onChange = props.onChange, _b = props.arcoPopoverProps, arcoPopoverProps = _b === void 0 ? {} : _b, children = props.children, errorKeys = props.errorKeys, className = props.className, style = props.style, validateOnRulesChange = props.validateOnRulesChange;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var popoverVerifyCls = getCPrefixCls('popover-verify');
    var _rules = (0, react_1.useMemo)(function () { return (0, util_1.formatRules)(rules || []); }, [rules]);
    var _c = tslib_1.__read((0, react_1.useState)(true), 2), successFlag = _c[0], setSuccessFlag = _c[1]; // 表示校验结果，不显示 children 的 error
    // 一直在进行实时校验
    var _d = (0, hooks_1.useValidate)({
        value: value,
        rules: _rules,
        validateOnRulesChange: validateOnRulesChange,
    }), isInit = _d.isInit, errors = _d.errors;
    (0, react_1.useEffect)(function () {
        setSuccessFlag(errors.length === 0 || (errors.length > 0 && isInit && (value === '' || value === undefined)));
    }, [value, errors, isInit]);
    var containerRef = (0, react_1.useRef)(null);
    var getRuleStatus = function (key) {
        // 1. 外部校验：errorKeys
        if (errorKeys) {
            if (errorKeys.includes(key)) {
                return RuleStatus.ERROR;
            }
        }
        else {
            // 2. 内部校验
            // 一直在实时校验，但是在不同的编辑状态下，显示 icon 的状态可能不同
            // 在一般的没有编辑（isInit）的状态下，rule 状态显示为 init
            // 在已经编辑的状态下，rule 显示为 error + success
            // 在没有编辑（isInit）+ arcoFromItemError 状态下，rule 显示为 error + success
            // 因此这里可得到严格为 init 的条件
            if (!arcoFromItemError && isInit && (value === undefined || value === '')) {
                return RuleStatus.INIT;
            }
            if (errors.length > 0) {
                if (errors.map(function (error) { return error.key; }).includes(key)) {
                    return RuleStatus.ERROR;
                }
                return RuleStatus.SUCCESS;
            }
        }
        return RuleStatus.SUCCESS;
    };
    // useEffect(() => {
    //   const handleFocusIn = () => {
    //     setFocus(true);
    //   };
    //   const handleFocusOut = () => {
    //     setFocus(false);
    //   };
    //   if (containerRef.current) {
    //     const observerRefValue = containerRef.current;
    //     observerRefValue.addEventListener('focusin', handleFocusIn);
    //     observerRefValue.addEventListener('focusout', handleFocusOut);
    //     return () => {
    //       observerRefValue.removeEventListener('focusin', handleFocusIn);
    //       observerRefValue.removeEventListener('focusout', handleFocusOut);
    //     };
    //   }
    // }, []);
    var renderRules = function () {
        if (!(_rules === null || _rules === void 0 ? void 0 : _rules.length)) {
            return null;
        }
        return (react_1.default.createElement("div", { "data-testid": exports.testId.popover, "data-cy": exports.testId.popover }, _rules.map(function (_a) {
            var key = _a.key, message = _a.message;
            var status = getRuleStatus(key);
            return (react_1.default.createElement("div", { key: key, className: (0, classnames_1.default)("".concat(popoverVerifyCls, "-rule"), "".concat(popoverVerifyCls, "-").concat(status, "-rule")) },
                react_1.default.createElement("span", { className: "".concat(popoverVerifyCls, "-rule-icon") }, getIcon(status)),
                react_1.default.createElement("span", { className: "".concat(popoverVerifyCls, "-rule-desc") }, message)));
        })));
    };
    var childrenWithProps = children && react_1.default.Children.only(children)
        ? react_1.default.cloneElement(children, tslib_1.__assign({ onChange: function (val, e) {
                var _a, _b;
                // children 本身带的 onChange
                (_b = (_a = children.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, val, e);
                // form 透传的 onChange
                if (onChange) {
                    onChange(val, e);
                }
            }, error: successFlag ? undefined : 'true' }, (value === undefined ? {} : { value: value })))
        : null;
    return (react_1.default.createElement("div", { "data-testid": exports.testId.container, "data-cy": exports.testId.container, ref: containerRef, style: style, className: (0, classnames_1.default)(popoverVerifyCls, className) },
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ disabled: !rules, content: renderRules(), position: "right", trigger: ['focus'] }, arcoPopoverProps, { className: (0, classnames_1.default)("".concat(popoverVerifyCls, "-popover"), arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.className) }), childrenWithProps)));
};
CPopoverVerify.displayName = 'CPopoverVerify';
exports.default = CPopoverVerify;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map