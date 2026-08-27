"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var Drawer = function (_a, ref) {
    var footer = _a.footer, onCancel = _a.onCancel, onOk = _a.onOk, okText = _a.okText, cancelText = _a.cancelText, okButtonProps = _a.okButtonProps, cancelButtonProps = _a.cancelButtonProps, confirmLoading = _a.confirmLoading, drawerProps = tslib_1.__rest(_a, ["footer", "onCancel", "onOk", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "confirmLoading"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var renderFooter = function () {
        if (footer === null)
            return footer;
        var cancelButtonNode = (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ onClick: onCancel }, cancelButtonProps), cancelText || locale.Modal.cancelText));
        var okButtonNode = (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ loading: confirmLoading, onClick: onOk, type: "primary" }, okButtonProps), okText || locale.Modal.okText));
        var footerContent = (0, lodash_es_1.isFunction)(footer)
            ? footer(cancelButtonNode, okButtonNode)
            : footer !== null && footer !== void 0 ? footer : (react_1.default.createElement(react_1.default.Fragment, null,
                cancelButtonNode,
                okButtonNode));
        return react_1.default.createElement(react_1.default.Fragment, null, footerContent);
    };
    return react_1.default.createElement(web_react_1.Drawer, tslib_1.__assign({}, drawerProps, { footer: footer === null ? null : renderFooter(), onCancel: onCancel, ref: ref }));
};
var DrawerComponent = react_1.default.forwardRef(Drawer);
DrawerComponent.displayName = 'CMDrawer';
exports.default = DrawerComponent;
//# sourceMappingURL=OriginDrawer.js.map