import { __assign, __makeTemplateObject, __read } from "tslib";
import React from 'react';
import { Popover } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { useDownload } from '../../../hooks/useDownload';
import { testId } from '../..';
import { useCConfigContext } from '../../../CConfigProvider';
var Download = function (_a) {
    var value = _a.value, fileName = _a.fileName;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('code-block');
    var iconCls = useCssPrefix('')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["icon"], ["icon"])));
    // 下载hooks
    var _b = __read(useDownload({
        value: value,
        fileName: fileName,
    }), 2), arcoPopoverProps = _b[0].arcoPopoverProps, controls = _b[1];
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["download"], ["download"])))) },
        React.createElement(Popover, __assign({}, arcoPopoverProps),
            React.createElement(IconDownload, { className: classNames(iconCls, cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["download-icon"], ["download-icon"])))), onClick: controls.downloadFile, "data-testid": testId.downloadBtn }))));
};
export default Download;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map