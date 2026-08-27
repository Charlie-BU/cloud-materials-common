"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../../CConfigProvider");
var SingleSelect = function (props) {
    var popSelectRef = props.popSelectRef, restProps = tslib_1.__rest(props, ["popSelectRef"]);
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var selectCls = getCPrefixCls('search-combine-select');
    (0, react_1.useEffect)(function () {
        return function () {
            if (popSelectRef === null || popSelectRef === void 0 ? void 0 : popSelectRef.current) {
                popSelectRef.current = null;
            }
        };
    }, []);
    return (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({}, restProps, { ref: popSelectRef, popupVisible: true, getPopupContainer: function (node) { return node; }, triggerProps: {
            popupStyle: { boxShadow: 'none', border: 'none' },
            style: { position: 'static' },
        }, defaultActiveFirstOption: false, triggerElement: react_1.default.createElement("div", { className: selectCls }) })));
};
exports.default = SingleSelect;
//# sourceMappingURL=SingleSelect.js.map