export var toLocaleString = function (val) {
    var _a;
    // 设置 maximumFractionDigits，否则只会保留 3 位小数
    return (_a = val === null || val === void 0 ? void 0 : val.toLocaleString) === null || _a === void 0 ? void 0 : _a.call(val, undefined, { maximumFractionDigits: 20 });
};
//# sourceMappingURL=number.js.map