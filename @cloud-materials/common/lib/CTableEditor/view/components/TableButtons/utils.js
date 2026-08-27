"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCallable = void 0;
var lodash_es_1 = require("lodash-es");
var runCallable = function (props, tableEditor) {
    if ((0, lodash_es_1.isFunction)(props))
        return props(tableEditor);
    return props;
};
exports.runCallable = runCallable;
//# sourceMappingURL=utils.js.map