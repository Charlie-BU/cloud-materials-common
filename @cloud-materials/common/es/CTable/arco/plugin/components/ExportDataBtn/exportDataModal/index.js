import React, { useRef } from 'react';
import { Popover, Button } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
import { useCConfigContext } from '../../../../../../CConfigProvider';
import { usePrefix } from '../../../../../react';
import { ExportDataModal } from './exportModal';
export var ExportData = function (_a) {
    var table = _a.table, options = _a.options;
    var prefixCls = usePrefix('export-data');
    var locale = useCConfigContext().locale;
    var exportModalRef = useRef(null);
    return (React.createElement(Popover, { content: options.tooltip || locale.CTable.exportData },
        React.createElement(Button, { className: "".concat(prefixCls, "-btn"), icon: React.createElement(IconDownload, null), onClick: function () {
                var _a;
                (_a = exportModalRef.current) === null || _a === void 0 ? void 0 : _a.openModal();
            } }),
        React.createElement(ExportDataModal, { ref: exportModalRef, table: table, options: options })));
};
//# sourceMappingURL=index.js.map