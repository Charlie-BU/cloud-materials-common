"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFormAnchor = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var react_2 = require("@formily/react");
var const_1 = require("../../../const");
var lodash_es_1 = require("lodash-es");
var utils_1 = require("../../../shared/utils");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var AnchorLink = web_react_1.Anchor.Link;
var cssPrefix = (0, classNamePrefixFactory_1.default)('c-form-anchor');
exports.CFormAnchor = (0, react_2.observer)(function (props) {
    var scrollContainer = props.scrollContainer, _a = props.anrchorScollOffset, anrchorScollOffset = _a === void 0 ? 0 : _a, anchorInfo = props.anchorInfo, current = props.current;
    var _b = anchorInfo.level, level = _b === void 0 ? 1 : _b;
    var form = (0, react_2.useForm)();
    var _c = tslib_1.__read((0, react_1.useState)([]), 2), cFormAnchor = _c[0], setCFormAnchor = _c[1];
    // 显示的字段长度发生改变重新计算
    var visibleLength = form.query("".concat(const_1.CFormPrefixName, ".*")).reduce(function (acc, field) {
        if (field.display === 'visible') {
            return acc + 1;
        }
        return acc;
    }, 0);
    (0, react_1.useEffect)(function () {
        var _a = tslib_1.__read(form
            .query("".concat(const_1.CFormPrefixName, ".*"))
            .reduce(function (acc, field) {
            if (field.data && field.data.isStep && field.data.stepIndex === current) {
                if (((0, lodash_es_1.isPlainObject)(anchorInfo) && anchorInfo.isOn) || anchorInfo) {
                    acc.push(field);
                }
            }
            return acc;
        }, []), 1), step = _a[0];
        // 递归解析字段
        var buildAnchorTree = function (field, anchorLevel) {
            if (anchorLevel === 0)
                return;
            var subField = field.form.query("".concat(field.address.toString(), ".*")).reduce(function (acc, subField) {
                // 只添加显示的字段以及直接子代
                if (subField.display === 'visible' && subField.parent.address.toString() === field.address.toString()) {
                    acc.push(subField);
                }
                return acc;
            }, []);
            var anchorNode = [];
            subField.forEach(function (item) {
                // 获取每一步排除的字段
                var isExclude = (0, lodash_es_1.isPlainObject)(anchorInfo) &&
                    anchorInfo.exclude &&
                    (anchorInfo.exclude.includes(item.path.toString()) || anchorInfo.exclude.includes(item.address.toString()));
                if (!isExclude) {
                    var subAnchorNode = buildAnchorTree(item, anchorLevel - 1);
                    if (item.title) {
                        anchorNode.push({
                            id: (0, utils_1.getFormFieldId)(item.address.toString()),
                            title: item.title,
                            subNodes: subAnchorNode,
                        });
                    }
                }
            });
            return anchorNode;
        };
        if (step) {
            var anchorNode = buildAnchorTree(step, level) || [];
            setCFormAnchor(anchorNode);
        }
        else {
            setCFormAnchor([]);
        }
    }, [current, form, visibleLength]);
    // 递归渲染锚点
    var renderAnchorLink = function (anchorNodes) {
        return anchorNodes === null || anchorNodes === void 0 ? void 0 : anchorNodes.map(function (item) {
            return (react_1.default.createElement(AnchorLink, { key: item.id, href: "#".concat(item.id), title: item.title }, renderAnchorLink(item.subNodes)));
        });
    };
    if (cFormAnchor.length === 0) {
        return null;
    }
    return (react_1.default.createElement(web_react_1.Anchor, { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), targetOffset: 100, boundary: anrchorScollOffset, scrollContainer: "#".concat(scrollContainer), hash: false, onSelect: function () { } }, renderAnchorLink(cFormAnchor)));
});
var templateObject_1;
//# sourceMappingURL=index.js.map