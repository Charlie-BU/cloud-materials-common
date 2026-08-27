import { __assign, __read } from "tslib";
import { Input, Popover } from '@arco-design/web-react';
import React, { useEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
var SearchInput = function (props) {
    var _a = __read(useState(null), 2), popContent = _a[0], setPopContent = _a[1];
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var componentCls = getCPrefixCls('search-component-input-popover');
    var ref = useRef(null);
    var handleResize = function (val) {
        if (ref.current) {
            var node_1 = ref.current.dom;
            var process_1 = function () {
                if (node_1.scrollWidth > node_1.offsetWidth) {
                    setPopContent(val !== null && val !== void 0 ? val : null);
                }
                else {
                    setPopContent(null);
                }
            };
            // 自适应宽度时，scrollWidth和offsetWidth的改变不在同一次event loop中
            if (props.autoWidth) {
                setTimeout(function () { return process_1(); }, 0);
            }
            else {
                process_1();
            }
        }
    };
    useEffect(function () {
        if (props.defaultValue || props.value) {
            handleResize(props.defaultValue || props.value);
        }
    }, []);
    return (React.createElement(Popover, { content: popContent, position: "bottom", className: componentCls },
        React.createElement(Input, __assign({}, props, { ref: ref, onChange: function (v, e) {
                var _a;
                handleResize(v);
                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v, e);
            } }))));
};
export default SearchInput;
//# sourceMappingURL=SearchInput.js.map