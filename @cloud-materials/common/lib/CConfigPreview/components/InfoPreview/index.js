"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../_utils/classNamePrefixFactory"));
var utils_1 = require("../../utils");
var lodash_es_1 = require("lodash-es");
var useMergeProps_1 = tslib_1.__importDefault(require("@arco-design/web-react/es/_util/hooks/useMergeProps"));
var cssPrefix = (0, classNamePrefixFactory_1.default)(utils_1.comPrefix);
var testId = {
    infoContainer: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["info"], ["info"]))),
};
/**
 * 配置详情展示组件
 * @param props
 * @returns
 */
var InfoPreview = function (props) {
    var _a, _b;
    var _c = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _c.useCssPrefix, cComponentConfig = _c.cComponentConfig;
    var infoPreviewProps = (_b = (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CConfigPreview) === null || _a === void 0 ? void 0 : _a.infoPreview) !== null && _b !== void 0 ? _b : {};
    var cssPrefix = useCssPrefix(utils_1.comPrefix);
    var form = props.form;
    var _d = (0, useMergeProps_1.default)(props, {}, infoPreviewProps), formatter = _d.formatter, fieldIndex = _d.fieldIndex, title = _d.title, layout = _d.layout;
    var data = [];
    // 监听表单内部字段值的变动
    var values = web_react_1.Form.useWatch(fieldIndex, form);
    // 如果用户传了formatter，则对每一个字段调用formatter，formatter的返回值作为展示值，formatter返回值为空则不展示当前字段
    if (formatter) {
        fieldIndex === null || fieldIndex === void 0 ? void 0 : fieldIndex.forEach(function (fieldKeyItem) {
            var formatterRes = formatter({
                fieldKey: fieldKeyItem,
                title: fieldKeyItem,
                value: (0, lodash_es_1.get)(values, fieldKeyItem),
            });
            if (!formatterRes)
                return;
            data.push({
                label: formatterRes.title,
                value: formatterRes.value,
            });
        });
    }
    // 如果用户没有传formatter，展示所有字段的默认值
    else {
        fieldIndex === null || fieldIndex === void 0 ? void 0 : fieldIndex.forEach(function (fieldKeyItem) {
            data.push({
                label: fieldKeyItem,
                value: (0, lodash_es_1.get)(values, fieldKeyItem),
            });
        });
    }
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["info"], ["info"]))), "data-cy": testId.infoContainer, "data-testid": testId.infoContainer },
        react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["title"], ["title"]))) }, title),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["info-list"], ["info-list"]))), id: utils_1.listContainerId },
            react_1.default.createElement(web_react_1.Descriptions, { layout: layout, column: 1, title: null, data: data }))));
};
exports.default = InfoPreview;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map