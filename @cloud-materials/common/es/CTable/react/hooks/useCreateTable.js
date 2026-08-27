/*
 * @Author: youjingyu
 * @Date: 2021-10-20 11:24:16
 * @LastEditTime: 2021-11-28 13:45:06
 * @LastEditors: youjingyu
 * @Description:
 */
import { useMemo } from 'react';
import { createTable } from '../../core';
export var useCreateTable = function (tableConfig) {
    var table = useMemo(function () { return createTable(tableConfig); }, []);
    return table;
};
//# sourceMappingURL=useCreateTable.js.map