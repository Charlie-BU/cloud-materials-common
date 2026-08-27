import React from 'react';
import CLoadingV2 from '../../../../CLoadingV2';
export var InfoSectionItemLoading = function (props) {
    var loading = props.loading, _a = props.error, error = _a === void 0 ? true : _a, onReload = props.onReload;
    return (React.createElement(CLoadingV2, { type: 'inline', hasError: !loading && error, loading: loading, cSpinProps: {
            size: 15,
        }, onReload: onReload }));
};
//# sourceMappingURL=index.js.map