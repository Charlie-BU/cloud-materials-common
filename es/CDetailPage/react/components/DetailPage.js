import React, { createContext } from 'react';
export var DetailPageContext = createContext({});
export var DetailPageProvider = function (props) {
    return React.createElement(DetailPageContext.Provider, { value: props === null || props === void 0 ? void 0 : props.detailPage }, props.children);
};
//# sourceMappingURL=DetailPage.js.map