"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSection = void 0;
var tslib_1 = require("tslib");
var reactive_1 = require("@formily/reactive");
var InfoSectionItem_1 = require("./InfoSectionItem");
var InfoSection = /** @class */ (function () {
    function InfoSection(options, infoSectionListModel) {
        this.makeObservable();
        this.options = tslib_1.__assign({ needAutoSplit: true, hidden: false, visible: true }, options);
        this.infoSectionListModel = infoSectionListModel;
        this.initInfoItemList();
    }
    InfoSection.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            options: reactive_1.observable,
            infoItemList: reactive_1.observable,
            infoSectionListModel: reactive_1.observable,
        });
    };
    /**
     * 初始化Section每一项
     */
    InfoSection.prototype.initInfoItemList = function () {
        var _this = this;
        var _a, _b;
        this.infoItemList = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.infoItemList) === null || _b === void 0 ? void 0 : _b.map(function (item) {
            return new InfoSectionItem_1.InfoSectionItem(item, _this, _this.infoSectionListModel);
        });
    };
    return InfoSection;
}());
exports.InfoSection = InfoSection;
//# sourceMappingURL=InfoSection.js.map