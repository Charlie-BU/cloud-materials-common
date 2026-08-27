import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import { Input } from '@arco-design/web-react';
import { IconSearch, IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import { useDebounceFn } from 'ahooks';
import { DataCy } from '../utils';
import classNames from 'classnames';
import { CConfigContext } from '../../CConfigProvider';
export var TargetHeader = function (_a) {
    var extraAction = _a.extraAction, totalChosenCount = _a.totalChosenCount, placeholder = _a.placeholder, onClear = _a.onClear, onSearchChange = _a.onSearchChange, title = _a.title;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale, formatLocale = _b.formatLocale;
    var cssPrefix = useCssPrefix('tree-transfer');
    var handleSearchChange = useDebounceFn(function (v) {
        onSearchChange(v, 'target');
    }, { wait: 200 }).run;
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["header"], ["header"]))), "data-cy": DataCy.targetHeader, "data-testid": DataCy.targetHeader },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["header-content"], ["header-content"]))), cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["target-header-content"], ["target-header-content"])))) },
            React.createElement("div", null, title !== undefined
                ? title
                : totalChosenCount !== undefined && (React.createElement("span", null, formatLocale(locale.CTreeTransfer.checkedCount, { count: totalChosenCount })))),
            React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-right"], ["header-right"]))) },
                extraAction,
                React.createElement(IconDelete, { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["header-delete-icon"], ["header-delete-icon"]))), 'c-m-icon'), onClick: onClear, "data-cy": DataCy.targetClear, "data-testid": DataCy.targetClear }))),
        React.createElement(Input, { prefix: React.createElement(IconSearch, null), placeholder: placeholder || locale.CTreeTransfer.searchPlaceholder, size: "small", className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["header-search"], ["header-search"]))), onChange: handleSearchChange, "data-cy": DataCy.targetSearch, "data-testid": DataCy.targetSearch })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=TargetHeader.js.map