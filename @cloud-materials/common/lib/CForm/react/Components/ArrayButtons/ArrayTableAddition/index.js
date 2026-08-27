"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var ArrayTable_1 = require("@storage-fe/formily-arco/es/ArrayTable");
var ArrayBase_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/ArrayBase"));
var ArrayBaseAddition_1 = tslib_1.__importDefault(require("../ArrayBaseAddition"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('cform-array-table-addition');
var ArrayTableAddition = function (props) {
    var _a = (0, ArrayTable_1.usePagination)(), _b = _a.totalPage, totalPage = _b === void 0 ? 0 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, changePage = _a.changePage, _d = _a.currentPage, currentPage = _d === void 0 ? 1 : _d;
    var array = ArrayBase_1.default.useArray();
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement(ArrayBaseAddition_1.default, tslib_1.__assign({ defaultValue: {} }, props, { onClick: function () {
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
exports.default = ArrayTableAddition;
var templateObject_1;
//# sourceMappingURL=index.js.map