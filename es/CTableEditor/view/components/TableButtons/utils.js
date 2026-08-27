import { isFunction } from 'lodash-es';
export var runCallable = function (props, tableEditor) {
    if (isFunction(props))
        return props(tableEditor);
    return props;
};
//# sourceMappingURL=utils.js.map