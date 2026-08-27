import { define, observable } from '@formily/reactive';
import { InfoSection } from './InfoSection';
var InfoSectionList = /** @class */ (function () {
    function InfoSectionList(options) {
        /** section数组对象 */
        this.sections = [];
        this.makeObservable();
        this.options = options;
        this.initDataFromConfig();
    }
    InfoSectionList.prototype.makeObservable = function () {
        define(this, {
            options: observable,
            sections: observable,
        });
    };
    InfoSectionList.prototype.initDataFromConfig = function () {
        var _this = this;
        var _a;
        (((_a = this.options) === null || _a === void 0 ? void 0 : _a.listData) || []).forEach(function (section) {
            _this.sections.push(new InfoSection(section, _this));
        });
    };
    return InfoSectionList;
}());
export { InfoSectionList };
//# sourceMappingURL=InfoSectionList.js.map