import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { Descriptions, Form } from '@arco-design/web-react';
import { CConfigContext } from '../../../CConfigProvider';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { comPrefix, listContainerId } from '../../utils';
import { get } from 'lodash-es';
import useMergeProps from '@arco-design/web-react/es/_util/hooks/useMergeProps';
var cssPrefix = classNamePrefixFactory(comPrefix);
var testId = {
    infoContainer: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["info"], ["info"]))),
};
/**
 * 配置详情展示组件
 * @param props
 * @returns
 */
var InfoPreview = function (props) {
    var _a, _b;
    var _c = useContext(CConfigContext), useCssPrefix = _c.useCssPrefix, cComponentConfig = _c.cComponentConfig;
    var infoPreviewProps = (_b = (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CConfigPreview) === null || _a === void 0 ? void 0 : _a.infoPreview) !== null && _b !== void 0 ? _b : {};
    var cssPrefix = useCssPrefix(comPrefix);
    var form = props.form;
    var _d = useMergeProps(props, {}, infoPreviewProps), formatter = _d.formatter, fieldIndex = _d.fieldIndex, title = _d.title, layout = _d.layout;
    var data = [];
    // 监听表单内部字段值的变动
    var values = Form.useWatch(fieldIndex, form);
    // 如果用户传了formatter，则对每一个字段调用formatter，formatter的返回值作为展示值，formatter返回值为空则不展示当前字段
    if (formatter) {
        fieldIndex === null || fieldIndex === void 0 ? void 0 : fieldIndex.forEach(function (fieldKeyItem) {
            var formatterRes = formatter({
                fieldKey: fieldKeyItem,
                title: fieldKeyItem,
                value: get(values, fieldKeyItem),
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
                value: get(values, fieldKeyItem),
            });
        });
    }
    return (React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["info"], ["info"]))), "data-cy": testId.infoContainer, "data-testid": testId.infoContainer },
        React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["title"], ["title"]))) }, title),
        React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["info-list"], ["info-list"]))), id: listContainerId },
            React.createElement(Descriptions, { layout: layout, column: 1, title: null, data: data }))));
};
export default InfoPreview;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map