import { __assign } from "tslib";
import { useRequest } from 'ahooks';
import React, { useImperativeHandle } from 'react';
import CLoadingV2 from '../CLoadingV2';
import { isNil } from 'lodash-es';
var CAsyncContent = React.forwardRef(function (_a, ref) {
    var fetcher = _a.fetcher, children = _a.children, requestOptions = _a.requestOptions, cLoadingProps = _a.cLoadingProps, placeholder = _a.placeholder;
    var request = useRequest(fetcher, requestOptions);
    var loading = request.loading, data = request.data, error = request.error, refresh = request.refresh;
    useImperativeHandle(ref, function () { return request; });
    return (React.createElement(CLoadingV2, __assign({ isBlock: true, type: "block", hasError: Boolean(error), loading: loading, onReload: refresh }, cLoadingProps), isNil(data) ? placeholder !== null && placeholder !== void 0 ? placeholder : React.createElement("div", { style: { minHeight: 136 } }) : children(data, request)));
});
CAsyncContent.displayName = 'CAsyncContent';
export default CAsyncContent;
//# sourceMappingURL=index.js.map