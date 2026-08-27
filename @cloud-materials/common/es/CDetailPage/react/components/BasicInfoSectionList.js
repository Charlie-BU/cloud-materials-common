import React, { createContext } from 'react';
export var BasicInfoSectionContext = createContext({});
export var BasicInfoSectionListProvider = function (props) {
    return (React.createElement(BasicInfoSectionContext.Provider, { value: props === null || props === void 0 ? void 0 : props.infoSectionList }, props.children));
};
//# sourceMappingURL=BasicInfoSectionList.js.map