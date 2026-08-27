import { __assign } from "tslib";
import { define, observable } from '@formily/reactive';
import { InfoSectionItem } from './InfoSectionItem';
var InfoSection = /** @class */ (function () {
    function InfoSection(options, infoSectionListModel) {
        this.makeObservable();
        this.options = __assign({ needAutoSplit: true, hidden: false, visible: true }, options);
        this.infoSectionListModel = infoSectionListModel;
        this.initInfoItemList();
    }
    InfoSection.prototype.makeObservable = function () {
        define(this, {
            options: observable,
            infoItemList: observable,
            infoSectionListModel: observable,
        });
    };
    /**
     * 初始化Section每一项
     */
    InfoSection.prototype.initInfoItemList = function () {
        var _this = this;
        var _a, _b;
        this.infoItemList = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.infoItemList) === null || _b === void 0 ? void 0 : _b.map(function (item) {
            return new InfoSectionItem(item, _this, _this.infoSectionListModel);
        });
    };
    return InfoSection;
}());
export { InfoSection };
//# sourceMappingURL=InfoSection.js.map