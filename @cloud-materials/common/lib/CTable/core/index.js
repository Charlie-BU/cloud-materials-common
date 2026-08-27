"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = void 0;
var tslib_1 = require("tslib");
var models_1 = require("./models");
tslib_1.__exportStar(require("./models"), exports);
tslib_1.__exportStar(require("./plugin"), exports);
tslib_1.__exportStar(require("./effects"), exports);
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./shared"), exports);
var createTable = function (tableConfig) {
    return new models_1.Table(tableConfig);
};
exports.createTable = createTable;
//# sourceMappingURL=index.js.map