import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { Popover } from '@arco-design/web-react';
import { ICONS, formatRules } from './util';
import classNames from 'classnames';
import { useValidate } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('popover-verify');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["popover"], ["popover"]))),
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
            return ICONS.init;
        case RuleStatus.ERROR:
            return ICONS.error;
        default:
            return ICONS.success;
    }
};
var CPopoverVerify = function (props) {
    var rules = props.rules, value = props.value, _a = props.error, arcoFromItemError = _a === void 0 ? false : _a, onChange = props.onChange, _b = props.arcoPopoverProps, arcoPopoverProps = _b === void 0 ? {} : _b, children = props.children, errorKeys = props.errorKeys, className = props.className, style = props.style, validateOnRulesChange = props.validateOnRulesChange;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var popoverVerifyCls = getCPrefixCls('popover-verify');
    var _rules = useMemo(function () { return formatRules(rules || []); }, [rules]);
    var _c = __read(useState(true), 2), successFlag = _c[0], setSuccessFlag = _c[1]; // 表示校验结果，不显示 children 的 error
    // 一直在进行实时校验
    var _d = useValidate({
        value: value,
        rules: _rules,
        validateOnRulesChange: validateOnRulesChange,
    }), isInit = _d.isInit, errors = _d.errors;
    useEffect(function () {
        setSuccessFlag(errors.length === 0 || (errors.length > 0 && isInit && (value === '' || value === undefined)));
    }, [value, errors, isInit]);
    var containerRef = useRef(null);
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
        return (React.createElement("div", { "data-testid": testId.popover, "data-cy": testId.popover }, _rules.map(function (_a) {
            var key = _a.key, message = _a.message;
            var status = getRuleStatus(key);
            return (React.createElement("div", { key: key, className: classNames("".concat(popoverVerifyCls, "-rule"), "".concat(popoverVerifyCls, "-").concat(status, "-rule")) },
                React.createElement("span", { className: "".concat(popoverVerifyCls, "-rule-icon") }, getIcon(status)),
                React.createElement("span", { className: "".concat(popoverVerifyCls, "-rule-desc") }, message)));
        })));
    };
    var childrenWithProps = children && React.Children.only(children)
        ? React.cloneElement(children, __assign({ onChange: function (val, e) {
                var _a, _b;
                // children 本身带的 onChange
                (_b = (_a = children.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, val, e);
                // form 透传的 onChange
                if (onChange) {
                    onChange(val, e);
                }
            }, error: successFlag ? undefined : 'true' }, (value === undefined ? {} : { value: value })))
        : null;
    return (React.createElement("div", { "data-testid": testId.container, "data-cy": testId.container, ref: containerRef, style: style, className: classNames(popoverVerifyCls, className) },
        React.createElement(Popover, __assign({ disabled: !rules, content: renderRules(), position: "right", trigger: ['focus'] }, arcoPopoverProps, { className: classNames("".concat(popoverVerifyCls, "-popover"), arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.className) }), childrenWithProps)));
};
CPopoverVerify.displayName = 'CPopoverVerify';
export default CPopoverVerify;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map