import { __assign, __makeTemplateObject, __rest } from "tslib";
import { IconMessageNotificationService, IconWrappedGift } from '@arco-design/iconbox-react-ve-o-design';
import { Button, Popover } from '@arco-design/web-react';
import classNames from 'classnames';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';
export var Feedback = function (_a) {
    var children = _a.children, circle = _a.circle, popoverProps = _a.popoverProps, popoverContent = _a.popoverContent, _b = _a.type, type = _b === void 0 ? 'normal' : _b, rest = __rest(_a, ["children", "circle", "popoverProps", "popoverContent", "type"]);
    var _c = useCConfigContext(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var clsPrefix = useCssPrefix('sidebar-feedback');
    var text = type === 'normal' ? locale.CSidebar.feedbackNormal : locale.CSidebar.feedbackPrize;
    return (React.createElement("div", { className: classNames(circle && clsPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["box"], ["box"])))) },
        React.createElement(Popover, __assign({ position: "right" }, popoverProps, { triggerProps: __assign({ autoFitPosition: false }, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.triggerProps), content: popoverContent !== null && popoverContent !== void 0 ? popoverContent : text, getPopupContainer: function (node) { return node.parentElement; }, style: __assign({ whiteSpace: 'nowrap' }, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.style), disabled: !circle }),
            React.createElement(Button, __assign({ icon: type === 'normal' ? React.createElement(IconMessageNotificationService, { useCurrentColor: true }) : React.createElement(IconWrappedGift, { useCurrentColor: true }) }, rest, { size: circle ? 'default' : 'mini', shape: circle ? 'circle' : 'round', className: classNames(clsPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), circle && clsPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["circle"], ["circle"]))), rest.className) }), circle ? void 0 : children !== null && children !== void 0 ? children : text))));
};
Feedback._Feedback = true;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Feedback.js.map