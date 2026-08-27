import { __assign, __rest } from "tslib";
import { Drawer as ArcoDrawer, Button } from '@arco-design/web-react';
import { isFunction } from 'lodash-es';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
var Drawer = function (_a, ref) {
    var footer = _a.footer, onCancel = _a.onCancel, onOk = _a.onOk, okText = _a.okText, cancelText = _a.cancelText, okButtonProps = _a.okButtonProps, cancelButtonProps = _a.cancelButtonProps, confirmLoading = _a.confirmLoading, drawerProps = __rest(_a, ["footer", "onCancel", "onOk", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "confirmLoading"]);
    var locale = useCConfigContext().locale;
    var renderFooter = function () {
        if (footer === null)
            return footer;
        var cancelButtonNode = (React.createElement(Button, __assign({ onClick: onCancel }, cancelButtonProps), cancelText || locale.Modal.cancelText));
        var okButtonNode = (React.createElement(Button, __assign({ loading: confirmLoading, onClick: onOk, type: "primary" }, okButtonProps), okText || locale.Modal.okText));
        var footerContent = isFunction(footer)
            ? footer(cancelButtonNode, okButtonNode)
            : footer !== null && footer !== void 0 ? footer : (React.createElement(React.Fragment, null,
                cancelButtonNode,
                okButtonNode));
        return React.createElement(React.Fragment, null, footerContent);
    };
    return React.createElement(ArcoDrawer, __assign({}, drawerProps, { footer: footer === null ? null : renderFooter(), onCancel: onCancel, ref: ref }));
};
var DrawerComponent = React.forwardRef(Drawer);
DrawerComponent.displayName = 'CMDrawer';
export default DrawerComponent;
//# sourceMappingURL=OriginDrawer.js.map