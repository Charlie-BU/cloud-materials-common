"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var BaseButton_1 = require("../BaseButton");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var testId_1 = require("../../../../testId");
var SwitchButton = function (props) {
    var onSwitch = props.onSwitch, _a = props.icon, icon = _a === void 0 ? null : _a, _text = props.text, restProps = tslib_1.__rest(props, ["onSwitch", "icon", "text"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var text = _text || locale.CTableEditor.switch;
    var handleClick = function (tableEditor) {
        var nextState = tableEditor.switchEditable();
        onSwitch === null || onSwitch === void 0 ? void 0 : onSwitch(nextState, tableEditor);
    };
    return react_1.default.createElement(BaseButton_1.BaseButton, tslib_1.__assign({ icon: icon, text: text }, restProps, { onClick: handleClick, testId: testId_1.testId.switchButton }));
};
exports.SwitchButton = SwitchButton;
//# sourceMappingURL=index.js.map