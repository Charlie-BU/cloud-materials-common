import React, { createContext } from 'react';
export var TableEditorContext = createContext(null);
export var TableEditorProvider = function (props) {
    return React.createElement(TableEditorContext.Provider, { value: props.tableEditor }, props.children);
};
//# sourceMappingURL=index.js.map