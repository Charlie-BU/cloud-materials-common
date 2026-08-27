"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeferred = void 0;
var createDeferred = function () {
    var resolve = function () { };
    var reject = resolve;
    var promise = new Promise(function (rs, rj) {
        resolve = rs;
        reject = rj;
    });
    return [promise, resolve, reject];
};
exports.createDeferred = createDeferred;
//# sourceMappingURL=createDeferred.js.map