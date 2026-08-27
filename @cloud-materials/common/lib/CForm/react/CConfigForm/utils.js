"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfigRepeatedPath = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
/**
 * 检查表单配置里是否有重复的path，有则进行提醒
 * @param config
 */
var checkConfigRepeatedPath = function (config) {
    var checkFields = function (fields) {
        var e_1, _a;
        var _b;
        if (fields && (0, lodash_es_1.isArray)(fields)) {
            var uniqFields = (0, lodash_es_1.uniqWith)(fields, function (a, b) { return a.name === b.name; });
            if (uniqFields.length !== fields.length) {
                return (_b = (0, lodash_es_1.xor)(fields, uniqFields)[0]) === null || _b === void 0 ? void 0 : _b.name.toString();
            }
            var repeatedPath = void 0;
            try {
                for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                    var field = fields_1_1.value;
                    var checkRes = checkFields(field.fields);
                    if (checkRes) {
                        repeatedPath = "".concat(field.name, ".").concat(checkRes);
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return repeatedPath;
        }
    };
    var checkStep = function (steps) {
        var e_2, _a;
        if (steps && (0, lodash_es_1.isArray)(steps)) {
            var repeatedPath = void 0;
            try {
                for (var steps_1 = tslib_1.__values(steps), steps_1_1 = steps_1.next(); !steps_1_1.done; steps_1_1 = steps_1.next()) {
                    var step = steps_1_1.value;
                    var checkRes = checkFields(step.fields);
                    if (checkRes === null || checkRes === void 0 ? void 0 : checkRes.length) {
                        repeatedPath = "".concat(step.name, ".").concat(checkRes);
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (steps_1_1 && !steps_1_1.done && (_a = steps_1.return)) _a.call(steps_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return repeatedPath;
        }
    };
    var fields = config === null || config === void 0 ? void 0 : config.fields;
    var checkFieldsRes = checkFields(fields);
    if (checkFieldsRes === null || checkFieldsRes === void 0 ? void 0 : checkFieldsRes.length) {
        web_react_1.Notification.error({
            title: 'CForm',
            content: "CForm\u4E2D\u5B58\u5728\u91CD\u590D\u7684\u5B57\u6BB5\u8DEF\u5F84\uFF1A".concat(checkFieldsRes),
            closable: false,
            duration: 0,
        });
    }
    var steps = config === null || config === void 0 ? void 0 : config.steps;
    var checkStepRes = checkStep(steps);
    if (checkStepRes === null || checkStepRes === void 0 ? void 0 : checkStepRes.length) {
        web_react_1.Notification.error({
            title: 'CForm',
            content: "CForm\u4E2D\u5B58\u5728\u91CD\u590D\u7684\u5B57\u6BB5\u8DEF\u5F84\uFF1A".concat(checkStepRes),
            closable: false,
            duration: 0,
        });
    }
};
exports.checkConfigRepeatedPath = checkConfigRepeatedPath;
//# sourceMappingURL=utils.js.map