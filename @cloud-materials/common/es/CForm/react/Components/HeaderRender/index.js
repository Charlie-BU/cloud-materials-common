import { __makeTemplateObject } from "tslib";
import React, { Fragment } from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has, isNil } from 'lodash-es';
import { IconLeft } from '@arco-design/iconbox-react-ve-o-design';
import { openSecondCheckModal } from '../SecondCheck';
import { useCConfigContext } from '../../../../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('cform-header-render');
var HeaderRender = function (_a) {
    var isStep = _a.isStep, formStep = _a.formStep, callHeader = _a.callHeader, unMountCFormSecondCheck = _a.unMountCFormSecondCheck;
    var locale = useCConfigContext().locale;
    var header = typeof callHeader === 'function' ? callHeader(isStep ? formStep : formStep.form) : callHeader;
    var renderHeaderItems = function (items) {
        var _a;
        return (_a = items === null || items === void 0 ? void 0 : items.map(function (item, index) {
            if (typeof item === 'function') {
                var itemNode = item(formStep);
                return !isNil(itemNode) ? React.createElement(Fragment, { key: index }, itemNode) : null;
            }
            if (has(item, 'title')) {
                var _a = item, title = _a.title, onBack_1 = _a.onBack;
                return (React.createElement("div", { key: index, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["item-title-container"], ["item-title-container"]))) },
                    React.createElement(IconLeft, { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["button"], ["button"]))), onClick: function () {
                            openSecondCheckModal({
                                onOk: onBack_1,
                                form: formStep.form,
                                unMountCFormSecondCheck: unMountCFormSecondCheck,
                                locale: locale,
                            });
                        } }),
                    title && React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["title"], ["title"]))) }, title)));
            }
        })) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
            return !isNil(item);
        });
    };
    var headerNodes = renderHeaderItems(header);
    return (headerNodes === null || headerNodes === void 0 ? void 0 : headerNodes.length) ? React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""]))) }, renderHeaderItems(header)) : null;
};
export default HeaderRender;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map