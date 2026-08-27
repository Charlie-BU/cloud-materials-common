import { __makeTemplateObject } from "tslib";
import { IconClose } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';
import { CConfigContext } from '../../CConfigProvider';
import { useTable } from '../../CTable';
import { ROW_KEY } from '../constant';
import { DataCy } from '../utils';
var Delete = function (_a) {
    var item = _a.item;
    var table = useTable();
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["delete-icon"], ["delete-icon"]))), "data-cy": DataCy.deleteItem, onClick: function () {
            table.selectRow([item[ROW_KEY]], { triggerSelectRowEvent: true });
        } },
        React.createElement(IconClose, { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["icon"], ["icon"]))) })));
};
export default Delete;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Delete.js.map