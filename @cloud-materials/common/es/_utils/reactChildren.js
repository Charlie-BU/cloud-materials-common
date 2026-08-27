import React from 'react';
export var getChildrenString = function (node) {
    var getTextInNode = function (_node) {
        if (React.isValidElement(_node)) {
            if (_node.props.children instanceof Object) {
                return getTextInNode(_node.props.children);
            }
            return _node.props.children;
        }
        return String(_node);
    };
    return getTextInNode(node);
};
//# sourceMappingURL=reactChildren.js.map