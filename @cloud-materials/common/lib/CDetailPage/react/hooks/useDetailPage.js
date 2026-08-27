"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetailPage = void 0;
var react_1 = require("react");
var components_1 = require("../components");
/**
 * 获取DetailPage对象
 * @returns
 */
var useDetailPage = function () {
    return (0, react_1.useContext)(components_1.DetailPageContext);
};
exports.useDetailPage = useDetailPage;
//# sourceMappingURL=useDetailPage.js.map