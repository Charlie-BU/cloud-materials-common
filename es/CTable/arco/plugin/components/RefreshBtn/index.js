import React from 'react';
import { observer } from '@formily/react';
import { Button, Popover } from '@arco-design/web-react';
import { IconRefresh } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { usePrefix } from '../../../../react';
export var RefreshBtn = observer(function (_a) {
    var table = _a.table, onClick = _a.onClick;
    var locale = useCConfigContext().locale;
    var prefixCls = usePrefix('comp-refresh-btn');
    var click = function () {
        onClick ? onClick() : table.refresh();
    };
    return (React.createElement(Popover, { content: locale.CTable.Refresh },
        React.createElement(Button, { className: prefixCls, loading: table.loading, icon: React.createElement(IconRefresh, null), onClick: click })));
});
//# sourceMappingURL=index.js.map