"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateInnerBasicInfoSectionList = void 0;
var react_1 = require("react");
var core_1 = require("../../core");
var useCreateInnerBasicInfoSectionList = function (config) {
    var infoSectionList = (0, react_1.useMemo)(function () { return new core_1.InfoSectionList(config); }, []);
    return infoSectionList;
};
exports.useCreateInnerBasicInfoSectionList = useCreateInnerBasicInfoSectionList;
//# sourceMappingURL=useCreateInnerBasicInfoSection.js.map