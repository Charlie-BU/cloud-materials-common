"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var BaseButton_1 = require("../BaseButton");
var icon_1 = require("@arco-design/web-react/icon");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var testId_1 = require("../../../../testId");
var UndoButton = function (props) {
    var _a = props.icon, icon = _a === void 0 ? react_1.default.createElement(icon_1.IconClose, null) : _a, _text = props.text, _b = props.type, type = _b === void 0 ? 'LastStep' : _b, restProps = tslib_1.__rest(props, ["icon", "text", "type"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var text = _text || locale.CTableEditor.undo;
    var handleClick = function (tableEditor) {
        tableEditor.undo({ type: type });
    };
    return (react_1.default.createElement(BaseButton_1.BaseButton, tslib_1.__assign({ icon: icon, text: text, disabled: function (tableEditor) {
            if (type === 'AllSteps') {
                return !tableEditor.hasChanged;
            }
            return !tableEditor.hasActionHistory;
        } }, restProps, { onClick: handleClick, testId: testId_1.testId.undoButton })));
};
exports.UndoButton = UndoButton;
//# sourceMappingURL=index.js.map