import { __assign, __rest } from "tslib";
import React from 'react';
import { BaseButton } from '../BaseButton';
import { IconPlusCircle } from '@arco-design/web-react/icon';
import { transformFormValuesToArray } from '../../../../utils';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';
export var SubmitButton = function (props) {
    var onSubmit = props.onSubmit, onValidateError = props.onValidateError, _a = props.icon, icon = _a === void 0 ? React.createElement(IconPlusCircle, null) : _a, _text = props.text, restProps = __rest(props, ["onSubmit", "onValidateError", "icon", "text"]);
    var locale = useCConfigContext().locale;
    var text = _text || locale.CTableEditor.submit;
    var handleClick = function (tableEditor) {
        tableEditor.form
            .submit()
            .then(function (values) {
            // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
            var v = transformFormValuesToArray(values, tableEditor.table.initTotalData);
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(v, tableEditor);
        })
            .catch(function (e) {
            onValidateError === null || onValidateError === void 0 ? void 0 : onValidateError(e);
            console.warn('校验失败, error:', e);
        });
    };
    return (React.createElement(BaseButton, __assign({ icon: icon, text: text, disabled: function (tableEditor) { return !(tableEditor === null || tableEditor === void 0 ? void 0 : tableEditor.hasChanged); } }, restProps, { onClick: handleClick, testId: testId.submitButton })));
};
//# sourceMappingURL=index.js.map