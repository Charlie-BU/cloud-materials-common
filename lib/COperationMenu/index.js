"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var hooks_1 = require("./hooks");
var MenuList_1 = tslib_1.__importDefault(require("./Component/MenuList"));
var OperationWrapper_1 = tslib_1.__importDefault(require("./Component/OperationWrapper"));
var CConfigProvider_1 = require("../CConfigProvider");
var CButton_1 = tslib_1.__importDefault(require("./Component/CButton"));
var dataCy = tslib_1.__importStar(require("./dataCy"));
var COperationMenu = function (props) {
    var style = props.style, className = props.className, asyncOperations = props.asyncOperations, _a = props.spaceSize, spaceSize = _a === void 0 ? 12 : _a, defaultButtonType = props.defaultButtonType, arcoButtonProps = props.arcoButtonProps, menuButtonProps = props.menuButtonProps, _b = props.maxMenuOperationNum, maxMenuOperationNum = _b === void 0 ? 8 : _b, renderDropdownButton = props.renderDropdownButton;
    var _c = tslib_1.__read((0, hooks_1.useCOperationMenu)(props), 2), state = _c[0], controls = _c[1];
    var outsideOperation = state.outsideOperation, menuOperation = state.menuOperation, menuStatus = state.menuStatus, currentPop = state.currentPop, dropdownProps = state.dropdownProps;
    var setDropDownVisible = controls.setDropDownVisible, dropdownBtnClick = controls.dropdownBtnClick, popVisibleChange = controls.popVisibleChange, getAsyncOperations = controls.getAsyncOperations;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('operation-menu');
    var showMenuBtn = (menuOperation && menuOperation.length > 0) || asyncOperations;
    var menuBtnType = (menuButtonProps === null || menuButtonProps === void 0 ? void 0 : menuButtonProps.type) || (arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.type) || defaultButtonType;
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-cy": dataCy.container },
        react_1.default.createElement(web_react_1.Space, { size: spaceSize }, outsideOperation === null || outsideOperation === void 0 ? void 0 :
            outsideOperation.map(function (o, i) {
                var _a, _b, _c;
                var type = ((_a = o.arcoButtonProps) === null || _a === void 0 ? void 0 : _a.type) || (arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.type) || defaultButtonType;
                return (react_1.default.createElement(OperationWrapper_1.default, { key: o.key, index: "".concat(i), operation: o, currentPop: currentPop, popVisibleChange: popVisibleChange }, (o === null || o === void 0 ? void 0 : o.render) ? (o === null || o === void 0 ? void 0 : o.render()) : (react_1.default.createElement(CButton_1.default, tslib_1.__assign({}, arcoButtonProps, { onClick: o === null || o === void 0 ? void 0 : o.onClick, disabled: o === null || o === void 0 ? void 0 : o.disabled }, o.arcoButtonProps, { type: type, className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["opt-btn"], ["opt-btn"]))), (_b = o.arcoButtonProps) === null || _b === void 0 ? void 0 : _b.className, arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.className), "data-testid": dataCy.btnItemId, "data-cy": dataCy.getButtonItemCy(o.index, o.name), "data-cy-idx": dataCy.getButtonItemIndexCy("".concat(i)) }), ((_c = o.arcoButtonProps) === null || _c === void 0 ? void 0 : _c.children) || (o === null || o === void 0 ? void 0 : o.name)))));
            }),
            showMenuBtn && (react_1.default.createElement(web_react_1.Dropdown, tslib_1.__assign({ droplist: react_1.default.createElement(web_react_1.Menu, { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["dropdown-menu"], ["dropdown-menu"]))), "data-cy": dataCy.dropContainer, "data-testid": dataCy.menuContainerId, triggerProps: {
                        className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["dropdown-popup-menu"], ["dropdown-popup-menu"]))),
                        popupAlign: {
                            right: 6,
                            left: 6,
                            bottom: 6,
                            top: 6,
                        },
                    } },
                    react_1.default.createElement(MenuList_1.default, { menuOperation: menuOperation || [], menuStatus: menuStatus, getAsyncOperations: getAsyncOperations, currentPop: currentPop, popVisibleChange: popVisibleChange, setDropDownVisible: setDropDownVisible, maxMenuOperationNum: maxMenuOperationNum })), trigger: "click", position: "br" }, dropdownProps), renderDropdownButton ? (renderDropdownButton(dropdownBtnClick)) : (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ icon: react_1.default.createElement(icon_1.IconMore, null), type: menuBtnType, onClick: dropdownBtnClick }, arcoButtonProps, menuButtonProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["dropdown-button"], ["dropdown-button"]))), arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.className, menuButtonProps === null || menuButtonProps === void 0 ? void 0 : menuButtonProps.className), "data-cy": dataCy.dropButton, "data-testid": dataCy.dropBtnId }))))))));
};
COperationMenu.displayName = 'COperationMenu';
exports.default = COperationMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map