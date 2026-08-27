import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import CAddButton from '../../../../../CAddButton';
import { useCConfigContext } from '../../../../../CConfigProvider';
export var cssPrefix = classNamePrefixFactory('cform-array-base-addition');
var ArrayBaseAddition = function (props) {
    var _a, _b;
    var locale = useCConfigContext().locale;
    var _c = props.method, method = _c === void 0 ? 'push' : _c, defaultValue = props.defaultValue, _d = props.title, title = _d === void 0 ? locale.CForm.array.addRow : _d, _e = props.max, max = _e === void 0 ? Number.MAX_SAFE_INTEGER : _e, _f = props.showSubInfo, showSubInfo = _f === void 0 ? false : _f, subInfo = props.subInfo, addButtonProps = props.addButtonProps;
    var _g = ArrayBase.useAddition(method, defaultValue), addItem = _g.addItem, showAdd = _g.showAdd, disabled = _g.disabled, fieldTitle = _g.title;
    var array = ArrayBase.useArray();
    if (!showAdd)
        return null;
    var currentCount = ((_a = array.field.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    var disableAdd = ((_b = array.field.value) === null || _b === void 0 ? void 0 : _b.length) >= max;
    var subNode;
    if (typeof subInfo === 'function') {
        subNode = subInfo(currentCount);
    }
    else if (typeof subInfo === 'string') {
        var info = subInfo.replace('${count}', "".concat(max - currentCount));
        subNode = info;
    }
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) },
        React.createElement(CAddButton, __assign({ type: 'primary', disabled: disabled || disableAdd, onClick: function () {
                var _a;
                addItem();
                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
            }, text: title || fieldTitle, enableAddCount: max - currentCount, showEnableAddTips: showSubInfo, customTips: showSubInfo && subNode }, addButtonProps))));
};
ArrayBaseAddition.displayName = 'ArrayBaseAddition';
export default ArrayBaseAddition;
var templateObject_1;
//# sourceMappingURL=index.js.map