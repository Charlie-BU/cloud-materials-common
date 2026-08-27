"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("@formily/react");
var CCheckbox_1 = tslib_1.__importDefault(require("../../../../CCheckbox"));
var CCheckbox = (0, react_1.connect)(CCheckbox_1.default.Group, (0, react_1.mapProps)(function (props, field) {
    if (!field)
        return props;
    return {
        options: (props === null || props === void 0 ? void 0 : props.options) || field.dataSource,
        value: field.value,
    };
}));
exports.default = CCheckbox;
//# sourceMappingURL=index.js.map