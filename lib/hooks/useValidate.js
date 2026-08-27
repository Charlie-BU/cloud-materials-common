"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidate = exports.schemaValidate = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var util_1 = require("../CPopoverVerify/util");
var ahooks_1 = require("ahooks");
var b_validate_1 = tslib_1.__importStar(require("b-validate"));
var zh_CN_1 = tslib_1.__importDefault(require("b-validate/es/locale/zh-CN"));
var CConfigProvider_1 = require("../CConfigProvider");
var FIELD = '__field__';
var WAIT_TIME = 100;
var schemaValidate = function (rules, field, value, stopAtFirstError) {
    if (stopAtFirstError === void 0) { stopAtFirstError = false; }
    var current = 0;
    return new Promise(function (resolve) {
        var warning = [], error = [];
        var validate = function (rule) {
            var _a, _b;
            var next = function () {
                if (current < rules.length - 1) {
                    current++;
                    return validate(rules[current]);
                }
                return resolve({ error: error, warning: warning });
            };
            if (!rule) {
                return next();
            }
            var _rule = tslib_1.__assign({}, rule);
            if (!_rule.type && !_rule.validator) {
                _rule.type = 'string';
            }
            var schema = new b_validate_1.Schema((_a = {}, _a[field] = [_rule], _a), {
                ignoreEmptyString: true,
            });
            schema.validate((_b = {}, _b[field] = value, _b), function (err) {
                if (typeof rule.key !== 'undefined') {
                    // 特殊情况，b-validate 在 value = '' ，minLength > 0 时，不会报错，
                    // 由于 CPopoverVerify 规则展示的特殊性，这里需要强制报错
                    if (!err && (_rule === null || _rule === void 0 ? void 0 : _rule.minLength) && (_rule === null || _rule === void 0 ? void 0 : _rule.minLength) > 0 && value === '') {
                        error.push({ key: rule.key, message: _rule.message });
                        if (stopAtFirstError) {
                            return resolve({
                                error: error,
                                warning: warning,
                            });
                        }
                    }
                    if (err) {
                        if (rule.validateLevel === 'warning') {
                            warning.push({ key: rule.key, message: err[field].message });
                        }
                        else {
                            error.push({ key: rule.key, message: err[field].message });
                            if (stopAtFirstError) {
                                return resolve({
                                    error: error,
                                    warning: warning,
                                });
                            }
                        }
                    }
                }
                return next();
            });
        };
        validate(rules[current]);
    });
};
exports.schemaValidate = schemaValidate;
var useValidate = function (_a) {
    var value = _a.value, _b = _a.rules, rules = _b === void 0 ? [] : _b, stopAtFirstError = _a.stopAtFirstError, validateOnRulesChange = _a.validateOnRulesChange;
    var _c = tslib_1.__read((0, react_1.useState)([]), 2), errors = _c[0], setErrors = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)([]), 2), warnings = _d[0], setWarnings = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(true), 2), isInit = _e[0], setIsInit = _e[1];
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    if (locale.locale === 'zh-CN') {
        b_validate_1.default.setGlobalConfig({
            validateMessages: zh_CN_1.default,
        });
    }
    var _rules = (0, react_1.useMemo)(function () { return (0, util_1.formatRules)(rules); }, [rules]);
    var checkValue = (0, ahooks_1.useThrottleFn)(function (value, rules) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, error, warning;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.schemaValidate)(rules, FIELD, value, stopAtFirstError)];
                case 1:
                    _a = _b.sent(), error = _a.error, warning = _a.warning;
                    setErrors(error);
                    setWarnings(warning);
                    return [2 /*return*/];
            }
        });
    }); }, { wait: WAIT_TIME }).run;
    (0, ahooks_1.useUpdateEffect)(function () {
        setIsInit(false);
    }, [value]);
    (0, react_1.useEffect)(function () {
        checkValue(value, _rules);
    }, [value, checkValue, stopAtFirstError]);
    (0, react_1.useEffect)(function () {
        if (validateOnRulesChange) {
            checkValue(value, _rules);
        }
    }, [_rules, validateOnRulesChange]);
    return { valid: errors.length === 0, errors: errors, warnings: warnings, isInit: isInit };
};
exports.useValidate = useValidate;
exports.default = exports.useValidate;
//# sourceMappingURL=useValidate.js.map