"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSectionItemLoading = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../../CLoadingV2"));
var InfoSectionItemLoading = function (props) {
    var loading = props.loading, _a = props.error, error = _a === void 0 ? true : _a, onReload = props.onReload;
    return (react_1.default.createElement(CLoadingV2_1.default, { type: 'inline', hasError: !loading && error, loading: loading, cSpinProps: {
            size: 15,
        }, onReload: onReload }));
};
exports.InfoSectionItemLoading = InfoSectionItemLoading;
//# sourceMappingURL=index.js.map