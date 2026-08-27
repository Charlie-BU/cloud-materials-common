"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSeparatorInStr = exports.formatStr2Arr = exports.isLegalIp = void 0;
var tslib_1 = require("tslib");
var cidr_regex_1 = tslib_1.__importDefault(require("cidr-regex"));
var ip_regex_1 = tslib_1.__importDefault(require("ip-regex"));
var interface_1 = require("./interface");
// 预设分隔符
var presetSeparator = /[\r\n\s,，]/g;
// 校验一个字符串是否是白名单类型
var whitelistIpValidator = function (ip) {
    // 每个分段要么是一个合法的IP地址，要么满足CIDR格式要求，要么是0.0.0.0/0
    if (ip === '0.0.0.0/0')
        return true;
    if (ip === '0.0.0.0')
        return false;
    return cidr_regex_1.default.v4({ exact: true }).test(ip) || ip_regex_1.default.v4({ exact: true }).test(ip);
};
// 根据预设IP校验模式校验输入字符串
var isLegalIp = function (value, mode) {
    var result = false;
    switch (mode) {
        case interface_1.ValidatorMode.v4:
            result = ip_regex_1.default.v4({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.v6:
            result = ip_regex_1.default.v6({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.v4v6:
            result = (0, ip_regex_1.default)({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.v4cidr:
            result = cidr_regex_1.default.v4({ exact: true }).test(value) || ip_regex_1.default.v4({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.v6cidr:
            result = cidr_regex_1.default.v6({ exact: true }).test(value) || ip_regex_1.default.v6({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.v4v6cidr:
            result = (0, cidr_regex_1.default)({ exact: true }).test(value) || (0, ip_regex_1.default)({ exact: true }).test(value);
            break;
        case interface_1.ValidatorMode.whitelistIp:
            result = whitelistIpValidator(value);
            break;
        default:
            result = ip_regex_1.default.v4({ exact: true }).test(value);
            break;
    }
    return result;
};
exports.isLegalIp = isLegalIp;
// 合并预设分隔符和用户自定义分隔符
function combineSeparator(separator) {
    return !separator
        ? [presetSeparator]
        : (separator === null || separator === void 0 ? void 0 : separator.coverPresetSeparator)
            ? [separator.customSeparator]
            : [presetSeparator, separator.customSeparator];
}
// 将字符串按照分隔符进行切割，返回数组
var formatStr2Arr = function (str, separator) {
    var e_1, _a;
    var finalSeparator = combineSeparator(separator);
    var result = [str];
    var _loop_1 = function (separator_1) {
        result = result.map(function (item) { return item.split(separator_1).filter(Boolean); }).flat();
    };
    try {
        for (var finalSeparator_1 = tslib_1.__values(finalSeparator), finalSeparator_1_1 = finalSeparator_1.next(); !finalSeparator_1_1.done; finalSeparator_1_1 = finalSeparator_1.next()) {
            var separator_1 = finalSeparator_1_1.value;
            _loop_1(separator_1);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (finalSeparator_1_1 && !finalSeparator_1_1.done && (_a = finalSeparator_1.return)) _a.call(finalSeparator_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
exports.formatStr2Arr = formatStr2Arr;
// 判断一个字符串中是否包含分隔符
function hasSeparatorInStr(str, separator) {
    var finalSeparator = combineSeparator(separator);
    return finalSeparator.some(function (reg) {
        return reg.test(str);
    });
}
exports.hasSeparatorInStr = hasSeparatorInStr;
//# sourceMappingURL=utils.js.map