import { omit } from 'lodash-es';
import { ROW_KEY } from '../constants';
/**
 * 从数据中删除 rowKey
 */
export var removeRowKey = function (value) {
    return omit(value, ROW_KEY);
};
//# sourceMappingURL=removeRowKey.js.map