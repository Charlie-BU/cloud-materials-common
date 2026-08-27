"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var SearchInput = function (props) {
    var _a = tslib_1.__read((0, react_1.useState)(null), 2), popContent = _a[0], setPopContent = _a[1];
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var componentCls = getCPrefixCls('search-component-input-popover');
    var ref = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(function () {
        if (props.defaultValue || props.value) {
            handleResize(props.defaultValue || props.value);
        }
    }, []);
    return (react_1.default.createElement(web_react_1.Popover, { content: popContent, position: "bottom", className: componentCls },
        react_1.default.createElement(web_react_1.Input, tslib_1.__assign({}, props, { ref: ref, onChange: function (v, e) {
                var _a;
                handleResize(v);
                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v, e);
            } }))));
};
exports.default = SearchInput;
//# sourceMappingURL=SearchInput.js.map