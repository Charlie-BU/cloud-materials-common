"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoSectionItem = void 0;
var reactive_1 = require("@formily/reactive");
var InfoSectionItem = /** @class */ (function () {
    /**
     *
     * @param infoSection
     * @param options
     */
    function InfoSectionItem(options, infoSection, infoSectionList) {
        this.makeObservable();
        this.options = options;
        this.infoSectionListModel = infoSectionList;
        this.infoSectionModel = infoSection;
    }
    InfoSectionItem.prototype.makeObservable = function () {
        (0, reactive_1.define)(this, {
            options: reactive_1.observable,
            infoSectionModel: reactive_1.observable,
        });
    };
    return InfoSectionItem;
}());
exports.InfoSectionItem = InfoSectionItem;
//# sourceMappingURL=InfoSectionItem.js.map