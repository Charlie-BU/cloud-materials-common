import { useCConfigContext } from '../../../CConfigProvider';
/** 获取 CTable 下组件的类名前缀 */
export var usePrefix = function (compPrefix) {
    var cPrefixCls = useCConfigContext().cPrefixCls;
    return compPrefix ? "".concat(cPrefixCls, "-table-").concat(compPrefix) : "".concat(cPrefixCls, "-table");
};
//# sourceMappingURL=usePrefix.js.map