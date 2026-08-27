import { __read } from "tslib";
import { noop } from 'lodash-es';
import React, { useContext, useState } from 'react';
var MaskableContext = React.createContext({
    setOnOkGuardPool: noop,
    onOkGuardPool: [],
});
export var MaskableProvider = function (_a) {
    var children = _a.children;
    var _b = __read(useState([]), 2), onOkGuardPool = _b[0], setOnOkGuardPool = _b[1];
    return React.createElement(MaskableContext.Provider, { value: { onOkGuardPool: onOkGuardPool, setOnOkGuardPool: setOnOkGuardPool } }, children);
};
export var useMaskableContext = function () { return useContext(MaskableContext); };
//# sourceMappingURL=MaskableProvider.js.map