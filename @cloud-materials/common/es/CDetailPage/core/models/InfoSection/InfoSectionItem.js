import { define, observable } from '@formily/reactive';
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
        define(this, {
            options: observable,
            infoSectionModel: observable,
        });
    };
    return InfoSectionItem;
}());
export { InfoSectionItem };
//# sourceMappingURL=InfoSectionItem.js.map