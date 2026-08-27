import { __assign, __makeTemplateObject, __read } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { Button, Dropdown, Space, Menu } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { useCOperationMenu } from './hooks';
import MenuList from './Component/MenuList';
import OperationWrapper from './Component/OperationWrapper';
import { useCConfigContext } from '../CConfigProvider';
import CButton from './Component/CButton';
import * as dataCy from './dataCy';
var COperationMenu = function (props) {
    var style = props.style, className = props.className, asyncOperations = props.asyncOperations, _a = props.spaceSize, spaceSize = _a === void 0 ? 12 : _a, defaultButtonType = props.defaultButtonType, arcoButtonProps = props.arcoButtonProps, menuButtonProps = props.menuButtonProps, _b = props.maxMenuOperationNum, maxMenuOperationNum = _b === void 0 ? 8 : _b, renderDropdownButton = props.renderDropdownButton;
    var _c = __read(useCOperationMenu(props), 2), state = _c[0], controls = _c[1];
    var outsideOperation = state.outsideOperation, menuOperation = state.menuOperation, menuStatus = state.menuStatus, currentPop = state.currentPop, dropdownProps = state.dropdownProps;
    var setDropDownVisible = controls.setDropDownVisible, dropdownBtnClick = controls.dropdownBtnClick, popVisibleChange = controls.popVisibleChange, getAsyncOperations = controls.getAsyncOperations;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('operation-menu');
    var showMenuBtn = (menuOperation && menuOperation.length > 0) || asyncOperations;
    var menuBtnType = (menuButtonProps === null || menuButtonProps === void 0 ? void 0 : menuButtonProps.type) || (arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.type) || defaultButtonType;
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className), "data-cy": dataCy.container },
        React.createElement(Space, { size: spaceSize }, outsideOperation === null || outsideOperation === void 0 ? void 0 :
            outsideOperation.map(function (o, i) {
                var _a, _b, _c;
                var type = ((_a = o.arcoButtonProps) === null || _a === void 0 ? void 0 : _a.type) || (arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.type) || defaultButtonType;
                return (React.createElement(OperationWrapper, { key: o.key, index: "".concat(i), operation: o, currentPop: currentPop, popVisibleChange: popVisibleChange }, (o === null || o === void 0 ? void 0 : o.render) ? (o === null || o === void 0 ? void 0 : o.render()) : (React.createElement(CButton, __assign({}, arcoButtonProps, { onClick: o === null || o === void 0 ? void 0 : o.onClick, disabled: o === null || o === void 0 ? void 0 : o.disabled }, o.arcoButtonProps, { type: type, className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["opt-btn"], ["opt-btn"]))), (_b = o.arcoButtonProps) === null || _b === void 0 ? void 0 : _b.className, arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.className), "data-testid": dataCy.btnItemId, "data-cy": dataCy.getButtonItemCy(o.index, o.name), "data-cy-idx": dataCy.getButtonItemIndexCy("".concat(i)) }), ((_c = o.arcoButtonProps) === null || _c === void 0 ? void 0 : _c.children) || (o === null || o === void 0 ? void 0 : o.name)))));
            }),
            showMenuBtn && (React.createElement(Dropdown, __assign({ droplist: React.createElement(Menu, { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["dropdown-menu"], ["dropdown-menu"]))), "data-cy": dataCy.dropContainer, "data-testid": dataCy.menuContainerId, triggerProps: {
                        className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["dropdown-popup-menu"], ["dropdown-popup-menu"]))),
                        popupAlign: {
                            right: 6,
                            left: 6,
                            bottom: 6,
                            top: 6,
                        },
                    } },
                    React.createElement(MenuList, { menuOperation: menuOperation || [], menuStatus: menuStatus, getAsyncOperations: getAsyncOperations, currentPop: currentPop, popVisibleChange: popVisibleChange, setDropDownVisible: setDropDownVisible, maxMenuOperationNum: maxMenuOperationNum })), trigger: "click", position: "br" }, dropdownProps), renderDropdownButton ? (renderDropdownButton(dropdownBtnClick)) : (React.createElement(Button, __assign({ icon: React.createElement(IconMore, null), type: menuBtnType, onClick: dropdownBtnClick }, arcoButtonProps, menuButtonProps, { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["dropdown-button"], ["dropdown-button"]))), arcoButtonProps === null || arcoButtonProps === void 0 ? void 0 : arcoButtonProps.className, menuButtonProps === null || menuButtonProps === void 0 ? void 0 : menuButtonProps.className), "data-cy": dataCy.dropButton, "data-testid": dataCy.dropBtnId }))))))));
};
COperationMenu.displayName = 'COperationMenu';
export default COperationMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map