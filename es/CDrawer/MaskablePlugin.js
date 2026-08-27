import { __assign } from "tslib";
import React from 'react';
var MaskablePlugin = /** @class */ (function () {
    function MaskablePlugin() {
        this.extraHeaderRef = React.createRef();
    }
    MaskablePlugin.prototype.getExtraMaskableProps = function (oldProps) {
        return __assign(__assign({}, oldProps), { extraHeader: (React.createElement(React.Fragment, null,
                oldProps.extraHeader,
                React.createElement("div", { ref: this.extraHeaderRef }))) });
    };
    MaskablePlugin.prototype.getFormProps = function (oldFormProps) {
        var _this = this;
        var decorator = oldFormProps.decorator;
        if (decorator === null || decorator === void 0 ? void 0 : decorator[1]) {
            decorator[1] = __assign(__assign({}, decorator[1]), { headerContainer: function () { var _a, _b; return (_b = (_a = _this.extraHeaderRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null; } });
        }
        return oldFormProps;
    };
    return MaskablePlugin;
}());
export default MaskablePlugin;
//# sourceMappingURL=MaskablePlugin.js.map