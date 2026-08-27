import { getTextWidth } from '../../../utils';
import { getHeaderWidthInfo } from '../../utils';
export var defaultAutoWidth = {
    type: 'default',
    getCellWidth: function (_a) {
        var content = _a.content;
        // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
        return getTextWidth(content) + 5;
    },
    getHeaderCellWidth: function (_a) {
        var column = _a.column;
        var _b = getHeaderWidthInfo(column), leftWidth = _b.leftWidth, rightWidth = _b.rightWidth;
        // 添加 5px 的冗余宽度，避免计算精度问题，导致得到的宽度不够
        return leftWidth + getTextWidth(column.title) + rightWidth + 5;
    },
    maxWidth: 240,
    minWidth: 100,
    // 存储的场景下，padding 占 32px
    blankWidth: 32,
};
//# sourceMappingURL=index.js.map