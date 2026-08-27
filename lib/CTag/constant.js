"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_ID = exports.SEPARATOR = exports.MAX_WIDTH = exports.TYPES = exports.LINEAR_COLORS = exports.ARCO_COLORS = exports.COLORS = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
/**
 * @zh 内置颜色
 */
exports.COLORS = ['blue', 'green', 'pink', 'darkblue', 'aquamarine', 'brown', 'gray'];
/**
 * @zh Arco 内置颜色
 */
exports.ARCO_COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'cyan',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
];
/**
 * @zh 内置渐变色
 */
exports.LINEAR_COLORS = ['linearRed', 'linearOrangered', 'linearGold'];
/**
 * @zh Tag 颜色填充方式
 */
exports.TYPES = ['default', 'bordered', 'outline', 'text-dot', 'text'];
/**
 * @zh Tag 默认最大宽度，溢出省略
 */
exports.MAX_WIDTH = 160;
/**
 * @zh 默认复制分割符
 */
exports.SEPARATOR = '\n';
var tagCssPrefix = (0, classNamePrefixFactory_1.default)('tag');
exports.TEST_ID = {
    prefixTag: tagCssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["prefix"], ["prefix"]))),
    tag: tagCssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))),
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=constant.js.map