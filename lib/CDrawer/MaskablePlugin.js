"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var MaskablePlugin = /** @class */ (function () {
    function MaskablePlugin() {
        this.extraHeaderRef = react_1.default.createRef();
    }
    MaskablePlugin.prototype.getExtraMaskableProps = function (oldProps) {
        return tslib_1.__assign(tslib_1.__assign({}, oldProps), { extraHeader: (react_1.default.createElement(react_1.default.Fragment, null,
                oldProps.extraHeader,
                react_1.default.createElement("div", { ref: this.extraHeaderRef }))) });
    };
    MaskablePlugin.prototype.getFormProps = function (oldFormProps) {
        var _this = this;
        var decorator = oldFormProps.decorator;
        if (decorator === null || decorator === void 0 ? void 0 : decorator[1]) {
            decorator[1] = tslib_1.__assign(tslib_1.__assign({}, decorator[1]), { headerContainer: function () { var _a, _b; return (_b = (_a = _this.extraHeaderRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null; } });
        }
        return oldFormProps;
    };
    return MaskablePlugin;
}());
exports.default = MaskablePlugin;
//# sourceMappingURL=MaskablePlugin.js.map