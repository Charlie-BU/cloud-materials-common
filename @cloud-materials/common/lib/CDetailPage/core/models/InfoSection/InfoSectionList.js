"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSectionList = void 0;
var reactive_1 = require("@formily/reactive");
var InfoSection_1 = require("./InfoSection");
var InfoSectionList = /** @class */ (function () {
    function InfoSectionList(options) {
        /** section数组对象 */
        this.sections = [];
        this.makeObservable();
        this.options = options;
        this.initDataFromConfig();
    }
    InfoSectionList.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            options: reactive_1.observable,
            sections: reactive_1.observable,
        });
    };
    InfoSectionList.prototype.initDataFromConfig = function () {
        var _this = this;
        var _a;
        (((_a = this.options) === null || _a === void 0 ? void 0 : _a.listData) || []).forEach(function (section) {
            _this.sections.push(new InfoSection_1.InfoSection(section, _this));
        });
    };
    return InfoSectionList;
}());
exports.InfoSectionList = InfoSectionList;
//# sourceMappingURL=InfoSectionList.js.map