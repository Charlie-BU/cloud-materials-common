import { __makeTemplateObject } from "tslib";
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
/**
 * @zh 内置颜色
 */
export var COLORS = ['blue', 'green', 'pink', 'darkblue', 'aquamarine', 'brown', 'gray'];
/**
 * @zh Arco 内置颜色
 */
export var ARCO_COLORS = [
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
export var LINEAR_COLORS = ['linearRed', 'linearOrangered', 'linearGold'];
/**
 * @zh Tag 颜色填充方式
 */
export var TYPES = ['default', 'bordered', 'outline', 'text-dot', 'text'];
/**
 * @zh Tag 默认最大宽度，溢出省略
 */
export var MAX_WIDTH = 160;
/**
 * @zh 默认复制分割符
 */
export var SEPARATOR = '\n';
var tagCssPrefix = classNamePrefixFactory('tag');
export var TEST_ID = {
    prefixTag: tagCssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["prefix"], ["prefix"]))),
    tag: tagCssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))),
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=constant.js.map