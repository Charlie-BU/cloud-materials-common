import { __makeTemplateObject, __read } from "tslib";
import React, { useContext, useState } from 'react';
import { Checkbox, Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/iconbox-react-ve-o-design';
import { useDebounceFn } from 'ahooks';
import { DataCy } from '../utils';
import { CConfigContext } from '../../CConfigProvider';
export var SourceHeader = function (_a) {
    var extraAction = _a.extraAction, checkAllStatus = _a.checkAllStatus, placeholder = _a.placeholder, onCheckAll = _a.onCheckAll, onSearchChange = _a.onSearchChange, sourceHeaderCustomText = _a.sourceHeaderCustomText;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var _c = __read(useState(''), 2), searchStr = _c[0], setSearchStr = _c[1];
    var customCheckAllTitle = sourceHeaderCustomText === null || sourceHeaderCustomText === void 0 ? void 0 : sourceHeaderCustomText.checkAllTitle;
    var cssPrefix = useCssPrefix('tree-transfer');
    var handleSearchChange = useDebounceFn(function (v) {
        setSearchStr(v);
        onSearchChange(v, 'source');
    }, { wait: 200 }).run;
    var checkTitle = customCheckAllTitle
        ? typeof customCheckAllTitle === 'string'
            ? customCheckAllTitle
            : customCheckAllTitle === null || customCheckAllTitle === void 0 ? void 0 : customCheckAllTitle(searchStr)
        : locale.CTreeTransfer.checkAll;
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["header"], ["header"]))), "data-cy": DataCy.sourceHeader, "data-testid": DataCy.sourceHeader },
        React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["header-content"], ["header-content"]))) },
            React.createElement(Checkbox, { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header-check-all"], ["header-check-all"]))), onChange: onCheckAll, checked: checkAllStatus.checked, indeterminate: checkAllStatus.indeterminate, "data-cy": DataCy.sourceCheckAll, "data-testid": DataCy.sourceCheckAll }, checkTitle),
            extraAction),
        React.createElement(Input, { prefix: React.createElement(IconSearch, null), placeholder: placeholder || locale.CTreeTransfer.searchPlaceholder, size: "small", className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-search"], ["header-search"]))), onChange: handleSearchChange, allowClear: true, "data-cy": DataCy.sourceSearch, "data-testid": DataCy.sourceSearch })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=SourceHeader.js.map