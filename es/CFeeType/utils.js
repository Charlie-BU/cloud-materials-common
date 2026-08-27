import dayjs from 'dayjs';
import { isObject, isDate } from 'lodash-es';
/** 时间格式化 */
export function dateFormatter(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
/** 判断当前传入的时间是单个状态的时间还是多个状态的时间 */
export var isSingleTime = function (statusChangeTime) {
    return !isObject(statusChangeTime) || isDate(statusChangeTime);
};
//# sourceMappingURL=utils.js.map