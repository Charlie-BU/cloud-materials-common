import { __assign, __makeTemplateObject } from "tslib";
import { observer, useField } from '@formily/react';
import React, { useContext, useEffect } from 'react';
import Agreement from '../../../../CAgreement';
import { CConfigContext } from '../../../../CConfigProvider';
import classNames from 'classnames';
/**
 * 服务条款同意组件
 */
var CAgreement = observer(function (props) {
    var _a;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('form-agreement');
    var field = useField();
    // 协议组件在 确认页 或者 卡片 中使用时，有上下的边距为16px。但在FormItem场景下需要调整这个边距。
    var dynamicMarginClass = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["common"], ["common"])));
    useEffect(function () {
        // 设置自定义校验，协议字段为false或undefined时，不允许提交
        field.setValidator(function (value) {
            if (!value) {
                return locale.CAgreement.defaultErrorToolTip;
            }
        });
        // 设置required，用于展示 FormItem场景下 label 前面的星号
        field.setRequired(true);
    }, [field]);
    useEffect(function () {
        var _a;
        // 强制设置 help 为空格，在错误状态下，FormItem会自动添加错误的message信息进行展示，CAgreement组件需要自定义错误展示形式。
        if (((_a = field === null || field === void 0 ? void 0 : field.decoratorType) === null || _a === void 0 ? void 0 : _a.displayName) === 'FormItem') {
            field.decoratorProps = __assign(__assign({}, field.decoratorProps), { help: ' ' });
        }
    }, [field.validateStatus]);
    if (((_a = field === null || field === void 0 ? void 0 : field.decoratorType) === null || _a === void 0 ? void 0 : _a.displayName) === 'FormItem') {
        dynamicMarginClass = cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["formItem"], ["formItem"])));
    }
    return (React.createElement(Agreement, __assign({ validateStatusError: !!field.validateStatus }, props, { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))), dynamicMarginClass, props === null || props === void 0 ? void 0 : props.className), style: props.style })));
});
export default CAgreement;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map