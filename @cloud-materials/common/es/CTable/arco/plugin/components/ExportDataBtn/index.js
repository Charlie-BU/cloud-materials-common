import React from 'react';
import { ExportData } from './exportDataModal';
export var ExportDataRangeType;
(function (ExportDataRangeType) {
    ExportDataRangeType["all"] = "all";
    ExportDataRangeType["selectedRows"] = "selectedRows";
    ExportDataRangeType["searchResult"] = "searchResult";
})(ExportDataRangeType || (ExportDataRangeType = {}));
export var ExportDataBtn = function (props) {
    return React.createElement(ExportData, { table: props.table, options: props });
};
//# sourceMappingURL=index.js.map