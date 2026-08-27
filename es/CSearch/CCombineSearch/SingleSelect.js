import { __assign, __rest } from "tslib";
import React, { useEffect } from 'react';
import { Select } from '@arco-design/web-react';
import { useCConfigContext } from '../../CConfigProvider';
var SingleSelect = function (props) {
    var popSelectRef = props.popSelectRef, restProps = __rest(props, ["popSelectRef"]);
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var selectCls = getCPrefixCls('search-combine-select');
    useEffect(function () {
        return function () {
            if (popSelectRef === null || popSelectRef === void 0 ? void 0 : popSelectRef.current) {
                popSelectRef.current = null;
            }
        };
    }, []);
    return (React.createElement(Select, __assign({}, restProps, { ref: popSelectRef, popupVisible: true, getPopupContainer: function (node) { return node; }, triggerProps: {
            popupStyle: { boxShadow: 'none', border: 'none' },
            style: { position: 'static' },
        }, defaultActiveFirstOption: false, triggerElement: React.createElement("div", { className: selectCls }) })));
};
export default SingleSelect;
//# sourceMappingURL=SingleSelect.js.map