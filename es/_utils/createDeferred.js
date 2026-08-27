export var createDeferred = function () {
    var resolve = function () { };
    var reject = resolve;
    var promise = new Promise(function (rs, rj) {
        resolve = rs;
        reject = rj;
    });
    return [promise, resolve, reject];
};
//# sourceMappingURL=createDeferred.js.map