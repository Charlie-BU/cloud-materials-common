import { __makeTemplateObject } from "tslib";
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CInlineEdit from '../CInlineEdit';
import CCopy from '../CCopy';
import Word from './Word';
import CEllipsis from '../CEllipsis';
export var cssPrefix = classNamePrefixFactory('info-section');
export var DEFAULT_COLUMN = 2;
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    title: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["title"], ["title"]))),
    item: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["item"], ["item"]))),
};
export var builtInMap = { CEllipsis: CEllipsis, CInlineEdit: CInlineEdit, CCopy: CCopy, Word: Word };
export var labelWidthMap = {
    normal: 80,
    small: 53,
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=constant.js.map