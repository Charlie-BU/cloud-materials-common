import React from 'react';
import { toLocaleString } from '../../utils';
export var Number = function (props) {
    var content = props.customContent;
    if (content === undefined) {
        // 如果没有配置  customContent，也没有配置 formatter，默认通过 toLocaleString 转换
        content = props.cell.column.config.formatter ? props.content : toLocaleString(props.content);
    }
    return React.createElement("div", { style: { textAlign: 'right' } }, content);
};
//# sourceMappingURL=Number.js.map