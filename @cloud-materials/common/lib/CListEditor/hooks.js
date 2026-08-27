"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCListEditor = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var util_1 = require("./util");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../CConfigProvider");
var useCListEditor = function (_props) {
    var _a, _b, _c;
    var onEditingDisableVerify = _props.onEditingDisableVerify, maxLen = _props.maxLen, addBtnSuffix = _props.addBtnSuffix, initValue = _props.initValue, items = _props.items, _d = _props.repeatValidatorLabel, repeatValidatorLabel = _d === void 0 ? [] : _d, repeatMessage = _props.repeatMessage, requireLabel = _props.requireLabel, requireMessage = _props.requireMessage;
    var _e = tslib_1.__read((0, react_1.useState)(false), 2), disableAdd = _e[0], setDisableAdd = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), realAddBtnSuffix = _f[0], setRealAddBtnSuffix = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(''), 2), disableAddTip = _g[0], setDisableAddTip = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)((0, util_1.getInitItemControl)(initValue, (items === null || items === void 0 ? void 0 : items.map(function (item) { return item.label; })) || [])), 2), itemsControl = _h[0], setItemControl = _h[1];
    var listValue = (0, react_1.useRef)((initValue === null || initValue === void 0 ? void 0 : initValue.map(function (i) { return i.value; })) || []);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var listEditorProps = {
        addProps: {
            disableAdd: disableAdd,
            addBtnSuffix: realAddBtnSuffix,
            disableAddTip: (_b = (_a = _props.disableAddTip) !== null && _a !== void 0 ? _a : disableAddTip) !== null && _b !== void 0 ? _b : "".concat(locale.CListEditor.disableAddTipLeft, " ").concat(maxLen, " ").concat(locale.CListEditor.disableAddTipRight),
        },
        listValue: listValue.current,
        itemsControl: itemsControl,
    };
    var getAddBtnSuffix = function (_a) {
        var addBtnSuffix = _a.addBtnSuffix, maxLen = _a.maxLen, num = _a.num;
        if (typeof addBtnSuffix === 'function' && maxLen) {
            return addBtnSuffix(maxLen - num); // 还剩xxx个bb
        }
        else if (!addBtnSuffix && maxLen) {
            return "".concat(locale.CListEditor.addBtnSuffixLeft).concat(maxLen - listValue.current.length).concat(locale.CListEditor.addBtnSuffixRight); // 还剩xxx个标签
        }
        else if (typeof addBtnSuffix === 'function') {
            return addBtnSuffix(0);
        }
        else {
            return addBtnSuffix;
        }
    };
    (0, react_1.useEffect)(function () {
        if (maxLen) {
            setDisableAdd(listValue.current.length >= maxLen);
        }
        setRealAddBtnSuffix(function () { return getAddBtnSuffix({ addBtnSuffix: addBtnSuffix, maxLen: maxLen, num: listValue.current.length }); });
    }, [(_c = listValue.current) === null || _c === void 0 ? void 0 : _c.length, maxLen]);
    var handleEditingDisableVerify = function () {
        var control = onEditingDisableVerify === null || onEditingDisableVerify === void 0 ? void 0 : onEditingDisableVerify(listValue.current);
        if (control) {
            var disableAdd_1 = control.disableAdd, disableAddTip_1 = control.disableAddTip;
            setDisableAdd(function (old) { return disableAdd_1 !== null && disableAdd_1 !== void 0 ? disableAdd_1 : old; });
            setDisableAddTip(function (old) { return disableAddTip_1 !== null && disableAddTip_1 !== void 0 ? disableAddTip_1 : old; });
            /** 将 itemsControl 中每个元素的disableDelete改变 */
            setItemControl(function (old) {
                var oldV = old;
                if (old.length !== listValue.current.length) {
                    oldV = (0, util_1.getInitItemControl)(listValue.current, (items === null || items === void 0 ? void 0 : items.map(function (item) { return item.label; })) || []);
                }
                return (0, util_1.changeItemControl)(oldV, (0, lodash_es_1.omit)(control, 'disableAdd', 'disableAddTip'), items.map(function (i) { return i.label; }));
            });
        }
    };
    var addItemControl = function () {
        setItemControl(function (old) {
            return old.concat([
                {
                    disableChange: (0, util_1.getInitDisableChange)(items.map(function (i) { return i.label; })),
                    disableDelete: false,
                    disableDeleteTip: '',
                    rowDisabled: false,
                    rowDisabledTip: '',
                },
            ]);
        });
    };
    var removeItem = function (index) {
        var remove = function (val) { return val.filter(function (_, idx) { return idx !== index; }); };
        setItemControl(remove);
        listValue.current = remove(listValue.current);
    };
    var changeListValue = function (path, val) {
        listValue.current = (0, lodash_es_1.set)(listValue.current, path, val);
    };
    var resetListValue = function (length) {
        listValue.current = listValue.current.slice(0, length);
        setItemControl(function (old) {
            var oldV = old;
            if (old.length !== listValue.current.length) {
                oldV = (0, util_1.getInitItemControl)(listValue.current, (items === null || items === void 0 ? void 0 : items.map(function (item) { return item.label; })) || []);
            }
            return (0, util_1.changeItemControl)(oldV, {}, items.map(function (i) { return i.label; }));
        });
        handleEditingDisableVerify();
    };
    var repeatValidator = function (label, index) {
        return function (v, cb) {
            return (0, util_1.repeatLabelValidator)(v, cb, (0, util_1.needCheck)(repeatValidatorLabel, label), (0, util_1.getItemValuesWidthOutIndex)(listValue.current, label, index), repeatMessage !== null && repeatMessage !== void 0 ? repeatMessage : locale.CListEditor.repeatLabel);
        };
    };
    // 在rules里面的validator传入其他的值，满足关联校验场景。
    var changeRuleValidator = function (index, rules) {
        var e_1, _a;
        if (!rules)
            return [];
        var innerRules = (0, lodash_es_1.cloneDeep)(rules);
        var _loop_1 = function (rule) {
            if (rule.validator) {
                var originValidator_1 = rule.validator;
                rule.validator = function (val, cb) {
                    var _a;
                    originValidator_1(val, cb, (_a = listValue.current) === null || _a === void 0 ? void 0 : _a[index], listValue.current, index);
                };
            }
        };
        try {
            for (var innerRules_1 = tslib_1.__values(innerRules), innerRules_1_1 = innerRules_1.next(); !innerRules_1_1.done; innerRules_1_1 = innerRules_1.next()) {
                var rule = innerRules_1_1.value;
                _loop_1(rule);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (innerRules_1_1 && !innerRules_1_1.done && (_a = innerRules_1.return)) _a.call(innerRules_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return innerRules;
    };
    var requireValidator = function (label) {
        return {
            required: (requireLabel === null || requireLabel === void 0 ? void 0 : requireLabel.includes(label)) || requireLabel === label,
            message: requireMessage !== null && requireMessage !== void 0 ? requireMessage : locale.CListEditor.requireMessage,
        };
    };
    var addItem = function () {
        addItemControl();
        listValue.current = listValue.current.concat((0, util_1.getEmptyItemValues)(items));
    };
    return [
        listEditorProps,
        {
            addItem: addItem,
            removeItem: removeItem,
            changeListValue: changeListValue,
            resetListValue: resetListValue,
            handleEditingDisableVerify: handleEditingDisableVerify,
            repeatValidator: repeatValidator,
            requireValidator: requireValidator,
            changeRuleValidator: changeRuleValidator,
        },
    ];
};
exports.useCListEditor = useCListEditor;
//# sourceMappingURL=hooks.js.map