import { useCConfigContext } from '../../../CConfigProvider';
/** 获取 CTableEditor 下组件的类名前缀 */
export var usePrefix = function (compPrefix) {
    var cPrefixCls = useCConfigContext().cPrefixCls;
    return compPrefix ? "".concat(cPrefixCls, "-table-editor-").concat(compPrefix) : "".concat(cPrefixCls, "-table-editor");
};
//# sourceMappingURL=usePrefix.js.map