"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var react_1 = tslib_1.__importStar(require("react"));
var CLoadingV2_1 = tslib_1.__importDefault(require("../CLoadingV2"));
var lodash_es_1 = require("lodash-es");
var CAsyncContent = react_1.default.forwardRef(function (_a, ref) {
    var fetcher = _a.fetcher, children = _a.children, requestOptions = _a.requestOptions, cLoadingProps = _a.cLoadingProps, placeholder = _a.placeholder;
    var request = (0, ahooks_1.useRequest)(fetcher, requestOptions);
    var loading = request.loading, data = request.data, error = request.error, refresh = request.refresh;
    (0, react_1.useImperativeHandle)(ref, function () { return request; });
    return (react_1.default.createElement(CLoadingV2_1.default, tslib_1.__assign({ isBlock: true, type: "block", hasError: Boolean(error), loading: loading, onReload: refresh }, cLoadingProps), (0, lodash_es_1.isNil)(data) ? placeholder !== null && placeholder !== void 0 ? placeholder : react_1.default.createElement("div", { style: { minHeight: 136 } }) : children(data, request)));
});
CAsyncContent.displayName = 'CAsyncContent';
exports.default = CAsyncContent;
//# sourceMappingURL=index.js.map