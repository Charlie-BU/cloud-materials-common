import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import { usePagination } from '@storage-fe/formily-arco/es/ArrayTable';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import ArrayBaseAddition from '../ArrayBaseAddition';
var cssPrefix = classNamePrefixFactory('cform-array-table-addition');
var ArrayTableAddition = function (props) {
    var _a = usePagination(), _b = _a.totalPage, totalPage = _b === void 0 ? 0 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, changePage = _a.changePage, _d = _a.currentPage, currentPage = _d === void 0 ? 1 : _d;
    var array = ArrayBase.useArray();
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
        React.createElement(ArrayBaseAddition, __assign({ defaultValue: {} }, props, { onClick: function () {
                var _a, _b, _c;
                // 如果添加数据后将超过当前页，则自动切换到添加页
                var total = ((_b = (_a = array === null || array === void 0 ? void 0 : array.field) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) || 0;
                if (total > currentPage * pageSize && typeof changePage === 'function') {
                    if (total === totalPage * pageSize + 1) {
                        changePage(totalPage + 1);
                    }
                    else {
                        changePage(totalPage);
                    }
                }
                (_c = props === null || props === void 0 ? void 0 : props.onClick) === null || _c === void 0 ? void 0 : _c.call(props);
            } }))));
};
ArrayTableAddition.displayName = 'ArrayTableAddition';
export default ArrayTableAddition;
var templateObject_1;
//# sourceMappingURL=index.js.map