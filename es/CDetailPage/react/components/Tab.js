import React, { createContext } from 'react';
export var TabContext = createContext({});
export var TabProvider = function (props) {
    return React.createElement(TabContext.Provider, { value: props.tab }, props.children);
};
//# sourceMappingURL=Tab.js.map