import { __makeTemplateObject } from "tslib";
import { Checkbox } from '@arco-design/web-react';
import React from 'react';
import { useTable } from '../../CTable';
import { cssPrefix, DataCy } from '../utils';
var SelectAllBox = function (_a) {
    var disabled = _a.disabled;
    var table = useTable();
    var _b = table.getSelectedStatusInfo(), canControlRowKeys = _b.canControlRowKeys, partialSelected = _b.partialSelected, allSelected = _b.allSelected;
    var onChange = function () {
        table.selectRowAll(!allSelected, { triggerSelectRowEvent: true });
    };
    return (React.createElement(Checkbox, { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["check-all"], ["check-all"]))), disabled: disabled || canControlRowKeys.length === 0, checked: allSelected, indeterminate: partialSelected, onClick: onChange, "data-cy": DataCy.selectAll }));
};
export default SelectAllBox;
var templateObject_1;
//# sourceMappingURL=SelectAllBox.js.map