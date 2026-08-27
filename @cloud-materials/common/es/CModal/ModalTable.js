import { __assign, __read, __rest, __spreadArray } from "tslib";
import { isFunction } from 'lodash-es';
import React, { useMemo, useRef } from 'react';
import CTable from '../CTable';
import { createStaticMethods } from '../_factory/maskableComponent';
import BaseCModal from './Base';
import { useMergeProps } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';
var DefaultScrollY = 360;
var ModalTableComponent = React.forwardRef(function (props, ref) {
    var _a;
    var _b = useCConfigContext().cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CModal.Table"], CModalTable = _d === void 0 ? {} : _d;
    var _e = useMergeProps(props, {}, CModalTable), tableProps = _e.tableProps, tableConfig = _e.tableConfig, children = _e.children, onOk = _e.onOk, restProps = __rest(_e, ["tableProps", "tableConfig", "children", "onOk"]);
    var tableRef = useRef(null);
    var config = (_a = tableProps === null || tableProps === void 0 ? void 0 : tableProps.config) !== null && _a !== void 0 ? _a : tableConfig;
    var mergedArcoTableProps = useMemo(function () {
        var _a;
        return isFunction(config.arcoTableProps)
            ? function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var arcoTableProps = config.arcoTableProps.apply(config, __spreadArray([], __read(args), false));
                return __assign(__assign({}, arcoTableProps), { scroll: __assign({ y: DefaultScrollY }, arcoTableProps.scroll) });
            }
            : __assign(__assign({}, config.arcoTableProps), { scroll: __assign({ y: DefaultScrollY }, (_a = config.arcoTableProps) === null || _a === void 0 ? void 0 : _a.scroll) });
    }, [config.arcoTableProps]);
    return (React.createElement(BaseCModal, __assign({}, restProps, { onOk: function (e) { return onOk === null || onOk === void 0 ? void 0 : onOk(tableRef.current, e); }, ref: ref }),
        React.createElement(CTable, __assign({ ref: tableRef }, tableProps, { config: __assign(__assign({}, config), { arcoTableProps: mergedArcoTableProps }) })),
        children));
});
ModalTableComponent.displayName = 'TableModal';
var TypedModalTableComponent = ModalTableComponent;
var _a = createStaticMethods(TypedModalTableComponent), open = _a.open, restStatics = __rest(_a, ["open"]);
var ModalTable = Object.assign(TypedModalTableComponent, restStatics, {
    open: function (props) { return open(props); },
});
export default ModalTable;
//# sourceMappingURL=ModalTable.js.map