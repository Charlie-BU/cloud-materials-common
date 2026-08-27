"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importStar(require("react"));
var CTable_1 = tslib_1.__importDefault(require("../CTable"));
var maskableComponent_1 = require("../_factory/maskableComponent");
var Base_1 = tslib_1.__importDefault(require("./Base"));
var hooks_1 = require("../hooks");
var CConfigProvider_1 = require("../CConfigProvider");
var DefaultScrollY = 360;
var ModalTableComponent = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)().cComponentConfig, _c = _b === void 0 ? {} : _b, _d = _c["CModal.Table"], CModalTable = _d === void 0 ? {} : _d;
    var _e = (0, hooks_1.useMergeProps)(props, {}, CModalTable), tableProps = _e.tableProps, tableConfig = _e.tableConfig, children = _e.children, onOk = _e.onOk, restProps = tslib_1.__rest(_e, ["tableProps", "tableConfig", "children", "onOk"]);
    var tableRef = (0, react_1.useRef)(null);
    var config = (_a = tableProps === null || tableProps === void 0 ? void 0 : tableProps.config) !== null && _a !== void 0 ? _a : tableConfig;
    var mergedArcoTableProps = (0, react_1.useMemo)(function () {
        var _a;
        return (0, lodash_es_1.isFunction)(config.arcoTableProps)
            ? function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var arcoTableProps = config.arcoTableProps.apply(config, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                return tslib_1.__assign(tslib_1.__assign({}, arcoTableProps), { scroll: tslib_1.__assign({ y: DefaultScrollY }, arcoTableProps.scroll) });
            }
            : tslib_1.__assign(tslib_1.__assign({}, config.arcoTableProps), { scroll: tslib_1.__assign({ y: DefaultScrollY }, (_a = config.arcoTableProps) === null || _a === void 0 ? void 0 : _a.scroll) });
    }, [config.arcoTableProps]);
    return (react_1.default.createElement(Base_1.default, tslib_1.__assign({}, restProps, { onOk: function (e) { return onOk === null || onOk === void 0 ? void 0 : onOk(tableRef.current, e); }, ref: ref }),
        react_1.default.createElement(CTable_1.default, tslib_1.__assign({ ref: tableRef }, tableProps, { config: tslib_1.__assign(tslib_1.__assign({}, config), { arcoTableProps: mergedArcoTableProps }) })),
        children));
});
ModalTableComponent.displayName = 'TableModal';
var TypedModalTableComponent = ModalTableComponent;
var _a = (0, maskableComponent_1.createStaticMethods)(TypedModalTableComponent), open = _a.open, restStatics = tslib_1.__rest(_a, ["open"]);
var ModalTable = Object.assign(TypedModalTableComponent, restStatics, {
    open: function (props) { return open(props); },
});
exports.default = ModalTable;
//# sourceMappingURL=ModalTable.js.map